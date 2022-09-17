import style  from './style.module.scss'

export const EmojiBtn = ({emoji,onclick}) => {
    function handleClick(){
        onclick(emoji)
    }
  return (
    <>
    <button className={style.emojiButton} onClick={handleClick}>{emoji}</button>
    </>
  )
}
