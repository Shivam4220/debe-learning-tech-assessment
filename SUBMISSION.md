# DEBE Learning Tech Assessment Submission

## Part 1 — Portfolio

# Part 1 — GitHub Portfolio Walkthrough

## GitHub Profile

https://github.com/Shivam4220


## Repository 1 — Online Quiz Platform

Repository: https://github.com/Shivam4220/quiz-app

### Problem it solves

The Online Quiz Platform is a web application that allows users to register and log in, browse available quizzes, attempt questions, submit their answers, and view their results.

The goal was to create a complete quiz experience with authentication, protected pages, quiz management, and automatic score calculation.

### What I specifically built

I built the application using the MERN stack.

I implemented:

- User registration and login using JWT authentication
- Protected routes for authenticated users
- Dashboard for displaying available quizzes
- Quiz fetching from the backend
- Quiz attempt and answer submission
- Automatic score calculation
- Result page showing the user's score
- MongoDB integration for storing application data
- REST APIs using Node.js and Express
- React frontend with React Router
- Deployment of the application

I also worked on connecting the frontend and backend and handling authentication tokens using local storage.

### One design decision I would make differently today

If I were rebuilding the project today, I would structure the frontend into smaller reusable components from the beginning.

Initially, some of the UI and logic were more closely coupled. Separating components and business logic more clearly would make the application easier to maintain and would make adding features such as quiz history and an admin dashboard easier.


## Repository 2 — Task Manager

Repository: https://github.com/Shivam4220/task-manager   (frontend)
            https://github.com/Shivam4220/task-manager-backend   (backend)

### Problem it solves

The Task Manager is a full-stack application designed to help users create, manage, and organize tasks through a web interface.

The application provides a backend API for managing tasks while also handling authentication and access control.

### What I specifically built

I worked on the backend using Node.js, Express, and MongoDB.

I implemented:

- User authentication using JWT
- Protected API routes
- Task CRUD operations
- Admin middleware and authorization
- Task filtering
- Pagination
- Sorting
- Search functionality
- Request validation
- Error handling
- MongoDB Atlas integration
- Environment variable configuration
- REST API testing using Postman/Thunder Client
- Backend deployment

The project helped me understand how authentication, authorization, database operations, API design, and backend validation work together in a full-stack application.

### One design decision I would make differently today

If I were rebuilding the project today, I would separate the application into clearer service and controller layers.

This would keep business logic separate from HTTP request handling and make the backend easier to test, maintain, and extend as the number of features grows.

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



Part 4 - Submission link:-(google drive link)
https://drive.google.com/file/d/1OM2bmdAmW6amP8VVk_gctTGY_q85wrih/view?usp=drive_link
