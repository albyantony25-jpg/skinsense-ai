# 14_PERFORMANCE.md

# Performance Guide

## Goal

Deliver a fast, smooth experience across desktop and mobile.

## Core Web Vitals Targets

-   LCP \< 2.5s
-   INP \< 200ms
-   CLS \< 0.1

## React Optimization

-   Lazy load routes with React.lazy()
-   Use Suspense for loading states
-   Memoize expensive components with React.memo
-   Memoize callbacks with useCallback where beneficial
-   Cache derived values with useMemo

## Images

-   Compress assets
-   Use modern formats where practical
-   Lazy load non-critical images
-   Show blurred placeholders

## Bundles

-   Code split by route
-   Avoid large dependencies
-   Tree-shake unused code

## Network

-   Cache API responses where appropriate
-   Show optimistic UI only when safe
-   Retry transient failures

## Rendering

-   Virtualize large tables if scan history grows
-   Avoid unnecessary re-renders

## Lighthouse Goals

Performance: 95+ Accessibility: 100 Best Practices: 100 SEO: 90+

## Checklist

✓ Lazy loading ✓ Optimized images ✓ Small bundles ✓ Smooth animations ✓
Fast first paint
