import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import PageItems from "./pageItems";
import PageItemsCn from "./pageItemscn";
import styled from 'styled-components'
import GridItem from './grid-item'
import { usePageContext } from '../../PageContext';

import { animated, useSpring, config } from 'react-spring'



const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw 25vw;
  grid-template-areas:
    'first-project about-us about-us'
    'three-projects three-projects three-projects'
    'instagram instagram instagram';

  @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      'first-project first-project about-us about-us'
      'three-projects three-projects three-projects three-projects'
      'three-projects three-projects three-projects three-projects'
      'instagram instagram instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      'first-project about-us'
      'three-projects three-projects'
      'three-projects three-projects'
      'three-projects three-projects'
      'instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      'first-project'
      'about-us'
      'three-projects'
      'three-projects'
      'three-projects'
      'instagram';
  }
`

export default function() {
    const query = useStaticQuery(graphql`
        query blogList {


            wpgraphql {
              posts(where: {orderby: {field: DATE, order: ASC}, categoryName: "info"}, first: 200){
                edges{
                  node{
                    excerpt
                    slug
                    date
                    title
                    featuredImage {
                      sourceUrl(size: LARGE)
                      srcSet(size: MEDIUM_LARGE)
                    }
                    tags {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                    categories {
                      nodes {
                        name
                      }
                    }
                  }
                }
              }
            }

            allFile {
              edges {
                node {
                  name
                  parent{
                    id
                  }
                  childImageSharp {
                    fluid (quality: 95, maxWidth: 1200){
                      srcSet
                      ...GatsbyImageSharpFluid_withWebp

                    }
                  }
                }
              }
            }

            firstProject: projectsYaml {
                   title
                   slug
                   cover {
                     childImageSharp {
                       fluid(quality: 95, maxWidth: 1200) {
                         ...GatsbyImageSharpFluid_withWebp
                       }
                     }
                   }
                 }
                 threeProjects: allProjectsYaml(limit: 1, skip: 1) {
                        nodes {
                          title
                          slug
                          cover {
                            childImageSharp {
                              fluid(quality: 95, maxWidth: 1200) {
                                ...GatsbyImageSharpFluid_withWebp
                              }
                            }
                          }
                        }
                      }

            instagram: file(sourceInstanceName: { eq: "images" }, name: { eq: "boston" }) {
              childImageSharp {
                fluid(quality: 95, maxWidth: 1920) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }

            aboutUs: file(sourceInstanceName: { eq: "images" }, name: { eq: "students3" }) {
              childImageSharp {
                fluid(quality: 95, maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
        }
    `);

    if (query.wpgraphql.posts.edges.length > 0) {
      console.log("QUERY", query.wpgraphql.posts)
      const { lang } = usePageContext();
      const pageAnimation = useSpring({
        config: config.slow,
        from: { opacity: 0 },
        to: { opacity: 1 },
      })
      if (lang == "cn") {
        return (
                <PageItemsCn data={query} />
        );
      } else {
        return (
                <PageItems data={query} />
        );
      }
    } else {
        return <React.Fragment></React.Fragment>;
    }
}
