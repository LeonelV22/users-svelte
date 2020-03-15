import config from '../../config';

export const getCountry = async (countryId) => {
  const response = await fetch(`${config.api}/countries/${countryId}`);
  const text = await response.text();

  if (response.ok) {
    const country = JSON.parse(text);
    countries[country.id] = country; // eslint-disable-line no-use-before-define

    return country;
  }
  return null;
};

export const countries = (() => {
  let countriesCache = {};

  return {
    get: async (countryId) => {
      const find = countriesCache[countryId];
      if (find) {
        return Promise.resolve(find);
      }

      const country = await getCountry(countryId);
      countriesCache[countryId] = country;

      return country;
    },

    fetchAll: async () => {
      const response = await fetch(`${config.api}/countries`);
      const text = await response.text();

      if (response.ok) {
        countriesCache = JSON.parse(text)
          .reduce((acc, c) => ({ ...acc, [c.id]: c }), {});

        return countriesCache;
      }
      return null;
    },
  };
})();
