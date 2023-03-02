import React, { useEffect, useState } from "react";
import TextField from "../components/textField";
import { validator } from "../utils/validator";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Электронная почта обязательна для заполнения"
      }
    },
    password: {
      isRequired: {
        message: "Пороль обязателен для заполнения"
      }
    }
  };

  const validate = () => {
    // const errors = {};
    // for (const fieldName in data) {
    //   if (data[fieldName].trim() === "") {
    //     errors[fieldName] = `${fieldName} обязателен для заполнения`;
    //   }
    // }
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();

    if (!isValid) {
      console.log("errors", errors);
      return;
    }

    console.log(data);
  };

  const handleReset = () => {
    setData({
      email: "",
      password: ""
    });
  };
  return (
    <form className="m-2" onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пороль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <button type="submit" className="btn btn-success">
        Подтвердить
      </button>
      <button type="reset" className="btn btn-danger" onClick={handleReset}>
        Сбросить
      </button>
    </form>
  );
};

export default Login;
