import React, { useEffect, useState } from 'react';

function Form({
  initFormValues,
  isFormReady,
  onSubmit,
  onPickDoctor,
  children,
  ...props
}) {
  const init = {};
  Object.keys(initFormValues).forEach((key) => {
    init[key] = {
      value: initFormValues[key]?.value ?? initFormValues[key],
      valid: initFormValues[key]?.valid ?? false,
      touched: initFormValues[key]?.touched ?? false,
    };
  });
  const [form, setForm] = useState(init);
  const [submitting, setSubmitting] = useState(false);
  const [valid, setValid] = useState(false);
  const [message, setMessage] = useState(null);

  const handleInput = (value, name, valid) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { value, valid, touched: true },
    }));
  };

  const handleBlur = (name) => {
    setForm((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], touched: true },
    }));
  };

  const resetForm = () => {
    setForm(init);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setSubmitting(true);

    const values = {};
    Object.keys(form).forEach((field) => (values[field] = form[field].value));
    onSubmit(values, setSubmitting, resetForm, setMessage);
  };

  useEffect(() => {
    if (Object.keys(form).some((field) => form[field].valid === false)) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [form]);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  const state = {
    submitting,
    valid,
    handlers: { handleInput, handleBlur },
  };

  return (
    <form noValidate onSubmit={handleSubmit} {...props}>
      {children(form, state)}
      <div
        className={`form__message ${message ? 'form__message_show' : ''}`}
        onClick={() => setMessage(null)}
      >
        {message}
      </div>
      <div
        className={`form__message form__message_type_loading ${
          !isFormReady ? 'form__message_show' : ''
        }`}
      >
        Форма загружается
      </div>
    </form>
  );
}

export default Form;
