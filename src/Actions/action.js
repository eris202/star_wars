export const addFilms = "ADD_FILMS";

export const add_films = (payload) => {
  return {
    type: addFilms,
    payload,
  };
};

export const addToXters = "ADD_TO_XTERS";

export const add_to_xters = (payload) => {
  return {
    type: addToXters,
    payload,
  };
};
