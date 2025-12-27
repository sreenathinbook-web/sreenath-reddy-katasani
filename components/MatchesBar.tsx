
import React from 'react';
import { Match } from '../types';

interface MatchesBarProps {
  matches: Match[];
  loading: boolean;
}

const MatchesBar: React.FC<MatchesBarProps> = ({ matches, loading }) => {
  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {[1, 2, 3].map(i => (
          <div key={i} className="min-w-[280px] h-32 bg-white rounded-2xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar cursor-grab active:cursor-grabbing">
      {matches.map((match) => (
        <div 
          key={match.id}
          className="min-w-[280px] bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{match.competition}</span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
              match.status === 'live' ? 'bg-red-100 text-red-600 animate-pulse' : 
              match.status === 'finished' ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-600'
            }`}>
              {match.status}
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xs mb-1">LFC</div>
              <span className="text-xs font-semibold">Liverpool</span>
            </div>
            
            <div className="flex flex-col items-center px-4">
              {match.status === 'upcoming' ? (
                <span className="text-sm font-bold text-gray-400">VS</span>
              ) : (
                <span className="text-2xl font-black text-gray-900">
                  {match.score?.lfc} - {match.score?.opp}
                </span>
              )}
            </div>
            
            <div className="flex flex-col items-center flex-1">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs mb-1">
                {match.opponent.substring(0, 3).toUpperCase()}
              </div>
              <span className="text-xs font-semibold truncate max-w-[80px]">{match.opponent}</span>
            </div>
          </div>
          
          <div className="text-[10px] text-center text-gray-500 font-medium">
            {match.date} • {match.venue}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchesBar;
