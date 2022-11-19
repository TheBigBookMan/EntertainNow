import Container from "../components/common/Container";

const SignUp = () => {
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
          <input type="text" className="rounded-lg pl-2 h-[30px]" />
        </label>
        <label className="flex flex-col font-bold">
          Email
          <input type="email" className="rounded-lg pl-2 h-[30px]" />
        </label>
        <label className="flex flex-col font-bold">
          Password
          <input type="password" className="rounded-lg pl-2 h-[30px]" />
        </label>
        <button
          type="submit"
          className=" rounded-lg bg-zinc-200 hover:bg-zinc-400 h-[40px] transition-all items-center justify-center flex"
        >
          Submit
        </button>
      </form>
    </Container>
  );
};

export default SignUp;
