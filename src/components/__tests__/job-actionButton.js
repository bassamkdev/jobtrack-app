import * as React from "react";
import { render as rtlRender, waitFor, screen, within, act, waitForElementToBeRemoved, getByLabelText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { JobActionButton } from "../action-buttons.component";
import { FetchProvider } from "../../context/fetch-context";
import { useAuth0 as mockedUseAuth0 } from "@auth0/auth0-react";
import { buildUser, buildList, buildItem, buildJob } from "../../test/generate";
import * as listsDB from "../../test/data/lists";
import * as itemsDB from "../../test/data/items";
import { server, rest } from "../../test/server";
import {  queryCache} from "react-query";

jest.mock("@auth0/auth0-react")
const apiURL = process.env.REACT_APP_API_URL

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
beforeAll(() => {
    server.listen()
})
beforeEach(async() => {
    listsDB.reset()
    itemsDB.reset()
    server.resetHandlers()
})
afterEach(() => {
    queryCache.clear()
    itemsDB.reset()
})

afterAll(() => {
    server.close()
})

test('renders correctly when job is not listed', async() => {
    const testUser = buildUser()
    const testList = buildList()
    const testItem = buildItem()
    const jobId = 'FAKE_ID'
    listsDB.create({
        name: testList.name,
        color: testList.color,
        userId: testUser.id
    })
    itemsDB.create({
        ...testItem, list: testList._id, userId: testUser.id
    })
    server.use(
        rest.get(`${apiURL}/item`, async(req,res,ctx) => {
            const data = await itemsDB.readMany(testUser.id)
            return res(ctx.json({data}))
        })
    )
    server.use(
        rest.get(`${apiURL}/list`, async(req,res,ctx) => {
            const data = await listsDB.readMany(testUser.id)
            return res(ctx.json({data}))
        })
    )
    await render(<JobActionButton job={{id: jobId}}/>)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await waitFor(() => screen.findByRole('option', {hidden: true}))
})

test('renders correctly when job is listed', async() => {
    const jobId = 'FAKE_ID'
    const testUser = buildUser()
    const testList = buildList()
    listsDB.create({
        name: testList.name,
        color: testList.color,
        userId: testUser.id
    })
    const lists =await listsDB.readMany(testUser.id)
    const testItem = buildItem({jobId})
    itemsDB.create({
        ...testItem, list: lists[0]._id, userId: testUser.id
    })
    server.use(
        rest.get(`${apiURL}/item`, async(req,res,ctx) => {
            const data = await itemsDB.readMany(testUser.id)
            return res(ctx.json({data}))
        })
    )
    server.use(
        rest.get(`${apiURL}/list`, async(req,res,ctx) => {
            const data = await listsDB.readMany(testUser.id)
            return res(ctx.json({data}))
        })
    )
    await render(<JobActionButton job={{id: jobId}}/>)
    await screen.findByTestId(/list-status/i)
})

test('can list a job', async () => {

    const testUser = buildUser()
    const testList = buildList()
    const testItem = buildItem()
    const testJob = buildJob()
    listsDB.create({
        name: testList.name,
        color: testList.color,
        userId: testUser.id
    })
    itemsDB.create({
        ...testItem, list: testList._id, userId: testUser.id
    })
    server.use(
        rest.get(`${apiURL}/item`, async(req,res,ctx) => {
            const data = await itemsDB.readMany(testUser.id)
            return res(ctx.json({data}))
        })
    )
    server.use(
        rest.get(`${apiURL}/list`, async(req,res,ctx) => {
            const data = await listsDB.readMany(testUser.id)
            return res(ctx.json({data}))
        })
    )
    server.use(
        rest.post(`${apiURL}/item`, async(req,res,ctx) => {
            const data = await itemsDB.create({...req.body, userId: testUser.id})
            return res(ctx.json({data}))
        })
    )
  
    await render(<JobActionButton job={testJob}/>)

    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await screen.findByRole('option', {hidden: true})

    userEvent.click(screen.getByRole('button', {name: /add to list/i}))
    const inPopover = within(screen.getByTestId('popover'))
    const listboxList = inPopover.getByRole('listbox',{hidden: true})
    userEvent.selectOptions(listboxList, testList.name)
    
    await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))   
    expect( await screen.findByTestId(/list-status/i)).toBeInTheDocument()
})

