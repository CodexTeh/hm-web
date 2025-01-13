import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer, {
  tableContainerClasses
} from '@mui/material/TableContainer';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination, { tablePaginationClasses } from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';
import { colorPalette } from '../../utils/colorPalette';
import { Box } from '@mui/material';


const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  [`&.${tableContainerClasses.root}`]: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    marginTop: 10,
    color: 'black'

  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 12,
    overflow: 'scroll',
    color: 'black'

  }
}));

const StyledTablePaginationContainer = styled(TablePagination)(({ theme }) => ({
  [`&.${tablePaginationClasses.root}`]: {

  },
  [`&.${tablePaginationClasses.toolbar}`]: {
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: 12,
    overflow: 'scroll',
  }
}));

const StyledTableCell = styled(TableCell)({
  [`&.${tableCellClasses.head}`]: {
    fontSize: 15,
    fontWeight: 'bold',
    verticalAlign: 'bottom',
    padding: '10px 20px 10px 0px',
    background: colorPalette.lightGrey,
    color: 'black'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    verticalAlign: 'top',
    padding: '.9375rem .25rem .9375rem',
    color: 'black'

  }
});

const TableView = ({
  headers,
  highlightedRowIndex,
  page,
  rows,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  showPaginations = true,
  totalRows,
  type
}) => {
  const highlightedRowRef = React.useRef < HTMLTableRowElement > (null);
  const isMediumScreen = false;

  React.useEffect(() => {
    if (highlightedRowIndex != null && highlightedRowRef.current) {
      highlightedRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [highlightedRowIndex]);

  const getRowsPerPage = (totalRows) => {
    if (totalRows <= 5) {
      return [];
    } else if (totalRows <= 10) {
      return [5, 10];
    } else {
      return [5, 10, 15];
    }
  };

  const handlePageChange = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  return (
    <StyledTableContainer>
      {rows?.items?.length > 0 ? <Table
        sx={{
          display: 'table',
          flexDirection: isMediumScreen ? 'column' : 'row'
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {headers?.map((header, index) => (
              <StyledTableCell align="left" key={index}>
                {header}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody
          sx={{ background: colorPalette.white, color: colorPalette.black }}
        >
          {rows?.items?.map((item, rowIndex) => (
            <TableRow
              ref={rowIndex === highlightedRowIndex ? highlightedRowRef : null}
              selected={rowIndex === highlightedRowIndex}
              key={rowIndex}
            >
              {Object.keys(rows.component(item, type))?.map(
                (key, cellIndex) => (
                  <StyledTableCell padding="none" align="left" key={cellIndex}>
                    {rows.component(item, type, rowIndex)[key]}
                  </StyledTableCell>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table> : <Box sx={{ textAlign: 'center' }}>no products found</Box>}
      {showPaginations && rows?.items?.length > 0 && (
        <StyledTablePaginationContainer
          component="div"
          count={totalRows}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={getRowsPerPage(totalRows)}
        />
      )}
    </StyledTableContainer>
  );
};

export default TableView;
