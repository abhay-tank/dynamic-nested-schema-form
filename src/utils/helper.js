const objectExists = (error) => {
  return error
    ? Object.keys(error).length !== 0 && error.constructor === Object
    : false;
};

const getObject = (object, path) => {
  let resultObject = object;
  const parents = path.split(".");
  for (let i = 0; i < parents.length; i++) {
    const parent = parents[i];
    if (objectExists(resultObject[parent])) {
      resultObject = resultObject[parent];
    } else {
      return undefined;
    }
  }
  return resultObject;
};
const checkboxWrapper = async () => {
  console.log("Value => ", value);
  console.log("Default value => ", defaultValue);
  const updatedCheckboxAccordianValue =
    value.value === false
      ? { value: !value.value }
      : {
          ...value,
          value: !value.value
        };
  console.log("Updated value => ", updatedCheckboxAccordianValue);
  setValue(name, updatedCheckboxAccordianValue, {
    shouldValidate: true
  });
  // await trigger(name);
};
export { objectExists as errorExists, getObject };
