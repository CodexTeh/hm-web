import React, { useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { EmblaSlider } from "components/ui/EmblaSlider";
import { GetLanguage, GetBanners } from "redux-state/common/selectors";

// Helper to build img.hmawani.com proxy URL
const getProxyUrl = (url, height = 656) => {
  if (!url || typeof url !== "string") return url;
  // If already a proxy URL, return as is
  if (url.includes("img.hmawani.com/resize")) return url;
  // Otherwise, proxy through img.hmawani.com
  return `https://img.hmawani.com/resize?url=${encodeURIComponent(url)}&h=${height}`;
};

// Banner height constant to prevent layout shifts
const BANNER_HEIGHT = 656;

const Banner = () => {
  const language = GetLanguage();
  const banners = GetBanners();
  const isRTL = language === "ar";

  const bannerUrls = useMemo(() => {
    const list = (isRTL ? banners?.arBannerUrls : banners?.bannerUrls) || [];
    return list.filter(Boolean).length > 0 ? list.filter(Boolean) : [];
  }, [isRTL, banners]);

  // Preload the first banner image for LCP optimization
  useEffect(() => {
    if (bannerUrls.length === 0) return;

    const firstBannerUrl = bannerUrls[0];
    const proxyUrl = getProxyUrl(firstBannerUrl);

    // Check if preload link already exists
    const existingLink = document.querySelector(`link[rel="preload"][as="image"][href="${proxyUrl}"]`);
    if (existingLink) return;

    // Create preload link
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    preloadLink.href = proxyUrl;
    preloadLink.fetchPriority = "high";

    // Add to head (prepend for early discovery)
    document.head.insertBefore(preloadLink, document.head.firstChild);

    // Cleanup on unmount or when banner URL changes
    return () => {
      if (document.head.contains(preloadLink)) {
        document.head.removeChild(preloadLink);
      }
    };
  }, [bannerUrls]);


  const bannerImageStyle = {
    width: "100%",
    height: "auto",
    maxHeight: `${BANNER_HEIGHT}px`,
    objectFit: "contain",
    display: "block",
  };

  const slides = useMemo(
    () =>
      bannerUrls.map((src, idx) => {
        const proxyUrl = getProxyUrl(src);

        // First slide: eager load for LCP with explicit dimensions
        if (idx === 0) {
          return (
            <img
              key={idx}
              src={proxyUrl}
              alt={`banner-${idx + 1}`}
              style={bannerImageStyle}
              loading="eager"
              fetchpriority="high"
              decoding="async"
              width="1200"
              height={"auto"}
            />
          );
        }

        // Rest: lazy load with proxy and explicit dimensions
        return (
          <LazyLoadImage
            key={idx}
            alt={`banner-${idx + 1}`}
            src={proxyUrl}
            style={bannerImageStyle}
            width="1200"
            height={"auto"}
            effect="opacity"
            wrapperProps={{
              style: { width: "100%", height: "auto" },
            }}
          />
        );
      }),
    [bannerUrls]
  );

  // Always render the container to reserve space and prevent layout shifts
  // Use fixed height to maintain space even when banners are loading
  return (
    <Box
      sx={{
        width: "100%",
        height: `100%`,
        minHeight: `auto`,
        maxHeight: `${BANNER_HEIGHT}px`,
        overflow: "hidden",
        aspectRatio: "21/9",
        // Reserve space to prevent layout shift
        position: "relative",
      }}
    >
      {bannerUrls.length > 0 ? (
        <EmblaSlider
          slides={slides}
          slidesToShow={1}
          slidesToScroll={1}
          autoPlay={true}
          autoPlayInterval={5000}
          loop={true}
          isRTL={isRTL}
          showArrows={true}
          height={"auto"}
          maxHeight={BANNER_HEIGHT}
          width="100%"
          objectFit="contain"
        />
      ) : (
        // Placeholder to maintain space while banners load
        <Box
          sx={{
            width: "100%",
            height: "100%",
            minHeight: `${BANNER_HEIGHT}px`,
            backgroundColor: "rgba(0, 0, 0, 0.02)",
          }}
          aria-hidden="true"
        />
      )}
    </Box>
  );
};

export default Banner;
