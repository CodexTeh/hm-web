import React, { Suspense, lazy } from 'react';
import { Box, CircularProgress, Fade } from '@mui/material';
const Layout = lazy(() => import('pages/layout'));
import ErrorElement from 'pages/error';

// Lazy load all route components for code splitting
const Categories = lazy(() => import('pages/categories'));
const Products = lazy(() => import('pages/products'));
const Checkout = lazy(() => import('pages/checkout'));
const OrderList = lazy(() => import('pages/orders'));
const TermsAndConditions = lazy(() => import('pages/terms'));
const PrivacyPolicy = lazy(() => import('pages/privacy-policy'));
const ReturnPolicy = lazy(() => import('pages/return-policy'));
const WishList = lazy(() => import('pages/wishlist'));
const AboutUs = lazy(() => import('pages/about-us'));
const UserProfile = lazy(() => import('pages/profile'));
const ContactUs = lazy(() => import('pages/contact-us'));
const ProductView = lazy(() => import('pages/productView').then(module => ({ default: module.ProductView })));

// Modern loading fallback component with smooth animations
// Optimized for best UX - subtle, elegant, and non-intrusive
const RouteLoader = () => (
  <Fade in={true} timeout={400}>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)', // Account for header/navbar
        width: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
        py: 8,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <CircularProgress
          size={40}
          thickness={3.6}
          sx={{
            color: '#632DDD',
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
      </Box>
    </Box>
  </Fade>
);

// Wrapper component for lazy routes with Suspense
const LazyRoute = ({ component: Component, ...props }) => (
  <Suspense fallback={<RouteLoader />}>
    <Component {...props} />
  </Suspense>
);

// Wrapper component for lazy Layout with Suspense
const LazyLayout = () => (
  <Suspense fallback={null}>
    <Layout />
  </Suspense>
);

export const AppRoutes = [
  {
    // element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: '/',
        errorElement: <ErrorElement />,
        children: [
          {
            element: <LazyLayout />,
            key: 'layout',
            errorElement: <ErrorElement />
          },
          {
            index: true,
            path: '/',
            key: 'products',
            element: <><LazyLayout /><LazyRoute component={Products} /></>,
            errorElement: <ErrorElement />
          },
          {
            index: true,
            path: '/new-arrivals',
            key: 'products',
            element: <><LazyLayout /><LazyRoute component={Products} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: '/product/:barcode',
            key: 'products',
            element: <><LazyLayout /><LazyRoute component={ProductView} /></>,
            errorElement: <ErrorElement />
          },
          {
            index: true,
            path: '/home',
            key: 'products',
            element: <><LazyLayout /><LazyRoute component={Products} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'flashSale',
            key: 'flashSale',
            element: <><LazyLayout /><LazyRoute component={Products} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'offers',
            key: 'offers',
            element: <><LazyLayout /><LazyRoute component={Products} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'profile/:userId',
            key: 'profile',
            element: <><LazyLayout /><LazyRoute component={UserProfile} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'contact-us',
            key: 'contact-us',
            element: <><LazyLayout /><LazyRoute component={ContactUs} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'checkout',
            key: 'checkout',
            element: <><LazyLayout /><LazyRoute component={Checkout} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'orders',
            key: 'orders',
            element: <><LazyLayout /><LazyRoute component={OrderList} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'orders',
            key: 'orders?orderId',
            element: <><LazyLayout /><LazyRoute component={OrderList} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'categories',
            key: 'categories',
            element: <LazyRoute component={Categories} />,
            errorElement: <ErrorElement />
          },
          {
            path: 'terms',
            key: 'terms',
            element: <><LazyLayout /><LazyRoute component={TermsAndConditions} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'privacy-policy',
            key: 'privacy-policy',
            element: <><LazyLayout /><LazyRoute component={PrivacyPolicy} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'return-policy',
            key: 'return-policy',
            element: <><LazyLayout /><LazyRoute component={ReturnPolicy} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'about-us',
            key: 'about-us',
            element: <><LazyLayout /><LazyRoute component={AboutUs} /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'wishlist',
            key: 'wishlist',
            element: <><LazyLayout /><LazyRoute component={WishList} /></>,
            errorElement: <ErrorElement />
          },
        ]
      },
      {
        path: '*',
        element: <ErrorElement />,
        errorElement: <ErrorElement />,
        key: 'errors'
      }
    ]
  }
];

const _getRoutePathById = (
  routeCfg,
  acc,
  id
) => {
  const rawCurrentPath = !routeCfg.path
    ? acc
    : routeCfg.path[0] === '/' || acc[acc.length - 1] === '/'
      ? `${acc}${routeCfg?.path}`
      : `${acc}/${routeCfg?.path}`;
  const currentPath = rawCurrentPath.replace('//', '/');

  if (routeCfg?.key && routeCfg?.key === id) {
    return currentPath;
  }
  if (routeCfg?.children) {
    for (const routeChild of routeCfg.children) {
      const path = _getRoutePathById(routeChild, currentPath, id);
      if (path) {
        return path;
      }
    }
  }
  return null;
};

export const getRoutePathById = (() => {
  const memo = {};

  return (id) => {
    const cachedRoute = memo[id];
    if (cachedRoute) {
      return cachedRoute;
    }

    for (const routeCfg of AppRoutes) {
      const path = _getRoutePathById(routeCfg, '', id);
      if (path) {
        return path;
      }
    }
    throw new Error('path cannot be found');
  };
})();
