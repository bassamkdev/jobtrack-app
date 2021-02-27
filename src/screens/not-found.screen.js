/**@jsx jsx */
import {jsx} from '@emotion/react'

import {Link} from 'components/lib'

function NotFoundScreen() {
  return (
    <div
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <img src="not-found.png" alt="page-not-found" />
      <h3>This Page is Not on the Map</h3>
      <Link to="/discover">Take me Home</Link>
    </div>
  )
}

export {NotFoundScreen}
