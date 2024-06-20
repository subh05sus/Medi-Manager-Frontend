import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import { FiSearch } from "react-icons/fi";
import './style.css';

const animatedComponents = makeAnimated();


export default function SearchDropdown({options,placeholder,onValuesChange}) {
  const [value,setValue] = useState(null);
  const handleValuesChange = (selectedValues) => {
    setValue(selectedValues);
    if (onValuesChange) {
      onValuesChange(selectedValues);
    }
  };
  return (
    <div>
      <CreatableSelect
        closeMenuOnSelect={true}
        components={animatedComponents}
        defaultValue={value}
        options={options}
        placeholder={
          <div>
            <FiSearch id="search-icon" style={{'color':'#383c44','fontSize' : "1.125rem"}}/> {placeholder}
          </div>
        }
        noOptionsMessage={()=> 'Not Found....'}
        onChange={handleValuesChange}
        isSearchable
        isMulti
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            maxHeight: '20vh',
            width: '100%',
            border: '1px solid #fff',
            borderRadius: '0.625rem',
            padding: '1px',
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            gap: '1vw',
          }),
          multiValue: (styles) => {
            return {
              position : 'relative',
              display: 'flex',
              margin : '0px 5px 2px 0px',
              justifyContent: 'center',
              alignItems: 'center',
              whiteSpace: 'wrap',
              backgroundColor: '#095d7e',
              borderRadius: '10px',
            };
          },
          multiValueLabel: (styles) => ({
            color: '#FFFFFF',
            fontSize: "1vw",
            padding : "0.3rem 0.5rem",
          }),
          multiValueRemove: (styles) => ({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            opacity : '1',
            color: 'black',
            position: 'absolute',
            right: '-5px',
            top: '-5px',
            padding: '1px',
            borderRadius: '50%',
            backgroundColor : '#EAF0FF',
            ':hover': {
              backgroundColor: 'red',
              color: 'white',
            },
          }),
          placeholder : (baseStyles) => ({
            ...baseStyles,
            color: "#383C44",
            fontSize : "1.125rem"
          }),
          clearIndicator : (baseStyles) => ({
            ...baseStyles,
            color: 'red'
          }),
          dropdownIndicator : (baseStyles) => ({
            ...baseStyles,
            color : "#000",
            padding : "0vw 1vw 0vw 1vw"
          }),
        }}
    />
    </div>
  )
}

