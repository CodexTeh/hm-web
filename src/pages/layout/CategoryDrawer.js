import React from 'react';
import { GetCategories } from '@redux-state/common/selectors';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '@redux-state/common/selectors';
import CategoryView from './CategoryView';

const CategoryDrawer = ({ setFilter, height }) => {
  const categories = GetCategories();
  const enCategories = categories?.filter((item) => item.language === 'en');
  const arCategories = categories?.filter((item) => item.language === 'ar');
  const language = GetLanguage();
  const isRTL = language === 'ar'; // Check if the language is Arabic

  const drawerStyle = {
    position: 'sticky',
    top: 0,
    left: isRTL ? 'auto' : 0, // For RTL, align to the right
    right: isRTL ? 0 : 'auto', // For RTL, align to the right
    backgroundColor: colorPalette.white,
    color: colorPalette.white,
    width: 300,
    height: height,
    paddingTop: 10,
    overflowY: 'auto',
    transition: 'height 1s ease', // Smooth transition for height change
    zIndex: 15, // Ensure the drawer is above other content
    overflow: 'auto', // Prevent overflow when the drawer is closed
    direction: isRTL ? 'rtl' : 'ltr', // Set direction for text
  };

  return (
    <div style={drawerStyle} className="custom-scrollbar">
      {language === 'ar'
        ? arCategories.map((cat, index) => (
          <CategoryView isRTL={isRTL} setFilter={setFilter} language={language} category={cat} key={index} index={index} />
        ))
        : enCategories.map((cat, index) => (
          <CategoryView isRTL={isRTL} setFilter={setFilter} language={language} category={cat} key={index} index={index} />
        ))}
    </div>
  );

};

export default CategoryDrawer;
