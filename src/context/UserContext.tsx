import { createContext, useReducer, useEffect } from "react";
import { useContext } from "react";
import type { User } from "../types/user";

type UserState = { users: User[] };
type UserAction = { type: "ADD_USER"; payload: User } | { type: "REMOVE_USER"; payload: number };

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}>({ state: { users: [] }, dispatch: () => null });

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "ADD_USER":
      return { users: [...state.users, action.payload] };
    case "REMOVE_USER":
      return { users: state.users.filter((user) => user.id !== action.payload) };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage
  const [state, dispatch] = useReducer(userReducer, {
    users: JSON.parse(localStorage.getItem("users") || "[]"),
  });

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(state.users));
  }, [state.users]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);