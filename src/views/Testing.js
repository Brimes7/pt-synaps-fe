import React, { useState } from 'react';
import styled from 'styled-components';
import BigFlashCard from '../components/Styled/BigFlashCard';
import CardIcon from '../components/Styled/CardIcon';
import StyledUploader from '../components/Styled/StyledUploader';
import StyledInput from '../components/Styled/StyledInput';
import { Form } from 'antd';
import StyledSearchBar from '../components/Styled/StyledSearchBar';
import { uploadPhoto } from '../actions';
import StyledUploader from '../components/StyledUploader/StyledUploader';

const Testing = () => {
  
  return ( <StyledTesting>
    <StyledUploader id={ 1 }/>
    <StyledUploader id={ 2 }/>
    <StyledUploader id={ 3 }/>
  
  </StyledTesting> );
};

const StyledTesting = styled.div`
  margin: 0 auto;
  width: 400px;
`;

export default Testing;