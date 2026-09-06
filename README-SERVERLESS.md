# Notes API - Vercel Serverless

This backend is converted from a long-running Render/Express server to a Vercel Node.js serverless function.

## Required environment variables

- `MONGODB_URI` — your MongoDB Atlas connection string.
- `JWT_SECRET` — a server-side secret used to sign/verify login tokens. Do NOT put this in the Expo app.

## API routes

The existing routes remain unchanged:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/notes`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

## Deploy

Deploy this folder as a Vercel project. The deployed API base URL will be:

`https://YOUR-PROJECT.vercel.app`

Your Expo app should call:

`https://YOUR-PROJECT.vercel.app/api`

## Important

Serverless functions can still have cold starts. However, this removes Render's free-tier service sleep/wake behavior. MongoDB connections are cached and reused while the function instance is warm.
