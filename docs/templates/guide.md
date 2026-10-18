# Guide: Procedure or problem

Template: copy into `docs/guides/` with a descriptive filename and add it to the
guide index. Remove this paragraph and unused optional sections. Resolve links
from the destination folder. Prefer extending a suitable guide over adding one.

## Purpose and applicability

State the outcome, when to use this guide, and the relevant environment. For
troubleshooting, start with the observable symptom and distinguish a confirmed
cause from an unresolved hypothesis.

## Prerequisites

State required tools/configuration, the working directory, and any applicable
action boundary. Refer to authoritative configuration and procedures rather than
duplicating them. Never include credentials.

## Procedure

Give concise steps and actual commands verified for this project, with their
working directory and required inputs. Explain relevant side effects. Link an
existing command's owning guide instead of repeating it. Do not invent commands.

## Expected result and verification

Describe the observable result and how to check it. For troubleshooting, explain
the confirmed cause, fix, and how to establish that the symptom is resolved.

## Failure or recovery steps

Optional: document known failures, safe recovery/rollback steps, or links to the
relevant troubleshooting procedure. Label unverified possibilities explicitly.

## Verification note

Record the actual check/result, relevant environment, tested revision or artifact,
cleanliness and limitations, following [verification evidence](../README.md#verification-evidence).
Identify uncommitted inputs and running artifacts when applicable. If not verified, say so and link the task/blocker; do not imply
success. Update this note when the procedure changes or is reverified, not on
every documentation review. Keep implementation history and detailed evidence
references in tasks.
