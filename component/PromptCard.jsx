"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import tickSVG from "@public/assets/icons/tick.svg"
import copySVG from "@public/assets/icons/copy.svg"

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const [copied, setcopied] = useState("");
  const router = useRouter();

  const handleCopyClipboard = () => {
    setcopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setcopied(""), 3000);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  return (
    <div className="flex-1 flex flex-col gap-2 justify-center items-start break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <div className="flex justify-between items-start gap-20 ">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" 
        onClick={handleProfileClick}>
          {/* {console.log("post", post)} */}
          {/* {console.log("post-post :", post.post)} */}
          {/* { console.log("post creator :",post.creator)}
         { console.log("post creator username :",post.creator.username)} */}

          <Image
            src={post.creator?.image}
            width={40}
            height={40}
            alt="user_image"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col justify-start items-start gap-1">
            <h3 className="text-gray-900 text-sm font-semibold font-satoshi ">
              {post.creator?.username}
            </h3>
            <p className="text-gray-600 text-xs">{post.creator?.email}</p>
          </div>
        </div>
        <div className="w-7 h-7 flex items-center justify-center cursor-pointer bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur-2xl rounded-full ">
          <Image
            src={
              copied === post.prompt
                ? tickSVG
                : copySVG
            }
            width={20}
            height={20}
            onClick={handleCopyClipboard}
          />
        </div>
      </div>
      <p className=" my-2 font-satoshi text-gray-700 text-sm text-justify">
        {post.prompt}
      </p>
      <p
        className=" font-inter text-sm blue-gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {/* { console.log("post : ",post)}
     {console.log("postCreator : ",post.post?.creator)} */}
      {session?.user.id === post.creator?._id && pathName === "/profile" && (
        <div className="flex justify-start items-center gap-4">
          <p>
            <button
              className=" font-inter  text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-blue-800 bg-clip-text text-transparent font-bold py-2 px-4 border border-transparent rounded-md shadow-sm"
              onClick={() => handleEdit && handleEdit(post)}
            >
              Edit
            </button>
            <button
              className=" font-inter  text-sm bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-700 hover:to-orange-800 bg-clip-text text-transparent font-bold py-2 px-4 border border-transparent rounded-md shadow-sm"
              onClick={() => handleDelete && handleDelete(post)}
            >
              Delete
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
