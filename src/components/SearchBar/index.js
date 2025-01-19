import React, { useMemo, useState } from 'react';
import { Box, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '@redux-state/common/selectors';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { getProducts } from '@redux-state/common/action';


const SearchBar = () => {
  const language = GetLanguage();
  const dispatch = useDispatch();
  
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [searchText, setSearchText] = useState(20);
  const isRTL = language === 'ar'; // Checks if the language is Arabic

  const filter = {barcode: searchText }
  // const filter = isRTL ? { arabicCategory: category?._id } : { Category: category?._d };

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
    <Box sx={{ display: 'flex', flexDirection: 'row', padding: 1, alignItems: 'end', justifyContent: 'center', width: '60%' }}>
      <OutlinedInput
        sx={{
          borderRadius: '5px',
          fontSize: 17,
          borderColor: colorPalette.theme, // Makes border outline transparent
          background: colorPalette.lightShadow, // Sets the background color to white
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)', // Adds shadow on all sides
          padding: 0,
          paddingRight: isRTL ? 2 : 0,
          direction: isRTL ? 'rtl' : 'ltr', // Sets the input direction
          '& fieldset': {
            borderColor: colorPalette.theme, // Ensures the fieldset border is transparent
          },
          '&:hover': {
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)', // Slightly stronger shadow on hover
          },
        }}
        fullWidth
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            searchProducts();
          }
        }}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholderText} // Uses the dynamic placeholder
        startAdornment={
          <SearchIcon
            style={{
              color: colorPalette.grey,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          />
        }
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          height: 57,
          justifyContent: 'center',
          alignItems: 'center',
          background: colorPalette.lightShadow,
          marginLeft: 5,
          marginRight: 5,
          width: 60,
          cursor: 'pointer',
          borderRadius: 1,
          borderColor: colorPalette.theme,
          borderWidth: 1,
          borderStyle: 'solid',
        }}
      >
        <CloseIcon
          style={{
            color: colorPalette.theme,
            width: 25,
            height: 25,
          }}
        />
      </Box>
    </Box>
  );
};

export default SearchBar;
