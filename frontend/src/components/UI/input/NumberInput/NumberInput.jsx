import React, { useState } from 'react';
import classes from './NumberInput.module.css';

const NumberInput = React.forwardRef(
  (
    {
      defaultValue = '',
      icon,
      placeholder = 'Введите число',
      maxLength,
      minValue = 0,
      maxValue,
      step = 1, // Шаг для инкремента/декремента
      onChange,
      disabled = false,
      showButtons = true, // Показывать кнопки или нет
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue);
    const [isValid, setIsValid] = useState(true);

    const handleInputChange = (e) => {
      let newValue = e.target.value.replace(/[^0-9]/g, '');

      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      const numValue = newValue ? parseInt(newValue, 10) : '';
      if (minValue !== undefined && numValue !== '' && numValue < minValue) {
        newValue = minValue.toString();
      }
      if (maxValue !== undefined && numValue !== '' && numValue > maxValue) {
        newValue = maxValue.toString();
      }

      setValue(newValue);
      setIsValid(newValue !== '' || !props.required);

      if (onChange) {
        e.target.value = newValue;
        onChange(e);
      }
    };

    const handleIncrement = () => {
      if (disabled) return;
      const numValue = value ? parseInt(value, 10) : minValue || 0;
      let newValue = numValue + step;
      if (maxValue !== undefined && newValue > maxValue) newValue = maxValue;
      setValue(newValue.toString());
      setIsValid(true);
      if (onChange) {
        const syntheticEvent = { target: { value: newValue.toString() } };
        onChange(syntheticEvent);
      }
    };

    const handleDecrement = () => {
      if (disabled) return;
      const numValue = value ? parseInt(value, 10) : minValue || 0;
      let newValue = numValue - step;
      if (minValue !== undefined && newValue < minValue) newValue = minValue;
      setValue(newValue.toString());
      setIsValid(true);
      if (onChange) {
        const syntheticEvent = { target: { value: newValue.toString() } };
        onChange(syntheticEvent);
      }
    };

    return (
      <label
        ref={ref}
        className={`${classes.numberInputLabel} ${!isValid ? classes.invalid : ''} ${
          disabled ? classes.disabled : ''
        }`}
      >
        {icon && <i className={classes.icon}>{icon}</i>}
        <input
          {...props}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={maxLength}
          disabled={disabled}
          className={classes.numberInput}
        />
        {showButtons && (
          <div className={classes.buttonContainer}>
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || (maxValue !== undefined && parseInt(value || 0) >= maxValue)}
              className={classes.incrementButton}
            >
              +
            </button>
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || (minValue !== undefined && parseInt(value || 0) <= minValue)}
              className={classes.decrementButton}
            >
              −
            </button>
          </div>
        )}
      </label>
    );
  }
);

export default NumberInput;