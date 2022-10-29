import axios from "axios";
import { useContext, useEffect, useState, useRef } from "react";
import AnimeCard from "../Components/AnimeCard";
import NavBar from "../Components/Home/NavBar";
import Context from "../Context/Context";

const Fav = () => {
  const RefCtx = useRef(useContext(Context));
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const onLoad = async () => {
      try {
        const url = "https://graphql.anilist.co";

        const queryFavAnime = `
        query ($id: Int) {
          Media(type: ANIME, id:$id) {
            id
            title {
              romaji
              english
            }
            coverImage{
              large
           }
          }
        }
        `;

        const favData = [];

        await Promise.all(RefCtx.current.favs.map(async (item) => {
          const data = await axios.post(url, {
            query: queryFavAnime,
            variables: { id: item.animeId },
          });
          favData.push(data.data.data.Media);
        }));

        setFavs([...favData]);
      } catch (e) {
        console.log(e);
      }
    };

    onLoad();
  }, []);

  return <div>
    <NavBar searchAnimeDatasFn={undefined} isSearch={false} />
    <div className="bg-black min-h-[calc(100vh-3rem)] flex justify-center">
      <ul className="flex w-[90vw] max-w-[80rem] mt-16">
        {favs.map((item, index) => {
          return <AnimeCard key={item.id} id={item.id} titleEnglish={item.title.english} titleRomaji={item.title.romaji} imageUrl={item.coverImage.large} />
        })}
      </ul>
    </div>
  </div>;
};

export default Fav;
