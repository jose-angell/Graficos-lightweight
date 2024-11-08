import React, {useState} from "react";

const SelectComponent = ({onSelectChange}) => {
    const handleChange = (event) => {
        console.log(event.target.value)
        onSelectChange(event.target.value);
    };
    return (
        <select onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="MXN">MXN</option>
            <option value="EUR">EUR</option>
          </select>
    );
};

export default SelectComponent;