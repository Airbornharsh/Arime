import React from "react";
import Image from "next/image";

const GenreCard = ({ name, genre, genreRenderDatasFn, genreNameFn }) => {
  const Explored = () => {
    genreRenderDatasFn(genre);
    genreNameFn(name);
  };

  return (
    <li
      className={
        "h-[13rem] w-[11rem] bg-[rgb(17,17,17)] flex justify-start items-center flex-col overflow-clip my-2 mx-4 border-1"
      }
    >
      <Image
        src={
          "https://featuredanimation.com/wp-content/uploads/2021/09/Non-Non-Biyori-anime-with-Hotaru-and-friends.jpeg.webp"
        }
        alt="View"
        height={140}
        width={200}
        objectFit={"cover"}
      />
      <h2 className="mt-2 text-[rgba(255,255,255,0.7)]">{name}</h2>
      <button
        onClick={Explored}
        className={
          "mt-2 bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.9)] text-[0.8rem] p-1 rounded transition-[0.2s]"
        }
      >
        EXPLORE
      </button>
    </li>
  );
};

export default GenreCard;
