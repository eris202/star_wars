// import Table from "./Component/table";
import { useReducer, useEffect, useState } from "react";
import { reducerFunction } from "./Reducer/reducer";
import { add_films, addToXters, add_to_xters } from "./Actions/action";
import "bootstrap/dist/css/bootstrap.css";
import Logo from "./Assets/logo.png";
import useALert from "./Hook/alert";
import { Button } from "./Component/button";
import Table from "./Component/table";
import axios from "axios";
import Select from "./Component/select";
import MainPreload from "./Component/preload.js/mainPreload";

function App() {
  const { alert } = useALert();

  // alert.error("Error occured");

  const initialData1 = { films: { result: [{}] } };
  const BASE_URL = "https://swapi.dev/api/films";
  const [state, dispatch] = useReducer(reducerFunction, initialData1);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [expandDataSpace, SetExpandDataSpace] = useState(false);
  const [characterInformation, setCharacterInformation] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    // fetch and dispatch data when page load data when the page loads
    setError(false);

    axios
      .get(`https://api.allorigins.win/raw?url=${BASE_URL}`)
      .then((res) => {
        dispatch(add_films(res.data));
        setError(false);
        setTimeout(() => {
          setPageLoaded(true);
        }, 2000);
      })
      .catch((err) => {
        alert.error("Something went wrong !!!");
        setPageLoaded(true);
        setError(true);
      });
  }, []);

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   SetExpandDataSpace(true);
  // };

  const loopCharacter = (getSelectedMovie, { selectedId }) => {
    const getLength = getSelectedMovie[0].characters.length;
    const characters = [];
    const id = getSelectedMovie[0].episode_id;

    const checkifCharacterEsist =
      state.characters &&
      state.characters.filter((result) => {
        return result[1].id === parseFloat(selectedId);
      });

    // check if character esist, if true(end the function)
    if (checkifCharacterEsist && checkifCharacterEsist.length) {
      getSelectedMovieCharacter({ selectedId });
      return false;
    }

    getSelectedMovie[0].characters.forEach((character, index) => {
      axios
        .get(`https://api.allorigins.win/raw?url=${character}`)
        .then((res) => {
          characters.push(res.data);
          if (characters.length === getLength) {
            dispatch(add_to_xters([{ items: characters }, { id }]));
            getSelectedMovieCharacter({ selectedId });
          } else {
            setCharacterInformation(null);
          }
        })
        .catch((err) => {
          console.log(index + 1, getLength);
          if (index + 1 === getLength) {
            alert.error(
              "Something went wrong!!! Check your internet or Refresh the page"
            );
          }
          // alert.error("index");
        });
    });
  };

  useEffect(() => {
    getSelectedMovieCharacter({ selectedId: selectedMovieId });
  }, [state.characters]);

  const getSelectedMovieCharacter = ({ selectedId }) => {
    const selectCharacter =
      state &&
      state.characters &&
      state.characters.filter((result) => {
        return result[1].id === parseFloat(selectedId);
      });

    setCharacterInformation(
      selectCharacter && selectCharacter[0] && selectCharacter[0][0].items
    );
  };
  const handleChange = (e) => {
    e.preventDefault();
    SetExpandDataSpace(false);
    setSelectedMovieId(e.target.value);

    if (isNaN(e.target.value)) {
      alert.warning("Select a movie to see details !!!");
      setSelectedMovie([]);
      return false;
    }
    SetExpandDataSpace(true);
    const getSelectedMovie = state.films.results.filter(
      (results) => results.episode_id === parseInt(e.target.value)
    );

    setSelectedMovie(getSelectedMovie.length > 0 ? getSelectedMovie : []);

    loopCharacter(getSelectedMovie, { selectedId: e.target.value });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row above-the-fold-design">
          <div className={`col-md-${expandDataSpace ? "3" : "6"}`}>
            <img className="img-fluid" src={Logo} />
          </div>
          <div
            className={`col-md  position-relative overflow-hidden ${
              !expandDataSpace ? "ycenter" : ""
            }`}
          >
            {!pageLoaded && !state.films.results && (
              <MainPreload msg="Loading movies ..." />
            )}
            {error && !characterInformation && (
              <div className="text-center w-100">
                <div className="col-md-6 mx-auto text-center">
                  We are unable to fetch movies , we encourage you to try again.
                </div>

                <Button
                  type="primary"
                  className="mt-3"
                  onClick={() => (window.location = window.location)}
                >
                  Try Again
                </Button>
              </div>
            )}
            {state.films.results && (
              <div className="row">
                <h3 className="text-center pt-5">
                  Select your desired movie to see details.
                </h3>
                <div className="col-12 text-center">
                  {" "}
                  <Select
                    className="col-md-10 col-11 mt-4"
                    onChange={handleChange}
                    placeholder="Select movie"
                    options={state.films.results ? state.films.results : null}
                  />
                  {expandDataSpace && (
                    <>
                      <div className="container-tv col-md-10 col-11 mx-auto">
                        <div className="tv mt-4">
                          {" "}
                          <marquee
                            className="mx-auto col-10"
                            behavior="scroll"
                            direction="up"
                            scrolldelay="150"
                          >
                            {" "}
                            {selectedMovie[0] && selectedMovie[0].opening_crawl}
                          </marquee>
                        </div>
                      </div>
                      <div className="col-md-10 col-11 mt-5 mx-auto">
                        <Table data={characterInformation} />
                        <div className="position-relative py-5"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}{" "}
          </div>
        </div>{" "}
      </div>
    </>
  );
}

export default App;
