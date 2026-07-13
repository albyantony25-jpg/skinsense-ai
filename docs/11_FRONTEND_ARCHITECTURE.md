# 11_FRONTEND_ARCHITECTURE.md

# Frontend Architecture

## Stack

-   React
-   Vite
-   Tailwind CSS
-   Framer Motion
-   React Router
-   TanStack Query
-   Lucide React

## Folder Structure

src/ assets/ components/ common/ layout/ prediction/ upload/ dashboard/
hooks/ pages/ services/ context/ utils/ constants/ types/ animations/
styles/

## Architecture Principles

-   Feature-first organization
-   Reusable components
-   Single responsibility
-   Composition over inheritance

## State Management

-   Local state: useState
-   Shared UI: Context
-   Server state: TanStack Query

## API Layer

services/ - api.ts - prediction.ts

Never call fetch directly inside components.

## Custom Hooks

-   usePrediction
-   useUpload
-   useTheme
-   useToast

## Routing

/ /upload /results /history /about /faq

## Performance

-   Lazy load pages
-   Memoize expensive components
-   Optimize images
-   Code splitting

## Coding Standards

-   Functional components
-   Named exports
-   Strict typing where possible
-   Small reusable components
