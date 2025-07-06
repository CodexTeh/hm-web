import React, { useMemo, useState } from 'react';
import { Box, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '@redux-state/common/selectors';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getProducts } from '@redux-state/common/action';


const SearchBar = ({ setHasScrolled, hasScrolled, setStopScroll }) => {
  const language = GetLanguage();
  const dispatch = useDispatch();

  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchText, setSearchText] = useState('');
  const isRTL = language === 'ar'; // Checks if the language is Arabic

  const filter = isRTL ? { arabicName: searchText } : { website_name: searchText };

  const pagination = useMemo(
    () => ({
      page: 0,
      perPage: rowsPerPage,
    }),
    [rowsPerPage]
  );


  // Dynamic placeholder translation
  const placeholderText = isRTL
    ? 'ابحث عن منتجاتك من هنا' // Arabic translation for "Search your products from here"
    : 'Search your products from here';

  const searchProducts = () => {
    dispatch(getProducts(pagination, filter));
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },   // Stack on mobile, row on desktop
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'center',
        width: { xs: '98vw', sm: '80vw', md: '60%' }, // Full width on mobile, narrower on desktop
        maxWidth: 500,
        mx: 'auto',
        m: { xs: 5, sm: 0 },
        mt: { xs: 15, sm: 2 },
        p: { xs: 0.5, sm: 1 },
        gap: { xs: 1, sm: 1.5 },
        position: 'relative',
        zIndex: 1200
      }}
    >
      <OutlinedInput
        sx={{
          borderRadius: '5px',
          fontSize: 13,
          borderColor: colorPalette.theme,
          background: colorPalette.lightShadow,
          direction: isRTL ? 'rtl' : 'ltr',
          width: '100%',
          minWidth: 0,
          '& fieldset': {
            borderColor: colorPalette.theme,
          },
          py: { xs: 1, sm: 0 },
          fontWeight: 400,
        }}
        fullWidth
        onKeyDown={(e) => {
          if (e.key === 'Enter') searchProducts();
        }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholderText}
        startAdornment={
          <SearchIcon
            style={{
              color: colorPalette.grey,
              paddingLeft: isRTL ? 0 : 16,
              paddingRight: isRTL ? 16 : 0,
            }}
          />
        }
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: colorPalette.lightShadow,
          width: { xs: '100%', sm: 55 },
          height: { xs: 38, sm: 50 },
          cursor: 'pointer',
          borderRadius: 1,
          borderColor: colorPalette.theme,
          borderWidth: 1,
          borderStyle: 'solid',
          mt: { xs: 1, sm: 0 },
          mx: { xs: 0, sm: 0.5 },
        }}
        onClick={() => {
          if (searchText) {
            setSearchText('');
            dispatch(getProducts(pagination, {}));
          }
          setHasScrolled(false);
          setStopScroll(true);
        }}
      >
        <CloseIcon
          style={{
            color: colorPalette.theme,
            width: 20,
            height: 20,
          }}
        />
      </Box>
    </Box>

  );
};

export default SearchBar;
