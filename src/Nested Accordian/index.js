import React, { useEffect, useState } from "react";
import shortid from "shortid";
import { Form } from "../Form";
import { useForm } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
import Button from "@material-ui/core/Button";
import { cloneDeep, set, get } from "lodash";

export const NestedAccordian = () => {
  const _schema = [];

  const form = useForm({
    mode: "all",
    reValidateMode: "all",
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const {
    setValue,
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = form;
  const primitive = ["text", "number", "date", "select", "fileUpload"];
  const groupType = [
    "group",
    "radioGroup",
    "checkboxGroup",
    "checkboxAccordian",
  ];
  const [schema, setSchema] = useState([]);


  const onPush = async (e) => {
    e.stopPropagation();
    const fieldNumber = schema.length;
     await trigger([
      `country[${fieldNumber - 1}].state`,
      `country[${fieldNumber - 1}].city`,
    ]);

    if (errors?.country) {
      e.target.disabled = true;
    } else {
      const pushedSchema = {
        title: `Country-${fieldNumber}`,
        name: ``,
        uid: shortid.generate(),
        field_metadata: {
          showDeleteButton: true,
          deleteButtonProps: {
            variant: "contained",
            color: "primary",
            type: "button",
            onClick: (e) => { e.stopPropagation();  onDelete(fieldNumber)},
          },
          options: [],
        },
        defaultValue: "",
        validations: {},
        type: "groupAccordian",
        _schema: [
          {
            title: "State Name",
            uid: shortid.generate(),
            name: `country[${fieldNumber}].state`,
            type: "text",
            defaultValue: "",
            validations: {
              required: "Name is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
          {
            title: "city",
            uid: shortid.generate(),
            name: `country[${fieldNumber}].city`,
            type: "text",
            defaultValue: "",
            validations: {
              required: "Name is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
        ],
      };
      setSchema(cloneDeep(schema.push(cloneDeep(pushedSchema))));
      // setSchema(prevProp=>console.log(prevProp))
    }
  };

  const onDelete = (index) => {
    console.log("delet-->", index);

    schema.length > 0 ? setSchema(cloneDeep(schema.splice(index, 1))) : null;
  };

  console.log(getValues());

  const [mainSchema, setMainSchema] = useState({
    title: "Country",
    name: `country[${schema.length}]`,
    uid: shortid.generate(),
    field_metadata: {
      showAddButton: true,
      addButtonProps: {
        variant: "contained",
        color: "primary",
        type: "button",
        onClick: onPush,
      },
      options: [],
    },
    defaultValue: {},
    validations: {},
    type: "groupAccordian",
    _schema: schema,
  });

  useEffect(() => {}, [schema]);

  const submitFormHandler = (data) => {
    console.log("Form Data => ", data);
  };

  return (
    <div>
      <Form
        formId="myform"
        customSchema={mainSchema}
        onSubmit={submitFormHandler}
        additionalFormAttributes={{}}
        // watchList={["city"]}
        form={form}
      />
      <Button form="myform" variant="contained" color="primary" type="submit">
        submit form
      </Button>
    </div>
  );
};
