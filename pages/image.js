import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Image() {
  const [imageInput, setimageInput] = useState("");
  const [result, setResult] = useState();

  const [botaoEnviar, setbotaoEnviar] = useState();

  const [image1, setImage1] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();
  const [image4, setImage4] = useState();



  async function onSubmit(event) {
    event.preventDefault();
    setbotaoEnviar('Processando... Aguarde');

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
        setbotaoEnviar('Enviar');


      setimageInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
       setbotaoEnviar('Enviar');
      setResult(error.message);
     // alert(error.message);
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
        <h4>(crie sua imagem com chatGPT)</h4>

        <div className={styles.result}>
           <a href={image1} targer="_blank" ><img src={image1} className={styles.image}/></a>
           <a href={image2} targer="_blank" ><img src={image2} className={styles.image}/></a>
           <a href={image3} targer="_blank" ><img src={image3} className={styles.image}/></a>
           <a href={image4} targer="_blank" ><img src={image4} className={styles.image}/></a>
        </div>
         <br/>
        <form onSubmit={onSubmit}>
          <textarea
            name="image"
            rows="6"
            placeholder="Detalhe a imagem que deseja criar, por exemplo: 'gato branco astronauta usando um tênis vermelho dentro da nave enterprise' "
            value={imageInput}
            onChange={(e) => setimageInput(e.target.value)}
          />
          <input type="submit" value={botaoEnviar || 'Enviar'} id="enviar" />
        </form>
        <div  className={styles.result}>
          <a href="/chat" className={styles.botaoLink}>Converse com a IA</a> | <a className={styles.botaoLink} href="https:\\www.blendibox.com.br">Loja Blendibox</a>
        </div>

         <small> <br/> <b>Aviso Importante:</b> <br/> As informações passadas pela IA é apenas para entretenimento. <br/> Nada do que for dito por ela corresponde a um compromisso da Empresa. 
       <br/> Lembre-se: Ela foi programada para vender a você, então, vai usar de recursos "não humanos" para isso. <br/> 
       Não leve a sério nada do que ela te disser! 
       </small>
       
      </main>
    </div>
  );
}
