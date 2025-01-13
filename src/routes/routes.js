import React from 'react';
import Categories from '@pages/categories';
import Layout from '@pages/layout';
import Products from '@pages/products';
import ErrorElement from '@pages/error';
import Checkout from '../pages/checkout';
import OrderList from '../pages/orders';


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
            element: <Layout />,
            key: 'layout',
            errorElement: <ErrorElement />
          },
          {
            index: true,
            path: '/',
            key: 'products',
            element: <><Layout /><Products /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'checkout',
            key: 'checkout',
            element: <><Layout /><Checkout /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'orders',
            key: 'orders',
            element: <><Layout /><OrderList /></>,
            errorElement: <ErrorElement />
          },
          {
            path: 'categories',
            key: 'categories',
            element: <Categories />,
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
