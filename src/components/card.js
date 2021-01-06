/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as colors from 'styles/colors'
import {ActionButtons} from 'components/action-buttons'

const Card = styled.div({
  position: 'relative',
  width: '300px',
  height: '440px',
  overflow: 'hidden',
  borderRadius: '4px',
  borderTop: `5px solid ${colors.green}`,
  background: 'white',
  paddingTop: '5rem',
  boxShadow: '0 0 5px 6px rgba(0,0,0, 0.05)',
  ':hover > :first-of-type': {
    top: '0',
  },
})

const TopBar = styled.div({
  position: 'absolute',
  top: '-5rem',
  //left: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '50px',
  // transform: 'translate(-50%,-86%)',
  borderRadius: '0',
  background: 'rgba(0,0,0, 0)',
  transition: '.3s all',
})

// const Arrow = styled.div({
//   position: 'absolute',
//   left: '50%',
//   bottom: '-10px',
//   transform: 'translate(-50%) rotate(45deg)',
//   width: '16px',
//   height: '16px',
//   background: 'white',
// })

// const NavButton = styled.div(
//   {
//     padding: '0 2rem',
//   },
//   ({isActive}) => ({
//     color: `rgba(255,255,255, ${isActive ? 0.85 : 0.5})`,
//     transform: `scale(${isActive ? '2' : '1'}) translateY(${
//       isActive ? '8px' : '0'
//     })`,
//   }),
// )

function ScrollableCard({item}) {
  return (
    <Card>
      <TopBar>
        <ActionButtons item={item} />
      </TopBar>
      <PerfectScrollbar>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '30px',
          }}
        >
          <div>
            <strong>title:</strong>
            {item.title}
          </div>
          <div>
            <strong>company:</strong>
            {item.company}
          </div>
          <div>
            <strong>location:</strong>
            {item.location}
          </div>
        </div>
      </PerfectScrollbar>
    </Card>
  )
}

export default ScrollableCard
