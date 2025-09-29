import React, { useMemo, useState } from 'react';
import { Box, OutlinedInput, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '@redux-state/common/selectors';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getProducts } from '@redux-state/common/action';

const SearchBar = ({ setHasScrolled, hasScrolled, setStopScroll }) => {
  const language = GetLanguage();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const isRTL = language === 'ar'; // Checks if the language is Arabic

  const filter = isRTL ? { arabicName: searchText } : { website_name: searchText };

  const pagination = useMemo(
    () => ({
      page: 0,
      perPage: 20,
    }),
    []
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
        flexDirection: 'row',
        alignItems: { xs: 'stretch', sm: 'center' },
        justifyContent: 'center',
        width: { xs: '80%', sm: '80vw', md: '60%' },
        maxWidth: 500,
        mx: 'auto',
        gap: { xs: 1, sm: 1.5 },
        position: 'relative',
        zIndex: 1200
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          searchProducts();
        }}
        style={{ width: '100%' }}
      >
        <OutlinedInput
          sx={{
            borderRadius: '5px',
            fontSize: 13,
            height: { xs: 50 },
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
        <Button
          type="submit"
          sx={{
            display: 'none', // Hide the submit button (optional)
          }}
        />
      </form>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: colorPalette.lightShadow,
          width: { xs: 38 },
          height: { xs: 38},
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
