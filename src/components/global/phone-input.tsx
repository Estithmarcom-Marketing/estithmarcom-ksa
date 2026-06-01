"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  parsePhoneNumberFromString,
  AsYouType,
  getCountries,
  getCountryCallingCode,
  CountryCode,
  isValidPhoneNumber,
} from "libphonenumber-js";
import { useState, useMemo, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

type Country = {
  code: string;
  dialCode: string;
  flag: string;
  label: string;
};

interface PhoneInputProps {
  value?: string;
  onChange?: (e164: string) => void;
  onBlur?: (e164: string | null) => void;
  onInputChange?: () => void;
  defaultCountry?: CountryCode;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  error?: boolean;
}

export function PhoneInput({
  value = "",
  onChange,
  onBlur,
  onInputChange,
  defaultCountry = "SA",
  placeholder = "Phone number",
  searchPlaceholder = "Search country...",
  emptyText = "No country found.",
  error = false,
}: PhoneInputProps) {
  const locale = useLocale();

  // ✅ dynamic countries list based on locale
  const countryOptions = useMemo(() => {
    const displayNames = new Intl.DisplayNames(
      [locale === "ar" ? "ar" : "en"],
      { type: "region" }
    );

    return getCountries()
      .map((country) => ({
        code: country,
        dialCode: `+${getCountryCallingCode(country)}`,
        flag: country
          .toUpperCase()
          .replace(/./g, (char) =>
            String.fromCodePoint(127397 + char.charCodeAt(0))
          ),
        label: displayNames.of(country) ?? country,
      }))
      .sort((a, b) =>
        a.label.localeCompare(b.label, locale === "ar" ? "ar" : "en")
      );
  }, [locale]);

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryOptions.find((c) => c.code === defaultCountry) ??
      countryOptions[0]
  );

  const [countryOpen, setCountryOpen] = useState(false);

  // 🔁 keep selected country synced if locale changes
  useEffect(() => {
    const updated = countryOptions.find(
      (c) => c.code === selectedCountry.code
    );
    if (updated) setSelectedCountry(updated);
  }, [countryOptions, selectedCountry.code]);

  const phoneDisplay = useMemo(() => {
    if (!value) return "";
    
    // If value starts with +, it's probably E.164
    if (value.startsWith("+")) {
      const parsed = parsePhoneNumberFromString(value);
      if (parsed) {
        // If it belongs to selected country, show national
        if (parsed.country === selectedCountry.code) {
          return parsed.formatNational();
        }
        // Otherwise show E.164 or formatted
        return parsed.formatInternational();
      }
    }
    
    // If value is just digits, try parsing with selected country
    const parsedWithCountry = parsePhoneNumberFromString(value, selectedCountry.code as CountryCode);
    if (parsedWithCountry) {
      return parsedWithCountry.formatNational();
    }

    // Fallback: strip dial code if it's there
    if (value.startsWith(selectedCountry.dialCode)) {
      return value.replace(selectedCountry.dialCode, "");
    }
    
    return value;
  }, [value, selectedCountry]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, "");
    
    // Use AsYouType to see if it becomes a valid number
    const asYouType = new AsYouType(selectedCountry.code as CountryCode);
    asYouType.input(raw);
    const parsed = asYouType.getNumber();
    
    if (parsed && parsed.isValid()) {
      onChange?.(parsed.number);
    } else {
      // If not yet valid, send dialCode + digits
      // Ensure we don't double the dial code if it's already in digits
      const dialDigits = selectedCountry.dialCode.replace(/\D/g, "");
      if (digits.startsWith(dialDigits)) {
        onChange?.(`+${digits}`);
      } else {
        onChange?.(`${selectedCountry.dialCode}${digits}`);
      }
    }
    onInputChange?.();
  };

  const handlePhoneBlur = () => {
    // Strict validation on blur
    const isValid = isValidPhoneNumber(value, selectedCountry.code as CountryCode);
    if (isValid) {
      const parsed = parsePhoneNumberFromString(value, selectedCountry.code as CountryCode);
      if (parsed) {
        onChange?.(parsed.number);
        onBlur?.(parsed.number);
        return;
      }
    }
    
    // If we reach here, it's invalid
    onBlur?.(null);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setCountryOpen(false);
    // Reset phone when country changes to avoid mismatched dial codes
    onChange?.("");
  };

  return (
    <div
      className={`flex mt-2 items-center rounded-md border ${
        locale === "ar" ? "flex-row-reverse" : ""
      } ${error ? "border-red-500" : "border-white/50"}`}
    >
      <Popover open={countryOpen} onOpenChange={setCountryOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            dir="ltr"
            className="flex items-center gap-1 px-3 py-2 rounded-l-md shadow-sm font-bold border-gray-100 hover:border-gray-200 bg-gray-100 hover:bg-gray-200 text-primary! transition h-12 border-r shrink-0 text-sm"
          >
            <span className="text-lg leading-none">
              {selectedCountry.flag}
            </span>
            <span>{selectedCountry.dialCode}</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          sideOffset={5}
          className="w-72 p-0 rounded-none border border-main!"
          align={locale === "ar" ? "end" : "start"}
        >
          <Command>
            <CommandInput placeholder={searchPlaceholder} />

            <CommandList
              className="max-h-60"
              onWheel={(e) => e.stopPropagation()}
            >
              <CommandEmpty>{emptyText}</CommandEmpty>

              {countryOptions.map((country) => (
                <CommandItem
                  key={country.code}
                  onSelect={() => handleCountrySelect(country)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="flex-1 text-sm">
                    {country.label}
                  </span>
                  <span dir="ltr" className="text-muted-foreground text-xs">
                    {country.dialCode}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Input
        dir="ltr"
        inputMode="tel"
        placeholder={placeholder}
        id="phone"
        value={phoneDisplay}
        onChange={handlePhoneChange}
        onBlur={handlePhoneBlur}
        aria-invalid={error}
        className="border-l-transparent! aria-invalid:border-none! relative z-10 rounded-l-none!"
      />
    </div>
  );
}
