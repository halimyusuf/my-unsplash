import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import RenderImages from "../components/RenderImages";
import { useAsync } from "../utils/index";
import Loader from "../components/Loader";
import { useStore } from "../store";

export default function Home() {
  // const [images, setImages] = useState([]);
  const [cache, dispatch] = useStore();
  const { run, status, error, data, setData } = useAsync({ data: [] });
  useEffect(() => {
    run(
      axios
        .get("/api/image")
        .then((result) => {
          result = result.data.data;
          console.log(result);
          dispatch({ type: "ADD_IMAGES", data: result });
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }, [dispatch, run]);

  const images = Object.values(cache.images);
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
      <Loader condition={status === "pending"} />
    </div>
  );
}
