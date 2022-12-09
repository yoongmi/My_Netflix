import styled from "styled-components";
// icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { searchMovie, searchpeople, searchtv } from "../api/userApi";
import { Imovies, Ipeople } from "../interface/userInterface";
import { useForm } from "react-hook-form";
import Slider from "../components/Slider";
import { ImgMakeSrc } from "../utils";

interface IForm {
  keyword: string;
  cate: string;
}

const Search = () => {
  // 검색하기
  const history = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const submit = (data: IForm) => {
    if (data.keyword.length === 0) return alert("검색어를 입력해주세요");
    history(`/search?cate=${data.cate}&keyword=${data.keyword}`);
  };

  // 결과값 받기
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const category = new URLSearchParams(location.search).get("cate");

  const { data: movieData } = useQuery<Imovies>(
    ["searchMovie", keyword],
    () => searchMovie(keyword),
    { enabled: !!keyword }
  );
  const { data: tvData } = useQuery<Imovies>(
    ["searchTv", keyword],
    () => searchtv(keyword),
    { enabled: !!keyword }
  );
  const { data: peopleData } = useQuery<Ipeople>(
    ["searchPeople", keyword],
    () => searchpeople(keyword),
    { enabled: !!keyword }
  );
  const number = peopleData?.results.length;
  return (
    <>
      <SearchForm>
        <h3>검색어를 입력해주세요.</h3>
        <form onSubmit={handleSubmit(submit)}>
          <select {...register("cate")} name="cate" id="category">
            <option value="all">all</option>
            <option value="movie">movie</option>
            <option value="tv">tv</option>
            <option value="people">people</option>
          </select>
          <input {...register("keyword")} type="text" name="keyword" />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        {keyword && (
          <h4>
            <b>'{keyword}'</b> 의 검색결과
          </h4>
        )}
      </SearchForm>
      {(category === "all" || category === "movie") && (
        <Slider
          content={movieData ? movieData?.results : []}
          page="search"
          title="검색된 영화"
          video="movie"
          cate="search"
        />
      )}
      {(category === "all" || category === "tv") && (
        <Slider
          content={tvData ? tvData?.results : []}
          page="search"
          title="검색된 tv 프로그램"
          video="tv"
          cate="search2"
        />
      )}
      {(category === "all" || category === "people") && (
        <PeopleList>
          <h4>검색된 인물</h4>
          {number === 0 ? (
            <p className="no_data">검색 결과 없습니다.</p>
          ) : (
            <List>
              {peopleData?.results.map((item) => (
                <Li key={item.id} bgimg={ImgMakeSrc(item.profile_path, "w500")}>
                  <p>{item.name}</p>
                </Li>
              ))}
            </List>
          )}
        </PeopleList>
      )}
    </>
  );
};
const SearchForm = styled.div`
  padding: 50px 20px;
  box-sizing: border-box;
  text-align: center;
  h3 {
    margin-bottom: 30px;
    font-size: 20px;
  }
  h4 {
    margin-top: 50px;
    font-size: 30px;
    b {
      font-weight: bold;
    }
  }
  form {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 800px;
    margin: 0 auto;
    border-bottom: 2px solid ${(props) => props.theme.txtColor};
    vertical-align: bottom;
    & * {
      font-size: 20px;
      color: ${(props) => props.theme.txtColor};
      border: 0 none;
      background-color: transparent;
    }
    select {
      width: 10%;
      height: 50px;
    }
    input {
      width: 80%;
      height: 50px;
      padding: 0 10px;
    }
    button {
      width: 10%;
      cursor: pointer;
    }
  }
`;
const PeopleList = styled.div`
  padding: 20px 50px 0;
  box-sizing: border-box;
  h4 {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: bold;
  }
  p.no_data {
    padding: 30px 0;
    text-align: center;
    background-color: ${(props) => props.theme.bgOpacity};
    border-radius: 5px;
  }
`;
const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;
const Li = styled.li<{ bgimg: string }>`
  width: 10%;
  height: 200px;
  background: ${(props) => props.theme.bgGradient},
    url(${(props) => props.bgimg}) no-repeat center center / cover;
  display: flex;
  align-items: flex-end;
  p {
    width: 100%;
    padding: 10px;
    font-size: 12px;
  }
`;
export default Search;
