/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {useState} from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as colors from 'styles/colors'

const Card = styled.div({
  position: 'relative',
  width: '300px',
  height: '440px',
  overflow: 'hidden',
  borderRadius: '4px',
  borderTop: `5px solid ${colors.green}`,
  background: 'white',
  paddingTop: '7rem',
  boxShadow: '0 0 5px 6px rgba(0,0,0, 0.05)',
  ':hover > :first-of-type': {
    top: '0',
  },
})

const TopBar = styled.div({
  position: 'absolute',
  top: '-0',
  left: '50%',
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  width: '800px',
  height: '800px',
  transform: 'translate(-50%,-86%)',
  paddingBottom: '3rem',
  borderRadius: '50%',
  background: 'linear-gradient(90deg, #8000e0 20%, #01ced8 70%)',
  transition: 'all .2s',
})

const Arrow = styled.div({
  position: 'absolute',
  left: '50%',
  bottom: '-10px',
  transform: 'translate(-50%) rotate(45deg)',
  width: '16px',
  height: '16px',
  background: 'white',
})

const NavButton = styled.div(
  {
    padding: '0 2rem',
  },
  ({isActive}) => ({
    color: `rgba(255,255,255, ${isActive ? 0.85 : 0.5})`,
    transform: `scale(${isActive ? '2' : '1'}) translateY(${
      isActive ? '8px' : '0'
    })`,
  }),
)

function ScrollableCard({item}) {
  const [navItems] = useState([
    {
      id: 1,
      icon: 'pending',
      isActive: false,
    },
    {
      id: 2,
      icon: 'edit',
      isActive: true,
    },
    {
      id: 3,
      icon: 'delete',
      isActive: false,
    },
  ])
  return (
    <Card>
      {/* <TopBar>
        <Arrow />
        {navItems.map(n => (
          <NavButton key={n.id} isActive={n.isActive}>
            <i className="material-icons-outlined">{n.icon}</i>
          </NavButton>
        ))}
      </TopBar> */}
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
