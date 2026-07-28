import { LadderRung, CampusLeaderboardItem } from '../types';

export const LADDER_RUNGS: LadderRung[] = [
  {
    id: 0,
    threshold: 0,
    milestoneText: 'Selected as Scout',
    title: 'Scout',
    unlocks: [
      'Private community access',
      'Starter kit'
    ],
    color: '#C4F62E',
  },
  {
    id: 1,
    threshold: 25,
    milestoneText: '25 registrations',
    title: 'Campus Ambassador',
    unlocks: [
      'Official Campus Ambassador title',
      'First swag drop',
      'Prize-linked challenge'
    ],
    color: '#C4F62E',
  },
  {
    id: 2,
    threshold: 50,
    milestoneText: '50+ registrations',
    title: 'Level Up',
    unlocks: [
      'Event grants for your campus',
      'Exclusive merch'
    ],
    color: '#C4F62E',
  },
  {
    id: 3,
    threshold: 75,
    milestoneText: '75+ registrations',
    title: 'Go Further',
    unlocks: [
      'Mentorship access',
      'Campus event grants'
    ],
    color: '#C4F62E',
  },
  {
    id: 4,
    threshold: 100,
    milestoneText: '100+ registrations',
    title: 'Paid Internship',
    unlocks: [
      'Paid internship opportunities',
      'Invite to ambassador events'
    ],
    color: '#C4F62E',
  },
  {
    id: 5,
    threshold: 200,
    milestoneText: '200+ registrations',
    title: 'Founding Team',
    unlocks: [
      'Founding Team consideration'
    ],
    color: '#E8B923',
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
