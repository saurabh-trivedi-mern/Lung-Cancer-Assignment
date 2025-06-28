import { useState } from "react";
import styles from "./kolcard.module.css";
import data from "../../json/researchPapers.json";

const kolData = data.results.leaders;

export default function KOLCard() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={styles.kolContainer}>
      {kolData.map((kol, index) => (
        <div key={index} className={styles.kolCard}>
          <h2 className={styles.kolName}>{kol.name}</h2>
          <p className={styles.kolMeta}><strong>Affiliation:</strong> {kol.affiliation}</p>
          <p className={styles.kolMeta}><strong>Subspecialty:</strong> {kol.subspecialty}</p>
          <p className={styles.kolMeta}><strong>Citations:</strong> {kol.citation_count}</p>
          <p className={styles.kolMeta}><strong>Publications:</strong> {kol.papers_count}</p>

          <button
            onClick={() => toggleExpand(index)}
            className={styles.expandButton}
          >
            {expandedIndex === index ? "Hide Details" : "View Details"}
          </button>

          {expandedIndex === index && (
            <div className={styles.expandContent}>
              <div className={styles.section}>
                <strong>Related Authors:</strong>
                <div className={styles.tags}>
                  {kol.related_authors.map((author, idx) => (
                    <span key={idx} className={styles.tag}>{author}</span>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <strong>Payments from Companies:</strong>
                <table className={styles.paymentTable}>
                  <tbody>
                    {Object.entries(kol.payments).map(([company, amount], idx) => (
                      <tr key={idx}>
                        <td>{company}</td>
                        <td>{amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className={styles.section}>
                <strong>Published Papers:</strong>
                <ul className={styles.paperList}>
                  {kol.published_papers.slice(0, 5).map((paper, idx) => (
                    <li key={idx} className={styles.paperItem}>
                      <div><strong>{paper.title}</strong> – {paper.journal}</div>
                      <div>{paper.published_date} | Citations: {paper.citation_count}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
