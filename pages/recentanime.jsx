import axios from 'axios'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import AnimeList from '../Components/AnimeList'
import NavBar from '../Components/Home/NavBar'

const RecentAnime = ({ recentCompletedAnimeDatas }) => {
    
    return (
        <>
            <NavBar searchAnimeDatasFn={undefined} isSearch={false} />
            <div className='min-h-[calc(100vh-3rem)] bg-zinc-900 w-screen flex flex-col items-center'>
                <AnimeList Datas={recentCompletedAnimeDatas} heading={"Recent Animes"} />
            </div>
        </>
    )
}

export const getStaticProps = async () => {
    const queryRecentCompletedAnime = `
    query ($page: Int,$perPage: Int) {
        Page(page: $page,perPage: $perPage) {
          media(type: ANIME,status: FINISHED,sort:END_DATE_DESC,format:TV) {
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
        const recentCompletedAnimeDatasCollection = await axios.post(url, {
            query: queryRecentCompletedAnime,
            variables: { page: 2, perPage: 100 },
        });
        return {
            props: {
                recentCompletedAnimeDatas: recentCompletedAnimeDatasCollection.data.data.Page.media,
            }
        }

    } catch (e) {
        console.log(e);
        return {
            props: {
                recentCompletedAnimeDatas: [{}]
            }
        }
    }


}

export default RecentAnime