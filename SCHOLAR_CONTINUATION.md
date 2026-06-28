# Scholar App Continuation Handoff

## Current Project State

This is the separate Scholar app repo copied out of the original OAU CBT app.

Local folder:

```txt
C:\Users\HP\Downloads\scholar-app
```

GitHub repo name chosen by the user:

```txt
scholar
```

Vercel deployment URL chosen/created by the user:

```txt
https://scholar-cbt.vercel.app
```

The original app/repo should remain separate and can be restored/fallbacked independently.

Original local folder:

```txt
C:\Users\HP\Downloads\cbt-exam-simulator
```

## What Has Already Been Done

- The Scholar app was copied into `C:\Users\HP\Downloads\scholar-app`.
- The old `.git`, `node_modules`, `dist`, and `.vercel` folders were not carried over.
- A fresh local Git repo was initialized in `scholar-app`.
- Generated mobile/Android build artifacts were removed.
- `.gitignore` was cleaned to ignore generated files and local environment files.
- `package.json` and `package-lock.json` were renamed from `aureus-medicos-cbt` to `scholar-app`.
- `npm install` was run in the Scholar folder.
- `npm run build` passed successfully.

## Product Direction

Scholar is now intended to be its own app, separate from the original OAU-only app.

The Scholar app should support three in-app prep modes:

- `utme`: UTME Prep
- `oau`: OAU Prep, the original app experience
- `putme`: OAU P-UTME Prep

Important product rule:

Only OAU mode should have heavier OAU-specific community features such as:

- Courses
- Forums / Community
- Chats / social community flows
- Attendance / class schedule style tools

UTME and OAU P-UTME should be simpler and more exam-focused.

Licensing should be per prep mode. A user can activate one mode without unlocking the others.

## Current Technical State

Key files already added/changed for the Scholar prep-mode direction include:

```txt
lib/prepModes.ts
components/PrepSelector.tsx
App.tsx
components/Dashboard.tsx
components/AdminDashboard.tsx
components/ExamInterface.tsx
components/Auth.tsx
types.ts
docs/prep-mode-rebrand-handoff.md
```

The handoff doc with the original architecture plan is here:

```txt
docs/prep-mode-rebrand-handoff.md
```

Read that file before continuing deeper product work.

## Current Firebase Warning

The Scholar app currently still points to the old Firebase project:

```txt
aureus-medicos-cbt
```

This is visible in:

```txt
firebase.ts
.firebaserc
```

If Scholar must be fully separate from the original app, the next major task is to create and connect a new Firebase project.

## Continue From Step 6: Firebase Separation

The user said they are at step 6. Continue from Firebase setup.

Recommended next actions:

1. Create a new Firebase project for Scholar.

Suggested project name:

```txt
scholar
```

2. In Firebase Console, create/register a Web App for Scholar.

Suggested app nickname:

```txt
Scholar Web
```

3. Copy the new Firebase web config.

4. Replace the old config in:

```txt
firebase.ts
```

The current config still references `aureus-medicos-cbt`; replace all project-specific values with the new Scholar Firebase config.

5. Update `.firebaserc` so it points to the new Firebase project ID.

Expected shape:

```json
{
  "projects": {
    "staging": "YOUR_NEW_FIREBASE_PROJECT_ID",
    "default": "YOUR_NEW_FIREBASE_PROJECT_ID"
  },
  "targets": {},
  "etags": {}
}
```

6. In Firebase Authentication, enable:

- Email/Password
- Google

7. For Google sign-in, set the project support email in Firebase.

8. Add authorized domains in Firebase Authentication settings:

```txt
scholar-cbt.vercel.app
localhost
```

Add any future custom domain too.

9. In Firebase Firestore, create/enable Firestore Database.

10. Deploy Firestore rules from this repo:

```powershell
firebase login
firebase use YOUR_NEW_FIREBASE_PROJECT_ID
firebase deploy --only firestore:rules
```

If Firebase CLI is not installed, install it first:

```powershell
npm install -g firebase-tools
```

## Vercel Environment Variables

The local `.env.local` contains a placeholder:

```txt
VITE_GEMINI_API_KEY=PLACEHOLDER_API_KEY
```

In Vercel for `scholar-cbt.vercel.app`, add the real environment variable:

```txt
VITE_GEMINI_API_KEY=your_real_key
```

After adding/changing env vars, redeploy the Vercel project.

## GitHub / Vercel Notes

GitHub repo name chosen:

```txt
scholar
```

If not already done, connect local repo to GitHub:

```powershell
cd C:\Users\HP\Downloads\scholar-app
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/scholar.git
git push -u origin main
```

If `origin` already exists, check it with:

```powershell
git remote -v
```

If it points to the wrong repo, fix it with:

```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/scholar.git
```

## Validation Commands

After any code/config changes, run:

```powershell
npm run build
```

For local testing:

```powershell
npm run dev
```

## Important Cleanup Still Worth Doing Later

These are not blockers for Firebase setup, but should be considered before wider launch:

- Decide whether to keep or remove the `mobile-app` folder from Scholar.
- Decide whether Scholar should share any data with the original app or be fully independent.
- Confirm whether `oau` free access remains enabled while `utme` and `putme` stay restricted.
- Finish admin controls for per-mode free access, if needed.
- Create real UTME and OAU P-UTME question/test content tagged with `prepMode`.
- Confirm Google sign-in works on `https://scholar-cbt.vercel.app`.
- Confirm activation keys unlock only their own prep mode.

## Instruction To Future Codex

When continuing from this file:

1. Work inside `C:\Users\HP\Downloads\scholar-app`, not the original app folder.
2. Read `docs/prep-mode-rebrand-handoff.md` for product context.
3. Do not modify the original `C:\Users\HP\Downloads\cbt-exam-simulator` unless the user explicitly asks.
4. Prioritize Firebase separation and deployment correctness before adding more features.
5. Preserve the rule that only OAU mode has courses/forums/chats-style features.
6. Keep Scholar separate from the original OAU app in GitHub, Vercel, and preferably Firebase.
