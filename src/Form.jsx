import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Controller } from "react-hook-form";
import get from "lodash/get";
import has from "lodash/has";
import isEmpty from "lodash/isEmpty";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/worker-json";
import "ace-builds/webpack-resolver";

export const Form = ({ customSchema, form, onSubmit }) => {
	const {
		handleSubmit,
		control,
		setValue,
		setError,
		formState: { errors },
	} = form;

	const generateForm = (schema) => {
		const {
			uid,
			name,
			title,
			type,
			field_metadata,
			validations,
			_schema,
			defaultValue = "",
		} = schema;
		const { options } = field_metadata;
		switch (type) {
			case "text":
				return (
					<Grid style={{ margin: "10px 0" }} item key={uid}>
						<Controller
							name={name}
							control={control}
							rules={validations}
							defaultValue={defaultValue}
							render={({ field, fieldState, formState }) => {
								const { errors } = formState;
								const hasFieldError = has(errors, name);
								const fieldError = get(errors, name);
								return (
									<TextField
										fullWidth
										label={title}
										type="text"
										variant="outlined"
										error={hasFieldError}
										helperText={hasFieldError && fieldError.message}
										{...field}
										inputRef={field.ref}
									/>
								);
							}}
						/>
					</Grid>
				);
			case "number":
				return (
					<Grid style={{ margin: "10px 0" }} item key={uid}>
						<Controller
							name={name}
							control={control}
							rules={validations}
							defaultValue={defaultValue}
							render={({ field, fieldState, formState }) => {
								const { errors } = formState;
								const hasFieldError = has(errors, name);
								const fieldError = get(errors, name);
								return (
									<TextField
										fullWidth
										label={title}
										type="number"
										variant="outlined"
										error={hasFieldError}
										helperText={hasFieldError && fieldError.message}
										{...field}
										inputRef={field.ref}
									/>
								);
							}}
						/>
					</Grid>
				);
			case "date":
				return (
					<Grid style={{ margin: "10px 0" }} item key={uid}>
						<Controller
							name={name}
							control={control}
							rules={validations}
							defaultValue={defaultValue}
							render={({ field, fieldState, formState }) => {
								const { errors } = formState;
								const hasFieldError = has(errors, name);
								const fieldError = get(errors, name);
								return (
									<TextField
										fullWidth
										label={title}
										type="date"
										variant="outlined"
										error={hasFieldError}
										helperText={hasFieldError && fieldError.message}
										{...field}
										inputRef={field.ref}
									/>
								);
							}}
						/>
					</Grid>
				);
			case "select":
				return (
					<Grid style={{ margin: "10px 0" }} item key={uid}>
						<Controller
							name={name}
							control={control}
							rules={validations}
							defaultValue={defaultValue}
							render={({ field, fieldState, formState }) => {
								const { errors } = formState;
								const hasFieldError = has(errors, name);
								const fieldError = get(errors, name);
								return (
									<TextField
										fullWidth
										label={title}
										type="date"
										variant="outlined"
										error={hasFieldError}
										select
										helperText={hasFieldError && fieldError.message}
										{...field}
										inputRef={field.ref}
									>
										{options.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
								);
							}}
						/>
					</Grid>
				);
			case "radioGroup":
				const radioGroupErrorExist = has(errors, name);
				return (
					<Grid
						style={
							radioGroupErrorExist
								? {
										borderLeft: "red 2px solid",
										margin: "10px 0",
								  }
								: { margin: "10px 0" }
						}
						item
						key={uid}
					>
						<Paper
							style={{ padding: "20px" }}
							elevation={radioGroupErrorExist ? 3 : 1}
						>
							<FormControl error={radioGroupErrorExist}>
								<FormLabel component="legend">{title}</FormLabel>
								<Controller
									name={name}
									control={control}
									rules={validations}
									defaultValue={defaultValue}
									render={({ field: { value }, fieldState, formState }) => {
										const { errors } = formState;
										const hasFieldError = has(errors, name);
										const fieldError = get(errors, name);
										return (
											<>
												<RadioGroup
													value={value}
													onChange={(e) => {
														setValue(name, e.target.value, {
															shouldValidate: true,
														});
													}}
												>
													{options.map(({ label, value }, index) => (
														<FormControlLabel
															key={`${uid}-${value}${label}${index}`}
															value={value}
															control={
																<Radio
																	key={`radioButton-${uid}${value}${label}${index}`}
																/>
															}
															label={label}
														/>
													))}
												</RadioGroup>
												{hasFieldError && (
													<FormHelperText>{fieldError.message}</FormHelperText>
												)}
											</>
										);
									}}
								/>
							</FormControl>
						</Paper>
					</Grid>
				);
			case "checkboxGroup":
				const checkboxGroupErrorExist = has(errors, name);
				return (
					<Grid
						style={
							checkboxGroupErrorExist
								? {
										borderLeft: "red 2px solid",
										margin: "10px 0",
								  }
								: { margin: "10px 0" }
						}
						item
						key={uid}
					>
						<Paper
							style={{ padding: "20px" }}
							elevation={checkboxGroupErrorExist ? 3 : 1}
						>
							<FormControl error={checkboxGroupErrorExist}>
								<FormLabel component="legend">{title}</FormLabel>
								<Controller
									name={name}
									control={control}
									rules={validations}
									defaultValue={defaultValue}
									render={({
										field: { value: checkboxValue, name },
										fieldState,
										formState,
									}) => {
										const { errors } = formState;
										const hasFieldError = has(errors, name);
										const fieldError = get(errors, name);
										return (
											<>
												<FormGroup>
													{options.map(
														({ label, value, name: checkboxName }, index) => (
															<FormControlLabel
																key={`${uid}-${value}${label}${index}`}
																control={
																	<Checkbox
																		key={`checkbox-${uid}${value}${label}${index}`}
																		checked={checkboxValue[checkboxName]}
																		name={checkboxName}
																		onChange={() => {
																			const updatedCheckboxValue = {
																				...checkboxValue,
																			};
																			updatedCheckboxValue[checkboxName] =
																				!checkboxValue[checkboxName];
																			setValue(name, updatedCheckboxValue, {
																				shouldValidate: true,
																			});
																			// await trigger(name);
																		}}
																	/>
																}
																label={label}
															/>
														)
													)}
												</FormGroup>
												{hasFieldError && (
													<FormHelperText>{fieldError.message}</FormHelperText>
												)}
											</>
										);
									}}
								/>
							</FormControl>
						</Paper>
					</Grid>
				);
			case "group":
				const groupError = has(errors, name);
				return (
					<Accordion
						key={uid}
						style={
							groupError
								? { borderLeft: "red 2px solid", margin: "10px 0" }
								: { margin: "10px 0" }
						}
					>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography>{title}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Grid
								container
								direction="column"
								justify="space-between"
								alignItems="stretch"
							>
								{_schema.length > 0 &&
									_schema.map((schemaObject) => {
										return generateForm(schemaObject);
									})}
							</Grid>
						</AccordionDetails>
					</Accordion>
				);
			case "checkboxAccordian":
				const checkboxAccordianError = has(errors, name);
				return (
					<Controller
						name={name}
						key={uid}
						control={control}
						rules={validations}
						defaultValue={defaultValue}
						render={({ field: { value } }) => {
							const accordianState = value.value;
							const hasFieldError = has(errors, name);
							const fieldError = get(errors, name);
							return (
								<Accordion
									key={uid}
									expanded={accordianState}
									style={
										checkboxAccordianError
											? { borderLeft: "red 2px solid", margin: "10px 0" }
											: { margin: "10px 0" }
									}
								>
									<AccordionSummary
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<FormControlLabel
											control={
												<Checkbox
													name={`${name}.value`}
													checked={value.value}
													onChange={async () => {
														const updatedCheckboxAccordianValue = {
															...value,
														};
														updatedCheckboxAccordianValue["value"] =
															!value.value;
														setValue(name, updatedCheckboxAccordianValue, {
															shouldValidate: true,
														});
													}}
													inputProps={{ "aria-label": "primary checkbox" }}
												/>
											}
											label={title}
										/>
										{hasFieldError && (
											<FormHelperText>{fieldError.message}</FormHelperText>
										)}
									</AccordionSummary>
									<AccordionDetails>
										<Grid
											container
											direction="column"
											justify="space-between"
											alignItems="stretch"
										>
											{_schema.length > 0 &&
												_schema.map((schemaObject) => {
													return generateForm(schemaObject);
												})}
										</Grid>
									</AccordionDetails>
								</Accordion>
							);
						}}
					/>
				);
			case "fileUpload":
				const fileOptions = field_metadata.options || {};
				const fileUploadError = has(errors, name);
				return (
					<Grid
						style={
							fileUploadError
								? {
										borderLeft: "red 2px solid",
										margin: "10px 0",
								  }
								: { margin: "10px 0" }
						}
						item
						key={uid}
					>
						<Controller
							name={name}
							control={control}
							rules={validations}
							render={({
								field: { onBlur, value, name, ref },
								fieldState,
								formState,
							}) => {
								const { errors } = formState;
								const hasFieldError = has(errors, name);
								const fieldError = get(errors, name);
								return (
									<Paper
										style={{ padding: "20px" }}
										elevation={checkboxGroupErrorExist ? 3 : 1}
									>
										<FormControl error={hasFieldError}>
											<Typography variant="h6">{title}</Typography>
											<Divider />
											<Button
												style={{ margin: "10px 0" }}
												variant="contained"
												component="label"
												color={!isEmpty(value) ? "default" : "primary"}
											>
												Upload File
												<input
													name={name}
													ref={ref}
													onBlur={onBlur}
													{...fileOptions}
													onChange={(e) => {
														setValue(name, e.target.files, {
															shouldValidate: true,
														});
													}}
													type="file"
													hidden
												/>
											</Button>
											{!isEmpty(value) &&
												Object.values(value).map((file, index) => (
													<Typography key={`${uid}-file-${index}`}>
														{file.name.length > 20
															? `${file.name.substring(0, 20)}...`
															: file.name}
													</Typography>
												))}
											{hasFieldError && (
												<FormHelperText>{fieldError.message}</FormHelperText>
											)}
										</FormControl>
									</Paper>
								);
							}}
						/>
					</Grid>
				);
			case "jsonEditor":
				const jsonEditorErrorExists = has(errors, name);
				return (
					<Grid
						style={
							jsonEditorErrorExists
								? {
										borderLeft: "red 2px solid",
										margin: "10px 0",
										padding: "10px",
								  }
								: { margin: "10px 0", padding: "10px" }
						}
						item
						key={uid}
					>
						<Controller
							name={name}
							control={control}
							rules={validations}
							defaultValue={defaultValue}
							render={({
								field: { value, onChange },
								fieldState,
								formState,
							}) => {
								const { errors } = formState;
								const hasFieldError = has(errors, name);
								const fieldError = get(errors, name);
								const onError = (node) => {
									if (node.length) {
										setError(name, {
											type: node[0].type,
											message: node[0].text,
										});
									}
								};
								return (
									<FormControl
										style={{ minWidth: "100%" }}
										error={hasFieldError}
									>
										<AceEditor
											value={value}
											onValidate={(node) => {
												if (node.length) {
													onError(node.filter((err) => err.type === "error"));
												}
												onError([]);
											}}
											onChange={(newValue) => {
												onChange(newValue);
											}}
											name={name}
											setOptions={{
												enableBasicAutocompletion: true,
												enableLiveAutocompletion: true,
												enableSnippets: true,
												tabSize: 2,
											}}
											style={{ minWidth: "100%" }}
											mode="json"
											theme="xcode"
											showPrintMargin={true}
											showGutter={true}
											highlightActiveLine={true}
										/>
										{hasFieldError ? (
											<FormHelperText>{fieldError.message}</FormHelperText>
										) : (
											<FormHelperText> </FormHelperText>
										)}
									</FormControl>
								);
							}}
						/>
					</Grid>
				);
			default:
				return (
					<Grid style={{ margin: "10px 0" }} item key={uid}>
						<Controller
							name={name}
							control={control}
							rules={validations}
							defaultValue={defaultValue}
							render={({ field, fieldState, formState }) => {
								const { errors } = formState;
								const hasFieldError = has(errors, name);
								const fieldError = get(errors, name);
								return (
									<TextField
										fullWidth
										label={title}
										type={type}
										variant="outlined"
										error={hasFieldError}
										helperText={hasFieldError && fieldError.message}
										{...field}
										inputRef={field.ref}
									/>
								);
							}}
						/>
					</Grid>
				);
		}
	};

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			{generateForm(customSchema)}
			<Button variant="contained" color="primary" type="submit">
				submit form
			</Button>
		</form>
	);
};
