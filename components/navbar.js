import Image from "next/image";
import { useState } from "react";
import styles from "../styles/navbar.module.css";
import Head from "next/head";
import NavModal from "./NavModal";

export default function Navbar() {
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false);

  function onAddPhoto() {
    setModal(!modal);
  }

  function onModalContentClick(e) {
    e.stopPropagation();
  }

  function onToggle() {}

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
              <input
                className={styles.nav_input}
                type="text"
                placeholder="Search by name"
              />
            </div>
          </div>
          <div>
            <div onClick={onAddPhoto} className={styles.nav_btn}>
              <div>Add a photo</div>
            </div>
          </div>
        </div>
      </nav>
      <div className="d-flex justify-content-end mr-3">
        <div className="my-2 mx-3">
          <input
            className={styles.nav_input}
            type="text"
            placeholder="Search by name"
          />
        </div>
      </div>
      <>
        <NavModal setModal={setModal} modal={modal} />
      </>
    </>
  );
}
