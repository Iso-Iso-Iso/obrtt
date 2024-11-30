import { Answers } from "@/store/slices/questionnaireSlice";

const isItemDefaultString = (item: string) =>
  item[0] !== "{" || item[item.length - 1] !== "}";

const isConditionalExecutable = (executable: string) => executable[0] === "!";

const getExecutable = (item: string) => item.replace("{", "").replace("}", "");

const executeConditional = (executable: string, vars: Answers) => {
  const cleared = executable.replace("!", "");

  const [val, display] = cleared.split("(");

  return vars[+val] ? display.replace(")", "").replaceAll("_", " ") : "";
};

const execute = (executable: string, vars: Answers) => vars[+executable] ?? "";

export const parseStringWithVars = (str: string, vars: Answers): string => {
  return str
    .split(" ")
    .map((item) => {
      if (isItemDefaultString(item)) {
        return item;
      }

      const executable = getExecutable(item);

      const executeFn = isConditionalExecutable(executable)
        ? executeConditional
        : execute;

      return executeFn(executable, vars);
    })
    .join(" ");
};
