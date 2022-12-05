import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../routes/Header";
import Movie from "../routes/Movie";
import Search from "../routes/Search";
import Tv from "../routes/Tv";
import Home from "../routes/Home";
import Footer from "./Footer";

const HomeRouter = () => {
  return (
    <>
      <BrowserRouter basename="/My_Netflix">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:category/:movieId" element={<Movie />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/tv/:category/:movieId" element={<Tv />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:category/:movieId" element={<Search />} />
          <Route path="/tv/search2/:movieId" element={<Search />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default HomeRouter;
