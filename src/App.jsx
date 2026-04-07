import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ExperimentAccordion from "./components/ExperimentAccordion";
import { experiments } from "./data/experiments";

export default function App() {
  const [activeExp, setActiveExp] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        activeExp={activeExp}
        setActiveExp={setActiveExp}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="main-content">
        <header
          style={{
            marginBottom: 32,
            gap: 16,
          }}
        >
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            ML Lab Assist
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "rgba(255,255,255,0.5)",
              marginTop: 6,
            }}
          >
            Fast lab execution. Copy-paste ready code.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {experiments.map((exp) => (
            <ExperimentAccordion
              key={exp.id}
              experiment={exp}
              isOpen={activeExp === exp.id}
              onToggle={() => setActiveExp(exp.id === activeExp ? null : exp.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
