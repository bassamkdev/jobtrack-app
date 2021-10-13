/** @jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'

import {Logo} from "../components/logo/logo.component";
import {Lists} from 'components/lists.component'
import * as colors from 'styles/colors'
import { Spacer } from 'components/spacer/spacer'
import { CreateNewList } from 'components/createNewList'

const SideBarWrapper = styled.aside({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  overflow: 'auto',
  background: 'smokewhite',
  padding: '32px 0',
  borderRight: `1px solid ${colors.gray20}`
})

function SideBar() {
  return (
    <SideBarWrapper aria-label='side bar'>
      <LogoWrapper>
        <Logo/>
      </LogoWrapper>
      <Spacer axis={'vertical'} size={160}/>
      <ListsWrapper>
        <Lists />
      </ListsWrapper>
      <Spacer axis='vertical' size={48}/>
      <CreateListWrapper>
        <CreateNewList/>
      </CreateListWrapper>
      <Spacer axis={'vertical'} size={20}/>
    </SideBarWrapper>
  )
}

const LogoWrapper = styled.div`
  padding: 0 32px;
`
const CreateListWrapper = styled.div`
  padding: 0 30px;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const ListsWrapper = styled.div`
  padding-left: 32px;
  width: 100%;
  max-height: 600px;
  overflow: auto;
`
export {SideBar}
