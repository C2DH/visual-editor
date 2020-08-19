import React from 'react'
import PropTypes from "prop-types";
import ReactSelect, { components } from "react-select"
import './TopSelectFilter.css'

const Option = props => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type      = "checkbox"
          checked   = {props.isSelected}
          onChange  = {() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

function TopSelectFilter({ options, label, onChange }) {

  function changeHandler(selected) {
    onChange((selected || []).map(item => item.value));
  }

  return (
      <ReactSelect
        isMulti
        options             = {options.map(val => ({value: val, label: val}))}
        placeholder         = {`${label}...`}
        closeMenuOnSelect   = {false}
        hideSelectedOptions = {false}
        onChange            = {changeHandler}
        className           = "TopSelectFilter__container"
        components={{
          Option
        }}
      />
  );
};

TopSelectFilter.propTypes = {
  options:  PropTypes.arrayOf(PropTypes.string),
  label:    PropTypes.string,
  onChange: PropTypes.func
};

TopSelectFilter.defaultProps = {
  options: [],
  label: 'Select'
};

export default TopSelectFilter
