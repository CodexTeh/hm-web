import React from 'react';
import { Digit } from './Digit';
import {
  Separtor,
  SepartorContainer,
  TimerContainer
} from './styledComponents';
import { GetLanguage } from '@redux-state/selectors';

export default function Timer({ seconds, minutes, hours, days }) {
  const language = GetLanguage();
  const isRTL = language === 'ar';
  return (
    <TimerContainer>
      {days !== undefined ? (
        <Digit value={days} title={isRTL ? 'أيام' : 'DAYS'} />
      ) : null}
      {days !== undefined ? (
        <SepartorContainer>
          <Separtor />
          <Separtor />
        </SepartorContainer>
      ) : null}
      <Digit value={hours} title={isRTL ? 'ساعات' : 'HOURS'} />
      <SepartorContainer>
        <Separtor />
        <Separtor />
      </SepartorContainer>
      <Digit value={minutes} title={isRTL ? 'دقائق' : 'MINUTES'} />
      <SepartorContainer>
        <Separtor />
        <Separtor />
      </SepartorContainer>
      <Digit value={seconds} title={isRTL ? 'ثواني' : 'SECONDS'} />
    </TimerContainer>
  );
}
