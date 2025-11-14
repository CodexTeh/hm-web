import React, { useState, useEffect, useMemo } from "react";
import { CustomCarousel } from "components/CustomCarousal";
import { GetLanguage, GetBanners } from "redux-state/common/selectors";
import { Box, Skeleton } from "@mui/material";

/** Tiny ImageWithPlaceholder for hero banners */
const ImageWithPlaceholder = ({ src, alt, srcSet, sizes, style }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      style={style}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}

      {/* Use <picture> to serve WebP first if available, fallback to original */}
      <picture>
        {/* If your backend can serve .webp variant, construct the webp URL accordingly */}
        {src.replace ? (
          // example: if backend supports adding .webp or accepts format param e.g. ?fm=webp
          <source
            srcSet={src.replace(/\.(jpe?g|png)($|\?)/i, ".webp$2")}
            type="image/webp"
          />
        ) : null}

        {/* optional responsive srcSet */}
        {srcSet ? <source srcSet={srcSet} sizes={sizes} /> : null}

        <img
          src={src}
          alt={alt || ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "opacity 300ms ease",
            opacity: loaded ? 1 : 0,
          }}
          decoding="async"
          loading="lazy" /* for hero consider 'eager' if it's above-the-fold, but we preload below */
          srcSet={srcSet}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </picture>
    </Box>
  );
};

const Banner = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const language = GetLanguage();
  const banners = GetBanners();

  const isRTL = language === "ar";

  // ensure we return a stable array of URLs (fallback to local asset)
  const bannerUrls = useMemo(() => {
    const list = (isRTL ? banners?.arBannerUrls : banners?.bannerUrls) || [];
    // remove falsy, ensure strings
    return list.filter(Boolean).length > 0 ? list.filter(Boolean) : null;
  }, [isRTL, banners]);

  // Preload first banner (LCP): create an early <link rel=preload> or Image() object
  useEffect(() => {
    if (banners?.length > 0) {
      const first = bannerUrls[0];
      if (!first) return;

      // 1) Create a <link rel=preload> (preferred for LCP)
      try {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = first;
        document.head.appendChild(link);
        // remove after a while (optional)
        return () => {
          document.head.removeChild(link);
        };
      } catch (err) {
        // fallback: instantiate Image to warm the cache
        const img = new Image();
        img.src = first;
      }
    }
  }, [bannerUrls, banners?.length]);

  const handleImageChange = (index) => setCurrentBannerIndex(index);

  // helper to generate srcSet if your backend supports width param e.g. ?w=
  const makeSrcSet = (url) => {
    // naive example: if url supports query param width
    if (!url) return null;
    try {
      const u300 = `${url}${url.includes("?") ? "&" : "?"}w=600`;
      const u768 = `${url}${url.includes("?") ? "&" : "?"}w=900`;
      const u1200 = `${url}${url.includes("?") ? "&" : "?"}w=1400`;
      return `${u300} 600w, ${u768} 900w, ${u1200} 1400w`;
    } catch {
      return null;
    }
  };

  return bannerUrls?.length > 0 ? (
    <CustomCarousel
      selectedIndex={currentBannerIndex}
      handleImageChange={handleImageChange}
      images={bannerUrls}
      isRTL={isRTL}
      hasChildImages={false}
      showThumbs={false}
      borderRadius={"0px"}
      showStatus={false}
      dimention={656}
      maxHeight="100%"
      width="100%"
      height="100%"
      renderItem={(src, idx) => {
        const srcSet = makeSrcSet(src);
        const loading = idx === 0 ? "eager" : "lazy";
        return (
          <ImageWithPlaceholder
            key={idx}
            src={src}
            alt={`banner-${idx}`}
            srcSet={srcSet}
            sizes="100vw"
            style={{ width: "100%", height: "100%" }}
            loading={loading}
          />
        );
      }}
    />
  ) : null;
};

export default Banner;
