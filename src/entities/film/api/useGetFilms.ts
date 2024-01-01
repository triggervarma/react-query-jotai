import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BASE_URL } from "../../../app/constants";
import { IFilm } from "../model";
import { BasicGetListApiResponse } from "../../../app/interfaces";

export const useGetFilms = () => {
  const filmsUrl = `${BASE_URL}/films`;

  return useQuery<BasicGetListApiResponse<IFilm[]>>({
    queryKey: ["films"],
    queryFn: () => axios.get(filmsUrl).then((res) => res.data)
  });
};
