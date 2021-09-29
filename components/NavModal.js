import styles from "../styles/navbar.module.css";

export default function NavModal({ setModal, modal }) {
  return (
    <div
      className={`${styles.modal} ${modal ? "" : styles.hidden}`}
      onClick={() => setModal(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={styles.modal_content}
      >
        <div className={styles.modal_title}>Add a new photo</div>
        <div className={styles.input_form}>
          <div className={styles.input_group}>
            <label htmlFor="photo-label">Label</label>
            <input placeholder="Suspendisse elit massa" />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="photo-label">Photo URL</label>
            <input placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..." />
          </div>
        </div>
        <div className={styles.modal_action}>
          <div
            className={styles.modal_action_cancel}
            onClick={() => setModal(false)}
          >
            Cancel
          </div>
          <div className={styles.modal_action_btn}>
            <div>Submit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
