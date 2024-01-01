import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ICharacter } from "../model";
import { BASE_URL } from "../../../app/constants";

export const useGetCharacterById = (id?: string) => {
  const url = BASE_URL + `/people/${id}`;
  return useQuery<ICharacter>({
    queryKey: ["character", id],
    queryFn: () => axios.get(url).then((res) => res.data),
  });
};
