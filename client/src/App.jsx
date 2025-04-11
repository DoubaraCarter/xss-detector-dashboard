import { useState } from "react";
import DetectorForm from "./pages/DetectorForm";
import Dashboard from "./pages/Dashboard";
import './index.css';


function App() {
  const [view, setView] = useState("form"); // 'form' or 'dashboard'

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">🛡️ Real-Time XSS Attack Detector</h1>

      <div className="mb-4">
        <button onClick={() => setView("form")} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">
          Input Form
        </button>
        <button onClick={() => setView("dashboard")} className="px-4 py-2 bg-green-600 text-white rounded">
          View Dashboard
        </button>
      </div>

      {view === "form" ? <DetectorForm /> : <Dashboard />}
    </div>
  );
}

export default App;
