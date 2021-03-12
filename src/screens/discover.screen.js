/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
import {FaAngleDown, FaAngleUp} from 'react-icons/fa'
import * as colors from 'styles/colors'
import {useJobSearch, useRefetchJobSearchQuery} from 'utils/jobs'
import {SearchForm} from 'components/form.component'
import {JobListUl, Spinner} from 'components/lib'
import {
  JobRowCard,
  JobRowCardHeader,
  JobRowCardBody,
} from 'components/compound/accordion/job-row-card'
import {
  Accordion,
  Collapse,
  Toggle,
} from 'components/compound/accordion/accordion'
import ReactMarkdown from 'react-markdown'
import {JobInfo} from 'components/job-info.component'

const DiscoverScreenWrapper = styled.div({
  width: '100%',
  height: '100%',
  position: 'relative',
  paddingBottom: '3rem',
  borderLeft: `4px solid ${colors.skyBlue}`,
})

const JobsWrapper = styled.div({
  height: '85%',
  width: '100%',
  maxWidth: '1000px',
  overflow: 'scroll',
  padding: '2em 4em 0 4em',
  margin: '0 auto',
})

const JobDescriptionWrapper = styled.div({
  padding: '10px 30px',
  overflow: 'scroll',
  maxHeight: 500,
  width: '100%',
  overflowX: 'hidden',
  overflowWrap: 'break-word',
})

function DiscoverJobsScreen() {
  const [query, dispatch] = React.useReducer((s, a) => ({...s, ...a}), {
    location: '',
    description: '',
  })
  const [activeKey, setActiveKey] = React.useState(null)
  const [queried, setQueried] = React.useState()
  const {jobs, isLoading, isError} = useJobSearch(query)
  const refetchJobSearchQuery = useRefetchJobSearchQuery()

  React.useEffect(() => {
    return () => refetchJobSearchQuery()
  }, [refetchJobSearchQuery])

  function handleSubmit(title, location) {
    setQueried(true)
    dispatch({
      description: title,
      location,
    })
  }
  return (
    <DiscoverScreenWrapper>
      <SearchForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isError={isError}
      />
      <JobsWrapper>
        {jobs.length ? (
          <Accordion
            activeEventKey={activeKey}
            setActiveEventKey={setActiveKey}
          >
            <JobListUl css={{marginTop: 20}}>
              {jobs.map(job => (
                <li
                  key={job.id}
                  aria-label={job.title}
                  css={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                  }}
                >
                  <JobRowCard key={job.id}>
                    <JobInfo job={job} />
                    <Toggle element={JobRowCardHeader} eventKey={job.id}>
                      {activeKey === job.id ? <FaAngleUp /> : <FaAngleDown />}
                    </Toggle>
                    <Collapse eventKey={job.id} element={JobRowCardBody}>
                      <JobDescriptionWrapper>
                        <h3 css={{marginBottom: '30px'}}>Job description:</h3>
                        <ReactMarkdown
                          skipHtml={true}
                          css={{fontFamily: 'lato, sans-serif !important'}}
                        >
                          {job.description}
                        </ReactMarkdown>
                        <ReactMarkdown>{job.how_to_apply}</ReactMarkdown>
                      </JobDescriptionWrapper>
                    </Collapse>
                  </JobRowCard>
                </li>
              ))}
            </JobListUl>
          </Accordion>
        ) : queried ? (
          <div css={{marginTop: 20, fontSize: '1.2em', textAlign: 'center'}}>
            {isLoading ? (
              <div css={{width: '100%', margin: 'auto'}}>
                <Spinner />
              </div>
            ) : (
              <p>
                Hmmm... I couldn't find any jobs with related to "
                {query.description}" in "{query.location}."
              </p>
            )}
          </div>
        ) : null}
      </JobsWrapper>
    </DiscoverScreenWrapper>
  )
}

export {DiscoverJobsScreen}
