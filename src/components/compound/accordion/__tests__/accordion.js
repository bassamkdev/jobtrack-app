import * as React from "react";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Accordion,  Toggle, Collapse} from "../accordion";




function TestFunction({mockData}) {
    const CardHead = ({children, ...props}) => <div aria-label='toggle' {...props}>{children}</div>
    const CardBody = ({children, ...props }) => <div aria-label='collapse' {...props}>{children}</div>

    const [activeEventKey, setActiveEventKey] = React.useState(null)
    return (
        <Accordion activeEventKey={activeEventKey} setActiveEventKey={setActiveEventKey}>
            {mockData.map(item => {
                return (
                    <div key={item.id}>
                        <Toggle eventKey={item.id} element={CardHead}>
                            {<h1>{item.title}</h1>}
                            {activeEventKey === item.id ? 'close' : 'open'}
                        </Toggle>
                        <Collapse eventKey={item.id} element={CardBody}> 
                                {item.data}
                        </Collapse>
                    </div>
                )
            })}
        </Accordion>


    )
}

test('toggle can be on or off', async() => {
    const mockData = [{id: 1, title: 'mock title 1', data: 'mock data 1'}, {id: 2, title: 'mock title 2', data: 'mock data 2'}]
    render(<TestFunction mockData={mockData}/>)
    expect(screen.getAllByRole('heading')).toHaveLength(mockData.length)
    expect(screen.getAllByText(/open/i)).toHaveLength(mockData.length)
    expect(screen.queryByText(mockData[0].data)).not.toBeInTheDocument()
    expect(screen.queryByText(mockData[1].data)).not.toBeInTheDocument()

    userEvent.click(screen.getAllByLabelText(/toggle/i)[0])

    expect(screen.getByText(mockData[0].data)).toBeInTheDocument()
    expect(screen.getAllByText(/close/i)).toHaveLength(1)
    expect(screen.queryByText(mockData[1].data)).not.toBeInTheDocument()

    userEvent.click(screen.getAllByLabelText(/toggle/i)[1])

    expect(screen.getByText(mockData[1].data)).toBeInTheDocument()
    expect(screen.getAllByText(/close/i)).toHaveLength(1)
    expect(screen.queryByText(mockData[0].data)).not.toBeInTheDocument()

    userEvent.click(screen.getAllByLabelText(/toggle/i)[1])

    expect(screen.queryByText(/close/i)).not.toBeInTheDocument()

})
