import React, { useContext } from "react";
import { RiSearchLine } from "react-icons/ri";
import styled from "styled-components";
import { SearchContext } from "../pages/Home";
import { device } from "../constants";

const SearchBarWrapper = styled.div`
  position: relative;
`;

const TextInput = styled.input`
  background-color: #242424;
  border: 0;
  border-radius: 500px;
  color: #fff;
  height: 48px;
  padding: 6px 38px;
  text-overflow: ellipsis;
  font-size: 0.875rem;
  font-weight: 400;
  outline: none;

  @media ${device.mobile} {
    height: 38px;
    font-size: 0.65rem;
    padding: 4px 32px;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 12px;
  display: flex;
  align-items: center;
`;
const SearchIcon = styled(RiSearchLine)`
  color: hsla(0, 0%, 100%, 0.7);
  height: 20px;
  width: 20px;
  font-weight: 400;

  @media ${device.mobile} {
    height: 16px;
    width: 16px;
  }
`;

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  const handleOnChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <SearchBarWrapper>
      <form role="search" onSubmit={onSubmitHandler}>
        <TextInput
          type="search"
          role="searchbox"
          aria-description="search results will appear below"
          id="search"
          value={searchQuery}
          placeholder="Search for a movie..."
          onChange={handleOnChange}
        />
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
      </form>
    </SearchBarWrapper>
  );
};

export default SearchBar;
