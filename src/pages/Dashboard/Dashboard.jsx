import { useState } from "react";
import { Tab } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import data from "../../json/researchPapers.json";
import ResearchPaperCard from "../../components/Tabs/ResearchPaperCard";
import KOLCard from "../../components/Tabs/KOLSCard";
import ClinicalTrialsCard from "../../components/Tabs/ClinicalTrialsCard";
import Navbar from "../../components/Tabs/Navbar";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [sortOption, setSortOption] = useState({
    research: "citations",
    kols: "influence",
    trials: "phase",
  });

  const researchPapers = data.results.research_papers;
  const kols = data.results.leaders;
  const trials = data.results.clinical_trials;

  const handleSortChange = (type, value) => {
    setSortOption((prev) => ({ ...prev, [type]: value }));
  };

  const sortedResearchPapers = [...researchPapers].sort((a, b) => {
  if (sortOption.research === "citations") {
    return b.citation_count - a.citation_count;
  } else if (sortOption.research === "date") {
    return new Date(b.published_date) - new Date(a.published_date);
  }
  return 0;
  });

  return (
    <div className={styles.outerBox}>
      <div className={styles.navbarBox}><Navbar /></div>
      <div className={styles.innerBox}>
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <Tab.List className={styles.tabList}>
            <Tab className={({ selected }) =>
              selected ? styles.tabSelected : styles.tabUnselected
            }>
              Research Papers ({researchPapers.length})
            </Tab>
            <Tab className={({ selected }) =>
              selected ? styles.tabSelected : styles.tabUnselected
            }>
              KOLs ({kols.length})
            </Tab>
            <Tab className={({ selected }) =>
              selected ? styles.tabSelected : styles.tabUnselected
            }>
              Clinical Trials ({trials.length})
            </Tab>
          </Tab.List>

          <Tab.Panels className={styles.tabPanels}>

            {/* Research Papers */}
            <Tab.Panel>
              {/* <div className={styles.sortContainer}>
                <label className={styles.sortLabel}>Sort by:</label>
                <select
                  className={styles.sortSelect}
                  value={sortOption.research}
                  onChange={(e) => handleSortChange("research", e.target.value)}
                >
                  <option value="citations">Citation Count</option>
                  <option value="date">Publication Date</option>
                </select>
              </div> */}
              <div className={styles.tabContent}>
                <ResearchPaperCard papers={sortedResearchPapers} />
              </div>
            </Tab.Panel>

            {/* KOLs */}
            <Tab.Panel>
              {/* <div className={styles.sortContainer}>
                <label className={styles.sortLabel}>Sort by:</label>
                <select
                  className={styles.sortSelect}
                  value={sortOption.kols}
                  onChange={(e) => handleSortChange("kols", e.target.value)}
                >
                  <option value="influence">Influence</option>
                  <option value="publications">Paper Count</option>
                </select>
              </div> */}
              <div className={styles.tabContent}>
                <KOLCard />
              </div>
            </Tab.Panel>

            {/* Clinical Trials */}
            <Tab.Panel>
              {/* <div className={styles.sortContainer}>
                <label className={styles.sortLabel}>Sort by:</label>
                <select
                  className={styles.sortSelect}
                  value={sortOption.trials}
                  onChange={(e) => handleSortChange("trials", e.target.value)}
                >
                  <option value="phase">Trial Phase</option>
                  <option value="status">Status</option>
                </select>
              </div> */}
              <div className={styles.tabContent}>
                <ClinicalTrialsCard />
              </div>
            </Tab.Panel>

          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Dashboard;
