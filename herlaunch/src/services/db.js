// ============================================
// P3's FILE — All database functions go here
// P1, P2, P4 just import and call these
// ============================================

import { db } from '../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'

// ---- DUMMY DATA (use this until Firebase is connected) ----
export const DUMMY_SCHOLARSHIPS = [
  { id: 1, name: "Post Matric Scholarship", provider: "Karnataka Govt", amount: "₹15,000/yr", deadline: "31 March 2026", category: "OBC/SC/ST", course: "All", state: "Karnataka", link: "#" },
  { id: 2, name: "Pragati Scholarship", provider: "AICTE", amount: "₹50,000/yr", deadline: "15 April 2026", category: "All", course: "Engineering", state: "All India", link: "#" },
  { id: 3, name: "Vidyasiri Scholarship", provider: "Karnataka Govt", amount: "₹10,000/yr", deadline: "30 April 2026", category: "Minority", course: "All", state: "Karnataka", link: "#" },
  { id: 4, name: "Inspire Scholarship", provider: "DST India", amount: "₹80,000/yr", deadline: "20 March 2026", category: "All", course: "Science", state: "All India", link: "#" },
]

export const DUMMY_SCHEMES = [
  { id: 1, name: "Stree Shakti Package", provider: "SBI", description: "Loan up to ₹25 lakhs for women entrepreneurs at reduced interest rates", category: "Loan", link: "#" },
  { id: 2, name: "Mudra Loan (Mahila)", provider: "Govt of India", description: "Micro loans from ₹50,000 to ₹10 lakhs for women-owned businesses", category: "Loan", link: "#" },
  { id: 3, name: "Sukanya Samriddhi Yojana", provider: "Post Office / Banks", description: "High-interest savings scheme for girls below 10 years", category: "Savings", link: "#" },
  { id: 4, name: "Beti Bachao Beti Padhao", provider: "Govt of India", description: "Welfare services for girls — education, health, and financial support", category: "Welfare", link: "#" },
]

export const DUMMY_INTERNSHIPS = [
  { id: 1, name: "Software Engineer Intern", company: "Infosys", location: "Bangalore", stipend: "₹15,000/mo", deadline: "20 March 2026", link: "#" },
  { id: 2, name: "Data Analyst Intern", company: "Wipro", location: "Remote", stipend: "₹12,000/mo", deadline: "25 March 2026", link: "#" },
  { id: 3, name: "UI/UX Intern", company: "Razorpay", location: "Bangalore", stipend: "₹20,000/mo", deadline: "1 April 2026", link: "#" },
]

// ---- REAL FIREBASE FUNCTIONS (P3 uncomments these when Firebase is ready) ----

// Fetch all scholarships
export const getScholarships = async () => {
  // TODO P3: Uncomment below and remove the dummy return when Firebase is ready
  // const snapshot = await getDocs(collection(db, 'scholarships'))
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return DUMMY_SCHOLARSHIPS
}

// Fetch scholarships filtered by state and/or category
export const getFilteredScholarships = async (state = '', category = '', course = '') => {
  // TODO P3: Add Firebase filtering logic here
  // For now filters the dummy data
  return DUMMY_SCHOLARSHIPS.filter(s => {
    const matchState = !state || s.state === state || s.state === 'All India'
    const matchCategory = !category || s.category === category || s.category === 'All'
    const matchCourse = !course || s.course === course || s.course === 'All'
    return matchState && matchCategory && matchCourse
  })
}

// Fetch all government schemes
export const getSchemes = async () => {
  // TODO P3: Uncomment below when Firebase is ready
  // const snapshot = await getDocs(collection(db, 'schemes'))
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return DUMMY_SCHEMES
}

// Fetch all internships
export const getInternships = async () => {
  // TODO P3: Uncomment below when Firebase is ready
  // const snapshot = await getDocs(collection(db, 'internships'))
  // return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  return DUMMY_INTERNSHIPS
}
