export interface LadderRung {
  id: number;
  threshold: number;
  milestoneText: string;  // e.g. "Selected as Scout", "25 registrations", etc.
  title: string;
  unlocks: string[];       // clean text items matching the prompt table
  color: string;           // accent color
}

export interface CampusLeaderboardItem {
  id: string;
  name: string;
  ambassadorsCount: number;
  topRegistrations: number;
  remainingSpots: number;
  city: string;
}
