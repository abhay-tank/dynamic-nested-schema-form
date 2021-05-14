import React, { useState } from "react";
import shortid from "shortid";
import { Form } from "./Form";
import { useForm } from "react-hook-form";
import isEmpty from "lodash/isEmpty";
export default function App() {
	const form = useForm({
		mode: "all",
		reValidateMode: "all",
		resolver: undefined,
		context: undefined,
		criteriaMode: "all",
		shouldFocusError: true,
		shouldUnregister: false,
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
				name: "employee.name",
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
				defaultValue: "male",
				validations: {
					required: "Sex is required",
				},
				field_metadata: {
					options: [
						{ label: "Male", value: "male" },
						{ label: "Female", value: "female" },
						{ label: "Transgender", value: "transgender" },
					],
				},
				_schema: [],
			},
			{
				title: "What is fav tv show?",
				uid: shortid.generate(),
				name: "employee.favShow",
				type: "radioGroup",
				defaultValue: "friends",
				validations: {
					required: "Fav show is required",
				},
				field_metadata: {
					options: [
						{ label: "Friends", value: "friends" },
						{ label: "Doctor House", value: "doctorHouse" },
						{ label: "Mr. Robot", value: "mrRobot" },
					],
				},
				_schema: [],
			},
			{
				title: "Select your interest",
				uid: shortid.generate(),
				name: "employee.interest",
				type: "checkboxGroup",
				defaultValue: {
					drawing: false,
					gaming: false,
					swimming: true,
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
						{ label: "Drawing", name: "drawing", value: "drawing" },
						{ label: "Gaming", name: "gaming", value: "gaming" },
						{ label: "Swimming", name: "swimming", value: "swimming" },
					],
				},
				_schema: [],
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
					validate: (values) => values.value,
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
	return (
		<div>
			<Form
				customSchema={customSchema}
				onSubmit={submitFormHandler}
				form={form}
			/>
		</div>
	);
}
