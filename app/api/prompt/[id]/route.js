import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    let prompts = await Prompt.findById(params.id);

    if (!prompts) {
      return new Response("No prompts found", { status: 404 });
    }

    // Check if prompts is an array, if not, convert it to an array
    // if (!Array.isArray(prompts)) {
    //   prompts = [prompts];
    // }
    console.log("hello prompts");

    // const promptsWithCreators = await Promise.all(
    //   prompts.map(async (prompt) => {
    //     const creator = await User.findById(prompt.creator);
    //     return { ...prompt.toJSON(), creator }; // Attach creator object to prompt
    //   })
    // );
    // console.log("promptsWithCreators",JSON.stringify(promptsWithCreators));

    const creator = await User.findById(prompts.creator);

    prompts = { ...prompts.toJSON(), creator };

    // console.log("prompts",prompts)

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("error message : ", error.message);
    return new Response("failed to get prompts", {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
     const request = await req.json();
    console.log(request);
    const { prompt, tag } = request;

    console.log("prompt and tag : ", prompt, tag);
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("No prompts found", { status: 404 });
    }

    if (prompt) existingPrompt.prompt = prompt;
    if (tag) existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), {
      status: 200,
      message: "prompt update successfully",
    });
  } catch (error) {
    console.log("error message : ", error.message);
    return new Response("Internal Server error", {
      status: 500,
      message: error.message,
    });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findByIdAndDelete(params.id);

    if (!prompt) {
      return new Response("No prompts found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
      message: "prompt deleted successfully",
    });
  } catch (error) {
    return new Response("Internal Server error", {
      status: 500,
      message: error.message,
    });
  }
};
