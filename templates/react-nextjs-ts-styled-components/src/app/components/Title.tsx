"use client";
import React from "react";
import styled from "styled-components";

const StyledTitle = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const Title = () => {
  return (
    <Wrapper>
      <StyledTitle>Hello World!</StyledTitle>
    </Wrapper>
  );
};

export default Title;
