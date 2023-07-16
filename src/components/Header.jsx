import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import { device } from "../constants";

const HeaderWrapper = styled.header`
  width: 100%;
  height: 5rem;
  background-color: #121212;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 60px;

  @media ${device.mobile} {
    height: 4rem;
    padding: 0px 30px;
  }
`;

const Logo = styled.span`
  color: #fff;
  font-size: 1.5rem;
  font-weight: 600;
  display: block;

  &::after {
    content: ".";
    color: #1ed760;
    padding-left: 5px;
  }

  @media ${device.mobile} {
    font-size: 1.1rem;

    &::after {
      padding-left: 2px;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>MovieFlix</Logo>
      <SearchBar />
    </HeaderWrapper>
  );
};

export default Header;
