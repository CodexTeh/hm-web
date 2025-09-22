import { useEffect, useMemo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '@components/Footer';
import { getCategories } from '@redux-state/common/action';
import WhatsAppButton from '@components/WhatsAppButton';
import CardDrawer from './CardDrawer/CartDrawer';
import CartFloatButton from './CartFloatButton';
import Banner from './Banner';
import ProductCardView from './Products';
import { OffersSlider } from './OffersSlider';
import { Box } from '@mui/material';
import { ProductModal } from '@components/Modal/ProductModal';
import useRouter from '@helpers/useRouter';
import { Api } from '@redux-state/common/api';
import { GetLanguage } from '@redux-state/common/selectors';

export default function Products() {
  const router = useRouter();
  const { barcode } = router.query;

  // Language/RTL
  const language = GetLanguage(); // 'en' | 'ar'
  const isRTL = language === 'ar';

  // Local state
  const [openDrawer, setOpenDrawer] = useState(false);
  const [prodModal, setProdModal] = useState(false);
  const [specificProduct, setSpecificProduct] = useState(null);
  const dispatch = useDispatch();

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Fetch single product when barcode changes
  useEffect(() => {
    let cancelled = false;
    const fetchSingleProduct = async () => {
      if (!barcode) return;
      try {
        const product = await Api.getSpecificProduct(barcode);
        if (product && !cancelled) {
          setSpecificProduct(product);
          setProdModal(true);
        }
      } catch {
        // optional: handle error
      }
    };
    fetchSingleProduct();
    return () => {
      cancelled = true;
    };
  }, [barcode]);

  // Derived data with safe defaults
  const imageUrls = useMemo(() => {
    if (!specificProduct?.image_urls) return [];
    try {
      // image_urls is a stringified JSON array or already an array
      if (typeof specificProduct.image_urls === 'string') {
        const parsed = JSON.parse(specificProduct.image_urls.replace(/'/g, '"'));
        return Array.isArray(parsed) ? parsed : [];
      }
      return Array.isArray(specificProduct.image_urls) ? specificProduct.image_urls : [];
    } catch {
      // Fallback: if it's a comma-separated string or single URL
      const v = specificProduct.image_urls;
      if (typeof v === 'string' && v.length > 0) return [v];
      return [];
    }
  }, [specificProduct]);

  const discountValue = useMemo(() => {
    const flash = specificProduct?.flash_sale;
    const discount = specificProduct?.discount_offer;
    if (typeof flash === 'number' && flash > 0) return flash;
    if (typeof discount === 'number' && discount > 0) return discount;
    return 0;
  }, [specificProduct]);

  const hasDiscount = discountValue > 0;

  const finalPrice = useMemo(() => {
    if (!specificProduct?.price) return '';
    const price = Number(specificProduct.price);
    const discount = Number(discountValue);
    if (!isFinite(price)) return '';
    const discounted = price - (price * discount) / 100;
    // keep consistent precision
    return discounted.toFixed(3);
  }, [specificProduct?.price, discountValue]);

  // Drawer handlers
  const handleDrawerOpen = useCallback(() => setOpenDrawer(true), []);
  const handleDrawerClose = useCallback(() => setOpenDrawer(false), []);


  return (
    <Box sx={{ paddingTop: 10 }}>
      <Banner />
      <OffersSlider />
      <ProductCardView />
      <CardDrawer open={openDrawer} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <CartFloatButton open={openDrawer} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
      <WhatsAppButton />
      <Footer />

      {barcode && specificProduct?.id && (
        <ProductModal
          hasDiscount={hasDiscount}
          isRTL={isRTL}
          imageUrls={imageUrls}
          open={prodModal}
          setOpen={setProdModal}
          product={specificProduct}
          finalPrice={finalPrice}
        />
      )}
    </Box>
  );
}
