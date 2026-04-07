import CodeBlock from "./CodeBlock";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`accordion-chevron ${open ? "rotated" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ExecutionContent({ experiment }) {
  return (
    <>
      {/* Code */}
      <div className="section-card" style={{ marginBottom: 16 }}>
        <div className="section-label">
          <span className="icon">💻</span> Code
        </div>
        <CodeBlock code={experiment.code} language="python" />
      </div>

      {/* Output */}
      <div className="section-card">
        <div className="section-label">
          <span className="icon">📤</span> Output
        </div>
        <div className="output-block">{experiment.output}</div>
      </div>
    </>
  );
}

export default function ExperimentAccordion({ experiment, isOpen, onToggle }) {

  return (
    <div
      className={`accordion-item ${isOpen ? "expanded" : ""}`}
      style={{
        boxShadow: isOpen ? "0 0 30px rgba(255,255,255,0.03)" : "none",
      }}
    >
      <div className="accordion-header" onClick={onToggle}>
        <div className="accordion-header-left">
          <div className="badge">{String(experiment.id).padStart(2, "0")}</div>
          <div>
            <h3>
              Experiment {experiment.id}: {experiment.title}
            </h3>
            <div className="subtitle">{experiment.subtitle}</div>
          </div>
        </div>
        <ChevronIcon open={isOpen} />
      </div>

      <div className={`accordion-body ${isOpen ? "open" : ""}`}>
        <ExecutionContent experiment={experiment} />
      </div>
    </div>
  );
}
