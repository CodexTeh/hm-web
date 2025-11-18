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
    maxHeight: "656px",
    objectFit: "contain",
    display: "block",
  };

  const slides = useMemo(
    () =>
      bannerUrls.map((src, idx) => {
        const proxyUrl = getProxyUrl(src);

        // First slide: eager load for LCP
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
            />
          );
        }

        // Rest: lazy load with proxy
        return (
          <LazyLoadImage
            key={idx}
            alt={`banner-${idx + 1}`}
            src={proxyUrl}
            style={bannerImageStyle}
            effect="opacity"
            wrapperProps={{
              // If you need to, you can tweak the effect transition using the wrapper style.
              style: { width: "100%", height: "100%" },
            }}
          />
        );
      }),
    [bannerUrls]
  );

  if (bannerUrls.length === 0) return null;

  return (
    <Box
      sx={{
        width: "100%",
        maxHeight: "656px",
        overflow: "hidden",
      }}
    >
      <EmblaSlider
        slides={slides}
        slidesToShow={1}
        slidesToScroll={1}
        autoPlay={true}
        autoPlayInterval={5000}
        loop={true}
        isRTL={isRTL}
        showArrows={true}
        height="auto"
        maxHeight={656}
        width="100%"
        objectFit="contain"
      />
    </Box>
  );
};

export default Banner;
