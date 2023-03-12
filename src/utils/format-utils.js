export const formatNumberForLanguage = (numberToFormat, language, numberOfDecimalPlaces) => {
  return Intl.NumberFormat([language, 'en-GB'], { minimumFractionDigits: numberOfDecimalPlaces, maximumFractionDigits: numberOfDecimalPlaces }).format(numberToFormat);
}