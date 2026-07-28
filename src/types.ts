export interface PerkDetail {
  emoji: string;
  text: string;
}

export interface LadderRung {
  id: number;
  threshold: number;
  title: string;
  reqText: string;
  description: string;
  icon: string;
  badgeType: string;
  perks: string[];
  perksDetailed: PerkDetail[];
  color: string;        // accent color
  timeToEarn: string;  // e.g. "~1 week of hustle"
}

export interface CampusLeaderboardItem {
  id: string;
  name: string;
  ambassadorsCount: number;
  topRegistrations: number;
  remainingSpots: number;
  city: string;
}
