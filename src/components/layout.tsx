import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'
import Link from '../../Link'
import { readableColor } from 'polished'
import 'typeface-work-sans'
import { Box, Flex, Button } from '../elements'
import theme from '../../config/theme'
import reset from '../styles/reset'
import Logo from './logo'
import LanguagePicker from './language-picker'
import { usePageContext } from '../../PageContext';
import Navbar from './Nav/NavBar';
import { Facebook, Youtube, Twitter } from 'react-feather';
import {FaTwitter, FaFacebookSquare, FaYoutube} from 'react-icons/fa'
import { SiTiktok } from "react-icons/si";


const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: white;
    background-color: #f6993f;
  }
  html {
    box-sizing: border-box;
    border: 0;
    margin: 0;

    h1, h2, h3, h4, h5, h6 {
      font-weight: ${theme.fontWeights.bold};
    }

    h1 {
      font-size: ${theme.fontSizes[5]};
    }
    h2 {
      font-size: ${theme.fontSizes[4]};
    }
    h3 {
      font-size: ${theme.fontSizes[3]};
    }
    h4 {
      font-size: ${theme.fontSizes[2]};
    }
    h5 {
      font-size: ${theme.fontSizes[1]};
    }
    h6 {
      font-size: ${theme.fontSizes[0]};
    }

    @media (max-width: 600px) {
      font-size: 16px;

      h1 {
        font-size: ${theme.fontSizes[4]};
      }
      h2 {
        font-size: ${theme.fontSizes[3]};
      }
      h3 {
        font-size: ${theme.fontSizes[2]};
      }
      h4 {
        font-size: ${theme.fontSizes[1]};
      }
      h5 {
        font-size: ${theme.fontSizes[0]};
      }
      h6 {
        font-size: ${theme.fontSizes[0]};
      }
    }
  }
  body {
    border: 0;
    margin: 0;
    padding: 0;
    color: black;
    font-family: 'Work Sans', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: white;
    font-size: 18px;
  }
  a {
    transition: all 0.3s ease-in-out;
    color: black;
    z-index: 0;
    text-decoration: underline;
    &:hover,
    &:focus {
      color: ${theme.colors.primary};
    }
  }

  ${reset}
`

const isPartiallyActive = ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }) =>
  isPartiallyCurrent ? { className: 'navlink-active navlink' } : { className: 'navlink' }

const PartialNavLink = ({ children, to, ...rest }: { children: React.ReactNode; to: string }) => (
  <Link getProps={isPartiallyActive} to={to} {...rest}>
    {children}
  </Link>
)

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.theme.sidebarWidth.big} 1fr;
  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    grid-template-columns: ${(props) => props.theme.sidebarWidth.normal} 1fr;
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
  }
`

const PButton = styled(Button)<{ color: string }>`
  background: ${(props) => (props.color === 'white' ? 'black' : props.color)};
  color: ${(props) => readableColor(props.color === 'white' ? 'black' : props.color)};
`

const SideBarInner = styled(Box)<{ bg: string }>`
  position: fixed;
  height: 10%;
  width: ${(props) => props.theme.sidebarWidth.big};
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;


  background: ${(props) => props.bg};

  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    width: ${(props) => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }

  svg {
    fill: ${(props) => readableColor(`${props.bg}`)};
  }
`

const Nav = styled(Flex)<{ color: string }>`
  a {
    text-decoration: none;
    color: ${(props) => readableColor(`${props.color}`)};
    font-size: ${(props) => props.theme.fontSizes[3]};
    line-height: 1.5;
    &:hover,
    &:focus,
    &.navlink-active {
      color: ${(props) => props.theme.colors.primary};
    }

    @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
      font-size: ${(props) => props.theme.fontSizes[2]};
      margin-left: ${(props) => props.theme.space[4]};
    }

    @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
      font-size: ${(props) => props.theme.fontSizes[1]};
      margin-left: ${(props) => props.theme.space[3]};
    }

    @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
      font-size: ${(props) => props.theme.fontSizes[0]};
      margin-left: ${(props) => props.theme.space[2]};
    }
  }
`

const Main = styled.main`
  @media (min-width: calc(${(props) => props.theme.breakpoints[2]} + 1px)) {
    grid-column-start: 2;
  }
`

const Footer = styled.footer<{ color: string }>`
  width: ${(props) => props.theme.sidebarWidth.big};

  background: ${(props) => props.color};

  color: ${(props) => readableColor(`${props.color}`, `${props.theme.colors.grey}`, '#c3c3c3')};

  a {
    color: ${(props) => readableColor(`${props.color}`)};
    text-decoration: none;
    &:hover {
      color: ${(props) => props.theme.colors.primary};
    }
  }

  @media (max-width: ${(props) => props.theme.breakpoints[4]}) {
    width: ${(props) => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    position: relative;
    width: 20%;
  }
`

type LayoutProps = { children: React.ReactNode } & typeof defaultProps

const defaultProps = {
  color: 'white',
}

interface QueryResult {
  navigation: {
    nodes: {
      name: string
      link: string
    }[]
  }
}

const Layout = ({ children, color }: LayoutProps) => {
  const data: QueryResult = useStaticQuery(query)
  const { lang } = usePageContext();
  console.log(lang)
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Wrapper>

          <SideBarInner bg={color} as="aside" p={[6, 6, 8]}>

            <Flex
              flexWrap="nowrap"
              flexDirection={['row', 'row', 'row', 'column']}
              alignItems={['center', 'center', 'center', 'flex-start']}
              justifyContent="space-between"
            >
            <Footer color={color}>
              <Box p={[0, 0, 1]} fontSize={0} width={['33rem', '34rem', '33rem', '14rem']}>
              <PButton color="#ff0000" py={4} px={4}>
              {(() => {
                 if (lang != 'cn') {
                   return (
                     <Link to="/login">
                       Register to Enroll in Courses Now
                     </Link>
                   )
                 } else if (lang == 'cn') {
                   return (
                     <Link to="/login">
                       注册购买课程
                     </Link>
                   )
                 }
               })()}

                </PButton>
              </Box>

            </Footer>

  {    /**      <Box width={['3rem', '4rem', '5rem', '6rem']}>

            </Box>*/}
              <Box width={['8rem', '8rem', '8rem', '8rem']}>
                <Link to="/" aria-label="Future English, Back to Home">
                  <Logo />
                </Link>
              </Box>

              {(() => {
                 if (lang != 'cn') {
                   return (
                     <Box p={[0, 0, 0]} fontSize={0} width={['15rem', '15rem', '15rem', '14rem']}>
                       <a href="https://web.facebook.com/" target="_blank">
                         <FaFacebookSquare size={'3em'}/>
                       </a>
                       <a href="https://www.youtube.com/channel/UCdMSZjFiM7x_44MPh5jD9bQ" target="_blank">
                         <FaYoutube size={'3em'} />
                       </a>
                       <a href="https://twitter.com/" target="_blank">
                         <FaTwitter size={'3em'}/>
                       </a>
                       <a href="https://tiktok.com/" target="_blank">
                         <SiTiktok size={'3em'}/>
                       </a>
                     </Box>
                   )
                 } else if (lang == 'cn') {
                   return (
                     <Box p={[1, 1, 1]} fontSize={0} width={['15rem', '15rem', '15rem', '14rem']}>
                      <a href="https://www.douyin.com/" target="_blank"><SiTiktok size={'3em'}/></a>
                     </Box>
                   )
                 }
               })()}

              <Box p={[0, 0, 0]} fontSize={0} width={['33rem', '34rem', '33rem', '100%']}>
                <Navbar />
              </Box>
            {/**  <Nav
                color={color}
                mt={[0, 0, 0, 10]}
                as="nav"
                flexWrap="nowrap"
                flexDirection={['row', 'row', 'row', 'column']}
                alignItems="flex-start"
              >
              <LanguagePicker />
              {(() => {
                 if (lang != 'cn') {
                   return (
                     data.navigation.nodes.map((item) => (
                     <Link to={item.link} key={item.name}>
                       {item.name}
                     </Link>
                   ))
                   )
                 } else if (lang == 'cn') {
                   return (
                     data.navigationCN.nodes.map((item) => (
                     <Link to={item.link} key={item.name}>
                       {item.name}
                     </Link>
                   ))
                   )
                 }
               })()}
              </Nav>*/}

            </Flex>
          </SideBarInner>
          <Main>{children}</Main>

        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout

Layout.defaultProps = defaultProps

const query = graphql`
  query Layout {
    navigation: allNavigationYaml {
      nodes {
        name
        link
      }
    }

    navigationCN: allNavigationCnYaml {
      nodes {
        name
        link
      }
    }
  }
`
