import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import { colorPalette } from '@utils/colorPalette';

export default function CategoryView({ isRTL, setFilter, category, index, language }) {
  const [expanded, setExpanded] = useState(false);
  const [child, setChild] = useState();

  const catFilter = isRTL ? { arabicCategory: category?._id } : { Category: category?._d };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    if (category) {
      setFilter(catFilter);
    }
  }, [category])


  const highlightColor = expanded === 'panel1' ? colorPalette.theme : colorPalette.darkText;
  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      sx={{
        boxShadow: 'none', // Remove default shadow
        border: 'none', // Remove border
        margin: 0,
        paddingLeft: 3,
        paddingRight: 4,
        paddingTop: index === 0 ? 10 : 0,
        '&:before': {
          display: 'none', // Remove the default divider line (black line)
        },
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
          <Typography color={highlightColor} variant='subtitle1' fontWeight={510} width={150}>
            {category.category.label}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0', margin: '0', paddingBottom: 5, paddingLeft: -100 }}>
        {category.subcategories.map((subCat, index) => {
          const subCatFilter = isRTL ? { arabicSubCategory: subCat._id } : { subCategory: subCat._id };
          return (
            <Box sx={{ cursor: 'pointer' }} onClick={() => {
              setChild(subCat._id)
              setFilter(subCatFilter)
            }} key={index}>
              <Typography sx={{ color: child === subCat._id ? colorPalette.theme : colorPalette.darkText }} textAlign={language === 'ar' ? 'right' : 'left'} variant='subtitle1' fontWeight={510} width={150} key={index} marginTop={2}>
                {subCat.label}
              </Typography>
            </Box>
          )
        })
        }
      </AccordionDetails>
    </Accordion>
  );
}
