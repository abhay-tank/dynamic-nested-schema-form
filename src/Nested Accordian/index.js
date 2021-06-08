import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const type = [
  {
    value: "text",
    label: "Text",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
  {
    value: "group",
    label: "Group",
  },
  {
    value: "mixed",
    label: "Mixed",
  },
  {
    value: "RTE",
    label: "RTE",
  },
];

const addOption = [
  {
    value: "mandatory",
    label: "Mandatory",
  },
  {
    value: "Mutline",
    label: "Mutline",
  },
  {
    value: "Multiple",
    label: "Multiple",
  },
];

function NestedSchema() {
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      demo: [{ fieldName: "", displayName: "", type: "text", addOption: "" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "demo",
    }
  );

  // console.log("watch--->",watch())
  const onSubmit = (data) => console.log("data", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper style={{ margin: "10px 0", padding: "20px" }} elevation={3}>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-end"
        >
          <IconButton
            color="primary"
            component="span"
            variant="contained"
            onClick={() => {
              append({ fieldName: "", displayName: "", type: "text", addOption: "" });
            }}
          >
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="stretch"
        >
          {fields.map((item, index) => {
            return (
              <Grid style={{ margin: "20px" }} item key={item.id}>
                <Controller
                  render={({ field: { ref, ...inputProps } }) => (
                    <TextField
                      style={{ margin: "0 10px" }}
                      label="Field"
                      variant="outlined"
                      inputRef={ref}
                      {...inputProps}
                    />
                  )}
                  name={`demo.${index}.fieldName`}
                  control={control}
                  defaultValue={item.firstName}
                />

                <Controller
                  render={({ field: { ref, ...inputProps } }) => (
                    <TextField
                      style={{ margin: "0 10px" }}
                      label="value"
                      variant="outlined"
                      inputRef={ref}
                      {...inputProps}
                    />
                  )}
                  name={`demo.${index}.displayName`}
                  control={control}
                  defaultValue={item.displayName}
                />

                <Controller
                  render={({ field: { ref, ...inputProps } }) => (
                    <TextField
                      style={{ margin: "0 10px", width: "200px" }}
                      label="Type"
                      variant="outlined"
                      inputRef={ref}
                      select
                      {...inputProps}
                    >
                      {type.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name={`demo.${index}.type`}
                  control={control}
                  defaultValue={item.type}
                />

                <Controller
                  render={({ field: { ref, ...inputProps } }) => (
                    <TextField
                      style={{ margin: "0 10px", width: "200px" }}
                      label="Additional Options"
                      variant="outlined"
                      inputRef={ref}
                      select
                      {...inputProps}
                    >
                      {addOption.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                  name={`demo.${index}.addOption`}
                  control={control}
                  defaultValue={item.addOption}
                />

                <IconButton
                  aria-label="delete"
                  component="span"
                  onClick={() => remove(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-end"
        >
          <Button variant="contained" color="primary" type="submit">
            submit
          </Button>
        </Grid>
      </Paper>
    </form>
  );
}

export default NestedSchema;
