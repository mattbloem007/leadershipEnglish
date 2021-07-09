import React from 'react';
import styled from 'styled-components';
import { usePageContext } from '../../../PageContext';
import Link from '../../../Link'
import { graphql, useStaticQuery } from 'gatsby'
import LanguagePicker from '../language-picker'
import { Flex } from '../../elements'

const Ul = styled.ul`

  list-style: none;
    display: flex;
    flex-flow: column nowrap;
        padding-left: 0px;
    font-size: ${(props) => props.theme.fontSizes[3]};

  @media (max-width: ${(props) => props.theme.breakpoints[2]}) {
    flex-flow: column nowrap;
    background-color: #4c8fc3;
    position: fixed;
    margin-top: 0px;
    text-color: white;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
    z-index: 1;
    top: 0;
    right: 0;
    height: 70%;
    width: 50%;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const data = {
  navigation: {
    nodes:
        [{
          name: "Home",
          link: "/"
        },
        {
          name: "Our Classes",
          link: "/courses"
        },
        {
          name: "Blog",
          link: "/blog"
        }]
  },
  navigationCN: {
    nodes:
        [{name: "主页",
        link: "/"},
        {name: "我们的课程",
        link: "/courses"},
        {name: "博客",
        link: "/blog"}]

  }
}


type PageProps = {
  data: {
    navigation: {
      nodes: {
        name: string
        link: string
      }[]
    }
  }
}

const RightNav = ({open}) => {
  const { lang } = usePageContext();
  return (
    <Ul open={open}>
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
    </Ul>
  )
}

export default RightNav

const query = graphql`
  query RightNav {
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
