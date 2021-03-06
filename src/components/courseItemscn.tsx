import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from 'styled-components'
import GridItem from './grid-item'
import { usePageContext } from '../../PageContext';
import _ from 'lodash'

import { animated, useSpring, config } from 'react-spring'



const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw 25vw;
  grid-template-areas:
    'mid4 mid5 mid6'
    'mid mid2 mid3'
    'instagram instagram instagram';

  @media (max-width: ${(props) => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      'mid4 mid5 mid6 mid6'
      'mid mid2 mid3 mid3'
      'mid mid2 mid3 mid3'
      'instagram instagram instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      'mid4 mid5'
      'mid6 mid'
      'mid2 mid3'
      'instagram instagram';
  }

  @media (max-width: ${(props) => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      'mid4'
      'mid5'
      'mid6'
      'mid'
      'mid2'
      'mid3'
      'instagram';
  }
`

const FirstProject = styled(GridItem)`
  grid-area: first-project;
`
const ThreeProjects = styled.div`
  grid-area: three-projects;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: ${(props) => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`
const AboutUs = styled(GridItem)`
  grid-area: about-us;
`

const Mid = styled(GridItem)`
  grid-area: mid;
`
const Mid2 = styled(GridItem)`
  grid-area: mid2;
`
const Mid3 = styled(GridItem)`
  grid-area: mid3;
`
const Mid5 = styled(GridItem)`
  grid-area: mid5;
`
const Mid6 = styled(GridItem)`
  grid-area: mid6;
`
const Mid4 = styled(GridItem)`
  grid-area: mid4;
`
const Instagram = styled(GridItem)`
  grid-area: instagram;`


class CourseItemCn extends React.Component {

    render() {
      let isImage = false;
      console.log("FILE", this.props.file)
      if (this.props.file.node.childImageSharp) {
        isImage = true;
      }

        if (this.props.data.node.categories) {
          console.log(this.props.data.node.categories.nodes, _.some(this.props.data.node.categories.nodes, {"name": "photos"}))
          if (_.some(this.props.data.node.categories.nodes, {"name": "photos"}) && this.props.data.node.excerpt == "<p>pic1</p>\n") {
            console.log("Made about project", this.props.data.node)
            return (
              <AboutUs to="#">
                {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
              </AboutUs>
            );
          }
          else if (_.some(this.props.data.node.categories.nodes, {"name": "photos"}) && this.props.data.node.excerpt == "<p>pic2</p>\n") {
            console.log("Made insta project", this.props.data.node)
            return (
              <Instagram to="#">
                {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
              </Instagram>
            );
          }
          else if (_.some(this.props.data.node.categories.nodes, {"name": "photos"})) {
            console.log("Made grid project", this.props.data.node)
            return (
              <FirstProject to="#">
                {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
              </FirstProject>
            )
          }
          //else if (this.props.lang == "us") {
          else {
            console.log("Made mids project", this.props.data.node)
            if (this.props.data.node.slug == "visual-learning") {
              return (
                <Mid to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
                  {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
                  <span>{this.props.data.node.title}</span>
                </Mid>
              )
            }
            else if (this.props.data.node.slug == "feature-class-for-all-levels-power-english"){
              return (
                <Mid2 to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
                  {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
                  <span>{this.props.data.node.title}</span>
                </Mid2>
              )
            }
            else if (this.props.data.node.slug == "feature-class-for-all-levels-study-abroad"){
              return (
                <Mid3 to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
                  {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
                  <span>{this.props.data.node.title}</span>
                </Mid3>
              )
            }
            else if (this.props.data.node.slug == "new-china-course-1"){
              return (
                <Mid4 to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
                  {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
                  <span>{this.props.data.node.title}</span>
                </Mid4>
              )
            }
            else if (this.props.data.node.slug == "new-china-course-2"){
              return (
                <Mid5 to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
                  {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
                  <span>{this.props.data.node.title}</span>
                </Mid5>
              )
            }
            else if (this.props.data.node.slug == "new-china-course-3"){
              return (
                <Mid6 to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
                  {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
                  <span>{this.props.data.node.title}</span>
                </Mid6>
              )
            }

          }
          // else {
          //   console.log("Made grid cn project", this.props.data.node)
          //   return (
          //     <GridItem to={`/courses/${this.props.data.node.slug}`} aria-label={`View project "${this.props.data.node.title}"`}>
          //       {isImage? <Img fluid={this.props.file.node.childImageSharp.fluid} />: null}
          //       <span>{this.props.data.node.title}</span>
          //     </GridItem>
          //   )
          // }
        }
      }
}

export default function(props) {
  const { lang } = usePageContext();
    console.log(props.data)
    let items = [];
    let fileIndex;
    if (props.data.wpgraphql.posts.edges != undefined) {
      const data = props.data.wpgraphql.posts.edges;
      data.forEach(function(e, i) {
          if (props.remove && e.node.id === props.remove) return;
            fileIndex = props.data.allFile.edges.find(({node}) => {
              if (node.parent) {
                if (lang != undefined) {
                  if (node.parent.id == `SitePage /${lang}/courses/` + e.node.slug) {
                    return node
                  }
                }
                else {
                  if (node.parent.id == `SitePage /courses/` + e.node.slug) {
                    return node
                  }
                }
              }
            })

            if (fileIndex) {
              items.push(<CourseItemCn key={e.node.id} data={e} file={fileIndex} lang={lang}/>);
            }
            console.log(items)
      });
    }
    return <Area>{items}</Area>;
}
