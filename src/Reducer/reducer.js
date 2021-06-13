import { addFilms, addToXters } from "../Actions/action";

export function reducerFunction(state, action) {
  const characters = state.characters ? state.characters : [];

  const { type, payload } = action;

  switch (type) {
    case addFilms: {
      return {
        ...state,
        films: payload,
      };
    }
    case addToXters: {
      return {
        ...state,
        characters: [...characters, payload],
      };
    }
    default:
      return state;
  }
}
