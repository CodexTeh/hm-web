import React, { Suspense, lazy } from "react";
import { TextField } from "@mui/material";

// Lazy load react-international-phone library
const PhoneInputLazy = lazy(() => import("./PhoneInputLazy"));

const PhoneTextInput = ({
  value,
  onChange,
  size = "medium",
  rtl = false, // New prop for RTL support
  ...restProps
}) => {
  return (
    <Suspense
      fallback={
        <TextField
          dir={rtl ? "rtl" : "ltr"}
          variant="outlined"
          color="primary"
          size={size}
          placeholder="Phone number"
          value=""
          fullWidth
          disabled
          {...restProps}
        />
      }
    >
      <PhoneInputLazy
        value={value}
        onChange={onChange}
        size={size}
        rtl={rtl}
        restProps={restProps}
      />
    </Suspense>
  );
};

export default PhoneTextInput;
