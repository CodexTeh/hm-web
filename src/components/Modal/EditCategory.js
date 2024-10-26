import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Select, MenuItem, FormControl, OutlinedInput, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CircularProgress, IconButton } from '@mui/material';
import { GetCategories } from '@redux-state/common/selectors';
import { editCategory } from '@redux-state/common/action';
import { GetEditCategoryLoading } from '@redux-state/common/selectors';
import { colorPalette } from '@utils/colorPalette';
import ModalView from '.';


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

const EditCategory = ({
  openEditModal,
  onClose, }) => {

  const allCategories = GetCategories();
  const editCatLoader = GetEditCategoryLoading();


  const arabicCategories = allCategories?.filter((item) => item.language === 'ar');
  const categories = allCategories?.filter((item) => item.language === 'en');
  const [category, setCategory] = useState();
  const [arabicCategory, setArabicCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [arabicSubCategory, setArabicSubCategory] = useState();
  const [categoryLabel, setCategoryLabel] = useState();
  const [arabicCategoryLabel, setArabicCategoryLabel] = useState();
  const [subCategoryLabel, setSubCategoryLabel] = useState();
  const [arabicSubCategoryLabel, setArabicSubCategoryLabel] = useState();
  const [catId, setCatId] = useState();
  const [arabicCatId, setArabicCatId] = useState();
  const [subCatId, setSubCatId] = useState();
  const [arabicSubCatId, setArabicSubCatId] = useState();

  const handleCategoryChange = (value, setValue, categories) => {
    setValue(categories.filter(category => category.category.value === value)
      .map((categoryObj) => categoryObj.category)[0]);
  };

  const toggleStates = (category) => {
    const foundCategory = categories.find((categoryObj) => categoryObj.category.value === category?.value);
    const foundArabicCategory = arabicCategories.find((categoryObj) => categoryObj.category.value === category?.value);
    
    setCatId(foundCategory?.id)
    setArabicCatId(foundArabicCategory?.id)
    setCategoryLabel(foundCategory?.category?.label)
    setArabicCategoryLabel(foundArabicCategory?.category?.label)
  }

  useEffect(() => {
    if (category) {
      toggleStates(category)
      setArabicCategory(arabicCategories.filter(cat => cat.category.value === category.value)
        .map((categoryObj) => categoryObj.category)[0])
    }
  }, [category])

  useEffect(() => {
    if (arabicCategory) {
      toggleStates(arabicCategory)
      setCategory(categories.filter(cat => cat.category.value === arabicCategory.value)
        .map((categoryObj) => categoryObj.category)[0])
    }
  }, [arabicCategory])

  const toggleSubCatStates = (category, subCategory) => {
    const foundCategory = categories.find((categoryObj) => categoryObj.category.value === category?.value);
    const foundArabicCategory = arabicCategories.find((categoryObj) => categoryObj.category.value === category?.value);
    const foundSubCategory = foundCategory.subcategories.find((subcat) => subcat.value === subCategory);
    const foundArabicSubCategory = foundArabicCategory.subcategories.find((subcat) => subcat.value === subCategory);

    setSubCatId(foundSubCategory?._id)
    setArabicSubCatId(foundArabicSubCategory?._id)
    setSubCategory(subCategory)
    setArabicSubCategory(subCategory)
    setSubCategoryLabel(foundSubCategory?.label)
    setArabicSubCategoryLabel(foundArabicSubCategory?.label)
  }

  useEffect(() => {
    if (subCategory) {
      toggleSubCatStates(category, subCategory)
    }
  }, [subCategory])

  useEffect(() => {
    if (arabicSubCategory) {
      toggleSubCatStates(arabicCategory, arabicSubCategory)
    }
  }, [arabicSubCategory])



  const dispatch = useDispatch();


  const InputTextField = useCallback(
    ({ label, value, setValue, disabled = false }) => {
      return (
        <Box sx={{ marginTop: 3 }}>
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
    [category, arabicCategory]
  );

  const updateCategory = () => {
    const catValue = Math.floor(Math.random() * 1000);
    const subCatValue = Math.floor(Math.random() * 1001);


    if (categoryLabel && arabicCategoryLabel && catId && arabicCatId && !subCategoryLabel && !arabicSubCategoryLabel) {
      const englishCategory = {
        category: { id: catId, value: catValue, label: categoryLabel },
      }

      const arabicCategory = {
        category: { id: arabicCatId, value: catValue, label: arabicCategoryLabel },
      }
      dispatch(editCategory(englishCategory));
      dispatch(editCategory(arabicCategory));
    }
    if (categoryLabel && arabicCategoryLabel && subCategoryLabel && arabicSubCategoryLabel && !category && !arabicCategory) {
      const englishCategory = {
        category: { id: catId, value: catValue, label: categoryLabel },
        subcategory: {
          id: subCatId,
          value: subCatValue,
          label: subCategoryLabel
        }
      }

      const arabicCategory = {
        category: { id: arabicCatId, value: catValue, label: arabicCategoryLabel },
        subcategory: {
          id: arabicSubCatId,
          value: subCatValue,
          label: arabicSubCategoryLabel
        }
      }
      dispatch(editCategory(englishCategory));
      dispatch(editCategory(arabicCategory));
    }

    if (category && arabicCategory && subCategoryLabel && arabicSubCategoryLabel) {
      const englishCategory = {
        category: { id: catId, value: catValue, label: categoryLabel },
        subcategory: {
          id: subCatId,
          value: subCatValue,
          label: subCategoryLabel
        }
      }

      const arabicCategory = {
        category: { id: arabicCatId, value: catValue, label: arabicCategoryLabel },
        subcategory: {
          id: arabicSubCatId,
          value: subCatValue,
          label: arabicSubCategoryLabel
        }
      }

      dispatch(editCategory(englishCategory));
      dispatch(editCategory(arabicCategory));

    }

    setSubCatId(null)
    setArabicSubCatId(null)
    setSubCategoryLabel(null)
    setArabicSubCategoryLabel(null)
    setCategoryLabel(null)
    setArabicCategoryLabel(null)
  }

  const InputSubCatSelectField = useCallback(
    ({ label, value, setValue, category, values }) => {
      const subcategory = values.find(sub => sub.category.value === category.value);

      return (
        <Box sx={{ width: '489px', marginTop: 3 }}>
          <StyledDescriptionTypography>{label}</StyledDescriptionTypography>
          <Select
            sx={{ height: 40 }}
            fullWidth
            value={value?.value ?? value}
            onChange={(e) => setValue(e.target.value)}
            label={label}
            input={<OutlinedInput />}
          >
            {subcategory?.subcategories?.map((subCat, subCatIndex) => (
              <MenuItem key={subCatIndex} value={subCat.value}>
                {subCat.label}
              </MenuItem>))}
          </Select>

        </Box>
      );
    },
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
    [category, arabicCategory]
  );

  const CategoriesView = () => {
    return (
      <StyledMainBox>
        <StyledHeaderTypography>
          Edit Parent Categories adn Sub-Categories
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
            {categoryLabel && <InputTextField
              label={'Parent Category:'}
              value={categoryLabel}
              setValue={setCategoryLabel}
            />}
            {category?.value && <InputSubCatSelectField
              label={'Select Subcategory:'}
              value={subCategory}
              category={category}
              setValue={setSubCategory}
              values={categories}
            />}
            {subCategoryLabel && <InputTextField
              label={'SubCategory:'}
              value={subCategoryLabel}
              setValue={setSubCategoryLabel}
            />}
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
            {arabicCategoryLabel && <div dir="rtl">
              <InputTextField
                label={'فئة:'}
                value={arabicCategoryLabel}
                setValue={setArabicCategoryLabel}
              />
            </div>}
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
            {arabicSubCategoryLabel && <div dir="rtl">
              <InputTextField
                label={'الفئة الفرعية:'}
                value={arabicSubCategoryLabel}
                setValue={setArabicSubCategoryLabel}
              />
            </div>}
          </Box>
        </Box>
        <StyledFooterBox>
          <StyledSaveButton disabled={editCatLoader} variant='contained' onClick={updateCategory}>
            {editCatLoader ?
              <CircularProgress color="inherit" size={20} />

              : "Save Changes"}
          </StyledSaveButton>
        </StyledFooterBox>
      </StyledMainBox >

    );
  };

  return (
    <ModalView
      content={CategoriesView} open={openEditModal} close={onClose}
    />
  );
};

export default EditCategory;
