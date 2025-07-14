# Production Deployment Guide

## Environment Variables

Create a `.env.local` file (or set these in your hosting platform) with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/lusttool"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Google OAuth (for authentication)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Production Settings
NODE_ENV="production"
```

## Database Setup

1. **Set up PostgreSQL database** (local or cloud provider like Supabase, Railway, etc.)
2. **Run database migrations:**
   ```bash
   npx prisma migrate deploy
   ```
3. **Generate Prisma client:**
   ```bash
   npx prisma generate
   ```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your production domain to authorized origins
6. Add your production callback URL: `https://your-domain.com/api/auth/callback/google`

## Build and Deploy

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Start the production server:**
   ```bash
   npm start
   ```



## Security Considerations

1. **Use strong NEXTAUTH_SECRET** (generate with `openssl rand -base64 32`)
2. **Restrict image domains** in `next.config.ts` if needed
3. **Set up proper CORS** if using external domains
4. **Use HTTPS** in production
5. **Set up proper database backups**

## Hosting Platforms

### Vercel (Recommended)
- Automatic deployments from Git
- Built-in environment variable management
- Automatic HTTPS
- Edge functions support

### Railway
- Easy PostgreSQL integration
- Automatic deployments
- Good for full-stack apps

### DigitalOcean App Platform
- Simple deployment
- Built-in database options
- Good performance

### Self-hosted (Docker)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Monitoring

Consider setting up:
- Error tracking (Sentry)
- Performance monitoring
- Database monitoring
- Uptime monitoring 