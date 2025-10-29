import React from 'react';
import { Digit } from './Digit';
import {
  Separtor,
  SepartorContainer,
  TimerContainer
} from './styledComponents';

export default function Timer({ seconds, minutes, hours, days }) {
  return (
    <TimerContainer>
      {days !== undefined ? (
        <Digit value={days} title='DAYS' />
      ) : null}
      {days !== undefined ? (
        <SepartorContainer>
          <Separtor />
          <Separtor />
        </SepartorContainer>
      ) : null}
      <Digit value={hours} title='HOURS' />
      <SepartorContainer>
        <Separtor />
        <Separtor />
      </SepartorContainer>
      <Digit value={minutes} title='MINUTES' />
      <SepartorContainer>
        <Separtor />
        <Separtor />
      </SepartorContainer>
      <Digit value={seconds} title='SECONDS' />
    </TimerContainer>
  );
}
