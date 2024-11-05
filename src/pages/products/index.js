import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Barcode from 'react-barcode';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { getHeaders } from "@components/TableView/getHeaders";
import { Input, InputAdornment, LinearProgress, Typography } from "@mui/material";
import TableView from "@components/TableView";
import { StyledMainBox } from "./styles";
import { GetActions } from "@components/CustomMenu/actions";
import { CustomMenu } from "@components/CustomMenu";
import { getProducts, getSearchedProducts, getCategories, getProductCatalog } from "@redux-state/actions";
import { GetAllProductsCount, GetProducts, GetProductsLoading, GetCategories, GetProductCatalogs } from "@redux-state/common/selectors";

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
  const categories = GetCategories();
  const allProductCatalogs = GetProductCatalogs();

  const splitByTypeAndLanguage = (array) => {
    return array.reduce((acc, item) => {
      const { type, language } = item;

      if (!acc[language]) {
        acc[language] = {};
      }

      if (!acc[language][type]) {
        acc[language][type] = [];
      }

      acc[language][type].push(item);
      return acc;
    }, {});
  };

  const splitData = splitByTypeAndLanguage(allProductCatalogs);

  const filterCategoryName = (categoryValue) => {
    const result = categories?.find(
      (categoryObj) => categoryObj._id.toString() === categoryValue
    );
    return result ? result.category.label : undefined;
  };

  useEffect(() => {
    dispatch(getProductCatalog());
  }, [])

  useEffect(() => {
    if (!searchText) {
      dispatch(
        getProducts(pagination, searchText)
      );
    }
    dispatch(getCategories())
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
      let formattedImages;
      if (item?.image_urls) {
        const imageUrls = JSON.parse(item?.image_urls.replace(/'/g, '"'));
        if (imageUrls.length > 0) {
          formattedImages = imageUrls?.map((imageUrl) => ({
            contentType: 'image/jpeg', // Assume default content type or fetch dynamically
            title: imageUrl?.split('/').pop(), // Extract the image name from URL
            url: imageUrl,
            file: null // No file object for backend images
          }));
        }
      }
      const baseCells = {
        barcode: (
          <Barcode height={20} width={1} fontSize={15} value={item.barcode} />
        ),
        name: (
          <Typography color="black">{item.name}</Typography>
        ),
        category: (
          <Typography color="black">{filterCategoryName(item.category)}</Typography>
        ),
        price: (
          <Typography color="black">{item.price}</Typography>
        ),
        quantity: (
          <Typography color="black">{item.qty_onhand}</Typography>
        ),
        action: (
          <CustomMenu
            actions={getActions(item)} item={item} pagination={pagination} productCatalogs={splitData}
          />
        ),
        completed: (
          (formattedImages ?
            <CheckCircleIcon color="success" />
            : <CancelIcon color="warning" />)
        )
      };

      return baseCells;
    };
  }, [getActions, pagination, categories]);

  const rows = {
    component: (item) => getCells(item),
    items: products
  };

  return (
    <StyledMainBox className="App">
      {productsLoading && <LinearProgress value={10} />}
      <Input
        placeholder='Search Product by barcode'
        value={searchText}
        sx={{ background: 'white', width: '30%', padding: 1, borderRadius: 2 }}
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
