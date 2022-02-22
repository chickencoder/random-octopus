export type Respository = {
  id: number;
  name: string;
  full_name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
  language: string;
  owner: {
    login: string;
    avatar_url: string;
  };
};

export type RepositoryResponse = {
  data: {
    items: Respository[];
  } | null;
  error: string | null;
};
