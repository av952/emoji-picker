import { useRef } from "react"
import EmojiPicker from "./EmojiPicker"
import style from './style.module.scss'

export const EmojiPikerInput = () => {
    const ref = useRef(null)
  return (
    <div>
        {/* <input className={style.search1} ref={ref} type="text"  /> */}
        <textarea placeholder="Ya puede empezar a escribir..." className={style.search1} ref={ref} cols="30" rows="10"></textarea>
        <EmojiPicker ref={ref}/>
    </div>
  )
}
