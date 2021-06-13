import React, { useState, useEffect } from "react";
import ArrowDown from "../Assets/sort-down.png";
import TablePreload from "./preload.js/table";
export default function Table({ data, Thead }) {
  const [initialData, setInitialData] = useState(data);
  const [tableData, setTableData] = useState(data);
  const [ageTotal, setAgeTotal] = useState(0);
  const [lastItemIndex, setLastItemIndex] = useState(0);
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(10);
  const [increaseIntrvl, setIncreaseIntrvl] = React.useState(10);
  const [dataToUse, setData] = React.useState(data);
  const [clickedIndex, setClickedIndex] = useState();
  const [paginateBy, setPaginateBy] = useState(10);
  const [nameSorted, setNameSorted] = useState(false);
  const [heightSorted, setHeightSorted] = useState(false);

  // console.log(data && data[0], "initial");

  let totalHeight = 0;

  const allAge = [];

  useEffect(() => {
    if (data) {
      setInitialData(data);
      console.log(data, "Saka");
      // setTableData(data.slice(start, end));
    }
  }, [data]);

  React.useEffect(() => {
    console.log("initial data is", initialData);
    if (initialData && initialData.length) {
      setTableData(
        initialData.slice(
          start > initialData.length ? 0 : start,
          end <= initialData.length ? end : initialData.length
        )
      );
    }
  }, [start, end, initialData]);

  // pagination
  const handlePrevious = () => {
    if (start == 0) return;
    setStart(start - increaseIntrvl);
    setEnd(end - increaseIntrvl);
  };

  const handleNext = () => {
    if (end == initialData.length || tableData.length < 10) return;
    setStart(end);
    setEnd(end + increaseIntrvl);
  };

  // filter
  const sortBy = (thead, index) => {
    setClickedIndex(index);
    if (thead === "Name") {
      console.log(initialData, "initial Data is after updated");
      const a = initialData.sort((a, b) =>
        !nameSorted
          ? a.name[0].localeCompare(b.name[0])
          : b.name[0].localeCompare(a.name[0])
      );

      console.log(a, "Alimi");
      setInitialData(a);
      // console.log(tableData[0]);

      setNameSorted(!nameSorted);
    }
    if (thead === "Height") {
      // sort by height
      setInitialData(
        initialData.sort((a, b) =>
          !heightSorted ? a.height[0] - b.height[0] : b.height[0] - a.height[0]
        )
      );
      // console.log(tableData[0]);

      setHeightSorted(!heightSorted);
    }
  };

  function add(accumulator, a) {
    return accumulator + a;
  }

  const genderFilterHandler = (filterBy) => {
    var handler = data.filter((data) => data.gender === filterBy);

    if (filterBy === "default") handler = data;
    setStart(0);
    setEnd(10);
    return handler;
  };

  const handleGenderFilter = (e) => {
    switch (e.target.value) {
      case "n/a":
        setInitialData(genderFilterHandler("n/a"));
        break;
      case "male":
        setInitialData(genderFilterHandler("male"));
        break;

      case "female":
        setInitialData(genderFilterHandler("female"));
        break;

      case "default":
        setInitialData(genderFilterHandler("default"));
        break;

      default:
        break;
    }
  };
  return (
    <div>
      <div className="float-end d-inline-block">
        Filter
        <select onChange={handleGenderFilter} style={{ cursor: "pointer" }}>
          <option value="default">default</option>
          <option value="n/a">n/a</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      <table
        style={{ color: "yellow" }}
        class="table table-demo table-striped table-dark"
      >
        <thead>
          <tr>
            <th>S/N </th>
            <th onClick={() => sortBy("Name")}>
              Name{" "}
              <img
                style={{ width: "10px", cursor: "pointer" }}
                src={ArrowDown}
              />{" "}
            </th>
            <th>Gender </th>
            <th onClick={() => sortBy("Height")}>
              Height{" "}
              <img
                style={{ width: "10px", cursor: "pointer" }}
                src={ArrowDown}
              />{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData &&
            tableData.map((tables, index) => {
              totalHeight = totalHeight + parseInt(tables.height);
              return (
                <tr key={tables.name}>
                  <th scope="row">{start + index + 1}</th>
                  <td>{tables.name}</td>
                  <td>
                    {tables.gender == "male"
                      ? "M"
                      : tables.gender == "female"
                      ? "F"
                      : tables.gender}
                  </td>
                  <td> {tables.height}</td>
                </tr>
              );
            })}
          <tr>
            <th scope="row">T/A</th>
            <td></td>
            <td></td>
            <td>{totalHeight}</td>
          </tr>
        </tbody>
      </table>
      <div className="navContainer">
        {initialData && (
          <button
            className="btn float-end me-2"
            style={{
              cursor: `${
                end == initialData.length ||
                (tableData && tableData.length) < 10
                  ? "no-drop"
                  : "pointer"
              }`,
            }}
            onClick={handleNext}
          >
            Next
          </button>
        )}
        <button
          className="btn float-end me-2"
          style={{ cursor: `${start === 0 ? "no-drop" : "pointer"}` }}
          onClick={handlePrevious}
        >
          Previous
        </button>
      </div>

      {!tableData ||
        (!data && (
          <>
            <TablePreload />
          </>
        ))}
    </div>
  );
}
