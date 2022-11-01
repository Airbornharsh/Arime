import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import Context from "../../Context/Context";

const NavBar = ({ searchAnimeDatasFn, isSearch }) => {
  const [search, setSearch] = useState("");
  const [barVisible, setBarVisible] = useState(false);
  const Ctx = useContext(Context);

  const router = useRouter();

  const SearchItems = (e) => {
    e.preventDefault();

    searchAnimeDatasFn(search);
  };

  const ToggleEntry = () => {
    setBarVisible(!barVisible);
  }

  return (
    <div className="flex items-center justify-between w-screen h-12 px-6 py-4 bg-black">
      <h1 className="text-white">ARIME</h1>
      {isSearch && <form className="flex">
        <input
          type={"text"}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={"Search Your Anime"}
          className={"h-[2rem] w-[20rem] px-2"}
        />
        <button
          className="flex items-center justify-center px-2 bg-gray-200 h-[2rem]"
          onClick={SearchItems}
        >
          <BiSearchAlt2 />
        </button>
      </form>}
      <div className="w-8 h-8 bg-red-500 rounded-[50%] relative" onMouseEnter={ToggleEntry} onMouseLeave={ToggleEntry}>
        {barVisible &&
          <div>
            {Ctx.isLogged ? <ul className="absolute right-0 top-5">
              <li
                className="w-[10rem] h-9 flex justify-center items-center bg-slate-300 cursor-pointer"
                onClick={() => {
                  router.push("/fav", "/fav", { shallow: true });
                }}
              >
                Your Favourites
              </li>
            </ul> : <ul className="absolute right-0 top-5">
              <li
                className="w-[10rem] h-9 flex justify-center items-center bg-slate-300 cursor-pointer"
                onClick={() => {
                  router.push("/login", "/login", { shallow: true });
                }}
              >
                Login In
              </li>
            </ul>}
          </div>}
      </div>
    </div>
  );
};

export default NavBar;
