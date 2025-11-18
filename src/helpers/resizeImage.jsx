import React from "react";

/**
 * Detects browser support for next-gen image formats
 * @returns {object} - Object with support flags for AVIF, WebP, etc.
 */
export const detectImageFormatSupport = () => {
  // Cache the result to avoid repeated checks
  if (typeof window === 'undefined') {
    return { avif: false, webp: false };
  }

  if (!window._imageFormatSupport) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    // Fill canvas with a pixel
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 1, 1);

    // Check AVIF support - try to encode as AVIF
    let avifSupported = false;
    try {
      const avifDataUrl = canvas.toDataURL('image/avif');
      avifSupported = avifDataUrl.indexOf('data:image/avif') === 0 || avifDataUrl.length > 22;
    } catch (e) {
      avifSupported = false;
    }
    
    // Check WebP support - try to encode as WebP
    let webpSupported = false;
    try {
      const webpDataUrl = canvas.toDataURL('image/webp');
      webpSupported = webpDataUrl.indexOf('data:image/webp') === 0 || webpDataUrl.length > 22;
    } catch (e) {
      webpSupported = false;
    }

    window._imageFormatSupport = {
      avif: avifSupported,
      webp: webpSupported,
    };
  }

  return window._imageFormatSupport;
};

/**
 * Gets the best supported next-gen image format for the browser
 * Priority: AVIF > WebP > JPEG (fallback)
 * @returns {string} - Best supported format
 */
export const getBestImageFormat = () => {
  const support = detectImageFormatSupport();
  if (support.avif) return 'avif';
  if (support.webp) return 'webp';
  return 'jpeg'; // Fallback to JPEG for maximum compatibility
};

/**
 * Resizes an image using Canvas API on the client side with next-gen format support
 * @param {string|Image} imageSrc - Image source URL or Image object
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} maxHeight - Maximum height in pixels
 * @param {number} quality - Image quality (0-1, default: 0.8)
 * @param {string|'auto'} format - Output format: 'avif', 'webp', 'jpeg', 'png', or 'auto' (default: 'auto')
 * @returns {Promise<string>} - Blob URL of the resized image
 */
export const resizeImage = (imageSrc, maxWidth = 462, maxHeight = 230, quality = 0.8, format = 'auto') => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
        }

        // Create canvas
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        // Draw and resize image
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Determine format - use 'auto' to select best supported format
        let selectedFormat = format;
        if (format === 'auto') {
          selectedFormat = getBestImageFormat();
        }

        // Determine MIME type based on format
        let mimeType = 'image/jpeg'; // Default fallback
        if (selectedFormat === 'avif') {
          mimeType = 'image/avif';
        } else if (selectedFormat === 'webp') {
          mimeType = 'image/webp';
        } else if (selectedFormat === 'jpeg' || selectedFormat === 'jpg') {
          mimeType = 'image/jpeg';
        } else if (selectedFormat === 'png') {
          mimeType = 'image/png';
        }

        // Convert to blob URL for better performance with format fallback
        const tryConvert = (mime, fallbackMime = null) => {
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const blobUrl = URL.createObjectURL(blob);
                resolve(blobUrl);
              } else if (fallbackMime) {
                // Try fallback format if primary fails
                tryConvert(fallbackMime);
              } else {
                // Final fallback to JPEG if all else fails
                if (mime !== 'image/jpeg') {
                  tryConvert('image/jpeg');
                } else {
                  // Last resort: data URL
                  const dataUrl = canvas.toDataURL('image/jpeg', quality);
                  resolve(dataUrl);
                }
              }
            },
            mime,
            quality
          );
        };

        // Try the selected format with fallbacks
        if (selectedFormat === 'avif') {
          tryConvert('image/avif', 'image/webp');
        } else if (selectedFormat === 'webp') {
          tryConvert('image/webp', 'image/jpeg');
        } else {
          tryConvert(mimeType);
        }
      } catch (error) {
        console.error("Error resizing image:", error);
        // Fallback to original image if resize fails
        resolve(imageSrc);
      }
    };

    img.onerror = () => {
      console.error("Error loading image:", imageSrc);
      // Fallback to original image if load fails
      resolve(imageSrc);
    };

    img.src = imageSrc;
  });
};

/**
 * Hook to resize images on load with automatic next-gen format selection
 * @param {string} imageSrc - Image source URL
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} maxHeight - Maximum height in pixels
 * @param {number} quality - Image quality (0-1)
 * @param {string|'auto'} format - Output format: 'avif', 'webp', 'jpeg', 'png', or 'auto' (default: 'auto')
 * @returns {object} - { resizedUrl: string, isLoading: boolean }
 */
export const useResizedImage = (imageSrc, maxWidth = 462, maxHeight = 230, quality = 0.8, format = 'auto') => {
  const [resizedUrl, setResizedUrl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (!imageSrc) {
      setResizedUrl(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let currentUrl = null;

    resizeImage(imageSrc, maxWidth, maxHeight, quality, format)
      .then((url) => {
        currentUrl = url;
        setResizedUrl(url);
        setIsLoading(false);
      })
      .catch(() => {
        setResizedUrl(imageSrc); // Fallback to original
        setIsLoading(false);
      });

    // Cleanup blob URL on unmount or when imageSrc changes
    return () => {
      if (currentUrl && currentUrl.startsWith("blob:")) {
        URL.revokeObjectURL(currentUrl);
      }
    };
  }, [imageSrc, maxWidth, maxHeight, quality, format]);

  return { resizedUrl: resizedUrl || imageSrc, isLoading };
};

