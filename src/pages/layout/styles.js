import { Box, Card, Divider, InputBase, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import { colorPalette } from '@utils/colorPalette';

const drawerWidth = 240;

export const StyledMainBox = styled(Box)(({ theme }) => ({
  background: colorPalette.emeraldGreen,
  overflow: 'auto',
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  padding: 20,
  width: 'auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' }) (({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

export const StyledTemplatesContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'row',
});

export const SearchIconWrapper = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  padding: theme.spacing(0, 2),
  pointerEvents: 'none',
  position: 'absolute',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const StyledEditBox = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  background: colorPalette.torqouise,
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  height: 40,
  margin: '10px -20px 0px -20px',
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  background: colorPalette.torqouise,
  margin: '5px -20px 0px -20px',
}));

export const StyledCardBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: 10,
  marginTop: 20,
  height: 'auto'
}));

export const StyledCardContainer = styled(Card)(({ theme }) => ({
  border: `2px solid`,
  borderColor: colorPalette.torqouise,
  background: colorPalette.lightTorqouse,
  borderRadius: 10,
  height: '85%'
}));

export const StyledCartContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 10,
}));

export const StyledCartBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}));
