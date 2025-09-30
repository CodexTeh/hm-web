import React, { useEffect, useMemo, useState, useCallback, Suspense } from 'react';
import { useDispatch } from 'react-redux';
import { Box, CircularProgress } from '@mui/material';
import { getCategories } from '@redux-state/common/action';
import { Api } from '@redux-state/common/api';
import useRouter from '@helpers/useRouter';
import { GetLanguage } from '@redux-state/common/selectors';
import { OffersSlider } from './OffersSlider';

// Lazy-loaded components (code-splitting)
const Footer = React.lazy(() => import('@components/Footer'));
const WhatsAppButton = React.lazy(() => import('@components/WhatsAppButton'));
const CardDrawer = React.lazy(() => import('./CardDrawer/CartDrawer'));
const CartFloatButton = React.lazy(() => import('./CartFloatButton'));
const Banner = React.lazy(() => import('./Banner'));
const ProductCardView = React.lazy(() => import('./Products'));
const ProductModal = React.lazy(() => import('@components/Modal/ProductModal').then(m => ({ default: m.ProductModal })));

export default function Products() {
  const router = useRouter();
  const { barcode } = router.query ?? {};

  const language = GetLanguage();
  const isRTL = language === 'ar';

  const dispatch = useDispatch();

  // Local state
  const [openDrawer, setOpenDrawer] = useState(false);
  const [prodModal, setProdModal] = useState(false);
  const [specificProduct, setSpecificProduct] = useState(null);

  // Fetch categories on mount (keep lightweight)
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Fetch single product with cancellation support
  useEffect(() => {
    if (!barcode) return;

    const controller = new AbortController();
    const signal = controller.signal;
    let mounted = true;

    const fetchSingleProduct = async () => {
      try {
        const product = await Api.getSpecificProduct(barcode, { signal }); // if Api supports abort; else ignore second param
        if (!mounted || !product) return;
        setSpecificProduct(product);
        setProdModal(true);
      } catch (err) {
        if (err?.name === 'AbortError') {
          // aborted - ignore
        } else {
          // Optional: set error state or console
          console.warn('Product fetch error', err);
        }
      }
    };

    // small debounce to avoid rapid repeated calls if barcode updates fast
    const tid = window.setTimeout(fetchSingleProduct, 120);

    return () => {
      mounted = false;
      controller.abort();
      window.clearTimeout(tid);
    };
  }, [barcode]);

  // Derived data (kept memoized)
  const imageUrls = useMemo(() => {
    if (!specificProduct?.image_urls) return [];
    try {
      if (typeof specificProduct.image_urls === 'string') {
        const parsed = JSON.parse(specificProduct.image_urls.replace(/'/g, '"'));
        return Array.isArray(parsed) ? parsed : [];
      }
      return Array.isArray(specificProduct.image_urls) ? specificProduct.image_urls : [];
    } catch {
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
    return discounted.toFixed(3);
  }, [specificProduct?.price, discountValue]);

  // Drawer handlers (memoized)
  const handleDrawerOpen = useCallback(() => setOpenDrawer(true), []);
  const handleDrawerClose = useCallback(() => setOpenDrawer(false), []);

  // Lightweight suspense fallback to show while lazy components load
  const SuspenseFallback = (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', py: 4 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ paddingTop: 10 }}>
      <Suspense fallback={SuspenseFallback}>
        <Banner />
      </Suspense>

      {/* <Suspense fallback={<Box sx={{ height: 150 }} />}> */}
        <OffersSlider />
      {/* </Suspense> */}

      <Suspense fallback={<Box sx={{ height: 400 }} />}>
        <ProductCardView />
      </Suspense>

      {/* These UI components are interactive; lazy-load them but keep them mounted */}
      <Suspense fallback={null}>
        <CardDrawer open={openDrawer} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <CartFloatButton open={openDrawer} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <WhatsAppButton />
      </Suspense>

      {/* Footer is lazy-loaded to avoid blocking first paint */}
      <Suspense fallback={<Box sx={{ height: 120 }} />}>
        <Footer />
      </Suspense>

      {/* Product modal (lazy) */}
      {barcode && specificProduct?.id && (
        <Suspense fallback={null}>
          <ProductModal
            hasDiscount={hasDiscount}
            isRTL={isRTL}
            imageUrls={imageUrls}
            open={prodModal}
            setOpen={setProdModal}
            product={specificProduct}
            finalPrice={finalPrice}
          />
        </Suspense>
      )}
    </Box>
  );
}
