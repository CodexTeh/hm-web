import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colorPalette } from '@utils/colorPalette';

export default function CategoryView({ category, index, language }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const highlightColor = expanded === 'panel1' ? colorPalette.greenButton : colorPalette.darkText;
  return (
    <Accordion
      expanded={expanded === 'panel1'}
      onChange={handleChange('panel1')}
      sx={{
        boxShadow: 'none', // Remove default shadow
        border: 'none', // Remove border
        margin: 0,
        paddingLeft: 7,
        paddingRight: 7,
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
        <Typography color={highlightColor} variant='subtitle2' fontWeight={520} width={130}>
          {category.category.label}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '0', margin: '0' }}>
        {category.subcategories.map((subCat, index) =>
          <Typography sx={{ color: colorPalette.darkText }} textAlign={language === 'ar' ? 'right' : 'left'} variant='subtitle2' fontWeight={520} width={130} key={index} marginTop={2}>
            {subCat.label}
          </Typography>
        )
        }
      </AccordionDetails>
    </Accordion>
  );
}
