import * as React from 'react'
import { render as rtlRender, waitFor, screen, within, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { Lists } from "../lists.component";
import { FetchProvider } from 'context/fetch-context';
import { BrowserRouter } from 'react-router-dom';
import { useAuth0 as mockedUseAuth0} from "@auth0/auth0-react";
import {server, rest } from '../../test/server'
import { buildList, buildUser } from "../../test/generate";
import * as listsDB from "../../test/data/lists"


const apiURL = process.env.REACT_APP_API_URL

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
    server.resetHandlers()
    listsDB.reset()
})
jest.mock('@auth0/auth0-react')

async function render(ui, options={}) {
    mockedUseAuth0.mockReturnValue({
        getAccessTokenSilently: jest.fn(() => 'fakeToken')
    })
    function Wrapper({children}) {
        return (
            <BrowserRouter>
            <FetchProvider>{children}</FetchProvider>
            </BrowserRouter>
        )
    }

    let utils
    await waitFor( () => utils = rtlRender(ui, {wrapper: Wrapper, ...options}))
    return {...utils}
}

test('should render all lists correctly', async () => {
    const lists = [buildList(), buildList(), buildList()]
    const testUser = buildUser()
    lists.forEach(list => {
        listsDB.create({
            name: list.name,
            color: list.color,
            userId: testUser.id
        })
    })
    server.use(
        rest.get(`${apiURL}/list`, async(req,res,ctx) => {
            const data = await listsDB.readMany(testUser.id)
            return res(ctx.json({data}))
        })
    )

   await render(<Lists/>)
    screen.getByText(/discover/i)
    await screen.findByText(lists[0].name)
    await screen.findByText(lists[1].name)
    await screen.findByText(lists[2].name)
})



test('list should not show up after deletion', async () => {
    const lists = [buildList(), buildList(), buildList()]
    const testUser = buildUser()
    lists.forEach(list => {
        listsDB.create({
            name: list.name,
            color: list.color,
            userId: testUser.id
        })
    })
    server.use(
        rest.get(`${apiURL}/list`, async(req,res,ctx) => {
            const data = await listsDB.readMany(testUser.id)
            return res(ctx.json({data}))
        })
    )
    server.use(
        rest.delete(`${apiURL}/list/:listId`, async(req,res,ctx) => {
            await listsDB.remove(req.params.listId)
            return res(ctx.json({data:`removed list`}))
        })
    )
    await render(<Lists/>)
    await screen.findByText(lists[0].name)
    const deleteButton = screen.getAllByRole('button', {hidden: true})[0]
    userEvent.click(deleteButton)
    await screen.findByRole('dialog')
    const inModal = within(screen.getByRole('dialog'))
    userEvent.click(inModal.getByRole('delete-list'))
   await waitForElementToBeRemoved(() => screen.getByRole('dialog'))
   expect(screen.queryByRole('button', {hidden: true, name: lists[0].name})).not.toBeInTheDocument()
})



