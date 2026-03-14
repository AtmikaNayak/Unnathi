# HerLaunch 🚀
### Built at Her-a-thon 2026 · NMAM Institute of Technology

> A one-stop platform for women to discover scholarships, internships, and government schemes — and learn to smartly save, budget, and invest. **Find the money. Grow the money.**

---

## 🛠️ Setup (Do this first — all 4 of you)

```bash
# 1. Clone the repo (Person 1 creates GitHub repo and shares link)
git clone <your-repo-link>
cd herlaunch

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open http://localhost:5173 in your browser ✅

---

## 👥 Who Does What

| File | Owner | What to build |
|------|-------|---------------|
| `src/pages/Home.jsx` | **Person 1** | Hero section, module cards, stats |
| `src/pages/OpportunityHub.jsx` | **Person 1** | Scholarships, schemes, internships with filters |
| `src/components/Navbar.jsx` | **Person 1** | Top navigation |
| `src/components/Footer.jsx` | **Person 1** | Footer |
| `src/pages/MoneyLab.jsx` | **Person 2** | Topics grid, milestones, 50/30/20 rule |
| `src/pages/Simulator.jsx` | **Person 2** | SIP calculator with chart |
| `src/firebase/config.js` | **Person 3** | Firebase credentials |
| `src/services/db.js` | **Person 3** | All fetch functions (others just import these) |
| `src/components/ChatBot.jsx` | **Person 4** | Gemini AI chatbot |
| Pitch Deck | **Person 4** | Google Slides / Canva presentation |

---

## 🔥 Person 3 — Firebase Setup

1. Go to https://console.firebase.google.com
2. Create project → name it `herlaunch`
3. Add Web App → copy config into `src/firebase/config.js`
4. Create Firestore Database (test mode)
5. Create these collections and add sample documents:
   - `scholarships`
   - `schemes`
   - `internships`
6. Uncomment the real Firebase calls in `src/services/db.js`

---

## 🤖 Person 4 — Gemini API Setup

1. Go to https://aistudio.google.com/app/apikey
2. Generate a free API key
3. Paste it in `src/components/ChatBot.jsx` where it says `YOUR_GEMINI_API_KEY`

---

## 🚀 Deploy to Vercel (Before judging!)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or just go to https://vercel.com → Import GitHub repo → Deploy in 1 click!

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx      ← P1
│   ├── Footer.jsx      ← P1
│   └── ChatBot.jsx     ← P4
├── pages/
│   ├── Home.jsx        ← P1
│   ├── OpportunityHub.jsx ← P1
│   ├── MoneyLab.jsx    ← P2
│   └── Simulator.jsx   ← P2
├── firebase/
│   └── config.js       ← P3
├── services/
│   └── db.js           ← P3
├── App.jsx             ← Routing (done)
└── main.jsx            ← Entry point (done)
```

---

**Good luck! You've got this 💜**
