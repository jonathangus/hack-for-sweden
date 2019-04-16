import React from 'react'
import styled from 'styled-components'
import {
  bgHero,
  gutter,
  titleFont,
  baseTransition,
  baseTransitionMs,
  secondaryColor,
  borderColor,
} from '../vars'
import logo from '../images/logo_small.png'
import logo_black from '../images/logo_black.png'
import Grid from './Grid'
import { Link } from 'gatsby'
import uiEmitter, { events } from '../uiEmitter'
import once from 'lodash/once'
import menuItems from '../menu-items'
import { LocaleContextConsumer } from '../localeContext'
import LanguageSelect from './LanguageSelect'

const Nav = styled.div`
  position: absolute;
  top: 0;
  z-index: 550;
  width: 100%;

  img {
    width: 75px;
  }

  @media (min-width: ${breakpoint}) {
    overflow: hidden;
  }
`

const breakpoint = '1000px'

const NavGrid = styled(Grid)`
  max-width: none;
`
const Logo = styled(Link)`
  display: block;
  transform: translateY(${p => (p.show ? 0 : '-130')}px);
  transition: transform ${baseTransition};
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${gutter}px 0;
  justify-content: space-between;
`

const MenuChildren = styled.div`
  position: absolute;
  top: calc(100% - ${gutter * 2}px);
  left: 50%;
  width: 140px;
  margin-left: -70px;
  pointer-events: none;

  @media (max-width: ${breakpoint}) {
    display: none;
  }
`

const MenuChildrenInner = styled.div`
  margin-top: ${gutter * 2}px;
  border: 1px solid ${borderColor};
  border-radius: 4px;
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  transition: opacity ${baseTransition}, transform ${baseTransition};
`

const MenuItem = styled(Link)`
  text-decoration: none;
  position: relative;
  color: white;
  flex-shrink: 0;
  position:relative;
  font-size: 26px;
  transform: translateY(${p => (p.show ? 0 : '30px')}px);
  opacity: ${p => (p.show ? 1 : 0)};
  transition: transform ${baseTransition}, opacity ${baseTransition};
  padding: 10px 0;

  @media(max-width: ${breakpoint}) {
    font-size: 18px;
    padding: 5px 0;
  }

    &:before {
      content:"";
      display:block;
    width: 70%;
    height: 17px;
    background: linear-gradient(45deg, ${secondaryColor}, #000110);
    position: absolute;
    left: 0px;
    bottom: 10px;
    transform-origin: 0 0;
    z-index: -1;
    transform:scale3d(0,1,1);
    transition: transform ${baseTransition};
  }

  &:hover:before {
      transform:scale3d(1,1,1);
  }
/*     
  @media (max-width: ${breakpoint}) {
    font-size: 20px;
    padding: ${gutter}px 0;
    transform: translateX(${p => (p.open ? 0 : '-30')}px);
    opacity: ${p => (p.open ? 1 : 0)};
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  @media (min-width: ${breakpoint}) {
    font-size: 22px;
    padding-left: ${gutter}px;
    transform: translateY(${p => (p.show ? 0 : '30px')}px);
    opacity: ${p => (p.show ? 1 : 0)};
    transition: transform ${baseTransition}, opacity ${baseTransition};
    /* display: inline-block; */
  } */

  &:hover {
    @media (min-width: ${breakpoint}) {
      
      ${MenuChildren} {
        pointer-events: all;
      }
      ${MenuChildrenInner} {
        opacity: 1;

        transform: translateY(0px) scale(1);
      }
    }
  }
`

const ITEM_DELAY = 40
const PartnerLink = styled(Link)`
  font-weight: bold;
  font-family: ${titleFont};
  text-decoration: none;
  color: white;
  font-size: 15px;

  padding: 5px 10px;
  border-radius: 20px;
  background: #fff;
  color: #222;

  @media (max-width: ${breakpoint}) {
    margin-top: ${gutter}px;
  }
  @media (min-width: ${breakpoint}) {
    margin-left: ${gutter}px;
  }
`

const SignupLink = styled(Link)`
  font-weight: bold;
  font-family: ${titleFont};
  background-color: ${secondaryColor};
  color: white;
  text-decoration: none;
  color: white;
  font-size: 15px;
  border: 1px solid ${secondaryColor};
  padding: 5px 10px;
  border-radius: 20px;

  display: inline-block;

  @media (max-width: ${breakpoint}) {
    margin-top: ${gutter}px;
  }
  @media (min-width: ${breakpoint}) {
    margin-left: ${gutter}px;
  }
`

const Hamburger = styled.div`
  font: inherit;
  display: inline-block;
  overflow: visible;
  margin: 0;
  cursor: pointer;
  transition-timing-function: linear;
  transition-duration: 0.15s;
  transition-property: opacity, filter;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
`
const HBox = styled.div`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 24px;
`
const HInner = styled.div`
  position: absolute;
  width: 40px;
  height: 4px;
  transition-timing-function: ease;
  transition-property: transform;
  border-radius: 4px;
  background-color: #fff;
  top: 50%;
  display: block;
  margin-top: -2px;

  transition-timing-function: ${p =>
    p.active
      ? 'cubic-bezier(.215,.61,.355,1)'
      : 'cubic-bezier(.55,.055,.675,.19)'};

  transition-duration: 0.22s;
  transition-delay: ${p => (p.active ? '0.12s' : '')};
  transform: rotate(${p => (p.active ? 225 : 0)}deg);

  &:before,
  &:after {
    position: absolute;
    width: 40px;
    height: 4px;
    transition-timing-function: ease;
    transition-duration: 0.15s;
    transition-property: transform;
    border-radius: 4px;
    background-color: #fff;
    content: '';
    display: block;
  }

  &:before {
    top: -10px;
    top: ${p => (p.active ? 0 : '')};
    transition: ${p =>
      p.active
        ? 'top .1s ease-out,opacity .1s ease-out .12s'
        : 'top .1s ease-in .25s,opacity .1s ease-in;'};
    opacity: ${p => (p.active ? 0 : 1)};
  }
  &:after {
    bottom: ${p => (p.active ? 0 : -10)}px;
    transition: ${p =>
      p.active
        ? 'bottom .1s ease-out,transform .22s cubic-bezier(.215,.61,.355,1) .12s'
        : ''};
    transform: ${p => (p.active ? 'rotate(-90deg)' : '')};
  }
`
const BurgerWrap = styled.div`
  margin-left: 10px;
  /* position: fixed; */
  right: 20px;
  top: 20px;
  z-index: 1000;
  cursor: pointer;

  @media (min-width: ${breakpoint}) {
    /* display: none; */
  }
`
const MenuToggle = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  color: white;
  font-size: 22px;
  line-height: 1;
  font-family: ${titleFont};
  margin-left: ${gutter}px;
`
const Inner = styled.div`
  @media (max-width: ${breakpoint}) {
    padding: 0 ${gutter}px;
  }
`
const InnerItems = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${gutter * 2}px ${gutter * 4}px;

  @media (max-width: ${breakpoint}) {
    gap: ${gutter}px;
  }
`
const MenuOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background: #000;
  height: 100%;
  right: 0;
  z-index: 500;
  opacity: ${p => (p.show ? 1 : 0)};
  transform: translateY(${p => (p.show ? 0 : '30px')});

  transition: transform ${baseTransition}, opacity ${baseTransition};
  pointer-events: ${p => (p.show ? 'all' : 'none')};
`
const Buttons = styled.div`
  display: flex;
  align-items: center;
`
const MobileLanguageSelect = styled.div`
  @media (min-width: ${breakpoint}) {
    display: none;
  }
`
const DesktopLanguageSelect = styled.div`
  @media (max-width: ${breakpoint}) {
    display: none;
  }
`

const MobileButton = styled.div`
  display: flex;
  margin-top: ${gutter}px;
  justify-content: space-around;
  @media (min-width: ${breakpoint}) {
    display: none;
  }
`

const Menu = styled.nav`
  display: flex;
  align-items: stretch;
  margin-top: ${p => (p.show ? 0 : '-130')}px;
  transition: margin ${baseTransition};

  ${Buttons} {
    @media (max-width: ${breakpoint}) {
      display: none;
    }
  }
`

const Burger = ({ active, onClick, burger }) =>
  burger && (
    <BurgerWrap onClick={onClick}>
      <Hamburger active={active}>
        <HBox active={active}>
          <HInner active={active} />
        </HBox>
      </Hamburger>
    </BurgerWrap>
  )

class Header extends React.Component {
  state = {
    show: undefined,
    open: undefined,
    burger: true,
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
    })
  }

  hide = () => {
    this.setState({
      open: undefined,
    })
  }

  showBurg = () => {
    this.setState({ burger: true })
  }
  hideBurg = () => {
    this.setState({ burger: false })
  }
  componentDidMount() {
    uiEmitter.on(events.heroLoaded, this.animateIn)
    uiEmitter.on(events.showBurger, this.showBurg)
    uiEmitter.on(events.hideBurger, this.hideBurg)
  }

  componentWillUnmount() {
    uiEmitter.off(events.heroLoaded, this.animateIn)
    uiEmitter.off(events.showBurger, this.showBurg)
    uiEmitter.off(events.hideBurger, this.hideBurg)
  }

  animateIn = once(() => {
    this.setState({
      show: true,
    })
  })

  getMenuItem = (menuItem, i) => {
    const { show, open } = this.state

    return (
      <div key={i}>
        <LocaleContextConsumer>
          {t => (
            <MenuItem
              open={open}
              className="js-reset"
              style={{
                transitionDelay: `${i * ITEM_DELAY + baseTransitionMs}ms`,
              }}
              show={`${show}`}
              onClick={this.hide}
              key={i}
              to={t.url(menuItem.path)}
            >
              {t(menuItem.path)}
            </MenuItem>
          )}
        </LocaleContextConsumer>
      </div>
    )
  }

  render() {
    const { show, open, burger } = this.state
    const { darkLogo, pathname } = this.props
    const buttons = (
      <LocaleContextConsumer>
        {t => (
          <React.Fragment>
            <DesktopLanguageSelect>
              <LanguageSelect pathname={pathname} />
            </DesktopLanguageSelect>
            <PartnerLink
              onClick={this.hide}
              open={open}
              show={`${show}`}
              to={t.url('/partner')}
            >
              {t('link.partner')}
            </PartnerLink>
          </React.Fragment>
        )}
      </LocaleContextConsumer>
    )
    return (
      <LocaleContextConsumer>
        {t => (
          <Nav>
            <NavGrid>
              <Wrapper>
                <Logo show={`${show}`} className="js-reset" to={t.url('/')}>
                  <img src={darkLogo ? logo_black : logo} />
                </Logo>
                <MenuOverlay show={open}>
                  <Inner>
                    <InnerItems>{menuItems.map(this.getMenuItem)}</InnerItems>
                    <MobileButton>{buttons}</MobileButton>
                  </Inner>
                </MenuOverlay>
                <Menu show={show}>
                  <Buttons>{buttons}</Buttons>
                  <MobileLanguageSelect>
                    <LanguageSelect pathname={pathname} />
                  </MobileLanguageSelect>
                  <MenuToggle onClick={this.toggle}>
                    {t('menu')} <Burger burger={burger} active={open} />
                  </MenuToggle>
                </Menu>
              </Wrapper>
            </NavGrid>
          </Nav>
        )}
      </LocaleContextConsumer>
    )
  }
}

export default Header
