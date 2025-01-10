import React from 'react';
import { Box, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '@redux-state/common/selectors';

const SearchBar = () => {
  const language = GetLanguage(); // Gets the current language
  const isRTL = language === 'ar'; // Checks if the language is Arabic

  // Dynamic placeholder translation
  const placeholderText = isRTL
    ? 'ابحث عن منتجاتك من هنا' // Arabic translation for "Search your products from here"
    : 'Search your products from here';

  // Dynamic search text
  const searchText = isRTL ? 'بحث' : 'Search'; // Arabic for "Search"

  return (
    <OutlinedInput
      sx={{
        borderRadius: '5px',
        fontSize: 14,
        borderColor: 'transparent', // Makes border outline transparent
        backgroundColor: 'white', // Sets the background color to white
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Adds shadow on all sides
        padding: 0,
        paddingRight: isRTL ? 2 : 0,
        direction: isRTL ? 'rtl' : 'ltr', // Sets the input direction
        '& fieldset': {
          borderColor: 'transparent', // Ensures the fieldset border is transparent
        },
        '&:hover': {
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Slightly stronger shadow on hover
        },
      }}
      fullWidth
      placeholder={placeholderText} // Uses the dynamic placeholder
      endAdornment={
        <Box
          sx={{
            background: colorPalette.theme,
            display: 'flex',
            flexDirection: isRTL ? 'row-reverse' : 'row', // Adjusts flex direction for RTL
            justifyContent: 'center',
            height: 40,
            alignItems: 'center',
            padding: 1,
            width: '20%',
            color: colorPalette.white,
            borderTopRightRadius: !isRTL ? 5 : 0,
            borderBottomRightRadius: !isRTL ? 5 : 0,
            borderTopLeftRadius: isRTL ? 5 : 0,
            borderBottomLeftRadius: isRTL ? 5 : 0,
          }}
          position="end"
        >
          <SearchIcon
            style={{
              color: colorPalette.white,
              marginLeft: isRTL ? '10px' : '0',
              marginRight: isRTL ? '0' : '10px',
            }}
          />
          {searchText}
        </Box>
      }
    />
  );
};

export default SearchBar;
