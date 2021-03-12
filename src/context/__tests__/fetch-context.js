import * as React from 'react'
import {waitFor} from '@testing-library/react'
import {renderHook as rtlRenderHook} from '@testing-library/react-hooks'
import {FetchProvider, useFetchContext} from '../fetch-context'
import {useAuth0} from '@auth0/auth0-react'

import {server, rest} from '../../test/server'

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: jest.fn(),
}))

const apiURL = process.env.REACT_APP_API_URL
const endpoint = 'TEST_ENDPOINT'
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
})

async function renderHook(hook, options = {}) {
  useAuth0.mockReturnValue({
    getAccessTokenSilently: jest.fn().mockResolvedValue('FAKE_TOKEN'),
  })
  const Wrapper = ({children}) => {
    return <FetchProvider>{children}</FetchProvider>
  }
  return await waitFor(() =>
    rtlRenderHook(hook, {wrapper: Wrapper, ...options}),
  )
}

test('authAxios fetch at the endpoint with the arguments for GET request', async () => {
  const mockResponse = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, (req, res, ctx) => {
      return res(ctx.json(mockResponse))
    }),
  )
  const {result} = await renderHook(useFetchContext)
  const response = await result.current.authAxios.get(endpoint)
  expect(response).toEqual(mockResponse)
})

test('authAxios adds token to request', async () => {
  const mockResponse = {mockValue: 'VALUE'}
  let request
  server.use(
    rest.get(`${apiURL}/${endpoint}`, (req, res, ctx) => {
      request = req
      return res(ctx.json(mockResponse))
    }),
  )
  const {result} = await renderHook(useFetchContext)
  await result.current.authAxios.get(endpoint)
  expect(request.headers.get('Authorization')).toBe('Bearer FAKE_TOKEN')
})

test('authAxios refreshes the token if a request returns 401', async () => {
  const mockResult = {mockValue: 'VALUE'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json(mockResult))
    }),
  )
  const {result} = await renderHook(useFetchContext)
  const error = await waitFor(() =>
    result.current.authAxios.get(endpoint).catch(e => e),
  )
  expect(error.message).toMatchInlineSnapshot(`"Please re-authenticate"`)
})

test('authAxios correctly rejects the promise if there is an error', async () => {
  const testError = {errorMessage: 'Test Error'}
  server.use(
    rest.get(`${apiURL}/${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError))
    }),
  )
  const {result} = await renderHook(useFetchContext)
  const error = await waitFor(() =>
    result.current.authAxios.get(endpoint).catch(e => e),
  )
  expect(error.message).toMatchInlineSnapshot(
    `"Request failed with status code 400"`,
  )
})
