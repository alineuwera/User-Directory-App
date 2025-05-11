export interface User  {
  id: number;
  name: string;
  email: string;
  age?: number;
  phone?: string;
  website?: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
