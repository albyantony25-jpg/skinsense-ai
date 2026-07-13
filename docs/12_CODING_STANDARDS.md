# 12_CODING_STANDARDS.md

# Coding Standards

## Philosophy

Write code that is readable, reusable, predictable, and easy to
maintain.

## File Naming

-   Components: PascalCase (PredictionCard.tsx)
-   Hooks: camelCase with `use` prefix (usePrediction.ts)
-   Utilities: camelCase
-   Constants: UPPER_SNAKE_CASE where appropriate

## Component Rules

-   One responsibility per component
-   Keep components under \~200 lines when practical
-   Extract repeated UI into reusable components

## React Best Practices

-   Functional components only
-   Prefer composition over inheritance
-   Avoid prop drilling; use Context only when necessary
-   Keep side effects inside `useEffect`

## Tailwind Guidelines

-   Group utilities logically: layout → spacing → typography → colors →
    effects
-   Use design tokens, avoid arbitrary values unless needed

## Error Handling

-   Never fail silently
-   Show user-friendly messages
-   Log technical errors separately

## Git Workflow

-   feat:
-   fix:
-   refactor:
-   docs:
-   style:
-   chore:

Example: feat: add confidence ring animation

## Pull Request Checklist

-   UI matches design system
-   Responsive
-   Accessible
-   No console errors
-   Components reused where possible
-   Loading/error states tested

## Code Review Checklist

✓ Clean naming ✓ Small functions ✓ Reusable components ✓ Accessibility ✓
Performance ✓ Responsive layout
