# FM-BLS Platform API Reference

## Base URL
`https://api.fm-bls.internal/v1`

## Authentication
Bearer token in header:
`Authorization: Bearer <token>`

## Endpoints

### Authentication
- `POST /api/auth/register` - Register new user account
- `POST /api/auth/login` - Authenticate and obtain JWT
- `GET /api/auth/me` - Get current logged-in profile

### Lessons & Courses
- `GET /api/course/all` - List all available courses
- `GET /api/course/:id` - Get course outline and lessons
- `POST /api/lesson/submit` - Submit completed lesson and earn XP

### Quizzes
- `GET /api/quiz/:lessonId` - Get quiz questions for lesson
- `POST /api/quiz/submit` - Submit quiz answers and score

### Badges & Achievements
- `GET /api/badges` - List all platform achievement badges
- `GET /api/badges/my-badges` - List achievements unlocked by user

### Notifications
- `GET /api/notifications` - Get recent user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read

### System & Health
- `GET /api/health` - Platform uptime and database health status
