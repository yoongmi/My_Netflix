import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../routes/Header";
import Home from "../routes/Home";
import Movie from "../routes/Movie";
import Search from "../routes/Search";
import Tv from "../routes/Tv";

const HomeRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </>
  );
};

export default HomeRouter;
