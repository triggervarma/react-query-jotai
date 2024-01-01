import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { BASE_URL } from "../../../app/constants";
import { IPlanet } from "../model";
import { BasicGetListApiResponse } from "../../../app/interfaces";

export const useGetPlanets = () => {
  const planetsUrl = `${BASE_URL}/planets`;

  return useQuery<BasicGetListApiResponse<IPlanet[]>>({
    queryKey: ["planets"],
    queryFn: () => axios.get(planetsUrl).then((res) => res.data),
  });
};
