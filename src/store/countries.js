import config from '../../config'

const countries = (() => {
  const countries = {}

  return {
    get: async (countryId) => {
      const find = countries[countryId];
      if(find){
        return Promise.resolve(find);
      }

      const country = await getCountry(countryId);
      countries[countryId] = country;

      return country;
    },
  }
})();

const getCountries = async () => {
  const response = await fetch(`${config.api}/countries`);
  const text = await response.text();

  if (response.ok) {
    const _countries = JSON.parse(text);
    countries = _countries;

    return countries;
  }
  return null;
};


const getCountry = async (countryId) => {
  const response = await fetch(`${config.api}/countries/${countryId}`);
  const text = await response.text();

  if (response.ok) {
    const country = JSON.parse(text);
    countries[country.id] = country;

    return country
  }
  return null
}


export {
  countries,
  getCountries,
  getCountry,
}
