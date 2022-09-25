import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";

const NavBar = ({ searchAnimeDatasFn }) => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const SearchItems = (e) => {
    e.preventDefault();

    searchAnimeDatasFn(search);
  };

  return (
    <div className="h-[3rem] w-screen bg-black flex justify-between px-6 py-4 items-center">
      <h1 className="text-white">ARIME</h1>
      <form className="flex">
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
      </form>
      <div className="w-8 h-8 bg-red-500 rounded-[50%] relative">
        <ul className="absolute right-0 top-8">
          <li
            className="w-[10rem] h-9 flex justify-center items-center bg-slate-300 cursor-pointer"
            onClick={() => {
              router.push("/login", "/login", { shallow: true });
            }}
          >
            Sign In
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
