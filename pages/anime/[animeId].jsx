import axios from 'axios';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import NavBar from '../../Components/Home/NavBar';

const AnimeRender = () => {
    const [animeData, setAnimeData] = useState({
        title: {
            english: "",
            romaji: ""
        }
    })
    const Router = useRouter();

    const { animeId } = Router.query;

    useEffect(() => {
        const onLoad = async () => {
            const queryAnime = `
            query ($id:Int) {
               Media(type: ANIME, id: $id) {
                 id
                 title {
                   romaji
                   english
                 }
                 coverImage {
                   large
                 }
               }
           }
           `;

            const url = "https://graphql.anilist.co";

            try {
                console.log(animeId)
                const data = await axios.post(url, {
                    query: queryAnime,
                    variables: { id: animeId },
                });

                console.log(data.data.data.Media);
                setAnimeData(data.data.data.Media);
            } catch (e) {
                console.log(e);
            }
        }

        onLoad();

    }, [animeId]);

    return (
        <div>
            <NavBar isSearch={false} searchAnimeDatasFn={undefined} />
            <div className='min-h-[calc(100vh-3rem)] bg-zinc-900 w-screen flex flex-col items-center'>
                <div className='w-[90vw] max-w-[80rem] flex flex-col items-left mt-28'>
                    <h2 className='text-white text-[2.5rem]'>
                        {animeData.title.english ? animeData.title.english : animeData.title.romaji}
                    </h2>
                </div>
            </div>
        </div>
    )
}

export default AnimeRender