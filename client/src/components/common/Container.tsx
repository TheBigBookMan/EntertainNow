interface Proptypes {
  children: React.ReactNode;
  displayActive: boolean;
}

const Container = ({ children, displayActive }: Proptypes) => {
  return (
    <div
      className={`relative flex flex-col border-solid border-2 rounded-lg bg-zinc-100 p-2 shadow-lg h-[580px] ${
        displayActive ? "brightness-50" : "brightness-100"
      } transition-all`}
    >
      {children}
    </div>
  );
};

export default Container;
