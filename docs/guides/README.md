# Project guides

Guides own verified commands and repeatable procedures. Consult the relevant guide
before rediscovering how to run, test, deploy, or troubleshoot the project. This
index points to procedures; it does not duplicate their commands. Initial project
setup and the instruction transition remain in the [setup guide](../setup.md).

## Find the right guide

The coordination and project procedure guides are listed below.
Create only useful guides; omit inapplicable topics with a brief reason instead of
adding empty files. Add new topics here when they become useful.

| Need | Guide or suggested contents |
| --- | --- |
| Coordinate agents | [Parallel work](parallel-work.md): framework workflow for delegation, handoff, review, and integration |
| Install or run locally | [Local development](local-development.md): prerequisites, environment configuration, installation, development/build commands, startup checks |
| Verify changes | [Verification](testing.md): tests, linting, type checks, required CI checks, interpreting results |
| Release or recover a release | [Local operation](local-operation.md): target environment, prerequisites, deployment, acceptance checks, rollback/recovery |
| Resolve a known problem | No separate guide yet; confirmed problems go in the relevant existing guide |

Keep this index current when creating, renaming, consolidating, or removing guides.
Keep navigation in this index; the main documentation map links here instead of
maintaining a second list of procedures.

## Create and maintain guides

- Create or update a guide when implementation changes commands, prerequisites,
  configuration, or workflows, or establishes reusable verified knowledge. This is
  an ongoing responsibility, not just a setup deliverable.
- Prefer extending an existing guide. Create one using the [guide template](../templates/guide.md)
  only when no appropriate home exists; keep one-off details in the task. Small
  guides can use a few headings rather than every optional template section.
- Keep each command or procedure authoritative in one guide; other docs link to
  its relevant heading. Runtime manifests/scripts still define executable behavior;
  guides explain the verified invocation, working directory, and prerequisites.
- State the environment a procedure applies to. Confirm it matches the checked-out
  code and current configuration before using it. If missing or stale, inspect the
  actual project, correct the guide within the same task, and record verification.
- Record a brief verification note with the check/result, relevant environment,
  and tested revision or artifact using [verification evidence](../README.md#verification-evidence).
  Update it when the procedure changes or is
  reverified; do not refresh it merely because a documentation review occurred.
  Mark any unverified hypothesis or pending procedure explicitly; it is not a
  confirmed fix or a successfully tested workflow.
- For troubleshooting, use symptom → confirmed cause → fix → verification. Link
  established procedures rather than duplicating them. Distinguish hypotheses from
  confirmed causes; omit credentials, transcripts, and routine raw logs.
- A documented command is not permission to run it. Follow the project's agreed
  action boundaries; a documentation review does not require deploying, altering
  data, or rerunning every command to establish that a guide was read.
- Use the current task and its editing boundaries for guide changes. Coordinate
  shared guide/index edits through the coordinator during parallel work. Before
  task archival, promote reusable discoveries, consolidate overlap, and repair
  affected links. Include all current guides in the full documentation review.
