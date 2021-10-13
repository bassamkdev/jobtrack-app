/**@jsx jsx*/
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import { DialogOverlay, DialogContent } from "@reach/dialog";
import {Modal, ModalDismissButton, ModalContentBase, ModalOpenButton} from 'components/compound/modal.component'
import { Icon } from "./icon";
import UnstyledButton from './unstyledButton';
import { Spinner } from "components/lib";
import { useAsync } from 'utils/hooks';

function DeleteAction({id, onDelete, type}) {
    const {run, reset, isLoading, isError} = useAsync()
    function handleDeleteList() {
        if(isError){
            reset()
        }
        run(onDelete({id}))
    }

    return(
        <Modal>
            <ModalOpenButton isTooltip={true} label='delete'>
                <ActionButton hoverColor='crimson'>
                    <Icon id='delete' size={18} />
                </ActionButton>
            </ModalOpenButton>
            <ModalContentBase>
                <Overlay>
                    <Content aria-label='delete list'>
                        <ModalDismissButton>
                            <DismissButton>
                                <Icon id='close' color='white' size={32}/>
                            </DismissButton>
                        </ModalDismissButton>
                            <WarningWrapper>
                                {
                                    type === 'list' 
                                    ? <Warning>Deleting a list will result in deletion of all job cards inside, are you sure?</Warning>
                                    : <Warning>Are you sure to remove the card?</Warning>
                                }
                            </WarningWrapper>
                            <DeleteButton onClick={handleDeleteList}>
                                {
                                    isLoading 
                                    ? (<Spinner/>)
                                    : isError
                                    ? (<Icon id='error'/>)
                                    : (<Icon id='delete'  color='red'/>)
                                }
                            </DeleteButton>
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
    align-items: center;
    gap: 16px;
    padding: 64px 64px 32px 64px;
`

const DismissButton = styled(UnstyledButton)`
    position: absolute;
    top: -58px;
    right: 12px;
    padding: 12px;
`
const ActionButton = styled(UnstyledButton)`
    padding: 6px;
    color: hsl(209deg 15% 65%);
    &:hover {
        color: ${props => props.hoverColor}
    }
`
const WarningWrapper = styled.div`

`

const Warning = styled.p`
    
`
const DeleteButton = styled(UnstyledButton)`
    padding: 8px 12px;
    font-size: ${18/16}rem;
    border: 1px solid red;
    border-radius: 4px;
    width: 100px;
    display: flex;
    justify-content: center;
`




export {DeleteAction}

