import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../routes/Header";
import Home from "../routes/Home";
import Movie from "../routes/Movie";

const HomeRouter = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </Router>
    </>
  );
};

export default HomeRouter;
