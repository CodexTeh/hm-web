import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

/**
 * EmblaSlider - Simple and clean carousel component
 * 
 * Features:
 * - Uses react-lazy-load-image-component for optimized image loading
 * - Built on embla-carousel-react for smooth performance
 * - RTL support
 * - Auto-play support
 * - Thumbnail support
 * - Responsive breakpoints
 * 
 * Compatible with CustomCarousel API for easy migration
 * 
 * @param {Object} props
 * @param {Array} props.images - Array of image URLs (for backward compatibility with CustomCarousel)
 * @param {Array} props.slides - Array of slide content (can be images or custom components)
 * @param {Function} props.renderItem - Optional function to render custom slide content (for backward compatibility)
 * @param {Function} props.renderSlide - Optional function to render custom slide content
 * @param {boolean} props.showArrows - Show navigation arrows (default: true)
 * @param {boolean} props.showDots - Show dot indicators (default: false)
 * @param {boolean} props.showThumbs - Show thumbnail navigation (default: false)
 * @param {boolean} props.showStatus - Show status text (default: false, not implemented but kept for compatibility)
 * @param {boolean} props.autoPlay - Enable auto-play (default: true for backward compatibility)
 * @param {number} props.autoPlayInterval - Auto-play interval in ms (default: 3000)
 * @param {boolean} props.loop - Enable infinite loop (default: true)
 * @param {boolean} props.isRTL - Right-to-left layout (default: false)
 * @param {number} props.selectedIndex - Controlled selected slide index
 * @param {Function} props.handleImageChange - Callback when slide changes (for backward compatibility)
 * @param {Function} props.onSlideChange - Callback when slide changes
 * @param {string} props.width - Container width (default: "100%")
 * @param {string|number} props.height - Container height (default: 350)
 * @param {string|number} props.maxHeight - Max container height (default: 350)
 * @param {string} props.borderRadius - Border radius (default: "8px")
 * @param {number} props.dimention - Image resize dimension for hmawani.com (default: 150)
 * @param {number} props.slidesToShow - Number of slides to show (default: 1)
 * @param {number} props.slidesToScroll - Number of slides to scroll (default: 1)
 * @param {Array} props.breakpoints - Responsive breakpoints [{ breakpoint: 768, slidesToShow: 2, slidesToScroll: 1 }]
 * @param {string} props.objectFit - Image object-fit (default: "contain")
 * @param {boolean} props.hasChildImages - For backward compatibility (ignored)
 * @param {string} props.className - Additional CSS class
 * @param {Object} props.sx - MUI sx prop for styling
 */
export const EmblaSlider = forwardRef(function EmblaSlider(
  {
    images,
    slides = [],
    renderItem,
    renderSlide,
    showArrows = true,
    showDots = false,
    showThumbs = false,
    showStatus = false,
    autoPlay = true,
    autoPlayInterval = 3000,
    loop = true,
    isRTL = false,
    selectedIndex,
    handleImageChange,
    onSlideChange,
    width = "100%",
    height = 350,
    maxHeight = 350,
    borderRadius = "8px",
    dimention = 150,
    slidesToShow = 1,
    slidesToScroll = 1,
    breakpoints = [],
    objectFit = "contain",
    hasChildImages, // For backward compatibility, ignored
    className,
    sx,
  },
  ref
) {
  // Support both images (CustomCarousel API) and slides
  const slidesToRender = images || slides;
  const renderFunction = renderItem || renderSlide;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: "start",
      direction: isRTL ? "rtl" : "ltr",
      slidesToScroll,
      breakpoints: breakpoints.length > 0
        ? Object.fromEntries(
            breakpoints.map((bp) => [
              bp.breakpoint,
              {
                slidesToScroll: bp.slidesToScroll || slidesToScroll,
              },
            ])
          )
        : undefined,
    },
    []
  );

  const [selectedIndexState, setSelectedIndexState] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const autoPlayTimerRef = useRef(null);
  const [currentSlidesToShow, setCurrentSlidesToShow] = useState(slidesToShow);

  // Handle responsive slidesToShow
  useEffect(() => {
    if (breakpoints.length === 0) return;

    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      // Sort breakpoints descending
      const sorted = [...breakpoints].sort((a, b) => b.breakpoint - a.breakpoint);
      for (const bp of sorted) {
        if (width <= bp.breakpoint) {
          setCurrentSlidesToShow(bp.slidesToShow || slidesToShow);
          return;
        }
      }
      setCurrentSlidesToShow(slidesToShow);
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, [breakpoints, slidesToShow]);

  // Imperative API
  useImperativeHandle(ref, () => ({
    scrollPrev: () => emblaApi?.scrollPrev(),
    scrollNext: () => emblaApi?.scrollNext(),
    scrollTo: (index) => emblaApi?.scrollTo(index),
    selectedIndex: selectedIndexState,
  }));

  // Update selected index
  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setSelectedIndexState(index);
    if (handleImageChange) handleImageChange(index); // Backward compatibility
    if (onSlideChange) onSlideChange(index);
  }, [emblaApi, handleImageChange, onSlideChange]);

  // Update scroll buttons state
  const updateScrollButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Controlled selectedIndex
  useEffect(() => {
    if (selectedIndex !== undefined && emblaApi) {
      emblaApi.scrollTo(selectedIndex);
    }
  }, [selectedIndex, emblaApi]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || !emblaApi) return;

    const startAutoPlay = () => {
      autoPlayTimerRef.current = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else if (loop) {
          emblaApi.scrollTo(0);
        }
      }, autoPlayInterval);
    };

    const stopAutoPlay = () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };

    emblaApi.on("select", stopAutoPlay);
    emblaApi.on("pointerDown", stopAutoPlay);
    emblaApi.on("pointerUp", startAutoPlay);

    startAutoPlay();

    return () => {
      stopAutoPlay();
      emblaApi.off("select", stopAutoPlay);
      emblaApi.off("pointerDown", stopAutoPlay);
      emblaApi.off("pointerUp", startAutoPlay);
    };
  }, [autoPlay, autoPlayInterval, loop, emblaApi]);

  // Event listeners
  useEffect(() => {
    if (!emblaApi) return;

    updateSelectedIndex();
    updateScrollButtons();

    emblaApi.on("select", () => {
      updateSelectedIndex();
      updateScrollButtons();
    });

    emblaApi.on("reInit", () => {
      updateSelectedIndex();
      updateScrollButtons();
    });

    return () => {
      emblaApi.off("select");
      emblaApi.off("reInit");
    };
  }, [emblaApi, updateSelectedIndex, updateScrollButtons]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Arrow components
  const ArrowButton = useMemo(
    () =>
      ({ onClick, disabled, direction }) =>
        !disabled && (
          <Box
            onClick={onClick}
            aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
            sx={{
              position: "absolute",
              top: "50%",
              [direction === "prev" ? "left" : "right"]: 30,
              transform: "translateY(-50%)",
              zIndex: 3,
              width: 40,
              height: 40,
              backgroundColor: "white",
              borderRadius: "50%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "opacity 0.2s",
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            {direction === "prev" ? (
              <ArrowBackIosIcon
                fontSize="small"
                sx={{ marginLeft: 0.5, color: "black" }}
              />
            ) : (
              <ArrowForwardIosIcon
                fontSize="small"
                sx={{ color: "black" }}
              />
            )}
          </Box>
        ),
    []
  );

  if (slidesToRender.length === 0) return null;

  // Build image URL with resizing if needed (for hmawani.com images)
  const getImageUrl = useCallback(
    (imageUrl) => {
      if (typeof imageUrl !== "string") return imageUrl;
      if (imageUrl.includes("img.hmawani.com") && dimention) {
        return `https://img.hmawani.com/resize?url=${encodeURIComponent(
          imageUrl
        )}&h=${dimention}`;
      }
      return imageUrl;
    },
    [dimention]
  );

  return (
    <Box
      sx={{
        width,
        maxHeight,
        position: "relative",
        direction: isRTL ? "rtl" : "ltr",
        ...sx,
      }}
      className={className}
    >
      {showStatus && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 3,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "4px 8px",
            borderRadius: 1,
            fontSize: "0.75rem",
          }}
        >
          {selectedIndexState + 1} / {slidesToRender.length}
        </Box>
      )}

      <div
        ref={emblaRef}
        style={{
          overflow: "hidden",
          borderRadius,
          height: typeof height === "number" ? `${height}px` : height,
          maxHeight,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: slidesToShow > 1 ? "10px" : 0,
            height: "100%",
          }}
        >
          {slidesToRender.map((slide, index) => {
            const imageUrl =
              typeof slide === "string" ? getImageUrl(slide) : slide;
            return (
              <div
                key={index}
                style={{
                  flex: `0 0 ${100 / currentSlidesToShow}%`,
                  minWidth: 0,
                  height: "100%",
                  paddingRight:
                    currentSlidesToShow > 1 && index < slidesToRender.length - 1
                      ? "10px"
                      : 0,
                }}
              >
                {renderFunction ? (
                  renderFunction(imageUrl, index)
                ) : typeof imageUrl === "string" ? (
                  <LazyLoadImage
                    src={imageUrl}
                    alt={`Slide ${index + 1}`}
                    width={width}
                    height={height}
                    style={{
                      borderRadius,
                      width,
                      height,
                      maxHeight,
                      objectFit,
                      display: "block",
                    }}
                    effect="opacity"
                  />
                ) : (
                  imageUrl
                )}
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && (
        <>
          <ArrowButton
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            direction="prev"
          />
          <ArrowButton
            onClick={scrollNext}
            disabled={!canScrollNext}
            direction="next"
          />
        </>
      )}

      {showDots && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            marginTop: 2,
          }}
        >
          {slidesToRender.map((_, index) => (
            <Box
              key={index}
              onClick={() => scrollTo(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor:
                  index === selectedIndexState ? "primary.main" : "grey.400",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            />
          ))}
        </Box>
      )}

      {showThumbs && slidesToRender.length > 1 && (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            marginTop: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {slidesToRender.map((slide, index) => {
            const imageUrl =
              typeof slide === "string" ? getImageUrl(slide) : slide;
            return (
              <Box
                key={index}
                onClick={() => scrollTo(index)}
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 1,
                  overflow: "hidden",
                  cursor: "pointer",
                  border:
                    index === selectedIndexState
                      ? "2px solid"
                      : "2px solid transparent",
                  borderColor:
                    index === selectedIndexState
                      ? "primary.main"
                      : "transparent",
                  opacity: index === selectedIndexState ? 1 : 0.7,
                  transition: "opacity 0.2s, border-color 0.2s",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                {typeof imageUrl === "string" ? (
                  <img
                    src={imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  imageUrl
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
});

export default EmblaSlider;

