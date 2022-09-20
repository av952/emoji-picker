import { useState } from "react"
import style  from './style.module.scss'

export const EmojiSearch = ({onSearch,valor}) => {
    const[value,setvalue]= useState('')

    function handleChange(e){
        setvalue(e.target.value)
        onSearch(e)
    }
  return (
    <input className={style.search} type="text" value={valor} onChange={handleChange} />
  )
}
