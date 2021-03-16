import * as React from 'react'
import { render as rtlRender, waitFor, act, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NotesTextarea } from "../noteTextArea.component";
import { useAuth0 as mockedUseAuth0 } from "@auth0/auth0-react";
import { FetchProvider } from "../../context/fetch-context";
import { buildItem, buildUser } from "../../test/generate";
import { rest, server } from "../../test/server";
import * as itemsDB from "../../test/data/items";

jest.mock("@auth0/auth0-react")

const apiURL = process.env.REACT_APP_API_URL

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => {
    server.resetHandlers()
    itemsDB.reset()
})

async function render(ui, options={}) {
    mockedUseAuth0.mockReturnValue({
        getAccessTokenSilently: jest.fn(() => 'fakeToken')
    })
    function Wrapper({children}) {
        return (
            <FetchProvider>{children}</FetchProvider>
        )
    }

    let utils
    await waitFor( () => utils = rtlRender(ui, {wrapper: Wrapper, ...options}))
    return {...utils}
}

test('typing makes api call to update notes', async() => {
    const testUser = buildUser()
    const testItem = buildItem({userId: testUser.id, list: 'TEST_LIST', notes: null})
    const item = await itemsDB.create(testItem)
    const text = 'FAKE_TEXT'
    server.use(
        rest.put(`${apiURL}/item/:itemId`, async(req,res,ctx) => {
            const itemId = req.params.itemId
            const updates = req.body
            const data = await itemsDB.update(itemId, updates)
            return res(ctx.json({data}))
        })
    )
    const {rerender} = await render(<NotesTextarea item={item}/>)
    const textArea = screen.getByRole('textbox')

    userEvent.type(textArea,text)

    const spinner = await screen.findByLabelText(/loading/i)
    await waitForElementToBeRemoved(spinner)

    const updatedItem = await itemsDB.read(item._id)
    await rerender(<NotesTextarea item={updatedItem}/>)

    expect(textArea).toHaveTextContent(text)
})

