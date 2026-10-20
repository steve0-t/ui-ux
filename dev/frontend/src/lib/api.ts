import { get } from 'svelte/store'
import { locale, type Locale } from './i18n'

export type Status =
  'planned' | 'due' | 'completed' | 'unconfirmed' | 'problem' | 'verify' | 'not_applicable'
export interface Appointment {
  at: string
  arrival: string
}
export interface Step {
  id: string
  title: string
  instruction: string
  category: string
  due_at: string
  deadline: string
  applicable: boolean
  exclusion: string | null
  completed_at: string | null
  needs_verification: boolean
  status: Status
}
export interface Plan {
  revision: number
  now: string
  appointment: Appointment
  change_request: { reason: string; status: 'saved_demo' | 'cancelled' | 'confirmed_demo' } | null
  change: {
    previous: Appointment
    current: Appointment
    acknowledged: boolean
    during_preparation: boolean
    affected_steps: string[]
  } | null
  plan_version: number
  validity: 'current' | 'awaiting_confirmation'
  started: boolean
  instructions: { version: number; issued_at: string; source: string; text: string }[]
  steps: Step[]
  history: { step_id: string; at: string; completed: boolean; plan_version: number }[]
  problems: {
    id: number
    step_id: string
    description: string
    occurred_at: string
    status: 'saved_demo'
  }[]
  preferences: { enabled: boolean; channel: 'email' | 'sms'; minutes_before: number }
  reminders: { step_id: string; plan_version: number; at: string; active: boolean }[]
  next_step_id: string | null
  completed_count: number
  applicable_count: number
}
export type PatientAction =
  | { type: 'completion'; step_id: string; completed: boolean }
  | { type: 'report_problem'; step_id: string; description: string; occurred_at: string }
  | { type: 'request_change'; reason: string }
  | { type: 'cancel_request' | 'acknowledge_change' | 'start_preparation' }
  | { type: 'reminders'; enabled: boolean; channel: 'email' | 'sms'; minutes_before: number }
export type DemoAction =
  | {
      type: 'reset'
      scenario: 'normal' | 'missing' | 'problem' | 'change_before' | 'change_during'
    }
  | { type: 'advance_time' | 'confirm_appointment' | 'confirm_plan' }
export type Mutate = (action: PatientAction, message: string) => Promise<boolean>
export type Simulate = (action: DemoAction) => Promise<boolean>

// Validate every field consumed by the UI before replacing the last accepted snapshot.
type Check = (value: unknown) => boolean
const string: Check = (v) => typeof v === 'string'
const number: Check = (v) => typeof v === 'number' && Number.isSafeInteger(v) && v >= 0
const bool: Check = (v) => typeof v === 'boolean'
const date: Check = (v) => string(v) && Number.isFinite(Date.parse(v as string))
const nullable =
  (check: Check): Check =>
  (v) =>
    v === null || check(v)
const array =
  (check: Check): Check =>
  (v) =>
    Array.isArray(v) && v.every(check)
const oneOf =
  (...values: string[]): Check =>
  (v) =>
    typeof v === 'string' && values.includes(v)
const object =
  (shape: Record<string, Check>): Check =>
  (v) =>
    v !== null &&
    typeof v === 'object' &&
    !Array.isArray(v) &&
    Object.entries(shape).every(([key, check]) => check((v as Record<string, unknown>)[key]))
const appointment = object({ at: date, arrival: date })
const validPlan = object({
  revision: number,
  now: date,
  appointment,
  change_request: nullable(
    object({ reason: string, status: oneOf('saved_demo', 'cancelled', 'confirmed_demo') }),
  ),
  change: nullable(
    object({
      previous: appointment,
      current: appointment,
      acknowledged: bool,
      during_preparation: bool,
      affected_steps: array(string),
    }),
  ),
  plan_version: number,
  validity: oneOf('current', 'awaiting_confirmation'),
  started: bool,
  instructions: array(object({ version: number, issued_at: date, source: string, text: string })),
  steps: array(
    object({
      id: string,
      title: string,
      instruction: string,
      category: string,
      due_at: date,
      deadline: date,
      applicable: bool,
      exclusion: nullable(string),
      completed_at: nullable(date),
      needs_verification: bool,
      status: oneOf(
        'planned',
        'due',
        'completed',
        'unconfirmed',
        'problem',
        'verify',
        'not_applicable',
      ),
    }),
  ),
  history: array(object({ step_id: string, at: date, completed: bool, plan_version: number })),
  problems: array(
    object({
      id: number,
      step_id: string,
      description: string,
      occurred_at: date,
      status: oneOf('saved_demo'),
    }),
  ),
  preferences: object({ enabled: bool, channel: oneOf('email', 'sms'), minutes_before: number }),
  reminders: array(object({ step_id: string, plan_version: number, at: date, active: bool })),
  next_step_id: nullable(string),
  completed_count: number,
  applicable_count: number,
})
export class ApiError extends Error {
  constructor(
    message: string,
    public status = 0,
  ) {
    super(message)
  }
}
export async function fetchPlan(path = '/api/plan', body?: object): Promise<Plan> {
  let response: Response
  try {
    response = await fetch(path, {
      method: body ? 'POST' : 'GET',
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(8000),
      cache: 'no-store',
    })
  } catch {
    throw new ApiError(
      'Spojenie sa nepodarilo. Výsledok uloženia nevieme potvrdiť. Načítajte aktuálny plán a skontrolujte ho pred ďalším pokusom.',
    )
  }
  let data: unknown
  try {
    data = await response.json()
  } catch {
    throw new ApiError('Odpoveď sa nedá prečítať. Načítajte aktuálny plán a skúste to znova.')
  }
  if (!response.ok) {
    const message = object({ message: string })(data)
      ? (data as { message: string }).message
      : 'Údaje sa nepodarilo uložiť. Skontrolujte plán a skúste to znova.'
    throw new ApiError(message, response.status)
  }
  if (!validPlan(data) || !(data as Plan).steps.length || !(data as Plan).instructions.length) {
    throw new ApiError(
      'Prijatý plán nemá očakávaný formát. Načítajte ho znova; vaše rozpracované údaje zostávajú zachované.',
    )
  }
  return data as Plan
}
export const statusLabels: Record<Status, string> = {
  planned: 'Naplánované',
  due: 'Treba urobiť',
  completed: 'Označené ako splnené',
  unconfirmed: 'Po termíne – nepotvrdené',
  problem: 'Problém oznámený',
  verify: 'Treba overiť',
  not_applicable: 'Netýka sa vás',
}
const dateLocales: Record<Locale, string> = { sk: 'sk-SK', en: 'en-GB', de: 'de-DE' }
export const dateTime = (value: string, language: Locale = get(locale)) =>
  new Intl.DateTimeFormat(dateLocales[language], {
    timeZone: 'Europe/Bratislava',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
export const day = (value: string, language: Locale = get(locale)) =>
  new Intl.DateTimeFormat(dateLocales[language], {
    timeZone: 'Europe/Bratislava',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(value))
export const time = (value: string, language: Locale = get(locale)) =>
  new Intl.DateTimeFormat(dateLocales[language], {
    timeZone: 'Europe/Bratislava',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))

export function localInput(iso: string): string {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Bratislava',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(iso))
  const value = (type: string) => parts.find((p) => p.type === type)?.value
  return `${value('year')}-${value('month')}-${value('day')}T${value('hour')}:${value('minute')}`
}
export function fromLocalInput(value: string): string | null {
  if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(value)) return null
  const timestamp = Date.parse(`${value}:00Z`)
  if (!Number.isFinite(timestamp)) return null
  // Bratislava's two offsets; reject nonexistent or ambiguous daylight-saving times.
  const matches = [1, 2]
    .map((offset) => new Date(timestamp - offset * 3600000).toISOString())
    .filter((iso) => localInput(iso) === value)
  return matches.length === 1 ? matches[0] : null
}
