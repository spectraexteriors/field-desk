# Project setup and adoption

Use this procedure for setup or deliberate adoption. The project record owns
lifecycle and progress; the setup task owns its acceptance and handoff evidence.
Keep this guide for reference after setup, outside routine development startup.

## Inspect and reconcile

Read applicable instructions, the documentation map, project record, and relevant
tasks, decisions, and existing guides before rediscovering procedures. Inspect files,
manifests, lockfiles, environment examples, Git state/remotes, CI, and any authorized
service configuration. Do not expose secrets while inspecting configuration.
Distinguish observed facts from assumptions.

The `new` marker does not establish that a directory is empty or authorize a stack
choice. Work toward the requested outcome and preserve existing files and local
changes. Reuse the seeded task rather than creating a second setup task on every run.
Assign its owner and move it to active before changes begin; repair links when moving it.

### Adopt an existing project

Merge the framework deliberately with existing instructions, records, guides, and
naming conventions. Preserve useful existing procedures and their verification;
link or consolidate them rather than copying commands into a competing guide.
Preserve applicable agreements and history rather than blindly overwriting files.
Reconcile lifecycle and check off only setup steps supported by evidence.
Do not rerun Git initialization, scaffolding, installations, or remote
provisioning just because the template begins with an unchecked checklist.

If the established baseline satisfies the agreed readiness requirements, validate
and record it, then perform any remaining documentation/instruction transition.
Otherwise track missing work and blockers in setup. A new template does not reset
a mature project's implemented state.

## Agree the foundation

Clarify purpose, audience, observable success criteria, scope, constraints, runtime,
stack, package management, Git hosting, CI, and deployment. Ask only what cannot
be derived or has not already been decided. Put high-level choices through the
[decision workflow](README.md#decision-workflow); combine related foundation choices
into one proposal when that makes the agreement easier to review.

Agree repository ownership/visibility, allowed provisioning, target environments,
publishing permissions, and relevant spending limits. Record those boundaries in
the project record. Approval already supplied is valid; request only missing
choices or actions outside agreed boundaries. Prepare concrete local work before
seeking any remaining publishing approval, and continue independent work while
blocked. A pending decision authorizes neither its implementation nor spending.

Once setup work begins, use lifecycle `setup`. Record completed checklist items
and blockers in the project record; link the task rather than duplicating progress.

One setup owner coordinates foundation choices and the instruction rewrite.
After prerequisites are agreed, apply the parallel default to useful independent setup scopes
using the [parallel-work guide](guides/parallel-work.md). User approvals and shared
resources remain coordinator-controlled; unresolved prerequisites block only
dependent work. Finish or reconcile setup workers before the instruction transition.

## Establish the baseline

- Reuse or establish the agreed runtime, manifests, package manager, and lockfiles.
  Follow the chosen ecosystem's reproducibility conventions without introducing
  unnecessary dependencies or competing package managers.
- Establish environment examples and installation instructions without credentials.
  Verify the smallest useful local run and checks appropriate to the project.
- Inspect Git before initializing it. Preserve remotes and history. Establish the
  agreed remote, ignore generated/private files, and publish only within authorization.
- Configure required CI and obtain an actual passing result. A workflow file alone
  is not evidence that CI works; record provider, check, revision, and result.
- Deploy to the agreed environment and verify the useful behavior defined during
  intake. A successful build or reachable URL alone may not satisfy that behavior.
  For libraries, tools, or other nondeployed projects, agree and record a meaningful
  alternative explicitly rather than silently omitting the requirement.
- Create the project root README and applicable [project guides](guides/README.md),
  linking the README from the documentation map and procedures from the guide index.
  Capture verified installation/environment/run/build steps, testing and required
  CI checks, deployment/rollback or the approved alternative, and confirmed
  troubleshooting fixes as applicable. Explain inapplicable topics in the guide
  index rather than creating empty files. Guides own commands and procedures;
  `AGENTS.md` links to them instead of maintaining a duplicate command table.
- Follow the [guide maintenance rules](guides/README.md#create-and-maintain-guides)
  and [guide template](templates/guide.md). Include prerequisites, working directory,
  expected results, relevant recovery steps, and brief actual verification notes.
  Keep unverified possibilities distinct from verified instructions.
- Create an architecture overview grounded in the implementation, including key
  boundaries, interfaces, and data flow where relevant. Label approved future
  changes and link decisions instead of duplicating their rationale.

Update the project checklist as each item is verified. Missing credentials, failed
CI, or blocked deployment keep setup incomplete; record what is done, the blocker,
and the next action. Never claim readiness from planned or unavailable checks.

## Transition to regular development

One setup owner completes this transition before normal development workers begin.
Stop new setup dispatch, collect worker handoffs, and finish or reconcile all setup
assignments first. Confirm workers cannot continue stale writes; record retained
changes and stop/transfer ownership before reassignment. Do not rewrite shared
instructions while workers are still editing against the previous version.

1. Confirm the agreed baseline against the project checklist, acceptance criteria,
   and actual [verification evidence](README.md#verification-evidence). Identify
   cleanliness, actual uncommitted inputs and deployed artifacts/processes where
   applicable; record the target or approved alternative and material limitations. A later documentation
   commit recording evidence does not invalidate unchanged implementation checks.
2. Ensure the previous instructions are recoverable in local Git history before
   rewriting root `AGENTS.md` in place, respecting project commit rules and unrelated
   changes. Preserve agreed authority, task, coordination, verification, and
   documentation rules. Replace setup routing and the handoff section with concise
   project-specific guidance. Link the verified applicable guides from development
   instructions; keep command bodies authoritative in the guides. Retain the ongoing
   guide-maintenance and parallel implementation default after setup, including
   concrete serial exceptions, adaptive capacity, no recursive spawning, bounded
   assignments, integrated verification and non-author review for substantial/risky work.
   Preserve concise task records and accurate verification/runtime identity requirements.
   Explain genuinely inapplicable
   checks in the guide index instead of inventing commands.
3. Retain this setup guide as reference, not a mandatory development startup read.
   Preserve old instructions through Git history without maintaining a second copy.
   Keep the rewritten instructions concise; aim for fewer than 150 lines, linking
   detailed procedures instead of duplicating them. Do not weaken agreed rules.
4. Review the instruction diff and explicitly read back the resulting file. Perform
   the full documentation review in the [completion checklist](README.md#completion-and-cleanup).
   Check that guide links, verified procedures, project facts, and lifecycle routing
   agree. Do not leave pending-proposal placeholders presented as accepted facts.
5. Record the instruction handoff before task closure. Existing sessions may retain
   earlier instructions; direct any active workers to read the new file and record
   who received the handoff, or that there are no other workers. Start subsequent
   workers with the new instructions. Do not assume a file edit automatically
   refreshes running agent instructions.
6. Update the final setup evidence and lifecycle to `ready` as one coherent change
   with the instruction rewrite. Complete and archive the setup task with its
   outcome and references, fixing links after the move. If a requirement fails,
   keep `setup` and a resumable task instead of claiming completion; retain setup
   routing until the transition can finish.

Codex builds its instruction chain at run startup. See the
[official instruction discovery documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

After readiness, normal development follows `AGENTS.md`. Record later problems in
tasks; `ready` records completion of setup, not an uptime guarantee. Reopen setup
only when the user requests a deliberate setup change or adoption work requires it.
