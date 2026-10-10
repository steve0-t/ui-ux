use chrono::{DateTime, Duration, Utc};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize)]
pub struct Appointment {
    pub at: DateTime<Utc>,
    pub arrival: DateTime<Utc>,
}

#[derive(Clone, Debug, Serialize)]
pub struct Change {
    pub previous: Appointment,
    pub current: Appointment,
    pub acknowledged: bool,
    pub during_preparation: bool,
    pub affected_steps: Vec<String>,
}

#[derive(Clone, Debug, Serialize)]
pub struct ChangeRequest {
    pub reason: String,
    pub status: &'static str,
}

#[derive(Clone, Debug, Serialize)]
pub struct Instruction {
    pub version: u32,
    pub issued_at: DateTime<Utc>,
    pub source: String,
    pub text: String,
}

#[derive(Clone, Debug, Serialize)]
pub struct Step {
    pub id: String,
    pub title: String,
    pub instruction: String,
    pub category: &'static str,
    pub due_at: DateTime<Utc>,
    pub deadline: DateTime<Utc>,
    pub applicable: bool,
    pub exclusion: Option<String>,
    pub completed_at: Option<DateTime<Utc>>,
    pub needs_verification: bool,
    pub status: &'static str,
}

#[derive(Clone, Debug, Serialize)]
pub struct History {
    pub step_id: String,
    pub at: DateTime<Utc>,
    pub completed: bool,
    pub plan_version: u32,
}

#[derive(Clone, Debug, Serialize)]
pub struct Problem {
    pub id: u64,
    pub step_id: String,
    pub description: String,
    pub occurred_at: DateTime<Utc>,
    pub status: &'static str,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Channel {
    Email,
    Sms,
}

#[derive(Clone, Debug, Serialize)]
pub struct ReminderPreferences {
    pub enabled: bool,
    pub channel: Channel,
    pub minutes_before: u32,
}

#[derive(Clone, Debug, Serialize)]
pub struct Reminder {
    pub step_id: String,
    pub plan_version: u32,
    pub at: DateTime<Utc>,
    pub active: bool,
}

#[derive(Clone, Debug, Serialize)]
pub struct Plan {
    pub revision: u64,
    pub now: DateTime<Utc>,
    pub appointment: Appointment,
    pub change_request: Option<ChangeRequest>,
    pub change: Option<Change>,
    pub plan_version: u32,
    pub validity: &'static str,
    pub started: bool,
    pub instructions: Vec<Instruction>,
    pub steps: Vec<Step>,
    pub history: Vec<History>,
    pub problems: Vec<Problem>,
    pub preferences: ReminderPreferences,
    pub reminders: Vec<Reminder>,
    pub next_step_id: Option<String>,
    pub completed_count: usize,
    pub applicable_count: usize,
}

#[derive(Debug, Deserialize)]
pub struct Mutation<T> {
    pub revision: u64,
    #[serde(flatten)]
    pub action: T,
}

#[derive(Debug, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum PatientAction {
    Completion {
        step_id: String,
        completed: bool,
    },
    ReportProblem {
        step_id: String,
        description: String,
        occurred_at: DateTime<Utc>,
    },
    RequestChange {
        reason: String,
    },
    CancelRequest,
    AcknowledgeChange,
    StartPreparation,
    Reminders {
        enabled: bool,
        channel: Channel,
        minutes_before: u32,
    },
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum Scenario {
    Normal,
    Missing,
    Problem,
    ChangeBefore,
    ChangeDuring,
}

#[derive(Debug, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum DemoAction {
    Reset { scenario: Scenario },
    AdvanceTime,
    ConfirmAppointment,
    ConfirmPlan,
}

pub type DomainResult = Result<(), &'static str>;

impl Plan {
    pub fn new(revision: u64) -> Self {
        // Frozen demo time: it never depends on the visitor's wall clock.
        let now = "2026-10-12T07:00:00Z".parse::<DateTime<Utc>>().unwrap();
        let appointment_at = now + Duration::days(4);
        let make_step = |id: &str, title: &str, text: &str, category, day: i64| Step {
            id: id.into(),
            title: title.into(),
            instruction: text.into(),
            category,
            due_at: now + Duration::days(day),
            deadline: now + Duration::days(day) + Duration::hours(8),
            applicable: true,
            exclusion: None,
            completed_at: None,
            needs_verification: false,
            status: "planned",
        };
        let mut steps = vec![
            make_step(
                "instructions",
                "Prečítať pokyny pracoviska",
                "Otvorte ukážkové pôvodné pokyny a prečítajte si ich. V skutočnej príprave používajte dokument od svojho pracoviska. Ak niečomu nerozumiete, vyžiadajte si vysvetlenie.",
                "Orientácia",
                0,
            ),
            make_step(
                "medicines",
                "Overiť individuálne pokyny",
                "S pracoviskom si vyjasnite pokyny k liekom a príprave. Táto ukážka neobsahuje dávky ani medicínsky časový režim. Označenie znamená iba záznam, že ste si pokyny vyjasnili.",
                "Pokyny pracoviska",
                0,
            ),
            make_step(
                "transport",
                "Dohodnúť sprievod a odvoz",
                "V tomto fiktívnom pláne je požadovaný sprievod a odvoz. Dohodnite si s blízkou osobou miesto a čas. Pri zmene termínu dohodu znovu overte.",
                "Organizácia návštevy",
                1,
            ),
            make_step(
                "documents",
                "Pripraviť doklady a dokumenty",
                "Ukážkový zoznam: doklad totožnosti, preukaz poistenca a dokumenty uvedené v pozvánke. Skutočný zoznam určuje vaše pracovisko.",
                "Pred návštevou",
                3,
            ),
            make_step(
                "arrival",
                "Overiť miesto a čas príchodu",
                "Skontrolujte miesto návštevy a samostatný čas príchodu uvedený pri termíne. Tento krok zaznamenáva kontrolu údajov, nie príchod na vyšetrenie.",
                "Pred návštevou",
                3,
            ),
        ];
        let mut optional = make_step(
            "print",
            "Vytlačiť kópiu plánu",
            "Tento ukážkový plán nevyžaduje tlačenú kópiu.",
            "Voliteľné",
            3,
        );
        optional.applicable = false;
        optional.exclusion = Some("Podľa ukážkových pokynov tlačená kópia nie je potrebná.".into());
        steps.push(optional);
        let mut plan = Self {
            revision, now,
            appointment: Appointment { at: appointment_at, arrival: appointment_at - Duration::minutes(30) },
            change_request: None, change: None, plan_version: 1, validity: "current", started: false,
            instructions: vec![Instruction {
                version: 1, issued_at: now - Duration::days(1), source: "Modelové endoskopické pracovisko · fiktívna ukážka".into(),
                text: "Ukážka pokynov v1. Prečítajte si pozvánku, vyjasnite si individuálne pokyny s pracoviskom, dohodnite sprievod a odvoz, pripravte doklady a overte čas príchodu. Medicínske pokyny, dávky ani časovanie prípravkov nie sú súčasťou tejto ukážky. Tento text nie je návodom na skutočnú prípravu.".into(),
            }], steps, history: vec![], problems: vec![],
            preferences: ReminderPreferences { enabled: false, channel: Channel::Email, minutes_before: 60 },
            reminders: vec![], next_step_id: None, completed_count: 0, applicable_count: 0,
        };
        plan.refresh();
        plan
    }

    pub fn patient(&mut self, action: PatientAction) -> DomainResult {
        match action {
            PatientAction::Completion { step_id, completed } => {
                let step = self
                    .steps
                    .iter_mut()
                    .find(|s| s.id == step_id)
                    .ok_or("Krok sa nenašiel.")?;
                if !step.applicable {
                    return Err("Tento krok sa vás netýka.");
                }
                if completed && (step.needs_verification || self.validity != "current") {
                    return Err("Platnosť kroku musí najprv overiť pracovisko.");
                }
                if step.completed_at.is_some() == completed {
                    return Err("Záznam už má tento stav. Načítajte aktuálny plán.");
                }
                step.completed_at = completed.then_some(self.now);
                self.history.push(History {
                    step_id,
                    at: self.now,
                    completed,
                    plan_version: self.plan_version,
                });
            }
            PatientAction::ReportProblem {
                step_id,
                description,
                occurred_at,
            } => {
                if !self.steps.iter().any(|s| s.id == step_id && s.applicable) {
                    return Err("Vyberte platný krok prípravy.");
                }
                let description = description.trim();
                if description.chars().count() < 5 || description.chars().count() > 2000 {
                    return Err("Opíšte problém v rozsahu 5 až 2 000 znakov.");
                }
                if occurred_at > self.now || occurred_at < self.now - Duration::days(30) {
                    return Err("Zadajte čas v posledných 30 dňoch, najneskôr po ukážkový čas.");
                }
                self.problems.push(Problem {
                    id: self.revision + 1,
                    step_id,
                    description: description.into(),
                    occurred_at,
                    status: "saved_demo",
                });
            }
            PatientAction::RequestChange { reason } => {
                if self
                    .change_request
                    .as_ref()
                    .is_some_and(|r| r.status == "saved_demo")
                {
                    return Err("Požiadavka je už uložená.");
                }
                if self.validity != "current" {
                    return Err("Najprv treba vyjasniť otvorenú zmenu s pracoviskom.");
                }
                let reason = reason.trim();
                if !(5..=1000).contains(&reason.chars().count()) {
                    return Err("Uveďte dôvod v rozsahu 5 až 1 000 znakov.");
                }
                self.change_request = Some(ChangeRequest {
                    reason: reason.into(),
                    status: "saved_demo",
                });
            }
            PatientAction::CancelRequest => {
                if self
                    .change_request
                    .as_ref()
                    .is_none_or(|r| r.status != "saved_demo")
                {
                    return Err("Nie je tu čakajúca požiadavka.");
                }
                self.change_request.as_mut().unwrap().status = "cancelled";
            }
            PatientAction::AcknowledgeChange => {
                self.change
                    .as_mut()
                    .ok_or("Nie je tu oznámená zmena.")?
                    .acknowledged = true;
            }
            PatientAction::StartPreparation => {
                if self.validity != "current" {
                    return Err("Plán čaká na overenie pracoviskom.");
                }
                self.started = true;
            }
            PatientAction::Reminders {
                enabled,
                channel,
                minutes_before,
            } => {
                if ![30, 60, 1440].contains(&minutes_before) {
                    return Err("Vyberte ponúkaný predstih pripomienky.");
                }
                self.preferences = ReminderPreferences {
                    enabled,
                    channel,
                    minutes_before,
                };
            }
        }
        Ok(())
    }

    fn confirm_appointment(&mut self) -> DomainResult {
        if self.validity != "current" {
            return Err("Pred ďalšou zmenou treba potvrdiť platnosť plánu.");
        }
        let previous = self.appointment.clone();
        self.appointment.at += Duration::days(7);
        self.appointment.arrival += Duration::days(7);
        self.validity = "awaiting_confirmation";
        let affected_steps = self
            .steps
            .iter_mut()
            .filter(|s| s.applicable && s.id != "instructions")
            .map(|s| {
                s.needs_verification = true;
                s.id.clone()
            })
            .collect();
        self.change = Some(Change {
            previous,
            current: self.appointment.clone(),
            acknowledged: false,
            during_preparation: self.started,
            affected_steps,
        });
        if let Some(request) = &mut self.change_request {
            request.status = "confirmed_demo";
        }
        Ok(())
    }

    pub fn demo(&mut self, action: DemoAction) -> DomainResult {
        match action {
            DemoAction::Reset { scenario } => {
                *self = Self::new(self.revision);
                match scenario {
                    Scenario::Normal => (),
                    Scenario::Missing => self.now += Duration::hours(9),
                    Scenario::Problem => self.patient(PatientAction::ReportProblem {
                        step_id: "transport".into(),
                        description: "Sprievod v dohodnutom čase nemôže prísť.".into(),
                        occurred_at: self.now,
                    })?,
                    Scenario::ChangeBefore => self.confirm_appointment()?,
                    Scenario::ChangeDuring => {
                        self.patient(PatientAction::Completion {
                            step_id: "instructions".into(),
                            completed: true,
                        })?;
                        self.patient(PatientAction::Completion {
                            step_id: "medicines".into(),
                            completed: true,
                        })?;
                        self.started = true;
                        self.confirm_appointment()?;
                    }
                }
            }
            DemoAction::AdvanceTime => {
                if self.now >= self.appointment.at {
                    return Err("Ukážkový čas už dosiahol deň vyšetrenia. Obnovte scenár.");
                }
                self.now += Duration::hours(24);
            }
            DemoAction::ConfirmAppointment => self.confirm_appointment()?,
            DemoAction::ConfirmPlan => {
                let change = self
                    .change
                    .as_ref()
                    .ok_or("Najprv simulujte oznámenie nového termínu.")?;
                if self.validity == "current" {
                    return Err("Plán už je potvrdený.");
                }
                if change.during_preparation || self.started {
                    return Err(
                        "Po začatí prípravy ukážka nemá individuálne schválené pokyny. Plán zostáva na overenie; použite kontakt.",
                    );
                }
                self.plan_version += 1;
                self.validity = "current";
                for step in &mut self.steps {
                    if step.needs_verification {
                        // Only administrative example tasks, never a medication or preparation-product regimen.
                        step.due_at += Duration::days(7);
                        step.deadline += Duration::days(7);
                        step.needs_verification = false;
                    }
                }
                self.instructions.push(Instruction {
                    version: self.plan_version, issued_at: self.now,
                    source: "Simulované potvrdenie modelového pracoviska".into(),
                    text: "Ukážková aktualizácia: nový termín je uvedený v prehľade. Overenie individuálnych pokynov, dohoda sprievodu, doklady a kontrola príchodu majú aktualizované organizačné termíny. Prečítanie pôvodného dokumentu zostáva zaznamenané. Žiadny medicínsky režim nebol vytvorený. Pred skutočnou prípravou potrebujete pokyny svojho pracoviska.".into(),
                });
            }
        }
        Ok(())
    }

    pub fn refresh(&mut self) {
        for step in &mut self.steps {
            step.status = if !step.applicable {
                "not_applicable"
            } else if step.needs_verification {
                "verify"
            } else if self
                .problems
                .iter()
                .any(|p| p.step_id == step.id && p.status != "resolved")
            {
                "problem"
            } else if step.completed_at.is_some() {
                "completed"
            } else if self.now > step.deadline {
                "unconfirmed"
            } else if self.now >= step.due_at {
                "due"
            } else {
                "planned"
            };
        }
        self.applicable_count = self.steps.iter().filter(|s| s.applicable).count();
        self.completed_count = self
            .steps
            .iter()
            .filter(|s| s.applicable && s.completed_at.is_some())
            .count();
        self.next_step_id = if self.validity == "current" {
            self.steps
                .iter()
                .filter(|s| s.applicable && s.completed_at.is_none() && !s.needs_verification)
                .min_by_key(|s| s.due_at)
                .map(|s| s.id.clone())
        } else {
            None
        };
        // Keep obsolete reminder records inactive. Rebuild only the current plan's reminders.
        for reminder in &mut self.reminders {
            reminder.active = false;
        }
        if self.validity == "current" && self.preferences.enabled {
            for step in self
                .steps
                .iter()
                .filter(|s| s.applicable && !s.needs_verification && s.completed_at.is_none())
            {
                let at = step.due_at - Duration::minutes(self.preferences.minutes_before.into());
                if at <= self.now {
                    continue;
                }
                if let Some(reminder) = self
                    .reminders
                    .iter_mut()
                    .find(|r| r.plan_version == self.plan_version && r.step_id == step.id)
                {
                    reminder.active = true;
                    reminder.at = at;
                } else {
                    self.reminders.push(Reminder {
                        step_id: step.id.clone(),
                        plan_version: self.plan_version,
                        at,
                        active: true,
                    });
                }
            }
        }
    }
}
