/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import { FiBriefcase, FiMapPin, FiMenu, FiSearch, FiChevronDown, FiChevronUp, FiXCircle, FiX, FiEdit, FiTrash, FiRefreshCw, FiCheckCircle, FiPlus, FiList} from "react-icons/fi";

const icons = {
    search: FiSearch,
    location: FiMapPin,
    menu: FiMenu,
    jobType: FiBriefcase,
    chevronDown: FiChevronDown,
    chevronUp: FiChevronUp,
    error: FiXCircle,
    close: FiX,
    edit: FiEdit,
    delete: FiTrash,
    refresh: FiRefreshCw,
    success: FiCheckCircle,
    add: FiPlus,
    list: FiList,
}

function Icon({id, color, size, strokeWidth, filter, ...props}) {
    const Component = icons[id]

    if (!Component) {
        throw new Error(`No icon found for the ID: ${id}`)
    }

    return (
        <Wrapper strokeWidth={strokeWidth} filter={filter} {...props}>
            <Component color={color} size={size} />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: min-content;
    & > svg {
        display: block;
        stroke-width: ${(p) => p.strokeWidth !== undefined ? p.strokeWidth + 'px' : undefined};
        filter: ${(p) => p.filter !== undefined ? p.filter : undefined};
    }
`

export {Icon}