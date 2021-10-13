/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import ReactMarkdown from 'react-markdown'
import {Modal, ModalDismissButton, ModalContentBase, ModalOpenButton} from './compound/modal.component'
import { DialogOverlay, DialogContent } from "@reach/dialog";
import {WEIGHTS} from '../styles/constants'
import { Icon } from "./icon";
import UnstyledButton from './unstyledButton';
import { CreateJobCardButton } from "./action-buttons.component";
import { useLists } from 'utils/list'
import { Spacer } from './spacer/spacer';



function JobDetails({job, list}) {
    const {
        type,
        company,
        location,
        company_logo: companyLogo,
        title,
    } = job

    const lists = useLists()

    return (
        <Modal>
            <ModalOpenButton>
                <DetailsButton>more details</DetailsButton>
            </ModalOpenButton>
            <ModalContentBase>
                <Overlay>
                    <Content>
                        <ModalDismissButton>
                            <DismissButton>
                                <Icon id='close' color='white' size={32}/>
                            </DismissButton>
                        </ModalDismissButton>
                        {
                            list ? (<Flag color={list.color}>{list.name}</Flag>): null
                        }
                        <Summary>
                            <ImageWrapper>
                                <Image alt='' src={companyLogo}/>
                            </ImageWrapper>
                            <Title>{title}</Title>
                            <CompanyName>{company}</CompanyName>
                            <Row>
                                <Icon id='location' color={'hsl(340deg 95% 65%)'}/>   
                                <Location>{location}</Location>
                            </Row>
                            <Row>
                                <Icon id='jobType' color={'hsl(150deg 100% 40%)'}/>   
                                <Type>{type}</Type>
                            </Row>
                            <ButtonsWrapper>
                                {
                                    !list ? (<CreateJobCardButton job={job} lists={lists}/>):null
                                }
                            </ButtonsWrapper>
                        </Summary>
                        <DescriptionWrapper>
                            <Title>Job description:</Title>
                            <Spacer size={32} axis='vertical'/>
                            <ReactMarkdown
                            skipHtml={true}
                            css={{fontFamily: 'Poppins, sans-serif !important', whiteSpace: 'pre-wrap', wordBreak: 'break-word'}}
                            >
                            {job.description}
                            </ReactMarkdown>
                            <ReactMarkdown>{job.how_to_apply}</ReactMarkdown>
                        </DescriptionWrapper>
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
`

const Content = styled(DialogContent)`
    background: white;
    position: absolute;
    top: 64px;
    bottom: 0;
    right: 0;
    left: 0;
    border-radius: 16px 16px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
`
const Summary = styled.div`
    padding: 64px;
    padding-bottom: 32px;
    border-bottom: 1px solid hsla(220deg 5% 50%/ 1);
`

const ImageWrapper = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
`

const Flag = styled.div`
    position: absolute;
    top: 24px;
    right: 0px;
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

const Image = styled.img`
    width: 100%;
`

const Row = styled.div`
    font-size: 1rem;
    font-weight: ${WEIGHTS.light};
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    align-items: flex-start;
    color: hsl(240deg 0% 50%);
    `

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 32px;
    margin-top: 24px;
    `

const Title = styled.h3`
    color: hsl(240deg 0% 20%);
    font-weight: ${WEIGHTS.medium};
    font-size: ${20/16}rem;
    line-height: 1.5;
    `
const CompanyName = styled.h4`
    color: hsl(240deg 0% 50%);
    fontSize: 1rem;
    font-weight: ${WEIGHTS.light};
    line-height: 2.5;
    `

const Location = styled.h5`
    font-size: 0.75rem;
    font-weight: ${WEIGHTS.light};
    `
const Type = styled.h5`
    font-size: 0.75rem;
    font-weight: ${WEIGHTS.light};
    `

const DismissButton = styled(UnstyledButton)`
    position: absolute;
    top: -58px;
    right: 12px;
    padding: 12px;
`

const DetailsButton = styled(UnstyledButton)`
    color: hsl(240deg 0% 50%);
    &:hover {
        color: hsl(240deg 0% 30%);
    }
    `
const DescriptionWrapper = styled.div`
    overflow: auto;
    padding: 64px;
    box-shadow: inset 0px -30px 15px -5px hsla(240deg 0% 50%/0.4);
`

export {JobDetails}