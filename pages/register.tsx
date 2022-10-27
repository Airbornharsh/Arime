import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const Router = useRouter();

  const validateForm = () => {
    return password === confirmPassword && emailId && name;
  };

  const RegisterSubmit = async (e) => {
    e.preventDefault();

    // UtilCtx.setLoader(true);

    try {
      const res = await axios.post(`http://localhost:3000/api/register`, {
        name,
        emailId,
        password,
      });
      setAccessToken(res.data.accessToken);
      setIsCodeSent(true);
      // UtilCtx.setLoader(false);
    } catch (e) {
      console.log(e);
      // UtilCtx.setLoader(false);
    }
  };

  const VerifySubmit = async (e) => {
    e.preventDefault();

    // UtilCtx.setLoader(true);

    try {
      const res = await axios.post(
        `http://localhost:3000/api/register/verify`,
        {
          accessToken,
          otp,
        } 
      );
      console.log(res);
      // UtilCtx.setLoader(false);
      Router.push("/login");
    } catch (e) {
      console.log(e);
      // UtilCtx.setLoader(false);
    }
  };

  const sendingCode = () => {
    return (
      <form className="inderFont flex flex-col px-[4rem] max500:px-[1rem] py-6  items-center">
        <ul className="mb-7">
          <li className="flex flex-col mb-6">
            <label className="text-slate-300">Name</label>
            <input
              className=" h-10 bg-slate-200 p-1 px-2 w-[80vw] max-w-[20rem] text-[0.9rem]"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-slate-300">Email Id</label>
            <input
              type="Email"
              className=" h-10 bg-slate-200 p-1 px-2 w-[80vw] max-w-[20rem] text-[0.9rem]"
              placeholder="Enter Your EmailId"
              value={emailId}
              onChange={(e) => {
                setEmailId(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-slate-300">Password</label>
            <input
              type="Password"
              className="text-[0.9rem] w-[80vw] max-w-[20rem] h-10 bg-slate-200 p-1 px-2"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </li>
          <li className="flex flex-col mb-6">
            <label className="text-slate-300">Confirm Password</label>
            <input
              type="text"
              className="text-[0.9rem] w-[80vw] max-w-[20rem] h-10 bg-slate-200 p-1 px-2"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </li>
        </ul>
        <button
          className="bg-slate-700 text-slate-200  rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={RegisterSubmit}
          disabled={!validateForm()}
        >
          Register
        </button>
        <Link href="/login" className="">
          Login Instead
        </Link>
      </form>
    );
  };

  const verifyingCode = () => {
    return (
      <form className="inderFont flex flex-col px-[4rem] max500:px-[1rem] py-6  items-center">
        <ul className="mb-7">
          <li className="flex flex-col mb-6">
            <label className="text-slate-700">Code</label>
            <input
              className="text-[0.9rem] w-[80vw] max-w-[20rem] h-10 bg-slate-200 p-1 px-2"
              type="number"
              placeholder="Type Your Otp"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
          </li>
        </ul>
        <button
          className="bg-slate-700 text-slate-200  rounded-md shadow-md w-[7.1rem] py-2 flex justify-center items-center"
          onClick={VerifySubmit}
        >
          Verify Code
        </button>
        <Link href="/login" className="">
          Login Instead
        </Link>
      </form>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-zinc-900">
      <div className="max-w-[25rem] w-[90vw] bg-slate-600 rounded-xl shadow-xl relative flex flex-col items-center">
        {!isCodeSent ? sendingCode() : verifyingCode()}
      </div>
    </div>
  );
};

export default Login;
