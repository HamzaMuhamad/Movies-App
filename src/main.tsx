// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import Loading from "./components/loading/Loading.tsx";
// import ContentDetails from "./pages/content/ContentDetails";
import Content from "./pages/content/Content";
import Search from "./pages/search/Search";
import Home from "./pages/Home";
// import Actor from "./pages/actors/ActorDetails.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { movies, tvShows, search } from "./util/API";

import Layout from "./components/layout/Layout";


const router = createBrowserRouter([

  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home
      },
    
      {
        path: "movies",
        loader: async () => {
          return [...movies.results]
        },
        element: <Content areMovies={true}/>
      },
    
      {
        path: "tv",
        loader: async () => {
          return [...tvShows.results]
        },
        element: <Content areMovies={false}/>
      }

    ]
  },

  {
    path: "/search",
    loader: async ({request}) => {
      const requestURL = new URL(request.url);
      const searchParams = requestURL.searchParams;
      return await search(searchParams.get("page"), searchParams.get("query"))
    },
    Component: Search
  },
])

console.log(personsPopular.page)
createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <section>
      {/* <Navbar /> */}
      {/* <Home /> */}
      {/* <ContentDetails isMovie={true} id={503} /> */}
      {/* <Actor id={503} /> */}
      {/* <Content areMovies={true} /> */}
      {/* <Loading /> */}
      <RouterProvider router={router} />
    </section>
  // </StrictMode>,
);
