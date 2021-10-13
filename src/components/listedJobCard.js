/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import { WEIGHTS } from "styles/constants";
import { Icon } from './icon'
import { useList } from 'utils/list';
import { formatDate } from "utils/misc";
import { UpdateJobCardButton } from "components/action-buttons.component";
import { Spacer } from './spacer/spacer';
import { ListedJobEditor } from './listedJobEditor';
import { DeleteAction } from "components/deleteAction.js";
import { useRemoveListItem } from "utils/item";

function ListedJobCard({item}) {
    const {
        companyName,
        list: listId,
        location,
        title,
        updatedAt,
        url,
        employmentType,
        _id: id,
    } = item
    console.log({item:id})

    const [removeItem] = useRemoveListItem()

    const list = useList(listId)

    return(
        <Wrapper>
            <InfoWrapper>
                <Title as={url ? 'a' : 'h3'} href={url} target='_blank'>{title}</Title>
                <Spacer size={8} axis='vertical'/>
                <CompanyName>{companyName}</CompanyName>
                <Spacer size={12} axis='vertical'/>
                <Row>
                    <Icon id='location' color={'hsl(340deg 100% 40%)'}/>
                    <Text>{location}</Text>
                </Row>
                <Row>
                    <Icon id='jobType' color={'hsl(150deg 100% 40%)'}/>
                    <Text>{employmentType}</Text>
                </Row>
            </InfoWrapper>
            <ButtonsWrapper>
                <UpdateJobCardButton item={item} list={list}/>
                <ActionButtonsWrapper>
                    <ListedJobEditor job={item} list={list}/>
                    <DeleteAction onDelete={removeItem} id={id} type='item'/>
                </ActionButtonsWrapper>
            </ButtonsWrapper>
            <Footer>{`last updated on ${formatDate(new Date(updatedAt))}`}</Footer>
        </Wrapper>
    )
}

const Wrapper = styled.article`
    display: block;
    position: relative;
    background: white;
    border-radius: 16px;
    box-shadow: -4px 3px 8px 0px hsl(0deg 100% 0% / 0.2);
    padding: 24px 32px;
    overflow: hidden;
`
const InfoWrapper = styled.div`
    margin-bottom: 12px;
`
const Title = styled.h3`
    color: hsl(240deg 0% 20%);
    font-weight: ${WEIGHTS.medium};
    font-size: ${18/16}rem;
    text-decoration: none;
    line-height: 1.5;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
const CompanyName = styled.h4`
    color: hsl(240deg 0% 50%);
    fontSize: 1rem;
    font-weight: ${WEIGHTS.light};
    line-height: 1.5;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
const Text = styled.h5`
    font-size: 0.75rem;
    font-weight: ${WEIGHTS.light};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
`
const ButtonsWrapper = styled.div`
    font-size: ${14/16}rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`
const ActionButtonsWrapper = styled.div`
    display: flex;
    gap: 16px;
`


const Footer = styled.footer`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: hsl(240deg 0% 90%);
    color: hsl(240deg 0% 40%);
    font-size: ${12/16}rem;
    display: block;
    text-align: center;
`

export {ListedJobCard}