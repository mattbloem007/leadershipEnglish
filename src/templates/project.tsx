import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { transparentize, readableColor } from 'polished'
import styled from 'styled-components'
import { config, useSpring, animated } from 'react-spring'
import Layout from '../components/layout'
import { Box, AnimatedBox, Button } from '../elements'
import SEO from '../components/SEO'
import Link from '../../Link'
import { usePageContext } from '../../PageContext';
import contentParser from 'gatsby-wpgraphql-inline-images';

const pluginOptions = {
  wordPressUrl: 'https://wordpress.futureleadership.online/',
  uploadsUrl: 'https://wordpress.futureleadership.online/wp-content/uploads/'
};

const PBox = styled(AnimatedBox)`
  max-width: 1400px;
  margin: 0 auto;
`

const Content = styled(Box)<{ bg: string }>`
  background-color: ${(props) => transparentize(0.9, props.bg)};

  .gatsby-image-wrapper:not(:last-child) {
    margin-bottom: ${(props) => props.theme.space[10]};

    @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
      margin-bottom: ${(props) => props.theme.space[8]};
    }
  }
`

const Category = styled(AnimatedBox)`
  letter-spacing: 0.05em;
  font-size: ${(props) => props.theme.fontSizes[1]};
  text-transform: uppercase;
`

const Description = styled(animated.div)`
  max-width: 960px;
  letter-spacing: -0.003em;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  line-height: 1.58;
`

const PButton = styled(Button)<{ color: string }>`
  background: ${(props) => (props.color === 'white' ? 'black' : props.color)};
  color: ${(props) => readableColor(props.color === 'white' ? 'black' : props.color)};
`

const Project = ({ data, pageContext }) => {
  console.log("Context: ", pageContext)
  const categoryAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  const titleAnimation = useSpring({ config: config.slow, delay: 300, from: { opacity: 0 }, to: { opacity: 1 } })
  const descAnimation = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })
  const imagesAnimation = useSpring({ config: config.slow, delay: 800, from: { opacity: 0 }, to: { opacity: 1 } })
  const {content} = pageContext
  const { lang } = usePageContext();

  let isImage = false;
  if (data.file.childImageSharp) {
    isImage = true;
  }
  console.log(isImage)
  return (
    <Layout>
      <SEO
        pathname={pageContext.slug}

        title={pageContext.title}
        desc={pageContext.excerpt}
        individual
      />
      <PBox py={10} px={[6, 6, 8, 10]}>
{/**        <Category style={categoryAnimation}>{project.category}</Category>*/}
        <animated.h1 style={titleAnimation}>{pageContext.title}</animated.h1>
        <Description style={descAnimation}>
          <div>{contentParser({ content }, pluginOptions)}</div>
        </Description>
      </PBox>
      <Content bg="#90BDDF" py={10}>
        <PBox style={imagesAnimation} px={[6, 6, 8, 10]}>
            {isImage ? <Img alt={data.file.name} key={data.file.childImageSharp.fluid.srcSet} fluid={data.file.childImageSharp.fluid} /> : null}
        </PBox>
      </Content>

      {(() => {
         if (lang != 'cn') {
           return (
             <PBox style={{ textAlign: 'center' }} py={10} px={[6, 6, 8, 10]}>
               <h2>Sign up below to buy our courses and start learning with Future Leadership. First Class is always free</h2>
               <PButton color="#90BDDF" py={4} px={8}>
               <Link to="/login" key="login">
                 Sign Up
               </Link>
               </PButton>
             </PBox>
           )
         } else if (lang == 'cn') {
           return (
             <PBox style={{ textAlign: 'center' }} py={10} px={[6, 6, 8, 10]}>
               <h2>点击“注册”购买我们的课程，开始和未来领导力一起学习！第一堂课免费。</h2>
               <PButton color="#90BDDF" py={4} px={8}>
               <Link to="/login" key="login">
                 注册
               </Link>
               </PButton>
              </PBox>
           )
         }
       })()}


    </Layout>
  )
}

export default Project

export const query = graphql`
  query ProjectTemplate($id2: StringQueryOperatorInput) {


    file(parent: {id: $id2}) {
        name
        childImageSharp {
          fluid (quality: 95, maxWidth: 1200){
            srcSet
            ...GatsbyImageSharpFluid_withWebp
          }
          resize(width: 1200, height: 675, quality: 80) {
            src
          }
        }
      }
  }
`
