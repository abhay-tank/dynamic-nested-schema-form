import React, { useState } from "react";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Divider from "@material-ui/core/Divider";
import "ace-builds";
import AceEditor from "react-ace";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/snippets/json";
import "ace-builds/src-min-noconflict/ext-language_tools";
import jsonWorkerUrl from "file-loader!ace-builds/src-noconflict/worker-json";
import { InputLabel } from "@material-ui/core";
ace.config.setModuleUrl("ace/mode/json_worker", jsonWorkerUrl);
import { useWatch } from "react-hook-form";

export const Form = ({
  formId,
  customSchema,
  additionalFormAttributes,
  watchList,
  form,
  onSubmit,
}) => {
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
    unregister,
    watch,
  } = form;
  watchList?.length > 0
    ? useWatch({
        name: watchList,
        control,
      })
    : null;

  const [pushedSchema, setPushedSchema] = useState([]);

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
      case "checkbox":
        return (
          <Grid item key={uid}>
            <Controller
              name={name}
              control={control}
              rules={validations}
              defaultValue={defaultValue}
              rules={validations}
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        name={field.name}
                        onChange={(event) =>
                          field.onChange(event.target.checked)
                        }
                      />
                    }
                    label={title}
                  />
                );
                _schema.length > 0 && field_metadata.mapSchema;
              }}
            />
          </Grid>
        );
      case "radio":
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
                          {options.map(
                            (
                              { label, value: radioValue, mapSchema },
                              index
                            ) => (
                              <div key={`${uid}-${radioValue}${label}${index}`}>
                                <FormControlLabel
                                  // key={`${uid}-${value}${label}${index}`}
                                  value={radioValue}
                                  control={
                                    <Radio
                                      key={`radioButton-${uid}${value}${label}${index}`}
                                    />
                                  }
                                  label={label}
                                />

                                {_schema.length > 0 &&
                                  mapSchema?.length > 0 &&
                                  mapSchema.map((schemaName) => {
                                    return (
                                      radioValue === value &&
                                      generateForm(
                                        _schema.find(
                                          (schemaObject) =>
                                            schemaObject.name === schemaName
                                        )
                                      )
                                    );
                                  })}
                              </div>
                            )
                          )}
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
                            (
                              { label, value, name: checkboxName, mapSchema },
                              index
                            ) => (
                              <div key={`${uid}-${value}${label}${index}`}>
                                {generateForm({
                                  uid: `checkbox-${uid}${value}${label}${index}`,
                                  name: `${name}.${checkboxName}`,
                                  title: label,
                                  type: "checkbox",
                                  field_metadata: {},
                                  validations: {},
                                  _schema: [],
                                  defaultValue: checkboxValue[checkboxName],
                                })}

                                {_schema.length > 0 &&
                                  mapSchema?.length > 0 &&
                                  mapSchema.map((values) => {
                                    return (
                                      checkboxValue[checkboxName] &&
                                      generateForm(
                                        _schema.find(
                                          (schemaObject) =>
                                            schemaObject.name === values
                                        )
                                      )
                                    );
                                  })}
                              </div>
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
          <Paper
            key={uid}
            style={
              groupError
                ? {
                    borderLeft: "red 2px solid",
                    margin: "10px 0",
                    padding: "20px",
                  }
                : { margin: "10px 0", padding: "20px" }
            }
            elevation={checkboxGroupErrorExist ? 3 : 1}
          >
            <Typography style={{ margin: "10px 0" }} variant="h4">
              {title}
            </Typography>
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
          </Paper>
        );
      case "groupAccordian":
        const groupAccordianError = has(errors, name);



        return (
          <>
            <Accordion
              key={uid}
              defaultExpanded={true}
              style={
                groupAccordianError
                  ? { borderLeft: "red 2px solid", margin: "10px 0" }
                  : { margin: "10px 0" }
              }
            >
              <AccordionSummary
                expandIcon={[<ExpandMoreIcon />]}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{title}</Typography>

                {!!field_metadata?.showAddButton && (
                  <Button {...field_metadata?.addButtonProps}>Add</Button>
                )}
                {!!field_metadata?.showDeleteButton && (
                  <Button {...field_metadata?.deleteButtonProps}>Delete</Button>
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
          </>
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
                            const groupElements = Object.keys(value);
                            console.log("Children => ", groupElements);
                            console.log("CheckboxAccordian name => ", name);
                            // When checkbox is unticked
                            if (!value.value === false) {
                              groupElements.forEach((element) => {
                                unregister(`${name}.${element}`, {
                                  keepValue: false,
                                });
                              });
                              setValue(name, {});
                            }
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
    <form
      id={formId}
      {...additionalFormAttributes}
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      {generateForm(customSchema)}
    </form>
  );
};
