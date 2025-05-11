import { createContext, useContext, useReducer, type ReactNode} from "react";
import type { User } from "../types/user";

// Actions
type Action = 
  | { type: "ADD_USER"; payload: User };

// State
interface State {
  users: User[];
}

// Initial state
const initialState: State = {
  users: [],
};

// Reducer
function userReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
}

// Context types
interface UserContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook for consuming context
export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}
