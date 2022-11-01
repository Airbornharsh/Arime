import axios from 'axios';
import { GetStaticProps } from 'next';
import React from 'react'
import AnimeList from '../Components/AnimeList';
import NavBar from '../Components/Home/NavBar';

const TopAnime = ({ topAnimeDatas }) => {
    return (
        <>
            <NavBar searchAnimeDatasFn={undefined} isSearch={false} />
            <div className='min-h-[calc(100vh-3rem)] bg-zinc-900 w-screen flex flex-col items-center'>
                <AnimeList Datas={topAnimeDatas} heading={"Top Anime"} />
            </div>
        </>
    )
}

export const getStaticProps = async () => {
    const queryTopAnime = `
    query ($page: Int,$perPage: Int) {
      Page(page: $page,perPage: $perPage) {
        media(type: ANIME, popularity_greater: 100000) {
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
    }
    
    `;

    const url = "https://graphql.anilist.co";


    try {
        const topAnimeDatasCollection = await axios.post(url, {
            query: queryTopAnime,
            variables: { page: 1, perPage: 100 },
        });
        return {
            props: {
                topAnimeDatas: topAnimeDatasCollection.data.data.Page.media
            }
        }

    } catch (e) {
        console.log(e);
        return {
            props: {
                topAnimeDatas: [{}]
            }
        }
    }


}

export default TopAnime