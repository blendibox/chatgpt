import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Image() {
  const [imageInput, setimageInput] = useState("");
  const [modificadorInput, setModificador] = useState("");
  const [titleModificador, setTitleModificador] = useState("");
  const [result, setResult] = useState("");

  const [botaoEnviar, setbotaoEnviar] = useState("");

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");



  async function onSubmit(event) {
    event.preventDefault();

    setbotaoEnviar('Processando... Aguarde');

     setImage1('loading.gif');
     setImage2('loading.gif');
     setImage3('loading.gif');
     setImage4('loading.gif');

    try {
      const response = await fetch("/api/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageInput, modificador: modificadorInput  }),
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
           <a href={image1 } download ><img src={image1 || 'gato_sapato_vermelho.png'} className={styles.image}/></a>
           <a href={image2 } download ><img src={image2 || 'misterio_wendy.png'} className={styles.image}/></a>
           <a href={image3 } download ><img src={image3 || 'sansao_aquarela.png'} className={styles.image}/></a>
           <a href={image4 } download ><img src={image4 || 'darth_vader.png'} className={styles.image}/></a>
        </div>
         <br/>
        <form onSubmit={onSubmit}>
          <textarea
            name="image"
            rows="4"
            placeholder="Detalhe a imagem que deseja criar, por exemplo: 'gato branco astronauta usando um tênis vermelho dentro da nave enterprise' "
            value={imageInput}
            onChange={(e) => setimageInput(e.target.value)}
          />   

           <textarea
            name="modificador"
            rows="4"
            className={styles.modificador}
            placeholder="Clique em uma das imagens abaixo para copiar o efeito: "
            value={modificadorInput}
            onChange={(e) => setModificador(e.target.value)}
          />         
           
          <div className={styles.result}>{titleModificador || 'Clique em uma das imagens abaixo para copiar o efeito:'}</div>

          <div className={styles.result}>

            <img src="md/mago_aneis.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('high resolution image render cgi Elegant beautifully rendered aesthetic expression of the Sublime by Android' + 
              ' Jones,  Shepard Fairey, Josephine Wall, Carlo Crivelli, Scott Naismith, Sandra Chevrier, Giotto Di Bondone. high resolution, digital art, fantasy, highly intricate details. ' + 
              ' Perfect composition subtractive lighting, cosmic, mystical, psychedelic vivid dark colors, neon glow; dark sci-fi concept art, intricate hyperdetailed; professional quality, epic, cinematic ' +
              ' hyperrealistic 16k Octane render wide angle design magazine photography, medieval masterwork, hyperdetailed matte painting :: perfect proportions'
              ) , setTitleModificador('Blendibox Style')}}/>


            <img src="md/3d-game.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('trending on Artstation Unreal Engine 3D shading shadow depth'), setTitleModificador('3d Game')} }/>

            <img src="md/anime.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('Studio Ghibli, Anime Key Visual, by Makoto Shinkai, Deep Color, Intricate, 8k resolution concept art, Natural Lighting, Beautiful Composition'), setTitleModificador('Anime')}}/>

            <img src="md/artistic-portrait.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('head and shoulders portrait, 8k resolution concept art portrait by Greg Rutkowski, Artgerm, WLOP, Alphonse Mucha dynamic lighting hyperdetailed intricately detailed Splash art trending on Artstation triadic colors Unreal Engine 5 volumetric lighting') , setTitleModificador('Artistic Portrait')}}/>

            <img src="md/bw-portrait.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('Close up portrait, ambient light, Nikon 15mm f/1.8G, by Lee Jeffries, Alessio Albi, Adrian Kuipers'), setTitleModificador('B&W Portrait')}}/>

            <img src="md/cgi.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('Pixar, Disney, concept art, 3d digital art, Maya 3D, ZBrush Central 3D shading, bright colored background, radial gradient background, cinematic, Reimagined by industrial light and magic, 4k resolution post processing') , setTitleModificador('CGI')}}/>

            <img src="md/color-portrait.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('Close-up portrait, color portrait, Linkedin profile picture, professional portrait photography by Martin Schoeller, by Mark Mann, by Steve McCurry, bokeh, studio lighting, canon lens, shot on dslr, 64 megapixels, sharp focus') , setTitleModificador('Color Portrait')}}/>

            <img src="md/cosmic.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('Mark Brooks and Dan Mumford, comic book art, perfect, smooth') , setTitleModificador('Cosmic')}}/>         

            <img src="md/cyberpunk.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('cyberpunk 2099 blade runner 2049 neon') , setTitleModificador('Cyber Punk')}}/>

            <img src="md/dark-fantasy.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('a masterpiece, 8k resolution, dark fantasy concept art, by Greg Rutkowski, dynamic lighting, hyperdetailed, intricately detailed, Splash screen art, trending on Artstation, deep color, Unreal Engine, volumetric lighting, Alphonse Mucha, Jordan Grimmer, purple and yellow complementary colours'), setTitleModificador('Dark Fantasy')}}/>

            <img src="md/epic.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('Epic cinematic brilliant stunning intricate meticulously detailed dramatic atmospheric maximalist digital matte painting'), setTitleModificador('Epic')}}/>

            <img src="md/heavenly.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('heavenly sunshine beams divine bright soft focus holy in the clouds') , setTitleModificador('Heavenly')}}/>

            <img src="md/modern-comic.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('Mark Brooks and Dan Mumford, comic book art, perfect, smooth'), setTitleModificador('Modern Comic')}}/>

            <img src="md/neo-impressionist.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador('neo-impressionism expressionist style oil painting, smooth post-impressionist impasto acrylic painting, thick layers of colourful textured paint') , setTitleModificador('Neo Impressionist')}}/>

            <img src="md/oil-painting.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador(' oil painting by James Gurney') , setTitleModificador('Oil Painting')}}/>

            <img src="md/photo.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador(' Professional photography, bokeh, natural lighting, canon lens, shot on dslr 64 megapixels sharp focus') , setTitleModificador('Photo')}}/>

            <img src="md/pop-art.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador(' Screen print, pop art, splash screen art, triadic colors, digital art, 8k resolution trending on Artstation, golden ratio, symmetrical, rule of thirds, geometric bauhaus') , setTitleModificador('Pop Art')}}/>

            <img src="md/sinister.jpg"  className={styles.pixel}  
            onClick={(e) => {setModificador(' sinister by Greg Rutkowski') , setTitleModificador('Sinister')}}/>



            
            


           </div>
           
          <input type="submit" value={botaoEnviar || 'Enviar'} id="enviar" />
        </form>
        <div  className={styles.result}>
          <a href="/chat" className={styles.botaoLink}>Converse com a IA</a> | <a className={styles.botaoLink} href="https:\\www.blendibox.com.br">Loja Blendibox</a>
        </div>
       
      </main>
    </div>
  );
}
