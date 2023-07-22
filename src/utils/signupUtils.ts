import { useEffect, useState, MouseEvent } from "react";
import Cookies from "js-cookie";
import { SelectOption } from "./formUtils";

type HookOptions = {
  enabled: boolean;
};
export const API_AUTH_TOKEN_KEY = "api_auth_token";

const US_STATES_URL =
  "https://www.universal-tutorial.com/api/states/United%20States";

const getUSCitiesURL = (state: string) =>
  `https://www.universal-tutorial.com/api/cities/${state}`;

export const useStoreAuthToken = (options: HookOptions) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAPIData = async () => {
    setLoading(true);

    try {
      const apiResponse = await fetch(`${process.env.REACT_APP_API_URL}`, {
        headers: {
          Accept: "application/json",
          "api-token": process.env.REACT_APP_API_TOKEN || "",
          "user-email": process.env.REACT_APP_API_EMAIL || "",
        },
      });
      const json = await apiResponse.json();
      setData(json);

      if (json["auth_token"]) {
        Cookies.set(API_AUTH_TOKEN_KEY, json["auth_token"]);
      } else if (json["error"]) {
        // Show error for invalid auth credentials
        setError(`Internal Server Error. Please try again later.`);
        // Should log this to a monitoring service
        console.log(json["error"]);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
    return { data };
  };

  useEffect(() => {
    if (options.enabled) {
      fetchAPIData();
    }
  }, []);

  return { data, loading, error };
};

export const useGetUSStates = (options: HookOptions) => {
  const [data, setData] = useState<SelectOption[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAPIData = async () => {
    setLoading(true);

    try {
      const apiResponse = await fetch(US_STATES_URL, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get(API_AUTH_TOKEN_KEY)}`,
        },
      });
      const json = await apiResponse.json().then((data) => {
        return data?.map(({ state_name }) => ({
          label: state_name,
          value: state_name,
        }));
      });
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.enabled) {
      fetchAPIData();
    }
  }, []);

  const refetch = () => {
    fetchAPIData();
  };

  return { data, loading, error, refetch };
};

export const useGetUSCities = (options: HookOptions) => {
  const [data, setData] = useState<SelectOption[]>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchAPIData = async (state: string) => {
    setLoading(true);

    try {
      const apiResponse = await fetch(getUSCitiesURL(state), {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Cookies.get(API_AUTH_TOKEN_KEY)}`,
        },
      });
      const json = await apiResponse.json().then((data) => {
        return data?.map(({ city_name }) => ({
          label: city_name,
          value: city_name,
        }));
      });
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (options.enabled) {
      fetchAPIData(US_STATES_URL);
    }
  }, []);

  const refetch = (state) => {
    fetchAPIData(state);
  };

  return { data, loading, error, refetch };
};

export const LABEL_MAP = {
  firstName: "First Name",
  lastName: "Last Name",
  state: "State",
  city: "City",
  email: "Email",
  password: "Password",
};

export const DEFAULT_SIGNUP_VALUES = {
  firstName: "",
  lastName: "",
  state: "",
  city: "",
  email: "",
  password: "",
};

export type FormValues = {
  firstName: string;
  lastName: string;
  state: string;
  city: string;
  email: string;
  password: string;
};

export const handleFormValidation = (values: FormValues) => {
  const errors = {};
  Object.keys(DEFAULT_SIGNUP_VALUES).forEach((field) => {
    if (!values[field]) {
      errors[field] = `${LABEL_MAP[field]} is required`;
    }
  });
  return { errors };
};

export const handleFormSubmit = (
  e:
    | MouseEvent
    | MouseEvent<HTMLButtonElement, MouseEvent<Element, MouseEvent>>,
  values: FormValues,
  errors: Record<string, string>,
  setErrors: (errors: Record<string, string>) => void
) => {
  const { errors: validationErrors } = handleFormValidation(values);
  // Requirement to not submit the form
  e.preventDefault();

  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    return;
  }

  console.log("Submitting");
  console.log(values);
};
