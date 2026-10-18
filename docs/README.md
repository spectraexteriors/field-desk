# Documentation map

## Where information belongs

| Area | Owns |
| --- | --- |
| [Agent instructions](../AGENTS.md) | Current working rules, authority, guide entrypoints, verification requirements |
| [Project record](project.md) | Purpose, success criteria, constraints, lifecycle, setup progress, permissions |
| [Setup guide](setup.md) | Intake, adoption, readiness, and instruction transition procedure |
| [Project guides](guides/README.md) | Framework coordination workflow and project commands, running, testing/CI, deployment/recovery, troubleshooting |
| [Architecture](architecture/) | Implemented structure, interfaces, data flow, and constraints |
| [Pending decisions](decisions/pending/) | Proposals awaiting a user choice |
| [Accepted decisions](decisions/accepted/) | Approved choices and their rationale |
| [Archived decisions](decisions/archived/) | Rejected, withdrawn, or superseded choices |
| [Pending tasks](implementation/tasks/pending/) | Work not yet started |
| [Active tasks](implementation/tasks/active/) | Owned work, including blocked work and work awaiting integration |
| [Archived tasks](implementation/tasks/archived/) | Completed or cancelled work and verification evidence |
| [Task template](templates/task.md) / [decision template](templates/decision.md) / [guide template](templates/guide.md) | Minimal reusable record formats |

[Project onboarding](../README.md) links verified local procedures. Keep individual
guide links in the guide index. Guides own commands and
procedures rather than a separate operations document or command table in
`AGENTS.md`. Create an architecture overview when implementation facts are known.
Add focused documents only when they make information easier to find.

## Reading and maintenance

At startup, read the applicable agent instructions, this map, and the project
record. Then read only the tasks, accepted decisions, pending proposals, guides, and
technical documents relevant to the work. Check guides before rediscovering commands
and procedures. Normal development does not require rereading the setup procedure
or the archive at startup.

Each fact has one authoritative home. Link to it instead of copying its content;
this index is a navigation map, not a second task list or project dashboard.
Distinguish expected behavior from observed implementation and label approved
future changes clearly. A contradiction is a finding to resolve, not permission
to change an accepted decision to match a bug.

Use ordinary Markdown with concise headings and lists, without mandatory
frontmatter. Keep stable, descriptive task and decision basenames unique across
their respective lifecycle folders; do not rename them when their state changes.
Use relative Markdown links and update affected inbound and outbound links when
moving files. Search archives for affected references without reading all history.
For dependencies, record the stable basename as well as a link so a moved record
can still be found by filename. Never link to temporary checkout paths.

## Task workflow

1. Before changing files, find an existing task covering the work or copy the task
   template into `implementation/tasks/pending/`. Check all task folders for a
   basename collision. Creating or updating a proposal is task-covered work too.
2. The agent handling the user's request coordinates it; assigned workers keep
   their roles. Before work starts, the coordinator assigns an owner and moves the
   task to `active/`. Use the
   [parallel-work guide](guides/parallel-work.md) to delegate useful independent work
   by default for useful independent scopes, within available capacity. No separate status field is needed;
   a blocker or next action describes the condition within the folder.
3. Record scope and acceptance criteria before implementation. Follow the
   [record guidance](#task-record-size-and-maintenance); omit unused sections. Related code, tests, docs, and cleanup
   belong together. Split only work with independently useful scope or ownership.
4. Record dependencies, progress, and meaningful verification. Delegate independently
   owned implementation scopes through task records; keep read-only assignments in
   the owning task unless a separate record is useful. Include worker identity/role,
   acceptance/context references, editing/resource boundaries, baseline, and expected
   handoff. Parent tasks link child tasks without duplicating status. Workers use
   coordinator assignments; branch-local copies are not a claiming mechanism.
5. On interruption or handoff, record what changed, checks and limitations,
   blockers, and the next action. A worker ready for integration remains active
   until the coordinator integrates and verifies the result.
6. Apply the completion checklist before archival. Record a completed or cancelled
   outcome in `archived/`; cancellation records why work stopped and what was left
   behind without claiming acceptance criteria passed. Do not reuse archived task
   identifiers for new work.

### Task record size and maintenance

Aim below soft ceilings of 150–250 words for small tasks and about 500 words for
substantial coordination; these are not minimums or hard limits. Briefly explain
exceptions needed for essential evidence or coordination. Remove template prompts
and unused headings. Replace obsolete progress rather than appending a chronology.

Active records must support resumption: keep owner, scope, acceptance, current
assignments and dependencies, progress, blocker and next action. Link facts owned
elsewhere. At closure retain the outcome, acceptance evidence, important failures
and resolutions, verification baseline, required review results, documentation-review
scope and limitations. Summarize completed coordination instead of repeating handoffs.

Keep raw logs outside maintained documentation. Before removing unique evidence,
preserve it in committed Git history or retained artifacts with an accessible
reference; uncommitted history and temporary ignored logs alone are not preservation.
Essential conclusions must remain understandable without raw logs. Do not create
another maintained record merely to move repeated text out of the task.

## Decision workflow

1. For choices reserved to the user by `AGENTS.md`, create a task-covered proposal
   in `decisions/pending/` using the decision template. Check basename uniqueness
   across all decision folders and link affected tasks and decisions.
2. Present the problem, viable options, recommendation, and tradeoffs. Seek only
   missing choices; a user instruction already making the choice is approval.
   Record that instruction's date/context and actual choice without inventing a
   message identifier or copying a transcript.
3. Until the user decides, leave the record pending and block only dependent work.
   Independent authorized work may proceed. A recommendation, silence, elapsed
   time, or another agent's agreement does not establish user approval.
4. After approval, record the chosen option, rationale, consequences, and approval
   evidence, then move the record to `accepted/`. Acceptance authorizes the choice;
   implementation progress stays in linked tasks and current architecture docs.
5. Correct wording and references without changing approved substance. A substantive
   revision is a new pending decision. Keep the prior choice authoritative until
   its replacement is approved; then link the replacement and archive the old record.
6. Archive rejected or user-withdrawn proposals with disposition and rationale.
   An agent may withdraw its own unapproved proposal with an explanation, but may
   not label it user-rejected or rescind a user request. Folder location determines
   disposition class; archived records explain rejected, withdrawn, or superseded.

## Completion and cleanup

The task owner performs this checklist; during parallel work the coordinator owns
final integration, documentation review, and closure for **each** task.

1. Check acceptance criteria against the implemented result. Failed criteria keep
   the task active unless the user explicitly changes or waives them; record that
   choice. Cancellation is a distinct outcome, not successful completion.
2. Run checks appropriate to the change using [verification evidence](#verification-evidence).
   Verify the combined implementation
   after integration, not just independent worker branches. Repeat checks only
   when new changes, failures, or unresolved concerns justify it. Substantial or
   risky integrated changes require a reviewer who did not author them; record the
   reviewer, baseline, findings/resolution, and affected rechecks. If delegation or
   independent review cannot run, record and disclose the limitation rather than
   claiming it occurred. Unavailable checks cannot be reported as passed.
3. Read all maintained current first-party documentation and repository instructions,
   including the root README, guides and their index, architecture, accepted decisions,
   templates, pending proposals, and open tasks. Exclude dependencies, generated
   output, and archived history; inspect archives when relevant or linked.
4. Check accuracy, contradictions, duplication, stale placeholders, links, and
   record placement. Unresolved information in a pending proposal or future task
   is legitimate; placeholders in established facts or ready-project commands are
   findings. Correct affected docs within ownership boundaries and surface unresolved
   disagreements. Do not rewrite unchanged documents.
5. Promote durable task knowledge into architecture, guides, or a decision record.
   Update or create guides for changed procedures and reusable verified discoveries;
   consolidate overlap and keep one-off details in tasks. Follow the
   [guide maintenance rules](guides/README.md#create-and-maintain-guides).
   Pending or unimplemented choices must not be presented as current system behavior.
   Put unrelated issues into pending follow-ups instead of expanding the task;
   blocking acceptance failures cannot be deferred merely to close it.
6. Record review scope, findings, and follow-ups briefly in the task. Fix links
   affected by moves. Record-keeping alone does not require rechecking unchanged
   implementation or starting another task.
7. Shorten the task to useful scope, outcome, rationale, verification, limitations,
   and references, then move it to `archived/`. Retain acceptance evidence and
   meaningful caveats. Git preserves prior revisions once committed; do not rely on
   uncommitted history to preserve unique information. Do not automatically delete
   archived records or overwrite useful records during cleanup.

A full documentation review is required even for a small change. It does not
require executing every documented command or proving every system behavior.
Its cost grows with the maintained documentation set, so keep current docs concise.

### Verification evidence

- Record the check, actual result, relevant environment, tested revision or artifact,
  repository cleanliness and limitations. For integrated work, distinguish worker
  evidence from checks of the combined result. Do not invent successful checks.
- A revision identifies clean committed inputs. If modified, staged, untracked or
  generated inputs affect the checked result, identify their scope and fingerprint
  the relevant files or actual artifact. Git HEAD alone does not identify those bytes.
  Scope fingerprints to relevant inputs and exclude credentials; documentation-only
  dirtiness can be identified separately from unchanged implementation inputs.
- Capture identity at testing, building or launching, rather than deriving it later
  from a changing checkout. Distinguish the tested/deployed artifact from subsequent
  documentation commits. Retain enough detail to associate the result with its inputs
  without imposing a particular manifest, evidence folder, hash tool or runtime.
- Associate running-system checks with the actual deployment/build identifier or
  local process identity. Before stopping or replacing a local process, inspect its
  command and working location or equivalent identity; PID alone is insufficient.
  Record launch identity and verify observable behavior against the acceptance criteria.
- Fingerprints and process records do not replace behavior checks. Repeat checks
  when relevant inputs or unresolved concerns change; unchanged evidence recording
  does not require another run. Keep the concise conclusions in tasks or guide notes
  and preserve any detailed artifacts according to the record guidance above.
