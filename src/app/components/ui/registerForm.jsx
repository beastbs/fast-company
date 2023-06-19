import React, { useState, useEffect } from "react";
// import API from "../../api";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectedField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQuality } from "../../hooks/useQuality";
import { useProfession } from "../../hooks/useProfession";
import validatorConfig from "../../config/validatorConfig.json";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
  const { qualities } = useQuality();
  const qualitiesList = qualities.map((q) => ({
    label: q.name,
    value: q._id,
    color: q.color
  }));
  const { professions } = useProfession();
  const professionsList = professions.map(p => ({
    label: p.name,
    value: p._id
  }));
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    gender: "male",
    qualities: [],
    licence: false
  });
  const [errors, setErrors] = useState({});
  const { signUp } = useAuth();

  // const [professions, setProfessions] = useState([]);
  // const [qualities, setQualities] = useState({});
  // useEffect(() => {
  //   API.qualities.fetchAll().then((data) => setQualities(data));
  //   API.professions.fetchAll().then((data) => setProfessions(data));
  // }, []);

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
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

    const newData = {
      ...data,
      qualities: data.qualities.map((q) => q.value)
    };
    console.log(newData);
    signUp(newData);
  };

  const handleReset = () => {
    setData({
      email: "",
      password: "",
      profession: "",
      gender: "male",
      qualities: []
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
        name="profession"
        value={data.profession}
        onChange={handleChange}
        options={professionsList}
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
      <MultiSelectField
        options={qualitiesList}
        defaultValue={data.qualities}
        name="qualities"
        onChange={handleChange}
        label="Выберите качество"
      />
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        Подтвердить <a href="#">лицензионное соглашение</a>
      </CheckBoxField>
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
