import { useEffect } from "react";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import { firtsEmoji, emojiForCategories } from "./data";
import { EmojiBtn } from "./EmojiBtn";
import { EmojiSearch } from "./EmojiSearch";
/**Styles */
import style from "./style.module.scss";
/**data */
//asignacion =[]

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
  //nuevo array con los elementos seleccionados
  const[arrEmoji,setArrEmoji]= useState([])

  useEffect(() => {
    async function data() {
      //const allEmojis = await allEmojies();
      //setcategories(cat)()

      const theCat = await firtsEmoji();
      const characters = theCat.map((el) => el.character);
      setcategories(characters);
      setAllCategories(theCat);
      //asignacion = theCat.map((el, index) => (el = index));

      const TodasCatSeparadas = await emojiForCategories();
      setEmojis(TodasCatSeparadas);
      setAllEmojis(()=>TodasCatSeparadas);


    }
  
    
    data();
    
    // window.addEventListener('click', (e)=>{
      
      //     if(!containerRef.current.contains(e.target)){
        //         setIsOpene(false)
        //         setAllEmojis(allEmojies)
        //     }
        // })
      }, []);

      useEffect(()=>{
        setArrEmoji(()=>allEmojis[id])
      },[id])

  function handleClickOpen() {
    setIsOpene(!isOpen);
    setId(()=>0)
  }

  /**
   * BUSCAR LOS EMOJIS
   */

  function handleSearch(e) {
    setLoad(false);
    setValue(e.target.value);
    
    try {
      const q = e.target.value.toLocaleLowerCase();
      
      try {
        if (!!q) {
          const search = arrEmoji.filter((el) =>
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
    //obtner la posici??n del elemento
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
    //setEmojis(arrEmoji);
    setLoad(true);
    obtenerDatos(e.target.value);
  }

  /**Obtenemos los datos y enviamos la id a setID */

  function obtenerDatos(ele) {

    try {
      //buscamos entre todos los elementos de todas las categorias, el que corresponda con el emoji seleccionado y extraemos el id, con el que obtenemos la pocici??n de los elementos dentro del array.
      const res = allCategories.find((cat) => cat.character == ele);
      //alamacenamos la respuesta en el useState ID
      setId(() => res?.id);
      //NewArrEmoji()
    } catch (error) {
      console.log("error obtener datos", error);
    }
  }

  /**
   * Generar nuevo array
   */
  // function NewArrEmoji(){
  //   setArrEmoji(()=>allEmojis[id])
  // }

  /////////////

  function LoadEmojis() {
    return arrEmoji?.map((el, index) => {
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
   * RETORNO DE INFORMACI??N
   */

  return (
    <div ref={containerRef} className={style.inputContainer}>
      {emojis.length > 0 ? (
        <button className={style.emojiPickerButton} onClick={handleClickOpen}>
          ????
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
