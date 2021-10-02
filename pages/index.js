import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import RenderImages from "../components/RenderImages";

export default function Home() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    axios
      .get("/api/image")
      .then((result) => {
        result = result.data.data;
        console.log(result);
        setImages(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>My Unsplash</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-5 mx-3">
        <RenderImages images={images} />
      </div>
    </div>
  );
}
