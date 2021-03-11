import * as React from 'react'
import {render, screen} from '@testing-library/react'
import {AddListForm} from '../form.component'
import { axe } from "jest-axe";
import  "jest-axe/extend-expect"
import userEvent from '@testing-library/user-event';



test('renders a form with list name input, color picker, and a submit button', async() => {

  const {container} = render(<AddListForm />)
  expect(await axe(container)).toHaveNoViolations()

    const input = screen.getByPlaceholderText(/list name/i)
    const colorCircle = screen.getAllByTitle(/#/i)[0]
    const submitButton = screen.getByRole('button', {hidden: true, name: /create/i})

    userEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    // userEvent.type(input, 'title')
    // userEvent.click(colorCircle)
    // userEvent.click(submitButton)
})