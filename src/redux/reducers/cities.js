export const cities = (state=[], action) => {
  switch (action.type) {
    case 'FETCH_CITIES_SUCCESS':
      return [...action.cities]
    case 'CLEAR_CITIES_SUCCESS':
      return []
    default:
      return state
  }
}