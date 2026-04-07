export default function ExperimentCard({ experiment, onClick }) {
  return (
    <div className="experiment-card" onClick={onClick}>
      <div className="card-badge">
        {String(experiment.id).padStart(2, "0")}
      </div>
      <h3 className="card-title">{experiment.title}</h3>
      <p className="card-subtitle">{experiment.subtitle}</p>
    </div>
  );
}
