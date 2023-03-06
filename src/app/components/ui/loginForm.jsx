import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";

const LoginForm = () => {
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
      },
      isEmail: {
        message: "Email введен некорректно"
      }
    },
    password: {
      isRequired: {
        message: "Пороль обязателен для заполнения"
      },
      isCapitalSymbol: {
        message: "Пороль должен содержать минимум одну заглавную букву"
      },
      isContainDigit: {
        message: "Пороль должен содержать минимум одно число"
      },
      min: {
        message: "Пороль должен содержать минимум 8 символов",
        value: 8
      },
      max: {
        message: "Пороль должен содержать максимум 36 символов",
        value: 36
      }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

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
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <h3 className="mb-4">Login</h3>
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
            <button
              type="submit"
              className="btn btn-success"
              disabled={!isValid}
            >
              Подтвердить
            </button>
            <button
              type="reset"
              className="btn btn-danger"
              onClick={handleReset}
            >
              Сбросить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
