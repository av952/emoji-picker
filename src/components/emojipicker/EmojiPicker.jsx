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

  const [selecction, setSelection] = useState("smileys-emotion");


  let asignacion = []

  useEffect(() => {
    async function data() {
      const allEmojis = await allEmojies();
      //setcategories(cat)()

      const theCat = await firtsEmoji()
      const characters = theCat.map(el=>el.character)
      setcategories(characters);
      setAllCategories(theCat)
      
      asignacion = theCat.map((el,index)=>el = index)

      const emocat = await emojiForCategories(selecction);
      setEmojis(emocat);
      setAllEmojis(emocat);

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
    const q = e.target.value.toLocaleLowerCase();

    if (!!q) {
      const search = emojis.filter((el) =>
        el.slug.toLocaleLowerCase().includes(q)
      );
      setEmojis(search);
    } else {
      setEmojis(allEmojis);
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

  function obtenerDatos(ele){
      
    const res = allCategories.find(cat => {
      if(cat.character == ele){
        return cat.id
      }
    })
    console.log("🚀 ~ file: EmojiPicker.jsx ~ line 101 ~ res ~ cat", res)

    setId(res.id)

  }

  return (
    <div ref={containerRef} className={style.inputContainer}>
      <button className={style.emojiPickerButton} onClick={handleClickOpen}>
        😁
      </button>
      {isOpen ? (
        <div className={style.emojiPickerContainer}>
          <div className={style.containerbtn}>
            {categori.map((el, index) => (
              <div key={index}>
                <input
                  className="containerbtn"
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

            emojis[id].map((el,index)=>{
              return(
              <EmojiBtn
              key={index}
              emoji={el.character}
              onclick ={handleOnclickEmoji}
              >
              </EmojiBtn>
              )
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

// function EmojiPickerContainer() {
//   return (
//     <div>
//       <EmojiSearch onSearch={handleSearch} />
//       <div>
//         {emojiList.map((el) => (
//           <div key={el.id}>{el.symbol}</div>
//         ))}
//       </div>
//     </div>
//   );
// }
