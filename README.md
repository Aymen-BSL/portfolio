# ⚡ Aymen-BSL Portfolio
> A high-performance, interactive portfolio built with **Next.js 16 (React 19)**, **Sanity CMS**, and cutting-edge animation libraries.
![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Sanity](https://img.shields.io/badge/Sanity-F36458?style=for-the-badge&logo=sanity&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CMS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
## 🌟 Overview
This portfolio leverages the latest web technologies to deliver a seamless, dynamic user experience. It combines a robust headless CMS architecture with immersive 3D and motion effects.
### Key Features
*   **Headless Content Management**: Fully dynamic content powered by **Sanity v4**.
*   **Live Visual Editing**: Implemented **Sanity Live Content** API for real-time, on-page editing and previews.
*   **Next-Gen Framework**: Built on **Next.js 16** App Router and **React 19**.
*   **Immersive Animations**: Complex motion graphics using **GSAP** and **Motion** (fka Framer Motion).
*   **3D Elements**: Integrated **Three.js** via `@react-three/fiber` for interactive visuals.
*   **Modern Styling**: **Tailwind CSS v4** + **Radix UI** primitives for accessible, high-performance design.
## 🛠️ Tech Stack
| Category | Technologies |
|----------|--------------|
| **Core** | Next.js 16, React 19, TypeScript |
| **CMS** | Sanity.io (v4), Next-Sanity (Live Content) |
| **Styling** | Tailwind CSS v4, Styled Components, CLSX |
| **Animation** | GSAP, Motion, Three.js, React Three Fiber |
| **Icons** | Lucide React, React Icons, Tabler Icons |
| **Utilities** | dotted-map, class-variance-authority |
## 🚀 Getting Started
### Prerequisites
*   Node.js 18+
*   npm / yarn / pnpm
### 1. Clone the repository
```bash
git clone https://github.com/Aymen-BSL/portfolio.git
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
```
### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.
## 📝 Sanity Live Content & Studio
This project utilizes **Sanity Live Content** (Visual Editing) to allow real-time updates and interactive previews.
1.  **Access Studio**: Go to [http://localhost:3000/studio](http://localhost:3000/studio).
2.  **Visual Editing**: Navigate to any page on the frontend while logged into the Studio to see clickable edit overlays (Presentation Mode).
3.  **Real-time Updates**: Changes made in the Studio are instantly reflected on the frontend via the Live Content API without rebuilding.
## 📜 Scripts
-   `npm run dev`: Start Next.js dev server.
-   `npm run build`: Build for production.
-   `npm run typegen`: Generate TypeScript types from Sanity schemas.
## License
MIT
