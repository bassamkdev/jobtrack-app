import {setupServer} from 'msw/node'
const hadlers = []
const server = setupServer(...hadlers)
export * from 'msw'
export {server}
