import { useState } from 'react';
import { Calculator, User, GraduationCap, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProblemGenerator from '../components/ProblemGenerator';
import ProblemDisplay from '../components/ProblemDisplay';
import AnswersPage from '../components/AnswersPage';

function MultiplicationPage() {
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [numProblems, setNumProblems] = useState(20);
  const [multiplicandDigits, setMultiplicandDigits] = useState(2);
  const [multiplierDigits, setMultiplierDigits] = useState(1);
  const [problems, setProblems] = useState<Array<{ multiplicand: number; multiplier: number }>>([]);
  const [showAnswers, setShowAnswers] = useState(false);

  const generateProblems = () => {
    const newProblems = [];
    for (let i = 0; i < numProblems; i++) {
      const multiplicand = generateRandomNumber(multiplicandDigits);
      const multiplier = generateRandomNumber(multiplierDigits);
      newProblems.push({ multiplicand, multiplier });
    }
    setProblems(newProblems);
  };

  const generateRandomNumber = (digits: number): number => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  if (showAnswers && problems.length > 0) {
    return (
      <AnswersPage
        studentName={studentName}
        grade={grade}
        problems={problems}
        onBack={() => setShowAnswers(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-6 no-print transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 no-print">
            <div className="flex items-center gap-3 mb-8">
              <Calculator className="w-10 h-10 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-800">Multiplication Practice</h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4" />
                  Student Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter student name"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <GraduationCap className="w-4 h-4" />
                  Grade
                </label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter grade"
                />
              </div>
            </div>

            <ProblemGenerator
              numProblems={numProblems}
              setNumProblems={setNumProblems}
              multiplicandDigits={multiplicandDigits}
              setMultiplicandDigits={setMultiplicandDigits}
              multiplierDigits={multiplierDigits}
              setMultiplierDigits={setMultiplierDigits}
              onGenerate={generateProblems}
            />
          </div>

          {problems.length > 0 && (
            <div className="space-y-4">
              <ProblemDisplay
                studentName={studentName}
                grade={grade}
                problems={problems}
              />
              <div className="bg-white rounded-2xl shadow-xl p-8 no-print">
                <button
                  onClick={() => setShowAnswers(true)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl"
                >
                  View Answer Key
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MultiplicationPage;
