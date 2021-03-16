import * as React from 'react'
import {render as rtlRender, screen} from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import { TopBar } from "../topBar.layout";
import { BrowserRouter } from 'react-router-dom';
import { useAuth0 as mockUseAuth0 } from "@auth0/auth0-react";
import { buildUser } from "../../test/generate";

jest.mock("@auth0/auth0-react")

jest.mock("../../utils/list")

function render(ui, options={}) {
    function Wrapper({children}) {
        return(
            <BrowserRouter>{children}</BrowserRouter>
        )
    }
    return rtlRender(ui, {wrapper: Wrapper, ...options})
}

test('topbar renders the path name and profile menu button', async () => {
    const pageTitle = 'TEST_PAGE'
    window.history.pushState({}, 'test_page', `/${pageTitle}`)
    const {getMockImplementation} = mockUseAuth0.mockReturnValue({user: buildUser(), logout: jest.fn()})
    const {logout} = getMockImplementation()()
    
    render(<TopBar/>)
    
    expect(screen.getByRole('heading', {name: /page title/i})).toHaveTextContent(pageTitle)
    const menuButton = screen.getByRole('button', {name: /profile menu button/i})
    
    userEvent.click(menuButton)
    expect(screen.getAllByRole('menuitem')).toHaveLength(2)

    userEvent.click(screen.getByRole('menuitem', {name: /sign out/i}))
    expect(logout).toHaveBeenCalledTimes(1)
})
