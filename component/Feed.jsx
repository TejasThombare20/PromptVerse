"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setsearchText] = useState("");
  const [posts, setposts] = useState([]);
  const [setTimeOut, setsearchTimeOut] = useState(null);
  const [searchResult, setsearchResult] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      console.log("data : ", data);
      setposts(data);
    };

    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(setTimeOut);
    setsearchText(e.target.value);

    setsearchTimeOut(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setsearchResult(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setsearchText(tagName);

    const SearchResult = filterPrompts(tagName);
    setsearchResult(SearchResult);
  };

  // useEffect(() => {
  //   const handlesearchClick = async () => {
  //     const respose = await fetch("/api/search", {
  //       method: "GET",
  //       body: JSON.stringify({
  //         search : searchText
  //       }),
  //     });
  //   };
  //   if (searchText) handlesearchClick();
  // }, [searchText]);

  return (
    <section className="flex flex-col justify-center items-center w-full max-w-xl mt-16">
      <form
        action=""
        className="relative w-full flex justify-center items-center "
      >
        <input
          type="text"
          placeholder="Search for a tag or username... "
          value={searchText}
          className=" peer block  w-full  bg-white rounded-lg border  pl-5 shadow-lg shadow-gray-200 px-5 py-2 focus:outline-none focus:ring-0 focus:border focus:border-black"
          onChange={handleSearchChange}
          required
        />
      </form>

      {searchResult.length > 0 ? (
        <PromptCardList data={searchResult} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
