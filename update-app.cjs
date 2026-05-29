const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.tsx');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Add "Export to PDF" button and Lucide icon
code = code.replace(/import { Info, RefreshCw, CheckCircle2, AlertCircle, UserCircle, ClipboardCheck } from 'lucide-react';/,
  "import { Info, RefreshCw, CheckCircle2, AlertCircle, UserCircle, ClipboardCheck, Download } from 'lucide-react';");

// 2. Hide the Top Navigation from print
code = code.replace(/<div className="bg-white border-t-4 border-\[#F5A800\] border-b border-slate-200 sticky top-0 z-40 shadow-sm">/,
  '<div className="bg-white border-t-4 border-[#F5A800] border-b border-slate-200 sticky top-0 z-40 shadow-sm no-print">');

// 3. Update main wrapper to handle print layout
code = code.replace(/<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">/,
  `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 print-full-width">
        {/* Print-only Header */}
        <div className="hidden print-header">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-2xl font-bold text-[#002147] mb-1">ES Role Readiness Report</h1>
              <p className="text-sm text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
            </div>
            <img src="https://www.np.edu.sg/_next/image?url=https%3A%2F%2Fassets.app.optical.gov.sg%2Fnp%2Fproduction%2Fpublished%2Fcollections%2Fpages%2F17c64bb4-8632-49e9-af16-047f7cabe99a%2Fab16008f-a6a0-466e-9193-e16e947261b0.png&w=1080&q=75" alt="NP Logo" className="h-8 w-auto" style={{ filter: 'brightness(0)' }} />
          </div>
        </div>`);

// 4. Update the left column (sticky dashboard) to hide on print, OR adjust for print
// Wait, we want the dashboard to print too! So we shouldn't hide the whole left column.
// Just hide the Reset buttons.
code = code.replace(/<button \s*onClick=\{\(\) => setShowResetConfirm\(true\)\}\s*className="text-sm text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 font-medium"\s*>/,
  '<button onClick={() => setShowResetConfirm(true)} className="text-sm text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 font-medium no-print">');

code = code.replace(/<button \s*onClick=\{\(\) => setShowRoResetConfirm\(true\)\}\s*className="text-sm text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 font-medium"\s*>/,
  '<button onClick={() => setShowRoResetConfirm(true)} className="text-sm text-slate-400 hover:text-red-500 transition-colors flex items-center gap-2 font-medium no-print">');

// Add "Export to PDF" button to Self dashboard
code = code.replace(/<div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">/g,
  `<div className="flex justify-between items-center mt-6 pt-6 border-t border-slate-100">
                      <button onClick={() => window.print()} className="no-print flex items-center gap-2 text-sm font-semibold text-[#002147] bg-[#F5F6F7] hover:bg-[#E8E9EA] px-4 py-2 rounded-xl transition-all active:scale-95">
                        <Download className="w-4 h-4" />
                        Export PDF
                      </button>`);

// 5. Enhance Question Cards with premium aesthetic & stagger animations
// Find the motion.div for Self questions
code = code.replace(/<motion\.div\s*key=\{globalIndex\}\s*initial=\{\{ opacity: 0, y: 20 \}\}\s*animate=\{\{ opacity: 1, y: 0 \}\}\s*transition=\{\{ delay: globalIndex \* 0\.05 \}\}\s*className=\{\`bg-white rounded-3xl p-6 sm:p-8 shadow-sm border transition-colors duration-300 \$\{/g,
  `<motion.div 
                              key={globalIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: qIndex * 0.1, type: "spring", stiffness: 100 }}
                              className={\`print-avoid-break print-clean-card bg-white rounded-3xl p-8 sm:p-10 shadow-[0_4px_24px_rgba(0,33,71,0.04)] hover:shadow-[0_8px_32px_rgba(0,33,71,0.08)] border transition-all duration-500 \${`);

// Find the motion.div for RO indicators
code = code.replace(/<motion\.div\s*key=\{globalIndex\}\s*initial=\{\{ opacity: 0, y: 20 \}\}\s*animate=\{\{ opacity: 1, y: 0 \}\}\s*transition=\{\{ delay: qIndex \* 0\.05 \}\}\s*onClick=\{\(\) => handleRoScoreToggle\(globalIndex\)\}\s*className=\{\`group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 shadow-sm border transition-all duration-300 flex items-start gap-3 sm:gap-6 \$\{/g,
  `<motion.div 
                              key={globalIndex}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: qIndex * 0.08, type: "spring", stiffness: 100 }}
                              onClick={() => handleRoScoreToggle(globalIndex)}
                              className={\`print-avoid-break print-clean-card group cursor-pointer bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,33,71,0.04)] hover:shadow-[0_8px_32px_rgba(0,33,71,0.08)] border transition-all duration-500 flex items-start gap-3 sm:gap-6 \${`);

// 6. Make score buttons animated
// Find the button inside `scale.map`
code = code.replace(/<button\s*key=\{s\.value\}\s*onClick=\{\(\) => handleScoreChange\(globalIndex, s\.value\)\}\s*className=\{\`flex-1 flex flex-col items-center justify-center py-2 sm:py-4 px-0\.5 sm:px-2 rounded-xl sm:rounded-2xl transition-all duration-300 \$\{/g,
  `<motion.button
                                    whileTap={{ scale: 0.95 }}
                                    key={s.value}
                                    onClick={() => handleScoreChange(globalIndex, s.value)}
                                    className={\`flex-1 flex flex-col items-center justify-center py-3 sm:py-5 px-1 sm:px-2 rounded-2xl transition-all duration-300 \${`);

// Remember to close the motion.button
code = code.replace(/<\/button>\s*\}\)\}\s*<\/div>/g,
  `</motion.button>\n                                  ))}\n                                </div>`);

// 7. Improve headings tracking
code = code.replace(/<h3 className="text-xl font-semibold text-slate-900">/g, 
  '<h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#002147]">');

fs.writeFileSync(appPath, code);
console.log('App.tsx refined successfully.');
