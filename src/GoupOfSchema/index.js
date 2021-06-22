import React, { useState } from "react";
import shortid from "shortid";
import { Form } from "../Form";
import { useForm } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
import Button from "@material-ui/core/Button";

export const GroupSchema = () => {
  const form = useForm({
    mode: "all",
    reValidateMode: "all",
    resolver: undefined,
    context: undefined,
    criteriaMode: "all",
    shouldFocusError: true,
    shouldUnregister: true,
  });
  const primitive = ["text", "number", "date", "select", "fileUpload"];
  const groupType = [
    "group",
    "radioGroup",
    "checkboxGroup",
    "checkboxAccordian",
  ];
  const [customSchema, SetCustomSchema] = useState({
    title: "Employee",
    name: "employee",
    uid: shortid.generate(),
    field_metadata: {
      options: [],
      groupType: "checkbox",
    },
    defaultValue: "",
    validations: {},
    type: "group",
    _schema: [
      {
        title: "Name",
        uid: shortid.generate(),
        name: "name",
        type: "text",
        defaultValue: "Abhay",
        validations: {
          required: "Name is required",
        },
        field_metadata: {
          options: [],
        },
        _schema: [],
      },
      {
        title: "Age",
        uid: shortid.generate(),
        name: "employee.age",
        type: "number",
        defaultValue: "22",
        validations: {
          required: "Age is required",
        },
        field_metadata: {
          options: [],
        },
        _schema: [],
      },
      {
        title: "Sex",
        uid: shortid.generate(),
        name: "employee.sex",
        type: "select",
        defaultValue: "",
        validations: {
          required: "Sex is required",
        },
        field_metadata: {
          options: [
            { label: "Male", value: "male", },
            { label: "Female", value: "female" },
            { label: "Transgender", value: "transgender" },
          ],
          mapSchema:{
            male:["sumil"],
            female:["age"],
            transgender:["age","sumil"]

          }
        },
        _schema: [
          {
            title: "Name",
            uid: shortid.generate(),
            name: "male.sumil",
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
        title: "Age",
        uid: shortid.generate(),
        name: "female.age",
        type: "number",
        defaultValue: "",
        validations: {
          required: "Age is required",
        },
        field_metadata: {
          options: [],
        },
        _schema: [],
      },
        ],
      },
      {
        title: "What is fav tv show?",
        uid: shortid.generate(),
        name: "employee.favShow",
        type: "radio",
        defaultValue: "friends",
        validations: {
          required: "Fav show is required",
        },
        field_metadata: {
          options: [
            {
              label: "Friends",
              value: "friends",
              mapSchema: ["employee.characterName"],
            },
            { label: "Doctor House", value: "doctorHouse", mapSchema: [] },
            {
              label: "Mr. Robot",
              value: "mrRobot",
              mapSchema: ["employee.episode"],
            },
          ],
        },
        _schema: [
          {
            title: "Friends Fav character",
            uid: shortid.generate(),
            name: "employee.characterName",
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
            title: "Currently on which episode ",
            uid: shortid.generate(),
            name: "employee.episode",
            type: "number",
            defaultValue: "",
            validations: {
              required: "Episode number is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
        ],
      },
      {
        title: "What is your Gender?",
        uid: shortid.generate(),
        name: "employee.gender",
        type: "radio",
        defaultValue: "male",
        validations: {
          required: "Gender is required",
        },
        field_metadata: {
          options: [
            { label: "Male", value: "male", mapSchema: ["employee.company"] },
            {
              label: "Female",
              value: "female",
              mapSchema: ["employee.company"],
            },
            { label: "Others", value: "others", mapSchema: [] },
          ],
        },
        _schema: [
          {
            title: "What is your Company name?",
            uid: shortid.generate(),
            name: "employee.company",
            type: "radio",
            defaultValue: "dfe",
            validations: {
              required: "Fav show is required",
            },
            field_metadata: {
              options: [
                {
                  label: "Raw engineering",
                  value: "raw",
                  mapSchema: ["employee.salary"],
                },
                { label: "ContentStack", value: "cs", mapSchema: [] },
                { label: "DFEP", value: "dfe", mapSchema: [] },
              ],
            },
            _schema: [
              {
                title: "What is your Slaray?",
                uid: shortid.generate(),
                name: "employee.salary",
                type: "radio",
                defaultValue: "8L",
                validations: {
                  required: "Fav show is required",
                },
                field_metadata: {
                  options: [
                    { label: "10 Lakhs", value: "10L", mapSchema: [] },
                    { label: "9 Lakh", value: "9L", mapSchema: [] },
                    { label: "8 Lakh", value: "8L", mapSchema: [] },
                  ],
                },
                _schema: [],
              },
            ],
          },
        ],
      },
      {
        title: "Unmarrired",
        uid: shortid.generate(),
        name: "employee.unmarrired",
        type: "checkbox",
        defaultValue: false,
        validations: {},
        field_metadata: {
          options: [],
        },
        _schema: [],
      },
      {
        title: "",
        uid: shortid.generate(),
        schemaName: "personal",
        name: "employee.CheckedValue",
        type: "checkboxGroup",
        defaultValue: {
          islocation: false,
          isAddress: false,
          isPhone: true,
        },
        validations: {
          validate: (value) => {
            const invalid = Object.values(value).every(
              (value) => value === false
            );
            if (!invalid) {
              return true;
            } else {
              return "Interest is required";
            }
          },
        },
        field_metadata: {
          options: [
            {
              label: "Location",
              name: "islocation",
              value: "location",
              mapSchema: ["employee.location"],
            },
            {
              label: "Address",
              name: "isAddress",
              value: "Address",
              mapSchema: ["employee.address"],
            },
            {
              label: "Phone Number",
              name: "isPhone",
              value: "phone",
              mapSchema: ["employee.phone"],
            },
          ],
        },
        _schema: [
          {
            title: "Location",
            schemaName: "location",
            uid: shortid.generate(),
            name: "employee.location",
            type: "groupAccordian",
            validations: {},
            defaultValue: "",
            field_metadata: {
              options: [],
            },
            _schema: [
              {
                title: "latitude",
                uid: shortid.generate(),
                name: "employee.location.latitude",
                type: "number",
                defaultValue: "",
                validations: {
                  required: "latitude is required",
                },
                field_metadata: {
                  options: [],
                },
                _schema: [],
              },
              {
                title: "Longitude",
                uid: shortid.generate(),
                name: "employee.location.longitude",
                type: "number",
                defaultValue: "",
                validations: {
                  required: "longitude is required",
                },
                field_metadata: {
                  options: [],
                },
                _schema: [],
              },
              {
                title: "Radius",
                uid: shortid.generate(),
                name: "employee.location.radius",
                type: "number",
                defaultValue: "",
                validations: {
                  required: "longitude is required",
                },
                field_metadata: {
                  options: [],
                },
                _schema: [],
              },
            ],
          },
          {
            title: "Phone Number",
            schemaName: "phone",
            uid: shortid.generate(),
            name: "employee.phone",
            type: "number",
            defaultValue: "",
            validations: {
              required: "Number is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
          {
            title: "Address",
            schemaName: "address",
            uid: shortid.generate(),
            type: "group",
            name: "employee.address",
            validations: {
              required: "Address is required",
            },
            defaultValue: "",
            field_metadata: {
              options: [],
            },
            _schema: [
              {
                title: "Street",
                uid: shortid.generate(),
                type: "text",
                name: "employee.address.street",
                validations: {
                  required: "Street is required",
                },
                defaultValue: "PD Raut road",
                field_metadata: {
                  options: [],
                },
                _schema: [],
              },
              {
                title: "Location",
                uid: shortid.generate(),
                name: "employee.address.location",
                type: "group",
                validations: {
                  required: "Street is required",
                },
                defaultValue: "",
                field_metadata: {
                  options: [],
                },
                _schema: [
                  {
                    title: "Latitude",
                    uid: shortid.generate(),
                    type: "text",
                    name: "employee.address.location.latitude",
                    validations: {
                      required: "latitude is required",
                      pattern: {
                        value:
                          /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                        message: "Invalid Latitude",
                      },
                    },
                    defaultValue: "1",
                    field_metadata: {
                      options: [],
                    },
                    _schema: [],
                  },
                  {
                    title: "Longitude",
                    uid: shortid.generate(),
                    type: "text",
                    name: "employee.address.location.longitude",
                    validations: {
                      required: "longitude is required",
                      pattern: {
                        value:
                          /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                        message: "Invalid Longitude",
                      },
                    },
                    defaultValue: "1",
                    field_metadata: {
                      options: [],
                    },
                    _schema: [],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Birthdate",
        uid: shortid.generate(),
        name: "employee.birthday",
        type: "date",
        validations: {
          required: "Birthdate is required",
        },
        defaultValue: "2021-05-19",
        field_metadata: {
          options: [],
        },
        _schema: [],
      },
      {
        title: "Avail Offers",
        uid: shortid.generate(),
        name: "employee.offers",
        type: "groupAccordian",
        validations: {},
        defaultValue: "",
        field_metadata: {
          options: [],
        },
        _schema: [
          {
            title: "Name",
            uid: shortid.generate(),
            name: "employee.offers.name",
            type: "text",
            defaultValue: "Abhay",
            validations: {
              required: "Name is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
          {
            title: "Age",
            uid: shortid.generate(),
            name: "employee.offers.age",
            type: "number",
            defaultValue: "22",
            validations: {
              required: "Age is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
        ],
      },
      {
        title: "Address",
        uid: shortid.generate(),
        type: "group",
        name: "employee.address",
        validations: {
          required: "Address is required",
        },
        defaultValue: "",
        field_metadata: {
          options: [],
        },
        _schema: [
          {
            title: "Street",
            uid: shortid.generate(),
            type: "text",
            name: "employee.address.street",
            validations: {
              required: "Street is required",
            },
            defaultValue: "PD Raut road",
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
          {
            title: "Location",
            uid: shortid.generate(),
            name: "employee.address.location",
            type: "group",
            validations: {
              required: "Street is required",
            },
            defaultValue: "",
            field_metadata: {
              options: [],
            },
            _schema: [
              {
                title: "Latitude",
                uid: shortid.generate(),
                type: "text",
                name: "employee.address.location.latitude",
                validations: {
                  required: "latitude is required",
                  pattern: {
                    value:
                      /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                    message: "Invalid Latitude",
                  },
                },
                defaultValue: "1",
                field_metadata: {
                  options: [],
                },
                _schema: [],
              },
              {
                title: "Longitude",
                uid: shortid.generate(),
                type: "text",
                name: "employee.address.location.longitude",
                validations: {
                  required: "longitude is required",
                  pattern: {
                    value:
                      /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/,
                    message: "Invalid Longitude",
                  },
                },
                defaultValue: "1",
                field_metadata: {
                  options: [],
                },
                _schema: [],
              },
            ],
          },
        ],
      },
      {
        title: "Enroll",
        uid: shortid.generate(),
        name: "employee.enrollment",
        type: "checkboxAccordian",
        defaultValue: { value: false },
        validations: {
          // validate: (values) => values.value,
        },
        field_metadata: {},
        _schema: [
          {
            title: "First Name",
            uid: shortid.generate(),
            name: "employee.enrollment.firstName",
            type: "text",
            defaultValue: "Abhay",
            validations: {
              required: "First Name is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
          {
            title: "Last Name",
            uid: shortid.generate(),
            name: "employee.enrollment.lastName",
            type: "text",
            defaultValue: "Tank",
            validations: {
              required: "Last Name is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
          {
            title: "Age",
            uid: shortid.generate(),
            name: "employee.enrollment.age",
            type: "number",
            defaultValue: "20",
            validations: {
              required: "Age is required",
            },
            field_metadata: {
              options: [],
            },
            _schema: [],
          },
        ],
      },
      {
        title: "Resume",
        uid: shortid.generate(),
        name: "employee.resume",
        type: "fileUpload",
        defaultValue: null,
        validations: {
          validate: (value) => {
            return isEmpty(value) ? "File is required" : true;
          },
        },
        field_metadata: {},
        _schema: [],
      },
      {
        title: "RTE",
        uid: shortid.generate(),
        name: "employee.json",
        type: "jsonEditor",
        defaultValue: "{}",
        validations: {
          required: "JSON is required",
        },
        field_metadata: {},
        _schema: [],
      },
    ],
  });
  const submitFormHandler = (data) => {
    console.log("Form Data => ", data);
  };
  const actions = [
    {
      id: "",
      label: "",
      handler: () => {},
    },
  ];
  return (
    <div>
      <Form
        formId="myform"
        customSchema={customSchema}
        onSubmit={submitFormHandler}
        additionalFormAttributes={{}}
        form={form}
      />
      <Button form="myform" variant="contained" color="primary" type="submit">
        submit form
      </Button>
    </div>
  );
};
