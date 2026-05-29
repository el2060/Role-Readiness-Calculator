import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, RefreshCw, CheckCircle2, AlertCircle, UserCircle, ClipboardCheck, Download } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const categories = [
  {
    id: 'curriculum',
    title: 'Curriculum',
    shortTitle: 'Curriculum',
    questions: [
      "Co-design an outcome-based curriculum aligned with learning outcomes.",
      "Co-design an outcome-based curriculum integrated with industry-relevant contexts.",
      "Co-design appropriate pedagogy/andragogy approaches in curriculum design."
    ]
  },
  {
    id: 'assessment',
    title: 'Assessment',
    shortTitle: 'Assessment',
    questions: [
      "Co-design and implement valid, reliable assessments to enhance learning."
    ]
  },
  {
    id: 'facilitation',
    title: 'Facilitation of Learning',
    shortTitle: 'Facilitation',
    questions: [
      "Co-create a range of innovative T&L strategies with team to support effective learning.",
      "Co-create a collaborative learning environment to effect innovative change."
    ]
  },
  {
    id: 'reflective',
    title: 'Reflective Practice, Data & Tech-enhanced T&L',
    shortTitle: 'Reflective & Tech',
    questions: [
      "Apply evidence-based reflective practices to support innovative and responsive T&L.",
      "Leverage EdTech tools to enhance learner engagement.",
      "Apply data and learning analytics for T&L interventions."
    ]
  },
  {
    id: 'dual',
    title: 'Dual Professionals',
    shortTitle: 'Dual Prof',
    questions: [
      "Stay informed about latest industry trends and innovations.",
      "Translate industry-relevant developments into effective T&L strategies to enhance learning outcomes.",
      "Involved in research and/or professional learning community to effect innovative change.",
      "Shares innovative practices with others in your school to enhance learning."
    ]
  }
];

const roCategories = [
  {
    id: 'innovation',
    title: 'A Track Record of Innovation',
    indicators: [
      "Leads/Contributes to innovative T&L projects.",
      "Pilots new pedagogical approaches to enhance student learning outcomes.",
      "Integrates EdTech tools into curriculum to adapt to diverse learners' needs and contexts.",
      "Explores innovative approaches/assessment design to transform teaching practices.",
      "Showcases innovative work in sharing sessions, COPs and/or conference"
    ]
  },
  {
    id: 'pedagogy',
    title: 'A Passion for Pedagogy',
    indicators: [
      "Demonstrates a deep interest in pedagogical development (e.g. active learning).",
      "Applies reflective practices constantly to improve T&L effectiveness (e.g. uses data to inform practices).",
      "Responds to feedback positively to improve T&L (student, peer, and/or lesson observation).",
      "Proactively participates in professional development to improve teaching and learning.",
      "Demonstrates effective pedagogical practices during lesson observations (e.g. meets or exceeds learning outcomes).",
      "Invites colleagues to participate in lesson observations or co-teaching to enhance teaching and learning excellence.",
      "Aligns curriculum and/or teaching practices with industry needs.",
      "Designs and integrates EdTech tools to adapt to facilitate active learning.",
      "Assesses the impact of technology-enhanced tools using data analytics.",
      "Receives recognition through teaching-related awards.",
      "Earns constantly high MES-SET scores and/or positive student feedback."
    ]
  },
  {
    id: 'mentor',
    title: 'The Heart of a Mentor',
    indicators: [
      "Collaborates effectively with colleagues on T&L initiatives.",
      "Supports peers by sharing effective teaching practices and resources",
      "Actively helps strengthen T&L capabilities within the team or school (e.g. curate and share good teaching strategies).",
      "Showcases of innovative work in sharing sessions, COPs, conferences."
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
  const [activeTab, setActiveTab] = useState<'self' | 'ro'>('self');

  // Self-assessment state
  const [scores, setScores] = useState<number[]>(Array(13).fill(0));
  const [isComplete, setIsComplete] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // RO Evaluation state
  const [roScores, setRoScores] = useState<boolean[]>(Array(20).fill(false));
  const [showRoResetConfirm, setShowRoResetConfirm] = useState(false);

  useEffect(() => {
    setIsComplete(scores.every(score => score > 0));
  }, [scores]);

  const handleScoreChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const handleRoScoreToggle = (index: number) => {
    const newScores = [...roScores];
    newScores[index] = !newScores[index];
    setRoScores(newScores);
  };

  const totalScore = scores.reduce((a, b) => a + b, 0);
  const answeredCount = scores.filter(s => s > 0).length;
  const roDemonstratedCount = roScores.filter(Boolean).length;

  const categoryScores = (() => {
    let currentIdx = 0;
    return categories.map((cat) => {
      const catQuestions = cat.questions;
      const catScores = scores.slice(currentIdx, currentIdx + catQuestions.length);
      const sum = catScores.reduce((a, b) => a + b, 0);
      const count = catScores.filter(s => s > 0).length;
      const isComplete = count === catQuestions.length;
      
      // Normalize score for radar chart (0-10 scale)
      // Average score (1-5) * 2 = 2-10 scale. 0 if not answered.
      const average = count > 0 ? sum / count : 0;
      const normalizedScore = average * 2;

      currentIdx += catQuestions.length;
      return {
        title: cat.title,
        shortTitle: cat.shortTitle,
        score: normalizedScore,
        max: 10,
        isComplete
      };
    });
  })();

  const confirmReset = () => {
    setScores(Array(13).fill(0));
    setShowResetConfirm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmRoReset = () => {
    setRoScores(Array(20).fill(false));
    setShowRoResetConfirm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-800 font-sans selection:bg-[#F5A800] selection:text-[#002147]">
      
      {/* Top Navigation / Tabs */}
      <div className="bg-white border-t-4 border-[#F5A800] border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between sm:justify-start sm:gap-8">
            <img 
              src="https://www.np.edu.sg/_next/image?url=https%3A%2F%2Fassets.app.optical.gov.sg%2Fnp%2Fproduction%2Fpublished%2Fcollections%2Fpages%2F17c64bb4-8632-49e9-af16-047f7cabe99a%2Fab16008f-a6a0-466e-9193-e16e947261b0.png&w=1080&q=75" 
              alt="NP Logo" 
              className="h-7 sm:h-10 w-auto"
              referrerPolicy="no-referrer"
            />
            <div className="flex space-x-1 sm:space-x-8">
              <button
                onClick={() => {
                  setActiveTab('self');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-4 px-2 border-b-2 font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-colors ${ activeTab === 'self' ? 'border-[#002147] text-[#002147]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300' }`}
              >
                <UserCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Self-Assessment</span>
                <span className="sm:hidden">Self</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('ro');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-4 px-2 border-b-2 font-medium text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-colors ${ activeTab === 'ro' ? 'border-[#002147] text-[#002147]' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300' }`}
              >
                <ClipboardCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">RO Evaluation</span>
                <span className="sm:hidden">RO</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 print-full-width">
        {/* Print-only Header */}
        <div className="hidden print-header">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-[#002147] mb-1">ES Role Readiness Report</h1>
              <p className="text-sm text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
            </div>
            <img src="https://www.np.edu.sg/_next/image?url=https%3A%2F%2Fassets.app.optical.gov.sg%2Fnp%2Fproduction%2Fpublished%2Fcollections%2Fpages%2F17c64bb4-8632-49e9-af16-047f7cabe99a%2Fab16008f-a6a0-466e-9193-e16e947261b0.png&w=1080&q=75" alt="NP Logo" className="h-8 w-auto" style={{ filter: 'brightness(0)' }} />
          </div>
        </div>
        <AnimatePresence mode="wait">
          {activeTab === 'self' ? (
            <motion.div 
              key="self"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              {/* Left Column - Sticky Dashboard */}
              <div className="lg:col-span-4 xl:col-span-4 relative">
                <div className="lg:sticky lg:top-24 space-y-6">
                  
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
                    <div className="h-56 sm:h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="60%" data={categoryScores}>
                          <PolarGrid stroke="#f1f5f9" />
                          <PolarAngleAxis dataKey="shortTitle" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 500 }} />
                          <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                          <Radar name="Readiness" dataKey="score" stroke="#002147" strokeWidth={2} fill="#003580" fillOpacity={0.3} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Progress Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Assessment Progress</p>
                        <p className="text-xs text-slate-500 mt-1">{answeredCount} of 13 answered</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-[#002147]">{totalScore}</span>
                        <span className="text-xs text-slate-400 block -mt-1">Total Score</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-[#002147] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(answeredCount / 13) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    
                    <AnimatePresence>
                      {answeredCount > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                          className="p-4 bg-[#F5F6F7] rounded-2xl border border-[#E8E9EA] overflow-hidden"
                        >
                          <p className="text-sm text-[#001530] font-medium">
                            {answeredCount < 13 
                              ? answeredCount < 5 
                                ? 'Great start! Keep going to build your readiness profile.'
                                : answeredCount < 9 
                                  ? "You're making good progress! Your profile is taking shape."
                                  : 'Almost there! Just a few more questions to unlock your diagnostic results.'
                              : totalScore < 26 
                                ? 'Diagnostic Complete: You are building foundational capabilities. Focus on exploring professional development opportunities to strengthen your readiness for the ES role.'
                                : totalScore < 39 
                                  ? 'Diagnostic Complete: You show emerging readiness. Continue to hone your skills and seek mentorship to further develop your competencies for the ES role.'
                                  : totalScore < 52 
                                    ? 'Diagnostic Complete: You demonstrate solid readiness. You are well-positioned to explore the ES role and contribute effectively.'
                                    : 'Diagnostic Complete: You show strong, advanced readiness. Your capabilities align highly with the expectations of the ES role.'}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                      <button onClick={() => window.print()} className="no-print flex items-center gap-2 text-sm font-semibold text-[#002147] bg-[#F5F6F7] hover:bg-[#E8E9EA] px-4 py-2 rounded-xl transition-all active:scale-95">
                        <Download className="w-4 h-4" />
                        Export PDF
                      </button>
                      <button onClick={() => setShowResetConfirm(true)} className="text-sm text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 font-medium no-print">
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
                <div className="bg-[#F5F6F7]/50 rounded-3xl p-6 sm:p-8 border border-[#E8E9EA]/50 flex gap-4 items-start">
                  <Info className="w-6 h-6 text-[#F5A800] shrink-0 mt-0.5" />
                  <div className="text-sm text-[#001530]/80 leading-relaxed">
                    <p className="font-semibold text-[#001530] mb-1">About this assessment</p>
                    <p>
                      This tool helps you reflect on specific competencies. A total indicator of 39+ reflects readiness to explore the ES role. Discuss these results with your reporting officer to align your professional development goals.
                    </p>
                  </div>
                </div>

                {categories.map((category, catIndex) => {
                  const startIndex = categories.slice(0, catIndex).reduce((acc, cat) => acc + cat.questions.length, 0);
                  
                  return (
                    <section key={category.id} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#002147]">{category.title}</h3>
                        <div className="h-px flex-1 bg-slate-200"></div>
                      </div>
                      
                      <div className="space-y-6">
                        {category.questions.map((question, qIndex) => {
                          const globalIndex = startIndex + qIndex;
                          return (
                            <motion.div 
                              key={globalIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: qIndex * 0.1, type: "spring", stiffness: 100 }}
                              className={`print-avoid-break print-clean-card bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,33,71,0.04)] hover:shadow-[0_8px_32px_rgba(0,33,71,0.08)] border transition-all duration-500 ${
                                scores[globalIndex] > 0 ? 'border-[#E8E9EA]' : 'border-slate-100 hover:border-slate-200'
                              }`}
                            >
                              <div className="flex gap-3 mb-4 sm:mb-6">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#F5F6F7] text-[#002147] flex items-center justify-center font-bold shrink-0 text-xs sm:text-sm">
                                  {globalIndex + 1}
                                </div>
                                <p className="text-sm sm:text-lg font-medium text-slate-800 pt-0.5 sm:pt-1 leading-relaxed">
                                  {question}
                                </p>
                              </div>

                              <div className="flex gap-1 sm:gap-3">
                                {scale.map(s => (
                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    key={s.value}
                                    onClick={() => handleScoreChange(globalIndex, s.value)}
                                    className={`flex-1 flex flex-col items-center justify-center py-3 sm:py-5 px-1 sm:px-2 rounded-2xl transition-all duration-300 ${
                                      scores[globalIndex] === s.value
                                        ? 'bg-[#002147] text-white shadow-md shadow-[#002147]/50'
                                        : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                                    }`}
                                  >
                                    <span className="text-base sm:text-xl font-semibold mb-0.5 sm:mb-1">{s.value}</span>
                                    <span className={`text-[8px] sm:text-xs text-center leading-tight px-0.5 ${scores[globalIndex] === s.value ? 'text-[#F5A800]' : 'text-slate-400'}`}>
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
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="ro"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
            >
              {/* Left Column - Sticky Dashboard */}
              <div className="lg:col-span-4 xl:col-span-4 relative">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Header */}
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-3">
                      Candidate Evaluation
                    </h1>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Identify gaps in potential education specialists to direct them to relevant training and opportunities.
                    </p>
                  </div>

                  {/* Progress Card */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Demonstrated Indicators</p>
                        <p className="text-xs text-slate-500 mt-1">{roDemonstratedCount} of 20 met</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-emerald-600">{Math.round((roDemonstratedCount / 20) * 100)}%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(roDemonstratedCount / 20) * 100}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    
                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                      <button onClick={() => window.print()} className="no-print flex items-center gap-2 text-sm font-semibold text-[#002147] bg-[#F5F6F7] hover:bg-[#E8E9EA] px-4 py-2 rounded-xl transition-all active:scale-95">
                        <Download className="w-4 h-4" />
                        Export PDF
                      </button>
                      <button onClick={() => setShowRoResetConfirm(true)} className="text-sm text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 font-medium no-print">
                        <RefreshCw className="w-4 h-4" />
                        Reset Evaluation
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Questions */}
              <div className="lg:col-span-8 xl:col-span-8 space-y-10">
                {/* Info Box */}
                <div className="bg-amber-50/50 rounded-3xl p-6 sm:p-8 border border-amber-100/50 flex gap-4 items-start">
                  <Info className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-sm text-amber-900/80 leading-relaxed">
                    <p className="font-semibold text-amber-900 mb-1">Guide for Reporting Officers</p>
                    <p>
                      Use these indicators to identify gaps. Click on the red indicator to mark it as "Demonstrated" (green). Items left red indicate areas where the candidate may need further training or opportunities before applying for the ES role.
                    </p>
                  </div>
                </div>

                {roCategories.map((category, catIndex) => {
                  // Calculate starting index for this category
                  const startIndex = roCategories.slice(0, catIndex).reduce((acc, cat) => acc + cat.indicators.length, 0);

                  return (
                    <section key={category.id} className="space-y-6">
                      <div className="flex items-center gap-4">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#002147]">{category.title}</h3>
                        <div className="h-px flex-1 bg-slate-200"></div>
                      </div>
                      
                      <div className="space-y-4">
                        {category.indicators.map((indicator, qIndex) => {
                          const globalIndex = startIndex + qIndex;
                          const isDemonstrated = roScores[globalIndex];

                          return (
                            <motion.div 
                              key={globalIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: qIndex * 0.08, type: "spring", stiffness: 100 }}
                              onClick={() => handleRoScoreToggle(globalIndex)}
                              className={`print-avoid-break print-clean-card group cursor-pointer bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,33,71,0.04)] hover:shadow-[0_8px_32px_rgba(0,33,71,0.08)] border transition-all duration-500 flex items-start gap-3 sm:gap-6 ${
                                isDemonstrated 
                                  ? 'border-emerald-200 bg-emerald-50/30' 
                                  : 'border-slate-100 hover:border-amber-200 hover:shadow-md'
                              }`}
                            >
                              <div className="flex-1 pt-0.5">
                                <p className={`text-xs sm:text-base font-medium leading-relaxed transition-colors ${
                                  isDemonstrated ? 'text-slate-900' : 'text-slate-700'
                                }`}>
                                  {globalIndex + 1}. {indicator}
                                </p>
                              </div>

                              <div className="shrink-0 flex flex-col items-center justify-center">
                                <div className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full transition-colors ${
                                  isDemonstrated 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-red-50 text-red-600 group-hover:bg-red-100'
                                }`}>
                                  {isDemonstrated ? (
                                    <>
                                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                                      <span className="text-[10px] sm:text-sm font-semibold hidden sm:inline-block">Demonstrated</span>
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                                      <span className="text-[10px] sm:text-sm font-semibold hidden sm:inline-block">Gap Identified</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reset Confirmation Modal (Self) */}
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

      {/* Reset Confirmation Modal (RO) */}
      <AnimatePresence>
        {showRoResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-slate-900/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-xl border border-slate-100"
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Reset Evaluation?</h3>
              <p className="text-slate-500 mb-6 text-sm">Are you sure you want to clear this evaluation? This action cannot be undone.</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowRoResetConfirm(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRoReset}
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

