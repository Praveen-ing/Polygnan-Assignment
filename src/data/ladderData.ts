import { LadderRung, CampusLeaderboardItem } from '../types';

export const LADDER_RUNGS: LadderRung[] = [
  {
    id: 0,
    threshold: 0,
    milestoneText: 'Scout',
    title: 'Scout',
    unlocks: [
      'Private community',
      'Starter kit',
      'Part of the movement from day one'
    ],
    color: '#FAD02C',
  },
  {
    id: 1,
    threshold: 25,
    milestoneText: 'Campus Ambassador · 25 regs',
    title: 'Campus Ambassador',
    unlocks: [
      'Official title and badge',
      'First swag drop',
      'Cash-prize challenge'
    ],
    color: '#FAD02C',
  },
  {
    id: 2,
    threshold: 50,
    milestoneText: 'Level up · 50 regs',
    title: 'Level up',
    unlocks: [
      'Event grants for your campus',
      'Exclusive merch'
    ],
    color: '#FAD02C',
  },
  {
    id: 3,
    threshold: 75,
    milestoneText: 'Go further · 75 regs',
    title: 'Go further',
    unlocks: [
      'Mentorship access',
      'Campus event grants'
    ],
    color: '#FAD02C',
  },
  {
    id: 4,
    threshold: 100,
    milestoneText: 'Paid internship Opportunity · 100 regs',
    title: 'Paid internship Opportunity',
    unlocks: [
      'Internship opportunities',
      'Invite to ambassador events'
    ],
    color: '#FAD02C',
  },
  {
    id: 5,
    threshold: 200,
    milestoneText: 'Founding Team · 200 regs',
    title: 'Founding Team',
    unlocks: [
      'Consideration for the Founding Team, next wave'
    ],
    color: '#FAD02C',
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
