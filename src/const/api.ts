const API_ENDPOINTS = {
  tennis: {
    players: `https://api.sportsdata.io/v3/tennis/scores/json/Players?key=${
      import.meta.env.VITE_TENNIS_API_KEY
    }`,
  },
  football: {
    teams: "https://api.sportsdata.io/v3/nfl/scores/json/Teams",
    players: "https://api.sportsdata.io/v3/nfl/scores/json/Players",
  },
  basketball: {
    teams: "https://api.sportsdata.io/v3/nba/scores/json/teams",
    players: "https://api.sportsdata.io/v3/nba/scores/json/Players",
  },
  soccer: {
    teams: "https://api.football-data.org/v4/teams",
    players: "https://api.football-data.org/v4/persons",
  },
  cricket: {
    teams: "https://cricapi.com/api/teams",
    players: "https://cricapi.com/api/players",
    // Alternative: 'https://api.cricapi.com/v1/players' (newer version)
  },
};

export default API_ENDPOINTS;
