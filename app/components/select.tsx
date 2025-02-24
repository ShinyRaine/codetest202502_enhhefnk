'use client'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, SelectProps } from "@mui/material";
import { useState } from "react";

export default function FormSelect(props: SelectProps & 
  {
    list: {[key: string]: number | string}[]
}) {
  const [value, setValue] = useState(props.defaultValue || '')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: SelectChangeEvent<unknown>, child: any) => {
    if (props.onChange) {
      props.onChange(e, child);
    }
    setValue(e.target.value as string | number)
  }
  return (
    <FormControl variant="standard" sx={{width: '100%'}}>
      <InputLabel>{props.label}</InputLabel>
      <Select {...props}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">N/A</MenuItem>
        {props.list.map(item => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)}
      </Select>
    </FormControl>
  )
}
