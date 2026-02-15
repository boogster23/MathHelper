import { Sparkles } from 'lucide-react';

interface ProblemGeneratorProps {
  numProblems: number;
  setNumProblems: (value: number) => void;
  multiplicandDigits: number;
  setMultiplicandDigits: (value: number) => void;
  multiplierDigits: number;
  setMultiplierDigits: (value: number) => void;
  onGenerate: () => void;
}

export default function ProblemGenerator({
  numProblems,
  setNumProblems,
  multiplicandDigits,
  setMultiplicandDigits,
  multiplierDigits,
  setMultiplierDigits,
  onGenerate,
}: ProblemGeneratorProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Problems
          </label>
          <input
            type="number"
            min="1"
            max="20"
            value={numProblems}
            onChange={(e) => setNumProblems(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <p className="text-xs text-gray-500 mt-1">Maximum: 20 problems</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Multiplicand Digits
          </label>
          <input
            type="number"
            min="1"
            max="6"
            value={multiplicandDigits}
            onChange={(e) => setMultiplicandDigits(Math.min(6, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <p className="text-xs text-gray-500 mt-1">Maximum: 6 digits</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Multiplier Digits
          </label>
          <input
            type="number"
            min="1"
            max="6"
            value={multiplierDigits}
            onChange={(e) => setMultiplierDigits(Math.min(6, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          <p className="text-xs text-gray-500 mt-1">Maximum: 6 digits</p>
        </div>
      </div>

      <button
        onClick={onGenerate}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
      >
        <Sparkles className="w-5 h-5" />
        Generate Problems
      </button>
    </div>
  );
}
