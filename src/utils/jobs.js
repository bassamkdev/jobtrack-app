import * as React from 'react'
import {useQuery, queryCache} from 'react-query'
import bookPlaceholderSvg from 'assets/book-placeholder.svg'
// import {useFetchContext} from 'context/fetch-context'
import {useFetchContext} from 'context/fetch-context'

const loadingJob = {
  title: 'Loading...',
  company: 'Loading...',
  location: 'Loading...',
  type: 'Loading...',
  description: 'Loading...',
  company_logo: bookPlaceholderSvg,
  loadingJob: true,
}

const loadingJobs = Array.from({length: 10}, (v, index) => ({
  id: `loading-job-${index}`,
  ...loadingJob,
}))

const jobQueryConfig = {
  staleTime: 1000 * 60 * 60,
  cacheTime: 1000 * 60 * 60,
}

const getJobSearchConfig = (authAxios, query) => ({
  queryKey: ['jobSearch', {query}],
  queryFn: () => authAxios.post(`job`, query),
  config: {
    onSuccess(result) {
      const {data: jobs} = result
      for (const job of jobs) {
        queryCache.setQueryData(['job', {jobId: job.id}], job, jobQueryConfig)
      }
    },
  },
})

function useJobSearch(query) {
  const {authAxios} = useFetchContext()
  const result = useQuery(getJobSearchConfig(authAxios, query))
  return {...result, jobs: result.data?.data ?? loadingJobs}
}

function useJob(jobId) {
  const {authAxios} = useFetchContext()
  const {data} = useQuery({
    queryKey: ['job', {jobId}],
    queryFn: () => authAxios.get(`job/${jobId}`),
    ...jobQueryConfig,
  })
  console.log(data)
  return data ?? loadingJob
}

function useRefetchJobSearchQuery() {
  const {authAxios} = useFetchContext()
  return React.useCallback(
    async function refetchBookSearchQuery() {
      queryCache.removeQueries('jobSearch')
      await queryCache.prefetchQuery(getJobSearchConfig(authAxios, ''))
    },
    [authAxios],
  )
}

function setQueryDataForJob(job) {
  queryCache.setQueryData({
    queryKey: ['job', {jobId: job.id}],
    queryFn: job,
    ...jobQueryConfig,
  })
}

export {useJob, useJobSearch, useRefetchJobSearchQuery, setQueryDataForJob}
