import { useState } from "react";
import styles from "./clinicaltrialscard.module.css";
import data from "../../json/researchPapers.json";

const trialsData = data.results.clinical_trials;

export default function ClinicalTrialsCard() {
  const [filters, setFilters] = useState({ phase: "", trial_status: "" });

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "recruiting":
        return styles.statusRecruiting;
      case "completed":
        return styles.statusCompleted;
      case "active, not recruiting":
        return styles.statusActive;
      default:
        return styles.statusUnknown;
    }
  };

  const filteredTrials = trialsData.filter((trial) => {
    const matchPhase = filters.phase ? trial.phase === filters.phase : true;
    const matchStatus = filters.trial_status
      ? trial.trial_status.toLowerCase() === filters.trial_status.toLowerCase()
      : true;
    return matchPhase && matchStatus;
  });

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <label>
          Phase:
          <select
            value={filters.phase}
            onChange={(e) => handleFilterChange("phase", e.target.value)}
          >
            <option value="">All</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
          </select>
        </label>
        <label>
          Status:
          <select
            value={filters.trial_status}
            onChange={(e) => handleFilterChange("trial_status", e.target.value)}
          >
            <option value="">All</option>
            <option value="Recruiting">Recruiting</option>
            <option value="Completed">Completed</option>
            <option value="Active, not recruiting">Active, not recruiting</option>
          </select>
        </label>
      </div>

      <div className={styles.grid}>
        {filteredTrials.map((trial, idx) => (
          <div key={idx} className={styles.card}>
            <h3 className={styles.title}>{trial.title}</h3>
            <p><strong>Phase:</strong> {trial.phase}</p>
            <p><strong>Condition:</strong> {trial.condition}</p>
            <p className={`${styles.status} ${getStatusStyle(trial.trial_status)}`}>
              <strong>Status:</strong> {trial.trial_status}
            </p>
            <a
              href={trial.source}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on ClinicalTrials.gov
            </a>
          </div>
        ))}
        {filteredTrials.length === 0 && (
          <p className={styles.noMatch}>No trials match the selected filters.</p>
        )}
      </div>
    </div>
  );
}
