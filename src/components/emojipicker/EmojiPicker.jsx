import { useEffect } from "react";
import { useRef, useState } from "react";
import { forwardRef } from "react";
import {firtsEmoji, emojiForCategories } from "./data";
import { EmojiBtn } from "./EmojiBtn";
import { EmojiSearch } from "./EmojiSearch";
/**Styles */
import style from "./style.module.scss";
/**data */
import { allEmojies } from "./data";

export function EmojiPicker(props, ref) {
  const [isOpen, setIsOpene] = useState(false);
  const [emojis, setEmojis] = useState([]);
  const containerRef = useRef(null);
  const [categori, setcategories] = useState([]);
  const [allEmojis, setAllEmojis] = useState([]);

  const [allCategories,setAllCategories]=useState([])
  const [id,setId]= useState(0)

  let asignacion = []

  useEffect(() => {
    async function data() {
      //const allEmojis = await allEmojies();
      //setcategories(cat)()

      const theCat = await firtsEmoji()
      const characters = theCat.map(el=>el.character)
      setcategories(characters);
      setAllCategories(theCat)
      //setEmojis(theCat)
      
      asignacion = theCat.map((el,index)=>el = index)

      const TodasCatSeparadas = await emojiForCategories();
      setEmojis(TodasCatSeparadas);
      setAllEmojis(TodasCatSeparadas);
      
      const allCategories = await emojiForCategories()
      //setAllCategories(allCategories)
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

  function handleSearch(e) {
    console.log("🚀 ~ file: EmojiPicker.jsx ~ line 43 ~ data ~ emojis", emojis)
    console.log("🚀 ~ file: EmojiPicker.jsx ~ line 43 ~ data ~ ALLL", allEmojis)

    try {
      const q = e.target.value.toLocaleLowerCase();
      console.log(q);
      console.log(emojis[id]);
      if (!!q) {
        console.log('ingresooooo');
        const search = emojis[id].filter((el) =>
          el.slug.toLocaleLowerCase().includes(q)
        );
        console.log(4444,[search][id]);
       setEmojis(()=>[search]);
       return
      } else {
        console.log('out');
        setEmojis(()=>allEmojis);
      }
      
      console.log(66,emojis[id]);
      
    } catch (error) {
        console.log('mi error',error);
    }

  }

  function handleOnclickEmoji(emoji) {
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
    console.log(e.target.value);
    // setSelection(e.target.value);
    obtenerDatos(e.target.value)
  }

  /**Obtenemos los datos y enviamos la id a setID */

  function obtenerDatos(ele){
    const res = allCategories.find(cat => {
      if(cat.character == ele){
        
        return cat.id
      }
    })
    
    setId(()=>res.id)
    
    
  }
  console.log("🚀 ~ file: EmojiPicker.jsx ~ line 43 ~ data ~ emojis", emojis[id])
  console.log("🚀 ~ file: EmojiPicker.jsx ~ line 43 ~ data ~ ALLL", allEmojis)

  return (
    <div ref={containerRef} className={style.inputContainer}>

      {emojis.length >0 ? 
      <button className={style.emojiPickerButton} onClick={handleClickOpen}>
        😁
      </button>
      :<h2>Loading...</h2>
      
    }
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
          <EmojiSearch onSearch={handleSearch} />

          <div className={style.emojisList}>

            {
            emojis.map((el,index)=>{
              el.map(el =>{
                console.log(9,el);
                return(
                <EmojiBtn
                key={index}
                emoji={el.character}
                onclick ={handleOnclickEmoji}
                >
                </EmojiBtn>
                )
              })
            })
          }

          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default forwardRef(EmojiPicker);

