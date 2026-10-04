const pad = (n) => String(n).padStart(2, '0')

// Local-date string (YYYY-MM-DD), offset by N days from today
export const dayStr = (offset = 0) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/* ⭐ Featured event — always first on the home screen */
export const CURIOUSPARC = {
  slug: 'curiousparc',
  featured: true,
  title: 'CuriousParc',
  tagline: "Maharashtra's Biggest Tech Event",
  category: 'Competition',
  description:
    'Innovate. Connect. Transform. A two-day offline tech challenge across 8 tracks with prizes worth Rs 50,000+ and paid internships. Teams of 1–4, all skill levels welcome.',
  date: '2026-10-05',
  end_date: '2026-10-06',
  start_time: '00:00',
  end_time: '23:59',
  all_day: true,
  location: 'VIT Campus, Pune',
  duration: 2880,
  capacity: 0,
  registered: 0,
  image_url: '/curiousparc-poster.jpg',
  mode: 'Offline',
  prize: '₹50,000+ & Paid Internships',
  team_size: 'Teams of 1–4',
  skill_note: 'All skill levels welcome',
  registration_deadline: '2026-09-26',
  register_url: '',
  tracks: [
    'Open Innovation',
    'Agentic AI',
    'Computer Vision',
    'Prototyping Boards',
    'AI Model Optimization',
    'Web & App Development',
    'Internet of Things',
    'General Robotics'
  ]
}

const e = (title, category, description, day, start_time, end_time, location, duration, capacity, registered) => ({
  title, category, description, date: dayStr(day), start_time, end_time, location, duration, capacity, registered
})

export const sampleEvents = () => [
  e('AI/ML Deep Dive Workshop', 'Tech', 'Hands-on with transformers & fine-tuning.', 0, '14:30', '16:00', 'Seminar Hall A', 90, 60, 28),
  e('Startup Pitch Night', 'Competition', 'Pitch your idea to real VCs.', 0, '18:00', '20:30', 'Auditorium', 150, 200, 141),
  e('Acoustic Evening', 'Cultural', 'Live indie + chai.', 0, '19:00', '21:00', 'Open Amphitheatre', 120, 300, 220),
  e('DSA Mock Interview', 'Academic', 'Peer-run technical rounds.', 0, '16:30', '18:00', 'Lab 204', 90, 30, 22),
  e('Figma to Code Sprint', 'Workshop', 'Design → deploy in 2 hours.', 0, '15:00', '17:00', 'Design Studio', 120, 40, 12),
  e('Robotics Demo Day', 'Tech', 'Line followers, drones, bots.', 1, '11:00', '13:00', 'Mech Block', 120, 150, 60),
  e('Open Mic + Poetry', 'Cultural', 'Say it out loud.', 1, '18:30', '20:00', 'Cafe Quad', 90, 80, 55),
  e('Hackathon Kickoff', 'Competition', '36 hours. Build something.', 2, '09:00', '10:00', 'Innovation Hub', 60, 250, 180),
  e('Quantum Computing 101', 'Academic', 'Qubits without the math panic.', 2, '14:00', '15:30', 'Physics Hall', 90, 100, 45),
  e('Board Game Social', 'Social', 'Catan, chess, snacks.', 3, '17:00', '19:00', 'Student Lounge', 120, 60, 34),
  e('Cloud Native Bootcamp', 'Workshop', 'Docker, K8s, deploy live.', 3, '10:00', '13:00', 'CS Lab 1', 180, 50, 47),
  e('Photography Walk', 'Social', 'Golden-hour campus walk.', 4, '17:30', '19:00', 'Main Gate', 90, 25, 18),
  e('Case Study Championship', 'Competition', 'Biz + tech, 3 rounds.', 5, '09:30', '17:00', 'B-School Hall', 450, 120, 89),
  e('Music Jam Session', 'Cultural', 'Bring your instrument.', 5, '20:00', '22:00', 'Music Room', 120, 40, 33),
  e('Yoga & Mindfulness', 'Social', 'Reset before exams.', 6, '07:00', '08:00', 'Sports Ground', 60, 100, 41)
]
