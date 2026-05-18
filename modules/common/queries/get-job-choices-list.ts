import { $api } from "@/lib";

import type { IJobChoicesResponse } from "../types/job";

export const getJobChoicesList = async () => {
  const { data } = await $api.get<IJobChoicesResponse>(
    "/common/JobChoicesList/",
  );

  return data;
};
