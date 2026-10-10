# Project brief for GPT-6 Astra

This brief expands the website instruction into a concrete UX and implementation workflow for GPT-6 Astra. Instructions are in English; patient-facing text and coursework documents should be in Slovak, consistent with the existing documentation. No particular model capabilities or API settings are assumed.

Course pages were reviewed on **10 October 2026**. Linked course requirements are distinguished from project recommendations derived from `docs/ux/`.

## 1. Objective and scope

Develop a functional, responsive interface for this topic:

> Príprava pacienta na odborné vyšetrenie. Rozhranie prevedie pacienta prípravou, upozorní na chýbajúce kroky a reaguje na zmenu termínu alebo nesplnenie pokynov.

Help the patient understand their appointment, follow preparation instructions, record completed steps, identify missing confirmations, and find the next action when something changes or goes wrong.

Preserve the scope already selected in the documentation: **an adult preparing at home for scheduled outpatient colonoscopy at one workplace**. Colonoscopy is a working example, not a requirement to support every examination. The journey starts with receiving an appointment and workplace instructions and ends with arrival or receipt of an updated plan.

Diagnosis, treatment selection, results, autonomous medication advice, hospital management, and a comprehensive patient portal are outside scope. A companion primarily provides logistical help; digital sharing is an unverified optional extension.

Use fictional demonstration data for the course prototype. Real clinical instructions must come from the patient's workplace. Do not invent doses, fasting schedules, replacement medication, urgent triage, or clinical approval. Without approved content, demonstrate the interaction using clearly labelled example instructions and a route to workplace clarification.

## 2. Read and reuse tasks 02 and 03

Read these files before creating scenarios, screens, or code:

| File | Purpose |
| --- | --- |
| [Documentation index](docs/ux/README.md) | Scope, task coverage, conventions, artifact status, FigJam transfer instructions. |
| [UX research](docs/ux/02-vyskum-ux.md) | Problem, users, stakeholders, evidence D01–D09, decisions N01–N12, terminology, boundaries. |
| [Existing solutions](docs/ux/02-analyza-rieseni.md) | NHS, Guy's and St Thomas', MyChart, and UNLP findings; respect public-page analysis limits. |
| [Conceptual model](docs/ux/03-konceptualny-model.md) | Concepts, relationships V01–V09, actions, states, behavior rules N13–N18. Main reference for interaction behavior. |
| [Verification and AI](docs/ux/overenie-a-ai.md) | Assumptions A01–A08, planned human research, incomplete student AI reflection. |
| [Source register](docs/ux/zdroje.md) | Evidence provenance S01–S08 and limitations of accessibility guidance. |
| [Domain map](docs/ux/diagrams/mapa-domeny.mmd) and [concept diagram](docs/ux/diagrams/konceptualny-model.mmd) | Relationships to preserve; SVG exports are visual references, not editable FigJam objects or navigation maps. |

Preserve **Dxx = sourced evidence**, **Axx = assumption requiring verification**, and **Nxx = design decision**. Link new scenarios/decisions to these IDs. Extend identifiers without renumbering existing references.

Tasks 02 and 03 have substantial local documentation. This does not prove interviews, clinical validation, FigJam transfer, or submission occurred. The persona is hypothetical; only one competitor screenshot is present. Reuse the research while retaining these uncertainties.

The workspace currently contains documentation and Nix environment files, no application source or `package.json`, and is not a Git checkout. Reinspect before implementation. Rust/SurrealDB tools in `flake.nix` do not establish a required application stack.

## 3. Course workflow and remaining work

Local Markdown prepares material for course tools but cannot replace required FigJam/Figma artifacts.

### Tasks 02 and 03: audit the groundwork

Check existing problem definition, research conclusions, and competitor implications against [lab 02](https://kurzy.kpi.fei.tuke.sk/ux/labs/02.html). Reuse task 03 vocabulary and actions. [Lab 03](https://kurzy.kpi.fei.tuke.sk/ux/labs/03.html) treats the conceptual model as an optional working artifact. Note missing evidence without inventing completion.

### Task 04: stories and scenarios

[Lab 04](https://kurzy.kpi.fei.tuke.sk/ux/labs/04.html) requires a main user story and main/problem scenarios. Use stable PP IDs, initial conditions, user actions, expected responses, and final outcomes. Early scenarios should not prescribe component colors or controls. Peer review provides feedback, not user testing; a scenario map is optional.

Recommended project stories, to refine against Dxx/Nxx/Axx:

- **PP01:** As a patient, I want to understand and follow my preparation plan so I know what to do before my examination.
- **PP02:** As a patient whose appointment changed, I want to understand which parts of preparation still apply so I can follow current instructions.
- **PP03:** As a patient who could not follow an instruction, I want to explain the problem and obtain help so I know the next appropriate action.

Use normal preparation as the main scenario. A changed appointment during preparation is the recommended principal nonstandard scenario because it exercises N17. Also cover missing confirmation and actual noncompliance as separate branches. These are project choices; the course minimum is one main and one relevant nonstandard scenario.

Each scenario should contain its ID, evidence/assumption links, trigger, initial appointment/plan/step states, numbered action–response pairs, recovery paths, and observable outcome. “Awaiting workplace confirmation with contact available” can be a valid outcome without implying medical resolution.

### Task 05: paper prototype

[Lab 05](https://kurzy.kpi.fei.tuke.sk/ux/labs/05.html) requires actual hand-drawn states photographed and assembled into one linked wireflow. Label actions, main/problem branches, corrections, and PP/step references. Compare two genuinely different interaction alternatives and justify selection. There is no fixed screen minimum. Generated sketches do not replace hand drawings.

For this project, compare a dedicated appointment-change comparison journey with a contextual overview update leading to a separate review action. Describe advantages/risks as hypotheses until reviewed or tested. Astra can prepare drawing instructions and transition specifications; the student supplies genuine drawings.

### Tasks 06 and 07: first digital prototype

[Lab 06](https://kurzy.kpi.fei.tuke.sk/ux/labs/06.html) requires Figma Design and **Simple Design System exclusively** for the first digital prototype. Use reusable components, variants/states, consistent naming, and interactive transitions based on the paper prototype. Preserve both scenarios and PP IDs. Figma Make may assist; its result still needs selection and checking.

[Lab 07](https://kurzy.kpi.fei.tuke.sk/ux/labs/07.html) completes that prototype for testing. Run both scenarios from their initial states and verify text, transitions, feedback, nonstandard states, and shared link. Continue using Simple Design System. Extra scenarios, animations, and detailed polish are optional at this stage.

### Task 08: real testing and revision

[Lab 08](https://kurzy.kpi.fei.tuke.sk/ux/labs/08.html) requires digital-prototype testing with **five participants**, preferably target users; unfamiliar classmates are an allowed fallback. Give goal-based tasks without teaching controls. Observe think-aloud use and separate observations from interpretations. Obtain recording consent, retain an unlisted video record until assessment, and anonymize participants. Rank findings by severity and revise Figma, retaining Simple Design System. React belongs to the later stage.

Prepare an empty protocol and findings table until testing occurs. For this project, observe whether participants find the next action, correct a completion mark, distinguish old/new appointments, and understand that recorded completion is not clinical approval. Report automated checks and expert review separately from participant testing.

### Task 09: final React implementation

[Lab 09](https://kurzy.kpi.fei.tuke.sk/ux/labs/09.html) requires the tested **v1.1 prototype as visual and functional input** to Figma Make; text-only generation is insufficient. Select one consistent existing design language for the final version. Transfer required states to editable Figma Design layers/components, export React, and refine the code. Save the generated baseline and later changes separately in a departmental Git repository prefixed `UX-`. Check responsiveness, semantics, labels, keyboard operation, focus, contrast, errors, and both scenarios. Document later regeneration separately and preserve existing work.

If the tested prototype or tool access is missing, record the gap. Continue independent preparation: scenarios, specifications, fixtures, or an implementation plan. If the user separately authorizes early local implementation, label it provisional and identify unmet course prerequisites. Do not describe it as a compliant final artifact.

## 4. Behavior required by the existing conceptual model

Apply local rules N12–N18 consistently across screens, fixtures, and tests.

### Appointment and plan validity

- Show examination, workplace, confirmed date/time, and separate arrival time when supplied.
- Show instruction origin and version/date, and whether the plan is current or awaiting workplace confirmation. Keep original instructions accessible.
- A change request does not change the confirmed appointment. Distinguish draft/request/confirmation states; do not claim submission without a supported mechanism.
- After confirmation, show old/new details and affected steps. Acknowledging a notice means it was read; it does not approve clinical instructions.
- Before preparation begins, activate an updated plan only after workplace confirmation of its instructions.
- After preparation begins, retain completion history and mark affected steps for verification. Do not automatically shift medication or preparation-product schedules. Show the waiting state and contact route.
- Invalidate reminders for obsolete plans. Create replacements only for a confirmed current plan; explain external-calendar update limitations.

### Preparation steps

Use these Slovak states consistently, with text explanations rather than color alone:

| State | Meaning and next action |
| --- | --- |
| Naplánované | Time has not arrived; read instructions or configure a reminder. |
| Treba urobiť | Due under the current plan; record actual completion or report a problem. |
| Označené ako splnené | Patient recorded completion; allow correction. |
| Po termíne – nepotvrdené | Time passed without a record; ask for actual status. |
| Problém oznámený | Problem recorded; show its status and contact/next action. |
| Treba overiť | Applicability uncertain after a change; show pending clarification. |
| Netýka sa vás | Approved plan conditions exclude it; explain and exclude from missing-step totals. |

Elapsed time never proves noncompliance. Use “Nemáme potvrdenie tohto kroku” until the patient describes the situation. Do not automatically record completion.

Completion recording must be reversible. Correcting a mark must not recommend repeating a medical action. Keep time-derived due status, completion records, open problems, and plan validity distinct so a state change cannot erase unresolved concerns.

When applicable steps are recorded complete, use “Všetky kroky označené ako splnené”. Continue showing unresolved problems and verification needs. Progress records patient actions, not approval by a clinician.

### Problems, contact, and reminders

- Make “Mám problém” available at a step and from the overview. Capture related step, description, and occurrence time; preserve input after validation errors.
- Distinguish saved locally, sent, received, awaiting reply, and resolved where supported. An attempted call or sent message does not resolve a problem.
- Show workplace contact and verified availability. Label fictional availability/responses in fixtures. Do not promise immediate replies or copy foreign urgent procedures into the Slovak product.
- Reminders are voluntary and can be changed/disabled. Without real delivery, explain that preferences are saved for demonstration and no messages are sent.
- Include documents, belongings, companion, and transport only when required by the plan.

## 5. Proposed views and design priorities

These views/states are recommendations, not a mandated screen count. Merge/split according to scenarios and the tested prototype.

| View/state | What it communicates or supports |
| --- | --- |
| Preparation overview | Appointment, validity, next action, progress, missing confirmations, open issues. |
| Full plan | Time-grouped steps with dates/statuses and access to instructions. |
| Step detail | Source, timing, completion/correction, reminders, problem reporting. |
| Appointment/change review | Pending request or confirmed change, old/new details, affected steps, acknowledgement, next action. |
| Problem form/follow-up | Labels, validation, preserved input, truthful receipt status, contact. |
| Instructions/contact | Original example instructions, workplace location/availability. |
| Reminder preferences | Enabled state, channel/timing choices, delivery limitations. |
| Plan awaiting confirmation | Uncertainty, retained history, affected actions, route to clarification. |

Use plain Slovak, short instructions, explicit action labels, and consistent task 03 terms. Prioritize “what should I do now?” on mobile. Keep contact reachable throughout problem journeys. Every interactive control should cause a meaningful transition or explain why an action is unavailable.

Sharing, calendar export, printing, staff dashboards, authentication, and multiple examination types are optional. They must not displace the selected end-to-end journeys.

## 6. Technical recommendations for later implementation

These are defaults, not mandatory course dependencies:

1. Inspect existing code and Figma export first. Preserve its package manager/structure. Without an export, record the missing prerequisite before choosing a provisional scaffold.
2. Use React, HTML, and CSS. TypeScript and Vite are reasonable for an authorized new scaffold; neither is a stated course requirement.
3. Keep views in `src/pages`, reusable elements in `src/components`, and domain transitions separate from rendering. Suggested components: appointment summary, plan status, step list/card, problem form, contact panel.
4. Model appointment status, change requests, instruction versions, plan validity, steps, history, problems, and reminders separately. Use stable IDs and link reminders to a plan version.
5. Use fictional local fixtures. Backend/database infrastructure is unnecessary; do not add Rust/SurrealDB solely because its tools are present.
6. Provide deterministic demo states and reset controls for normal preparation, missing confirmation, reported problems, and changes before/after preparation starts. Separate simulation controls from patient actions.
7. Use a controllable demo clock and explicit date/time handling for Slovak display. Avoid fixed historical appointments inadvertently becoming overdue in every demonstration.
8. If persisting progress, store only fictional demo data, version it, and handle unavailable/corrupt storage. Reload must not resurrect obsolete reminders.
9. Label simulated clinic events. Never imply a local form contacted a real workplace.
10. Document actual installation, development, build, and verification commands. Adjust environment tooling only as needed for the frontend.

## 7. Acceptance criteria and verification

These checks do not replace real user testing or clinical validation:

| Check | Observable pass condition |
| --- | --- |
| Normal journey | Patient finds next step, reads instructions, records completion, sees next action. |
| Accidental completion | Correction restores appropriate state without recommending repetition of a medical act. |
| Missing confirmation | Advancing time shows an unconfirmed step without asserting noncompliance. |
| Problem report | Report stays linked to step; status/contact visible; saving/sending does not resolve it. |
| Change request | Confirmed appointment remains until a separate confirmation event. |
| Change before preparation | Old/new details and differences appear; activation requires workplace confirmation. |
| Change during preparation | History remains, affected steps require verification, no replacement clinical schedule generated. |
| Obsolete reminders | Invalid reminders cannot remain active or silently return on reload. |
| Complete records/open issue | Completion describes patient records while the issue remains visible. |
| Errors and recovery | Back/cancel/correction work; errors preserve input; unavailable data is not success. |
| Responsive use | Both journeys work on mobile/desktop without hidden or overlapping controls. |
| Keyboard use | Both journeys work without a mouse, with focus, labels, and appropriate dialog focus handling. |
| Demo honesty | Fictional confirmations and nondelivered reminders cannot resemble real clinical communication. |

Run a production build and relevant type/lint checks when configured. Add focused tests for consequential transitions: appointment confirmation, history preservation, and invalid reminders. Record actual checks/results/limitations. Do not call walkthroughs participant research or claim full accessibility compliance from a few checks.

## 8. Documentation and submission deliverables

Suggested local files, created when their phase is authorized:

- `docs/ux/04-pribehy-a-scenare.md`: PP IDs, scenarios, branches, evidence/assumption links.
- `docs/ux/05-papierovy-prototyp.md`: drawing guide, transitions, alternatives, genuine drawing links.
- `docs/ux/06-07-digitalny-prototyp.md`: Figma specification, component/state mapping, real links, walkthrough checklist.
- `docs/ux/08-testovanie.md`: plan, empty protocol until testing, real anonymized findings/severity/changes.
- `docs/ux/09-implementacia.md`: tested input, export provenance, design language, mapping, decisions, verification.

Keep tasks 02/03 intact unless correcting a specific issue. Update the documentation index when adding files. These filenames are recommendations, not prescribed submission artifacts.

Course deliverables:

- **First submission:** readable FigJam section with research conclusions, identified stories/scenarios, linked photos of hand drawings, two interaction alternatives/rationale, AI declaration. Keep optional artifacts separately. See [first submission](https://kurzy.kpi.fei.tuke.sk/ux/assignments/bp-1-figjam.html).
- **Second submission:** FigJam findings/severity and changes, Figma Design/live prototype links, AI declaration. Preserve submitted/tested versions after the deadline; continue on copies. **Ambiguity:** one part refers to paper-prototype testing, while digital criteria and lab 08 refer to digital testing. Confirm expectations with the instructor rather than silently overriding either wording. See [second submission](https://kurzy.kpi.fei.tuke.sk/ux/assignments/bp-2-prototyp.html).
- **Final submission:** readable Git/video links, React source, README with installation/start instructions, same video link, reflection, AI declaration. Video is at most three minutes and shows both scenarios and responsiveness. Reflect on a wrong initial decision, an unresolved problem, and next iteration. Simulated local functionality is allowed; backend/database and repeated user testing are optional. Exclude `node_modules` and generated development files. See [final submission](https://kurzy.kpi.fei.tuke.sk/ux/assignments/bp-3-html.html).

The final submission describes visibility using both “public” and “Unlisted”; verify the intended video setting before publication. Participant recordings are separate from the demonstration video and must not be publicly shared.

Follow [course AI rules](https://kurzy.kpi.fei.tuke.sk/ux/ai.html): document actual tools/purposes, verify factual claims, include a real student example of an AI suggestion modified/rejected with a reason. Never invent reflections, quotes, results, exports, commits, or links. Extend `overenie-a-ai.md` with actual work; keep unresolved student actions pending.

## 9. Working instructions for Astra

When asked to execute this brief:

1. Read sources and inspect the workspace. Briefly identify completed stages and missing artifacts.
2. Maintain traceability: evidence/assumption → decision → PP/scenario step → view/state → verification.
3. Complete authorized work independent of missing inputs. Make routine choices within scope; ask only for necessary information or material improvements.
4. Separate course constraints from recommendations. Document effects of user-directed scope changes on compliance.
5. Preserve real artifacts/submitted versions. Prepare concrete handoffs for people or unavailable tools while continuing independent work.
6. Implement complete journeys with state changes and recovery, prioritizing behavior over decoration.
7. Finish with artifacts, checks actually run, and genuine dependencies. Link local files and actual external artifacts.

**Current request boundary:** this revision explains future work for GPT-6 Astra. The present session does not build the app, contact participants, modify Figma, publish, push, or submit coursework.

## 10. Course references

The original lab 04–09 references remain the implementation/design sequence; tasks 02/03 provide its existing foundation.

| Task | Official instructions |
| --- | --- |
| 02 | [Výskum UX](https://kurzy.kpi.fei.tuke.sk/ux/labs/02.html) |
| 03 | [Konceptuálny model](https://kurzy.kpi.fei.tuke.sk/ux/labs/03.html) |
| 04 | [Scenáre použitia](https://kurzy.kpi.fei.tuke.sk/ux/labs/04.html) |
| 05 | [Papierový prototyp](https://kurzy.kpi.fei.tuke.sk/ux/labs/05.html) |
| 06 | [High Fidelity Prototypovanie I](https://kurzy.kpi.fei.tuke.sk/ux/labs/06.html) |
| 07 | [High Fidelity Prototypovanie II](https://kurzy.kpi.fei.tuke.sk/ux/labs/07.html) |
| 08 | [Vyhodnotenie digitálneho prototypu](https://kurzy.kpi.fei.tuke.sk/ux/labs/08.html) |
| 09 | [Finálny prototyp v Reacte](https://kurzy.kpi.fei.tuke.sk/ux/labs/09.html) |
