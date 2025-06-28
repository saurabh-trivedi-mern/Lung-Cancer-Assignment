import ResearchPaperCard from "../../components/Tabs/ResearchPaperCard";
import styles from "../basic.module.css";
import data from "../../json/researchPapers.json";
import Navbar from "../../components/Tabs/Navbar";

const ResearchPapers = () => {
  const researchPapers = data.results.research_papers;

  const sortedResearchPapers = [...researchPapers].sort(
    (a, b) => b.citation_count - a.citation_count
  );

  return (
    <div className={styles.boxBody}>
      <Navbar />
      <h1 className={styles.heading}>Research Papers!</h1>
      <div className={styles.outerBox}>
        <ResearchPaperCard papers={sortedResearchPapers} />
      </div>
    </div>
  );
};

export default ResearchPapers;


