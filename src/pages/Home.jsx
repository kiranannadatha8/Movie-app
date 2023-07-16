import React from "react";
import Header from "../components/Header";
import { styled } from "styled-components";
import { baseUrl, device, homePageSections } from "../constants";
import HomeSections from "../components/HomeSections";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import useDebounce from "../hooks/useDebounce";

const SectionWrapper = styled.div`
  padding: 0px 60px;

  @media ${device.mobile} {
    padding: 0px 30px;
  }
`;

const MovieGridWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  margin: 40px 0px;

  @media ${device.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
    margin-top: 20px 0;
  }
`;

export const SearchContext = React.createContext("");

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const { ref, inView } = useInView();

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchMovies = async (page) => {
    const data = await axios
      .get(
        `${baseUrl}/movies/search?query=${debouncedSearchQuery}&page=${page}`
      )
      .then((res) => res.data);
    return data;
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["movies", debouncedSearchQuery],
      ({ pageParam = 1 }) => fetchMovies(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return nextPage;
        },
        enabled: debouncedSearchQuery ? true : false,
      }
    );

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const content =
    isSuccess &&
    data.pages.map((page) =>
      page.map((movie) => (
        <MovieCard
          ref={ref}
          key={movie.id}
          id={movie.id}
          title={movie.title}
          image={movie.poster_path}
          overview={movie.overview}
        />
      ))
    );

  return (
    <>
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        <Header />
        <SectionWrapper>
          {searchQuery === "" ? (
            homePageSections.map((section) => (
              <HomeSections
                key={section.internalName}
                name={section.name}
                internalName={section.internalName}
              />
            ))
          ) : (
            <MovieGridWrapper>
              {content}
              {isFetchingNextPage && <h3>Loading...</h3>}
            </MovieGridWrapper>
          )}
        </SectionWrapper>
      </SearchContext.Provider>
    </>
  );
};

export default Home;
