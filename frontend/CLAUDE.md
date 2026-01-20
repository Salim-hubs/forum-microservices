# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run all tests
npm test

# Run tests in CI mode (no watch, no progress)
ng test --configuration=ci

# Run a single test file
ng test --include=**/login.page.spec.ts

# Lint the codebase
npm run lint

# Watch mode build
npm run watch
```

## Architecture Overview

This is an **Ionic Angular** forum application frontend using **standalone components** (no NgModules). It connects to a backend microservices architecture through an API Gateway.

### Key Patterns

- **Standalone Components**: All pages and components use `standalone: true` with explicit imports
- **Lazy Loading**: Routes use `loadComponent()` for code splitting
- **API Communication**: All backend requests go through the `Message` service (`src/app/services/message.ts`) which proxies to an API Gateway at `http://127.0.0.1:3000/`
- **Backend Response Format**: Expects `{ status: "ok" | "error", data: any }` from all endpoints
- **Ionic Lifecycle**: Pages implement `ViewWillEnter` for data loading on navigation

### Project Structure

```
src/
├── app/
│   ├── components/     # Reusable components (header)
│   ├── pages/          # Route pages (login, register, topics, topic, profile, online)
│   ├── services/       # Angular services (message)
│   ├── app.routes.ts   # Route definitions with lazy loading
│   └── app.component.ts
├── environments/       # Environment configs (dev/prod)
├── theme/              # Ionic theme variables (SCSS)
└── main.ts             # Bootstrap with providers
```

### Component Conventions

- Pages are in `src/app/pages/{name}/{name}.page.ts`
- Components use SCSS for styling
- Header component uses Angular signals (`input.required<T>()`)
- Standard imports: `IonContent` from `@ionic/angular/standalone`, `CommonModule`, `FormsModule`
