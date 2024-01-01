import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

import { ICharacter } from "../../entities/character/model";

export const localCharacterAtom = atomWithStorage<ICharacter>(
  "localCharacter",
  {} as ICharacter
);

export const tourShowAtom = atomWithStorage("isTourShown", false);

export const characterAtom = atom<ICharacter>({} as ICharacter);

export const openTourAtom = atom(false);

export const queryAtom = atom("");

export const fetchingAtom = atom(false);

export const currentPageAtom = atom(1);
