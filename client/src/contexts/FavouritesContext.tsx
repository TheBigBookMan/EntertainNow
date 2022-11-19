import React, { createContext, useContext, useState } from "react";

interface MovieContext {
  favourites: MovieProps[];
  addFavourite: (favourite: MovieProps) => void;
  removeFavourite: (favourite: MovieProps) => void;
}

const contextDefaultValues: MovieContext = {
  favourites: [],
  addFavourite: () => {},
  removeFavourite: () => {},
};

interface Proptypes {
  children: React.ReactNode;
}

const FavouriteContext = createContext<MovieContext>(contextDefaultValues);

export const useFavouriteContext = () => useContext(FavouriteContext);

export const FavouriteProvider = ({ children }: Proptypes) => {
  const [favourites, setFavourites] = useState<MovieProps[]>([]);

  const addFavourite = (favourite: MovieProps): void => {
    setFavourites([...favourites, favourite]);
  };

  const removeFavourite = (favourite: MovieProps) => {
    const newFavouriteList = favourites.filter(
      (selected) => selected !== favourite
    );
    setFavourites(newFavouriteList);
  };

  return (
    <FavouriteContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
