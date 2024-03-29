/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {CreateJobCardButton} from 'components/action-buttons.component'

const JobInfoWrapper = styled.div({
  width: '100%',
  padding: '0 1rem',
  position: 'relative',
})

const ContentWrapper = styled.div({
  height: 150,
  display: 'grid',
  gridTemplateColumns: '140px 1fr',
  gridGap: 20,
  color: colors.text,
  padding: '1.25em',
  width: '70%',
})

const JobTitle = styled.a({
  fontSize: '1.15rem',
  margin: '0',
  color: 'black',
  textDecoration: 'none',
  ':hover,:focus': {
    textDecoration: 'none',
  },
})

const Tag = styled.div({
  fontSize: '.8em',
  background: colors.gray80,
  color: 'whitesmoke',
  borderRadius: '3px',
  padding: '5px 10px',
  width: 'auto',
  marginRight: '1rem',
})

function JobInfo({job}) {
  const {
    type,
    url: jobUrl,
    company,
    company_url: companyUrl,
    location,
    company_logo: companyLogo,
    id,
    title,
  } = job

  return (
    <JobInfoWrapper>
      <ContentWrapper aria-labelledby={id}>
        <div
          css={{
            height: '100%',
            [mq.small]: {
              width: 100,
            },
          }}
        >
          <a href={companyUrl} css={{display: 'block'}}>
            <img
              src={companyLogo}
              alt={`${company} logo`}
              css={{
                width: '60%',
              }}
            />
          </a>
        </div>
        <div css={{flex: 1}}>
          <div css={{flex: 1}}>
            <JobTitle href={jobUrl} id={id}>
              {`${title} - `}
              <span css={{color: colors.gray80, fontStyle: 'italic'}}>
                {company}
              </span>
            </JobTitle>
          </div>
          <div css={{marginLeft: 10, display: 'inline-flex', marginTop: 10}}>
            <Tag>{type}</Tag>
            <Tag>{location}</Tag>
          </div>
        </div>
      </ContentWrapper>
      <div
        css={{
          position: 'absolute',
          right: 30,
          bottom: 10,
        }}
      >
        <CreateJobCardButton job={job} />
      </div>
    </JobInfoWrapper>
  )
}

export {JobInfo}
