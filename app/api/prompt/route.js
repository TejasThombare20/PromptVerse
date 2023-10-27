import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

export const GET = async (req, res) => {
  try {
    await connectToDB();
    // console.log("hello world");

    const prompts = await Prompt.find({});

    const promptsWithCreators = await Promise.all(
      prompts.map(async (prompt) => {
        const creator = await User.findById(prompt.creator);
        // console.log("creator: " + creator)
        return { ...prompt.toJSON(), creator }; // Attach creator object to prompt
      })
    );
    // console.log("hello2");
    // console.log("promptsWithCreators", promptsWithCreators);
    return new Response(JSON.stringify(promptsWithCreators), { status: 200 });
    // res.status(200).json({ prompts });
  } catch (error) {
    return new Response(error.message, "failed to get prompts", {
      status: 500,
    });
  }
};
