import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import AnimeList from '../../Components/AnimeList'
import NavBar from '../../Components/Home/NavBar'

const GenreList = ({ }) => {
    const [genreAnimeDatas, setGenreAnimeDatas] = useState([]);
    const router = useRouter();

    const { genreName } = router.query;

    useEffect(() => {
        const onLoad = async () => {
            const queryGenreAnime = `
                 query ($page: Int,$perPage: Int,$genre:String) {
                   Page(page: $page,perPage: $perPage) {
                    media(type: ANIME, genre: $genre) {
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
                const genreAnimeDatasCollection = await axios.post(url, {
                    query: queryGenreAnime,
                    variables: { page: 1, perPage: 100, genre: genreName },
                });

                setGenreAnimeDatas(genreAnimeDatasCollection.data.data.Page.media);

            } catch (e) {
                console.log(e);
            }

        }

        onLoad()
    }, [genreName]);

    return (
        <>
            <NavBar searchAnimeDatasFn={undefined} isSearch={false} />
            <div className='min-h-[calc(100vh-3rem)] bg-zinc-900 w-screen flex flex-col items-center'>
                <AnimeList Datas={genreAnimeDatas} heading={genreName} />
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    return {
        paths: [{ params: { genreName: "adventure" } }],
        fallback: false
    }
}

// export const getStaticProps: GetStaticProps = async (path) => {
//     console.log(path);

//     const queryGenreAnime = `
//     query ($page: Int,$perPage: Int,$genre:String) {
//       Page(page: $page,perPage: $perPage) {
//         media(type: ANIME, genre: $genre) {
//           id
//           title {
//             romaji
//             english
//           }
//           coverImage {
//             large
//           }
//         }
//       }
//     }
//     `;

//     const url = "https://graphql.anilist.co";


//     try {
//         const genreAnimeDatasCollection = await axios.post(url, {
//             query: queryGenreAnime,
//             variables: { page: 1, perPage: 100, genre: "adventure" },
//         });
//         return {
//             props: {
//                 genreAnimeDatas: genreAnimeDatasCollection.data.data.Page.media
//             }
//         }

//     } catch (e) {
//         console.log(e);
//         return {
//             props: {
//                 genreAnimeDatas: [{}]
//             }
//         }
//     }


// }

export default GenreList