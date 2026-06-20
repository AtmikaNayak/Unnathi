# Unnathi

Unnathi is a platform designed to help women discover scholarships, internships, and government schemes while building financial literacy through interactive learning resources, an investment simulator, and an AI-powered assistant.

> Built as part of **Her-a-thon 2026**, a women's hackathon conducted by the **Finite Loop Womens Community (FLWC), NMAM Institute of Technology**.

## Live Demo

Website: https://unnathi-sage.vercel.app/

## Features

* Scholarship discovery and filtering
* Government schemes for women
* Internship opportunities
* Financial learning through Money Lab
* SIP and Step-Up SIP Investment Simulator
* AI-powered HerBot assistant
* Financial milestones tracker
* Personal finance quiz
* Responsive user interface

## Tech Stack

<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Firestore-DD2C00?style=for-the-badge&logo=firebase&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-8884D8?style=for-the-badge" />
  <img src="https://img.shields.io/badge/OpenRouter-412991?style=for-the-badge" />
</p>

## Project Structure

```text
Unnathi
├── Docs.md
├── README.md
├── src
│   ├── components
│   │   ├── ChatBot.jsx
│   │   ├── FilterBar.jsx
│   │   ├── Footer.jsx
│   │   ├── InvestmentSimulator.jsx
│   │   ├── Navbar.jsx
│   │   ├── SchemeCard.jsx
│   │   └── ScholarshipCard.jsx
│   ├── firebase
│   │   └── config.js
│   ├── images
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── MoneyLab.jsx
│   │   ├── OpportunityHub.jsx
│   │   └── Simulator.jsx
│   └── services
│       └── db.js
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Running the Project Locally

Clone the repository:

```bash
git clone <repository-url>
cd Unnathi
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add your API key:

```env
VITE_OPENROUTER_API_KEY=your_api_key
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

## Running Tests

No automated tests are currently configured for this project.

## Application Modules

### Opportunity Hub

Browse scholarships, government schemes, and internship opportunities. Users can filter opportunities based on state, course, and category.

### Money Lab

Provides beginner-friendly financial education covering budgeting, saving, investing, SIPs, emergency funds, and financial planning.

### Investment Simulator

Interactive SIP calculator that visualizes investment growth over time and compares regular SIPs with Step-Up SIPs.

### HerBot

AI-powered chatbot that assists users with:

* Scholarships
* Government schemes
* Internships
* Career guidance
* Personal finance queries

## Screenshots

### Home

![Home](src/images/Home.png)

### Opportunities and HerBot

![Opportunity Hub](src/images/Opportunities%20and%20Herbot.png)

### Money Lab

![Money Lab](src/images/Money%20Lab.png)

### Investment Basics

![Investment Basics](src/images/Investment%20basics.png)

### Investment Simulator

![Simulator](src/images/Simulator.png)

## Contributors

* Atmika Nayak
* Shreya G Amin
* Ishta P Jain
* Aakanksha K Poojari

## Additional Notes

* Firebase Firestore is used for storing scholarships, schemes, and internship data.
* The application falls back to local sample data if Firebase data is unavailable.
* Project planning, team responsibilities, and development workflow are documented in `Docs.md`.

## Resources

* Firebase: https://firebase.google.com
* React Router: https://reactrouter.com
* Recharts: https://recharts.org
* OpenRouter: https://openrouter.ai
