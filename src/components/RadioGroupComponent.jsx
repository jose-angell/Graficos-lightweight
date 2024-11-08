import React,  {useState} from 'react';

function formatedDate(date){
    let year = date.getFullYear()
    let month = (date.getMonth() + 1).toString().padStart(2, "0")
    let day = date.getDate().toString().padStart(2, "0")
    return `${year}-${month}-${day}`
}
const RadioGroupComponent = ({ onRadioChange }) => {
  const handleChange = (event) => {
    let today = new Date();
    let lastMonth = new Date(today)
    lastMonth.setMonth(today.getMonth() - 1)
    let lastYear = new Date(today)
    lastYear.setFullYear(today.getFullYear() - 1)
    let lastFiveYears = new Date(today)
    lastFiveYears.setFullYear(today.getFullYear() - 5)
    let dateSelected = lastFiveYears
    if(event.target.value == 2){
        dateSelected = lastYear
    }else if(event.target.value == 3){
        dateSelected = lastMonth
    }
    onRadioChange(formatedDate(dateSelected));
  };

  return (
    <div onChange={handleChange}>
      <input type="radio" value="2024-01-01" name="radioGroup" /> 5 Years
      <input type="radio" value="2" name="radioGroup" /> 1 Year
      <input type="radio" value="3" name="radioGroup" /> 1 Month
    </div>
  );
};

export default RadioGroupComponent;
