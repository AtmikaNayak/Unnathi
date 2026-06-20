# Unnathi

Unnathi is a web platform designed to help women discover scholarships, internships, and government schemes while also improving financial literacy through interactive learning modules, an investment simulator, and an AI-powered assistant.

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

* React
* Vite
* React Router
* Tailwind CSS
* Firebase Firestore
* Recharts
* OpenRouter API

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

Browse scholarships, government schemes, and internship opportunities. Users can search, filter, and bookmark opportunities based on their requirements.

### Money Lab

Provides beginner-friendly financial education covering topics such as emergency funds, SIPs, fixed deposits, PPF, stocks, insurance, and budgeting principles.

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
  
