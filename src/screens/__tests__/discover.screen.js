import * as React from 'react'
import { render, screen } from "@testing-library/react";

import { DiscoverJobsScreen } from "../discover.screen";
import { useJobSearch as mockUseJobSearch, useRefetchJobSearchQuery as mockUseRefetchJobSearchQuery } from "../../utils/jobs";
import { useLists as mockUseLists } from "../../utils/list";
import { useItems as mockUseItems, useCreateListItem } from "../../utils/item";
import { buildJob } from "../../test/generate";


jest.mock("../../utils/jobs")
jest.mock("../../utils/list")
jest.mock("../../utils/item")

test('renders search input and jobs', () => {
    const jobs = [buildJob(), buildJob()]
    mockUseJobSearch.mockReturnValue({
        jobs,
        isLoading: false, 
        isError: false
    })
    mockUseRefetchJobSearchQuery.mockReturnValue(jest.fn())
    mockUseLists.mockReturnValue([])
    mockUseItems.mockReturnValue([])
    useCreateListItem.mockReturnValue([jest.fn(), {}])

    render(<DiscoverJobsScreen/>)

    expect(screen.getByLabelText(/job title search input/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/job location search input/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/search button/i)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(jobs[0].title, 'i'))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(jobs[1].title, 'i'))).toBeInTheDocument()

})
