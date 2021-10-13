/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {useLocation} from 'react-router-dom'
import { Logo } from "components/logo/logo.component";
import { ProfileButton } from "components/profileButton";
import * as colors from 'styles/colors'
import { QUERIES, WEIGHTS } from 'styles/constants'
import { MobileMenu } from 'components/mobileMenu';
import { CreateJobCard } from "components/createJobCard";
import UnstyledButton from "components/unstyledButton";
import {Icon} from 'components/icon'

const TopBarWrapper = styled.header`
  background: smokewhite;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 42px 32px;
  @media ${QUERIES.phoneAndSmaller}{
    padding: 8px 16px;
    flex-direction: column-reverse;
    align-items: stretch;
  }
`

const TopBarTitle = styled.h2`
  margin: 0;
  text-transform: capitalize;
  color: ${colors.grayText};
  @media ${QUERIES.phoneAndSmaller}{
    font-size: ${16/16}rem;
    font-weight: ${WEIGHTS.light};
    font-style: italic;
  }
`
const AddButton = styled(UnstyledButton)`
  padding: 8px;
  border-radius: 50%;
`

const OpenButton = <AddButton><Icon id='add' size='32' strokeWidth='4' color='hsla(145deg 50% 60% / 1)' filter='drop-shadow(-2px 2px 2px hsla(120 0% 0% / 0.2))'/></AddButton>

function TopBar() {
  const {pathname} = useLocation()
  return (
    <TopBarWrapper aria-label='top bar'>
      <TopBarTitle aria-label='page title'>{pathname.slice(1).replace(/&-&/g, ' ')}</TopBarTitle>
      <UpperRow>
        <LogoWrapper>
          <Logo/>
        </LogoWrapper>
        <ButtonsWrapper>
          <MobileActions>
            <CreateJobCard OpenButton={OpenButton}/>
            <MobileMenu/>
          </MobileActions>
          <ProfileButtonWrapper>
            <ProfileButton/>
          </ProfileButtonWrapper>
        </ButtonsWrapper>
      </UpperRow>

    </TopBarWrapper>
  )
}

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
`

const LogoWrapper = styled.div`
  display: none;
  @media ${QUERIES.phoneAndSmaller}{
    display: block; 
  }
`

const UpperRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media ${QUERIES.phoneAndSmaller }
`


const MobileActions = styled.div`
  display: none;
  @media ${QUERIES.phoneAndSmaller}{
    display: flex;
    gap: 16px;
    position: absolute;
    top: 13px;
    right: 16px;
  }
`

const ProfileButtonWrapper = styled.div`
    @media ${QUERIES.phoneAndSmaller}{
      display: none; 
    }
`

export {TopBar}
