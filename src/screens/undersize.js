/** @jsx jsx */
import {jsx} from '@emotion/react'
import * as mq from 'styles/media-queries'
import {FiMonitor} from 'react-icons/fi'

function UnderSizeScreen(params) {
  return (
    <div
      css={{
        display: 'none',

        [mq.small || mq.medium]: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          backgroundColor: 'black',
          zIndex: 10,
          position: 'absolute',
          color: 'white',
        },
      }}
    >
      {' '}
      <FiMonitor size={100} />
      <h4>Sorry for the incovenience</h4>
      <h5>jobTrack only works on desktop size screens at this time</h5>
      <h5>Hopefully mobile app will be available soon</h5>
    </div>
  )
}

export {UnderSizeScreen}
