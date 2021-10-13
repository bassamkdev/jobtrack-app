/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {Modal, ModalDismissButton, ModalContentBase, ModalOpenButton} from './compound/modal.component'
import { DialogOverlay, DialogContent } from "@reach/dialog";
import {WEIGHTS, QUERIES} from '../styles/constants'
import { Icon } from "./icon";
import UnstyledButton from './unstyledButton';
import { NotesTextarea } from './noteTextArea.component';
import { UpdateItemForm } from './form.component';



function ListedJobEditor({job, list}) {
    return (
        <Modal>
            <ModalOpenButton isTooltip={true} label='edit'>
                        <ActionButton hoverColor={'hsl(150deg 100% 40%)'}>
                            <Icon id='edit' size={18}/>
                        </ActionButton>
            </ModalOpenButton>
            <ModalContentBase>
                <Overlay>
                    <Content aria-label='edit item'>
                        <ModalDismissButton>
                            <DismissButton>
                                <Icon id='close' size={32}/>
                            </DismissButton>
                        </ModalDismissButton>
                        {
                            list ? (<Flag color={list.color}>{list.name}</Flag>): null
                        }
                            <UpdateItemForm item={job}/>
                            <NotesTextarea item={job}/>
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
    background: hsla(220deg 5% 5%/ 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Content = styled(DialogContent)`
    background: white;
    position: relative;
    flex: 1;
    max-width: 700px;
    border-radius: 16px 16px 16px 16px;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    padding: 64px 64px 32px 64px;
    @media ${QUERIES.phoneAndSmaller}{
        padding-top: 80px;
        border-radius: 0%;
        height: 100%;
        overflow: auto;
        overflow-x: hidden;
    }
`

const Flag = styled.div`
    position: absolute;
    top: 24px;
    right: -4px;
    background: ${({color}) => color};
    height: 32px;
    min-width: 128px;
    line-height: 32px;
    padding: 0 10px;
    font-size: ${14/16}rem;
    font-weight: ${WEIGHTS.bold};
    color: white;
    border-radius: 3px 2px 2px 3px;
    box-shadow: -2px 4px 6px 0px hsl(0deg 100% 0% / 0.2);
`

const DismissButton = styled(UnstyledButton)`
    position: absolute;
    top: -58px;
    right: 12px;
    padding: 12px;
    color: white;
    @media ${QUERIES.phoneAndSmaller}{
        top: 12px;
        left: 12px;
        color: black;
    }
`
const ActionButton = styled(UnstyledButton)`
    color: hsl(209deg 15% 65%);
    padding: 6px;
    &:hover {
        color: ${props => props.hoverColor}
    }
`
export {ListedJobEditor}