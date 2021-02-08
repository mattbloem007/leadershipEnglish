import React from 'react'
import styled from "styled-components";

import logo from '../../../content/logo.png'
import logo_us from '../../../content/usa_logo.png'
import { usePageContext } from '../../../PageContext';

const Brand = () => {
  const { lang } = usePageContext();
  if (lang == undefined || lang == "us") {
    return (
      <Image src={logo_us} alt="Company Logo" />
    )
  }
  else {
    return (
      <Image src={logo} alt="Company Logo" />
    )
  }

}

export default Brand

const Image = styled.img`
  height: 85%;
  margin: auto 0;
`;
