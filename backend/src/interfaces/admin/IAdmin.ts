// src/interfaces/admin/IAdmin.ts
export interface IAdmin {
  id?: string;
  name: string;
  email: string;
  password: string;  // hashed
  role?: "super_admin" | "admin";
  status?: "active" | "inactive";
}
