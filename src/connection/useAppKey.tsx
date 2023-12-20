import { atom, useAtom } from "jotai";

const appKeyAtom = atom<string | null>(null);

export default function useAppKey() {
  return useAtom(appKeyAtom);
}
