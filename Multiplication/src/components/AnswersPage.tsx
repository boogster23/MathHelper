import { FileText, ArrowLeft } from 'lucide-react';

interface Problem {
  multiplicand: number;
  multiplier: number;
}

interface AnswersPageProps {
  studentName: string;
  grade: string;
  problems: Problem[];
  onBack: () => void;
}

export default function AnswersPage({ studentName, grade, problems, onBack }: AnswersPageProps) {
  const calculateAnswer = (multiplicand: number, multiplier: number): number => {
    return multiplicand * multiplier;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-6 transition no-print"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Generator
          </button>

          <div className="print-worksheet bg-white rounded-2xl shadow-xl p-8">
            <div className="print-worksheet-header flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-green-600 print-worksheet-icon" />
                <h2 className="text-2xl font-bold text-gray-800 print-worksheet-title">Answer Key</h2>
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
                  <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200 hover:border-green-400 transition print-worksheet-problem">
                    <div className="text-xs font-medium text-green-700 mb-3 print-worksheet-label">Problem {index + 1}</div>
                    <div className="font-mono text-right space-y-1">
                      <div className="text-2xl font-bold text-gray-800 print-worksheet-num">
                        {problem.multiplicand.toLocaleString()}
                      </div>
                      <div className="flex items-center justify-end gap-2 text-xl font-bold text-gray-700 print-worksheet-num">
                        <span className="text-green-600">×</span>
                        <span>{problem.multiplier.toLocaleString()}</span>
                      </div>
                      <div className="border-t-2 border-gray-800 pt-3 mt-2 print-worksheet-line">
                        <div className="text-2xl font-bold text-green-600 print-worksheet-num">
                          {calculateAnswer(problem.multiplicand, problem.multiplier).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 no-print">
              <button
                onClick={() => window.print()}
                className="bg-green-100 hover:bg-green-200 text-green-800 font-medium py-3 px-6 rounded-lg transition duration-200"
              >
                Print Answer Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
