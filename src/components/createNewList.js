/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import * as React from 'react'
import {
    Toggle,
    ToggleButton,
    ToggleOn
} from 'components/compound/toggle.component'
import { Icon } from "components/icon";
import { AddListForm } from "components/form.component";
import { useCreateList } from 'utils/list';
import UnstyledButton from './unstyledButton';
import { Spacer } from './spacer/spacer';


function CreateNewList() {
    const [CreateList] = useCreateList({throwOnError: true})
    const [isAdding, setIsAdding] = React.useState(false)
    return(
        <Toggle on={isAdding} setOn={setIsAdding}>
            <ToggleButton label='toggle create list form'>
                {
                    isAdding
                    ? (
                        <ToggleSwitch isActive={isAdding}>
                            <Icon id='close' size={24}/>
                            close
                        </ToggleSwitch>
                    )
                    : (
                        <ToggleSwitch isActive={isAdding}>
                            <Icon id='add' size={24}/>
                            create a new list
                        </ToggleSwitch>
                    )
                }
            </ToggleButton>
            <ToggleOn>
                <Spacer axis='vertical' size={24}/>
                <AddListForm
                    label='add list from'
                    onSubmit={CreateList}
                    setIsActive={setIsAdding}
                />
            </ToggleOn>
        </Toggle>
    )
}

const ToggleSwitch = styled(UnstyledButton)`
    display: flex;
    gap: 8px;
    color: ${({isActive}) => isActive ? 'hsl(220deg 5% 20%)' : 'hsl(220deg 5% 70%)'};
    &:hover {
        color: hsl(220deg 5% 50%)
    }
`

export {CreateNewList}