import React from 'react'

const Select = ({options, ...props}) => {

  return (
    <select {...props}>
        {options.map(option => {
            return <option key={option.value} value={option.value} disabled={option.disabled} selected={option.selected}>{option.name}</option>
        })}
    </select>
  )
}

export default Select