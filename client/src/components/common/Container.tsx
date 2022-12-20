interface Proptypes {
  children: React.ReactNode;
  displayActive: boolean | null;
}

//* Container component used globally for all other components
const Container = ({ children, displayActive }: Proptypes) => {
  return (
    <div
      className={`relative flex flex-col items-center border-solid rounded-lg bg-gradient-to-b from-sky-500 to-indigo-500 p-2 shadow-lg min-h-[748px]  ${
        displayActive ? "brightness-50" : "brightness-100"
      } transition-all`}
    >
      {children}
    </div>
  );
};

export default Container;
