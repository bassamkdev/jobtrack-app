import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {AddListForm} from '../form.component'
import  "jest-axe/extend-expect"
import userEvent from '@testing-library/user-event';


test('renders a form with list name input, color picker, and a submit button', async() => {
  const testListName = 'LIST_NAME'
  const onSubmit = jest.fn(() => {return new Promise((res,rej) => {res('success')})})

  render(<AddListForm onSubmit={onSubmit} />)

    const input = screen.getByRole('textbox')
    const colorCircle = screen.getByTitle(/#ff9800/i)
    const submitButton = screen.getByRole('button', {hidden: true, name: /create/i})
    // debug()
    userEvent.click(submitButton)
    expect(submitButton).toBeDisabled()
    userEvent.type(input, testListName)
    userEvent.click(colorCircle)
    expect(submitButton).not.toBeDisabled()
    await act(async () => await userEvent.click(submitButton))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({listName:testListName, color:'#ff9800' })
})