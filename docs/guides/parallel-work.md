# Coordinate parallel agent work

## Purpose and applicability

This framework workflow guide applies when an implementation request contains
useful independent work. The agent handling the user's request coordinates available
subagents; delegated workers retain their assigned roles. No separate delegation
approval is needed within the requested scope. Follow
[agent instructions](../../AGENTS.md), [project boundaries](../project.md), and
the [task workflow](../README.md#task-workflow). This guide adds no runtime or tools.

## Assess and assign

1. Inspect project context, relevant guides, open work, dependencies, and available
   delegation capabilities before dispatch. When two useful implementation scopes
   can proceed independently and capacity permits, use at least two implementing
   agents. The coordinator may implement one scope while delegating another.
   Small size alone does not justify serial execution; do not manufacture scopes
   merely to create concurrency. Research or review alone does not count as
   concurrent implementation.
2. Adapt concurrency to useful independent work, available capacity, editing
   boundaries, shared resources, and known limits. Count the coordinator and any
   external observer against available slots; do not fill slots just because
   they exist. Retain existing environment/model settings unless instructed otherwise.
   Serial implementation is appropriate for one useful scope, dependencies,
   conflicts that cannot safely be isolated, unavailable capacity or tools, or
   explicit restrictions. Record the concrete reason briefly in the owning task.
3. Use one coordinator. Only it spawns and assigns workers; workers request help
   through it rather than recursively delegating. Do not create user-owned chats
   or contact external services as a substitute for subagent tools.
4. Record coordinator identity and integration location in the project record.
   Assign independently owned implementation scopes through tasks using the
   [task template](../templates/task.md). Keep short read-only research/review
   assignments in the owning task unless a separate persistent record is useful.
   Parent tasks link child tasks without duplicating their status. Follow
   [task record maintenance](../README.md#task-record-size-and-maintenance) rather
   than accumulating repeated updates or copying authoritative context.
5. Record each assignment's worker identity/role, task reference, goal, acceptance
   criteria, context links, dependencies and agreed interfaces, editing/resource
   boundaries, working location and baseline, and expected handoff. Include
   applicable permission limits. Tasks own assignments; stale branch copies do
   not authorize self-claiming work.
6. Prefer separate branches/worktrees. In a shared checkout, serialize overlapping
   edits and reserve shared Git staging/commits for the coordinator. Assign shared
   interfaces before dependent work begins. Coordinate databases, migrations,
   deployment targets, and remote settings too; worktrees do not isolate them.

Delegation neither expands scope nor approves pending decisions, spending, or
remote actions. Higher-priority restrictions still apply. If delegation is absent
or prohibited, proceed serially where possible and disclose the limitation; do
not claim parallel execution or independent review occurred.

## Monitor and recover

- The coordinator continues useful non-overlapping work, monitors workers at
  dependency or handoff points, and waits for results before dependent integration
  or declaring success. Workers report blockers, conflicts, and discoveries that
  affect another owner promptly, without expanding their scope.
- Block only dependent work. Revise assignments within approved boundaries while
  independent work continues. Keep progress, blockers, and next actions in tasks
  so interrupted work can resume without a conversation transcript.
- Workers update their own task and relevant docs within their boundaries. Guide
  maintenance belongs to the same task; route shared guide/index changes and
  other unowned files through the coordinator. Serialize instructions, project
  state, decision dispositions, and task moves.
- Before replacing a failed/interrupted worker, confirm it has stopped, inspect
  retained changes, and transfer ownership explicitly. Preserve useful work;
  do not overlap assignments or blindly repeat a failed approach.
- On coordinator handoff, explicitly transfer the role and reconcile active
  assignments, retained changes, shared resources, and pending results before
  further dispatch.

## Integrate, review, and close

1. Each worker returns changed files/artifacts, verification results and limitations,
   documentation updates, unresolved issues, and the tested revision or precise
   artifact reference under the [verification evidence rules](../README.md#verification-evidence).
   Keep its task active awaiting integration.
2. The coordinator reconciles contributions and verifies the combined result
   against acceptance criteria. Passing worker checks alone do not establish
   integration success; failed integration keeps dependent tasks active.
3. For substantial or risky changes, assign a reviewer who did not author the
   changes under review. Examples include cross-component work, public interfaces,
   security-sensitive behavior, migrations, and complex integration. Review the
   integrated result and record its revision/artifact and findings. A non-author
   reviewer does not substitute for required concurrent implementation. Resolve
   actionable findings and repeat affected checks after relevant fixes.
4. If independent review cannot run, record why and report the limitation; never
   describe self-review as independent. Preserve any applicable acceptance or
   user-approval requirements rather than claiming unavailable checks passed.
5. The coordinator applies the full [completion checklist](../README.md#completion-and-cleanup)
   before closing **each** task: acceptance, verification, all maintained current
   documentation, reusable knowledge, link repair, and concise evidence. Include
   open tasks, pending decisions, guides, and templates; inspect archives when
   relevant. A review does not require rewriting unchanged docs or rerunning all
   documented commands. Failed criteria remain active unless the user changes or
   waives them; cancellation records its distinct outcome.
6. The coordinator owns task moves, archival, and the final report. Include outcomes,
   meaningful verification, remaining blockers, and capability/review limitations.

## Setup and instruction handoff

One setup owner coordinates foundation choices and the instruction rewrite. After
prerequisites are agreed, delegate bounded setup work using the same rules above.
Finish or reconcile workers and their retained changes before the
[instruction transition](../setup.md#transition-to-regular-development). Preserve
the two-implementer default, concrete serial exceptions, adaptive concurrency,
review, and authority rules in development instructions. Explicitly hand off
rewritten instructions to active sessions; do not assume file edits reload their
context.

## Verification note

This is framework workflow guidance, not evidence of successful execution in a
particular project or agent environment. Framework authoring tests and their dated
results belong outside the copyable starter; their reports distinguish observed
behavior, failures, and limits. A copied project records its own actual checks and
artifact evidence in the owning tasks under the
[verification evidence rules](../README.md#verification-evidence). Documentation
review checks consistency and portable references; it does not establish a live
orchestration pass.
