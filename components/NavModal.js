import styles from "../styles/navbar.module.css";
import axios from "axios";
import { useState } from "react";
import Loader from "./Loader";
import { useStore } from "../store";
import { useAsync, validURL } from "../utils";

export default function NavModal({ setModal, modal }) {
  const [cache, dispatch] = useStore();
  const [form, setForm] = useState({
    label: "",
    url: "",
    labelError: "",
    urlError: "",
  });
  const { run, status } = useAsync();
  const { label, url, labelError, urlError } = form;

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
      setForm({ ...form, urlError: "", labelError: "" });
    }
    run(
      axios
        .post("/api/image", {
          label: form.label,
          imageUrl: form.url,
        })
        .then((result) => {
          dispatch({ type: "ADD_IMAGE", data: result.data.data });
          setForm({ ...form, label: "", url: "" });
          console.log(result.data.data);
        })
        .then(() => setModal(false))
        .catch((err) => {
          console.log(err);
          setForm({ ...form });
        })
    );
  }

  function onFormChange(e, field) {
    const value = e.target.value;
    setForm({ ...form, [field]: value });
  }

  const loading = status === "pending";

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
              value={label}
              onChange={(e) => onFormChange(e, "label")}
              className={urlError.length === 0 ? "" : styles.error}
              placeholder="Suspendisse elit massa"
            />
            {labelError.length === 0 ? (
              ""
            ) : (
              <small className={styles.text_error}>{labelError}</small>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="photo-label">Photo URL</label>
            <input
              value={url}
              className={labelError.length === 0 ? "" : styles.error}
              onChange={(e) => onFormChange(e, "url")}
              placeholder="https://images.unsplash.com/photo-1584395630827-860eee694d7b?ixlib=r..."
            />
            {urlError.length === 0 ? (
              ""
            ) : (
              <small className={styles.text_error}>{urlError}</small>
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
            <div>{loading ? "Loading.." : "Submit"}</div>
          </div>
        </div>

        <Loader condition={loading} />
      </div>
    </div>
  );
}
