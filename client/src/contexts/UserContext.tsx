import { useEffect, useState, createContext, useContext } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN, LOGOUT } from "../graphql/queries";

interface CtxUser {
  user: UserInfo | null;
  isLoggedIn: boolean;
  loading: boolean;
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

//! need to find out how to create a generic that can create an object to fix so its not null--- function that extends it and get that working, might have to call function in the provider
const UserContext = createContext<CtxUser | null>(null);

export const UseUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: Prototypes) => {
  const [user, setUser] = useState<UserInfo | null>(localUser);
  const [signUpMutation, { data: signUpData, loading }] = useMutation(ADD_USER);
  const [loginMutation, { data: loginData }] = useMutation(LOGIN);
  const [logoutMutation] = useMutation(LOGOUT);

  useEffect(() => {
    if (signUpData) {
      authenticateUser(signUpData.addUser);
    }
  }, [signUpData]);

  useEffect(() => {
    if (loginData) {
      authenticateUser(loginData.login);
    }
  }, [loginData]);

  // * adds a new user through the mutation
  const signUpUser = (newUser: NewUser) => {
    signUpMutation({ variables: { ...newUser } });
  };

  //* calls the login mutation with the passed in variables
  const loginUser = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    loginMutation({ variables: { username, password } });
  };

  //* sets the user to null
  const logoutUser = () => {
    logoutMutation();
    setUser(null);
  };

  const authenticateUser = (user: UserInfo) => {
    setUser(user);
  };

  let isLoggedIn = user ? true : false;

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, loading, signUpUser, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
