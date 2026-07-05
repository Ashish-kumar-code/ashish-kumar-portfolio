# Component Library

Version: 1.0

---

# Philosophy

The portfolio is built using reusable, modular components.

Every UI element should:

- Have a single responsibility
- Be reusable
- Be responsive
- Support dark mode
- Be accessible
- Accept props instead of hardcoded values
- Be animation-ready

---

# Component Hierarchy

App

├── Layout

│   ├── Navbar

│   ├── Footer

│   └── ScrollToTop

│

├── Sections

│   ├── Hero

│   ├── FeaturedHighlights

│   ├── About

│   ├── Experience

│   ├── Skills

│   ├── Projects

│   ├── GitHub

│   ├── Certifications

│   ├── Resume

│   └── Contact

│

├── Components

│   ├── Button

│   ├── Badge

│   ├── Card

│   ├── SectionHeading

│   ├── ProjectCard

│   ├── SkillCard

│   ├── TimelineItem

│   ├── StatisticCard

│   ├── SocialButton

│   ├── TechBadge

│   ├── Input

│   ├── TextArea

│   ├── Loader

│   └── Modal

---

# Button Component

Purpose

Reusable action button.

Variants

Primary

Secondary

Outline

Ghost

Danger

Sizes

Small

Medium

Large

States

Default

Hover

Focus

Disabled

Loading

Icons Supported

Yes

# Button Props

text

variant

size

icon

loading

disabled

href

onClick

Button

Hover Lift

150ms

Card

Scale 1.02

250ms

Timeline

Fade Up

Project Card

Slide Up

Navbar

Blur on Scroll

Modal

Fade + Scale