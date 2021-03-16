import * as React from 'react'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { SideBar } from "../sidebar.layout";
import {useCreateList as mockUseCreateList, useRemoveList as mockUseRemoveList, useLists as mockUseLists} from "../../utils/list"
import { buildList } from "../../test/generate";
import { BrowserRouter } from 'react-router-dom';

jest.mock("../../utils/list")

function render(ui, options={}) {
    function Wrapper({children}) {
        return(
            <BrowserRouter>{children}</BrowserRouter>
        )
    }
    return rtlRender(ui, {wrapper: Wrapper, ...options})
}

test('sidebar has logo, create list form and lists navigation', async () => {
    mockUseCreateList.mockReturnValue([jest.fn()])
    mockUseRemoveList.mockReturnValue([jest.fn(), {}])
    mockUseLists.mockReturnValue([buildList()])
    render(<SideBar/>)

    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByLabelText(/open create list form/i)).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()

    userEvent.click(screen.getByLabelText(/toggle create list form/i))

    expect(screen.getByLabelText(/add list form/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/close create list form/i)).toBeInTheDocument()
})
