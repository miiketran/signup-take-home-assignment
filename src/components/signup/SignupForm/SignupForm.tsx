import { ChangeEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Form, TextInput, Select } from "../../ui";
import {
  API_AUTH_TOKEN_KEY,
  DEFAULT_SIGNUP_VALUES,
  FormValues,
  LABEL_MAP,
  handleFormSubmit,
  useGetUSCities,
  useGetUSStates,
  useStoreAuthToken,
} from "../../../utils/signupUtils";
import css from "./SignupForm.module.css";

const SignupForm = () => {
  const [values, setValues] = useState<FormValues>(DEFAULT_SIGNUP_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: authToken, error: authError } = useStoreAuthToken({
    enabled: !Cookies.get(API_AUTH_TOKEN_KEY),
  });

  const {
    data: states,
    loading: isLoadingStates,
    refetch: refetchStates,
  } = useGetUSStates({
    enabled: !!Cookies.get(API_AUTH_TOKEN_KEY),
  });

  const {
    data: cities,
    loading: isLoadingCities,
    refetch: refetchCities,
  } = useGetUSCities({
    enabled: values?.state && !!Cookies.get(API_AUTH_TOKEN_KEY),
  });

  useEffect(() => {
    if (!states && authToken) {
      refetchStates();
    }
  }, [authToken]);

  useEffect(() => {
    if (values?.state) {
      refetchCities(values.state);
    }
  }, [values?.state]);

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      e.target.name &&
      e.target.value !== values[e.target.name as keyof FormValues]
    ) {
      setValues({ ...values, [e?.target.name]: e?.target.value });
    }
  };

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    overrideValues?: { [key: string]: string }
  ) => {
    if (
      e.target.name &&
      e.target.value !== values[e.target.name as keyof FormValues]
    ) {
      setValues({
        ...values,
        [e?.target.name]: e?.target.value,
        ...overrideValues,
      });
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <Form className={css.form}>
        <TextInput
          label={LABEL_MAP.firstName}
          name="firstName"
          onChange={handleTextInputChange}
          error={errors.firstName}
        />
        <TextInput
          label={LABEL_MAP.lastName}
          name="lastName"
          onChange={handleTextInputChange}
          error={errors.lastName}
        />
        <Select
          label={LABEL_MAP.state}
          name="state"
          isLoading={isLoadingStates}
          onChange={(e) => {
            handleSelectChange(e, { city: "" });
          }}
          options={states || []}
          error={errors.state}
        />
        <Select
          label={LABEL_MAP.city}
          name="city"
          isLoading={isLoadingCities}
          onChange={handleSelectChange}
          options={cities || []}
          error={errors.city}
        />
        <TextInput
          label={LABEL_MAP.email}
          name="email"
          type="email"
          className={css["col-span-2"]}
          onChange={handleTextInputChange}
          error={errors.email}
        />
        <TextInput
          label={LABEL_MAP.password}
          name="password"
          type="password"
          className={css["col-span-2"]}
          onChange={handleTextInputChange}
          error={errors.password}
        />
        <button
          disabled={authError}
          type="submit"
          onClick={(e) => handleFormSubmit(e, values, errors, setErrors)}
        >
          Submit
        </button>
        {authError && <p className={css["error-text"]}>{authError}</p>}
      </Form>
    </>
  );
};

export default SignupForm;
