import React from "react";
import {
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import {
  defaultCountries,
  FlagEmoji,
  parseCountry,
  usePhoneInput
} from "react-international-phone";

// Function to convert numbers to Arabic digits
const convertToArabicDigits = (str) => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return str.replace(/[0-9]/g, (digit) => arabicDigits[parseInt(digit)]);
};

const PhoneTextInput = ({
  value,
  onChange,
  size = "medium",
  rtl = false, // New prop for RTL support
  ...restProps
}) => {
  const {
    phone,
    handlePhoneValueChange,
    inputRef,
    country,
    setCountry
  } = usePhoneInput({
    defaultCountry: "om",
    value,
    countries: defaultCountries,
    onChange: (data) => {
      onChange(data.phone);
    }
  });

  // Convert phone number to Arabic digits if rtl is true
  const displayPhone = rtl ? convertToArabicDigits(phone) : phone;

  return (
    <TextField
      dir={rtl ? "rtl" : "ltr"}
      variant="outlined"
      color="primary"
      size={size}
      placeholder="Phone number"
      value={displayPhone}
      fullWidth
      onChange={handlePhoneValueChange}
      type="tel"
      inputRef={inputRef}
      InputProps={{
        startAdornment: (
          <InputAdornment
            position="start"
            style={{ marginRight: "2px", marginLeft: "-8px" }}
          >
            <Select
              MenuProps={{
                style: {
                  height: "00px",
                  width: "360px",
                  top: "10px",
                  left: "-34px"
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left"
                }
              }}
              sx={{
                width: "max-content",
                fieldset: {
                  display: "none"
                },
                '&.Mui-focused:has(div[aria-expanded="false"])': {
                  fieldset: {
                    display: "block"
                  }
                },
                ".MuiSelect-select": {
                  padding: "8px",
                  paddingRight: "24px !important"
                },
                svg: {
                  right: 0
                }
              }}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              renderValue={(value) => (
                <FlagEmoji iso2={value} style={{ display: "flex" }} />
              )}
            >
              {defaultCountries.map((c) => {
                const country = parseCountry(c);
                return (
                  <MenuItem key={country.iso2} value={country.iso2}>
                    <FlagEmoji
                      iso2={country.iso2}
                      style={{ marginRight: "8px" }}
                    />
                    <Typography marginRight="8px">{country.name}</Typography>
                    <Typography color="gray">+{country.dialCode}</Typography>
                  </MenuItem>
                );
              })}
            </Select>
          </InputAdornment>
        ),
        style: rtl ? { direction: 'rtl' } : {}, // Apply RTL style if rtl is true
      }}
      {...restProps}
    />
  );
};

export default PhoneTextInput;
