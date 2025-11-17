import React from "react";

/**
 * Resizes an image using Canvas API on the client side
 * @param {string|Image} imageSrc - Image source URL or Image object
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} maxHeight - Maximum height in pixels
 * @param {number} quality - Image quality (0-1, default: 0.8)
 * @param {string} format - Output format: 'webp', 'jpeg', or 'png' (default: 'webp')
 * @returns {Promise<string>} - Blob URL of the resized image
 */
export const resizeImage = (imageSrc, maxWidth = 462, maxHeight = 230, quality = 0.8, format = 'webp') => {
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

        // Determine MIME type based on format
        let mimeType = 'image/webp';
        if (format === 'jpeg' || format === 'jpg') {
          mimeType = 'image/jpeg';
        } else if (format === 'png') {
          mimeType = 'image/png';
        }

        // Convert to blob URL for better performance
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const blobUrl = URL.createObjectURL(blob);
              resolve(blobUrl);
            } else {
              // Fallback to data URL if blob fails
              const dataUrl = canvas.toDataURL(mimeType, quality);
              resolve(dataUrl);
            }
          },
          mimeType,
          quality
        );
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
 * Hook to resize images on load
 * @param {string} imageSrc - Image source URL
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} maxHeight - Maximum height in pixels
 * @param {number} quality - Image quality (0-1)
 * @param {string} format - Output format: 'webp', 'jpeg', or 'png' (default: 'webp')
 * @returns {object} - { resizedUrl: string, isLoading: boolean }
 */
export const useResizedImage = (imageSrc, maxWidth = 462, maxHeight = 230, quality = 0.8, format = 'webp') => {
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

