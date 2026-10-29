# System Architecture & Design

## Overview
FM-BLS is an interactive gamified learning system built on Node.js, Express, and MongoDB.

```mermaid
flowchart TD
    Client[Web / Mobile Client] --> Gateway[Express API Gateway]
    Gateway --> Auth[Auth & RBAC Middleware]
    Auth --> Controllers[Business Controllers]
    Controllers --> Services[Domain Services]
    Services --> DB[(MongoDB Database)]
    Services --> Cache[(Memory Cache)]
```

## Key Modules
1. **Authentication & Session**: Stateless JWT with sliding session refreshes.
2. **Gamification Engine**:
   - Streak tracking with StreakFreeze protection.
   - Dynamic XP calculations with streak and weekend multipliers.
   - Competitive leagues (Bronze, Silver, Gold, Diamond).
3. **Content Hierarchy**: Courses -> Lessons -> Quizzes.
