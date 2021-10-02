import styles from "../styles/navbar.module.css";
import axios from "axios";
import { useState } from "react";

export default function NavModal({ setModal, modal }) {
  const [form, setForm] = useState({
    label: "",
    url: "",
    labelError: "",
    urlError: "",
    loading: false,
  });

  const { label, url, labelError, urlError, loading } = form;

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  function handleSubmit() {
    if (form.label.length < 1 && !validURL(form.url)) {
      setForm({
        ...form,
        labelError: "Label field is required",
        urlError: "Invalid Url",
      });
      return;
    } else if (form.label.length < 1) {
      setForm({ ...form, labelError: "Label field is required", urlError: "" });
      return;
    } else if (!validURL(form.url)) {
      setForm({ ...form, urlError: "Invalid Url", labelError: "" });
      return;
    } else {
      setForm({ ...form, urlError: "", labelError: "", loading: true });
    }
    axios
      .post("/api/image", {
        label: form.label,
        imageUrl: form.url,
      })
      .then((result) => {
        setForm({ ...form, loading: false, label: "", url: "" });
        console.log(result);
      })
      .then(() => setModal(false))
      .catch((err) => {
        console.log(err);
        setForm({ ...form, loading: false });
      });
  }

  function onFormChange(e, field) {
    const value = e.target.value;
    setForm({ ...form, [field]: value });
  }

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
            <input
              value={form.label}
              onChange={(e) => onFormChange(e, "label")}
              className={form.urlError.length === 0 ? "" : styles.error}
              placeholder="Suspendisse elit massa"
            />
            {form.labelError.length === 0 ? (
              ""
            ) : (
              <small className={styles.text_error}>{form.labelError}</small>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="photo-label">Photo URL</label>
            <input
              value={form.url}
              className={form.labelError.length === 0 ? "" : styles.error}
              onChange={(e) => onFormChange(e, "url")}
              placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
            />
            {form.urlError.length === 0 ? (
              ""
            ) : (
              <small className={styles.text_error}>{form.urlError}</small>
            )}
          </div>
        </div>
        <div className={styles.modal_action}>
          <div
            className={styles.modal_action_cancel}
            onClick={() => setModal(false)}
          >
            Cancel
          </div>
          <div onClick={handleSubmit} className={styles.modal_action_btn}>
            <div>{form.loading ? "Loading.." : "Submit"}</div>
          </div>
        </div>

        {loading ? (
          <div className="loader-modal">
            <div className="loader-modal-content-cont">
              <div className="loader-modal-content"></div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
