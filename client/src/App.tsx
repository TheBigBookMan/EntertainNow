import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import Favourites from "./pages/Favourites";
import Footer from "./components/common/Footer";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { GiFilmProjector } from "react-icons/gi";
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

const httpLink = createHttpLink({
  uri: "https://entertainnow.herokuapp.com/graphql",
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
        <div className="p-2 bg-gradient-to-b from-sky-600 to-indigo-700">
          <Link to="/" className="flex gap-2 justify-center items-center">
            <GiFilmProjector className="text-3xl" />
            <h1 className="text-center tracking-widest font-bold text-4xl text-zinc-100 mb-2 font-lobster">
              EntertainNow
            </h1>
          </Link>

          <div className="flex flex-col justify-between min-h-[848px]">
            <Routes>
              <Route
                index
                element={<Home criteria={criteria} setCriteria={setCriteria} />}
              />
              <Route
                path="list/*"
                element={
                  <ListPage criteria={criteria} setCriteria={setCriteria} />
                }
              />
              <Route path="favourites/*" element={<Favourites />} />
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
