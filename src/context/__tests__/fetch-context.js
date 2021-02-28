import * as React from 'react'
import {useAuth0} from '@auth0/auth0-react'

import {render, act} from '@testing-library/react'
import {server, rest} from 'test/server'
import {useFetchContext, FetchProvider} from '../fetch-context'

// const user = {
//   email: 'johndoe@me.com',
//   email_verified: true,
//   sub: '"google-oauth2|12345678901234"',
// }

jest.mock('@auth0/auth0-react')

const apiUrl = process.env.REACT_APP_API_URL

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
beforeEach(() => {
  useAuth0.mockReturnValue({
    getAccessTokenSilently: jest.fn().mockImplementation(() => 'FAKE_TOKEN'),
  })
})

test('authAxios makes Get requests to the given endpoint', async () => {
  const endpoint = 'test-endpoint'
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult))
    }),
  )
  let context
  function TestComponent() {
    context = useFetchContext()
    return null
  }
  render(
    <FetchProvider>
      <TestComponent />
    </FetchProvider>,
  )

  const {authAxios} = context
  let data
  await act(async () => {
    data = await authAxios(endpoint)
  })

  expect(data).toEqual(mockResult)
})
