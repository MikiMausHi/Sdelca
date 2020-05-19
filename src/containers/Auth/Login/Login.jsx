import React, {useState} from "react";
import {connect} from 'react-redux';
import {handleAuthData, userSignUpRequest} from '../../../store/actions/auth'
import {withRouter} from 'react-router-dom'
import {
  createControl,
  validate,
  validateForm
} from "../../../form/formFramework";
import classes from "./Login.module.scss";
import Switcher from "../Switcher/Switcher";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";

const Login = ({mode, switchMode, auth, userSignUpRequest, handleAuthData, history}) => {
  const createFormControls = () => {
    return {
      login: createControl(
        {
          placeholder: "e-mail или телефон",
          errorMessage: "Введите корректный e-mail или телефон"
        },
        {
          required: true,
          emailPhone: true
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
      )
    };
  };

  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setIsFormValid] = useState(false);

  const changeHandler = (val, controlName) => {
    const fControls = {...formControls};
    const control = {...fControls[controlName]};
    control.touched = true;
    control.value = val;
    control.valid = validate(control.value, control.validation);
    fControls[controlName] = control;
    setFormControls(fControls);
    setIsFormValid(validateForm(fControls));
  };

  const handleLogin = () => {
    const credential = {email: formControls.login.value, password: formControls.password.value}


    userSignUpRequest(credential)
      .then(({data}) => {
        if (data.role === 'client') {
          history.push('/client/newDeals')
        } else {
          history.push('/expert/search')
        }
        return handleAuthData(data)
      })
      .catch(error => console.log('authErros: ', error));
  }

  return (
    <div className={classes.Login}>
      <Switcher onClick={switchMode} mode={mode}/>
      <div className={classes.body}>
        <span className={classes.header}>Введите данные</span>
        <Input
          placeholder={formControls.login.placeholder}
          value={formControls.login.value}
          valid={formControls.login.valid}
          shouldValidate={!!formControls.login.validation}
          touched={formControls.login.touched}
          errorMessage={formControls.login.errorMessage}
          onChange={e => changeHandler(e.target.value, "login")}
        />
        <Input
          placeholder={formControls.password.placeholder}
          type={formControls.password.type}
          value={formControls.password.value}
          valid={formControls.password.valid}
          shouldValidate={!!formControls.password.validation}
          touched={formControls.password.touched}
          errorMessage={formControls.password.errorMessage}
          onChange={e => changeHandler(e.target.value, "password")}
        />
        <span className={classes.forgot}>Забыли пароль?</span>

        <Button type="primary" disabled={!isFormValid} onClick={handleLogin}>
          Войти
        </Button>
      </div>
    </div>
  );
};

export default connect(state => ({auth: state.auth}), {handleAuthData, userSignUpRequest})(withRouter(Login));
