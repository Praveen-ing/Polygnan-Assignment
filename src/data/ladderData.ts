import { LadderRung, CampusLeaderboardItem } from '../types';

export const LADDER_RUNGS: LadderRung[] = [
  {
    id: 0,
    threshold: 0,
    title: 'Scout',
    reqText: 'Selected',
    description: 'Private community access + starter kit',
    icon: '🚩',
    badgeType: 'scout',
    color: '#C4F62E',   // EYFI lime green
    timeToEarn: 'Instant on selection',
    perks: ['Discord VIP Role', 'Ambassador Handbook', 'Welcome Asset Pack'],
    perksDetailed: [
      { emoji: '💬', text: 'Exclusive Scout Discord channel — direct line to the founding team' },
      { emoji: '📘', text: 'Ambassador Playbook — growth strategies & outreach scripts' },
      { emoji: '🎁', text: 'Welcome Asset Pack — high-res social media assets & EYFI brand kit' },
    ],
  },
  {
    id: 1,
    threshold: 25,
    title: 'Campus Ambassador',
    reqText: '25 regs',
    description: 'Official title, swag drop, prize-linked challenge',
    icon: '🎖️',
    badgeType: 'ambassador',
    color: '#C4F62E',
    timeToEarn: '~1–2 weeks of active outreach',
    perks: ['Official Certificate', 'EYFI Oversized Hoodie', 'Weekly Prize Draw'],
    perksDetailed: [
      { emoji: '📜', text: 'Official Campus Ambassador Certificate — verifiable & LinkedIn ready' },
      { emoji: '👕', text: 'EYFI Limited-Edition Oversized Hoodie (delivered to campus)' },
      { emoji: '🏆', text: 'Entry into Weekly Ambassador Challenges & Prize Pool' },
    ],
  },
  {
    id: 2,
    threshold: 50,
    title: 'Level Up',
    reqText: '50 regs',
    description: 'Campus event grant + exclusive merch',
    icon: '🔥',
    badgeType: 'levelup',
    color: '#C4F62E',
    timeToEarn: '~3 weeks of consistent outreach',
    perks: ['Campus Event Grant', 'Customized Name Tag', 'Direct Team Access'],
    perksDetailed: [
      { emoji: '💸', text: 'Campus Event Grant — host your official EYFI campus meetup fully funded' },
      { emoji: '🏷️', text: 'Custom EYFI Ambassador Lanyard + Official ID Badge' },
      { emoji: '🤝', text: 'Direct access to EYFI core team Slack — pitch ideas & get instant support' },
    ],
  },
  {
    id: 3,
    threshold: 75,
    title: 'Go Further',
    reqText: '75 regs',
    description: 'Mentorship access + flagship campus budget',
    icon: '💡',
    badgeType: 'gofurther',
    color: '#C4F62E',
    timeToEarn: '~4 weeks of hustle',
    perks: ['1-on-1 Founder Mentorship', 'Priority Roadmap Input', 'Flagship Event Budget'],
    perksDetailed: [
      { emoji: '🧠', text: '1-on-1 Monthly Mentorship session with EYFI co-founders' },
      { emoji: '⚡', text: 'Priority product feature requests — shape the EYFI platform roadmap' },
      { emoji: '🎪', text: 'Flagship Campus Event Budget for mega EYFI workshops at your college' },
    ],
  },
  {
    id: 4,
    threshold: 100,
    title: 'Paid Internship',
    reqText: '100 regs',
    description: 'Monthly stipend + Goa retreat + Letter of Recommendation',
    icon: '💼',
    badgeType: 'internship',
    color: '#C4F62E',
    timeToEarn: '~6 weeks — elite tier',
    perks: ['Monthly Internship Stipend', 'Quarterly Goa Retreat', 'Letter of Recommendation'],
    perksDetailed: [
      { emoji: '💰', text: 'Monthly Paid Internship position — work directly with core EYFI leaders' },
      { emoji: '🏖️', text: 'Fully sponsored invite to the Quarterly Ambassador Retreat in Goa' },
      { emoji: '✍️', text: 'Glowing Letter of Recommendation signed by Polygnan founders' },
    ],
  },
  {
    id: 5,
    threshold: 200,
    title: 'Founding Team',
    reqText: '200 regs',
    description: 'Founding team consideration + equity pool',
    icon: '👑',
    badgeType: 'founding',
    color: '#E8B923',   // EYFI gold
    timeToEarn: 'Top 1% — Pinnacle level',
    perks: ['Equity Pool Consideration', 'Co-Founder Dinner', 'Lead Campus Director'],
    perksDetailed: [
      { emoji: '📊', text: 'Founding Team Equity Pool consideration — real ownership in EYFI' },
      { emoji: '🍽️', text: 'Exclusive Co-Founder Dinner in Bangalore with core leadership' },
      { emoji: '🗺️', text: 'Lead Campus Director role — lead ambassador expansion across India' },
    ],
  },
];

export const CAMPUSES: CampusLeaderboardItem[] = [
  { id: 'iit-delhi', name: 'IIT Delhi', ambassadorsCount: 18, topRegistrations: 184, remainingSpots: 2, city: 'New Delhi' },
  { id: 'bits-pilani', name: 'BITS Pilani', ambassadorsCount: 22, topRegistrations: 210, remainingSpots: 1, city: 'Pilani' },
  { id: 'iit-bombay', name: 'IIT Bombay', ambassadorsCount: 15, topRegistrations: 165, remainingSpots: 4, city: 'Mumbai' },
  { id: 'du-north', name: 'Delhi University', ambassadorsCount: 31, topRegistrations: 192, remainingSpots: 3, city: 'Delhi' },
  { id: 'srm', name: 'SRM Institute', ambassadorsCount: 28, topRegistrations: 145, remainingSpots: 5, city: 'Chennai' },
  { id: 'vit-vellore', name: 'VIT Vellore', ambassadorsCount: 24, topRegistrations: 132, remainingSpots: 3, city: 'Vellore' },
  { id: 'manipal', name: 'Manipal University', ambassadorsCount: 19, topRegistrations: 117, remainingSpots: 4, city: 'Manipal' },
  { id: 'pes-bangalore', name: 'PES University', ambassadorsCount: 12, topRegistrations: 98, remainingSpots: 5, city: 'Bangalore' },
];

export const SOCIAL_PROOF_CAMPUSES = [
  'IIT Delhi', 'BITS Pilani', 'IIT Bombay', 'VIT Vellore', 'SRM Chennai',
  'Manipal University', 'NIT Trichy', 'IIIT Hyderabad', 'Christ University',
  'PES Bangalore', 'Amity Noida', 'LPU Punjab', 'Lovely Professional',
  'Delhi University', 'NIT Warangal', 'GITAM University', 'Presidency College',
];
