import { useEffect, useMemo, useState } from "react";
import { getHeaders } from "../components/TableView/getHeaders";
import { LinearProgress, Typography } from "@mui/material";
import { getProducts } from "../../redux-state/actions";
import TableView from "../components/TableView";
import { StyledMainBox } from "./styles";
import { GetActions } from "../components/CustomMenu/actions";
import { CustomMenu } from "../components/CustomMenu";
import { useDispatch } from "react-redux";
import { GetAllProductsCount, GetProducts, GetProductsLoading } from "../../redux-state/common/selectors";

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
      getProducts(pagination)
    );
  }, [dispatch, pagination]);

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
