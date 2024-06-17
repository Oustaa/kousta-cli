import "dotenv/config";
import "module-alias/register";
import APP from "./app";
import validateEnv from "@/utils/validateEnv";
import PostController from "./resources/post/post.controler";

validateEnv();

const app = new APP([new PostController()], Number(process.env.PORT));

app.listen();
