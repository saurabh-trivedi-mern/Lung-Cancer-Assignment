import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ResearchPapers from './pages/Research_Papers/ResearchPapers';
import Dashboard from "./pages/Dashboard/Dashboard"; 
import KOLS from './pages/KOLS/KOLS';
import ClinicalTrails from './pages/Clinical_Trials/ClinicalTrials';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/researchpapers" element={<ResearchPapers />} />
        <Route path="/kols" element={<KOLS />} />
        <Route path="/clinicaltrials" element={<ClinicalTrails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


