# DEBE Learning Tech Assessment Submission

## Part 1 — Portfolio

Completed the portfolio section as required.

## Part 2 — Debugging

### Original Issues

The booking Cloud Function contained issues related to:

- Incorrect Firestore read handling.
- Missing `await` for asynchronous Firestore operations.
- Returning success before the database write completed.

### Fixes

The corrected implementation:

- Uses `async/await`.
- Waits for the Firestore read to complete.
- Checks whether the requested slot is already booked.
- Returns an appropriate response when the slot is unavailable.
- Waits for the Firestore write to complete before returning success.

Files:

- `part2-debug/original.ts`
- `part2-debug/fixed.ts`

## Part 3 — Reschedule Widget

Built a Next.js rescheduling widget for upcoming tutoring sessions.

### Implemented Features

- Upcoming tutoring session cards.
- Reschedule modal.
- Available time-slot selection.
- Two-hour minimum scheduling rule.
- Disabled unavailable / too-soon slots.
- Selected-slot state.
- Rescheduling loading state.
- Reschedule confirmation.
- Updated session date and time after confirmation.
- Success notification.
- Prevention of closing the modal while rescheduling.
- UTC timestamp conversion to the user's local timezone.
- Responsive UI using Tailwind CSS.

### Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

### Part 3 Location

`part3-widget/`

## Git History

The implementation was developed incrementally with meaningful commits:

- `chore: initialize assessment submission`
- `fix: document and resolve booking function bugs`
- `feat: scaffold reschedule widget`
- `feat: add reschedule confirmation flow`
- `feat: handle unavailable reschedule slots`
- `feat: polish reschedule widget UX`