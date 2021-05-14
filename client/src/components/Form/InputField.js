import React, { useEffect, useRef, useState } from 'react';

function FormInput({
  onChange,
  onBlur,
  value,
  children,
  id,
  label,
  type,
  touched,
  required,
  className,
  ...props
}) {
  const [inputClasses, setInputClasses] = useState(className);
  const errorRef = useRef();
  const inputRef = useRef();

  const handleBlur = (evt) => {
    onBlur(evt.target.name);
  };

  const handleChange = (evt) => {
    const { value: inputValue, name: inputName, validity } = evt.target;
    onChange(inputValue, inputName, validity.valid);
  };

  useEffect(() => {
    if (touched) {
      const { validity, validationMessage } = inputRef.current;

      if (validity.valid) {
        errorRef.current.textContent = '';
        setInputClasses(className);
      } else {
        errorRef.current.textContent = validationMessage;
        setInputClasses(className + ' form__input_invalid');
      }
    }
  }, [value, touched]);

  let typeElement;

  switch (type) {
    case 'radio':
      typeElement = children(value, handleChange);
      break;
    case 'select':
      typeElement = (
        <select
          {...props}
          value={value}
          ref={inputRef}
          className={inputClasses}
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {children}
        </select>
      );
      break;
    case 'textarea':
      typeElement = (
        <textarea
          {...props}
          value={value}
          ref={inputRef}
          className={inputClasses}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
      break;
    default:
      typeElement = (
        <input
          {...props}
          value={value}
          ref={inputRef}
          className={inputClasses}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      );
  }

  return (
    <div className="form__element">
      <label className="form__label" htmlFor={id}>
        {label} {required ? '*' : null}
      </label>
      {typeElement}
      {touched && <span ref={errorRef} className="form__input-error" />}
    </div>
  );
}

export default FormInput;
