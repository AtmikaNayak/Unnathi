import { db } from '../firebase/config'
import { collection, getDocs } from 'firebase/firestore'

export const DUMMY_SCHOLARSHIPS = [
  { id: 1, name: "Post Matric Scholarship", provider: "Karnataka Govt", amount: "₹15,000/yr", deadline: "31 March 2026", category: "OBC/SC/ST", course: "All", state: "Karnataka", link: "https://ssp.postmatric.karnataka.gov.in" },
  { id: 2, name: "Pragati Scholarship", provider: "AICTE", amount: "₹50,000/yr", deadline: "15 April 2026", category: "All", course: "Engineering", state: "All India", link: "https://www.aicte-india.org/bureaus/iqac/pragati" },
  { id: 3, name: "Vidyasiri Scholarship", provider: "Karnataka Govt", amount: "₹10,000/yr", deadline: "30 April 2026", category: "Minority", course: "All", state: "Karnataka", link: "https://sw.kar.nic.in" },
  { id: 4, name: "Inspire Scholarship", provider: "DST India", amount: "₹80,000/yr", deadline: "20 March 2026", category: "All", course: "Science", state: "All India", link: "https://online-inspire.gov.in" },
]

export const DUMMY_SCHEMES = [
  { id: 1, name: "Stree Shakti Package", provider: "SBI", description: "Loan up to ₹25 lakhs for women entrepreneurs at reduced interest rates.", category: "Loan", link: "https://sbi.co.in/web/business/sme/sme-loans/stree-shakti-package" },
  { id: 2, name: "Mudra Loan - Mahila", provider: "Govt of India", description: "Micro loans from ₹50,000 to ₹10 lakhs for women-owned businesses. No collateral needed.", category: "Loan", link: "https://www.mudra.org.in" },
  { id: 3, name: "Sukanya Samriddhi Yojana", provider: "Post Office / Banks", description: "High-interest savings scheme (8.2% p.a.) for girl child below 10 years. Tax benefits under 80C.", category: "Savings", link: "https://www.nsiindia.gov.in" },
  { id: 4, name: "Beti Bachao Beti Padhao", provider: "Govt of India", description: "Welfare services for girls — education, health, and financial support.", category: "Welfare", link: "https://wcd.nic.in/bbbp-schemes" },
]

export const DUMMY_INTERNSHIPS = [
  { id: 1, name: "Software Engineer Intern", company: "Infosys", location: "Bangalore", stipend: "₹15,000/mo", deadline: "30 March 2026", link: "https://infosys.com/careers" },
  { id: 2, name: "Data Analyst Intern", company: "Wipro", location: "Remote", stipend: "₹12,000/mo", deadline: "25 March 2026", link: "https://wipro.com/careers" },
  { id: 3, name: "UI/UX Designer Intern", company: "Razorpay", location: "Bangalore", stipend: "₹20,000/mo", deadline: "1 April 2026", link: "https://razorpay.com/jobs" },
]

export const getScholarships = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'scholarships'))
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return data.length > 0 ? data : DUMMY_SCHOLARSHIPS
  } catch (err) {
    console.error("Firebase error:", err)
    return DUMMY_SCHOLARSHIPS
  }
}

export const getFilteredScholarships = async (state = '', category = '', course = '') => {
  try {
    const snapshot = await getDocs(collection(db, 'scholarships'))
    let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    if (data.length === 0) data = DUMMY_SCHOLARSHIPS
    return data.filter(s => {
      const matchState = !state || s.state === state || s.state === 'All India'
      const matchCategory = !category || s.category === category || s.category === 'All'
      const matchCourse = !course || s.course === course || s.course === 'All'
      return matchState && matchCategory && matchCourse
    })
  } catch (err) {
    console.error("Firebase error:", err)
    return DUMMY_SCHOLARSHIPS
  }
}

export const getSchemes = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'schemes'))
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return data.length > 0 ? data : DUMMY_SCHEMES
  } catch (err) {
    console.error("Firebase error:", err)
    return DUMMY_SCHEMES
  }
}

export const getInternships = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'internships'))
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    return data.length > 0 ? data : DUMMY_INTERNSHIPS
  } catch (err) {
    console.error("Firebase error:", err)
    return DUMMY_INTERNSHIPS
  }
}