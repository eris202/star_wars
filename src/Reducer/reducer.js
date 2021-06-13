import { addFilms, addToXters } from "../Actions/action";

export function reducerFunction(state, action) {
  const characters = state.characters ? state.characters : [];

  const { type, payload } = action;

  console.log(payload, "payload is");
  console.log(characters, "charcter is");
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
