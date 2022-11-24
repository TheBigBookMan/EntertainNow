import Container from "../components/common/Container";
import { useState } from "react";
import { ADD_USER } from "../graphql/queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const nav = useNavigate();
  const [formInfo, setFormInfo] = useState<UserInfo>({
    username: "",
    password: "",
    email: "",
  });
  const [addUser, { error, loading }] = useMutation(ADD_USER);

  const inputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: { preventDefault: () => void }) => {
    try {
      e.preventDefault();
      console.log(formInfo);
      const { data } = await addUser({ variables: { ...formInfo } });
      // nav("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(error);
  return (
    <Container>
      <h1 className="text-center font-bold text-2xl">Sign Up</h1>
      <p>
        Sign up to receive access to favourite movies and tv shows that you
        enjoy watching the trailers for.
      </p>
      <form className="flex flex-col gap-5 mt-3">
        <label className="flex flex-col font-bold">
          Username
          <input
            type="text"
            name="username"
            value={formInfo.username}
            onChange={inputChange}
            className="rounded-lg pl-2 h-[30px]"
          />
        </label>
        <label className="flex flex-col font-bold">
          Email
          <input
            name="email"
            value={formInfo.email}
            onChange={inputChange}
            type="email"
            className="rounded-lg pl-2 h-[30px]"
          />
        </label>
        <label className="flex flex-col font-bold">
          Password
          <input
            name="password"
            value={formInfo.password}
            onChange={inputChange}
            type="password"
            className="rounded-lg pl-2 h-[30px]"
          />
        </label>
        <button
          onClick={onSubmit}
          type="submit"
          className=" rounded-lg bg-zinc-200 hover:bg-zinc-400 h-[40px] transition-all items-center justify-center flex"
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <div>Something went wrong, please try again...</div>}
    </Container>
  );
};

export default SignUp;
