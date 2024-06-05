//This declares a function named formatPrice that takes a price parameter of type number.
export const formatPrice = (price: number) => {
  //This line creates a new Intl.NumberFormat object with the specified options for formatting numbers as currency in US dollars ("en-US" locale).
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    //It then uses the format method of the Intl.NumberFormat object to format the price parameter as a currency string and returns it.
  }).format(price);
};

//This declares a function named CfaFormat that takes a price parameter of type number.
export const CfaFormat = (price: number) => {
  //This line creates a new Intl.NumberFormat object with the specified options for formatting numbers as currency in West African CFA franc ("fr-FR" locale).
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XOF",
    //It then uses the format method of the Intl.NumberFormat object to format the result of price * 605 as a currency string and returns it.
  }).format(price * 605);
};

//This declares a function named CedisFormat that takes a price parameter of type number.
export const CedisFormat = (price: number) => {
  //This line creates a new Intl.NumberFormat object with the specified options for formatting numbers as currency in West African CFA franc ("fr-FR" locale).
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
    //It then uses the format method of the Intl.NumberFormat object to format the result of price * 15 as a currency string and returns it.
  }).format(price * 15);
};

// Summary:
// Both functions use the Intl.NumberFormat object to format a given price parameter as a currency string.
// formatPrice formats the price in US dollars, and CfaFormat formats the price in West African CFA francs (XOF) by multiplying the price by 605 before formatting.
// These functions are useful for displaying prices in different currencies with correct formatting.
