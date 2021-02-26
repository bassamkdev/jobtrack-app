/** @jsx jsx */
import {jsx} from '@emotion/react'

import * as mq from 'styles/media-queries'
import {SideBar} from 'layout/sidebar.layout'
import {TopBar} from './layout/topbar.layout'
import {AppRoutes} from './navigation/routes.navigaton'

function AuthenticatedApp() {
  return (
    <div
      css={{
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        [mq.small]: {
          gridTemplateColumns: '1fr',
          gridTemplateRows: 'auto',
          width: '100%',
        },
      }}
    >
      <SideBar />
      <main
        css={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TopBar />
        <div
          css={{
            height: '100%',
            maxHeight: '100%',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <AppRoutes />
        </div>
      </main>
    </div>
  )
}

export default AuthenticatedApp
