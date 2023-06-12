import React from "react";

const Error = ({ errorArray, fieldName, index }) => {
  let foundIndex;

  index
    ? (foundIndex = errorArray.findIndex(
        (el) => el.name === fieldName + "_" + index
      ))
    : (foundIndex = errorArray.findIndex((el) => el.name === fieldName));
  if (foundIndex <= -1) {
    return null;
  } else {
    return (
      <ul>
        {errorArray[foundIndex].message.map((el) => (
          <li className="text-red-600 font-semibold text-xs">{el}</li>
        ))}
      </ul>
    );
  }
};

export default Error;
