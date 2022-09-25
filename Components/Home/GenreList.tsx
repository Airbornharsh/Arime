import React, { useEffect, useState } from "react";
import GenreCard from "../GenreCard";
import GenreDatas from "../../Utils/Datas/GenreDatas";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import Slider from "../Slider";
import axios from "axios";

const GenreList = () => {
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(6);
  const [transformData, setTransformData] = useState(0);
  const [genreRenderDatas, setGenreRenderDatas] = useState(0);
  const [genreName, setGenreName] = useState("adventure");

  const leftClicked = () => {
    if (index > 0) {
      setIndex(index - 1);
      setNumber(number - 1);
      setTransformData(transformData + 15);
    }
  };

  const rightClicked = () => {
    if (index < GenreDatas.length - 1) {
      setIndex(index + 1);
      setNumber(number + 1);
      setTransformData(transformData - 15);
    }
  };

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
          <BiLeftArrowCircle
            className="absolute top-[9rem] -left-12 cursor-pointer"
            size={"2.2rem"}
            onClick={leftClicked}
          />
          <BiRightArrowCircle
            className="absolute top-[9rem] -right-12 cursor-pointer"
            size={"2.2rem"}
            onClick={rightClicked}
          />
          <h2 className="mb-3 text-[1.4rem] font-semibold">Genre</h2>
          <div className="overflow-hidden max-w-[80rem]">
            <div className="overflow-scroll cursor-grab">
              <ul
                className="flex"
                style={{
                  transform: `translateX(${transformData}rem)`,
                  transition: "0.3s ease-out ",
                }}
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
      <Slider Datas={genreRenderDatas} heading={genreName} />
    </>
  );
};

export default GenreList;
