import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Barcode from 'react-barcode';
import SearchIcon from '@mui/icons-material/Search';
import { getHeaders } from "@components/TableView/getHeaders";
import { Input, InputAdornment, LinearProgress, Typography } from "@mui/material";
import TableView from "@components/TableView";
import { StyledMainBox } from "./styles";
import { GetActions } from "@components/CustomMenu/actions";
import { CustomMenu } from "@components/CustomMenu";
import { getProducts, getSearchedProducts } from "@redux-state/actions";
import { GetAllProductsCount, GetProducts, GetProductsLoading } from "../../redux-state/common/selectors";

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

  const pagination = useMemo(
    () => ({
      page: page,
      perPage: rowsPerPage
    }),
    [page, rowsPerPage]
  );
  const dispatch = useDispatch();

  const productsLoading = GetProductsLoading();
  const products = GetProducts();
  const productsCount = GetAllProductsCount();

  useEffect(() => {
    if(!searchText){
      dispatch(
        getProducts(pagination, searchText)
      );
    }
  }, [dispatch, pagination, searchText]);

  const headers = useMemo(() => {
    return getHeaders('Product');
  }, []);

  const getActions = useMemo(() => {
    return (item) => {
      return GetActions({
        item,
        pagination
      });
    };
  }, [pagination]);

  const getCells = useMemo(() => {
    return (item) => {
      const baseCells = {
        id: (
          <Typography color="black">{item.id}</Typography>
        ),
        name: (
          <Typography color="black">{item.name}</Typography>
        ),
        category: (
          <Typography color="black">{item.category}</Typography>
        ),
        price: (
          <Typography color="black">{item.price}</Typography>
        ),
        barcode: (
          <Barcode height={20} width={1} fontSize={15} value={item.barcode} />
        ),
        tax: (
          <Typography color="black">{item.tax}</Typography>
        ),
        action: (
          <CustomMenu
            actions={getActions(item)} item={item} pagination={pagination}
          />
        )
      };

      return baseCells;
    };
  }, [getActions, pagination]);

  const rows = {
    component: (item) => getCells(item),
    items: products
  };

  return (
    <StyledMainBox className="App">
      {productsLoading && <LinearProgress value={10} />}
      <Input
        placeholder='Search Product by ID'
        value={searchText}
        sx={{ background: 'white', width: '20%', padding: 1, borderRadius: 2 }}
        id="input-with-icon-adornment"
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (searchText) {
              dispatch(getSearchedProducts(searchText));
            }
          }
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        // endAdornment={
        //   <InputAdornment position="start">
        //     <Tune />
        //   </InputAdornment>
        // }
      />
      <TableView
        headers={headers}
        page={page}
        rows={rows}
        rowsPerPage={rowsPerPage}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        totalRows={productsCount}
        type={'products'}
      />
    </StyledMainBox>
  );
}

export default Products;
