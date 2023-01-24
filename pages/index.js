import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>IA Blendibox</h3>

         <div className={styles.result}>
         IA: Olá! Meu nome é AI Assistant e estou aqui para ajudar você a encontrar exatamente o que precisa.<br/> IA: Por trás desta há uma equipe dedicada de profissionais que se esforçam para garantir que tudo funcione sem problemas. Vamos começar?
         </div>

         <div  className={styles.result}>
          <br/> 
          <a href="/chat" className={styles.botaoLink}>Conversar com a IA</a> 
          <br/> <br/>
            <a href="/image" className={styles.botaoLink}>Gerar nova imagem </a> 
          <br/> <br/>
          <a className={styles.botaoLink} href="https:\\www.blendibox.com.br">Loja Blendibox</a>
           <br/> <br/>
        </div>
      </main>
    </div>
  );
}
