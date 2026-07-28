# EYFI Scout Reward Ladder — Polygnan Assignment

> **"You Learn By Doing"** — An interactive, gamified campus ambassador reward pathway built for the EYFI (Earn Your First Income) Challenge by Polygnan.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen?logo=github)](https://praveen-ing.github.io/Polygnan-Assignment/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

---

## 🔗 Live Demo

👉 **[https://praveen-ing.github.io/Polygnan-Assignment/](https://praveen-ing.github.io/Polygnan-Assignment/)**

---

## 📌 What Is This?

This is the **Gamified Reward Ladder** built as an assignment submission for Polygnan's EYFI Campus Ambassador Program. It visualises the 6-level milestone pathway that campus scouts unlock as they bring in more registrations to the EYFI Challenge.

The design closely mirrors the visual identity of [ambassador.eyfichallenge.com](https://ambassador.eyfichallenge.com/) — dark dot-grid background, neon accent colours, glassmorphism cards, and premium motion design.

---

## 🏆 Reward Milestones Covered

| Milestone | Reward Unlocked |
|-----------|----------------|
| **Selected as Scout** (Step 0) | Private community access + official welcome starter kit |
| **Level 1 — 0 Regs** | Verified Scout Title on LinkedIn, live leaderboard dashboard |
| **Level 2 — 25 Regs** | Official Campus Ambassador title, first swag drop |
| **Level 3 — 50 Regs** | Event grants, exclusive merch, VIP hackathon access |
| **Level 4 — 75 Regs** | ₹15,000 campus event sponsorship, mentorship sessions |
| **Level 5 — 100 Regs** | Paid internship opportunities, performance stipend |
| **Level 6 — 200 Regs** | Founding Team consideration, all-expenses retreat |

---

## ✨ Key Features

### 🛤️ 1. Alternating Zigzag Milestone Timeline
- A **horizontal SVG timeline** with cards alternating above and below the track — levels 0, 2, 4, 6 sit above; levels 1, 3, 5 below.
- A **live animated bird** (SVG, with flapping wings) continuously flies back and forth along the path using `requestAnimationFrame`.
- Glowing neon dots at each node pulse and light up when unlocked.

### 🃏 2. Interactive Level Cards (Swipeable Deck)
- Each milestone has a themed spotlight card with its own neon color.
- Cards below the threshold display a **frosted-glass lock overlay** — they blur and lock until the registration slider reaches that level.
- Clicking a node selects it; the card deck animates to that selection.

### 🎰 3. Live Registration Simulator
- A draggable slider lets you **simulate registration count** from 0 → 200+.
- Cards progressively unlock with a **rupee coin burst confetti animation** on every new unlock.
- An auto-play demo mode is also available.

### 🌐 4. 3D College Globe
- Rotates a 3D sphere of verified Indian university campus cards (IIT, IIM, BITS, NIT, Manipal, etc.) using **Fibonacci Sphere Lattice** maths.
- Supports mouse drag and touch rotation with perspective depth scaling.

### 🪪 5. Scout Pass Studio
- Live-customisable ambassador pass with name, campus, and rank — holographic card design with a **randomly generated QR code** on the campus pass.

### 🤖 6. Poly AI Agent
- Floating bottom-right conversational AI widget answering EYFI rules, earning ideas, and ambassador FAQs.

### 🐦 7. Premium Visual Aesthetics
- Dark dot-grid canvas background, Space Grotesk + Bricolage Grotesque typography, Lucide icons, and zero placeholder images.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **UI Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 + custom CSS keyframes |
| **Icons** | Lucide React |
| **QR Code** | react-qr-code |
| **Deployment** | GitHub Pages (gh-pages branch) |

---

## 🚀 Quick Start

```bash
# 1. Clone
git clone https://github.com/Praveen-ing/Polygnan-Assignment.git
cd Polygnan-Assignment

# 2. Install dependencies
npm install

# 3. Start dev server (http://localhost:3000)
npm run dev

# 4. Production build
npm run build
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── RiverLadder.tsx        # Main zigzag milestone timeline + bird animation
│   ├── SpotlightCard.tsx      # Glowing level card with lock overlay
│   ├── AmbassadorHero.tsx     # Hero section
│   ├── CollegeGlobe3D.tsx     # 3D rotating campus globe
│   ├── ScoutBadgeGenerator.tsx # Scout pass studio with QR
│   ├── ShareCardModal.tsx     # Campus pass share modal (QR code)
│   ├── RegistrationCounter.tsx # Animated reg counter + slider
│   ├── TierProgressBar.tsx    # Progress bar across tiers
│   ├── MarqueeTicker.tsx      # Announcement ticker
│   ├── SocialProofBanner.tsx  # Social proof strip
│   ├── HowItWorksSteps.tsx    # Steps section
│   ├── PerksShowcase.tsx      # Perks showcase
│   ├── FaqAccordion.tsx       # FAQ accordion
│   ├── PolyAgent.tsx          # AI assistant widget
│   ├── PolygnanEthosBanner.tsx # Ethos / brand banner
│   ├── RupeeCoinBurst.tsx     # Confetti burst on unlock
│   ├── BadgeCoinSVG.tsx       # SVG badge coin asset
│   ├── BadgeCapSVG.tsx        # SVG cap asset
│   └── FlyingBird.tsx         # Standalone bird (unused; bird is now in RiverLadder)
├── data/
│   └── ladderData.ts          # (legacy data file, data moved inline to RiverLadder)
├── App.tsx                    # Root app layout
├── index.css                  # Global styles, animations, dot-grid pattern
├── main.tsx                   # Entry point
└── types.ts                   # Shared TypeScript types
public/
├── eyfi-ambassador-cap.png    # Brand asset
└── eyfi_orange_nobg_fv1.png   # Brand asset
```

---

## 📄 License & Attribution

Built by **Nethavath Praveen** as an assignment submission for **Polygnan · EYFI Challenge** (July 2026).  
Inspired by [eyfichallenge.com](https://eyfichallenge.com/) and [ambassador.eyfichallenge.com](https://ambassador.eyfichallenge.com/).
