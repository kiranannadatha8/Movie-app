import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { baseUrl, device } from "../constants";
import { useQuery } from "react-query";
import { styled } from "styled-components";

const MovieDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;

  @media (min-width: 500px) {
    flex-direction: row;
    gap: 40px;
  }
`;

const BackDropImage = styled.img`
  object-fit: cover;
  height: 42rem;
  border-radius: 8px;
  opacity: 0.8;
`;
const MovieDetails = styled.div`
  margin-top: 20px;

  @media (min-width: 500px) {
    margin-top: unset;
  }
`;
const MovieTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;

  @media (min-width: 500px) {
    font-size: 2.5rem;
  }
`;

const OverviewTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 10px 0;

  @media (min-width: 500px) {
    font-size: 1.5rem;
  }
`;

const OverviewText = styled.p`
  font-size: 0.875rem;
  color: #a7a7a7;
  font-weight: 400;

  @media (min-width: 500px) {
    font-size: 1rem;
    line-height: 2rem;
  }
`;
const ReleasedTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 500;

  @media (min-width: 500px) {
    font-size: 1.2rem;
  }
`;

const ReleasedDate = styled.span`
  font-size: 0.8rem;
  font-weight: 400;
  color: #a7a7a7;

  @media (min-width: 500px) {
    font-size: 1rem;
  }
`;

const MovieInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 18px;
`;

const Rating = styled.span`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 10px;
  background-color: #2a2a2a;
  border-radius: 5px;
`;

const ProductionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  align-items: center;
  margin-top: 5rem;
  margin-bottom: 10rem;

  @media ${device.mobile} {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`;

const Pills = styled.span`
  font-size: 1rem;
  padding: 12px;
  background-color: #2a2a2a;
  text-align: center;
  border-radius: 500px;
  white-space: nowrap;

  @media ${device.mobile} {
    font-size: 0.875rem;
  }
`;

const MovieDetailsPage = () => {
  const { id } = useParams();

  const fetchMovieDetails = async () => {
    const response = await axios.get(`${baseUrl}/movies/details/${id}`);
    return response.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["details", id],
    queryFn: fetchMovieDetails,
  });

  if (isLoading) {
    return <p>loading</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching movies.</p>;
  }

  return (
    <>
      <MovieDetailsWrapper>
        <BackDropImage
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
        />
        <MovieDetails>
          <MovieTitle>{data.title}</MovieTitle>
          <OverviewTitle>Overview</OverviewTitle>
          <OverviewText>{data.overview}</OverviewText>
          <ProductionWrapper>
            {data.genres.map((genre) => (
              <Pills>{genre.name}</Pills>
            ))}
          </ProductionWrapper>
          <MovieInfo>
            <div>
              <ReleasedTitle>Released</ReleasedTitle>
              <ReleasedDate>{data.release_date}</ReleasedDate>
            </div>
            <div>
              <Rating>{Number(data.vote_average).toFixed(1)}</Rating>
            </div>
          </MovieInfo>
        </MovieDetails>
      </MovieDetailsWrapper>
    </>
  );
};

export default MovieDetailsPage;
