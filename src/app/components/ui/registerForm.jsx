import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectedField from "../common/form/selectField";
import API from "../../api";
import RadioField from "../common/form/radioField";

const RegisterForm = () => {
  const [professions, setProfessions] = useState();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    gender: "male"
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.professions.fetchAll().then((prof) => setProfessions(prof));
  }, []);

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
    },
    profession: {
      isRequiredProfession: {
        message: "Профессия обязательна для выбора"
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
    <form className="m-2" onSubmit={handleSubmit}>
      <TextField
        label="*Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="*Пороль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <SelectedField
        label="*Выберите вашу профессию"
        value={data.profession}
        onChange={handleChange}
        options={professions}
        error={errors.profession}
      />

      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" }
        ]}
        value={data.gender}
        onChange={handleChange}
        name="gender"
        label="*Выберите ваш пол"
      />
      <button type="submit" className="btn btn-success" disabled={!isValid}>
        Подтвердить
      </button>
      <button type="reset" className="btn btn-danger" onClick={handleReset}>
        Сбросить
      </button>
    </form>
  );
};

export default RegisterForm;
