export const convertNumberFormat = (numberString?: string) => {
  if (numberString) {
    const parts = numberString.split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1] ? "." + parts[1] : "";

    let formattedIntegerPart = "";
    while (integerPart.length > 3) {
      formattedIntegerPart = "," + integerPart.slice(-3) + formattedIntegerPart;
      integerPart = integerPart.slice(0, integerPart.length - 3);
    }
    if (integerPart) {
      formattedIntegerPart = integerPart + formattedIntegerPart;
    }

    return formattedIntegerPart + decimalPart;
  }
};
