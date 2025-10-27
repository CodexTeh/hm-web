import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { colorPalette } from '@utils/colorPalette';

export default function CategoryView({ isRTL, setFilter, category, subCategories, index, language, setDrawerOpen }) {
  const [expanded, setExpanded] = useState(false);
  const [child, setChild] = useState();

  const catFilter = isRTL ? { arabicCategory: category?.id } : { webCategory: category?.id };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };


  const highlightColor = expanded === 'panel1' ? colorPalette.theme : colorPalette.darkText;
  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      sx={{
        boxShadow: 'none',
        border: 'none',
        margin: 0,
        px: { xs: 1, sm: 4 },
        pt: index === 0 ? { xs: 1, sm: 3 } : 0,
        '&:before': { display: 'none' },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon style={{
          width: 18,
          height: 18,
          color: highlightColor
        }} />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{
          padding: '0', // Remove inner padding
          margin: '0', // Remove margin
        }}
      >
        <Box sx={{ cursor: 'pointer' }} onClick={() => setFilter(catFilter)}>
          <Typography color={highlightColor}
            variant='subtitle2'
            fontSize={{ xs: 12, sm: 13 }}
            fontWeight={510}
            width={{ xs: 120, sm: 150 }}>
            {isRTL ? category.ar_category : category.category}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0', margin: '0' }}>
        {subCategories?.map((subCat, index) => {
          const subCatFilter = isRTL ? { arabicSubCategory: subCat.id } : { subCategory: subCat.id };
          return (
            <Box sx={{ cursor: 'pointer' }} onClick={() => {
              setChild(subCat.id)
              setFilter(subCatFilter)
              setDrawerOpen(false)
            }} key={index}>
              <Typography fontSize={{ xs: 12, sm: 13 }} sx={{ color: child === subCat.id ? colorPalette.theme : colorPalette.darkText }} textAlign={language === 'ar' ? 'right' : 'left'} variant='subtitle2' fontWeight={510} width={{ xs: 120, sm: 150 }} key={index} marginTop={2}>
                {isRTL ? subCat.ar_subcategory : subCat.subcategory}
              </Typography>
            </Box>
          )
        })
        }
      </AccordionDetails>
    </Accordion>
  );
}
