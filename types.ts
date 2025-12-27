
export interface Match {
  id: string;
  opponent: string;
  date: string;
  competition: string;
  venue: string;
  isHome: boolean;
  score?: {
    lfc: number;
    opp: number;
  };
  status: 'upcoming' | 'live' | 'finished';
}

export interface NewsArticle {
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  source: string;
  imageUrl?: string;
}

export interface Player {
  id: number;
  name: string;
  number: number;
  position: 'Goalkeeper' | 'Defender' | 'Midfielder' | 'Forward';
  nationality: string;
  stats?: {
    appearances: number;
    goals: number;
    assists: number;
  };
}

export interface Standing {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}
