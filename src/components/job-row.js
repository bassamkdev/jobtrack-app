/**@jsx jsx */
import {jsx} from '@emotion/react'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {JobActionButton} from 'components/action-buttons'
function JobRow({job}) {
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
    <div
      css={{
        width: '100%',
        padding: '0 1rem',
        position: 'relative',
      }}
    >
      <div
        aria-labelledby={id}
        css={{
          height: 150,
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gridGap: 20,
          color: colors.text,
          padding: '1.25em',
          width: '70%',
        }}
      >
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
            <a
              href={jobUrl}
              id={id}
              css={{
                fontSize: '1.25em',
                margin: '0',
                color: colors.indigo,
                textDecoration: 'none',
                ':hover,:focus': {
                  textDecoration: 'none',
                },
              }}
            >
              {`${title} - `}
              <span css={{color: colors.gray80, fontStyle: 'italic'}}>
                {company}
              </span>
            </a>
          </div>
          <div css={{marginLeft: 10, display: 'inline-flex', marginTop: 10}}>
            <div
              css={{
                fontSize: '.8em',
                background: colors.gray80,
                color: 'whitesmoke',
                borderRadius: '3px',
                padding: '5px 10px',
                width: 'auto',
                marginRight: '1rem',
              }}
            >
              {type}
            </div>
            <div
              css={{
                fontSize: '.8em',
                background: colors.gray80,
                color: 'whitesmoke',
                borderRadius: '3px',
                padding: '5px 10px',
                width: 'auto',
                marginRight: '1rem',
              }}
            >
              {location}
            </div>
          </div>
        </div>
      </div>
      <div
        css={{
          position: 'absolute',
          right: 30,
          bottom: 10,
        }}
      >
        <JobActionButton job={job} />
      </div>
    </div>
  )
}

export {JobRow}
