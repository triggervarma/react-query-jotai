import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { ICharacter } from "./../model/index";
import { BasicGetListApiResponse } from "./../../../app/interfaces";
import { BASE_URL } from "../../../app/constants";

export const useGetCharacters = (search?: string, page?: number) => {
  const pageQuery = `?page=${page}`;
  const searchQuery = search ? `&search=${search}` : "";
  const url = BASE_URL + `${"/people" + pageQuery + searchQuery}`;

  return useQuery<BasicGetListApiResponse<ICharacter[]>>({
    queryKey: ["characters", searchQuery, page],
    queryFn: () => axios.get(url).then((res) => res.data)
  });
};
