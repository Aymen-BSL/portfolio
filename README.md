# ⚡ Aymen-BSL Portfolio
> A high-performance, interactive portfolio built with **Next.js 16 (React 19)**, **Sanity CMS**, and cutting-edge animation libraries.
![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Sanity](https://img.shields.io/badge/Sanity-F36458?style=for-the-badge&logo=sanity&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CMS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
## 🌟 Overview
This portfolio combines a headless content architecture, live content updates, an AI assistant, and interactive motion design. Portfolio data is managed through Sanity and used by a Gemini-powered assistant to answer questions about my experience, projects, and technical skills.
### Key Features
*   **AI Portfolio Assistant:** Integrated Gemini through the Google AI SDK to answer questions using structured portfolio data retrieved from Sanity.
*   **Headless Content Management:** Projects, experience, skills, and other portfolio content are managed through structured Sanity schemas instead of being hard-coded into the frontend.
*   **Live Content Updates:** Integrated Sanity Live Content so published Studio changes are reflected on the frontend without rebuilding or redeploying the application.
*   **Visual Editing:** Added Sanity Presentation and Visual Editing support for previewing content and editing it directly from the portfolio interface.
*   **Interactive Animations:** Built scroll-based and interface animations with GSAP and Motion.
*   **Responsive Interface:** Developed a responsive, accessible interface using Tailwind CSS and reusable UI components.
## 🛠️ Tech Stack
| Category | Technologies |
|----------|--------------|
| **Core** | Next.js 16, React 19, TypeScript |
| **CMS** | Sanity.io (v4), Next-Sanity (Live Content) |
| **Styling** | Tailwind CSS v4, Styled Components, CLSX |
| **Animation** | GSAP, Motion, Three.js, React Three Fiber |
| **Icons** | Lucide React, React Icons, Tabler Icons |
| **Utilities** | dotted-map, class-variance-authority |
## 🛠️ Tech Stack
| Category | Technologies |
|----------|--------------|
| **Core** | Next.js, React, TypeScript |
| **Content** | Sanity, next-sanity, Sanity Live Content, Visual Editing |
| **AI** | Gemini, Google AI SDK |
| **Styling** | Tailwind CSS, styled-components, clsx |
| **Animation** | GSAP, Motion |
| **UI & Icons** | Radix UI, Lucide React, React Icons, Tabler Icons |
| **Utilities** | class-variance-authority, dotted-map |
## 🚀 Getting Started
### Prerequisites
*   Node.js 18+
*   npm / yarn / pnpm
### 1. Clone the repository
```bash
git clone https://github.com/Aymen-Ben-Salem/portfolio.git
cd portfolio
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Environment Setup
Create a .env.local file in the root directory and add your Sanity credentials (required for Live Content fetching):
```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_write_token
SANITY_VIEWER_TOKEN=your_viewer_token

GEMINI_API_KEY=your_api_key
```
### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.
## 📝 Sanity Live Content & Studio
This project utilizes **Sanity Live Content** (Visual Editing) to allow real-time updates and interactive previews.
1.  **Access Studio**
2.  **Visual Editing**: Navigate to any page on the frontend while logged into the Studio to see clickable edit overlays (Presentation Mode).
3.  **Real-time Updates**: Changes made in the Studio are instantly reflected on the frontend via the Live Content API without rebuilding.
## 🤖 AI Portfolio Assistant
The portfolio includes a Gemini-powered assistant that answers questions about my professional background.

When a visitor submits a question, the server retrieves the relevant structured portfolio content from Sanity and includes it as grounding context in the Gemini request. This allows the assistant to generate responses based on my actual projects, experience, skills, and education rather than relying on generic model knowledge.

The integration is implemented through the Google AI SDK, with requests handled server-side so API credentials are not exposed to the browser.
## 📜 Scripts
-   `npm run dev`: Start Next.js dev server.
-   `npm run build`: Build for production.
-   `npm run typegen`: Generate TypeScript types from Sanity schemas.
## License
MIT
