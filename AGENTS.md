# Project agent instructions

## Start here

- Read applicable repository instructions, then [the documentation map](docs/README.md)
  and [the project record](docs/project.md). Read relevant tasks and decisions;
  consult the relevant [guides](docs/guides/README.md) before rediscovering procedures.
- The project record alone owns lifecycle status. For `new` or `setup`, follow
  [the setup guide](docs/setup.md); for `ready`, follow the development workflow
  below. Inspect repository evidence before acting on a status marker.
- Work toward the user's requested outcome. A setup marker does not authorize
  unrelated setup work. Preserve existing work and resume completed setup steps.
- Follow the applicable instruction hierarchy. When accepted intent and observed
  implementation disagree, identify the discrepancy instead of silently rewriting
  either. Record unknowns rather than inventing project facts or successful checks.

## Authority and decisions

- The user owns scope, architecture, major stack or service choices, public
  contracts, and material cost or security changes. Propose these through
  [the decision workflow](docs/README.md#decision-workflow) before implementing them.
- Routine implementation choices within agreed boundaries belong to the agent;
  record useful rationale in the task instead of creating unnecessary decisions.
- Honor authorization already given. Record agreed remote-action boundaries in
  the project record and proceed within them; ask only for unresolved choices or
  actions outside those boundaries. Silence and recommendations are not approval.
- Pending proposals are not policy. Block only work that depends on an unresolved
  choice; continue independent authorized work.
- Agents maintain accepted decision wording and links. Substantive changes need
  a new user-approved decision. Preserve user-approved workflow and authority rules
  when editing these instructions; propose substantive changes to those rules.
- Never commit credentials or put secrets, transcripts, or routine raw logs in docs.

## Development workflow

- Every repository change belongs to a task. Before editing, create or reuse one
  using [the task workflow](docs/README.md#task-workflow) and
  [task template](docs/templates/task.md). Read-only exploration needs no task file.
- Keep related implementation, tests, documentation, and cleanup in one task.
  Bookkeeping does not create recursive tasks. Split only independently useful work.
- Follow the [task record guidance](docs/README.md#task-record-size-and-maintenance):
  keep current handoffs concise and replace obsolete progress instead of appending logs.
- Folder location owns task status. Keep blocked work active with its blocker and
  next action recorded. Do not maintain another task inventory or status field.
- Respect task scope and other owners. Update affected documentation with behavior
  changes; distinguish implemented architecture from approved future work.
- Verify acceptance criteria with checks appropriate to the change. Record the
  check, result, environment, tested revision/artifact, cleanliness, and limitations
  using [verification evidence](docs/README.md#verification-evidence). Identify actual
  uncommitted inputs and running artifacts; Git HEAD or a PID alone is insufficient.
  Never claim a check passed when it failed or could not run.
- Before interruption, record changes, checks, blockers, and the next action so
  another worker can resume without reconstructing a conversation.

## Concurrent work

- The agent handling the user's implementation request is coordinator; delegated
  workers retain their assigned roles. The request authorizes proactive delegation
  of useful, independent implementation, investigation, or verification within the
  requested scope, using available subagent capabilities.
- Inspect project context, relevant guides, existing work, dependencies, and available
  capacity first. With two useful independent implementation scopes and capacity,
  use at least two implementing agents; the coordinator may implement one scope.
  Small size alone is not a serial exception; do not manufacture unnecessary scopes.
  Follow the guide's concrete serial exceptions and record a brief reason in the task.
  Adapt team size to useful work and capacity, counting coordinator and observer.
- Follow the [parallel-work guide](docs/guides/parallel-work.md). Only the coordinator
  spawns and assigns workers; workers request help through it and do not spawn agents
  or self-claim from stale branch copies. Keep existing environment/model settings.
- Delegation does not expand scope, approve pending decisions, or authorize remote
  actions beyond agreed boundaries. Respect higher-priority restrictions. If tools
  are unavailable or prohibited, continue serially where possible and disclose the
  limitation; never claim delegation or independent review occurred when it did not.
- Use subagent tools, not user-owned chats or external services as a substitute.
  Before dispatch, record the task, owner/worker role, acceptance criteria, relevant
  context, dependencies, editing/resource boundaries, baseline, and expected handoff.
  Use separate task records for independently owned implementation scopes; read-only
  assignments can remain in the owning task.
- Prefer separate branches and worktrees. In a shared checkout, serialize
  overlapping edits; the coordinator controls shared Git staging and commits.
- Coordinate shared databases, migrations, deployment targets, and remote settings
  as well as files. Separate worktrees do not isolate these resources.
- Workers update their task and relevant docs within their editing boundaries,
  then hand off results and evidence. Route changes to shared or unowned docs
  through the coordinator instead of editing them concurrently.
- Serialize changes to instructions, project state, decision dispositions, and task
  locations. The coordinator records approved shared changes and moves task files.
- Continue useful non-overlapping work and monitor workers. Wait for results before
  dependent integration or completion. Before replacing a worker, confirm it stopped,
  inspect retained changes, and transfer ownership; do not overlap assignments or
  blindly repeat failed work.
- A finished contribution stays active awaiting integration. The coordinator
  integrates, verifies the combined result, reviews docs, and closes the task.
- For substantial or risky integrated changes, require a reviewer who did not author
  them; resolve actionable findings and repeat affected checks after fixes. If review
  cannot run, record and disclose that limitation without claiming independent review.
  Review-only delegation does not satisfy parallel implementation.
- Transfer coordinator ownership explicitly and reconcile work before reassignment.

## Completion and cleanup

- Before each task closes, follow the full
  [completion and cleanup checklist](docs/README.md#completion-and-cleanup).
- Review all maintained current project docs, repository instructions, templates,
  open tasks, and pending decisions. Exclude dependencies, generated output, and
  archived history; consult relevant or linked archives as needed.
- Failed acceptance criteria prevent completion unless the user changes or waives
  them. Put unrelated issues in pending follow-ups rather than expanding the task.
- Promote lasting knowledge into its authoritative document, including reusable
  procedures and confirmed fixes in guides. Repair affected links and archive concise
  outcomes and verification. Do not automatically delete history.
- Record review scope and findings. Do not rewrite unchanged docs or rerun unchanged
  implementation checks just to record evidence or complete documentation cleanup.
- The coordinator owns closure, archival, and the final user-facing report, including
  integration evidence, required review results, and unresolved limitations.

## Guides and commands

- [Guides](docs/guides/README.md) own verified commands, prerequisites, and repeatable
  procedures. Keep command bodies there; link to them rather than copying them here.
- Treat guides as maintained project knowledge. Create or update them when your
  work changes a procedure or establishes reusable verified knowledge. Prefer
  extending an existing guide; keep one-off details in tasks and consolidate overlap.
- Confirm instructions apply to the checked-out code and environment. If a needed
  guide is missing or stale, investigate and correct it within the same task. Distinguish
  verified instructions from unresolved hypotheses; never invent commands or results.
- Follow [guide maintenance rules](docs/guides/README.md#create-and-maintain-guides).
  Use existing editing boundaries for concurrent changes. Before guides exist,
  establish applicable procedures during setup; do not treat template text as commands.

## Setup handoff

Before regular development begins, the setup owner performs the
[controlled instruction rewrite](docs/setup.md#transition-to-regular-development).
Preserve the working rules above, replace setup routing and this handoff section
with project-specific guidance, and retain the setup guide outside the normal
development startup reading path. Subsequent agents read the resulting file.
