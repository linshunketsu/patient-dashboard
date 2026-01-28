# Vibrant Patient Dashboard

A patient-centric, mobile-first web application designed to revolutionize the wellness testing experience. The dashboard serves as the primary interface for patients to engage with their health data, interact with healthcare providers, and actively participate in their wellness journey.

## Overview

The Vibrant Patient Dashboard transforms complex lab results into intuitive, actionable insights. It emphasizes the provider-patient relationship through a network of professional, reputable independent clinics—setting it apart from impersonal, low-cost testing services.

## Features

### Onboarding Journey
- **Engaging hook screen** with lifestyle-focused introduction
- **Provider value comparison** showcasing Vibrant's verified, doctor-led care vs. generic AI
- **Account setup** with personalized intake
- **Provider matching** with curated directory of healthcare professionals
- **Appointment scheduling** for test authorization

### Dashboard Core Experience

#### The Coverage Dimension: Unlocking Your Health Profile
- **Wellness Map (Honeycomb)** – Visual constellation of health "Zoomers"
  - Foundation Zoomer (central hub)
  - Neural, Cardio, Gut, Hormone, Immune Zoomers
  - Nutrient, Food, Genetics Zoomers (expandable)
- **Metric Hierarchy** – Three digestible layers of data:
  1. **North Star Metric** – Overall health score per Zoomer
  2. **Health Scores** – Key performance indicators (out of 100)
  3. **Detailed Metrics** – 20+ granular data points with intuitive visualizations
- **Gamification** – Progress milestones and achievements for unlocked tests

#### The Time Dimension: Your Health Journey
- **Health Journey Timeline** – Visual progress tracking between anchor point tests
- **Trend Analysis** – Automatic trend lines for metrics tested multiple times
- **Wearable Integration** – Connect devices for proprietary health metrics
- **Daily Check-in** – Gamified task tracking with streaks and XP

## Tech Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Material Symbols Outlined
- **Fonts:** Manrope (Google Fonts)

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Demo Mode

The onboarding form comes pre-filled with demo credentials for easy testing:
- **First Name:** Demo
- **Last Name:** User
- **Email:** demo@vibrant.com

Simply click through the onboarding flow to explore the dashboard. Use the "DEMO: Jump to Full Dashboard" button on the waiting screen to skip directly to the main dashboard.

## Project Structure

```
src/
├── components/
│   └── WearableConnection.jsx    # Wearable device setup flow
├── vibrant-dashboard.jsx          # Main dashboard with wellness map
├── vibrant-onboarding.jsx         # Multi-step onboarding flow
└── main.jsx                       # App entry point
```

## Key Components

| Component | Description |
|-----------|-------------|
| `WellnessMap` | Interactive honeycomb visualization of health Zoomers |
| `HealthJourneyTimeline` | Timeline showing test milestones and progress |
| `TrendCard` | Score trend visualization with mini chart |
| `DailyCheckIn` | Gamified daily task tracking with XP rewards |
| `ZoomerDetailView` | Detailed breakdown of individual test results |

## Design Philosophy

The dashboard draws inspiration from sophisticated RPG games, using:
- **Attribute panels** for health metrics
- **Skill trees** for the Zoomer constellation
- **Achievement systems** to encourage engagement
- **Narrative structure** for the health journey over time

## License

© Vibrant. All rights reserved.
