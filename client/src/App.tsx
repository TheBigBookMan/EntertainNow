import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import Favourites from "./pages/Favourites";
import Footer from "./components/common/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Link, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Graphql api- sequelize ORM

// React front end -try some interesting react libraries that could be animation or something cool

// Maybe try bootstrap for easy and good looking UI

// Mobile first

// Typescript

// Ombd API for movie info and filter options to then search etc and then use youtube API for the trailer

// Add in react icons and those react loading animations

// Maybe try PWA and have favourited trailers in a cache

// Learn JWT and caching

// User auth validation

// using state so users that are logged in can view the trailers and favourite while users not logged in can only search

//TODO add in a logo

//TODO need to use Link from react-router-dom so when click on signup page the new page loaded is the listpage

//TODO need Link for once user signs in they can click on favourites page and take to favourites

function App() {
  const [criteria, setCriteria] = useState<Criteria>({
    genre: "",
    typeEntertainment: "",
    rating: 0,
    title: "",
  });

  return (
    <div className="p-2">
      <Link to="/">
        <h1 className="text-center font-bold text-3xl text-zinc-400 mb-1">
          EntertainNow
        </h1>
      </Link>

      <div className="flex flex-col justify-between h-full">
        <Routes>
          <Route
            path="/"
            element={<Home criteria={criteria} setCriteria={setCriteria} />}
          />
          <Route path="list" element={<ListPage criteria={criteria} />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
