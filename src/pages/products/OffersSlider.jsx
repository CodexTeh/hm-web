import React, { useMemo, useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { EmblaSlider } from "components/ui/EmblaSlider";
import expressDeliveryImage from "assets/icons/express.png";
import couponImage from "assets/icons/coupon.png";
import flashsaleImage from "assets/icons/flashsale.png";
import freeDeliveryImage from "assets/icons/free-delivery.png";
import { GetLanguage } from "redux-state/selectors";
import { resizeImage } from "helpers/resizeImage";

// Global cache for resized images to prevent duplicate processing
const resizedImageCache = new Map();

// Component for individual offer image with lazy resizing
const OfferImage = ({ offer, idx, onOfferClick, rtl, offerImageStyle, slidesToShow }) => {
  const [resizedUrl, setResizedUrl] = useState(null);
  const [shouldResize, setShouldResize] = useState(idx < slidesToShow);
  const blobUrlRef = useRef(null);
  const imageRef = useRef(null);

  // Only resize visible images immediately, defer offscreen images
  useEffect(() => {
    if (!shouldResize || !offer.src) return;

    let isMounted = true;

    const resizeImageAsync = async () => {
      try {
        // Check cache first to avoid duplicate processing
        const cacheKey = `${offer.src}-622x288-webp`;
        if (resizedImageCache.has(cacheKey)) {
          const cached = resizedImageCache.get(cacheKey);
          if (isMounted) {
            setResizedUrl(cached);
          }
          return;
        }

        // Resize to actual display size (622x288) and convert to WebP for better compression
        const resized = await resizeImage(offer.src, 622, 288, 0.85, 'webp');
        if (isMounted) {
          if (resized && typeof resized === "string") {
            if (resized.startsWith("blob:")) {
              blobUrlRef.current = resized;
              // Cache the resized image
              resizedImageCache.set(cacheKey, resized);
            }
            setResizedUrl(resized);
          } else {
            // If resize returns invalid value, use original
            setResizedUrl(offer.src);
          }
        }
      } catch (error) {
        console.error(`Error resizing image ${idx}:`, error);
        if (isMounted) {
          setResizedUrl(offer.src);
        }
      }
    };

    resizeImageAsync();

    return () => {
      isMounted = false;
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [shouldResize, offer.src, idx]);

  // Use Intersection Observer to trigger resizing when image is about to be visible
  useEffect(() => {
    if (shouldResize || idx < slidesToShow) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldResize(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "50px" } // Start loading 50px before it's visible
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldResize, idx, slidesToShow]);

  // Use resized URL if available, otherwise fallback to original image
  // Always show the original image as fallback to ensure images are visible
  const imageSrc = resizedUrl || offer.src;

  // Don't render if no image source is available
  if (!imageSrc || !offer.src) {
    return null;
  }

  return (
    <a
      ref={imageRef}
      style={{ cursor: "pointer" }}
      onClick={() => onOfferClick(offer.route, idx)}
    >
      {imageSrc && (
        <LazyLoadImage
          width="100%"
          height="auto"
          alt={`Offer ${idx + 1}`}
          src={imageSrc}
          style={offerImageStyle}
          effect="opacity"
          threshold={100}
          visibleByDefault={idx < slidesToShow}
          onError={(e) => {
            // Fallback to original if resized image fails to load
            if (resizedUrl && e.target.src !== offer.src) {
              e.target.src = offer.src;
            }
          }}
        />
      )}
    </a>
  );
};

export const OffersSlider = () => {
  const navigate = useNavigate();
  const language = GetLanguage?.() || "en";
  const rtl = language === "ar";

  // Original image sources
  const originalOffersData = useMemo(
    () => [
      { src: flashsaleImage, route: "/flashSale" },
      { src: couponImage, route: "/offers" },
      { src: freeDeliveryImage },
      { src: expressDeliveryImage },
    ],
    []
  );

  const offerImageStyle = {
    width: "100%",
    maxHeight: "292px",
    borderRadius: "6px",
    objectFit: "contain",
    display: "block",
  };

  // Function to handle image click
  const handleOfferClick = (route, idx) => {
    if (route) {
      navigate(route);
    } else {
      const message = rtl
        ? "مرحبًا، لدي بعض الأسئلة حول منتجاتك وسأكون ممتنًا لمساعدتك."
        : "Hello, I have a few questions about your products and would appreciate your assistance.";
      const phoneE164 = (process.env.VITE_WHATSAPP_NUMBER || "").trim();
      const phoneForWaMe = phoneE164.replace(/^\+/, "");
      const url = `https://wa.me/${phoneForWaMe}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Convert offersData to slides with lazy-loaded resizing
  const slidesToShow = 4; // Default slides to show (for 4K screens)
  const slides = useMemo(
    () =>
      originalOffersData.map((offer, idx) => (
        <OfferImage
          key={idx}
          offer={offer}
          idx={idx}
          onOfferClick={handleOfferClick}
          rtl={rtl}
          offerImageStyle={offerImageStyle}
          slidesToShow={slidesToShow}
        />
      )),
    [originalOffersData, rtl, slidesToShow]
  );

  return (
    <Box
      sx={{
        alignSelf: "center",
        margin: "0 auto",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        paddingBlock: "1rem",
        paddingInline: "1rem",
        overflow: "hidden",
      }}
    >
      <EmblaSlider
        slides={slides}
        slidesToShow={4}
        slidesToScroll={1}
        autoPlay={true}
        autoPlayInterval={5000}
        loop={true}
        isRTL={rtl}
        showArrows={true}
        height="auto"
        maxHeight={292}
        width="100%"
        objectFit="contain"
        breakpoints={[
          { breakpoint: 2000, slidesToShow: 3, slidesToScroll: 1 },
          { breakpoint: 1600, slidesToShow: 2, slidesToScroll: 1 },
          { breakpoint: 1024, slidesToShow: 1, slidesToScroll: 1 },
        ]}
      />
    </Box>
  );
};
