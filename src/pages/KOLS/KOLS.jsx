import KOLSCard from "../../components/Tabs/KOLSCard";
import Navbar from "../../components/Tabs/Navbar";
import styles from "../basic.module.css";

const KOLS = () => {

  return (
    <div className={styles.boxBody}>
      <Navbar />
    <h1 className={styles.heading}>Key Opinion Leaders!</h1>
    <div>
        <div className={styles.outerBox}>
          <KOLSCard />
        </div>
    </div>  
    </div>
  );
};

export default KOLS;
