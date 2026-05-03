import { FileText } from 'lucide-react';

interface Problem {
  num1: number;
  num2: number;
}

interface ProblemDisplayProps {
  studentName: string;
  grade: string;
  problems: Problem[];
  symbol: string;
  symbolColor?: string;
}

export default function ProblemDisplay({ 
  studentName, 
  grade, 
  problems, 
  symbol,
  symbolColor = "text-blue-600"
}: ProblemDisplayProps) {
  return (
    <div className="print-worksheet bg-white rounded-2xl shadow-xl p-8">
      <div className="print-worksheet-header flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600 print-worksheet-icon" />
          <h2 className="text-2xl font-bold text-gray-800 print-worksheet-title">Practice Problems</h2>
        </div>
        {studentName && (
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-800 print-worksheet-student">{studentName}</p>
            {grade && <p className="text-sm text-gray-600 print-worksheet-grade">Grade: {grade}</p>}
          </div>
        )}
      </div>

      <div className="print-worksheet-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {problems.map((problem, index) => (
          <div key={index} className="flex flex-col print-worksheet-cell">
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-blue-300 transition print-worksheet-problem">
              <div className="text-xs font-medium text-gray-500 mb-3 print-worksheet-label">Problem {index + 1}</div>
              <div className="font-mono text-right space-y-1">
                <div className="text-2xl font-bold text-gray-800 print-worksheet-num">
                  {problem.num1.toLocaleString()}
                </div>
                <div className="flex items-center justify-end gap-2 text-xl font-bold text-gray-700 print-worksheet-num">
                  <span className={symbolColor}>{symbol}</span>
                  <span>{problem.num2.toLocaleString()}</span>
                </div>
                <div className="border-t-2 border-gray-800 pt-3 mt-2 print-worksheet-line">
                  <div className="h-8 print-worksheet-blank"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 no-print">
        <button
          onClick={() => window.print()}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition duration-200"
        >
          Print Worksheet
        </button>
      </div>
    </div>
  );
}
