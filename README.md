<div align="center">

<img src="https://img.shields.io/badge/AI-Recommendation%20Engine-orange?style=for-the-badge" />
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" />

<br /><br />

# 🎬 Plot Twist

### *Not sure what to do tonight? Let AI decide.*

**An AI-powered leisure recommender that suggests what to watch, read, play, or do based on your mood and preferences.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Roadmap](#-roadmap)

</div>

---

## 🌱 About the Project

Plot Twist is a mini project built to solve a small but familiar problem — decision fatigue around downtime. Instead of endlessly scrolling through options, users describe their mood or preferences and get AI-generated leisure recommendations (movies, shows, books, activities) tailored to the moment.

---

## ✨ Features

- **Mood-based input** — describe how you're feeling or what you're in the mood for
- **AI-generated recommendations** — personalized suggestions rather than generic top-10 lists
- **Multi-category suggestions** — spans movies, shows, books, and other leisure activities
- **Quick, low-friction flow** — get a suggestion in seconds, no lengthy forms

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **AI / Recommendation Logic** | Groq |
| **Frontend** | _(React_ |


---

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18 
- An AI API key (if using an LLM provider)

### 1. Clone the repository

```bash
git clone https://github.com/Noel007-cse/plot-twist.git
cd plot-twist
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
AI_API_KEY=your_api_key_here
```

> ⚠️ Never commit your `.env` file — add it to `.gitignore`.

### 4. Run the app

```bash
npm start
```

---

## 🏗 Architecture

```
plot-twist/
├── src/
│   ├── components/       # UI components
│   ├── services/          # AI API integration, recommendation logic
│   └── utils/             # Helpers
├── public/
└── package.json
```

> Update this tree to match your actual folder structure.

---

## 🗺 Roadmap

- [ ] Save favorite recommendations
- [ ] Filter by available time / budget
- [ ] Group/social mode — recommend for multiple people
- [ ] Feedback loop to refine future suggestions

---

## 🤝 Contributing

Contributions are welcome! Fork the repo, create a feature branch, and open a pull request.

```bash
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change"
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<div align="center">

**Built for the moments when you just can't decide.**

</div>
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
