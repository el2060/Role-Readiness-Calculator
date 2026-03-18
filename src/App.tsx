import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, RefreshCw, BarChart3 } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const categories = [
  {
    id: 'curriculum',
    title: 'Curriculum Design',
    questions: [
      "Design and outcome-based curriculum aligned with learning outcomes.",
      "Design an outcome-based curriculum integrated with industry-relevant contexts."
    ]
  },
  {
    id: 'pedagogy',
    title: 'Pedagogy & Strategies',
    questions: [
      "Apply appropriate pedagogy/andragogy approaches in curriculum design.",
      "Employ a range of T&L strategies to support effective learning."
    ]
  },
  {
    id: 'assessment',
    title: 'Assessment',
    questions: [
      "Design and develop valid, reliable assessments to enhance learning.",
      "Implement valid, reliable assessments using diverse methods and tools."
    ]
  },
  {
    id: 'innovation',
    title: 'Innovation & EdTech',
    questions: [
      "Apply evidence-informed reflective practices to support innovative and responsive T&L.",
      "Leverage EdTech tools to enhance learner engagement."
    ]
  },
  {
    id: 'industry',
    title: 'Industry Integration',
    questions: [
      "Stay informed about latest industry trends and innovations.",
      "Translate industry-relevant developments into effective T&L strategies to enhance learning outcomes."
    ]
  }
];

const scale = [
  { value: 1, label: "Not Ready Yet" },
  { value: 2, label: "Emerging Readiness" },
  { value: 3, label: "Moderately Ready" },
  { value: 4, label: "Ready" },
  { value: 5, label: "Highly Ready" }
];

export default function App() {
  const [scores, setScores] = useState<number[]>(Array(10).fill(0));
  const [isComplete, setIsComplete] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    setIsComplete(scores.every(score => score > 0));
  }, [scores]);

  const handleScoreChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const answeredCount = scores.filter(s => s > 0).length;

  const categoryScores = categories.map((cat, catIndex) => {
    const q1 = scores[catIndex * 2];
    const q2 = scores[catIndex * 2 + 1];
    return {
      title: cat.title,
      score: q1 + q2,
      max: 10,
      isComplete: q1 > 0 && q2 > 0
    };
  });

  const confirmReset = () => {
    setScores(Array(10).fill(0));
    setShowResetConfirm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-32 selection:bg-teal-100 selection:text-teal-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            ES Role Readiness Assessment
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl leading-relaxed">
            Please indicate your level of readiness to the statements listed below. 
            This helps build a profile of your competencies across different areas.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Info Box */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-8 flex gap-4 items-start shadow-sm"
        >
          <Info className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 leading-relaxed">
            <p className="font-medium mb-1">About this assessment</p>
            <p>
              This tool helps you reflect on specific competencies. A total indicator of 30+ reflects readiness to explore the ES role. Discuss these results with your reporting officer to align your professional development goals.
            </p>
          </div>
        </motion.div>

        {/* Readiness Profile Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-teal-50 rounded-lg">
              <BarChart3 className="w-5 h-5 text-teal-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Readiness Profile</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 h-64 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={categoryScores}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="title" tick={{ fill: '#475569', fontSize: 11, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                  <Radar name="Readiness" dataKey="score" stroke="#0d9488" strokeWidth={2} fill="#14b8a6" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col gap-5">
              {categoryScores.map((cat, i) => (
                <div key={i} className="relative">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">{cat.title}</span>
                    <span className="text-slate-500 font-medium">{cat.score > 0 ? `${cat.score}/10` : '-'}</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${cat.score >= 8 ? 'bg-teal-500' : cat.score >= 6 ? 'bg-emerald-400' : cat.score >= 4 ? 'bg-amber-400' : 'bg-slate-300'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(cat.score / 10) * 100}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Questions List */}
        <div className="space-y-10">
          {categories.map((category, catIndex) => (
            <div key={category.id} className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.questions.map((question, qIndex) => {
                  const globalIndex = catIndex * 2 + qIndex;
                  return (
                    <motion.div 
                      key={globalIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: globalIndex * 0.05 }}
                      className={`bg-white rounded-2xl p-6 shadow-sm border transition-colors duration-300 ${
                        scores[globalIndex] > 0 ? 'border-teal-100 ring-1 ring-teal-50' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex gap-4 mb-6">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold shrink-0">
                          {globalIndex + 1}
                        </div>
                        <p className="text-base sm:text-lg font-medium text-slate-800 pt-1">
                          {question}
                        </p>
                      </div>

                      {/* Desktop Scale */}
                      <div className="hidden sm:flex items-stretch justify-between gap-2">
                        {scale.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => handleScoreChange(globalIndex, s.value)}
                            className={`flex-1 flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                              scores[globalIndex] === s.value 
                                ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm' 
                                : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 font-semibold transition-colors ${
                              scores[globalIndex] === s.value ? 'bg-teal-500 text-white' : 'bg-white border border-slate-200 group-hover:border-slate-300'
                            }`}>
                              {s.value}
                            </div>
                            <span className="text-xs text-center font-medium leading-tight px-1">
                              {s.label}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Mobile Scale */}
                      <div className="sm:hidden flex flex-col gap-2">
                        {scale.map((s) => (
                          <button
                            key={s.value}
                            onClick={() => handleScoreChange(globalIndex, s.value)}
                            className={`w-full flex items-center p-3 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
                              scores[globalIndex] === s.value 
                                ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-sm' 
                                : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold shrink-0 mr-3 transition-colors ${
                              scores[globalIndex] === s.value ? 'bg-teal-500 text-white' : 'bg-white border border-slate-200'
                            }`}>
                              {s.value}
                            </div>
                            <span className="text-sm font-medium text-left flex-1">
                              {s.label}
                            </span>
                            {scores[globalIndex] === s.value && (
                              <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Result Footer */}
      <AnimatePresence>
        {answeredCount > 0 && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] z-30"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-start">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Profile Summary</p>
                  <div className="flex items-center gap-1.5">
                    {categoryScores.map((cat, i) => (
                      <div 
                        key={i} 
                        className={`h-2.5 w-8 sm:w-10 rounded-full transition-colors duration-500 ${
                          cat.score >= 8 ? 'bg-teal-500' : 
                          cat.score >= 6 ? 'bg-emerald-400' : 
                          cat.score >= 4 ? 'bg-amber-400' : 
                          cat.score > 0 ? 'bg-slate-300' : 
                          'bg-slate-100'
                        }`}
                        title={`${cat.title}: ${cat.score}/10`}
                      />
                    ))}
                  </div>
                </div>

                <div className="h-10 w-px bg-slate-200 hidden sm:block"></div>

                {isComplete ? (
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900 text-sm sm:text-base">
                      {categoryScores.filter(c => c.score >= 6).length} of 5 Areas Ready
                    </span>
                    <span className="text-xs sm:text-sm text-slate-500">
                      {totalScore >= 30 ? 'Sufficient overall readiness' : 'Developing overall readiness'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                    <div className="w-5 h-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin shrink-0"></div>
                    <span>{10 - answeredCount} remaining</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => setShowResetConfirm(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl border border-slate-100"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Reset Progress?</h3>
              <p className="text-slate-500 mb-6 text-sm">Are you sure you want to clear all your answers? This action cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReset}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors"
                >
                  Yes, Reset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
