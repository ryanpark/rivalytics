export interface TennisComparisonType {
  head_to_head_record: {
    player1_wins: number;
    player2_wins: number;
    total_matches: number;
  };
  players: {
    player1: { name: string };
    player2: { name: string };
  };
  key_statistics: {
    player1: {
      age: number;
      aces_per_match: number;
      first_serve_pct: number;
      break_points_saved_pct: number;
    };
    player2: {
      age: number;
      aces_per_match: number;
      first_serve_pct: number;
      break_points_saved_pct: number;
    };
  };
  ai_insights: string[];
  recent_form: {
    player1: {
      last_10_matches: { wins: number; losses: number };
      current_win_streak: number;
      notable_recent_win: string;
      notable_recent_loss: string;
    };
    player2: {
      last_10_matches: { wins: number; losses: number };
      current_win_streak: number;
      notable_recent_win: string;
      notable_recent_loss: string;
    };
  };
  last_meeting: {
    tournament: string;
    round: string;
    winner: string;
    score: string;
    date: string;
    surface: string;
  };
  recent_matches_between: {
    tournament: string;
    round: string;
    winner: string;
    score: string;
    date: string;
  }[];
  yearly_performance_timeline: {
    year: {
      player1: {
        win_loss: string;
        titles: number;
        best_grand_slam: string;
        year_end_ranking: string;
      };
      player2: {
        win_loss: string;
        titles: number;
        best_grand_slam: string;
        year_end_ranking: string;
      };
    };
  };
}
