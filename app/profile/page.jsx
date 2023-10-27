"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@component/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.user.id}/post`);
      const post = await response.json();
      setposts(post);
    };
    if (session?.user.id) fetchPosts();
  }, []);

  console.log("posts : ", posts);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfiremed = confirm("Are you sure you want to delete this post?");

    if (hasConfiremed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
      const filteredPost = posts.filter((p)=>p._id !==post._id)
      setposts(filteredPost);
        
      } catch (error) {
        console.log("error : ", error.message)
      }
    }
  };

  return (
    <div>
      <Profile
        name={"My"}
        desc={"Welcome to your personalized profile page "}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MyProfile;
