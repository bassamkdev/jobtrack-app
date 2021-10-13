/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
// import {useJobSearch, useRefetchJobSearchQuery} from 'utils/jobs'
import {SearchForm} from 'components/form.component'
import {Spinner} from 'components/lib'
import { JobCard } from 'components/jobCard'


function DiscoverJobsScreen() {
  const [query, dispatch] = React.useReducer((s, a) => ({...s, ...a}), {
    location: '',
    description: '',
  })
  const [queried, setQueried] = React.useState()
  // const {jobs, isLoading, isError} = useJobSearch(query)
  // const refetchJobSearchQuery = useRefetchJobSearchQuery()
  const jobs = []
  const isLoading = false
  const isError = false

  // React.useEffect(() => {
  //   return () => refetchJobSearchQuery()
  // }, [refetchJobSearchQuery])

  function handleSubmit(title, location) {
    setQueried(true)
    dispatch({
      description: title,
      location,
    })
  }
  return (
    <DiscoverScreenWrapper aria-label='discover jobs screen'>
      <SearchForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isError={isError}
      />
      <JobsWrapper>
        {jobs.length ? 
          jobs.map( job => (
            <JobWrapper key={job.id}>
              <JobCard job={job}/>
            </JobWrapper>
          ))
         : queried ? (
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

const JobWrapper = styled.div`
  min-width: 275px;
  flex: 1;
`
const DiscoverScreenWrapper = styled.div({
  width: '100%',
  height: '100%',
})

const JobsWrapper = styled.div({
  height: '85%',
  width: '100%',
  maxWidth: '1000px',
  overflow: 'auto',
  margin: '0 auto',
  padding: '32px 16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
})


export {DiscoverJobsScreen}
