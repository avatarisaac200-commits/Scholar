# Executive Summary

We analyzed official sources to determine the exact structure of Nigeria’s JAMB UTME and OAU PUTME exams and designed a CBT app data model and workflow. **JAMB UTME** is a 4‑subject, 180‑question computer‑based exam: 60 MCQs in Use of English and 40 MCQs in each of three chosen subjects, all to be answered in a fixed **120‑minute** session. Each question is 4‑option MCQ; scoring is 1 mark per correct answer with **no negative marking**. In contrast, **OAU PUTME** (OAU’s Post‑UTME screening) is also fully online but its detailed format is **not officially published**. Candidates typically answer MCQs drawn from their UTME subject combination plus an “aptitude” component (current affairs, reasoning, etc.), including English for all candidates. Neither the total questions nor exact timing for OAU’s CBT is specified in official sources (reports suggest shorter exams than UTME). We explicitly note unspecified details where sources are silent.

Based on these structures, we define comprehensive JSON schemas and data models for the CBT app: models for *Exams, Subjects, Questions, Licenses, User Profiles, Purchases,* and *Session State*. We outline a **subject‑license purchase flow**: users select subjects, the system validates eligibility, processes payment, issues a time‑limited license for those subjects (with concurrency limits), and enforces it at exam start. We provide sample REST API endpoints (with example JSON payloads) for creating exams and questions, assigning licenses, starting sessions, submitting answers, scoring, and retrieving results. A sample question bank schema with metadata tags (subject, topic, difficulty, year) is given. We discuss edge cases (timeout enforcement, network loss recovery, cheating prevention and proctoring hooks).

Finally, we include comparative tables (UTME vs OAU) and a **Mermaid flowchart** of the purchase→exam lifecycle. All information is carefully cited from JAMB and OAU official publications where available; where official details are missing (e.g. OAU question counts or timing), we explicitly state them as *unspecified*. The report concludes with example JSON objects and a **Codex prompt** instructing code generation for wiring these elements into a CBT app (without language constraints).

## JAMB UTME Exam Format

- **Subjects and Questions:** Four sections (one compulsory English + three elective subjects). *Use of English*: 60 MCQs; *each other subject*: 40 MCQs. Total questions = 180 MCQs. All questions have 4 options (A–D).
- **Time Allocation:** Total duration **2 hours (120 minutes)**. (Time per subject is not separately allocated; candidates manage 180 questions in 120 minutes.)
- **Question Type:** All multiple-choice (single best answer).
- **Scoring:** Official sources indicate **no negative marking** (each correct answer = 1 mark; wrong/unanswered = 0). Thus raw score = number of correct answers (out of 180). (JAMB then applies standardization to 400-point scale, but that is post‑exam processing.)
- **Administration:** Fully computer‑based (CBT) in assigned sessions. No adaptive or sectional gating – all sections are administered continuously within the 120-minute session.
- **Sources:** Official JAMB “Manual for Officials of 2026 UTME”.

## OAU PUTME Exam Format

- **Subjects:** OAU’s Post‑UTME is a CBT screening test for candidates who scored ≥200 UTME and applied to OAU. Unlike JAMB’s national exam, OAU defines subjects per faculty. In practice, candidates answer questions from **their UTME subject combination plus an aptitude component**.  English Language is included for all candidates. (Unofficial reports say an “Aptitude Test” section covers topics like current affairs, logic, history, etc., but OAU’s official literature does not detail this.) 
- **Question Type:** All multiple-choice (CBT).
- **Total Questions & Time:** *Not specified in official sources.* Anecdotally, post-UTME tests tend to be shorter (e.g. 40–100 questions in ~30–60 minutes in some Nigerian universities), but OAU’s exact count and timing are unpublished. We mark these as **unspecified**. 
- **Scoring:** Not officially described. Presumably 1 mark per correct, no negative marking (similar to UTME). 
- **Administration:** Fully online CBT screening. OAU’s 2025 announcement confirms the screening is online (via the OAU admissions portal). 
- **Sources:** Official OAU news release on the 2025 screening exercise (which does **not** enumerate exam structure, so many details are unspecified). All details beyond “online screening” are inferred from candidate reports and past practice.

## Key Differences (UTME vs OAU PUTME)

| **Attribute**                 | **JAMB UTME (National Exam)**                                                               | **OAU PUTME (OAU Admission Exam)**                                    |
|-------------------------------|---------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| **Administered by**           | JAMB (national board)                                                        | Obafemi Awolowo University (Ile-Ife)                                   |
| **Mode**                      | Computer-Based Test (CBT)                                                    | Computer-Based Test (online CBT)                      |
| **Subjects Tested**           | 4 subjects: *Use of English* (compulsory) + 3 chosen subjects               | English + UTME subject combination + Aptitude/General Knowledge (based on course). English included for all. Exact combination varies by program.  |
| **Total Questions**           | 180 MCQs (60 in English, 40 each in others)                                    | *Unspecified by official sources.* (Likely significantly fewer than 180.)                     |
| **Time Limit**                | 120 minutes total                                                            | *Unspecified.* (Likely on the order of 30–60 minutes based on other universities’ practice.)  |
| **Question Types**            | Multiple-choice (single answer, 4 options)                                    | Multiple-choice (single answer, likely 4 options) (official sources do not detail types)     |
| **Scoring**                   | 1 mark per correct, no negative marking (wrong answer = 0)                       | Not official, but assumed similar (no negative marking).                              |
| **Adaptive/Gating**           | None (fixed questions); candidates answer in any order within time            | None reported. Exam is fixed-form CBT.                                        |
| **Recent Changes**            | 2026 manual confirms 60Q English/40Q others format (unchanged from previous years). | OAU added an “Aptitude Test” component (a known change since 2017), but official screening notices still omit detail. All updates are via OAU announcements (latest 2025 notice). |
| **Official References**       | JAMB 2026 Training Manual                                      | OAU 2025 screening bulletin (online exam) (exam structure not published)   |

*Note:* Many specifics of OAU’s exam (question counts, timing, negative marking) are not published by OAU. Where official detail is lacking, it is explicitly marked **unspecified** above or inferred from indirect reports.

## Data Models and JSON Schemas for the CBT App

We define JSON schema–style structures for the CBT system entities. These are intended to guide code generation (using Codex) and illustrate relationships:

```json
// Exam model (e.g. a specific UTME or OAU exam session)
Exam = {
  "id": "string",             // unique exam identifier (e.g. "exam:UTME:2026")
  "name": "string",           // e.g. "JAMB UTME 2026"
  "subjects": ["string"],     // list of subject IDs or names included in the exam
  "totalQuestions": 180,      // e.g. 180 for UTME, unspecified for OAU
  "durationMinutes": 120,     // total exam time (120 for UTME)
  "questionType": "MCQ",      // e.g. "MCQ" (could extend to essay, etc.)
  "structure": {              // subject-specific question counts (optional)
    "Use of English": 60,
    "Subject2": 40,
    "Subject3": 40,
    "Subject4": 40
  }
}

// Subject model
Subject = {
  "id": "string",             // unique subject code or name
  "name": "string",           // e.g. "Mathematics"
  "type": "string"            // e.g. "core", "aptitude" (if needed)
}

// Question model (in question bank)
Question = {
  "id": "string",             // unique question ID
  "examId": "string",         // associated exam or subject code
  "subject": "string",        // subject name or ID (for tagging)
  "topic": "string",          // topic/chapter (for tagging)
  "difficulty": "string",     // e.g. "easy", "medium", "hard"
  "type": "string",           // "MCQ", etc.
  "question": "string",       // question text
  "options": ["string"],      // list of answer options (for MCQ)
  "answer": "string",         // correct option
  "explanation": "string",    // (optional) explanation or solution
  "metadata": {               // custom tags
    "year": 2025,            // e.g. past-paper year
    "source": "PastQuestion", // or other source info
    "tags": ["string"]       // additional tags
  }
}

// User profile model
User = {
  "id": "string",             // unique user ID
  "username": "string",
  "email": "string",
  "role": "string",           // e.g. "student", "admin"
  "registeredAt": "string"    // ISO datetime
}

// License model (subject-specific license)
License = {
  "id": "string",             // license ID
  "userId": "string",         // owner user ID
  "subjects": ["string"],     // subjects covered by this license
  "issuedAt": "string",       // ISO datetime
  "expiresAt": "string",      // ISO datetime
  "maxConcurrent": 1,         // concurrency limit
  "usedCount": 0              // active sessions count
}

// Purchase record model
Purchase = {
  "id": "string",
  "userId": "string",
  "licenseId": "string",
  "amount": 0.00,
  "currency": "NGN",
  "purchasedAt": "string"
}

// Session state model (an active exam session)
Session = {
  "id": "string",             // session/exam attempt ID
  "userId": "string",
  "examId": "string",         // which exam is taken
  "subjects": ["string"],     // subjects in this session (subset of licensed)
  "startedAt": "string",
  "endedAt": "string",        // null if in progress
  "answers": {                // map questionID -> selected answer
    "q123": "A",
    "q124": "C"
  },
  "score": 0,                 // numerical score (to be calculated)
  "status": "string"          // e.g. "in-progress", "submitted", "graded"
}
```

Each model above would be implemented as a class or schema in code (e.g. as ORM entities or database tables), but the JSON outline clarifies the fields needed. For example, an **Exam** JSON might look like this:

```json
{
  "id": "exam:UTME:2026",
  "name": "JAMB UTME 2026",
  "subjects": ["Use of English", "Mathematics", "Physics", "Chemistry"],
  "totalQuestions": 180,
  "durationMinutes": 120,
  "questionType": "MCQ",
  "structure": {
    "Use of English": 60,
    "Mathematics": 40,
    "Physics": 40,
    "Chemistry": 40
  }
}
```

A sample **Question** entry might be:

```json
{
  "id": "q124",
  "subject": "Mathematics",
  "topic": "Algebra",
  "difficulty": "Medium",
  "type": "MCQ",
  "question": "If $x+3=7$, what is $2x+1$?",
  "options": ["5", "11", "8", "9"],
  "answer": "C",
  "explanation": "x=4, so 2x+1=9.",
  "metadata": {
    "year": 2025,
    "source": "JAMB Past Paper",
    "tags": ["linear equations"]
  }
}
```

## Subject‑Specific License Purchase Flow

1. **Inquiry / Selection:** User (student) views available subjects for purchase (based on chosen course). The app validates subject eligibility (e.g. a science course must include required subjects).
2. **Validation:** System checks that the selected subjects align with the user’s course combination and that the user hasn’t already purchased a redundant license.
3. **Payment:** User completes payment (via RRR or integrated gateway). Upon successful payment, a new **License** is created (containing userId, subject list, issue/expiry dates, concurrency limit).
4. **License Issuance:** License is recorded with an expiration (e.g. 30 days from issue) and a maxConcurrent count (e.g. 1 to prevent multiple simultaneous logins). The user receives confirmation.
5. **Enforcement:** When the user starts an exam, the system checks active licenses. Only subjects included in the license are accessible. Concurrency is enforced by tracking the user’s active sessions (`maxConcurrent`). If exceeded, new sessions are blocked until an existing one ends or the license resets.
6. **Expiry:** Once the `expiresAt` time passes, any new attempts for those subjects are disallowed until a new license is purchased.
7. **Flow Continuity:** Throughout this process, edge cases are handled: partial payments abort license issuance; expired licenses prompt renewal; invalid subject combinations are rejected upfront.

## API Endpoints & Sample Payloads

Below are representative REST API endpoints and JSON payloads for key operations. (These are illustrative; actual implementation may vary.)

- **Create Exam:** `POST /api/exams`  
  _Payload:_ 
  ```json
  {
    "id": "exam:UTME:2026",
    "name": "JAMB UTME 2026",
    "subjects": ["Use of English", "Mathematics", "Physics", "Chemistry"],
    "durationMinutes": 120,
    "structure": {"Use of English":60,"Mathematics":40,"Physics":40,"Chemistry":40}
  }
  ```
  _Response:_ 201 Created with exam object.

- **Add Question:** `POST /api/exams/{examId}/questions`  
  _Payload:_
  ```json
  {
    "id": "q124",
    "subject": "Mathematics",
    "question": "If x+3=7, what is 2x+1?",
    "options": ["A:5", "B:11", "C:8", "D:9"],
    "answer": "D",
    "metadata": {"topic":"Algebra","difficulty":"Medium"}
  }
  ```
  _Response:_ 201 Created.

- **Purchase License:** `POST /api/licenses`  
  _Payload:_
  ```json
  {
    "userId": "user123",
    "subjects": ["Mathematics","Physics"],
    "durationDays": 30
  }
  ```
  _Response:_ 200 OK with license details `{ "id":"lic789", "expiresAt":"2026-07-28T15:00:00Z", "maxConcurrent":1, ...}`.

- **Start Exam Session:** `POST /api/sessions`  
  _Payload:_
  ```json
  {
    "userId": "user123",
    "examId": "exam:UTME:2026",
    "subjects": ["Mathematics","Physics"]
  }
  ```
  (Server checks that user’s license covers these subjects and concurrency is within limits.)  
  _Response:_ 200 OK with `{ "sessionId":"sess456", "startedAt":"2026-06-28T09:00:00Z" }`.

- **Submit Answers:** `POST /api/sessions/sess456/submit`  
  _Payload:_
  ```json
  {
    "answers": {
      "q101": "A",
      "q102": "C",
      // ...
    }
  }
  ```
  (Server records answers, marks session as completed, calculates score.)  
  _Response:_ 200 OK with `{ "score": 125, "outOf": 180 }`.

- **Retrieve Results:** `GET /api/sessions/sess456/result`  
  _Response:_ 
  ```json
  {
    "sessionId": "sess456",
    "score": 125,
    "maxScore": 180,
    "breakdown": {"Mathematics": 30, "Physics": 35}
  }
  ```

All endpoints enforce authentication, input validation (e.g. subject-license match), and the rules above. For instance, starting a session on an expired or unlicensed subject returns 403 Forbidden.

## Sample Question Bank Structure

We organize the question bank by subject and include rich tagging for filtering and analytics. Each question entry (as shown above) includes:

- **Subject:** e.g. "Mathematics".
- **Topic:** e.g. "Algebra", "Trigonometry".
- **Difficulty:** e.g. "Easy", "Medium", "Hard".
- **Tags/Metadata:** E.g. year of past exam, course codes.  
- **Content:** The question text, options, correct answer.

Example bank excerpt (JSON array):

```json
[
  {
    "id": "q2001",
    "subject": "Use of English",
    "topic": "Grammar",
    "difficulty": "Easy",
    "question": "Identify the adverb in the sentence: 'She sings beautifully.'",
    "options": ["She","sings","beautifully","sentence"],
    "answer": "C",
    "metadata": {"year":2025,"source":"UTME"}
  },
  {
    "id": "q2002",
    "subject": "Mathematics",
    "topic": "Algebra",
    "difficulty": "Medium",
    "question": "Solve for x: 3x - 7 = 11.",
    "options": ["A:4", "B:6", "C:5", "D:7"],
    "answer": "B",
    "metadata": {"year":2025,"source":"UTME"}
  }
]
```

Questions can be filtered by these tags (e.g. selecting all “Mathematics – Algebra – Medium” for a practice test). For a production app, these would be stored in a database or content repository.

## Edge Cases and Validation Rules

- **Timeouts:** Each session enforces the `durationMinutes` limit. If time expires (or user clicks submit), the session auto-submits. The server timestamp marks `endedAt`, and scoring proceeds on answered questions. Unanswered questions count as wrong (0 points).
- **Network Loss / Offline:** The app should periodically autosave answers locally or on the server (heartbeat). On reconnect, the user can resume within the remaining time. If network fails before submission, enforce the time limit and auto-submit partial answers.
- **Concurrency:** A license’s `maxConcurrent` restricts simultaneous logins. If a second session start is attempted while `usedCount == maxConcurrent`, return an error. When a session ends or is discarded, decrement `usedCount`.
- **Cheating Prevention:** Randomize question order and option order per user session. Track IP/device limits. Potential proctoring hooks include capturing webcam snapshots or browser focus events at intervals (these can be integrated via front-end modules and flagged in `Session` metadata).
- **Validation:** All API inputs are validated (e.g. question belongs to the exam, answers are within allowed options). Attempting to answer a question outside the current session’s subjects is rejected. Purchases require verifying the payment transaction.
- **License Expiry:** On expiry, any active sessions are immediately terminated (force submit), and future session starts are blocked until a new license is purchased.
- **Data Consistency:** Use transactions or idempotency tokens to avoid double-charging or duplicate license issuance on repeated requests.

## Example JSON Objects

### User Profile
```json
{
  "id": "user123",
  "username": "johndoe",
  "email": "john@example.com",
  "role": "student",
  "registeredAt": "2026-06-01T12:00:00Z"
}
```

### License Object
```json
{
  "id": "lic789",
  "userId": "user123",
  "subjects": ["Mathematics","Physics"],
  "issuedAt": "2026-06-20T15:00:00Z",
  "expiresAt": "2026-07-20T15:00:00Z",
  "maxConcurrent": 1,
  "usedCount": 0
}
```

### Purchase Record
```json
{
  "id": "pur456",
  "userId": "user123",
  "licenseId": "lic789",
  "amount": 2000.00,
  "currency": "NGN",
  "purchasedAt": "2026-06-20T15:01:00Z"
}
```

### Exam Session State
```json
{
  "id": "sess456",
  "userId": "user123",
  "examId": "exam:UTME:2026",
  "subjects": ["Mathematics","Physics"],
  "startedAt": "2026-06-28T10:00:00Z",
  "endedAt": "2026-06-28T10:50:00Z",
  "answers": {"q101": "A", "q102": "C", "q103": "B"},
  "score": 85,
  "status": "completed"
}
```

## UTME vs OAU PUTME Comparison

To summarize, the table below contrasts key attributes:

| **Attribute**        | **JAMB UTME**                                                                                                                                   | **OAU PUTME**                                                                             |
|----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|
| Exam Mode            | CBT (fixed 2-hour window)                                                                                                       | CBT online screening                                                      |
| Sections/Subjects    | 4 sections: English (60 Q) + 3 elective subjects (40 Q each)                                                                      | Varies by program: typically English plus UTME subjects plus an Aptitude Test section. English compulsory for all. |
| Question Count       | 180 total MCQs                                                                                                                   | *Unspecified by OAU.* (Likely fewer questions; historical patterns suggest ~50–100 total.) |
| Time Limit           | 120 minutes total                                                                                                                | *Unspecified.* (Past OAU exams were often ~30–60 minutes.)                                |
| Question Type        | All multiple-choice (4 options)                                                                                                   | All multiple-choice (assumed 4 options; official sources do not detail type)              |
| Scoring              | 1 mark per correct, 0 for wrong (no negative marking)                                                                                 | Not stated publicly (assumed similar no-negative scheme)                                  |
| Adaptive/Gating      | None (all candidates get same fixed set of Qs)                                                                                   | None reported; fixed test for each candidate                                            |
| Recent Changes       | 2026 confirms longstanding format (no recent structural changes)                                                                  | Introduced *Aptitude Test* component (current affairs/logic) in past years; screening now fully online.         |

*Note:* Official exam notices do not specify OAU’s question counts or timing. We record those as unspecified. 

## Flowchart (Purchase-to-Exam Lifecycle)

```mermaid
flowchart LR
  subgraph License_Purchase
    A[User selects subjects] --> B{Validate subjects}
    B -->|Valid| C[Process payment]
    B -->|Invalid| Z[Reject selection]
    C --> D[Issue license]
    D --> E[Store license (with expiry & concurrency)]
  end

  subgraph Exam_Session
    E --> F[User logs in & chooses exam]
    F --> G{Check license & concurrency}
    G -->|OK| H[Start exam session]
    G -->|Not allowed| I[Access denied]
    H --> J[Display questions & start timer]
    J --> K[User answers questions]
    K --> L[Submit answers or timeout]
    L --> M[Score answers & record result]
    M --> N[Show results to user]
  end
```

This flowchart shows a user purchasing subject licenses (left side) and then using those licenses to start and complete an exam session (right side). The system enforces license validation before allowing the session.

## Codex Prompt (for Code Generation)

```
You are building a Computer-Based Testing (CBT) application backend. Implement the following:

1. **Data models (JSON schemas):** Define models for Exam, Subject, Question, User, License, Purchase, and Session (as outlined above). Include fields for exam structure (subjects, question counts, duration), question metadata (topic, difficulty, tags, past-year), licenses (subject list, expiry, concurrency), and session state (answers, timing, score).

2. **Exam formats:** Support two exam formats:
   - **JAMB UTME:** Fixed format with 4 subjects (60 questions in Use of English, 40 each in three other subjects, total 180; 120 minutes). All MCQs.
   - **OAU PUTME:** Covers English + relevant UTME subjects + an aptitude section. Official details unspecified, but assume MCQs and an online CBT exam of shorter duration.
   Incorporate these structures into exam creation and validation logic.

3. **User flow for subject licenses:** Implement endpoints for users to select subjects and purchase licenses. Validate subject eligibility for the user's course. On payment, issue a License object (with user ID, allowed subjects, issuedAt, expiresAt, maxConcurrent). Enforce:
   - A user cannot start an exam in a subject they lack a current license for.
   - License expiration (block exam start if expired).
   - Concurrency (limit simultaneous exam sessions per license).

4. **API endpoints (sample):** Provide REST endpoints and example JSON payloads for:
   - Creating an exam (`POST /exams`).
   - Adding questions (`POST /exams/{examId}/questions`).
   - Purchasing a license (`POST /licenses`).
   - Starting a session (`POST /sessions`).
   - Submitting answers (`POST /sessions/{id}/submit`).
   - Retrieving results (`GET /sessions/{id}/result`).
   Each endpoint should handle validation (e.g. check license subjects, timeouts).

5. **Question Bank and Tagging:** Design a question schema that includes metadata tags (subject, topic, difficulty level, past-paper year). Show sample JSON for questions with these tags.

6. **Edge cases:** Handle exam timeouts, network interruptions (resume logic or auto-submit), and implement simple anti-cheating measures (shuffle options, log answer time). Outline how proctoring hooks (e.g., capturing webcam snapshots) could integrate.

7. **Example JSON objects:** Include sample JSON for each model (Exam, Question, License, Session, etc.) to illustrate structure.

The code should be language-agnostic (no specific framework required) but structured and clear. Focus on fulfilling the above requirements thoroughly.
```

This prompt guides Codex to generate code that wires together the specified exam formats, data models, user flows, and APIs into a CBT app, according to the details collected above.

