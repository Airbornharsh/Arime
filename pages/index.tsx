import axios from "axios";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import GenreList from "../Components/Home/GenreList";
import NavBar from "../Components/Home/NavBar";
import Slider from "../Components/Slider";
import Context from "../Context/Context";

const Home = ({ recentCompletedAnimeDatas, topAnimeDatas, genreData }) => {

  const Ref1Ctx = useRef(useContext(Context));
  const Ref2Ctx = useRef(useContext(Context));
  const Router = useRouter();
  const [search, setSearch] = useState("");
  const [searchAnimeDatas, setSearchAnimeDatas] = useState("");

  useEffect(() => {

    const onLoad = async () => {
      try {
        const UserCheck = await axios.get(`https://arime.vercel.app/api/verifyuser`, {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem(
              "ArimeAccessToken"
            )}`,
          }
        })
        Ref1Ctx.current.setIsLogged(UserCheck.data.isValid);
        Ref2Ctx.current.setFavs([...UserCheck.data.User.favs]);

      } catch (e) {
        console.log(e);
      }
    }

    onLoad();

  }, []);

  const searchAnimeDatasFn = async (data) => {
    try {
      const querySearchAnime = `  query ($page: Int,$perPage:Int,$search: String) {
        Page(page: $page,perPage: $perPage) {
          media(type: ANIME,search: $search) {
            id
            genres
            title {
              romaji
              english
              native
            }
            coverImage {
              large
              medium
              color
            }
            description
          }
        }
      }`;

      const url = "https://graphql.anilist.co";

      const searchAnimeCollection = await axios.post(url, {
        query: querySearchAnime,
        variables: {
          page: 1,
          perPage: 20,
          search: data,
        },
      });
      setSearch(data);
      setSearchAnimeDatas(searchAnimeCollection.data.data.Page.media);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen pb-10 bg-zinc-900 min-h-screen">
      <NavBar searchAnimeDatasFn={searchAnimeDatasFn} isSearch={true} />
      {search && (
        <Slider
          Datas={searchAnimeDatas}
          heading={`SearchResult For ${search}`}
        />
      )}
      <Slider
        Datas={recentCompletedAnimeDatas}
        heading={"Recently Completed Anime"}
      />
      <Link href={"/recentanime"}>
        <span className="mt-8 p-3 bg-[#575858] flex justify-center items-center cursor-pointer" >
          <h2 className=" text-[0.9rem] font-semibold text-white">See All Recent Anime
          </h2>
        </span>
      </Link>
      <Slider Datas={topAnimeDatas} heading={"Top Anime"} />
      <Link href={"/topanime"}>
        <span className="mt-8 p-3 bg-[#575858] flex justify-center items-center cursor-pointer" >
          <h2 className=" text-[0.9rem] font-semibold text-white">Top Anime</h2>
        </span>
      </Link>
      <GenreList genreData={genreData} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
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
    const queryGenreRenderAnime = `
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

    const recentGenreRenderAnime = await axios.post(url, {
      query: queryGenreRenderAnime,
      variables: { page: 1, perPage: 8, genre: "adventure" },
    });

    const recentCompletedAnimeDatasCollection = await axios.post(url, {
      query: queryRecentCompletedAnime,
      variables: { page: 1, perPage: 8 },
    });

    const topAnimeDatasCollection = await axios.post(url, {
      query: queryTopAnime,
      variables: { page: 1, perPage: 8 },
    });

    return {
      props: {
        recentCompletedAnimeDatas:
          recentCompletedAnimeDatasCollection.data.data.Page.media,
        topAnimeDatas: topAnimeDatasCollection.data.data.Page.media,
        genreData: recentGenreRenderAnime.data.data.Page.media,
      },
    };
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      data: "something",
    },
  };
};

export default Home;
