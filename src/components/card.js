/**@jsx jsx */
import {jsx} from '@emotion/react'
import styled from '@emotion/styled/macro'
import PerfectScrollbar from 'react-perfect-scrollbar'
import * as colors from 'styles/colors'
import {ActionButtons} from 'components/action-buttons'
import {ImLocation} from 'react-icons/im'
import {FaBuilding} from 'react-icons/fa'
import {formatDate} from 'utils/misc'

const Card = styled.div({
  position: 'relative',
  width: '250px',
  height: '250px',
  overflow: 'hidden',
  borderRadius: '4px',
  borderTop: `5px solid ${colors.green}`,
  background: 'white',
  paddingTop: '3rem',
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
  console.log(item)
  return (
    <Card>
      <TopBar>
        <ActionButtons item={item} />
      </TopBar>
      <PerfectScrollbar css={{maxHeight: '70%'}}>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px 30px',
          }}
        >
          <div>
            <h3>{item.title}</h3>
          </div>
          <div
            css={{display: 'flex', flexDirection: 'row', paddingTop: '10px'}}
          >
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',

                borderRight: `1px solid ${colors.gray80}`,
                width: '15%',
                color: colors.gray80,
              }}
            >
              <div>
                <FaBuilding />
              </div>
              <div>
                <ImLocation />
              </div>
            </div>

            <div
              css={{
                paddingLeft: '10px',
                fontFamily: 'lato, sans-serif',
                color: colors.text,
              }}
            >
              <div>{item.company}</div>
              <div>{item.location}</div>
            </div>
          </div>
        </div>
      </PerfectScrollbar>
      <div
        css={{
          textAlign: 'center',
          fontStyle: 'italic',
          marginBottom: '0',
          position: 'absolute',
          paddingBottom: '4px',
          bottom: '0',
          color: colors.gray80,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '.8rem',
          width: '100%',
          background: colors.gray20,
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
        }}
      >
        Last updated {formatDate(new Date(item.lastUpdated))}
      </div>
    </Card>
  )
}

export default ScrollableCard
