import { useEffect } from "react";

export default function ExplainModal({ data, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!data) return null;

  return (
    <div className="explain-modal-overlay" onClick={onClose}>
      <div 
        className="explain-modal-content" 
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="explain-modal-header">
          <h2>💡 Code Breakdown</h2>
          <button className="close-btn" onClick={onClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="explain-modal-body">
          {data.map((item, idx) => (
            <div key={idx} className="expl-modal-step">
              <div className="expl-modal-step-title">Step {item.step}:</div>
              <div className="expl-modal-row">{item.eng}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
