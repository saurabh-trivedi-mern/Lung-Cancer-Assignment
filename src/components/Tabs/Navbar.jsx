import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.header}>
        <div className={styles.title}>Lung Cancer Dashboard</div>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className={styles.navLinks}>
        <div className={`${styles.menu} ${menuOpen ? styles.showMenu : ""}`}>
        <button
          onClick={() => handleNavigate("/")}
          className={`${styles.navButton} ${isActive("/") ? styles.active : ""}`}
        >
          Dashboard
        </button>

        <button
          onClick={() => handleNavigate("/researchpapers")}
          className={`${styles.navButton} ${isActive("/researchpapers") ? styles.active : ""}`}
        >
          Research Papers
        </button>

        <button
          onClick={() => handleNavigate("/kols")}
          className={`${styles.navButton} ${isActive("/kols") ? styles.active : ""}`}
        >
          KOLs
        </button>

        <button
          onClick={() => handleNavigate("/clinicaltrials")}
          className={`${styles.navButton} ${isActive("/clinicaltrials") ? styles.active : ""}`}
        >
          Clinical Trials
        </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
