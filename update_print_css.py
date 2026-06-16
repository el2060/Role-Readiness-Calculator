import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the @media print block
# Use regex to find it
match = re.search(r'(@media print \{.*?\n      \})', content, re.DOTALL)
if match:
    old_print_css = match.group(1)
    
    new_print_css = """@media print {
        @page {
          size: A4 portrait;
          margin: 1.5cm 1.5cm 2cm 1.5cm;
        }
        
        /* Hide interactive/UI elements */
        .rr-tabs, #rr-back-btn, .rr-reset-button, #rr-export-pdf-self, #rr-export-pdf-ro, .rr-small-note, .rr-help, .rr-progress-track, .rr-progress-row, #rr-modal {
          display: none !important;
        }
        
        body {
          background: #ffffff !important;
          color: #000000 !important;
          font-size: 11pt !important;
        }
        
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        
        .rr-app {
          max-width: 100% !important;
          padding: 0 !important;
        }
        
        /* Header styling for print */
        .rr-header {
          border-radius: 0 !important;
          border: none !important;
          border-bottom: 2px solid #002147 !important;
          padding: 0 0 16px 0 !important;
          margin-bottom: 32px !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        
        /* Layout */
        .rr-layout {
          display: block;
        }
        
        .rr-card {
          box-shadow: none !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px !important;
          padding: 24px !important;
          margin-bottom: 32px !important;
          page-break-inside: avoid;
        }
        
        /* Top cards layout (Radar + Score) - display side-by-side */
        .rr-stack {
          display: flex;
          flex-direction: row;
          gap: 24px;
          margin-bottom: 32px;
        }
        .rr-stack .rr-card {
          flex: 1;
          margin-bottom: 0 !important;
        }
        .rr-stack:last-child {
          display: block;
        }
        
        /* Questions list styling */
        .rr-category-block {
          margin-bottom: 32px !important;
          page-break-inside: avoid;
        }
        .rr-category-head h3 {
          font-size: 20px !important;
          color: #002147 !important;
          border-bottom: 1px solid #cbd5e1;
          padding-bottom: 8px;
          margin-bottom: 16px !important;
        }
        .rr-divider {
          display: none !important;
        }
        
        .rr-question-card {
          box-shadow: none !important;
          border: none !important;
          border-bottom: 1px dashed #cbd5e1 !important;
          border-radius: 0 !important;
          padding: 16px 0 !important;
          background: transparent !important;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .rr-question-card:last-child {
          border-bottom: none !important;
        }
        
        .rr-question-header {
          align-items: center;
        }
        .rr-question-number {
          background: #002147 !important;
          color: #fff !important;
          border: none !important;
          width: 28px !important;
          height: 28px !important;
          font-size: 12px !important;
        }
        
        /* Score grid for print */
        .rr-score-grid {
          margin-top: 12px !important;
          gap: 8px !important;
        }
        .rr-score-button {
          min-height: auto !important;
          padding: 8px 4px !important;
          border: 1px solid #e2e8f0 !important;
          background: #f8fafc !important;
          opacity: 1 !important;
        }
        .rr-score-button.rr-selected {
          border: 1px solid #002147 !important;
          background: #002147 !important;
          color: #ffffff !important;
        }
        .rr-score-button.rr-selected span {
          color: #F5A800 !important;
        }
        
        /* RO Indicators */
        .rr-indicator-card {
          box-shadow: none !important;
          border: none !important;
          border-bottom: 1px dashed #cbd5e1 !important;
          border-radius: 0 !important;
          padding: 12px 0 !important;
          background: transparent !important;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .rr-indicator-card:last-child {
          border-bottom: none !important;
        }
        .rr-indicator-button {
          border: 1px solid #e2e8f0 !important;
          background: #fef2f2 !important;
          color: #b91c1c !important;
        }
        .rr-indicator-button.rr-selected {
          border-color: #065f46 !important;
          background: #d1fae5 !important;
          color: #065f46 !important;
        }
        
        .rr-chart {
          max-width: 200px !important;
          margin: 0 auto !important;
          display: block !important;
        }
        .rr-progress-value {
          font-size: 36px !important;
          font-weight: 800 !important;
          color: #002147 !important;
        }
        
        .rr-summary-message {
          font-size: 14pt !important;
          padding: 16px !important;
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
        }
      }"""
    
    content = content.replace(old_print_css, new_print_css)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Print CSS updated successfully")
else:
    print("Could not find @media print block")
