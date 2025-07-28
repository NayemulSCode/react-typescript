// Type Definitions
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
}

// Constants এর জন্য
export enum TodoFilter {
    ALL = "all",
    ACTIVE = "active",
    COMPLETED = "completed"
}

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
    MODERATOR = "moderator"
}

export enum StatusCode {
    SUCCESS = 200,
    NOT_FOUND = 404,
    SERVER_ERROR = 500
}
