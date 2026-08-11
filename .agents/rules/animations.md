---
trigger: always_on
description: Animation and smooth UI transition guidelines for NANO-VEO3-API
globs: ["app/**/*", "components/**/*"]
---

# Animation Guidelines

## Objective

Ensure consistent, subtle, and high-performance UI transitions and micro-animations across the NANO-VEO3-API interface without interfering with physical 3D camera projections.

## Rules

- **CSS Transitions & Tailwind**: Use Tailwind CSS smooth transitions for hover, active, and focus states.
- **Performance**: Ensure 60 FPS performance by animating GPU-accelerated properties (`opacity`, `transform`).
- **No 3D Camera Simulations**: Animations should remain flat and responsive, keeping media previews clean and accessible.
