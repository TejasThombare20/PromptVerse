"use client";
import "@styles/globals.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const isUserLoggedIn = true;

  const [provider, setprovider] = useState(null);
  const [toogleDropDown, settoogleDropDown] = useState(false);

  useEffect(() => {
    const setupProviders = async () => {
      const response = await getProviders();
      setprovider(response);
    };
    setupProviders();
  }, []);

  return (
    <nav
      className={`w-full  flex-between gap-2  ${
        toogleDropDown ? "mb-20" : "mb-5"
      } pt-3`}
    >
      <Link href="/" className=" gap-4 flex-center  ">
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          alt="logo"
          className="object-contain"
        />
        <p className="logo_text">PromptLab</p>
      </Link>

      {/* deskttop Navigation  */}

      <div className="sm:flex hidden ">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center "
            >
              Create Post
            </Link>
            <button
              type="buttton"
              className="rounded-full border border-black text-black bg-transparent py-1.5 px-5 transition-all hover:bg-black hover:text-white text-center font-inter flex justify-center items-center"
              onClick={signOut}
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                alt=""
                width={35}
                height={35}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center "
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation  */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={30}
              height={30}
              alt="logo"
              className="object-contain"
              onClick={() => settoogleDropDown((prev) => !prev)}
            />
            {toogleDropDown && (
              <div className=" absolute top-full right-0 bg-transparent flex flex-col justify-end items-center gap-2 mt-2  min-w-[200px] rounded-lg border  ">
                <Link
                  href="/profile"
                  className="text-sm text-gray-700 font-medium font-inter"
                  onClick={() => settoogleDropDown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="text-sm text-gray-700 font-medium font-inter"
                  onClick={() => settoogleDropDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  className=" mt-2  w-3/4 rounded-full border border-black text-black bg-transparent py-1 px-5 transition-all hover:bg-black hover:text-white text-center font-inter flex justify-center items-center"
                  onClick={() => {
                    settoogleDropDown(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center "
                >
                  SignIn
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
