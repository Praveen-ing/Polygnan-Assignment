# EYFI Reward Ladder — Design Process

## Tools Used
- **Antigravity (AI coding assistant by Google DeepMind)** to scaffold, design, and implement the interactive React component from scratch
- **React + Vite + TypeScript** for the frontend framework
- **TailwindCSS v4** for utility styling with custom CSS animations layered on top

## What I Built

I designed and coded an interactive, gamified Reward Ladder as a standalone React app. Starting from a basic slider-and-cards prototype, I rebuilt it as:

1. **Vertical Timeline Ladder** — a visual climbing metaphor with an animated glowing dot that moves up the ladder as you drag registrations higher, with per-tier colored nodes
2. **Expandable Tier Cards** — each of the 6 tiers (Scout → Campus Ambassador → Level Up → Go Further → Paid Internship → Founding Team) is a card you can click to reveal full perk details with emoji descriptions and estimated value
3. **Live Value Counter** — an animated `₹` counter that ticks up in real-time as you unlock new tiers ("₹37K unlocked across 4 tiers")
4. **XP Progress Bar** — shows % progress from your current tier to the next one, styled with that tier's unique accent color
5. **Unlock Burst** — coin particle burst + bounce animation + glow when a new tier is unlocked, plus a full-screen spotlight modal for major milestones (100 + regs)
6. **Social Proof Banner** — "2,847 scouts from 300+ colleges" with scrolling campus names to create FOMO
7. **Share Rank Modal** — lets ambassadors copy/share their rank to WhatsApp, Twitter/X, and LinkedIn

## How I Differentiated from the Official Site
The official `ambassador.eyfichallenge.com` uses a lime-green color scheme. I switched to the **EYFI Orange (#FF6B2C)** — the actual brand color from `eyfichallenge.com` — so it feels brand-correct but visually distinct from the ambassador landing page. The gamification layer (XP bar, value counter, vertical ladder, unlock animations) is entirely original.
