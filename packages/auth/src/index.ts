import { expo } from "@better-auth/expo";
import prisma from "@rn-uniwind-bauth-prisma/db";
import { env } from "@rn-uniwind-bauth-prisma/env/server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    env.CORS_ORIGIN,
    "mybettertapp://",
    "rn-uniwind-bauth-prisma://",
    ...(env.NODE_ENV === "development"
      ? ["exp://", "exp://**", "exp://192.168.*.*:*/**", "http://localhost:8081"]
      : []),
  ],
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  callbackURL: `${env.BETTER_AUTH_URL}/api/auth/callback`,
  advanced: {
    defaultCookieAttributes: {
      sameSite: env.NODE_ENV === "development" ? "lax" : "none",
      secure: env.NODE_ENV !== "development",
      httpOnly: true,
    },
    crossSubDomainCookies: {
      enabled: true,
    },
  },
  plugins: [expo()],
});
