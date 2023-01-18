import React, { useState, useEffect } from "react";
import { BASE_URL } from '../utils/settings';



function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("/backendExam/api/match/all")
      .then(res => res.json())
      .then(data => setMatches(data))
      }, []);

  return (
    <div>
      {matches.map(match => (
        <div  key={match.id} >
          <p1>Teams: {match.opponentTeam} </p1><br></br>
          <p1>{match.inDoors}</p1><br></br> 
          <p1>{match.type}</p1><br></br>
          <p1>{match.location.address}</p1><br></br><br></br><br></br>         
        </div>
      ))}
    </div>
  );
}

export default Matches;