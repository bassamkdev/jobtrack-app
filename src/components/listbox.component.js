/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {ListboxInput, ListboxButton, ListboxPopover, ListboxList, ListboxOption, ListboxArrow} from '@reach/listbox'
import VisuallyHidden from '@reach/visually-hidden'
import { Icon } from './icon'
import {Spinner} from 'components/lib'



function Listbox({items, variant, listValue, handleValueChange, isLoading, isError, hasArrow, visualContent}) {
  return (
    <Wrapper>
      <VisuallyHidden>select a list</VisuallyHidden>
      <Select
      value={listValue}
      onChange={handleValueChange}
      >
        <OpenButton>
            {
              isLoading 
              ? <Spinner /> 
              : isError 
              ? <>
                  <Icon id='error' color={'hsl(340deg 95% 65%)'}/> 
                  <ErrorInfo>try again</ErrorInfo>
                </> 
              : listValue || visualContent
            }
            {
              hasArrow
              ? <Arrow>
                 <Icon id='chevronDown'/>
                </Arrow>
              : null
            }
        
        </OpenButton>
        <Popover portal={true}>
        <List>
            {
              items.map(({name, _id}) => (
                <Option key={_id} value={name}>{name}</Option>
              ))
            }
        </List>
        </Popover>
      </Select>
    </Wrapper>

  )
}

const Wrapper = styled.div`

`

const Select = styled(ListboxInput)`

`
const List = styled(ListboxList)`

`


const ErrorInfo = styled.span`
  color: hsl(20deg 0% 90%);
  font-size: ${14/16}rem;
  margin-left: 4px;
`

const OpenButton = styled(ListboxButton)`
  /* display: flex;
  min-width: 126px;
  min-height: 34px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(124,185,251,1) 0%, 
    rgba(145,138,255,1) 100%);
  color: white;
  padding: 4px 10px 4px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: .5s;
  box-shadow: -2px 4px 10px 0px hsl(0deg 100% 0% / 0.2);

  &:hover {
    background: linear-gradient(
    270deg,
    rgba(124,185,251,1) 0%, 
    rgba(145,138,255,1) 100%);
  } */
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: hsl(209deg 15% 65%);
  :hover {
    color: hsl(209deg 15% 30%);
  }
  padding: 0 !important
`

const Popover = styled(ListboxPopover)`
  background: hsl(240deg 30% 98%);
  border: 1px solid hsl(240deg 30% 80%);
  border-radius: 4px;
  color: hsl(240deg 10% 50%)
`

const Option = styled(ListboxOption)`
  display: block;
  list-style: none;
  line-height: 2.5;
  font-size: ${14/16}rem;
  cursor: pointer;

`

const Arrow = styled(ListboxArrow)`
  margin-left: auto;
  font-size: inherit;
`

export {Listbox}
