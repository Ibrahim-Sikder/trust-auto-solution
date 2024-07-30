// File: src/components/form/Form.jsx

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { FormProvider, useForm } from "react-hook-form";

const TASForm = ({ children, onSubmit, resolver, defaultValues }) => {
  const formConfig = {};

  if (resolver) {
    formConfig.resolver = resolver;
  }
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  
  const methods = useForm(formConfig);
  const { handleSubmit, reset } = methods;

  const submit = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>{children}</form>
    </FormProvider>
  );
};

export default TASForm;
