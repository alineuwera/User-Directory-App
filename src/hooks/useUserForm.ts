import { useForm } from "react-hook-form";
import { UserRole } from "../types/user";

export interface FormData {
  name: string;
  email: string;
  age: number;
  role: UserRole;
}

export const useUserForm = () => {
  const form = useForm<FormData>({
    defaultValues: {
      role: UserRole.Viewer, 
    },
  });

  return form;
};
