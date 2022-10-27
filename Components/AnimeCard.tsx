import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const AnimeCard = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  let startDateData, endDateData;


  const ToggleVisible = () => {
    if (isVisible) setIsVisible(false);
    else setIsVisible(true);
  };

  if (props.startDate) {
    startDateData =
      props.startDate.day +
      "/" +
      props.startDate.month +
      "/" +
      props.startDate.year;
  }

  if (props.endDate) {
    endDateData =
      props.endDate.day + "/" + props.endDate.month + "/" + props.endDate.year;
  }

  const CheckExisted = (data, id) => {
    let value = false;
    data.forEach((element) => {
      if (element === id) {
        value = true;
      }
    });
    return value;
  };

  const AnimeRenderFn = () => { };

  const AddFavourites = async () => {

    try {
      const res = await axios.post("http://localhost:3000/api/addfav", {
        animeId: props.id,
      }, {
        headers: {
          authorization: `Bearer ${window.localStorage.getItem(
            "ArimeAccessToken"
          )}`,
        }
      });

      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <li
      className={"min-w-[10rem]"}
      onMouseEnter={ToggleVisible}
      onMouseLeave={ToggleVisible}
    >
      <span className="relative">
        <Image
          height={200}
          width={150}
          src={props.imageUrl}
          alt={props.titleEnglish}
          objectFit={"cover"}
        />
        {isVisible && (
          <span className="min-w-[10rem] absolute z-10 bottom-0 flex justify-center items-center left-[50%] translate-x-[-50%] h-48  bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.4)]">
            <button className="p-1 h-7 bg-white text-[0.8rem] w-[6rem] rounded absolute bottom-3" onClick={() => {
              AddFavourites();
            }}>
              Add Favourite
            </button>
          </span>
        )}
      </span>
      <h3 className="text-[rgba(255,255,255,0.8)] text-[0.8rem] text-center font-semibold w-[8rem]">
        {props.titleEnglish ? props.titleEnglish : props.titleRomaji}
      </h3>
    </li>
  );
};

export default AnimeCard;
