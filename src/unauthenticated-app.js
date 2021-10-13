/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {useAuth0} from '@auth0/auth0-react'
import { Spacer } from "components/spacer/spacer";
import { UnauthenticatedHeader } from 'components/unauthenticated-app/header'
import UnstyledButton from 'components/unstyledButton'
import * as COLORS from 'styles/colors'
import { WEIGHTS, QUERIES } from 'styles/constants'

function UnauthenticatedApp() {
  const {loginWithRedirect} = useAuth0()
  return (
    <PagesWrapper>
    <UnauthenticatedHeader onLogin={loginWithRedirect}/>
    <HeroWrapper id='hero'>
      <HeroGradient/>
      <HeroSwoop width="100%" height="303" viewBox="0 0 1440 303" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" >
        <path d="M339 122C220.647 106.212 176.609 -12.2323 58 1.50005C29.0671 4.84984 -14.5 19.0001 -14.5 19.0001V303H1443V184C1443 184 1296.24 217.673 1200.5 221C974.265 228.862 864.366 79.4709 638 81.0001C520.143 81.7962 455.825 137.584 339 122Z" fill="hsl(274deg 16% 6%)"></path>
      </HeroSwoop>
      <HeroStuff>
      <LeftCol>
        <HeroHeading>Organize job applications.</HeroHeading>
        <Spacer size='48'/>
        <HeroSubheading>
          <HeroDesktopText>The all-new intactive job application management experience designed to help job seekers organize their applications</HeroDesktopText>
          <HeroMobileText>The all-new job application management experience designed to help job seekers organize their applications</HeroMobileText>
        </HeroSubheading>
        <Spacer size='48'/>
        <MainButton onClick={loginWithRedirect}>get started</MainButton>
      </LeftCol>
      <RightCol>
        <ImageWrapper>
          <img src='desktop-screen-shot.png' alt='app screen shot' width='100%'/>
        </ImageWrapper>
      </RightCol>
      </HeroStuff>
    </HeroWrapper>
    {/* <section id='features'>
      <FeaturesWrapper>
        <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, fugiat saepe dicta sint sunt similique possimus!</h2>
        <div>features 1</div>
        <div>features 2</div>
        <div>features 3</div>
      </FeaturesWrapper>
    </section>
    <section id='about'>
      <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis excepturi beatae enim consectetur voluptates at, veniam inventore deserunt aut culpa tempora praesentium assumenda et totam aspernatur debitis error explicabo consequatur!</p>
      <img src="" alt="image of the app" />
    </section>
    <footer id='hero'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eum similique, magnam, minus magni debitis ullam, enim nihil eius tempore cupiditate perspiciatis laudantium quo tempora in id omnis ut at!
    </footer> */}
    </PagesWrapper>
  )
}

const PagesWrapper = styled.main`
  background-color: hsl(274deg 16% 6%);
  color: hsl(0deg,0%,100%);
  max-width: 100%;
  overflow: hidden;
`

const HeroGradient = styled.div`
  position: absolute;
  top: 50%;
  left: 0px;
  width: 100%;
  height: 50%;
  background: linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.14) 100%);;
`

const HeroSwoop = styled.svg`
  position: absolute;
  left: 0px;
  right: 0px;
  bottom: -75px;
`

const HeroWrapper = styled.section`
  position: relative;
  height: 100vh;
  min-height: 750px;
  /* max-height: 850px; */
`

const HeroStuff = styled.div`
  height: 100%;
  min-height: 650px;
  max-height: 750px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 32px 64px 0;

  @media ${QUERIES.tabletAndSmaller}{
    padding: 72px 24px 0px;
    flex-direction: column;
  }
`

const LeftCol = styled.div`
 flex: 1;
 display: flex;
 flex-direction: column;
 justify-content: center;
`

const RightCol = styled.div`
 flex:2;
 text-align: center;
 @media ${QUERIES.tabletAndSmaller}{
   display: none;
 }
`

const HeroHeading = styled.h1`
  font-size: min(72px, 8vw);
  font-weight: 800;
  width: auto;
  text-align: left;
  background-color: rgb(255, 178, 62);
  background-image: linear-gradient(268.67deg, rgb(255, 255, 255) 3.43%, rgb(255, 240, 102) 15.69%, rgb(255, 163, 26) 55.54%, rgb(255, 0, 115) 99%);
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0px;
  text-rendering: optimizeLegibility;

  @media ${QUERIES.tabletAndSmaller}{
    font-size: 12vw;
    text-align: center;
    line-height: 1.5;
    font-weight: 800;
    width: auto;
  }
`

const HeroSubheading = styled.h2`
  font-size: 24px;
  font-weight: ${WEIGHTS.light};
  max-width: 818px;
  text-align: left;
`
const HeroDesktopText = styled.span`
    @media ${QUERIES.phoneAndSmaller}{
      display: none;
    }
`
const HeroMobileText = styled.span`
  display: none;
  @media ${QUERIES.phoneAndSmaller}{
      display: block;
    }
`

const MainButton = styled(UnstyledButton)`
  font-size: 1.125rem;
  background: linear-gradient(
    90deg,
    rgba(124,185,251,1) 0%, 
    rgba(145,138,255,1) 100%);
  z-index: 10;
  color: ${COLORS.base};
  padding: 16px 32px;
  border-radius: 32px;
  box-shadow: -2px 4px 10px 0px hsl(0deg 100% 0% / 0.2);
  max-width: 250px;
  text-align: center;
  align-self: center;
  &:active {
    box-shadow: -1px 2px 5px 0px hsl(0deg 100% 0% / 0.2);
  }
`
// const MaxWidthWrapper = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 730px;
//   margin-left: auto;
//   margin-right: auto;
//   padding-left: 32px;
//   padding-right: 32px;
// `

const ImageWrapper = styled.div`
  width: 100%;
`


export default UnauthenticatedApp
