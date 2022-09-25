import React, { useState } from "react";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import AnimeCard from "./AnimeCard";

const RecentCompletedAnime = ({ Datas, heading }) => {
  const [index, setIndex] = useState(0);
  const [number, setNumber] = useState(5);
  const [transformData, setTransformData] = useState(0);

  const leftClicked = () => {
    if (index > 0) {
      setIndex(index - 1);
      setNumber(number - 1);
      setTransformData(transformData + 70);
    }
  };

  const rightClicked = () => {
    if (index < Datas.length - 1) {
      setIndex(index + 1);
      setNumber(number + 1);
      setTransformData(transformData - 70);
    }
  };

  return (
    <>
      {Datas && (
        <div className="w-[90vw] max-w-[80rem] mt-16 relative flex flex-col items-center">
          <BiLeftArrowCircle
            className="absolute top-[9rem] -left-12 cursor-pointer"
            size={"2.2rem"}
            color={"gray"}
            onClick={leftClicked}
          />
          <BiRightArrowCircle
            className="absolute top-[9rem] -right-12 cursor-pointer"
            size={"2.2rem"}
            color={"gray"}
            onClick={rightClicked}
          />
          <h2 className="mb-3 text-[1.4rem] font-semibold text-white">
            {heading}
          </h2>
          <div className="overflow-hidden w-[90vw] max-w-[80rem]">
            <div className="overflow-scroll cursor-grab">
              <ul
                className="flex w-[90vw] max-w-[80rem] "
                style={{
                  transform: `translateX(${transformData}vw)`,
                  transition: "0.9s ease-out ",
                }}
              >
                {Datas.map(
                  (Data: {
                    id: any;
                    title: { english: any; romaji: any };
                    coverImage: { large: any };
                    startDate: { year: any; month: any; day: any };
                    endDate: { year: any; month: any; day: any };
                  }) => {
                    return (
                      <AnimeCard
                        key={Data.id}
                        id={Data.id}
                        titleEnglish={Data.title.english}
                        titleRomaji={Data.title.romaji}
                        imageUrl={Data.coverImage.large}
                      />
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentCompletedAnime;
