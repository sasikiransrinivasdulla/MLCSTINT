import { experiments } from "../data/experiments";

export default function Sidebar({ activeExp, setActiveExp, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`mobile-overlay ${mobileOpen ? "visible" : ""}`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      <aside className={`sidebar ${mobileOpen ? "mobile-open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-title">ML Lab Assist</div>
        <div className="sidebar-subtitle">Execution & Copy Mode</div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className={`sidebar-item ${activeExp === exp.id ? "active" : ""}`}
              onClick={() => {
                setActiveExp(exp.id);
                setMobileOpen(false);
              }}
            >
              <span className="exp-number">{String(exp.id).padStart(2, "0")}</span>
              <div>
                <div style={{ lineHeight: 1.3 }}>Experiment {exp.id}</div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.35)",
                    marginTop: 2,
                  }}
                >
                  {exp.subtitle}
                </div>
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div
          style={{
            padding: "16px 24px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginTop: "auto",
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
              fontWeight: 500
            }}
          >
            For Educational Purpose only!
          </div>
        </div>
      </aside>
    </>
  );
}
