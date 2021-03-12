import * as React from 'react'
import {render as rtlRender, screen, act, within} from '@testing-library/react'
import {AddListForm, AddJobForm} from '../form.component'
import  "jest-axe/extend-expect"
import userEvent from '@testing-library/user-event';
import { buildItem, buildList } from "../../test/generate";
import { Modal } from "../compound/modal.component";
import { useLists } from "../../utils/list";


jest.mock('../../utils/list')

test('addListForm renders a form with list name input, color picker, and a submit button', async() => {
  const testListName = 'LIST_NAME'
  const onSubmit = jest.fn(() => {return new Promise((res,rej) => {res('success')})})

    rtlRender(<AddListForm onSubmit={onSubmit} />)

    const input = screen.getByRole('textbox')
    const colorCircle = screen.getAllByTitle(/#/i)[0]
    const submitButton = screen.getByRole('button', {hidden: true, name: /create/i})

    expect(submitButton).toBeDisabled()

    userEvent.type(input, testListName)
    userEvent.click(colorCircle)

    expect(submitButton).not.toBeDisabled()
    await act(async () => await userEvent.click(submitButton))
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({listName:testListName, color:colorCircle.title })
})

test('AddJobForm has renders fields and buttons and submits the form', async() => {
  const testlists = [buildList(), buildList(), buildList()]
  const {title, companyName, companyType, url, location, employmentType, notes} = buildItem()
  const mockOnSubmit = jest.fn().mockResolvedValue()
  const mockSubmitButton = <button variant="primary">Submit</button>
  useLists.mockReturnValue(testlists)

  rtlRender(<Modal><AddJobForm submitButton={mockSubmitButton} onSubmit={mockOnSubmit}/></Modal>)
   
  const submitButton = screen.getByRole('button', {  name: /submit/i})
  expect(submitButton).toBeDisabled()
  
  userEvent.type( screen.getByRole('textbox', {name: /title/i}), title)
  userEvent.type( screen.getByRole('textbox', {name: 'Company'}), companyName)
  userEvent.type( screen.getByRole('textbox', {name: /company type/i}), companyType)
  userEvent.type( screen.getByRole('textbox', {name: /job url/i}), url)
  userEvent.type( screen.getByRole('textbox', {name: /location/i}), location)
  userEvent.type( screen.getByRole('textbox', {name: /employment type/i}), employmentType)
  userEvent.type( screen.getByRole('textbox', {name: /notes/i}), notes)
  userEvent.click(screen.getByRole('listbox'))

userEvent.click(screen.getByRole('button', {name: /select a list/i}))
const inPopover = within(screen.getByTestId('popover'))
const listbox = inPopover.getByRole('listbox')
userEvent.selectOptions(listbox, testlists[0].name)

  expect(submitButton).not.toBeDisabled()

  await act(async () => await userEvent.click(submitButton))
  expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  expect(mockOnSubmit).toHaveBeenCalledWith({
    companyName,
    companyType, 
    employmentType, 
    list: testlists[0]._id, 
    location, 
    notes, 
    title, 
    url})
})