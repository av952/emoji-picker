export const data = [
  {
    symbol: "😁",
    name: "cara feliz",
    keywords: "smiling face happy",
  },
  {
    symbol: "🫀",
    name: "corazon",
    keywords: "corazon heart red",
  },
  {
    symbol: "🔥",
    name: "fire",
    keywords: "fuego fire burn",
  },
  {
    symbol: "💎",
    name: "diamante",
    keywords: "gen stone diamante",
  },
];
const KEY = import.meta.env.VITE_KEY;

//obtener las categorías para mostrarlas como botones en pantalla

export async function categories() {
  const data = await fetch(
    `https://emoji-api.com/categories?access_key=${KEY}`
  );
  const res = await data.json();

  const nameCategori = res.map((el) => el.slug);


  return nameCategori.filter((el) => el != "component");
}

export async function allEmojies() {
  const data = await fetch(`https://emoji-api.com/emojis?access_key=${KEY}`);
  const res = await data.json();

  return res;
}

export async function emojiForCategory(categorie) {

    const data = await fetch(
      `https://emoji-api.com/categories/${categorie}?access_key=${KEY}`
    );
    const res = await data.json();

  return res;
}

/**
 * Extrae todos los carácteres de cada una de las categorias
 */
export async function emojiForCategories() {
    const allCategories = await categories();
    const obj = [];
    for (let i = 0; i < allCategories.length; i++) {
      const data = await fetch(
        `https://emoji-api.com/categories/${allCategories[i]}?access_key=${KEY}`
      );
      const res = await data.json();
      obj.push(res) 
    }
    return obj;
  }

export async function firtsEmoji() {
  const data = await emojiForCategories();

  const emoji = data.map(el => el.slice(0, 1)[0])

  const add  = emoji.map((el,index)=> {
    const temp =el
    temp.id = index
    return temp
  })

  return add;
}
