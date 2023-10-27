"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@component/Form";
import axios from "axios";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptID = searchParams.get("id");
  const [submitting, setsubmitting] = useState(false);
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPormptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptID}`);
      const data = await response.json();
      console.log("data", data);
      console.log("data prompt : ", data.prompt);
      // if (data.prompt) {
      //   setpost({ prompt: data.prompt });
      // }
      // if (data.tag) {
      //   setpost({ tag: data.tag });
      // }
      setpost({
        prompt : data.prompt,
        tag : data.tag
      })


    };
    if (promptID) getPormptDetails();
    console.log("post",post);
  }, [promptID]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setsubmitting(true);

    if (!promptID) {
      return alert("prompt ID not found");
    }

    try {
      const response = await fetch(`/api/prompt/${promptID}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setsubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Edit"
        post={post}
        setpost={setpost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

export default EditPrompt;
