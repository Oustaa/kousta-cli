import { cleanEnv, str, port, makeValidator } from "envalid";

const nonEmptyString = makeValidator((input: string) => {
  if (typeof input !== "string" || input.trim() === "") {
    throw new Error("Expected a non-empty string");
  }
  return input;
});

function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production"],
      default: "development",
    }),
    <% env-validation %>,
    PORT: port({ default: 3000 }),
  });
}

export default validateEnv;
