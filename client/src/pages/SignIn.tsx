import Container from "../components/common/Container";
import { useState } from "react";
import UseUserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

interface LoginType {
  username: string;
  password: string;
}

//* Component to login the user to use the app
const SignIn = () => {
  const nav = useNavigate();
  const [loginDetails, setLoginDetails] = useState<LoginType>({
    username: "",
    password: "",
  });
  const { loginUser } = UseUserContext();

  //* Submits the user signin details and redirects the user to home page
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const ifLogin = await loginUser(loginDetails);
    nav("/");
  };

  return (
    <Container displayActive={null}>
      <div className="w-full max-w-xl">
        <h1 className="text-center font-bold text-2xl">Sign In</h1>
        <form className="flex flex-col gap-5 mt-3">
          <label className="flex flex-col font-bold">
            Username
            <input
              type="text"
              className="rounded-lg pl-2 h-[30px]"
              value={loginDetails.username}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, username: e.target.value })
              }
            />
          </label>
          <label className="flex flex-col font-bold">
            Password
            <input
              type="password"
              className="rounded-lg pl-2 h-[30px]"
              value={loginDetails.password}
              onChange={(e) =>
                setLoginDetails({ ...loginDetails, password: e.target.value })
              }
            />
          </label>
          <button
            type="submit"
            className=" rounded-lg bg-zinc-200 hover:bg-zinc-400 h-[40px] transition-all items-center justify-center flex"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
