import React from "react";
import { styled } from "styled-components";
import { device } from "../constants";
import { Link } from "react-router-dom";

const CardWrapper = styled.div`
  padding: 16px;
  background-color: #181818;
  border-radius: 8px;
  aspect-ratio: auto;
  cursor: pointer;

  &:hover {
    background-color: #2a2a2a;
  }
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1.25;
  object-fit: cover;
  border-radius: 8px;
`;

const Title = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-top: 10px;
  color: #fff;

  @media ${device.mobile} {
    font-size: 0.7rem;
  }
`;

const MovieCard = React.forwardRef(({ title, image, id }, ref) => {
  return (
    <Link to={`movie/${id}`}>
      <CardWrapper ref={ref}>
        <Image
          src={`https://image.tmdb.org/t/p/w500/${image}`}
          alt="an image"
        />
        <Title>{title}</Title>
      </CardWrapper>
    </Link>
  );
});

export default MovieCard;
