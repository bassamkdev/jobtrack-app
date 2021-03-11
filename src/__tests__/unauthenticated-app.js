import * as React from 'react'
import { render , screen } from "@testing-library/react";
import UnauthenticatedApp from "../unauthenticated-app";
import {useAuth0} from "@auth0/auth0-react";

jest.mock('@auth0/auth0-react')

test('login button is in the screen', async () => {
    useAuth0.mockImplementation(() => {
        return {
            loginWithRedirect: jest.fn()
        }
    })
render(<UnauthenticatedApp/>)
screen.getByText(/login/i) 
expect(useAuth0).toHaveBeenCalledTimes(1)
})
