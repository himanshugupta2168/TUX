import { atom } from "recoil";

const stateFinder = (): boolean => {
  const token = localStorage.getItem("authorization");
  return !!token && token.length > 0;
};

export const authState = atom({
  key: "authState",
  default: stateFinder,
});
