import React, { useState } from "react";
import { BiLeftArrowCircle, BiRightArrowCircle } from "react-icons/bi";
import AnimeCard from "./AnimeCard";

const RecentCompletedAnime = ({ Datas, heading }) => {

  return (
    <>
      {Datas && (
        <div className="w-[90vw] max-w-[80rem] mt-16 relative flex flex-col items-center ">
          <h2 className="mb-3 text-[1.4rem] font-semibold text-white">
            {heading}
          </h2>
          <ul
            className="flex  max-w-[80rem] flex-wrap justify-center"
          >
            {Datas.map(
              (Data: {
                id: any;
                title: { english: any; romaji: any };
                coverImage: { large: any };
                startDate: { year: any; month: any; day: any };
                endDate: { year: any; month: any; day: any };
              }, index: number) => {
                if (index <= 7)
                  return (
                    <AnimeCard
                      key={Data.id}
                      id={Data.id}
                      titleEnglish={Data.title.english}
                      titleRomaji={Data.title.romaji}
                      imageUrl={Data.coverImage.large}
                    />
                  );
                else
                  return;
              }
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default RecentCompletedAnime;
