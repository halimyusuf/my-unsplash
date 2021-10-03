import Image from "next/image";
import axios from "axios";
import { cloneElement, useState } from "react";
import styles from "../styles/navbar.module.css";
import Head from "next/head";
import NavModal from "./NavModal";
import { useAsync } from "../utils";
import { useStore } from "../store";
import Loader from "./Loader";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { data, error, status, run, setError } = useAsync();
  const [cache, dispatch] = useStore();

  function onAddPhoto() {
    setModal(!modal);
  }

  function onModalContentClick(e) {
    e.stopPropagation();
  }

  function onToggle() {}

  function onFormSubmit(e) {
    e.preventDefault();
    console.log(searchValue);
    // http://localhost:3000/api/image/search?q=room
    run(
      axios
        .get(`/api/image/search?q=${searchValue}`)
        .then((result) => {
          console.log(result);
          dispatch({ type: "SEARCH_FILTER", data: result.data.data });
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        })
    );
  }

  return (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <nav className={styles.nav}>
        <div className={styles.nav_inner}>
          <div className={styles.left_nav}>
            <div>
              <Image
                src="/my_unsplash_logo.svg"
                alt="..."
                width="150"
                height="40"
              />
            </div>
            <div>
              <form onSubmit={(e) => onFormSubmit(e)}>
                <input
                  className={styles.nav_input}
                  value={searchValue}
                  type="text"
                  placeholder="Search by name"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div>
            <div onClick={onAddPhoto} className={styles.nav_btn}>
              <div>Add a photo</div>
            </div>
          </div>
        </div>
      </nav>
      <div className={`d-flex justify-content-end mr-3 ${styles.hide_for_md}`}>
        <div className="my-2 mx-3">
          <form onSubmit={(e) => onFormSubmit(e)}>
            <input
              value={searchValue}
              className={styles.nav_input}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search by name"
            />
          </form>
        </div>
      </div>
      <>
        <NavModal setModal={setModal} modal={modal} />
      </>
      <Loader condition={status === "pending"} />
    </>
  );
}
