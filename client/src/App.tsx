import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import Favourites from "./pages/Favourites";
import Footer from "./components/common/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Link, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Provider as UserProvider } from "./contexts/UserContext";

// React front end -try some interesting react libraries that could be animation or something cool

// Ombd API for movie info and filter options to then search etc and then use youtube API for the trailer

// Add in react icons and those react loading animations

// Maybe try PWA and have favourited trailers in a cache

// Learn JWT and caching

// User auth validation

// using state so users that are logged in can view the trailers and favourite while users not logged in can only search

//TODO add comments to important functionalities

//TODO add in a logo

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const user = JSON.parse(localStorage.getItem("user") as string);

  if (user === null) {
    return;
  }

  const { token } = user;

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

function App() {
  const [criteria, setCriteria] = useState<Criteria>({
    genre: "",
    typeEntertainment: "",
    rating: 0,
    title: "",
  });

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <div className="p-2">
          <Link to="/">
            <h1 className="text-center font-bold text-3xl text-zinc-400 mb-1">
              EntertainNow
            </h1>
          </Link>

          <div className="flex flex-col justify-between h-full">
            <Routes>
              <Route
                index
                element={<Home criteria={criteria} setCriteria={setCriteria} />}
              />
              <Route path="list/*" element={<ListPage criteria={criteria} />} />
              <Route path="favourites" element={<Favourites />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Routes>

            <Footer />
          </div>
        </div>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
