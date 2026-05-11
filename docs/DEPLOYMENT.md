# Deployment & Operations Guide

## Environment Variables
- `PORT` - Server listen port (default: 5000)
- `MONGO_URI` - MongoDB replica set connection string
- `JWT_SECRET` - Encryption key for JWT tokens
- `CLOUDINARY_URL` - Asset storage credentials
- `BREVO_API_KEY` - Transactional email gateway key

## Database Indexes
Ensure the following indexes are created in MongoDB:
```javascript
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ streak: -1, xp: -1 });
db.notifications.createIndex({ recipient: 1, read: 1, createdAt: -1 });
```
