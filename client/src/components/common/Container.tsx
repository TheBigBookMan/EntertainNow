interface Proptypes {
  children: React.ReactNode;
  displayActive: boolean | null;
}

//* Container component used globally for all other components
const Container = ({ children, displayActive }: Proptypes) => {
  return (
    <div
      className={`relative flex flex-col items-center border-solid border-2 rounded-lg bg-zinc-100 p-2 shadow-lg h-[580px] ${
        displayActive ? "brightness-50" : "brightness-100"
      } transition-all`}
    >
      {children}
    </div>
  );
};

export default Container;
