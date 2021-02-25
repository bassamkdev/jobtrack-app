/**@jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import Tooltip from '@reach/tooltip'
import {FaAngleDown, FaAngleUp, FaSearch, FaTimes} from 'react-icons/fa'
import * as colors from 'styles/colors'
import {useJobSearch, useRefetchJobSearchQuery} from 'utils/jobs'
import {JobListUl, Spinner, Input} from 'components/lib'
import {Card, CardBody, CardHeader} from 'components/job-card'
import {Accordion, Collapse, Toggle} from 'components/default-accordion'
import ReactMarkdown from 'react-markdown'
import {JobRow} from 'components/job-row'

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

  function handleSubmit(event) {
    event.preventDefault()
    setQueried(true)
    dispatch({
      description: event.target.elements.description.value,
      location: event.target.elements.location.value,
    })
  }
  return (
    <div
      css={{
        width: '100%',
        height: '100%',
        position: 'relative',
        paddingBottom: '3rem',
        borderLeft: `4px solid ${colors.skyBlue}`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        css={{
          width: '100%',
          background: colors.gray,
          borderBottom: `1px solid ${colors.gray20}`,
          padding: '2em 3em',
          position: 'sticky',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Input
            placeholder="Job title..."
            id="description"
            type="search"
            css={{
              width: '45%',
              background: colors.gray20,
              borderRadius: '34px',
            }}
          />
          <Input
            placeholder="Location..."
            id="location"
            type="search"
            css={{
              width: '45%',
              background: colors.gray20,
              borderRadius: '34px',
            }}
          />
          <Tooltip label="Search job title">
            <button
              type="submit"
              css={{
                border: '0',
                borderRadius: '50%',
                background: colors.gray20,
                height: '2.5rem',
                width: '2.5rem',
                ':hover': {
                  background: `${colors.skyBlue}50`,
                },
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" css={{color: colors.grayText}} />
              )}
            </button>
          </Tooltip>
        </div>
      </form>

      <div
        css={{
          height: '85%',
          width: '100%',
          maxWidth: '1000px',
          overflow: 'scroll',
          padding: '2em 4em 0 4em',
          margin: '0 auto',
        }}
      >
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
                  <Card key={job.id}>
                    <JobRow job={job} />
                    <Toggle element={CardHeader} eventKey={job.id}>
                      {activeKey === job.id ? <FaAngleUp /> : <FaAngleDown />}
                    </Toggle>
                    <Collapse eventKey={job.id} element={CardBody}>
                      <div
                        css={{
                          padding: '10px 30px',
                          overflow: 'scroll',
                          maxHeight: 500,
                          width: '100%',
                          overflowX: 'hidden',
                          overflowWrap: 'break-word',
                        }}
                      >
                        <h3 css={{marginBottom: '30px'}}>Job description:</h3>
                        <ReactMarkdown
                          skipHtml={true}
                          css={{fontFamily: 'lato, sans-serif !important'}}
                        >
                          {job.description}
                        </ReactMarkdown>
                        <ReactMarkdown>{job.how_to_apply}</ReactMarkdown>
                      </div>
                    </Collapse>
                  </Card>
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
      </div>
    </div>
  )
}

export {DiscoverJobsScreen}
