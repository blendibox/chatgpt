import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [imageInput, setimageInput] = useState("");
  const [result, setResult] = useState();

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();

  async function onSubmit(event) {
    event.preventDefault();



    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageInput  }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.data);

        setImage1(data.data[0].url);
        setImage2(data.data[1].url);
        setImage3(data.data[2].url);
        setImage4(data.data[3].url);

      setimageInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }






  }


  return (

    <div>
      <Head>
        <title>Ajuda Blendibox - imageGPT</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>IA  Blendibox </h3>
        <h4>(chatGPT image)</h4>

        <div className={styles.result}>
           <a href={image1} ><img src={image1} className={styles.image}/></a>
           <a href={image2} ><img src={image2} className={styles.image}/></a>
           <a href={image3} ><img src={image3} className={styles.image}/></a>
           <a href={image4} ><img src={image4} className={styles.image}/></a>
        </div>
         <br/>
        <form onSubmit={onSubmit}>
          <textarea
            name="image"
            rows="10"
            placeholder="Detalhe a imagem que deseja criar, por exemplo: 'gato branco astronauta usando um tênis da vermelho dentro da nave enterprise' "
            value={imageInput}
            onChange={(e) => setimageInput(e.target.value)}
          />
          <input type="submit" value="Enviar" />
        </form>
       
      </main>
    </div>
  );
}
