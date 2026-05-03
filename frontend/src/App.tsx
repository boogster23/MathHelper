import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import MultiplicationPage from './pages/Multiplication';
import AdditionPage from './pages/Addition';
import SubtractionPage from './pages/Subtraction';
import DivisionPage from './pages/Division';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/multiplication" element={<MultiplicationPage />} />
        <Route path="/addition" element={<AdditionPage />} />
        <Route path="/subtraction" element={<SubtractionPage />} />
        <Route path="/division" element={<DivisionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
