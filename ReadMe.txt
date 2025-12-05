1. Folder / Project Structure (Conceptual)

Main areas:

Config: Database connections, environment setup.

Middleware: Handles authentication, error handling, and optional rate limiting.

Models: Define the structure of your data (Users, Lessons, Quizzes, Families, XP, Badges, Verse of the Day).

Controllers: Business logic for handling requests (e.g., logging in, completing lessons, submitting reflections).

Routes: Define endpoints users can access (e.g., login, get lessons, join family).

Utils: Helper functions like XP calculation, badge logic, or sending notifications.


2. Models (Data Structures)

User:
- Name, email, password, role (user/leader/admin)
- XP, streak, last login date
- Family reference
- Badges collected

Lesson:
- Title, content (text/video/audio), module
- Creator (leader) reference

Quiz:
- Questions for a lesson
- Options and correct answers

Family / Group:
- Name, motto, icon
- Members
- Total XP of family
- Optional weekly challenges

Verse of the Day:
- Daily verse
- Reflections from users
- XP awarded for reflections

Badge:
- Name, description, icon
- Criteria for earning (e.g., complete 5 lessons, 7-day streak, etc.)


3. Controllers (Business Logic)

Auth Controller: Handles login, registration, and token generation.

User Controller: View/update profile, track XP and streaks, assign badges.

Lesson Controller: Create, edit, delete, and view lessons.

Quiz Controller: Submit answers, calculate XP.

Family Controller: Create/join families, track group progress, update family XP.

Verse Controller: Fetch today’s verse, submit reflections, award bonus XP.

Leaderboard Controller: Show global user leaderboard and family leaderboard, calculate leagues.


4. Routes (Endpoints)

Auth Routes: Register, login

User Routes: Get profile, view XP, streak, badges

Lesson Routes: List lessons, view lesson details, create lessons (leaders)

Quiz Routes: Submit quiz answers

Family Routes: Create family, join family, view family stats

Verse Routes: Get verse of the day, submit reflection

Leaderboard Routes: View top users and top families


5. Middleware (Request Handling)

Authentication: Ensure users are logged in and attach their info to requests.

Authorization: Check if a user is a leader/admin before allowing lesson creation.

Error Handling: Catch errors and send clear responses.

Optional Rate Limiting: Prevent abuse by limiting requests per time period.


6. Gamification Logic

XP: Earned by completing lessons, quizzes, and submitting reflections.

Streaks: Increase with consecutive learning days; resets if user misses a day.

Leaderboards:
- Users ranked by XP, with league tiers (Bronze → Silver → Gold → Platinum)
- Families ranked by total collective XP

Badges: Awarded for milestones (lesson completions, streaks, family achievements).

Verse of the Day Challenge: Daily verse encourages reflections and bonus XP.

Family Goals: Async challenges for families to earn badges and XP collectively.