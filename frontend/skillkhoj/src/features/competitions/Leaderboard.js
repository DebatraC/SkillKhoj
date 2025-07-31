import React, { useState, useEffect } from 'react';
import { Card, Loading } from '../../components';

const Leaderboard = ({ competitionId }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockLeaderboard = [
          { rank: 1, name: 'Alice Johnson', score: 98, submissions: 5 },
          { rank: 2, name: 'Bob Smith', score: 95, submissions: 4 },
          { rank: 3, name: 'Carol Davis', score: 92, submissions: 6 },
          { rank: 4, name: 'David Wilson', score: 89, submissions: 3 },
          { rank: 5, name: 'Eva Brown', score: 87, submissions: 4 }
        ];
        
        setLeaderboard(mockLeaderboard);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [competitionId]);

  if (isLoading) {
    return <Loading text="Loading leaderboard..." />;
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <div className="header-item">Rank</div>
        <div className="header-item">Participant</div>
        <div className="header-item">Score</div>
        <div className="header-item">Submissions</div>
      </div>
      
      {leaderboard.map((entry) => (
        <div key={entry.rank} className={`leaderboard-row ${entry.rank <= 3 ? 'top-three' : ''}`}>
          <div className="rank">
            {entry.rank === 1 && '🥇'}
            {entry.rank === 2 && '🥈'}
            {entry.rank === 3 && '🥉'}
            {entry.rank > 3 && entry.rank}
          </div>
          <div className="name">{entry.name}</div>
          <div className="score">{entry.score}</div>
          <div className="submissions">{entry.submissions}</div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;