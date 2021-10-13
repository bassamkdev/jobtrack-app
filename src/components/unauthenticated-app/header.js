/* @jsx jsx */
import {jsx} from '@emotion/react'
import * as React from 'react'
import styled from '@emotion/styled/macro'
import {Logo} from "components/logo/logo.component";
import * as COLORS from 'styles/colors'
import {WEIGHTS, QUERIES} from 'styles/constants'
import UnstyledButton from 'components/unstyledButton';


function UnauthenticatedHeader({onLogin}) {
    return(
        <HeaderWrapper>
            <MaxWidthWrapper>
                <HeaderInnerWrapper>
                    <LogoWrapper>
                        <Logo/>
                    </LogoWrapper>
                    <DesktopNav>
                        <NavLink href='hero'>home</NavLink>
                        {/* <NavLink href='features'>features</NavLink>
                        <NavLink href='about'>about</NavLink> */}
                        <LoginButton onClick={onLogin} >login</LoginButton>
                    </DesktopNav>
                </HeaderInnerWrapper>
            </MaxWidthWrapper>
        </HeaderWrapper>
    )
}

const HeaderWrapper = styled.header`
    background: rgba(16, 13, 18, 0.5);
    backdrop-filter: blur(10px);
    position: fixed;
    z-index: 10;
    top: 0px;
    left: 0px;
    right: 0px;
`

const MaxWidthWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 32px;
    padding-right: 32px;

    @media ${QUERIES.tabletAndSmaller}{
        max-width: 800px;
    }
`

const HeaderInnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: baseline;
    padding-top: 16px;
    padding-bottom: 16px;
    text-shadow: rgb(0 0 0/50%) 0px 1px 3px;
`

const DesktopNav = styled.nav`
    display: flex;
    gap: clamp(1rem, 10.7vw - 5.25rem, 4.3rem);
    /* margin: 0px 48px; */
`

const LogoWrapper = styled.div`
    flex: 1;
`

const NavLink = styled.a`
    font-size: 1.125rem;
    text-transform: uppercase;
    text-decoration: none;
    color: ${COLORS.gray80};
    font-weight: ${WEIGHTS.medium};

    &:first-of-type{
        color: ${COLORS.indigo}
    }
`

const LoginButton = styled(UnstyledButton)`
     font-size: 1.125rem;
    text-transform: uppercase;
    color: ${COLORS.gray80};
    font-weight: ${WEIGHTS.medium};

`


export {UnauthenticatedHeader}