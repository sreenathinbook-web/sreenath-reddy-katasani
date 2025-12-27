
import React, { useState, useEffect } from 'react';
import MatchesBar from './components/MatchesBar';
import NewsSection from './components/NewsSection';
import ChatAssistant from './components/ChatAssistant';
import { fetchLFCNews, fetchMatchDetails } from './services/geminiService';
import { NewsArticle, Match, Standing, Player } from './types';
import { INITIAL_STANDINGS, INITIAL_SQUAD, LFC_RED } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'news' | 'fixtures' | 'table' | 'squad'>('news');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loadingNews, setLoadingNews] = useState(true);
  const [loadingMatches, setLoadingMatches] = useState(true);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoadingNews(true);
      setLoadingMatches(true);
      
      const newsData = await fetchLFCNews();
      setNews(newsData.articles);
      setLoadingNews(false);

      const matchData = await fetchMatchDetails();
      setMatches(matchData);
      setLoadingMatches(false);
    };

    loadInitialData();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
      {/* Header */}
      <header className="bg-[#C8102E] text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
               <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" className="w-8 h-8" alt="LFC" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">The Kop Central</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] font-bold uppercase tracking-widest bg-black/20 px-3 py-1 rounded-full">Official Fan App</span>
          </div>
        </div>
        
        {/* Sub-Nav */}
        <div className="max-w-6xl mx-auto px-4 pb-1">
          <div className="flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {(['news', 'fixtures', 'table', 'squad'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 text-xs font-bold uppercase tracking-widest transition-all relative ${
                  activeTab === tab ? 'text-white' : 'text-white/60 hover:text-white/80'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        
        {/* Live Scores/Fixtures Scroller */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
             <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Match Centre</h3>
             <button className="text-[10px] font-bold text-red-600 uppercase">View All</button>
          </div>
          <MatchesBar matches={matches} loading={loadingMatches} />
        </section>

        {/* Tabbed Views */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8">
            {activeTab === 'news' && (
              <NewsSection articles={news} loading={loadingNews} />
            )}
            
            {activeTab === 'fixtures' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Fixtures & Results</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                   {matches.map((m, i) => (
                     <div key={m.id} className={`p-6 flex items-center justify-between ${i !== matches.length -1 ? 'border-b border-gray-50' : ''}`}>
                        <div className="flex-1">
                           <p className="text-[10px] font-bold text-red-600 uppercase mb-1">{m.competition}</p>
                           <p className="font-bold text-gray-900">{m.date}</p>
                           <p className="text-xs text-gray-500">{m.venue}</p>
                        </div>
                        <div className="flex-1 flex items-center justify-center gap-4">
                           <div className="text-center">
                             <span className="block text-sm font-bold">LIV</span>
                           </div>
                           <div className="bg-gray-100 px-3 py-1 rounded font-black">
                             {m.status === 'upcoming' ? 'VS' : `${m.score?.lfc} - ${m.score?.opp}`}
                           </div>
                           <div className="text-center">
                             <span className="block text-sm font-bold">{m.opponent.substring(0,3).toUpperCase()}</span>
                           </div>
                        </div>
                        <div className="flex-1 text-right">
                           <button className="text-xs font-bold text-gray-400 hover:text-red-600">Details</button>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            )}

            {activeTab === 'table' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Premier League Table</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500">
                         <th className="px-6 py-4">Pos</th>
                         <th className="px-4 py-4">Team</th>
                         <th className="px-4 py-4">P</th>
                         <th className="px-4 py-4">GD</th>
                         <th className="px-4 py-4">Pts</th>
                       </tr>
                     </thead>
                     <tbody className="text-sm font-medium">
                        {INITIAL_STANDINGS.map((s) => (
                          <tr key={s.team} className={`${s.team === 'Liverpool' ? 'bg-red-50' : ''} border-b border-gray-50 last:border-0`}>
                            <td className="px-6 py-4 font-bold">{s.position}</td>
                            <td className="px-4 py-4 flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${s.team === 'Liverpool' ? 'bg-red-600' : 'bg-gray-300'}`}>
                                {s.team.charAt(0)}
                              </div>
                              {s.team}
                            </td>
                            <td className="px-4 py-4">{s.played}</td>
                            <td className="px-4 py-4 text-gray-500">{s.gd}</td>
                            <td className="px-4 py-4 font-bold">{s.points}</td>
                          </tr>
                        ))}
                     </tbody>
                   </table>
                </div>
              </div>
            )}

            {activeTab === 'squad' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">The Reds Squad</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                   {INITIAL_SQUAD.map((p) => (
                     <div key={p.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center group cursor-pointer hover:border-red-200 transition-all">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                           <img src={`https://picsum.photos/seed/${p.name}/100/100`} alt={p.name} />
                        </div>
                        <p className="text-[10px] font-black text-red-600 uppercase">{p.position}</p>
                        <h4 className="font-bold text-gray-900 line-clamp-1">{p.name}</h4>
                        <p className="text-2xl font-black text-gray-100 group-hover:text-red-50 transition-colors absolute bottom-2 right-4 pointer-events-none">#{p.number}</p>
                     </div>
                   ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-[#1A1A1A] rounded-3xl p-6 text-white overflow-hidden relative">
               <div className="relative z-10">
                 <h4 className="text-xs font-black uppercase tracking-widest text-red-500 mb-2">Club Anthem</h4>
                 <h2 className="text-2xl font-black mb-4 italic">YOU'LL NEVER WALK ALONE</h2>
                 <p className="text-sm opacity-70 mb-6 leading-relaxed">
                   "Walk on, walk on, with hope in your heart, and you'll never walk alone..."
                 </p>
                 <button className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">
                   Play Anthem
                 </button>
               </div>
               <div className="absolute -right-10 -bottom-10 opacity-10">
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png" className="w-48 h-48" alt="LFC BG" />
               </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
               <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Stat Leaders</h4>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <img src="https://picsum.photos/seed/salah/40" className="w-10 h-10 rounded-full" alt="Salah" />
                        <div>
                           <p className="text-sm font-bold">Mohamed Salah</p>
                           <p className="text-[10px] text-gray-500">Goals Leader</p>
                        </div>
                     </div>
                     <span className="text-lg font-black text-red-600">18</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <img src="https://picsum.photos/seed/trent/40" className="w-10 h-10 rounded-full" alt="Trent" />
                        <div>
                           <p className="text-sm font-bold">Alexander-Arnold</p>
                           <p className="text-[10px] text-gray-500">Assists Leader</p>
                        </div>
                     </div>
                     <span className="text-lg font-black text-red-600">12</span>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </main>

      <ChatAssistant />
      
      {/* Mobile Footer Tab Bar */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center sm:hidden z-40">
         <button onClick={() => setActiveTab('news')} className={`flex flex-col items-center gap-1 ${activeTab === 'news' ? 'text-red-600' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            <span className="text-[10px] font-bold">News</span>
         </button>
         <button onClick={() => setActiveTab('fixtures')} className={`flex flex-col items-center gap-1 ${activeTab === 'fixtures' ? 'text-red-600' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-[10px] font-bold">Matches</span>
         </button>
         <button onClick={() => setActiveTab('table')} className={`flex flex-col items-center gap-1 ${activeTab === 'table' ? 'text-red-600' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            <span className="text-[10px] font-bold">Table</span>
         </button>
         <button onClick={() => setActiveTab('squad')} className={`flex flex-col items-center gap-1 ${activeTab === 'squad' ? 'text-red-600' : 'text-gray-400'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span className="text-[10px] font-bold">Squad</span>
         </button>
      </footer>
    </div>
  );
};

export default App;
