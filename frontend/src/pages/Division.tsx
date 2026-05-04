import { useState, useEffect } from 'react';
import { Divide, User, GraduationCap, ArrowLeft, Loader2 } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ProblemGenerator from '../components/ProblemGenerator';
import ProblemDisplay from '../components/ProblemDisplay';
import { api } from '../services/api';

function DivisionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [numProblems, setNumProblems] = useState(20);
  const [quotientDigits, setQuotientDigits] = useState(1);
  const [divisorDigits, setDivisorDigits] = useState(1);
  const [problems, setProblems] = useState<Array<{ num1: number; num2: number }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setId = searchParams.get('set');
    if (setId && problems.length === 0) {
      setLoading(true);
      api.getProblemSet(setId)
        .then(data => {
          setProblems(data.problems_data);
        })
        .catch(err => {
          console.error("Error loading problem set:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [searchParams]);

  const generateProblems = async () => {
    const newProblems = [];
    for (let i = 0; i < numProblems; i++) {
      // To ensure a whole number result with no remainders:
      // 1. Generate a divisor (num2)
      // 2. Generate a quotient (the answer)
      let num2 = generateRandomNumber(divisorDigits);
      let quotient = generateRandomNumber(quotientDigits);
      
      // Ensure divisor (num2) <= quotient
      if (num2 > quotient) {
        if (quotientDigits >= divisorDigits) {
          while (quotient < num2) {
            quotient = generateRandomNumber(quotientDigits);
          }
        } else {
          [num2, quotient] = [quotient, num2];
        }
      }
      
      const num1 = num2 * quotient;
      newProblems.push({ num1, num2 });
    }
    
    setProblems(newProblems);
    
    try {
      const setId = await api.saveProblemSet('division', newProblems);
      setSearchParams({ set: setId });
    } catch (err) {
      console.error("Failed to save problems to backend:", err);
    }
  };

  const generateRandomNumber = (digits: number): number => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-fuchsia-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium mb-6 no-print transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 no-print">
            <div className="flex items-center gap-3 mb-8">
              <Divide className="w-10 h-10 text-purple-600" />
              <h1 className="text-4xl font-bold text-gray-800">Division Practice</h1>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                  placeholder="Enter grade"
                />
              </div>
            </div>

            <ProblemGenerator
              numProblems={numProblems}
              setNumProblems={setNumProblems}
              firstNumberDigits={divisorDigits}
              setFirstNumberDigits={setDivisorDigits}
              secondNumberDigits={quotientDigits}
              setSecondNumberDigits={setQuotientDigits}
              onGenerate={generateProblems}
              firstLabel="Divisor Digits"
              secondLabel="Quotient (Answer) Digits"
              buttonColor="purple"
            />
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
              <p className="text-gray-600 font-medium">Loading problem set...</p>
            </div>
          )}

          {!loading && problems.length > 0 && (
            <div className="space-y-4">
              <ProblemDisplay
                studentName={studentName}
                grade={grade}
                problems={problems}
                symbol="÷"
                symbolColor="text-purple-600"
                variant="longDivision"
                extraSpacing={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DivisionPage;
