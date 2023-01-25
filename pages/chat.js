import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [chatInput, setChatInput] = useState("");
  const [result, setResult] = useState();
  const [botaoEnviar, setbotaoEnviar] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    setbotaoEnviar('Processando... Aguarde');


    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat: 'IA: ' + chatInput  }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setbotaoEnviar('Enviar');
      setResult(data.result);
      setChatInput("");
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
        <title>Ajuda Blendibox - ChatGPT</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>IA  Blendibox</h3>
        <h4>  (ChatGPT) </h4>

        <div className={styles.result}>{result}</div>
         <br/>

        <form onSubmit={onSubmit}>
          <textarea
            name="chat"
            rows="6"
            placeholder="Humano: Digite sua pergunta sobre um produto da Loja Blendibox"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />

          <input type="submit"  value={botaoEnviar || 'Enviar'} id="enviar" />
        </form>
        <div  className={styles.result}>
          <a href="/image" className={styles.botaoLink}>Crie uma imagem</a> | <a className={styles.botaoLink} href="https:\\www.blendibox.com.br">Loja Blendibox</a>
        </div>
       
       <small> <br/> <b>Aviso Importante:</b> <br/> As informações passadas pela IA é apenas para entretenimento. <br/> 
       Nada do que for dito por ela corresponde a um compromisso da Empresa. 
      <br/> Lembre-se: Ela foi programada para vender a você, então, vai usar de recursos "não humanos" para isso. <br/> 
       Não leve a sério nada do que a IA te disser! 
       </small>

      </main>
    </div>
  );
}
