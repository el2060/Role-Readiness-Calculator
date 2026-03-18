import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, RefreshCw } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const categories = [
  {
    id: 'curriculum',
    title: 'Curriculum Design',
    shortTitle: 'Curriculum',
    questions: [
      "Design and outcome-based curriculum aligned with learning outcomes.",
      "Design an outcome-based curriculum integrated with industry-relevant contexts."
    ]
  },
  {
    id: 'pedagogy',
    title: 'Pedagogy & Strategies',
    shortTitle: 'Pedagogy',
    questions: [
      "Apply appropriate pedagogy/andragogy approaches in curriculum design.",
      "Employ a range of T&L strategies to support effective learning."
    ]
  },
  {
    id: 'assessment',
    title: 'Assessment',
    shortTitle: 'Assessment',
    questions: [
      "Design and develop valid, reliable assessments to enhance learning.",
      "Implement valid, reliable assessments using diverse methods and tools."
    ]
  },
  {
    id: 'innovation',
    title: 'Innovation & EdTech',
    shortTitle: 'Innovation',
    questions: [
      "Apply evidence-informed reflective practices to support innovative and responsive T&L.",
      "Leverage EdTech tools to enhance learner engagement."
    ]
  },
  {
    id: 'industry',
    title: 'Industry Integration',
    shortTitle: 'Industry',
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
      shortTitle: cat.shortTitle,
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
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column - Sticky Dashboard */}
          <div className="lg:col-span-4 xl:col-span-4 relative">
            <div className="lg:sticky lg:top-8 space-y-6">
              
              {/* Header */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                  ES Role Readiness
                </h1>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Indicate your level of readiness for the statements to build a profile of your competencies.
                </p>
              </div>

              {/* Radar Chart Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <h2 className="text-sm font-semibold text-slate-900 mb-2">Readiness Profile</h2>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={categoryScores}>
                      <PolarGrid stroke="#f1f5f9" />
                      <PolarAngleAxis dataKey="shortTitle" tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                      <Radar name="Readiness" dataKey="score" stroke="#6366f1" strokeWidth={2} fill="#818cf8" fillOpacity={0.3} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Progress Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Assessment Progress</p>
                    <p className="text-xs text-slate-500 mt-1">{answeredCount} of 10 answered</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-indigo-600">{totalScore}</span>
                    <span className="text-xs text-slate-400 block -mt-1">Total Score</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(answeredCount / 10) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                
                <AnimatePresence>
                  {isComplete && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                      className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 overflow-hidden"
                    >
                      <p className="text-sm text-indigo-900 font-medium">
                        {totalScore >= 30 
                          ? 'You show sufficient overall readiness to explore the ES role.' 
                          : 'You are developing overall readiness for the ES role.'}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setShowResetConfirm(true)} 
                    className="text-sm text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset Assessment
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Questions */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-10">
            
            {/* Info Box */}
            <div className="bg-indigo-50/50 rounded-3xl p-6 sm:p-8 border border-indigo-100/50 flex gap-4 items-start">
              <Info className="w-6 h-6 text-indigo-500 shrink-0 mt-0.5" />
              <div className="text-sm text-indigo-900/80 leading-relaxed">
                <p className="font-semibold text-indigo-900 mb-1">About this assessment</p>
                <p>
                  This tool helps you reflect on specific competencies. A total indicator of 30+ reflects readiness to explore the ES role. Discuss these results with your reporting officer to align your professional development goals.
                </p>
              </div>
            </div>

            {categories.map((category, catIndex) => (
              <section key={category.id} className="space-y-6">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>
                
                <div className="space-y-6">
                  {category.questions.map((question, qIndex) => {
                    const globalIndex = catIndex * 2 + qIndex;
                    return (
                      <motion.div 
                        key={globalIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: globalIndex * 0.05 }}
                        className={`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border transition-colors duration-300 ${
                          scores[globalIndex] > 0 ? 'border-indigo-100' : 'border-slate-100 hover:border-slate-200'
                        }`}
                      >
                        <div className="flex gap-4 mb-6">
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold shrink-0 text-sm">
                            {globalIndex + 1}
                          </div>
                          <p className="text-base sm:text-lg font-medium text-slate-800 pt-1 leading-relaxed">
                            {question}
                          </p>
                        </div>

                        <div className="flex gap-2 sm:gap-3">
                          {scale.map(s => (
                            <button
                              key={s.value}
                              onClick={() => handleScoreChange(globalIndex, s.value)}
                              className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-4 px-1 sm:px-2 rounded-2xl transition-all duration-300 ${
                                scores[globalIndex] === s.value
                                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/50'
                                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                              }`}
                            >
                              <span className="text-lg sm:text-xl font-semibold mb-1">{s.value}</span>
                              <span className={`text-[10px] sm:text-xs text-center leading-tight px-1 ${scores[globalIndex] === s.value ? 'text-indigo-100' : 'text-slate-400'}`}>
                                {s.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <AnimatePresence>
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-slate-100"
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
