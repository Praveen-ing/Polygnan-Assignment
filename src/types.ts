import { MilestoneBadgeType } from './components/BadgeIcon';

export interface LadderRung {
  id: number;
  threshold: number;
  title: string;
  reqText: string;
  description: string;
  icon: string;
  badgeType: MilestoneBadgeType;
  perks: string[];
  estimatedValue: string; // e.g., "₹2,500 value"
}

export interface CampusLeaderboardItem {
  id: string;
  name: string;
  ambassadorsCount: number;
  topRegistrations: number;
  remainingSpots: number;
  city: string;
}
