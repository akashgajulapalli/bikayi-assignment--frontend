import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectComponent = (props) => {
  const { data } = props;
  const handleChange = (event) => {
    data.updateFn(event.target.value);
  };
  return (
    <>
      <FormControl sx={{width:300, float:'right',marginBottom:5}}>
        <InputLabel id="demo-simple-select-label">{data.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.value || 'All'}
          label={data.label}
          onChange={handleChange}
        >
          {
            data && data?.list && data?.list?.length > 0
              ? data?.list.map((item, index) => {
                return <MenuItem key={index} value={item}>{item}</MenuItem>
              })
              : null
          }
        </Select>
      </FormControl>
    </>

  );
}

export default SelectComponent;