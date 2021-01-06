/**@jsx jsx */
import {jsx} from '@emotion/react'

import {Link} from 'components/lib'

function NotFoundScreen() {
  return (
    <div
      css={{
        height: '100%',
        display: 'grid',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div>
        Sorry... nothing here. <Link to="/liked">Go Home</Link>
      </div>
    </div>
  )
}

export {NotFoundScreen}
