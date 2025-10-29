import React from 'react';
import {
  Container,
  DigitContainer,
  SingleDigit,
  Title
} from './styledComponents';

function separateDigits(number) {
  const str = number.toString().padStart(3, '0');
  const [digit1, digit2, digit3] = str
    .split('')
    .map((digit) => parseInt(digit));

  return { digit1, digit2, digit3 };
}

export function Digit({ value, title }) {
  const { digit2, digit3 } = separateDigits(value);
  return (
    <Container>
      <DigitContainer>
        {/* {title === 'DAYS' && <SingleDigit>{digit1}</SingleDigit>} */}
        <SingleDigit>{digit2}</SingleDigit>
        {title === 'DAYS'}
        <SingleDigit>{digit3}</SingleDigit>
      </DigitContainer>
      <Title>{title}</Title>
    </Container>
  );
}
