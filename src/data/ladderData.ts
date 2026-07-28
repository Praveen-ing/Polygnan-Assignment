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
    color: '#FF6B2C',   // EYFI orange
    xpValue: 1000,
    timeToEarn: 'Instant on selection',
    perks: ['Discord VIP Role', 'Ambassador Handbook', 'Welcome Asset Pack'],
    perksDetailed: [
      { emoji: '💬', text: 'Exclusive Scout Discord server — direct line to the founding team' },
      { emoji: '📘', text: 'Ambassador Playbook — strategies, templates, scripts to hit 25 regs fast' },
      { emoji: '🎁', text: 'Welcome Asset Pack — social media assets, EYFI branding kit' },
    ],
    estimatedValue: '₹1,000',
  },
  {
    id: 1,
    threshold: 25,
    title: 'Campus Ambassador',
    reqText: '25 regs',
    description: 'Official title, first swag drop, prize-linked challenge',
    icon: '🎖️',
    badgeType: 'ambassador',
    color: '#FF6B2C',   // EYFI orange
    xpValue: 5000,
    timeToEarn: '~1–2 weeks of active posting',
    perks: ['Official Certificate', 'EYFI Oversized Hoodie', 'Weekly Prize Draw'],
    perksDetailed: [
      { emoji: '📜', text: 'Official Campus Ambassador Certificate — verifiable, LinkedIn-ready' },
      { emoji: '👕', text: 'EYFI Limited-Edition Oversized Hoodie (your size, delivered to campus)' },
      { emoji: '🏆', text: 'Entry into Weekly Prize Draw — cash prizes up to ₹5,000' },
    ],
    estimatedValue: '₹5,000',
  },
  {
    id: 2,
    threshold: 50,
    title: 'Level Up',
    reqText: '50 regs',
    description: 'Campus event grant + exclusive merch',
    icon: '🔥',
    badgeType: 'levelup',
    color: '#FF6B2C',   // EYFI orange
    xpValue: 12000,
    timeToEarn: '~3 weeks of consistent outreach',
    perks: ['₹10,000 Campus Grant', 'Customized Name Tag', 'Direct Team Access'],
    perksDetailed: [
      { emoji: '💸', text: '₹10,000 Campus Event Grant — host your own EYFI event, we fund it' },
      { emoji: '🏷️', text: 'Custom EYFI Ambassador Lanyard + Name Tag for events' },
      { emoji: '🤝', text: 'Direct access to EYFI team Slack — pitch ideas, get instant support' },
    ],
    estimatedValue: '₹12,000',
  },
  {
    id: 3,
    threshold: 75,
    title: 'Go Further',
    reqText: '75 regs',
    description: 'Mentorship access + bigger campus grant',
    icon: '💡',
    badgeType: 'gofurther',
    color: '#FF6B2C',   // EYFI orange
    xpValue: 25000,
    timeToEarn: '~4 weeks of hustle',
    perks: ['1-on-1 Founder Mentorship', 'Priority Feature Access', '₹25,000 Budget'],
    perksDetailed: [
      { emoji: '🧠', text: '1-on-1 Monthly Mentorship call with EYFI founders — your questions answered' },
      { emoji: '⚡', text: 'Priority feature request — your campus ideas go to the top of the roadmap' },
      { emoji: '🎪', text: '₹25,000 Campus Event Budget for a flagship EYFI session at your college' },
    ],
    estimatedValue: '₹25,000',
  },
  {
    id: 4,
    threshold: 100,
    title: 'Paid Internship',
    reqText: '100 regs',
    description: 'Stipend + Goa retreat + Letter of Recommendation',
    icon: '💼',
    badgeType: 'internship',
    color: '#FF6B2C',   // EYFI orange
    xpValue: 45000,
    timeToEarn: '~6 weeks — elite territory',
    perks: ['Stipend: ₹15,000/mo', 'Quarterly Goa Retreat', 'Letter of Recommendation'],
    perksDetailed: [
      { emoji: '💰', text: '₹15,000/month Paid Internship stipend — work with the core EYFI team' },
      { emoji: '🏖️', text: 'Invite to Quarterly Ambassador Retreat (Goa, fully sponsored)' },
      { emoji: '✍️', text: 'Glowing Letter of Recommendation from Polygnan co-founders' },
    ],
    estimatedValue: '₹45,000',
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
    xpValue: 1500000,
    timeToEarn: 'The rarest tier — top 1%',
    perks: ['Equity Allocation Pool', 'Co-Founder Dinner', 'Lead Campus Director'],
    perksDetailed: [
      { emoji: '📊', text: 'Founding Team Equity Pool consideration — real ownership in EYFI' },
      { emoji: '🍽️', text: 'Exclusive Co-Founder Dinner in Bangalore — your story becomes EYFI lore' },
      { emoji: '🗺️', text: 'Lead Campus Director role — shape the ambassador program across India' },
    ],
    estimatedValue: '₹15,00,000+',
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
