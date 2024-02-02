import axios from "axios";

export const GET = async (request: Request) => {
  try {
    const response = await axios.get(
      "https://stats.nba.com/stats/playerindex",
      {
        params: {
          College: "",
          Country: "",
          DraftPick: "",
          DraftRound: "",
          DraftYear: "",
          Height: "",
          Historical: "1",
          LeagueID: "00",
          Season: "2023-24",
          SeasonType: "Regular Season",
          TeamID: "0",
          Weight: "",
        },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0",
          Accept: "*/*",
          Referer: "https://www.nba.com/",
          Origin: "https://www.nba.com",
        },
      }
    );

    const headers = response.data.resultSets[0].headers;
    const rowSet = response.data.resultSets[0].rowSet;

    const playerIndex = rowSet.map((row: any) => {
      return {
        id: row[headers.indexOf("PERSON_ID")],
        lastName: row[headers.indexOf("PLAYER_LAST_NAME")],
        firstName: row[headers.indexOf("PLAYER_FIRST_NAME")],
        playerSlug: row[headers.indexOf("PLAYER_SLUG")],
        team: {
          id: row[headers.indexOf("TEAM_ID")],
          slug: row[headers.indexOf("TEAM_SLUG")],
          city: row[headers.indexOf("TEAM_CITY")],
          name: row[headers.indexOf("TEAM_NAME")],
          abbreviation: row[headers.indexOf("TEAM_ABBREVIATION")],
        },
        jerseyNumber: row[headers.indexOf("JERSEY_NUMBER")],
        position: row[headers.indexOf("POSITION")],
        height: row[headers.indexOf("HEIGHT")],
        weight: row[headers.indexOf("WEIGHT")],
        college: row[headers.indexOf("COLLEGE")],
        country: row[headers.indexOf("COUNTRY")],
        draft: {
          year: row[headers.indexOf("DRAFT_YEAR")],
          round: row[headers.indexOf("DRAFT_ROUND")],
          pick: row[headers.indexOf("DRAFT_NUMBER")],
        },
        active: row[headers.indexOf("ROSTER_STATUS")] === null ? false : true,
        headlineStats: {
          points: row[headers.indexOf("PTS")],
          rebounds: row[headers.indexOf("REB")],
          assists: row[headers.indexOf("AST")],
          timeFrame: row[headers.indexOf("STATS_TIMEFRAME")],
        },
        career: {
          fromYear: row[headers.indexOf("FROM_YEAR")],
          toYear: row[headers.indexOf("TO_YEAR")],
        },
      };
    });

    return Response.json({ playerIndex });
  } catch (error) {
    console.error("Error getting playerIndex");
    return Response.json({ error });
  }
};
