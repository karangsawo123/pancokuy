---
name: pancokuy-design
description: Use this skill to generate well-branded interfaces and assets for PancoKuy (platform komunitas arm wrestling / panco Indonesia), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files (tokens/, components/, guidelines/, assets/).

PancoKuy uses the "Deep Steel" palette and is **light-mode-first**: default background #EEF2F7, surface #FFFFFF, text #0F172A. Dark mode is a supported alternative (background #0F172A) applied via `[data-theme="dark"]` on an ancestor — components read semantic tokens (`--pk-bg`, `--pk-surface`, `--pk-text`, …) so they adapt automatically. Primary steel #1E3A5F and accent oranye #F97316 are constant across themes; accent is used sparingly (CTA, active/status badges, important icons only). Headings use Plus Jakarta Sans Bold; body uses Nunito. Copy is casual Indonesian, addressing "kamu", energetic and community-driven ("Sparring kuy!") — no emoji in UI.

This design system is the **visual foundation only** — logo, colors, type, basic components, spacing, motion. It intentionally does NOT contain website screens (Home, Sparing Matcher, Basecamp) or page-level navigation; those are built in a separate implementation stage. Motion rules (durations, easing, hover/press, stagger, skeleton, toast) are documented in guidelines/motion.md + tokens/motion.css as a reference for implementation, not shipped animations.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out (logos from assets/logo/, tokens from styles.css) and create static HTML files for the user to view. If working on production code, copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
