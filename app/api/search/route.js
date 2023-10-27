import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
import { NextRequest } from "next/server";

    export const GET = async (request) => {
    try {
        await connectToDB();
        console.log("hello");
        const search = await request.json();
        console.log("Search", search);

        let searchResult = [];
        const searchResult1 = await Prompt.find({
        tag: { $regex: new RegExp(search, "i") },
        });
        console.log("searchResult1", searchResult1);

        searchResult.push(...searchResult1);

        const searchResult2 = await User.find({
        username: { $regex: new RegExp(search, "i") },
        });
        console.log("searchResult2", searchResult2);

        searchResult.push(...searchResult2);

        return new Response(JSON.stringify(searchResult), { status: 200 });
    } catch (error) {
        return new Response(error.message, "failed to get search product", {
        status: 500,
        });
    }
    };
