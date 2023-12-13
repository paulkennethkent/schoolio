export type School = {
  id: string;
  name: string;
};

export type SchoolsResponse = {
  status: string;
  schools: School[];
  results: number;
};

export type SchoolResponse = {
  status: string;
  data: {
    school: School;
  };
};
