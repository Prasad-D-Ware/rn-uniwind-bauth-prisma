# React Native + Expo + Better Auth Starter

A minimal, production-ready template for building React Native apps with authentication, database, and a modern UI stack. Based on [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack).

## Stack

- **Frontend**: React Native (Expo)
- **Backend**: Express.js
- **Authentication**: Better Auth
- **Database**: PostgreSQL + Prisma ORM
- **Styling**: Tailwind CSS (via Uniwind)
- **UI Components**: HeroUI Native

## Project Structure

```
├── apps/
│   ├── native/          # React Native app (Expo)
│   │   ├── app/         # Expo Router pages
│   │   │   ├── index.tsx      # Home (auth gate)
│   │   │   ├── sign-in.tsx    # Sign in page
│   │   │   ├── sign-up.tsx    # Sign up page
│   │   │   └── _layout.tsx    # Root layout
│   │   └── components/  # Shared components
│   ├── web/             # Web app (if needed)
│   └── server/          # Backend API (Express.js)
├── packages/
│   ├── db/              # Prisma schema & client
│   ├── auth/            # Better Auth config
│   └── config/          # Shared configs
```

## Quick Start

### Prerequisites

- [Bun](https://bun.sh) installed
- PostgreSQL database (local or cloud)
- iOS Simulator (Mac) or Android Emulator

### 1. Install Dependencies

```bash
bun install
```

### 2. Database Setup (Prisma Data Platform)

This template uses Prisma ORM with PostgreSQL. You can get a free PostgreSQL database from Prisma Data Platform:

1. **Go to Prisma Data Platform**: https://cloud.prisma.io/
2. **Sign up or log in** with your GitHub account
3. **Create a new project**:
   - Click "New Project"
   - Select "Import a Prisma repository" (or create blank project)
   - Choose your repository or create a new one
4. **Create a database**:
   - In your project dashboard, go to "Database" tab
   - Click "Create Database"
   - Select "PostgreSQL" as the database type
   - Choose the free tier
   - Wait for the database to be provisioned (this may take a few minutes)
5. **Get your database URL**:
   - Once the database is ready, click on "Connection String"
   - Copy the `DATABASE_URL` (it looks like: `postgresql://user:password@host:5432/dbname?schema=public`)
6. **Paste it in your `.env` file**:
   ```env
   DATABASE_URL=postgresql://your-user:your-password@your-host:5432/your-db?schema=public
   ```

**Alternative**: You can also use local PostgreSQL, Railway, or Supabase for your database.

### 3. Environment Setup

Copy the example environment files and update them with your values:

```bash
# Server environment
cp apps/server/.env.example apps/server/.env

# Mobile app environment
cp apps/native/.env.example apps/native/.env
```

Then update the `.env` files with your configuration:

**`apps/server/.env`:**
```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# CORS Settings
CORS_ORIGIN=http://localhost:3001

# Database Connection (from Prisma Data Platform or your PostgreSQL provider)
DATABASE_URL=postgresql://username:password@host:5432/database_name?schema=public

# Google OAuth (Optional - see Google OAuth Setup section below)
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**`apps/native/.env`:**
```env
# Backend API URL
EXPO_PUBLIC_SERVER_URL=http://localhost:3000

# For physical device testing, use your local IP:
# EXPO_PUBLIC_SERVER_URL=http://192.168.x.x:3000
```

### 4. Database Schema Setup

After setting up your database URL, apply the Prisma schema:

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# View database UI (optional)
bun run db:studio
```

### 5. Start Development

```bash
bun run dev
```

Your project will be available at:
- **Backend API**: http://localhost:3000
- **Expo Dev Client**: Runs on your simulator/device

### Expo Connectivity Issues

For physical device testing, update `apps/native/.env` with your local IP:

```env
EXPO_PUBLIC_SERVER_URL=http://<YOUR_LOCAL_IP>:3000
```

### Google OAuth Setup (Optional)

To enable Google Sign-In/Sign-Up:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create a new project** or select existing
3. **Enable Google+ API**: APIs & Services → Library → Search "Google+ API" → Enable
4. **Configure OAuth Consent Screen**:
   - APIs & Services → OAuth consent screen
   - Select "External" (or "Internal" for Workspace)
   - Fill in app name, user support email, developer contact
   - Add scope: `.../auth/userinfo.email` and `.../auth/userinfo.profile`
   - Save and continue

5. **Create OAuth 2.0 Credentials**:
   - APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: **Web application**
   - Name: "Web Client"
   - Authorized redirect URIs: Add `http://localhost:3000/api/auth/callback/google`
   - Click Create

6. **Copy credentials to `.env`**:
   ```env
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

7. **Restart the server**:
   ```bash
   bun run dev
   ```

The Google button will now appear on the Sign In and Sign Up screens.

## Development Guide

### Database Commands

```bash
# Generate Prisma Client
bun run db:generate

# Apply schema changes
bun run db:push

# Open database UI
bun run db:studio

# Create migration
bun run db:migrate
```

### Adding New Screens

1. Create file in `apps/native/app/`
2. Export default component
3. Use `Link` from expo-router for navigation:

```tsx
import { Link } from "expo-router";
import { Button } from "heroui-native";

<Link href="/new-page" asChild>
  <Button>
    <Button.Label>Go to Page</Button.Label>
  </Button>
</Link>
```

### Authentication

Auth is handled via Better Auth. The template includes:

- **Email/password authentication**
- **Google OAuth** (optional - requires setup)
- Session management via `authClient.useSession()`
- Secure token storage with Expo SecureStore

**Email/Password:**
```tsx
import { authClient } from "@/lib/auth-client";

// Check session
const { data: session } = authClient.useSession();

// Sign in with email
await authClient.signIn.email({ email, password });

// Sign out
await authClient.signOut();
```

**Google OAuth:**
```tsx
// Sign in with Google (opens browser for consent)
await authClient.signIn.social({ provider: "google" });
```

### Styling with Uniwind

Use Tailwind classes directly on components:

```tsx
<View className="flex-1 justify-center items-center p-6">
  <Text className="text-2xl font-bold text-foreground">
    Hello World
  </Text>
</View>
```

### Customizing the UI

The template uses **HeroUI Native** components:

```tsx
import { Button, Card, Input, Label } from "heroui-native";

<Card variant="secondary" className="p-4">
  <Label>Email</Label>
  <Input placeholder="Enter email" />
  <Button>
    <Button.Label>Submit</Button.Label>
  </Button>
</Card>
```

## Available Scripts

- `bun run dev` - Start all applications in development mode
- `bun run dev:native` - Start only the mobile app
- `bun run dev:server` - Start only the backend API
- `bun run build` - Build all applications
- `bun run check-types` - Check TypeScript types across all apps
- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema changes to database
- `bun run db:studio` - Open database studio UI
- `bun run db:migrate` - Create database migration

## Building for Production

### iOS

```bash
cd apps/native
bun run ios --configuration Release
```

### Android

```bash
cd apps/native
bun run android --configuration Release
```

## Deployment

### Backend

Deploy the server to:
- Railway
- Fly.io
- Any VPS with Bun installed

### Mobile Apps

- **iOS**: Build with Xcode and submit to App Store
- **Android**: Generate APK/AAB with EAS Build or Android Studio

## Next Steps for Your App

1. **Customize the UI**: Modify `apps/native/app/index.tsx` as your main dashboard
2. **Add Features**: Create new pages in `apps/native/app/`
3. **Extend Database**: Edit `packages/db/prisma/schema/` and run `bun run db:push`
4. **API Routes**: Add endpoints in `apps/server/src/`
5. **Authentication**: Configure Better Auth in `packages/auth/`

## Resources

- [Better Auth Docs](https://www.better-auth.com/)
- [HeroUI Native](https://v3.heroui.com/docs/native)
- [Expo Docs](https://docs.expo.dev)
- [Prisma Docs](https://www.prisma.io/docs)
- [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack)

## License

MIT
