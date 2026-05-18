import { useQuery } from "@tanstack/react-query";

import { commonQueryKeys } from "../constants";
import { getJobChoicesList } from "../queries/get-job-choices-list";

export const useJobChoicesList = () => {
  const { data, ...args } = useQuery({
    queryKey: [commonQueryKeys.JOB_CHOICES],
    queryFn: getJobChoicesList,
  });

  return { jobChoices: data?.job_choices ?? [], ...args };
};
