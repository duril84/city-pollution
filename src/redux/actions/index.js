export const citiesFetched = (cities) => ({
  type: 'FETCH_CITIES_SUCCESS',
  cities,
});

export const citiesClear = (cities) => ({
  type: 'CLEAR_CITIES_SUCCESS',
  cities,
});
