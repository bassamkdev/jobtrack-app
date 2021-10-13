/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'
import {CreateJobCardButton} from 'components/action-buttons.component'
import { WEIGHTS } from 'styles/constants'
import { Icon } from './icon'
import { useLists } from 'utils/list'
import { useItems } from 'utils/item'
import { JobDetails } from './jobDetails'

function JobCard({job}) {
    const {
        type,
        company,
        location,
        company_logo: companyLogo,
        title,
    } = job
    const lists = useLists()
    const items = useItems()
    const listedJob = items.find(item => item.jobId === job.id) 

    let list
    if (listedJob) {
        list = lists.find(list => list._id === listedJob.list)
    }

    return (
        <Wrapper>
            {
                list ? (<Flag color={list.color}>{list.name}</Flag>): null
            }
            <ImageWrapper>
                <Image alt='' src={companyLogo}/>
            </ImageWrapper>
            <RightColumn>
                <Title>{title}</Title>
                <CompanyName>{company}</CompanyName>
                <Row>
                    <Icon id='location' color={'hsl(340deg 95% 65%)'}/>   
                    <Text>{location}</Text>
                </Row>
                <Row>
                    <Icon id='jobType' color={'hsl(150deg 100% 40%)'}/>   
                    <Text>{type}</Text>
                </Row>
            <ButtonsWrapper>
                {
                    !list ? (<CreateJobCardButton job={job} />):null
                }
                <JobDetails job={job} list={list} />
            </ButtonsWrapper>
            </RightColumn>
        </Wrapper>
    )
}

const Wrapper = styled.article`
    position: relative;
    background: hsl(0deg 100% 100%);
    border-radius: 16px;
    box-shadow: -4px 3px 8px 0px hsl(0deg 100% 0% / 0.2);
    display: flex;
    gap: 40px;
    padding: 24px 48px;
    align-items: center;
`;

const ImageWrapper = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
`

const Image = styled.img`
    width: 100%;
`

const RightColumn = styled.div`

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
    font-size: ${18/16}rem;
    line-height: 1.5;
`
const CompanyName = styled.h4`
    color: hsl(240deg 0% 50%);
    fontSize: 1rem;
    font-weight: ${WEIGHTS.light};
    line-height: 2.5;
`
const Text = styled.h5`
    font-size: 0.75rem;
    font-weight: ${WEIGHTS.light};
`
const Flag = styled.div`
    position: absolute;
    top: 12px;
    right: -4px;
    background: ${({color}) => color};
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    font-size: ${14/16}rem;
    font-weight: ${WEIGHTS.bold};
    color: ${colors.base};
    border-radius: 3px 2px 2px 3px;
    box-shadow: -2px 4px 6px 0px hsl(0deg 100% 0% / 0.2);
`

export {JobCard}