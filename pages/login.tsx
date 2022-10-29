import React, { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import Context from "../Context/Context";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const Ctx = useContext(Context);

  const Router = useRouter();

  const LoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`https://arime.vercel.app/api/login`, {
        emailId,
        password,
      });
      window.localStorage.setItem("ArimeAccessToken", res.data.accessToken);
      Ctx.setIsLogged(true);
      Ctx.setFavs([...res.data.User.favs]);
      alert("Logged In");
      Router.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-zinc-900">
      <div className="max-w-[25rem] w-[90vw] bg-slate-600 rounded-xl shadow-xl relative flex flex-col items-center">
        <form className="inderFont flex flex-col px-[2rem] py-6 max500:px-[1rem]  items-center ">
          <ul className="mb-7">
            <li className="flex flex-col mb-3">
              <label className="text-slate-200">Email Id</label>
              <input
                type="Email"
                className="w-[80vw] max-w-[20rem] h-10 bg-slate-200 p-1 px-2 text-[0.9rem]"
                placeholder="Enter Your EmailId"
                value={emailId}
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
              />
            </li>
            <li className="flex flex-col mb-3">
              <label className="text-slate-200">Password</label>
              <input
                type="Password"
                className="h-10 bg-slate-200 p-1 px-2 w-[80vw] max-w-[20rem] text-[0.9rem]"
                placeholder="Write Your Password Here ..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </li>
          </ul>
          <button
            className="bg-slate-700 text-slate-200 rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
            onClick={LoginSubmit}
          >
            Login
          </button>
          <Link href="/register">Register Instead</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
