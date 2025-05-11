export enum UserRole {
  Admin = "Admin",
  Editor = "Editor",
  Viewer = "Viewer",
}

export interface User  {
  id: number;
  name: string;
  email: string;
  age?: number;
  phone?: string;
  website?: string;
  company?: {
    name: string;
  };
  role?: UserRole; 
}
