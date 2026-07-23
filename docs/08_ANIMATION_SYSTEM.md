# 08_ANIMATION_SYSTEM.md

# Animation System

## Philosophy

Animations should communicate state, improve clarity, and delight users
without slowing them down.

## Core Library

-   Framer Motion

## Timing

-   Fast: 150ms
-   Normal: 250ms
-   Slow: 450ms

## Easing

-   easeOut for entrances
-   easeInOut for transitions
-   Spring for interactive elements

## Page Transitions

-   Fade + slight upward movement
-   Duration: 0.35s

## Hero

-   Headline fades up
-   CTA buttons stagger
-   Stats count up
-   Illustration floats gently

## Cards

-   Lift 6px on hover
-   Soft shadow increase
-   Border glow animation

## Buttons

-   Scale to 0.98 on press
-   Glow on hover
-   Ripple effect on click

## Upload Zone

-   Highlight on drag
-   Pulse while waiting
-   Preview fades in

## Loading

Replace spinner with: - Neural network animation - Progress bar -
Rotating status text: - Loading model... - Extracting features... -
Analyzing image... - Preparing results...

## Results

-   Confidence ring animates 0→value
-   Progress bars animate left→right
-   Recommendation cards fade in sequentially

## Scroll Animations

-   Reveal sections
-   Stagger cards
-   Parallax hero background

## Background Effects

-   Aurora gradient
-   Floating particles
-   Cursor glow
-   Animated grid opacity

## Motion Accessibility

-   Respect prefers-reduced-motion
-   Disable decorative animations when enabled
