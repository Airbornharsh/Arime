import React, { useEffect, useState } from "react";
import GenreCard from "../GenreCard";
import GenreDatas from "../../Utils/Datas/GenreDatas";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import Slider from "../Slider";
import axios from "axios";
import { GetStaticProps } from "next";
import Link from "next/link";

const GenreList = ({ genreData }) => {
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(6);
  const [transformData, setTransformData] = useState(0);
  const [genreRenderDatas, setGenreRenderDatas] = useState(genreData);
  const [genreName, setGenreName] = useState("adventure");

  useEffect(() => {
    const onLoad = async () => {
      try {
        const queryGenreRenderAnime = `
        query ($page: Int,$perPage: Int,$genre:String) {
          Page(page: $page,perPage: $perPage) {
            media(type: ANIME, genre: $genre) {
              id
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
            }
          }
        }
        `;

        const url = "https://graphql.anilist.co";

        const recentGenreRenderAnime = await axios.post(url, {
          query: queryGenreRenderAnime,
          variables: { page: 1, perPage: 20, genre: "adventure" },
        });

        setGenreRenderDatas(recentGenreRenderAnime.data.data.Page.media);
      } catch (e) {
        console.log(e);
      }
    };

    onLoad();
  }, []);

  const GenreRenderDatasFn = async () => {
    try {
      const queryGenreRenderAnime = `
      query ($page: Int,$perPage: Int,$genre:String) {
        Page(page: $page,perPage: $perPage) {
          media(type: ANIME, genre: $genre) {
            id
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
          }
        }
      }
      `;

      const url = "https://graphql.anilist.co";

      const recentGenreRenderAnime = await axios.post(url, {
        query: queryGenreRenderAnime,
        variables: { page: 1, perPage: 20, genre: genreName },
      });

      setGenreRenderDatas(recentGenreRenderAnime.data.data.Page.media);
    } catch (e) {
      console.log(e);
    }
  };

  const GenreNameFn = (data: string) => {
    setGenreName(data);
  };

  return (
    <>
      {GenreDatas && (
        <div
          className={
            "w-screen max-w-[80rem] mt-16 relative flex flex-col items-center"
          }
        >
          <h2 className="mb-3 text-[1.4rem] font-semibold">Genre</h2>
          <div className="overflow-hidden max-w-[80rem]">
            <div className="overflow-scroll cursor-grab">
              <ul
                className="flex"
              >
                {GenreDatas.slice(index, number).map((GenreData, index) => {
                  return (
                    <GenreCard
                      key={index}
                      name={GenreData.name}
                      genre={GenreData.genre}
                      genreRenderDatasFn={GenreRenderDatasFn}
                      genreNameFn={GenreNameFn}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}

      <Link href={`/genre`}>
        <span className="mt-8 p-3 bg-[#575858] flex justify-center items-center cursor-pointer" >
          <h2 className=" text-[0.9rem] font-semibold text-white">See More Genres</h2>
        </span>
      </Link>
      <Slider Datas={genreRenderDatas} heading={genreName} />
      <Link href={`/genre/${genreName}`}>
        <span className="mt-8 p-3 bg-[#575858] flex justify-center items-center cursor-pointer" >
          <h2 className=" text-[0.9rem] font-semibold text-white">See More {genreName.toUpperCase()} Genre</h2>
        </span>
      </Link>
    </>
  );
};

export default GenreList;
