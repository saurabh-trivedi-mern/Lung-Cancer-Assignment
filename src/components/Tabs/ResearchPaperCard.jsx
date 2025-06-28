import { useState } from "react";
import styles from "./researchpapercard.module.css";
import data from "../../json/researchPapers.json";

const ResearchPaperCard = () => {
  const allPapers = data.results.research_papers;

  const [expandedPaper, setExpandedPaper] = useState(null);
  const [showFullAbstract, setShowFullAbstract] = useState({});
  const [sortOption, setSortOption] = useState("citations");

  const toggleAbstract = (index) => {
    setShowFullAbstract((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleSimilar = (index) => {
    setExpandedPaper((prev) => (prev === index ? null : index));
  };

  // Sort papers based on option
  const sortedPapers = [...allPapers].sort((a, b) => {
    if (sortOption === "citations") {
      return b.citation_count - a.citation_count;
    } else if (sortOption === "date") {
      return new Date(b.published_date) - new Date(a.published_date);
    }
    return 0;
  });

  return (
    <div className={styles.container}>
      {/* Sorting Dropdown */}
      <div className={styles.sortBar}>
        <label>
          Sort by:
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="citations">Citation Count</option>
            <option value="date">Publication Date</option>
          </select>
        </label>
      </div>

      <div className={styles.researchContainer}>
        {sortedPapers.map((paper, index) => (
          <div key={index} className={styles.researchCard}>
            <h2 className={styles.researchTitle}>{paper.title}</h2>
            <p className={styles.researchMeta}>
              <strong>Authors:</strong> {paper.authors.join(", ")}
            </p>
            <p className={styles.researchMeta}>
              <strong>Journal:</strong> {paper.journal} • Published: {paper.published_date}
            </p>
            <p className={styles.researchMeta}>
              <strong>Citations:</strong> {paper.citation_count}
            </p>
            <p className={styles.researchAbstract}>
              {showFullAbstract[index]
                ? paper.abstract
                : `${paper.abstract.slice(0, 150)}...`}
              <button
                onClick={() => toggleAbstract(index)}
                className={styles.toggleButton}
              >
                {showFullAbstract[index] ? "Read less" : "Read more"}
              </button>
            </p>
            <button
              onClick={() => toggleSimilar(index)}
              className={styles.similarButton}
            >
              {expandedPaper === index
                ? "Hide Similar Papers"
                : "View Similar Papers"}
            </button>
            {expandedPaper === index && (
              <ul className={styles.similarList}>
                {paper.similar_papers.map((sim, idx) => (
                  <li key={idx}>
                    <strong>{sim.title}</strong> by {sim.authors.join(", ")} —{" "}
                    {sim.journal} ({sim.published_date})<br />
                    <em>Citations:</em> {sim.citation_count}
                    <p>{sim.abstract.slice(0, 100)}...</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPaperCard;
