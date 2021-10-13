/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {useAuth0} from '@auth0/auth0-react'
import {Modal, ModalDismissButton, ModalContentBase, ModalOpenButton} from './compound/modal.component'
import { DialogOverlay, DialogContent } from "@reach/dialog";
import * as COLORS from 'styles/colors'
import { Icon } from "./icon";
import UnstyledButton from './unstyledButton';
import { Lists } from './lists.component';
import { CreateNewList } from './createNewList';
import { Spacer } from './spacer/spacer';


function MobileMenu() {
    const {logout} = useAuth0()
    return (
        <Modal>
            <ModalOpenButton isTooltip={false} label='menu'>
                <UnstyledButton>
                    <Icon id='menu' size={32} strokeWidth={3}/>
                </UnstyledButton>
            </ModalOpenButton>
            <ModalContentBase>
                <Overlay>
                    <Content aria-label='edit item'>
                        <ModalDismissButton>
                            <DismissButton>
                                <Icon id='close' color='black' size={32}/>
                            </DismissButton>
                        </ModalDismissButton>
                        <LogoutButton onClick={logout}>
                            Log Out
                        </LogoutButton>
                        <Filler/>
                        <MobileNav>
                            <Lists/>
                        </MobileNav>
                        <Spacer axis='vertical' size={32}/>
                        <CreateNewListWrapper>
                            <CreateNewList/>
                        </CreateNewListWrapper>
                    </Content>
                </Overlay>
            </ModalContentBase>
        </Modal>
    )
}


const Overlay = styled(DialogOverlay)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: hsla(220deg 5% 5%/ 0.6);
    display: flex;
    justify-content: flex-end;
`

const Content = styled(DialogContent)`
    position: relative;
    background: white;
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 32px;
    padding-right: 0;
`


const DismissButton = styled(UnstyledButton)`
    position: absolute;
    top: 6px;
    right: 6px;
    padding: 12px;
`
const LogoutButton = styled(UnstyledButton)`
    position: absolute;
    top: 10px;
    left: 20px;
    padding: 12px;
    color: ${COLORS.gray80};
    font-size: ${16/16}rem;
`

const MobileNav = styled.nav`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: 300px;
    overflow: auto;
    padding-right: 22px;
`

const CreateNewListWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`

const Filler = styled.div`
    flex: 1;
`
export {MobileMenu}