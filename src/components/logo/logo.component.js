/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import { QUERIES } from 'styles/constants';

const Logo = (props) => {
  return (
    <Link href="/">
      <Wrapper {...props}>JobTrack</Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  :hover {
      text-decoration: none;
      color: inherit;
  }
`;

const Wrapper = styled.h1`
  font-size: 2rem;
  font-family:'Fredoka One', cursive;
  
  @media ${QUERIES.phoneAndSmaller}{
    font-size: 1.2rem;
  }
`;

export {Logo};
