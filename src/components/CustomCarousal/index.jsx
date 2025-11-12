import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Skeleton, // 👈 New Import
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

/**
 * Lightweight LazyImage component
 * - uses IntersectionObserver to only set `src` when visible
 * - uses decoding="async"
 * - exposes onLoad/onError
 * - accepts optional srcSet (string) and sizes
 */
const LazyImage = React.memo(function LazyImage({
  src,
  alt,
  srcSet,    // optional e.g. "img@1x.jpg 1x, img@2x.jpg 2x"
  sizes,     // optional
  width,
  height,
  style,
  className,
  // Removed loadingPlaceholder prop: The MUI Skeleton is the intended loading UI.
  onLoad,
  onError,
}) {
  const containerRef = useRef(null); // Ref for the container (Intersection Observer target)
  const imgRef = useRef(null);      // Ref for the actual image element (for cache check)
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if ('IntersectionObserver' in window) {
      const ob = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setInView(true);
              ob.disconnect();
            }
          });
        },
        { rootMargin: '200px' } // preload a bit earlier
      );
      ob.observe(containerRef.current);
      return () => ob.disconnect();
    } else {
      // Fallback: immediately load on old browsers
      setInView(true);
    }
  }, []);

  // 🛠️ Optimization: Check if the image is already loaded from browser cache (bypassing skeleton flash)
  useEffect(() => {
    // This runs once 'inView' becomes true and the image element is rendered.
    if (inView && imgRef.current && imgRef.current.complete) {
      // If the browser reports the image is already complete (cached and loaded), 
      // instantly set 'loaded' to true to skip the opacity transition and skeleton.
      setLoaded(true);
    }
  }, [inView]);

  const handleLoad = useCallback((e) => {
    setLoaded(true);
    if (onLoad) onLoad(e);
  }, [onLoad]);

  const handleError = useCallback((e) => {
    if (onError) onError(e);
  }, [onError]);

  return (
    <div
      ref={containerRef} // Use containerRef for IntersectionObserver
      style={{
        position: 'relative',
        width,
        height,
        minWidth: width,
        minHeight: height,
        display: 'block',
        // 🛠️ Added default background to the container for robustness when not loaded
        background: loaded ? 'transparent' : '#f5f5f5', 
        overflow: 'hidden',
      }}
      className={className}
    >
      {/* MUI Skeleton as loading indicator: 
        Rendered when the image is not yet loaded.
      */}
      {!loaded && (
        <Skeleton 
          variant="rectangular" 
          animation="wave"
          sx={{ 
            width: '100%', 
            height: '100%', 
            position: 'absolute', 
            top: 0, 
            left: 0,
            zIndex: 1, // Ensure skeleton is below the carousel controls/text if any
            // Match the border radius of the final image
            borderRadius: style?.borderRadius || 0,
          }} 
        />
      )}

      {inView && (
        <img
          ref={imgRef} // Use imgRef for cache check
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={undefined} // let CSS control sizing by default
          height={undefined}
          // loading="lazy"
          decoding="async"
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            objectFit: style?.objectFit || 'contain',
            borderRadius: style?.borderRadius || 0,
            outline: 'none',
            ...style,
            transition: 'opacity 240ms ease-in-out',
            opacity: loaded ? 1 : 0,
            zIndex: 2, // Ensure the image is above the skeleton
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
});

/**
 * CustomCarousel (optimized)
 * - memoized thumbnails
 * - uses LazyImage for heavy image loading
 * - memoized arrow renderers
 */
export const CustomCarousel = React.memo(function CustomCarousel({
  selectedIndex,
  handleImageChange,
  images = [],
  isRTL,
  showThumbs = true,
  width = '100%',
  height = 350,
  maxHeight = 350,
  showStatus = true,
  borderRadius = '8px'
}) {

  const renderArrowPrev = useCallback((onClickHandler, hasPrev, label) =>
    hasPrev && (
      <Box
        onClick={onClickHandler}
        aria-label={label}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 30,
          transform: 'translateY(-50%)',
          zIndex: 2,
          width: 25,
          height: 25,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ArrowBackIosIcon fontSize="inherit" sx={{ marginLeft: 0.5}} />
      </Box>
    ), []);

  const renderArrowNext = useCallback((onClickHandler, hasNext, label) =>
    hasNext && (
      <Box
        onClick={onClickHandler}
        aria-label={label}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 30,
          transform: 'translateY(-50%)',
          zIndex: 2,
          width: 25,
          height: 25,
          backgroundColor: 'white',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <ArrowForwardIosIcon fontSize="inherit" />
      </Box>
    ), []);

  // Provide explicit slide styles (avoid recreating objects)
  const slideStyle = useMemo(() => ({
    width,
    height,
    maxHeight,
    objectFit: 'contain',
    borderRadius,
    outline: 'none',
  }), [width, height, maxHeight, borderRadius]);

  return (
    <Carousel
      showArrows={true}
      showThumbs={showThumbs}
      showStatus={showStatus}
      infiniteLoop
      autoPlay
      selectedItem={selectedIndex}
      onChange={handleImageChange}
      renderArrowPrev={renderArrowPrev}
      renderArrowNext={renderArrowNext}
      style={{
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      {images?.map((image, index) => (
        <div key={index}>
          <LazyImage
            src={image}
            alt={`Gallery-${index}`}
            style={{
              width: width,
              height: slideStyle.height,
              maxHeight: slideStyle.maxHeight,
              objectFit: slideStyle.objectFit,
              borderRadius: slideStyle.borderRadius,
              outline: 'none'
            }}
          />
        </div>
      ))}
    </Carousel>
  );
});
