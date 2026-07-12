# Ashish Kumar's Portfolio — Comprehensive Technical Documentation

Welcome to the official developer manual and deployment documentation for Ashish Kumar's professional portfolio. This portfolio has been engineered as a high-fidelity, production-grade Web application showcasing a dual specialization in **Java Full Stack Development** and **Data Analytics**.

Instead of a generic, static student website, this portfolio functions closer to a modern SaaS application (drawing inspiration from platforms like Vercel, Linear, and Stripe). It features a flat, minimal aesthetic, a unified single-scroll navigation layout, real-time GitHub integration, an interactive SQL runner engine, and a secure serverless email-gated resume approval workflow.

---

## Table of Contents
1. [Design Philosophy & Core Aesthetics](#1-design-philosophy--core-aesthetics)
2. [Technical Architecture Overview](#2-technical-architecture-overview)
3. [Full Project Directory Structure](#3-full-project-directory-structure)
4. [File-by-File Breakdown](#4-file-by-file-breakdown)
   - [React Components (UI & Layout)](#react-components-ui--layout)
   - [Centralized JSON Data Models](#centralized-json-data-models)
   - [Serverless API Webhooks (Backend)](#serverless-api-webhooks-backend)
   - [Configurational Files](#configurational-files)
5. [JSON-Driven Architecture & Maintenance Guide](#5-json-driven-architecture--maintenance-guide)
6. [Gated Resume Download Workflow Deep-Dive](#6-gated-resume-download-workflow-deep-dive)
7. [Production Deployment Guide (Vercel)](#7-production-deployment-guide-vercel)
8. [Local Development & Maintenance Workflows](#8-local-development--maintenance-workflows)

---

## 1. Design Philosophy & Core Aesthetics

To stand out in high-volume recruiting cycles, the portfolio avoids flashy, performance-degrading animations and chaotic color palettes. It prioritizes **speed, typography, layout consistency, and interactive utility**.

*   **Color Lock**: The portfolio is locked to a premium dark theme to reduce eye strain and present a high-contrast terminal aesthetic.
    *   **Background**: Flat `#0B0B0C` (no gradients on body containers).
    *   **Cards**: `#111214` (for structural grouping of items).
    *   **Accent Color**: `#4F8CFF` (a vibrant electric blue representing active selections and triggers).
    *   **Border Color**: `#1E2024` (subtle dividers matching standard IDE outlines).
    *   **Text Primary**: `#FFFFFF` (100% white for bold labels).
    *   **Text Secondary**: `#A1A1AA` (subtle gray for descriptions).
*   **Typography**: Implemented **Satoshi** (from Fontshare) for premium headings, **Inter** for readable body text, and **JetBrains Mono** for code-related text blocks.
*   **Aesthetics**: Glassmorphic borders, thin lines, subtle scale animations using `framer-motion`, and interactive code terminals that give a highly technical impression.

---

## 2. Technical Architecture Overview

The portfolio is structured on a **Decoupled JSON-Driven Architecture**. By separating content data from the UI layout files, the website is highly scalable. Changing copy, adding projects, or swapping certificate credentials does not require writing a single line of React code.

```
+---------------------------------------+
|            React Frontend             |
|  (Nav, Hero, About, Projects, etc.)   |
+---------------------------------------+
                   |
                   v (Consumes aggregated ES modules)
+---------------------------------------+
|         AGGREGATOR: content.js        |
+---------------------------------------+
                   |
                   v (Reads raw data from static files)
+-------------------------------------------------------------+
|                     RAW DATA DIRECTORY                      |
|  [profile.json]  [projects.json]  [certifications.json]    |
|  [skills.json]   [experience.json] [analytics.json]         |
+-------------------------------------------------------------+
```

### Key Framework Integration Choices:
1.  **Vite + React (ES6)**: Bundling engine providing fast hot-module reloading and optimized static bundle rendering (compiles in <1.5s).
2.  **Tailwind CSS (V4)**: Clean utility-first styling utilizing CSS-based theme variables mapped to `@theme` directives for instant site-wide branding updates.
3.  **Framer Motion**: Controls the smooth mobile menu sliding overlays, modal entry/exit states, and scroll reveal animations for sections.
4.  **Lucide React**: Supplies lightweight, customizable vector icons.
5.  **Serverless Webhook Automation**: Implemented Node.js API endpoints deployed on Vercel to handle Airtable logging and Resend email dispatches.

---

## 3. Full Project Directory Structure

Here is the visual representation of the repository folder tree:

```
ashish-portfolio/
├── .gemini/                     # IDE and local configuration cache
├── api/                         # Node.js Serverless Functions (Backend)
│   ├── approve-resume.js        # GET endpoint: updates Airtable logs & sends resume
│   └── request-resume.js        # POST endpoint: registers requester & sends email to owner
├── public/                      # Static assets folder (served at root level)
│   ├── avatar.jpg               # Your profile photo
│   ├── doc-ai-preview.png       # Generated preview screenshot for Doc-AI
│   ├── docstring-preview.png    # Generated preview screenshot for Docstring Generator
│   ├── finance-preview.png      # Generated preview screenshot for Finance Manager
│   └── favicon.svg              # Tab icon
├── src/                         # React application source code
│   ├── components/              # Reusable UI Layout components
│   │   ├── About.jsx            # About section, social buttons, and CV trigger
│   │   ├── AnalyticsDashboard.jsx # Analytical chart SVGs & SQL sandbox terminal
│   │   ├── Certifications.jsx  # Grid layout card display for credentials
│   │   ├── Education.jsx        # Grid displaying B.Tech and CBSE Intermediate school
│   │   ├── Experience.jsx       # Vertical timeline tracking internships
│   │   ├── Footer.jsx           # Copyright, email mailto cards, and handles
│   │   ├── GithubActivity.jsx   # Live GitHub stats and events commit log
│   │   ├── Hero.jsx             # Hero section and code playground screenshot
│   │   ├── Hireability.jsx      # Grid of core competencies
│   │   ├── Nav.jsx              # Responsive navigation header and mobile drawer
│   │   ├── Projects.jsx         # Alternating project rows and SVG diagrams
│   │   ├── ResumeModal.jsx      # Gated resume modal and API POST form
│   │   ├── SocialIcons.jsx      # SVGs for Github and LinkedIn brands
│   │   └── Timeline.jsx         # Journey timeline (2022 to 2026)
│   ├── context/                 # State Managers
│   │   └── ModeContext.jsx      # Controls active color themes and ResumeModal states
│   ├── data/                    # JSON content layers
│   │   ├── analytics.json       # KPI metrics and monthly transaction logs
│   │   ├── certifications.json  # Credentials list, issuers, and URLs
│   │   ├── content.js           # Decoupled ES module aggregator bridge
│   │   ├── experience.json      # Internships, testimonials, timelines, and degrees
│   │   ├── profile.json         # Contact coordinates and CV URLs
│   │   ├── projects.json        # Project metrics, bullets, and flowcharts
│   │   └── skills.json          # Grouped skill lists
│   ├── App.jsx                  # Root assembly wrapper
│   ├── index.css                # Global Tailwind config, keyframes, scrollbar styles
│   └── main.jsx                 # App entry point mounting React virtual DOM
├── index.html                   # Core HTML template loading Satoshi font styles
├── package.json                 # Node dependencies and execution scripts
└── vite.config.js               # Vite configurations
```

---

## 4. File-by-File Breakdown

### React Components (UI & Layout)

#### 1. `src/components/Nav.jsx`
*   **Purpose**: Renders the sticky navigation header container.
*   **Details**: Provides smooth-scroll links (`About`, `Experience`, `Certifications`, `Skills`, `Projects`, `Analytics`, `Contact`). On mobile screens, it collapses into a hamburger button. Clicking it slides open a full-width dropdown list of links with a glassmorphic blur.
*   **State & Animation**: Manages local state `isOpen` (boolean). Uses Framer Motion's `<AnimatePresence>` to slide the menu drawer down (`height: 0` to `'auto'`). Click handlers auto-close the menu drawer when a link is clicked.

#### 2. `src/components/Hero.jsx`
*   **Purpose**: The landing view (above-the-fold) of the website.
*   **Details**: Features a bold dual-heading ("Ashish Kumar: Full Stack Developer & Data Analyst"), a summary of expertise, and location details. On the right, it displays a responsive mockup shell containing interactive styled code blocks. Recruiters can click a "Copy Username" code trigger which changes state to show a checkmark.
*   **State & Animation**: Local state `copied` (boolean) manages clipboard actions. CSS keyframes handle the pulse indicator dots and ambient background glows.

#### 3. `src/components/About.jsx`
*   **Purpose**: Houses bio summaries and primary contact triggers.
*   **Details**:
    *   **Left Column**: A circular profile avatar displaying your custom image (`/avatar.jpg`) with group-hover scaling transitions inside a dotted accent ring.
    *   **Right Column**: Displays the header "About Myself", paragraphs imported from `experience.json`, and direct contact coordinates (email and location).
    *   **CV Triggers**: Includes two buttons ("Full Stack CV" and "Analytics CV") that trigger `openResumeModal('fullstack')` and `openResumeModal('analyst')` respectively. Includes social icons (GitHub, LinkedIn) pointing to your actual accounts.

#### 4. `src/components/Hireability.jsx`
*   **Purpose**: Displays a grid of core competencies (Why Hire Me).
*   **Details**: Consumes `hireabilityCards` from `profile.json` and renders a 4-card grid (Full Stack, Data Analytics, AI Projects, and Real Project Experience) showing key technologies and descriptions.

#### 5. `src/components/Education.jsx`
*   **Purpose**: Renders educational history.
*   **Details**: Uses a 2-column grid layout displaying B.Tech qualifications (Guru Gobind Singh Technical Campus) on the left, and CBSE Intermediate Science (PCM) schooling metrics on the right.

#### 6. `src/components/Timeline.jsx`
*   **Purpose**: Tracks your journey from 2022 to 2026.
*   **Details**: Renders a vertical path list where each node has a year bubble, title, and descriptive text block, showing your progress from starting college to completing internships.

#### 7. `src/components/Experience.jsx`
*   **Purpose**: Chronological log of internship achievements.
*   **Details**: Configures your roles at Infosys Springboard and Innobyte Services on a vertical timeline.
*   **Action Links**: Connects each card dynamically to its corresponding repository page (`docstring-generator` or `innobytes_project`), and adds an active "Live Demo" play button next to the repo link.

#### 8. `src/components/Certifications.jsx`
*   **Purpose**: Displays professional credentials.
*   **Details**: Configures your 5 certifications (Neural Network, Prompt Engineering, HackQuinox, Parakram, and Google Cloud Arcade) in a 3-column responsive card grid.
*   **Verification**: Cards for verified credentials display a "Verify Credential ↗" button opening the course share links. Unlinked programs display a green shield badge showing "Completed".

#### 9. `src/components/Skills.jsx`
*   **Purpose**: Showcases grouped technical competencies.
*   **Details**: Displays 6 categories (Languages, Frontend, Backend, Databases, Analytics, Tools) in a grid of cards, displaying stack keywords in individual tags.

#### 10. `src/components/Projects.jsx`
*   **Purpose**: Catalog of featured projects.
*   **Details**: Alternates visual layouts for each row (odd index: image on left, even index: image on right). Renders high-fidelity project overview screenshots (`doc-ai-preview.png`, `docstring-preview.png`, `finance-preview.png`).
*   **Case Studies**: Includes a drawer button ("Project Details"). Clicking it expands the view to display all project bullet points in a list, alongside target metric badges and custom system architecture diagrams drawn in SVG (API-flow, database schema tables, or AST compilation visitors).

#### 11. `src/components/AnalyticsDashboard.jsx`
*   **Purpose**: Displays your Data Analyst capabilities in an interactive showcase.
*   **Details**:
    *   **KPI Row**: 4 cards showing processing metrics.
    *   **SQL Runner Sandbox**: An interactive SQL console. Recruiters can select pre-built queries (e.g. SELECT * FROM transactions) or type custom ones, click "Run Query", and see results rendered in a structured table.
    *   **SVG Charts**: Displays responsive bar charts and correlation matrices constructed using pure CSS/SVG shapes.

#### 12. `src/components/GithubActivity.jsx`
*   **Purpose**: Connects the page directly to your live GitHub profile.
*   **Details**:
    *   **Contribution Chart**: Loads the SVG contribution graph dynamically from `https://ghchart.rshah.org/4F8CFF/Ashish-kumar-code`.
    *   **API stats**: Connects to the GitHub REST API on mount to retrieve repo counts and followers. It processes language frequencies across your public repositories, rendering a live percentage progress bar.
    *   **Commit Logs**: Displays your latest 3 public commit messages and action dates fetched in real-time.

#### 13. `src/components/ResumeModal.jsx`
*   **Purpose**: Handles the email-gated download modal form.
*   **Details**: Captures requester Name, Work Email, and Company. On submission, it sends a POST request to `/api/request-resume` and triggers a success state advising that their download request is pending approval.

#### 14. `src/components/Footer.jsx`
*   **Purpose**: Renders the footer of the page.
*   **Details**: Split columns:
    *   **Left Column**: Quick contact coordinates and location availability details.
    *   **Right Column**: An interactive "Get in Touch" card containing a mailto button.

#### 15. `src/components/SocialIcons.jsx`
*   **Purpose**: Custom inline SVGs for LinkedIn and GitHub logo assets.

---

### Centralized JSON Data Models

All static portfolio text data is stored in standard JSON files inside `src/data/`. This makes updating text, links, or metrics simple and decoupled from the UI.

#### 1. `src/data/profile.json`
Stores profile-related coordinates and Why Hire Me competency cards.
```json
{
  "profile": {
    "name": "Ashish Kumar",
    "title": "Full Stack Developer & Data Analyst",
    "subTitle": "Building AI-powered Web Applications & Data-Driven Solutions",
    "location": "India",
    "availability": "Open to Full-Time Opportunities & SDE-1 / Data Analyst roles",
    "email": "choubeyashish22@gmail.com",
    "github": "https://github.com/Ashish-kumar-code",
    "linkedin": "https://www.linkedin.com/in/ashish-kumar-0552a32ab/",
    "resumeDev": "https://drive.google.com/file/d/1jTnfP212iutrsjGmS5MzlPt8KalVZAsl/view?usp=drive_link",
    "resumeData": "https://drive.google.com/file/d/1ygVCUKDQrffjiEdhFmCL9AAlzJ_mlmP2/view?usp=drive_link"
  },
  "hireabilityCards": [ ... ]
}
```

#### 2. `src/data/experience.json`
Stores educational histories, journey milestones, internship details, and recommendations.
*   `aboutMe`: Paragraph arrays for the About card text.
*   `timeline`: Bubble nodes for the progress tracker.
*   `experience`: Timeline milestones containing org names, date spans, repository links, live demos, and bullet accomplishments.
*   `education`: Holds B.Tech and Intermediate schooling metrics.

#### 3. `src/data/skills.json`
Stores the categorised skills grid keywords and details.

#### 4. `src/data/projects.json`
Stores details of the 3 featured projects:
*   `id`: Key used to assign preview screenshots and mockup containers.
*   `title` / `subtitle`: Project name headings.
*   `stack`: Tech stack keywords.
*   `metrics`: Performance numbers shown in the Case Study.
*   `bullets`: The exact project description text.
*   `github` / `liveDemo`: Live repository and deployment URLs.
*   `architecture`: Custom SVG chart node labels and descriptions.

#### 5. `src/data/certifications.json`
Stores courses, hackathons, and symposium credentials.
*   `title`: Course title.
*   `issuer`: Credentials issuer organization.
*   `desc`: Summary of skills learned.
*   `link`: Course share link, or `#` for offline certificates.

#### 6. `src/data/analytics.json`
Stores numbers for the analytics cards and transaction ledgers.

#### 7. `src/data/content.js` (The Aggregator Bridge)
Imports all raw `.json` files and exports them as variables. This acts as a single import interface for your components:
```javascript
import profileData from './profile.json'
import experienceData from './experience.json'
import skillsData from './skills.json'
import projectsData from './projects.json'
import certificationsData from './certifications.json'
import analyticsDataObj from './analytics.json'

export const profile = profileData.profile
export const hireabilityCards = profileData.hireabilityCards
// (Exports remaining variables...)
```

---

### Serverless API Webhooks (Backend)

These backend Node.js endpoints are located inside the `/api` directory in the project root. Deployed on Vercel, they handle the gated resume download workflow.

#### 1. `api/request-resume.js`
*   **Trigger**: POST request from the portfolio client form.
*   **Operation**:
    1.  Receives `name`, `email`, `company_name`, and `resume_type` (payload).
    2.  Checks environment variables.
    3.  If Airtable parameters exist, POSTs a new row containing user details, timestamp, and default status "Pending Approval" to log the request.
    4.  Extracts the Airtable record ID.
    5.  Generates dynamic links pointing to `/api/approve-resume?action=approve&id=...` and `/api/approve-resume?action=deny&id=...`.
    6.  Uses **Resend API** to send an email to `choubeyashish22@gmail.com` with the details and Approve/Deny buttons.
    7.  Returns a `200 OK` JSON response to the client.

#### 2. `api/approve-resume.js`
*   **Trigger**: GET request from the Approve or Deny buttons in your email.
*   **Operation**:
    1.  Extracts query parameters: `action`, `email`, `name`, `type`, `id`.
    2.  If Airtable parameters exist, updates the log status to "Approved" or "Denied" using a PATCH request.
    3.  **If Approved**: Sends an automated email to the requester containing a button directing them to download the targeted PDF resume on Google Drive.
    4.  Renders a clean confirmation page to your browser showing the status.

---

### Configurational Files

#### 1. `index.html`
*   **Details**: The entry HTML page. Imports the Satoshi font stylesheet, configures standard viewport headers, and sets up SEO meta tags (title, description, keywords).

#### 2. `vite.config.js`
*   **Details**: Configures Vite to build the React package. Configures output options and asset naming rules.

#### 3. `package.json`
*   **Details**: Lists dev dependencies (`vite`, `@tailwindcss/vite`, `eslint`, `oxlint`) and core libraries (`framer-motion`, `lucide-react`, `react`, `react-dom`). Declares script triggers:
    *   `npm run dev`: Starts local development server.
    *   `npm run build`: Compiles production assets into `/dist`.
    *   `npm run lint`: Code quality check using oxlint.

---

## 5. JSON-Driven Architecture & Maintenance Guide

Because of the decoupled architecture, you do not need to modify React components to update your portfolio details. You only need to edit the respective `.json` file inside `src/data/`.

### How to:
*   **Add a New Skill**: Open [skills.json](file:///c:/Users/choub/Downloads/ashish-portfolio/ashish-portfolio/src/data/skills.json), find the appropriate category block (e.g. "Languages"), and append your skill to the `skills` array.
*   **Edit a Project description**: Open [projects.json](file:///c:/Users/choub/Downloads/ashish-portfolio/ashish-portfolio/src/data/projects.json), locate the project card matching the ID, and replace the sentences in the `bullets` array.
*   **Add a Certification**: Open [certifications.json](file:///c:/Users/choub/Downloads/ashish-portfolio/ashish-portfolio/src/data/certifications.json) and add a new object to the list:
    ```json
    {
      "title": "Your Course Title",
      "issuer": "Issuing Org",
      "desc": "Summary of skills.",
      "link": "Verification URL"
    }
    ```
*   **Change Email or Links**: Open [profile.json](file:///c:/Users/choub/Downloads/ashish-portfolio/ashish-portfolio/src/data/profile.json) and update the corresponding property.

---

## 6. Gated Resume Download Workflow Deep-Dive

This diagram illustrates the step-by-step logic of the gated resume download workflow:

```
[ Recruiter submits form on website ]
                |
                v (POST /api/request-resume)
[ Serverless API logs request in Airtable & emails Ashish via Resend ]
                |
                v (Ashish receives email with action links)
        [ Action Decision ]
          /           \
     [ Approve ]     [ Deny ]
        /               \
 (GET /api/approve...)  (GET /api/approve...)
      /                   \
[ Update Airtable ]    [ Update Airtable ]
[ Send CV link to ]    [ Stop Workflow ]
[ Recruiter email ]
```

### Mock Testing in Local Development
If the Resend or Airtable environment variables are not set up locally, the `/api/request-resume` endpoint logs the request details and generated approval links directly to the terminal console. You can copy the link and paste it into your browser to test the approval page and simulate sending the email.

---

## 7. Production Deployment Guide (Vercel)

Deploying on Vercel is the recommended option for this portfolio because it automatically mounts the serverless functions in the `/api` directory.

### Step 1: Create an Airtable Spreadsheet Log
1.  Sign up at [Airtable](https://airtable.com).
2.  Create a base (e.g., "Resume Logs") and add a table named `ResumeRequests`.
3.  Set up the following columns (exactly as written):
    *   `Name` (Single line text)
    *   `Email` (Email format)
    *   `Company` (Single line text)
    *   `ResumeType` (Single line text)
    *   `Status` (Single line text)
    *   `Timestamp` (Date/Time format)
4.  Copy your **Base ID** (found in your Airtable API documentation).
5.  Create a **Personal Access Token** in your Airtable Developer Hub with scopes `data.records:read` and `data.records:write`.

### Step 2: Set up a Resend Account
1.  Sign up at [Resend](https://resend.com).
2.  Copy your default sandbox **API Key** (`re_...`).
3.  *(Optional)* Add and verify your custom domain in Resend to send emails from your own domain (e.g., `hello@ashishkumar.dev`).

### Step 3: Deploy to Vercel
1.  Push your repository to GitHub.
2.  Import the repository into [Vercel](https://vercel.com).
3.  In the Vercel **Environment Variables** settings, add the following variables:
    *   `RESEND_API_KEY`: Your Resend API Token.
    *   `AIRTABLE_API_KEY`: Your Airtable Personal Access Token.
    *   `AIRTABLE_BASE_ID`: Your Airtable Base ID.
    *   `AIRTABLE_TABLE_NAME`: `ResumeRequests` (or your custom table name).
4.  Click **Deploy**. Vercel will build your static files and deploy your serverless API endpoints.

---

## 8. Local Development & Maintenance Workflows

### Execution Commands:
*   **Install Dependencies**:
    ```bash
    npm install
    ```
*   **Start Local Development Server**:
    ```bash
    npm run dev
    ```
    This launches the local server at `http://localhost:5173`.
*   **Build Production Bundle**:
    ```bash
    npm run build
    ```
    Compiles and outputs optimized assets into the `/dist` directory.
*   **Run Linter Checks**:
    ```bash
    npm run lint
    ```
    Runs `oxlint` to check code quality and syntax compliance.

---

## Rationale behind architectural choices
*   **Why No TypeScript?**: Avoids compile-time complexity for content-driven portfolios while maintaining high readability.
*   **Why Raw JSON?**: Minimises bundle size and keeps data management simple.
*   **Why Vercel Serverless?**: Deploys frontend and backend code in a single repository without maintaining a separate Node.js server.
*   **Why Google Drive Links for CVs?**: Avoids email size limits and email bounce-backs, ensuring reliable delivery.
