import React, {useState, useEffect} from "react";
import { TextField, FormControl, InputLabel, Input, InputAdornment } from "@mui/material";
import InputMask from "react-input-mask";

export default function InputNew({ date, className, mask, onChange, label, price, value }){

  value = value || ""
  date = date || false
  className = className || ""
  label = label || ""
  onChange = onChange || ""
  mask = mask || ""
  price = price || false

  const [seleccionado, setSeleccionado] = useState(value);

  useEffect(() => {
          if (date == true){
            setSeleccionado(value.split('-').reverse())
          }
          else{
            setSeleccionado(value)
          }
      }, [value]);

  return (
    <>
      <InputMask
        mask={mask}
        disabled={false}
        onChange={onChange}
        value={seleccionado}
      >
        {() =>
          <input className={className} variant='standard' label={label} />
        }
      </InputMask>
      {(price == true) &&
        <FormControl variant="standard" className={className}>
          <InputLabel htmlFor="standard-adornment-amount">{label}</InputLabel>
          <Input
            id="standard-adornment-amount"
            onChange={onChange}
            className={className}
            value={seleccionado}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      }
    </>
  )
}