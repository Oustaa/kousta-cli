import inquirer from "inquirer";

export const askQuestion = async ({
  type,
  message,
  defaultValue,
  choices,
  validate,
}) => {
  const answer = await inquirer.prompt({
    name: "answer",
    type,
    message,
    choices,
    validate,
    default() {
      return defaultValue;
    },
  });

  return answer.answer;
};

