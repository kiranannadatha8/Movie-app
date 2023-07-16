import React from "react";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { baseUrl, device } from "../constants";
import MovieCard from "./MovieCard";

const SectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  margin-top: 40px;

  @media ${device.mobile} {
    margin-top: 20px;
  }
`;

const SectionTitleWrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 1.7rem;
  color: #fff;
  font-weight: 600;

  @media ${device.mobile} {
    font-size: 1.3rem;
  }
`;

const MovieGridWrapper = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));

  @media ${device.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  }
`;

const HomeSections = ({ name, internalName }) => {
  const { data, isLoading, isError } = useQuery([`${internalName}`], () =>
    axios.get(`${baseUrl}/movies/${internalName}`).then((res) => res.data)
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching movies.</p>;
  }
  return (
    <SectionWrapper>
      <SectionTitleWrapper>
        <SectionTitle>{name}</SectionTitle>
      </SectionTitleWrapper>
      <MovieGridWrapper>
        {data.slice(0, 5).map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            image={movie.poster_path}
            overview={movie.overview}
          />
        ))}
      </MovieGridWrapper>
    </SectionWrapper>
  );
};

export default HomeSections;
