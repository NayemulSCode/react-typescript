// types/api.ts
type LoadingState = {
  status: "loading";
  message: string;
};

type SuccessState = {
  status: "success";
  data: User[];
  timestamp: Date;
};

type ErrorState = {
  status: "error";
  error: string;
  code: number;
};

export type ApiState = LoadingState | SuccessState | ErrorState;

// User type for our example
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
};
