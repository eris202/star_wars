import React, { useState, useEffect } from "react";
import ArrowDown from "../Assets/sort-down.png";
import { Button } from "./button";
import TablePreload from "./preload.js/table";
export default function Table({ data, Thead }) {
  const [initialData, setInitialData] = useState([data, { sortTimes: 0 }]);
  const [tableData, setTableData] = useState(data);
  const [start, setStart] = React.useState(0);
  const [end, setEnd] = React.useState(10);
  const [increaseIntrvl, setIncreaseIntrvl] = React.useState(10);
  const [nameSorted, setNameSorted] = useState(false);
  const [heightSorted, setHeightSorted] = useState(false);
  const [selectValue, setSelectValue] = useState("default");
  const OneFoot = 0.0328084; //Foot to centimeter

  let totalHeight = 0;

  const allAge = [];

  useEffect(() => {
    if (data) {
      setInitialData((prev) => [data, { sortTimes: prev[1].sortTimes }]);
    }
    setSelectValue("default");
    setNameSorted(false);
    setHeightSorted(false);
  }, [data]);

  React.useEffect(() => {
    setEnd(10);
    setStart(0);
  }, [initialData]);

  React.useEffect(() => {
    if (initialData[0] && initialData[0].length) {
      setTableData(
        initialData[0].slice(
          start > initialData[0].length ? 0 : start,
          end <= initialData[0].length ? end : initialData[0].length
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
    if (
      end == (initialData[0] && initialData[0].length) ||
      tableData.length < 10
      // ||
      // end + increaseIntrvl > initialData.length
    )
      return;
    setStart(end);
    setEnd(end + increaseIntrvl);
  };

  // filter
  const sortBy = (thead, index) => {
    if (thead === "Name") {
      const nameData = initialData[0].sort((a, b) =>
        !nameSorted
          ? a.name[0].localeCompare(b.name[0])
          : b.name[0].localeCompare(a.name[0])
      );

      setInitialData((prev) => [
        nameData,
        { sortTimes: prev[1].sortTimes + 1 },
      ]);

      setNameSorted(!nameSorted);
    }
    if (thead === "Height") {
      // sort by height
      const heightData = initialData[0].sort((a, b) =>
        !heightSorted ? a.height[0] - b.height[0] : b.height[0] - a.height[0]
      );

      setInitialData((prev) => [
        heightData,
        { sortTimes: prev[1].sortTimes + 1 },
      ]);

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
    setSelectValue(e.target.value);

    switch (e.target.value) {
      case "n/a":
        setInitialData((prev) => [
          genderFilterHandler("n/a"),
          { sortTimes: prev[1].sortTimes + 1 },
        ]);
        break;
      case "male":
        setInitialData((prev) => [
          genderFilterHandler("male"),
          { sortTimes: prev[1].sortTimes + 1 },
        ]);
        break;

      case "female":
        setInitialData((prev) => [
          genderFilterHandler("female"),
          { sortTimes: prev[1].sortTimes + 1 },
        ]);
        break;

      case "default":
        setInitialData((prev) => [
          genderFilterHandler("default"),
          { sortTimes: prev[1].sortTimes + 1 },
        ]);
        break;

      default:
        break;
    }
  };

  const runConvertion = (num) => {
    const getLength = num / 2.54;
    const getFeet = Math.floor(getLength / 12);
    const getInches = (getLength - 12 * getFeet).toFixed(2);

    return getFeet + "ft/" + getInches + "in";
  };
  return (
    <div>
      <div className="float-end d-inline-block">
        Filter
        <select
          disabled={!tableData || !data}
          value={selectValue}
          onChange={handleGenderFilter}
          style={{ cursor: "pointer" }}
        >
          <option value="default">default</option>
          <option value="n/a">n/a</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      <div className="table-responsive col-12">
        <table
          style={{ color: "yellow", margin: 0 }}
          className="table table-demo table-striped table-dark"
        >
          <thead>
            <tr>
              <th>S/N </th>
              <th className="thToclick">
                <Button
                  disabled={!tableData || !data}
                  type="no-bg-inline"
                  onClick={() => sortBy("Name")}
                >
                  Name{" "}
                  <img className={nameSorted ? "rotate" : ""} src={ArrowDown} />{" "}
                </Button>{" "}
              </th>
              <th>Gender </th>
              <th className="thToclick">
                <Button
                  disabled={!tableData || !data}
                  onClick={() => sortBy("Height")}
                  type="no-bg-inline"
                >
                  Height{" "}
                  <img
                    className={heightSorted ? "rotate" : ""}
                    src={ArrowDown}
                  />{" "}
                </Button>{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {data &&
              tableData &&
              tableData.map((tables, index) => {
                if (isNaN(tables.height)) tables.height = 0;
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

            {tableData && data && (
              <tr>
                <th scope="row">T/A</th>
                <td></td>
                <td></td>
                <td className="text-center">
                  {totalHeight + "" + "CM"}
                  {" " + " "}
                  {"(" + runConvertion(totalHeight) + ")"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {(!tableData || !data) && <TablePreload />}
      {/* 170 cm (5ft/6.93in) */}
      <div className="navContainer mt-3">
        {data && tableData && (
          <>
            <Button
              disabled={
                end == (initialData[0] && initialData[0].length) ||
                (tableData && tableData.length < 10)
              }
              className="btn float-end me-2"
              style={{
                cursor: `${
                  end == (initialData[0] && initialData[0].length) ||
                  (tableData && tableData.length) < 10
                    ? "no-drop"
                    : "pointer"
                }`,
              }}
              onClick={handleNext}
            >
              Next
            </Button>

            <Button
              disabled={start == 0}
              className="btn float-end me-2"
              style={{ cursor: `${start === 0 ? "no-drop" : "pointer"}` }}
              onClick={handlePrevious}
            >
              Previous
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
