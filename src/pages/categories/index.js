import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, OutlinedInput, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircularProgress, IconButton } from '@mui/material';
import { GetCategories } from '@redux-state/common/selectors';
import { createCategory } from '@redux-state/common/action';
import { GetCreateCategoryLoading } from '@redux-state/common/selectors';
import { colorPalette } from '@utils/colorPalette';
import EditCategory from '@components/Modal/EditCategory';


const StyledMainBox = styled(Box)({
  backgroundColor: colorPalette.white,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px', // Width of the scrollbar
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: colorPalette.orange, // Color of the scrollbar thumb
    borderRadius: '10px', // Rounded corners for the scrollbar thumb
    border: '2px solid #ffffff', // Adds padding around the scrollbar thumb
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f1f1f1', // Color of the scrollbar track
    borderRadius: '10px',
  }
});

const StyledHeaderTypography = styled(Typography)({
  color: colorPalette.black,
  fontSize: '23px ',
  fontWeight: '600',
  textAlign: 'center',
  marginTop: 20
});


const StyledDescriptionTypography = styled(Typography)({
  color: colorPalette.black,
  fontSize: '12px ',
  fontWeight: '700',
  paddingBottom: '3px',
  width: '50%',
  marginTop: 5,
});

const StyledFooterBox = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  margin: 15,
  marginTop: 100
});

export const StyledGenerateButtonContainer = styled(Box)({
  alignSelf: 'center',
  display: 'grid',
  margin: 'auto'
});

export const StyledIconButten = styled(IconButton)({
  backgroundColor: colorPalette.white,
  borderRadius: '.375rem',
  justifyContent: 'center',
  marginLeft: '.375rem',
  minHeight: '3.25rem',
  minWidth: '3.25rem',
  padding: '.5rem'
});

const StyledDescriptionFieldText = styled(TextField)({
  borderRadius: '8px',
  marginTop: 5,
  width: '489px'
});

export const StyledGenerateImageText = styled(Typography)({
  color: colorPalette.spanishGray,
  fontSize: '18px',
  fontWeight: 600
});

const StyledSaveButton = styled(Button)({
  fontWeight: 'bold',
});

const Categories = () => {

  const allCategories = GetCategories();
  const createCatLoader = GetCreateCategoryLoading();


  const arabicCategories = allCategories?.filter((item) => item.language === 'ar');
  const categories = allCategories?.filter((item) => item.language === 'en');
  const [openEditModal, setOpenEditModal] = useState(false);
  const [category, setCategory] = useState();
  const [arabicCategory, setArabicCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [arabicSubCategory, setArabicSubCategory] = useState();
  const [categoryLabel, setCategoryLabel] = useState();
  const [arabicCategoryLabel, setArabicCategoryLabel] = useState();
  const [subCategoryLabel, setSubCategoryLabel] = useState();
  const [arabicSubCategoryLabel, setArabicSubCategoryLabel] = useState();

  const handleCategoryChange = (value, setValue, categories) => {
    setValue(categories.filter(category => category.category.value === value)
      .map((categoryObj) => categoryObj.category)[0]);
  };

  const toggleStates = (category) => {
    const foundCategory = categories.find((categoryObj) => categoryObj.category.value === category?.value);
    const foundArabicCategory = arabicCategories.find((categoryObj) => categoryObj.category.value === category?.value);

    setCategoryLabel(foundCategory?.category?.label)
    setArabicCategoryLabel(foundArabicCategory?.category?.label)
  }

  useEffect(() => {
    if (category) {
      toggleStates(category)
      setArabicCategory(arabicCategories.filter(cat => cat.category.value === category.value)
        .map((categoryObj) => categoryObj.category)[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  useEffect(() => {
    if (arabicCategory) {
      toggleStates(arabicCategory)
      setCategory(categories.filter(cat => cat.category.value === arabicCategory.value)
        .map((categoryObj) => categoryObj.category)[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [arabicCategory])


  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setOpenEditModal(false);
  };

  const InputTextField = useCallback(
    ({ label, value, setValue, disabled = false }) => {
      return (
        <Box>
          <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
          <StyledDescriptionFieldText
            disabled={disabled}
            size='small'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></StyledDescriptionFieldText>
        </Box>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, arabicCategory]
  );

  const addCategory = () => {
    const catValue = Math.floor(Math.random() * 1000);
    const subCatValue = Math.floor(Math.random() * 1001);


    if (categoryLabel && arabicCategoryLabel && !subCategoryLabel && !arabicSubCategoryLabel && !category && !arabicCategory) {
      const englishCategory = {
        category: { value: catValue, label: categoryLabel },
        language: "en",
      }

      const arabicCategory = {
        category: { value: catValue, label: arabicCategoryLabel },
        language: "ar",
      }

      dispatch(createCategory(englishCategory));
      dispatch(createCategory(arabicCategory));
      setCategoryLabel(null)
      setArabicCategoryLabel(null)
      setCategory(null)
      setArabicCategory(null)
      setArabicSubCategoryLabel(null)
      setSubCategoryLabel(null)
      return;
    }
    if (categoryLabel && arabicCategoryLabel && subCategoryLabel && arabicSubCategoryLabel && !category && !arabicCategory) {
      const englishCategory = {
        category: { value: catValue, label: categoryLabel },
        language: "en",
        subcategory: {
          value: subCatValue,
          label: subCategoryLabel
        }
      }

      const arabicCategory = {
        category: { value: catValue, label: arabicCategoryLabel },
        language: "ar",
        subcategory: {
          value: subCatValue,
          label: arabicSubCategoryLabel
        }
      }

      dispatch(createCategory(englishCategory));
      dispatch(createCategory(arabicCategory));
      setCategoryLabel(null)
      setArabicCategoryLabel(null)
      setCategory(null)
      setArabicCategory(null)
      setArabicSubCategoryLabel(null)
      setSubCategoryLabel(null)
      return;
    }

    if (category && arabicCategory && subCategoryLabel && arabicSubCategoryLabel) {
      const englishCategory = {
        category: { value: catValue, label: categoryLabel },
        language: "en",
        subcategory: {
          value: subCatValue,
          label: subCategoryLabel
        }
      }

      const arabicCategory = {
        category: { value: catValue, label: arabicCategoryLabel },
        language: "ar",
        subcategory: {
          value: subCatValue,
          label: arabicSubCategoryLabel
        }
      }

      dispatch(createCategory(englishCategory));
      dispatch(createCategory(arabicCategory));
      setCategoryLabel(null)
      setArabicCategoryLabel(null)
      setCategory(null)
      setArabicCategory(null)
      setArabicSubCategoryLabel(null)
      setSubCategoryLabel(null)
    } else {
      alert("Fill all fields!")
    }
  }

  const InputSubCatSelectField = useCallback(
    ({ label, value, setValue, category, values }) => {
      const subcategory = values.find(sub => sub.category.label === category.label);

      return (
        <Box sx={{ width: '489px' }}>
          <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
          <Select
            sx={{ height: 40 }}
            fullWidth
            value={value?.value ?? value}
            onChange={(e) => setValue(e.target.value)}
            label={label}
            input={<OutlinedInput />}
          >
            {subcategory.subcategories.map((subCat, subCatIndex) => (
              <MenuItem key={subCatIndex} value={subCat.value}>
                {subCat.label}
              </MenuItem>))}
          </Select>

        </Box>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, arabicCategory]
  );

  const InputCatSelectField = useCallback(
    ({ label, value, setValue, handleCategoryChange, categories, enableText }) => {
      return (
        <Box sx={{ width: '489px' }}>
          <FormControl fullWidth>
            <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
            <Select
              sx={{ height: 40 }}
              labelId="category-select-label"
              value={value?.value}
              onChange={(e) => handleCategoryChange(e.target.value, setValue, categories)}
              label={label}
              fullWidth
              input={<OutlinedInput />}
            >
              <MenuItem onClick={() => {
                setCategoryLabel(null)
                setArabicCategoryLabel(null)
                setCategory(null)
                setArabicCategory(null)
              }}>
                {enableText}
              </MenuItem>
              {categories.map((category, index) => (
                <MenuItem key={index} value={category.category.value}>
                  {category.category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, arabicCategory]
  );

  return (
    <StyledMainBox>
      <StyledHeaderTypography>
        Add Parent Categories
      </StyledHeaderTypography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, paddingLeft: 0 }}>
        <Box sx={{ marginRight: 10 }}>
          <InputTextField
            label={'Parent Category:'}
            value={categoryLabel}
            setValue={setCategoryLabel}
            disabled={category && arabicCategory}
          />
        </Box>
        <Box>
          <div dir="rtl">
            <InputTextField
              label={'فئة الوالدين:'}
              value={arabicCategoryLabel}
              setValue={setArabicCategoryLabel}
              disabled={category && arabicCategory}
            />
          </div>
        </Box>
      </Box>
      <StyledHeaderTypography sx={{ marginTop: 10 }}>
        Add and View Sub-Categories
      </StyledHeaderTypography>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 6, paddingRight: 6 }}>
        <Box sx={{ marginRight: 10 }}>
          <InputCatSelectField
            label={'Select Parent Category:'}
            enableText={'Unselect'}
            value={category}
            categories={categories}
            setValue={setCategory}
            handleCategoryChange={handleCategoryChange}
          />
          {category?.value && <InputSubCatSelectField
            label={'View Subcategories:'}
            value={subCategory}
            category={category}
            setValue={setSubCategory}
            values={categories}
          />}
          <InputTextField
            label={'Add SubCategory:'}
            value={subCategoryLabel}
            setValue={setSubCategoryLabel}
          />
        </Box>
        <Box>
          <div dir="rtl">
            <InputCatSelectField
              label={'اختر الفئة:'}
              enableText={'قم بإلغاء التحديد'}
              categories={arabicCategories}
              value={arabicCategory}
              setValue={setArabicCategory}
              handleCategoryChange={handleCategoryChange}
            />
          </div>
          {arabicCategory?.value &&
            <div dir="rtl">
              <InputSubCatSelectField
                label={'الفئة الفرعية:'}
                category={arabicCategory}
                value={arabicSubCategory}
                setValue={setArabicSubCategory}
                values={arabicCategories}
              />
            </div>
          }
          <div dir="rtl">
            <InputTextField
              label={'الفئة الفرعية:'}
              value={arabicSubCategoryLabel}
              setValue={setArabicSubCategoryLabel}
            />
          </div>
        </Box>
      </Box>
      <StyledFooterBox>
        <StyledSaveButton disabled={createCatLoader} variant='contained' onClick={() => addCategory()}>
          {createCatLoader ?
            <CircularProgress color="inherit" size={20} />

            : "Save Changes"}
        </StyledSaveButton>
        <StyledSaveButton sx={{ marginTop: 5 }} disabled={createCatLoader} variant='contained' onClick={() => setOpenEditModal(true)}>
          Edit Parent Category and Sub-Categories
        </StyledSaveButton>
      </StyledFooterBox>
      {openEditModal && <EditCategory
        openEditModal={openEditModal}
        onClose={handleCloseModal}
      />}
    </StyledMainBox >

  );
};

export default Categories;
