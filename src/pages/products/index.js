import { useEffect, useMemo, useState } from "react";
import { getHeaders } from "../components/TableView/getHeaders";
import { Input, InputAdornment, LinearProgress, Typography } from "@mui/material";
import { getProducts } from "../../redux-state/actions";
import TableView from "../components/TableView";
import { StyledMainBox } from "./styles";
import { GetActions } from "../components/CustomMenu/actions";
import { CustomMenu } from "../components/CustomMenu";
import { useDispatch } from "react-redux";
import { GetAllProductsCount, GetProducts, GetProductsLoading } from "../../redux-state/common/selectors";
import { Tune } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';

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
    dispatch(
      getProducts(pagination, searchText)
    );
  }, [dispatch, pagination]);

  const headers = useMemo(() => {
    return getHeaders('Product');
  }, []);

  useEffect(() => {
    if (searchText.length > 2) {
      dispatch(getProducts(pagination, searchText));
    } else {
      dispatch(getProducts(pagination, searchText));
    }
  }, [searchText])

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
          <Typography color="black">{item.barcode}</Typography>
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
  }, []);

  const rows = {
    component: (item) => getCells(item),
    items: products
  };

  return (
    <StyledMainBox className="App">
      {productsLoading && <LinearProgress value={10} />}
      <Input
        placeholder='Search Product'
        value={searchText}
        sx={{ background: 'white', width: '50%', padding: 1, borderRadius: 2 }}
        id="input-with-icon-adornment"
        onChange={(e) => setSearchText(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="start">
            <Tune />
          </InputAdornment>
        }
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
