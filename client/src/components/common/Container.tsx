interface Proptypes {
  children: React.ReactNode;
}

const Container = ({ children }: Proptypes) => {
  return (
    <div className="flex flex-col border-solid border-2 rounded-lg bg-zinc-100 p-2 shadow-lg h-[580px] ">
      {children}
    </div>
  );
};

export default Container;
