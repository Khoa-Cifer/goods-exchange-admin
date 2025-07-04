import { Role } from "./role";

export type User = {
  id: string;
  username: string;
  email: string;
  userRoles: Role[];
  isActive: number;
  provider: string;
}