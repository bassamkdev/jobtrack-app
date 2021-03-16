import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toggle, ToggleButton, ToggleOn, ToggleOff } from "../toggle.component";

function TestFunction({label}) {
    const [on, setOn] = React.useState(false)
    return(
        <Toggle on={on} setOn={setOn}>
        <ToggleButton label={label}>
            <button>toggle</button>
        </ToggleButton>
        <ToggleOn>
            Toggle is on
        </ToggleOn>
        <ToggleOff>
            Toggle is off
        </ToggleOff>
    </Toggle>
    )
}

test('toggle can be on or off', async() => {
    const label = 'toggle button'
    render(<TestFunction label={label}/>)

    expect(screen.getByLabelText(label)).toHaveAttribute('aria-label')
    expect(screen.getByText(/toggle is off/i)).toBeInTheDocument()

    userEvent.click(screen.getByLabelText(label))

    expect(screen.getByText(/toggle is on/i)).toBeInTheDocument()
})
