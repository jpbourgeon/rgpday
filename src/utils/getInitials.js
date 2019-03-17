import { normalizeSync } from 'normalize-diacritics'

const getInitials = (from) => {
  return normalizeSync(from)
    .replace(/\W/g, ' ')
    .toUpperCase()
    .split(' ')
    .filter((item) => (
      item !== 'A' &&
      item !== 'AU' &&
      item !== 'AUX' &&
      item !== 'CAR' &&
      item !== 'DE' &&
      item !== 'DES' &&
      item !== 'DONC' &&
      item !== 'DU' &&
      item !== 'ET' &&
      item !== 'L' &&
      item !== 'LA' &&
      item !== 'LE' &&
      item !== 'LES' &&
      item !== 'MAIS' &&
      item !== 'NI' &&
      item !== 'OR' &&
      item !== 'OU' &&
      item !== 'UN' &&
      item !== 'UNE'
    ))
    .map((item) => {
      return (item.length > 1) ? item[0] : null
    })
    .join('')
    .substring(0, 3)
}

export default getInitials
