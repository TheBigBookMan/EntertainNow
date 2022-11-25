import { useEffect, useState, createContext, useContext } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER, LOGIN, LOGOUT } from "../graphql/queries";
import createCtx from "./index";

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
const [useCtx, UserProvider] = createCtx<CtxUser>();

export const Provider = ({ children }: Prototypes) => {
  const [user, setUser] = useState<UserInfo | null>(localUser);
  const [signUpMutation, { data: signUpData, loading }] = useMutation(ADD_USER);
  const [loginMutation, { data: loginData }] = useMutation(LOGIN);
  const [logoutMutation] = useMutation(LOGOUT);

  // ? When user state changes, it is stored onto localstorage as the user
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  //? Once the signup data changes it is added to user state
  useEffect(() => {
    if (signUpData) {
      console.log(signUpData);
      authenticateUser(signUpData.addUser);
    }
  }, [signUpData]);

  //? Once the login data is changed it is added to use state
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
    <UserProvider
      value={{ user, isLoggedIn, loading, signUpUser, loginUser, logoutUser }}
    >
      {children}
    </UserProvider>
  );
};

export default useCtx;
