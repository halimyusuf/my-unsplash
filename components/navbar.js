import Image from "next/image";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav_inner}>
        <div className={styles.left_nav}>
          <Image
            src="/my_unsplash_logo.svg"
            alt="..."
            width="150"
            height="40"
          />
          <div>
            <input type="text" placeholder="Search by name" />
          </div>
        </div>
        <div>
          <div className={styles.nav_btn}>
            {" "}
            <div>Add a photo</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
