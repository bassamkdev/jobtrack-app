import * as React from 'react'
import {Route} from 'react-router-dom'

import {useLists} from 'utils/list'
import {DiscoverJobsScreen} from 'screens/discover'
import {NotFoundScreen} from 'screens/not-found'
import {ListScreen} from 'screens/list'

function AppRoutes() {
  const lists = useLists()
  return (
    <>
      <Route path="/discover">
        <DiscoverJobsScreen />
      </Route>
      {lists.length
        ? lists.map(({name, _id}) => (
            <Route key={_id} path={`/${name.replace(/\s/g, '&-&')}`}>
              <ListScreen listId={_id} />
            </Route>
          ))
        : null}
      <Route path="*">
        <NotFoundScreen />
      </Route>
    </>
  )
}

export {AppRoutes}
