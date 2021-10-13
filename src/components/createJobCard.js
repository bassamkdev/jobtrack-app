/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from "@emotion/styled/macro";
import {Modal, ModalDismissButton, ModalContentBase, ModalOpenButton} from './compound/modal.component'
import { DialogOverlay, DialogContent } from "@reach/dialog";
import {AddJobForm} from 'components/form.component'
import { useCreateListItem } from "utils/item";
import UnstyledButton from './unstyledButton';
import { Icon } from "./icon";
import { WEIGHTS, QUERIES } from 'styles/constants';

function CreateJobCard({OpenButton}) {
    const [handleCreateListItem] = useCreateListItem()
    return(
        <Modal>
            <ModalOpenButton isTooltip={true} label='create job card'>
                {OpenButton}
            </ModalOpenButton>
            <ModalContentBase>
                <Overlay>
                    <Content aria-label='create new card'>
                        <ModalDismissButton>
                            <DismissButton>
                             <Icon id='close' size={32}/>
                            </DismissButton>
                        </ModalDismissButton>
                        <Flag >Create a new card</Flag>
                        <AddJobForm onSubmit={handleCreateListItem} submitButton={<SaveButton/>}/>
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

const Flag = styled.div`
    position: absolute;
    top: 24px;
    right: -4px;
    background: rgba(82,190,162,1);
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

const SaveButton = styled.button`
  width: 100px;
  cursor: pointer;
  height: 36px;
  border: none;
  border-radius: 4px;
  background-color: ${({status}) => status === 'success' ? 'hsl(150deg 100% 40%)' : status === 'loading' ? 'hsl(240deg 0% 50%)' : 'hsl(149deg 45% 53%)' };
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover{
    background-color: ${({status}) => status === 'success' ? 'hsl(150deg 90% 40%)' : status === 'loading' ? 'hsl(240deg 0% 60%)' : 'hsl(149deg 45% 63%)' };
  }
  &:disabled{
      background: none;
      cursor: not-allowed;
      color: hsl(240deg 0% 40%);
  }
`

export {CreateJobCard}