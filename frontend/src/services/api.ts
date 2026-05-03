const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface Problem {
  num1: number;
  num2: number;
}

export interface ProblemSet {
  id: string;
  operation: string;
  problems_data: Problem[];
  created_at: string;
}

export const api = {
  async saveProblemSet(operation: string, problems: Problem[]): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/api/problem-sets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operation,
        problems_data: problems,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save problem set');
    }

    const data = await response.json();
    return data.id;
  },

  async getProblemSet(id: string): Promise<ProblemSet> {
    const response = await fetch(`${API_BASE_URL}/api/problem-sets/${id}`);
    
    if (!response.ok) {
      throw new Error('Problem set not found');
    }

    return response.json();
  },
};
