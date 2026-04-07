import { useState } from "react";
import { experiments } from "./data/experiments";
import ExperimentCard from "./components/ExperimentCard";
import ExperimentModal from "./components/ExperimentModal";

export default function App() {
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 style={{ fontSize: "2.5rem", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "8px" }}>
          ML Lab Assist
        </h1>
        <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.5)" }}>
          Fast lab execution. Copy-paste ready code.
        </p>
      </header>

      <div className="grid-container">
        {experiments.map((exp) => (
          <ExperimentCard 
            key={exp.id} 
            experiment={exp} 
            onClick={() => setSelectedExp(exp)} 
          />
        ))}
      </div>

      <footer className="dashboard-footer">
        For Educational Purpose only!
      </footer>

      {selectedExp && (
        <ExperimentModal 
          experiment={selectedExp} 
          onClose={() => setSelectedExp(null)} 
        />
      )}
    </div>
  );
}
