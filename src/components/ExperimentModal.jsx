import { useEffect } from "react";
import CodeBlock from "./CodeBlock";

export default function ExperimentModal({ experiment, onClose }) {

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="modal-header">
          <h2>
            <span style={{ color: "rgba(255,255,255,0.4)", marginRight: 8 }}>
              #{String(experiment.id).padStart(2, "0")}
            </span>
            {experiment.title}
          </h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Description Section */}
          <div className="section-card">
            <div className="section-label">
              <span className="icon">📄</span> Description
            </div>
            <div className="description-block" style={{ whiteSpace: "pre-line", color: "rgba(255, 255, 255, 0.8)", fontSize: "0.9rem", lineHeight: "1.6", padding: "12px", background: "rgba(255, 255, 255, 0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
              {experiment.description}
            </div>
          </div>

          {experiment.isNotesOnly ? (
            <div className="notes-msg" style={{ marginTop: "1rem" }}>{experiment.message}</div>
          ) : (
            <>
              {/* Code Section */}
              <div className="section-card" style={{ marginTop: "1.5rem" }}>
                <div className="section-label">
                  <span className="icon">💻</span> Code
                </div>
                <CodeBlock 
                  code={experiment.code} 
                  language="python" 
                />
              </div>

              {/* Output Section */}
              <div className="section-card" style={{ marginTop: "1.5rem" }}>
                <div className="section-label">
                  <span className="icon">📤</span> Output
                </div>
                <div className="output-block">{experiment.output}</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
