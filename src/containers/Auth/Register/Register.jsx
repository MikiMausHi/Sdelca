import React, { useState } from "react";
import {
  createControl,
  validate,
  validateForm
} from "../../../form/formFramework";
import Switcher from "../Switcher/Switcher";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";
import classes from "./Register.module.scss";
import CheckBox from "../../../components/UI/CheckBox/CheckBox";

const Register = ({ mode, switchMode }) => {
  const createFormControls = () => {
    return {
      fio: createControl(
        {
          placeholder: "ФИО",
          errorMessage: "Поле не может быть пустым"
        },
        {
          required: true
        }
      ),
      email: createControl(
        {
          placeholder: "e-mail",
          errorMessage: "Введите корректный e-mail"
        },
        {
          required: true,
          email: true
        }
      ),
      password: createControl(
        {
          placeholder: "пароль",
          type: "password",
          errorMessage: "Пароль не может быть короче 6 символов"
        },
        {
          required: true,
          minLength: 6
        }
      ),
      confirmPassword: createControl(
        {
          placeholder: "повторите пароль",
          type: "password",
          errorMessage: "Пароли не совпадают"
        },
        {
          required: true,
          confirmPassword: true
        }
      ),
      phone: createControl(
        {
          placeholder: "телефон",
          errorMessage: "Введите корректный телефон"
        },
        {
          required: true,
          phone: true
        }
      )
    };
  };

  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setIsFormValid] = useState(false);
  const [personalData, setPersonalData] = useState(false);

  const changeHandler = (val, controlName) => {
    const fControls = { ...formControls };
    const control = { ...fControls[controlName] };
    control.touched = true;
    control.value = val;

    if (controlName === "confirmPassword") {
      control.valid = validate(
        control.value,
        control.validation,
        fControls["password"].value
      );
    } else {
      control.valid = validate(control.value, control.validation);
    }

    fControls[controlName] = control;
    setFormControls(fControls);
    setIsFormValid(validateForm(fControls));
  };

  const renderControls = () => {
    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <React.Fragment key={controlName + index}>
          <Input
            label={control.label}
            placeholder={control.placeholder}
            type={control.type}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={e => changeHandler(e.target.value, controlName)}
          />
        </React.Fragment>
      );
    });
  };

  return (
    <div className={classes.Register}>
      <Switcher onClick={switchMode} mode={mode} />
      <div className={classes.body}>
        <span className={classes.header}>Введите данные</span>
        {renderControls()}
        <span className={classes.sms}>
          В течение 5 минут Вам придет код в СМС сообщении
        </span>

        <div className={classes.confirmCode}>
          <input type="number" placeholder="код" className={classes.code} />
          <span className={classes.checked}>
            <i className="fa fa-check"></i>
          </span>
        </div>

        <span className={classes.resend}>
          Выслать код повторно через 60 сек
        </span>

        <div className={classes.personal}>
          <CheckBox
            onChange={() => setPersonalData(!personalData)}
            checked={personalData}
            type='auth'
            label="Я согласен на обработку персональных данных"
          />
        </div>

        <div className={classes.btn}>
          <Button type="primary" disabled={!isFormValid}>
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
