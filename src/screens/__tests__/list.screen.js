import * as React from 'react'
import { render, screen } from "@testing-library/react";
import faker from "faker";

import { ListScreen } from "../list.screen";
import { useList as mockUseList, useLists as mockUseLists } from "../../utils/list";
import { useListItems as mockUseListItems, useCreateListItem as mockUseCreateListItem, useUpdateListItem as mockUseUpdateListItem, useRemoveListItem as mockUseRemoveListItem } from "../../utils/item";
import { buildList, buildItem } from "../../test/generate";


jest.mock("../../utils/list")
jest.mock("../../utils/item")

test('renders search input and jobs', () => {
    const list = buildList({_id: faker.random.uuid() })
    const items = [buildItem({list: list._id, _id: faker.random.uuid(), updatedAt: faker.date.past()}), buildItem({list: list._id, _id: faker.random.uuid(), updatedAt: faker.date.past()})]
    mockUseLists.mockReturnValue([list])
    mockUseList.mockImplementation((listId) => {return [list]})
    mockUseListItems.mockImplementation((listId) => {return items})
    mockUseCreateListItem.mockReturnValue([jest.fn(), {}])
    mockUseUpdateListItem.mockReturnValue([jest.fn(), {}])
    mockUseRemoveListItem.mockReturnValue([jest.fn(), {}])
    render(<ListScreen listId={list._id}/>)

    expect(screen.getByLabelText(/create a new job card/i)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(items[0].title, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(items[1].title, 'i'))).toBeInTheDocument()
})
