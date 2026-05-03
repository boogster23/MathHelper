import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import MultiplicationPage from './pages/Multiplication';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/multiplication" element={<MultiplicationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
