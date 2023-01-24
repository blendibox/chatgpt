import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [chatInput, setChatInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();



    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat: chatInput  }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setChatInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
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
        <h2>  (ChatGPT) </h2>


        <div className={styles.result}>{result}</div>
         <br/>
        <form onSubmit={onSubmit}>
          <textarea
            name="chat"
            rows="10"
            placeholder="Digite sua pergunta"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <input type="submit" value="Enviar" />
        </form>
       
      </main>
    </div>
  );
}
