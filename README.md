<div align="center">

# Hi there, I'm Ayoola Damisile 👋

**Full-Stack Software Engineer • Open-Source Creator • Systems Architect • Classical Pianist**

*Building high-performance web applications, AES-256 encrypted devtools, biometric verification systems, and AI-driven workflows.*

[![NPM Packages](https://img.shields.io/badge/npm-published_packages-red.svg?logo=npm)](https://www.npmjs.com/~damisile_ayoola)
[![GitHub Repositories](https://img.shields.io/badge/github-open_source-blue.svg?logo=github)](https://github.com/Ayoola-tech2024)
[![LinkedIn Profile](https://img.shields.io/badge/linkedin-connect-0A66C2.svg?logo=linkedin)](https://www.linkedin.com/in/damisile-ayoola-096a7b382)
[![Website Portfolio](https://img.shields.io/badge/website-damisile.name.ng-gold.svg)](https://www.damisile.name.ng/)

[Featured Projects](#-featured-open-source--engineering-projects) • [Tech Stack](#-technical-stack) • [Live npm Packages](#-published-npm-packages) • [Contact](#-connect-with-me)

</div>

---

## 🚀 Published Open-Source Developer Tools

### 🩺 [`fixmcp`](https://www.npmjs.com/package/fixmcp) (NPM `v0.1.0`)
> *"Stop guessing which MCP server is broken. Ask the doctor."*

- **Problem**: MCP (Model Context Protocol) servers timing out (`-32001`) or crashing silently due to `npx -y pkg@latest` registry round-trips.
- **Solution**: One-command diagnostic & auto-fix CLI that discovers configurations across 6 AI agents (Claude Code, Cursor, VS Code, opencode, Codex), executes real stdio JSON-RPC handshakes, and rewrites broken paths.
- **Quick Run**: `npx fixmcp`
- 🔗 [NPM Package](https://www.npmjs.com/package/fixmcp) | [GitHub Repository](https://github.com/Ayoola-tech2024/fixmcp)

---

### 🔐 [`@damisile_ayoola/envvault`](https://www.npmjs.com/package/@damisile_ayoola/envvault) (NPM `v1.1.0`)
> *"Zero-dependency AES-256-GCM encrypted secret manager with sub-process memory injection."*

- **Problem**: Plaintext `.env` files passed on Slack or accidentally pushed to Git.
- **Solution**: Encrypts secrets locally using Node native `crypto` (AES-256-GCM + PBKDF2 with 100,000 SHA-512 iterations). Injects secrets directly into `process.env` in memory (`envvault run -- npm start`) without writing plaintext passwords to disk. Includes built-in security linter (`envvault audit`).
- **Quick Run**: `npx @damisile_ayoola/envvault init`
- 🔗 [NPM Package](https://www.npmjs.com/package/@damisile_ayoola/envvault) | [GitHub Repository](https://github.com/Ayoola-tech2024/envvault)

---

## ⚡ Featured Full-Stack Engineering Systems

### 🎓 **checkIn — University Biometric Attendance Platform**
- Production-grade university attendance platform built for the School of Logistics and Innovation Technology (SLIT) at **FUTA**.
- **Biometric 3D Verification**: Integrates Google MediaPipe FaceMesh extracting **468 3D facial landmarks** with 3-tier similarity thresholding (>50% present, 40-50% pending review, <40% fraud reject).
- **GPS Validation**: Haversine distance geofencing (50m radius around lecturer/venue).
- **Offline Resilience Engine**: Custom IndexedDB payload queueing (`idb`) that automatically background-syncs when campus Wi-Fi or cellular signal drops.
- **Tech**: Next.js 16, TypeScript, MediaPipe FaceMesh, PostgreSQL via InsForge, Zustand.

---

### ☀️ **buysolar.ng — Clean Energy Marketplace & AI Copilot**
- E-commerce platform & commercial solar equipment directory.
- **Cloudinary Image Pipeline**: Automated asset migration & optimization for hundreds of solar products.
- **Admin AI Copilot**: Omnichannel WhatsApp/Telegram bot for instant product inquiries & automated customer support handoffs.
- **Tech**: Next.js, Cloudinary API, PostgreSQL, Tailwind CSS, Webhooks.

---

## 🛠️ Technical Stack

- **Languages**: TypeScript, JavaScript (ES6+), Python, HTML5, CSS3, SQL
- **Frontend**: Next.js (App Router), React, React Native / Expo, Tailwind CSS, Zustand, Framer Motion
- **Backend & APIs**: Node.js, Express, PostgREST, REST APIs, WebSockets, Webhooks
- **Databases & Cloud**: PostgreSQL, InsForge, Supabase, Cloudinary, IndexedDB (`idb`)
- **Security & DevSecOps**: AES-256-GCM, PBKDF2, Git Security Auditing, Docker, CI/CD, Git
- **Music Tech & Audio**: Web Audio API, Pitch Detection, Music Sheet Rendering, Classical Piano Performance

---

## 📊 GitHub Analytics & Activity

<div align="center">

![Ayoola Damisile's GitHub Stats](https://github-readme-stats.vercel.app/api?username=Ayoola-tech2024&show_icons=true&theme=dark&hide_border=true&count_private=true)
![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=Ayoola-tech2024&layout=compact&theme=dark&hide_border=true)

</div>

---

## 📬 Connect With Me

- 🌐 **Portfolio Website**: [damisile.name.ng](https://www.damisile.name.ng/)
- 💼 **LinkedIn**: [linkedin.com/in/damisile-ayoola-096a7b382](https://www.linkedin.com/in/damisile-ayoola-096a7b382)
- 🐦 **Twitter / X**: [@Damisile_dev](https://x.com/Damisile_dev)
- 📦 **NPM Profile**: [npmjs.com/~damisile_ayoola](https://www.npmjs.com/~damisile_ayoola)
- ✉️ **Email**: [ayoola.tech2024@gmail.com](mailto:ayoola.tech2024@gmail.com)
