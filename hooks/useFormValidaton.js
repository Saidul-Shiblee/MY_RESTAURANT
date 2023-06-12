import React from "react";
import camelCaseToPascal from "../lib/camelCaseToPascal";

const useFormValidaton = () => {
  const [inputError, setInputError] = React.useState([]);

  const validateForm = ({
    value,
    name,
    index,
    max,
    min,
    type,
    data,
    pattern,
    title,
    refName,
    refValue,
  }) => {
    let errors = [...inputError];
    const regex = pattern;
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //raise error if field value is empty
    if (value.length <= 0) {
      errors = validator(errors, name, "can't be left blank", index);
    }
    //
    if (value.length > 0) {
      //Rasie error if max length not respected
      if (max && value.length > max) {
        errors = validator(
          errors,
          name,
          `must not excced ${max} characters.`,
          index
        );
      }
      //Raise error if min length not respected
      if (min && value.length < min) {
        errors = validator(
          errors,
          name,
          `must be greater than ${min} characters.`,
          index
        );
      }
      //Raise error if data type not matched
      if (type) {
        if (
          (type === "string" && !isNaN(+value)) ||
          (type === "number" && isNaN(+value))
        ) {
          errors = validator(errors, name, `must be a ${type}.`, index);
        }
      }
      //Raise error if the entry already exists in database
      if (data?.result) {
        errors = validator(errors, name, `already exists`, index);
      }
      //Raise error if regex pattern does not matched
      if (pattern && !regex.test(value)) {
        errors = validator(errors, name, `must be ${title}`, index);
      }
      //Raise error if email id is not valid
      if (convertSpelling(name) === "email" && !emailRegex.test(value)) {
        errors = validator(errors, name, `must be a valid email`, index);
      }
      if (refValue && value !== refValue) {
        console.log(value, refValue);
        errors = validator(errors, name, `and ${refName} must be same`, index);
      }
    }
    setInputError(errors);
  };

  //Reset field on action
  const resetError = (fieldName, index) => {
    setInputError(
      inputError.filter(
        (el) => el.name !== (index ? fieldName + "_" + index : fieldName)
      )
    );
  };
  //validator function
  const validator = (errorArray, fieldName, message, index) => {
    const foundIndex = errorArray.findIndex(
      (el) => el.name === (index ? fieldName + "_" + index : fieldName)
    );
    //if any other error with related field exist push the new error
    if (foundIndex >= 0) {
      errorArray[foundIndex].message.push(
        `${camelCaseToPascal(fieldName)} ${message}`
      );
    } else {
      //if no other error with related field exist, create the error
      errorArray.push({
        name: index ? fieldName + "_" + index : fieldName,
        message: [`${camelCaseToPascal(fieldName)} ${message}`],
      });
    }
    return errorArray;
  };

  const isFilled = (fieldObject) => {
    let filled = false;
    outer_loop: for (const key in fieldObject) {
      if (Array.isArray(fieldObject[key])) {
        if (fieldObject[key].length <= 0) {
          filled = false;
          break outer_loop;
        } else {
          for (let obj of fieldObject[key]) {
            for (const key in obj) {
              if (!obj[key]) {
                filled = false;
                break outer_loop;
              } else {
                filled = true;
              }
            }
          }
        }
      } else {
        if (!fieldObject[key]) {
          filled = false;
          break outer_loop;
        } else {
          filled = true;
        }
      }
    }
    return filled;
  };
  return [inputError, setInputError, validateForm, resetError, isFilled];
};

const convertSpelling = (value) => {
  let newValue;
  newValue = value.trim();
  if (newValue.includes("-")) {
    newValue = newValue.replace(/-/g, "");
  }
  if (newValue.includes("_")) {
    newValue = newValue.replace(/_/g, "");
  }
  return newValue.toLowerCase();
};

export default useFormValidaton;
