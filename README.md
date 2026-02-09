# Multi-Step Onboarding App

A clean, card-based onboarding flow built with React, TypeScript, and Redux Toolkit.

## Features

- **Login & Sign Up** — Demo credentials (`user123` / `password123`) or create your own account
- **4-Step Onboarding Flow** — Profile → Favorite Songs → Payment Info → Success
- **State Persistence** — Redux state synced to localStorage; resume where you left off after a refresh
- **Inline Validation** — Red borders and error messages on invalid fields across all forms
- **Dynamic Song List** — Add/remove song entries powered by Formik & Yup

## Tech Stack

- **React 18** + **TypeScript**
- **Redux Toolkit** + **React Redux** — State management & persistence
- **React Router v6** — Routing with protected routes
- **Formik** + **Yup** — Form handling for the songs step
- **shadcn/ui** — UI component library (Card, Button, Input, etc.)
- **Tailwind CSS** — Utility-first styling
- **Vite** — Dev server & bundler

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone 'https://github.com/Yagnik56/onboarding-journey'

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server with hot reload
npm run dev
```

The app will be available at `http://localhost:8000`.

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm run test
```

## Project Structure

```
src/
├── components/
│   ├── onboarding/        # Onboarding step components
│   │   ├── StepIndicator.tsx
│   │   ├── StepProfile.tsx
│   │   ├── StepSongs.tsx
│   │   ├── StepPayment.tsx
│   │   └── StepSuccess.tsx
│   └── ui/                # shadcn/ui components
├── hooks/                 # Custom React hooks
├── pages/
│   ├── LoginPage.tsx
│   ├── SignUpPage.tsx
│   ├── OnboardingPage.tsx
│   ├── HomePage.tsx
│   └── NotFound.tsx
├── store/
│   ├── index.ts           # Redux store with localStorage persistence
│   ├── authSlice.ts       # Authentication state (login, register)
│   └── onboardingSlice.ts # Onboarding progress & form data
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Routes & app shell
└── main.tsx               # Entry point
```

## App Flow

1. **Login / Sign Up** → Authenticate with demo or custom credentials
2. **Onboarding Step 1** → Fill in your profile (name, age, email, photo)
3. **Onboarding Step 2** → Add your favorite songs (dynamic list)
4. **Onboarding Step 3** → Enter payment information
5. **Onboarding Step 4** → Success! Redirected to the Home page
6. **Home** → Welcome page with sign-out option

All progress is saved automatically — close the browser and come back later to pick up where you left off.

## Demo Credentials

| Username  | Password      |
|-----------|---------------|
| `user123` | `password123` |

## License

This project is for educational/demo purposes.
