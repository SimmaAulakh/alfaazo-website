/**
 * Second, named Firebase app pointing at the `punjabilingo-d02cc` project —
 * where the app's users, the `admin_aggregates` analytics collection, and the
 * admin's Google account live.
 *
 * This is deliberately separate from `lib/firebase.ts` (the default app, which
 * targets the `alfaazo-website` project that holds the marketing-site blog).
 * The two apps coexist via a named instance ("pl") so the blog keeps working
 * untouched while the /admin dashboard reads + authenticates against the app
 * project.
 *
 * Initialization is LAZY and only happens on first use, which in practice is
 * always inside a client effect or event handler. This keeps Firebase out of
 * server-side rendering / static prerendering (where it would either init
 * needlessly or throw when build-time env vars are absent).
 *
 * Requires NEXT_PUBLIC_PL_FIREBASE_* env vars (the web config from the
 * punjabilingo-d02cc Firebase console → Project settings → Your apps → Web).
 */
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFunctions, type Functions } from "firebase/functions";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const plConfig = {
  apiKey: process.env.NEXT_PUBLIC_PL_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_PL_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PL_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_PL_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_PL_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_PL_FIREBASE_APP_ID,
};

const PL_APP_NAME = "pl";

// Callable functions live in us-central1 (must match the deployed region).
const PL_FUNCTIONS_REGION = "us-central1";

let cachedApp: FirebaseApp | undefined;
let cachedDb: Firestore | undefined;
let cachedAuth: Auth | undefined;
let cachedFunctions: Functions | undefined;

function plApp(): FirebaseApp {
  if (!cachedApp) {
    cachedApp =
      getApps().find((a) => a.name === PL_APP_NAME) ??
      initializeApp(plConfig, PL_APP_NAME);

    // App Check (optional, free via reCAPTCHA v3). Only initialized in the
    // browser when a site key is configured — a no-op otherwise, so it never
    // affects SSR/prerender or local dev, and can't lock anyone out until
    // enforcement is enabled in the Firebase console.
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (typeof window !== "undefined" && siteKey) {
      try {
        initializeAppCheck(cachedApp, {
          provider: new ReCaptchaV3Provider(siteKey),
          isTokenAutoRefreshEnabled: true,
        });
      } catch {
        // already initialized or unavailable — non-fatal
      }
    }
  }
  return cachedApp;
}

/** Firestore for the punjabilingo-d02cc project (lazy). */
export function plDb(): Firestore {
  if (!cachedDb) cachedDb = getFirestore(plApp());
  return cachedDb;
}

/** Auth for the punjabilingo-d02cc project (lazy). */
export function plAuth(): Auth {
  if (!cachedAuth) cachedAuth = getAuth(plApp());
  return cachedAuth;
}

/** Cloud Functions for the punjabilingo-d02cc project (lazy). */
export function plFunctions(): Functions {
  if (!cachedFunctions) {
    cachedFunctions = getFunctions(plApp(), PL_FUNCTIONS_REGION);
  }
  return cachedFunctions;
}

// A provider is just a config object — safe to construct eagerly (no app init).
export const googleProvider = new GoogleAuthProvider();
