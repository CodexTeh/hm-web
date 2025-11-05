import { Box, styled } from '@mui/material';
import { colorPalette } from '@utils/colorPalette';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 .3125rem',
  '&:first-child': {
    marginLeft: 0
  }
});

export const Title = styled('span')(() => ({
  color: colorPalette.theme,
  fontSize: '1rem',
  fontWeight: 400
}));

export const DigitContainer = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  padding: 0
});

export const SingleDigit = styled('span')(({ theme }) => ({
  borderRadius: '.3125rem',
  color: colorPalette.theme,
  display: 'flex',
  flex: '0 1 25%',
  fontSize: '1.5rem',
  fontWeight: 700,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem'
  }
}));

export const TimerContainer = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row'
});

export const SepartorContainer = styled('span')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'flex-end',
  margin: '0 0 .25rem 0rem'
});

export const Separtor = styled('span')({
  backgroundColor: colorPalette.batGrey,
  borderRadius: '.375rem',
  display: 'inline-block',
  height: '.1875rem',
  margin: '.1875rem 0rem',
  width: '.1875rem'
});
