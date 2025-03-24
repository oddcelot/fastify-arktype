import { type } from "arktype";

export const userSchema = type({
  name: "string",
  email: "string.email",
  age: "number>1",
});

export type User = typeof userSchema;
