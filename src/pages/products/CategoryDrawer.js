import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { useMediaQuery, useTheme, Box } from '@mui/material';
import { GetCategories, GetSubCategories } from '@redux-state/common/selectors';
import { colorPalette } from '@utils/colorPalette';
import { GetLanguage } from '@redux-state/common/selectors';
import CategoryView from './CategoryView';
import MenuIcon from '@mui/icons-material/Menu';
const CategoryDrawer = ({ setFilter, height }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = GetCategories();
  const subCategories = GetSubCategories();
  const language = GetLanguage();
  const isRTL = language === 'ar';

  // Sticky sidebar style for desktop/tablet
  const sidebarStyle = {
    position: 'sticky',
    top: 0,
    backgroundColor: colorPalette.white,
    width: 230,
    height: height,
    overflowY: 'auto',
    zIndex: 15,
    direction: isRTL ? 'rtl' : 'ltr',
    p: { xs: 0, md: 2 },
    boxShadow: { xs: 'none', md: '0px 2px 8px rgba(0,0,0,0.08)' },
    borderRadius: { xs: 0, md: 2 },
  };

  return (
    <>
      {/* ---- MOBILE: Button + Drawer ---- */}
      {isMobile && (
        <>
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              startIcon={<MenuIcon sx={{ fontSize: 22 }} />}
              variant="contained"
              onClick={() => setDrawerOpen(true)}
              sx={{
                background: colorPalette.theme,
                color: "#fff",
                borderRadius: 2,
                boxShadow: 2,
                fontWeight: 600,
                fontSize: 16,
                textTransform: "none",
                m: 1.5,
                "&:hover": {
                  background: colorPalette.themeDark,
                },
              }}
            >
              {isRTL ? "التصنيفات" : "Categories"}
            </Button>
          </Box>
          <Drawer
            anchor={isRTL ? "right" : "left"}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            PaperProps={{
              sx: { width: {xs: 200, md: 260}, maxWidth: "80vw", p: 2 },
            }}
          >
            {categories?.map((cat, index) => {
              const subCats = subCategories.filter(sub => sub.categoryId === cat.id);
              return (
                <CategoryView
                  subCategories={subCats}
                  isRTL={isRTL}
                  setFilter={setFilter}
                  language={language}
                  category={cat}
                  key={cat.id}
                  index={index}
                />
              );
            })}
          </Drawer>
        </>
      )}

      {/* ---- DESKTOP: Sticky Sidebar ---- */}
      {!isMobile && (
        <Box sx={sidebarStyle} className="custom-scrollbar">
          {categories?.map((cat, index) => {
            const subCats = subCategories.filter(sub => sub.categoryId === cat.id);
            return (
              <CategoryView
                subCategories={subCats}
                isRTL={isRTL}
                setFilter={setFilter}
                language={language}
                category={cat}
                key={cat.id}
                index={index}
              />
            );
          })}
        </Box>
      )}
    </>
  );
};

export default CategoryDrawer;
