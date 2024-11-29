import { Answers } from "@/store/slices/questionnaireSlice";

export const parseStringWithVars = (str: string, vars: Answers): string => {
  return str
    .split(" ")
    .map((item) => {
      if (item[0] !== "{" || item[item.length - 1] !== "}") {
        return item;
      }

      const executable = item.replace("{", "").replace("}", "");

      if (executable[0] === "!") {
        const cleared = executable.replace("!", "");

        const [val, display] = cleared.split("(");

        return vars[+val] ? display.replace(")", "").replaceAll("_", " ") : "";
      }

      return vars[+executable] ?? "";
    })
    .join(" ");
};
