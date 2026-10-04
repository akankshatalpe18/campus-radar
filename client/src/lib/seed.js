// Offline fallback so the UI never breaks if the API / MongoDB is not running.
const pad = (n) => String(n).padStart(2, '0')
const day = (o = 0) => {
  const d = new Date(); d.setDate(d.getDate() + o)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
const ev = (id, title, category, description, o, start_time, end_time, location, duration, capacity, registered) =>
  ({ id, title, category, description, date: day(o), start_time, end_time, location, duration, capacity, registered })

export const SEED_EVENTS = [
  {
    id: 'curiousparc', featured: true, title: 'CuriousParc', tagline: "Maharashtra's Biggest Tech Event",
    category: 'Competition',
    description: 'Innovate. Connect. Transform. A two-day offline tech challenge across 8 tracks with prizes worth Rs 50,000+ and paid internships. Teams of 1–4, all skill levels welcome.',
    date: '2026-10-05', end_date: '2026-10-06', start_time: '00:00', end_time: '23:59', all_day: true,
    location: 'VIT Campus, Pune', duration: 2880, capacity: 0, registered: 0,
    image_url: '/curiousparc-poster.jpg', mode: 'Offline', prize: '₹50,000+ & Paid Internships',
    team_size: 'Teams of 1–4', skill_note: 'All skill levels welcome',
    registration_deadline: '2026-09-26', register_url: '',
    tracks: ['Open Innovation', 'Agentic AI', 'Computer Vision', 'Prototyping Boards', 'AI Model Optimization', 'Web & App Development', 'Internet of Things', 'General Robotics']
  },
  ev('s1', 'AI/ML Deep Dive Workshop', 'Tech', 'Hands-on with transformers & fine-tuning.', 0, '14:30', '16:00', 'Seminar Hall A', 90, 60, 28),
  ev('s2', 'Startup Pitch Night', 'Competition', 'Pitch your idea to real VCs.', 0, '18:00', '20:30', 'Auditorium', 150, 200, 141),
  ev('s3', 'Acoustic Evening', 'Cultural', 'Live indie + chai.', 0, '19:00', '21:00', 'Open Amphitheatre', 120, 300, 220),
  ev('s4', 'DSA Mock Interview', 'Academic', 'Peer-run technical rounds.', 0, '16:30', '18:00', 'Lab 204', 90, 30, 22),
  ev('s5', 'Figma to Code Sprint', 'Workshop', 'Design → deploy in 2 hours.', 0, '15:00', '17:00', 'Design Studio', 120, 40, 12),
  ev('s6', 'Robotics Demo Day', 'Tech', 'Line followers, drones, bots.', 1, '11:00', '13:00', 'Mech Block', 120, 150, 60),
  ev('s7', 'Open Mic + Poetry', 'Cultural', 'Say it out loud.', 1, '18:30', '20:00', 'Cafe Quad', 90, 80, 55),
  ev('s8', 'Hackathon Kickoff', 'Competition', '36 hours. Build something.', 2, '09:00', '10:00', 'Innovation Hub', 60, 250, 180),
  ev('s9', 'Quantum Computing 101', 'Academic', 'Qubits without the math panic.', 2, '14:00', '15:30', 'Physics Hall', 90, 100, 45),
  ev('s10', 'Board Game Social', 'Social', 'Catan, chess, snacks.', 3, '17:00', '19:00', 'Student Lounge', 120, 60, 34),
  ev('s11', 'Cloud Native Bootcamp', 'Workshop', 'Docker, K8s, deploy live.', 3, '10:00', '13:00', 'CS Lab 1', 180, 50, 47),
  ev('s12', 'Photography Walk', 'Social', 'Golden-hour campus walk.', 4, '17:30', '19:00', 'Main Gate', 90, 25, 18)
]
