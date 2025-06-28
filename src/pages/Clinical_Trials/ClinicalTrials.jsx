import ClinicalTrialsCard from "../../components/Tabs/ClinicalTrialsCard"
import styles from "../basic.module.css";
import Navbar from "../../components/Tabs/Navbar";

const ClinicalTrails = () => {

  return (
    <div className={styles.boxBody}>
      <Navbar />
    <h1 className={styles.heading}>CLINICAL TRIALS!</h1>
    <div>
        <div className={styles.outerBox}>
          <ClinicalTrialsCard />
        </div>
    </div>  
    </div>
  );
};

export default ClinicalTrails;
