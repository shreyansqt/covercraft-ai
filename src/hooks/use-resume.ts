import { useLocalStorage } from "usehooks-ts";

export const useResume = () => {
  const [resume, setResume] = useLocalStorage<string>("resume", "");
  return { resume, setResume };
};
