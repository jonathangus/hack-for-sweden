import React from 'react'
import styled from 'styled-components'
import { bgFooter, sectionSpace, gutter } from '../vars'
import menuItems from '../menu-items'
import Grid from './Grid'
import { Link } from 'gatsby'
import OpenDataTitle from './OpenDataTitle'
import SocialMedia from './SocialMedia'
import { useLocale } from '../localeContext'

const Container = styled.footer`
  border-top: 1px solid rgba(255, 255, 255, 0.7);
  padding: ${sectionSpace} 0;
  // height: 300px;
  margin-top: 100px;
`

const Menu = styled.ul`
  text-align: center;
`
export const MenuItem = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 15px;
  padding-left: ${gutter}px;
  display: inline-block;
  position: relative;
  padding-right: ${gutter}px;
  &:after {
    content: '';
    height: 60%;
    top: 7px;
    margin-left: ${gutter * 2}px;
    width: 1px;
    background: white;
    display: block;
    position: absolute;
    right: 0;
  }

  &:last-child:after {
    display: none;
  }
`
const Bottom = styled.div`
  margin-top: ${gutter * 4}px;
  justify-content: space-between;
  align-items: center;
  > div {
    flex: 1;
  }
  display: flex;
  @media (max-width: 700px) {
    display: block;
  }
`
const Contact = styled.div`
  text-align: center;
  margin-top: 20px;
  @media (min-width: 700px) {
    text-align: right;
    margin-top: 0;
  }
  h3 {
    line-height: 1;
  }

  > div {
    @media (max-width: 700px) {
      justify-content: center;
    }
  }
  > a {
    display: block;
    margin-bottom: 10px;
    margin-top: 5px;
  }
`
const Footer = () => {
  const t = useLocale()

  const getMenuItem = (menuItem, i) => {
    return (
      <MenuItem key={i} to={t.url(menuItem.path)}>
        {t(menuItem.path)}
      </MenuItem>
    )
  }

  return (
    <Container>
      <Grid>
        <Menu>{menuItems.map(getMenuItem)}</Menu>
        <Bottom>
          <OpenDataTitle />
          <Contact>
            <h3>{t('footer.contact')}</h3>
            <a href="mailto:info@hackforsweden.se">info@hackforsweden.se</a>
            <SocialMedia footer />
          </Contact>
        </Bottom>
      </Grid>
    </Container>
  )
}
export default Footer
