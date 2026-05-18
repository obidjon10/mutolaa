export interface IJobChoice {
  key: string;
  label: string;
}

export interface IJobChoicesResponse {
  job_choices: IJobChoice[];
}
