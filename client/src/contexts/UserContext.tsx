import { useEffect, useState, createContext, useContext } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN, LOGOUT } from "../graphql/queries";

interface CtxUser {
  user: UserInfo | null;
  isLoggedIn: boolean;
  signUpUser: (newUser: NewUser) => void;
  loginUser: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logoutUser: () => void;
}

interface NewUser {
  username: string;
  email: string;
  password: string;
}

interface Prototypes {
  children: React.ReactNode;
}

const localUser = JSON.parse(localStorage.getItem("user") as string) || null;
const UserContext = createContext<CtxUser | null>(null);

export const UseUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: Prototypes) => {
  const [user, setUser] = useState<UserInfo | null>(localUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const signUpUser = () => {
    //* change isloggedin to true
  };

  const loginUser = () => {
    //* change isloggedin to true
  };

  const logoutUser = () => {
    //* change isloggedin to false
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, signUpUser, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
