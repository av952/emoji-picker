import { useEffect } from "react";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import { firtsEmoji, emojiForCategories } from "./data";
import { EmojiBtn } from "./EmojiBtn";
import { EmojiSearch } from "./EmojiSearch";
/**Styles */
import style from "./style.module.scss";
/**data */

export function EmojiPicker(props, ref) {
  const [isOpen, setIsOpene] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const containerRef = useRef(null);
  const [categori, setcategories] = useState([]);
  const [allEmojis, setAllEmojis] = useState([]);

  const [allCategories, setAllCategories] = useState([]);
  const [id, setId] = useState(0);
  //cargar emojis
  const [load, setLoad] = useState(true);
  //para resetear el value del search
  const [value, setValue] = useState("");

  let asignacion = [];

  useEffect(() => {
    async function data() {
      //const allEmojis = await allEmojies();
      //setcategories(cat)()

      const theCat = await firtsEmoji();
      const characters = theCat.map((el) => el.character);
      setcategories(characters);
      setAllCategories(theCat);
      asignacion = theCat.map((el, index) => (el = index));

      const TodasCatSeparadas = await emojiForCategories();
      setEmojis(TodasCatSeparadas);
      setAllEmojis(TodasCatSeparadas);
    }

    data();

    // window.addEventListener('click', (e)=>{

    //     if(!containerRef.current.contains(e.target)){
    //         setIsOpene(false)
    //         setAllEmojis(allEmojies)
    //     }
    // })
  }, []);

  function handleClickOpen() {
    setIsOpene(!isOpen);
  }

  /**
   * BUSCAR LOS EMOJIS
   */

  function handleSearch(e) {
    setLoad(false);
    setValue(e.target.value);
    console.log(load);
    
    try {
      const q = e.target.value.toLocaleLowerCase();
      
      try {
        console.log('handle emojis',emojis[0]);
        console.log('handle emojis 2',allEmojis);
        if (!!q) {
          const search = emojis[0].filter((el) =>
          el.slug.toLocaleLowerCase().includes(q)
          );
          setEmojis(()=>[search]);
        } else {
          setEmojis(allEmojis);
          setLoad(true);
        }

      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log("mi error", error);
    }
  }

  function handleOnclickEmoji(emoji) {
    setValue("");
    //obtner la posición del elemento
    const cursorPosition = ref.current.selectionStart;

    const text = ref.current.value;
    const prev = text.slice(0, cursorPosition);
    const next = text.slice(cursorPosition);

    ref.current.value = prev + emoji + next;
    ref.current.selectionStart = cursorPosition + emoji.length;
    ref.current.selectionEnd = cursorPosition + emoji.length;
    ref.current.focus();
  }

  function handleClickoption(e) {
    setValue("");
    setEmojis(allEmojis);
    console.log(57, value);
    setLoad(true);
    obtenerDatos(e.target.value);
  }

  /**Obtenemos los datos y enviamos la id a setID */

  function obtenerDatos(ele) {

    try {
      //buscamos entre todos los elementos de todas las categorias, el que corresponda con el emoji seleccionado y extraemos el id, con el que obtenemos la pocición de los elementos dentro del array.
      const res = allCategories.find((cat) => cat.character == ele);
      //alamacenamos la respuesta en el useState ID
      setId(() => res?.id);
    } catch (error) {
      console.log("error obtener datos", error);
    }
  }

  function LoadEmojis() {
    return emojis[id].map((el, index) => {
      return (
        <EmojiBtn
          key={index}
          emoji={el.character}
          onclick={handleOnclickEmoji}
        ></EmojiBtn>
      );
    });
  }

  function Search() {
    return emojis[0].map((el, index) => {
      return (
        <EmojiBtn
          key={index}
          emoji={el.character}
          onclick={handleOnclickEmoji}
        ></EmojiBtn>
      );
    });
  }

  /**
   * RETORNO DE INFORMACIÓN
   */

  return (
    <div ref={containerRef} className={style.inputContainer}>
      {emojis.length > 0 ? (
        <button className={style.emojiPickerButton} onClick={handleClickOpen}>
          😁
        </button>
      ) : (
        <h2>Loading...</h2>
      )}
      {isOpen ? (
        <div className={style.emojiPickerContainer}>
          <div className={style.containerbtn}>
            {categori.map((el, index) => (
              <div key={index}>
                <input
                  className={style.containerbtn}
                  type="button"
                  onClick={handleClickoption}
                  value={el}
                />
              </div>
            ))}
          </div>
          <EmojiSearch valor={value} onSearch={handleSearch} />

          <div className={style.emojisList}>
            {/* Hace falta que cargue vistas diferentes para cuando se hace la busqueda y cuando se muestran todos los emojis */}
            {load ? <LoadEmojis /> : <Search />}|
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default forwardRef(EmojiPicker);
