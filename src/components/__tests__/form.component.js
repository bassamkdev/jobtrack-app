import * as React from 'react'
import {render, screen, act, within} from '@testing-library/react'
import {AddListForm, AddJobForm, SearchForm} from '../form.component'
import  "jest-axe/extend-expect"
import userEvent from '@testing-library/user-event';
import { buildItem, buildList } from "../../test/generate";
import { Modal } from "../compound/modal.component";
import { useLists } from "../../utils/list";



jest.mock('../../utils/list')

test('addListForm renders a form with list name input, color picker, and a submit button', async() => {
  const testListName = 'LIST_NAME'
  const onSubmit = jest.fn().mockResolvedValue()

    render(<AddListForm onSubmit={onSubmit} />)

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

test('AddJobForm has all fields and buttons and submits the form', async() => {
  const testlists = [buildList(), buildList(), buildList()]
  const {title, companyName, companyType, url, location, employmentType, notes} = buildItem()
  const mockOnSubmit = jest.fn().mockResolvedValue()
  const mockSubmitButton = <button variant="primary">Submit</button>
  useLists.mockReturnValue(testlists)

  const {debug} = render(<Modal><AddJobForm submitButton={mockSubmitButton} onSubmit={mockOnSubmit}/></Modal>)

  const submitButton = screen.getByRole('button', {  name: /submit/i})
  expect(submitButton).toBeDisabled()
  
  userEvent.type( screen.getByRole('textbox', {name: /title/i}), title)
  userEvent.type( screen.getByRole('textbox', {name: 'Company'}), companyName)
  userEvent.type( screen.getByRole('textbox', {name: /company type/i}), companyType)
  userEvent.type( screen.getByRole('textbox', {name: /job url/i}), url)
  userEvent.type( screen.getByRole('textbox', {name: /location/i}), location)
  userEvent.type( screen.getByRole('textbox', {name: /employment type/i}), employmentType)
  userEvent.type( screen.getByRole('textbox', {name: /notes/i}), notes)

userEvent.click(screen.getByRole('button', {name: /select a list/i}))
const inPopover = within(screen.getByTestId('popover'))
const listboxList = inPopover.getByRole('listbox',{hidden: true})
userEvent.selectOptions(listboxList, testlists[0].name)

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

test('Search form has fields and submits the query', async() => {
  const testQuery = {
    title: 'TEST_TITLE',
    location: 'TEST_LOCATION'
  }
  const mockOnSubmit = jest.fn()
  render(<SearchForm onSubmit={mockOnSubmit} isError={false} isLoading={false}/>)

  userEvent.type(screen.getByLabelText(/job title search input/i), testQuery.title)
  userEvent.type(screen.getByLabelText(/job location search input/i), testQuery.location)
  userEvent.click( screen.getByRole('button', {name: /search button/i}))

  expect(mockOnSubmit).toHaveBeenCalledWith(testQuery.title, testQuery.location)
  expect(mockOnSubmit).toHaveBeenCalledTimes(1)
})
