import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import CheckBox from "../../components/UI/CheckBox/CheckBox";
import map from "../../images/map.png";
import RadioGroup from "../../components/UI/RadioGroup/RadioGroup";
import Button from "../../components/UI/Button/Button";
import CategorySelector from "../../components/CategorySelector/CategorySelector";
import WantedTimeSelector from "../../components/WantedTimeSelector/WantedTimeSelector";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import MomentLocaleUtils from "react-day-picker/moment";
import "react-datepicker/dist/react-datepicker-cssmodules.min.css";
import "moment/locale/ru";
import moment from "moment";
import { createControl, validate } from "../../form/formFramework";
import TimePicker from "react-times";
import "react-times/css/classic/default.css";

const options = [
  {
    name: "deliveryTime",
    value: "clientTime",
    label: "Я согласовал время осмотра"
  },
  {
    name: "deliveryTime",
    value: "expertTime",
    label: "Эксперт договорится об осмотре +50 руб."
  }
];

const formOptions = {
  formBuyer: {
    name: {
      placeholder: "Ваше имя"
    },
    email: {
      placeholder: "Ваш email"
    }
  },
  formSeller: {
    name: {
      placeholder: "Имя"
    },
    email: {
      placeholder: "email"
    }
  }
};

const Step1 = ({ step, nextStep, values, handleChange }) => {
  const createFormControls = formOptions => {
    return Object.keys(formOptions).map(form => {
      return {
        name: createControl(
          {
            placeholder: formOptions[form].name.placeholder,
            errorMessage: "Введите имя от 2 до 20 символов"
          },
          {
            required: true,
            minLength: 2,
            maxLength: 20
          }
        ),
        email: createControl(
          {
            placeholder: formOptions[form].email.placeholder,
            errorMessage: "Введите корректный e-mail"
          },
          {
            required: true,
            email: true
          }
        ),
        phone: createControl(
          {
            placeholder: "Тел.: +__(____) ____-____",
            errorMessage: "Введите телефон в формате +79991234567"
          },
          {
            required: true,
            phone: true
          }
        )
      };
    });
  };

  const order = { ...values };

  const formBuyerValid =
      Object.keys(order.formInfoValid[0]).length === 3 &&
      Object.keys(order.formInfoValid[0])
        .map(key => order.formInfoValid[0][key])
        .every(item => item === true),
    formSellerValid =
      Object.keys(order.formInfoValid[1]).length === 3 &&
      Object.keys(order.formInfoValid[1])
        .map(key => order.formInfoValid[1][key])
        .every(item => item === true);

  const [formControls, setFormControls] = useState(
    createFormControls(formOptions)
  );

  const changeHandler = (event, controlName, num) => {
    const allFControls = { ...formControls };
    const fControls = { ...formControls[num] };
    const control = { ...fControls[controlName] };
    control.value = event.target.value;

    control.valid = validate(control.value, control.validation);

    order.formInfoValid[num][controlName] = control.valid;
    handleChange("formInfoValid")({ target: { value: order.formInfoValid } });

    fControls[controlName] = control;
    allFControls[num] = fControls;
    setFormControls(allFControls);
  };

  const focusHandler = (controlName, num) => {
    const allFControls = { ...formControls };
    const fControls = { ...formControls[num] };
    const control = { ...fControls[controlName] };

    control.touched = true;

    fControls[controlName] = control;
    allFControls[num] = fControls;
    setFormControls(allFControls);
  };

  const [showLocationComment, setShowLocationComment] = useState(false);

  const [mapVisibility, setMapVisibility] = useState(false);
  const showMap = () => {
    setMapVisibility(!mapVisibility);
  };

  const [showPicker, setShowPicker] = useState(false);
  const [showPickerTime, setShowPickerTime] = useState(false);

  const setSelectedDate = val => {
    setShowPicker(!showPicker);
    const searchDate = [
      moment(val).day(),
      moment(val).month() + 1,
      moment(val).year()
    ];
    const today = moment();
    const todayDate = [today.day(), today.month() + 1, today.year()];

    if (
      searchDate[2] > todayDate[2] ||
      (searchDate[2] === todayDate[2] && searchDate[1] > todayDate[1]) ||
      (searchDate[2] === todayDate[2] &&
        searchDate[1] === todayDate[1] &&
        searchDate[0] >= todayDate[0])
    ) {
      const e = {
        target: { value: `${moment(val).format("dddd, D MMMM YYYY")}` }
      };
      handleChange("dealDate")(e);
    }
  };

  const setSelectedTime = val => {
    setShowPickerTime(!showPickerTime);
    const e = { target: { value: val } };
    handleChange("dealTime")(e);
  };

  const setSelectedWantedTime = val => {
    const e = { target: { value: val } };
    handleChange("wantedDealTime")(e);
  };

  const validateRequire = () => {
    const {
      category,
      adName,
      objPrice,
      objLocation,
      clientSetDateTime,
      dealDate,
      dealTime,
      acceptRules
    } = order;

    return false;
    // (!category || category === 'Категория' || !adName.trim() || !objPrice || !objLocation || !formBuyerValid || !formSellerValid || (clientSetDateTime && (!dealDate || !dealTime)) || !acceptRules)
  };

  return (
    <div className="step1">
      <BreadCrumb step={step} />
      <p>
        Перед созданием защищенной сделки договоритесь с вашим партнером об
        условиях сделки и заполните поля на этой странице. Дальнейшую обработку
        защищенной сделки мы возьмем на себя.
      </p>
      <h2
        className="header"
        style={
          order.category && order.category !== "Категория"
            ? { color: "#000000" }
            : { color: "crimson" }
        }
      >
        Выберите категорию*
      </h2>
      <div className="categories">
        <CategorySelector
          value={order.category}
          onChange={handleChange("category")}
        />
      </div>
      <div className="cb-wrapper">
        <CheckBox
          checked={order.creatingVideo}
          label="Видеосъемка"
          onChange={handleChange("creatingVideo")}
        />
      </div>
      <div className="cb-wrapper">
        <CheckBox
          checked={order.creatingPhoto}
          label="Фотосъемка"
          onChange={handleChange("creatingPhoto")}
        />
      </div>
      <div className="sub-variants">
        <p>Выберите необходимые варианты</p>
        <div className="variants-list">
          <div className="variant">
            <CheckBox
              checked={order.sellerDocuments}
              onChange={handleChange("sellerDocuments")}
              leftLabel={true}
              label="Документы продавца"
            />
          </div>
          <div className="variant">
            <CheckBox
              checked={order.lawDocuments}
              onChange={handleChange("lawDocuments")}
              leftLabel={true}
              label="Правоустанавливающие документы"
            />
          </div>
          <div className="variant">
            <CheckBox
              checked={order.objKit}
              onChange={handleChange("objKit")}
              leftLabel={true}
              label="Объект, комплектация"
            />
          </div>
          <div className="variant">
            <CheckBox
              checked={order.techDocuments}
              onChange={handleChange("techDocuments")}
              leftLabel={true}
              label="Техническая документация"
            />
          </div>
          <div className="variant">
            <CheckBox
              checked={order.functionalCheck}
              onChange={handleChange("functionalCheck")}
              leftLabel={true}
              label="Фиксация работоспособности"
            />
          </div>
        </div>
      </div>
      <div className="cb-wrapper">
        <CheckBox
          checked={order.streaming}
          label="Стриминг"
          onChange={handleChange("streaming")}
        />
      </div>
      <div className="cb-wrapper">
        <CheckBox
          checked={order.profDiagObj}
          label="Профессиональная диагностика объекта"
          onChange={handleChange("profDiagObj")}
        />
      </div>
      <div className="cb-wrapper">
        <CheckBox
          checked={order.baseChecking}
          label="Пробивка по базам"
          onChange={handleChange("baseChecking")}
        />
      </div>
      <div className="cb-wrapper">
        <CheckBox
          checked={order.additionalCheck}
          label="Дополнительная проверка, свои опции"
          onChange={handleChange("additionalCheck")}
        />
      </div>

      {order.additionalCheck && (
        <div className="sub-variants">
          <p>Выберите необходимые опции</p>
          <input
            type="text"
            placeholder="Введите текст"
            className="simpleInput"
            value={order.additionalCheckText}
            onChange={handleChange("additionalCheckText")}
          />
        </div>
      )}

      <div className="adInput">
        <label
          style={order.adName ? { color: "#000000" } : { color: "crimson" }}
        >
          Название объявления*
        </label>
        <input
          type="text"
          placeholder="Введите текст"
          value={order.adName}
          onChange={handleChange("adName")}
          style={
            order.adName
              ? { border: "1px solid #e3e6e9" }
              : { border: "1px solid crimson" }
          }
        />
      </div>

      <div className="description">
        <label>Описание услуги</label>
        <div className="description-block">
          <textarea
            className="description-area"
            value={order.objDescription}
            onChange={handleChange("objDescription")}
          />
          <div className="step1-comment">
            <p>
              Добавьте подробную информацию о предмете сделки. Советуем указать
              четкое описание услуги и уточняющие детали. В случае возникновения
              спора мы будем опираться на это описание.
            </p>
            <p>
              Вы можете добавить ссылку на описание товара или услуги. Например,
              Б/у ноутбук https://avito.ru/123456789
            </p>
          </div>
        </div>
      </div>

      <div className="adInput">
        <label
          style={order.objPrice ? { color: "#000000" } : { color: "crimson" }}
        >
          Стоимость услуги*
        </label>
        <input
          type="text"
          value={order.objPrice}
          onChange={handleChange("objPrice")}
          style={
            order.objPrice
              ? { border: "1px solid #e3e6e9" }
              : { border: "1px solid crimson" }
          }
        />
      </div>

      <div className="upload">
        <p>Загрузить фото</p>
        <div className="upload-block">
          <div className="upload-photo" />
          <span>Не более 10 штук</span>
        </div>
      </div>

      <div className="adInput place-input">
        <label
          style={
            order.objLocation ? { color: "#000000" } : { color: "crimson" }
          }
        >
          Местоположение услуги*
        </label>
        <input
          type="text"
          value={order.objLocation ? order.objLocation : ""}
          onChange={handleChange("objLocation")}
          style={
            order.objLocation
              ? { border: "1px solid #e3e6e9" }
              : { border: "1px solid crimson" }
          }
        />
      </div>

      <span className="mapLink" onClick={showMap}>
        {mapVisibility ? "Скрыть карту" : "Показать на карте"}
      </span>
      {mapVisibility && (
        <div className="map">
          <img src={map} alt="карта" />
        </div>
      )}

      <div className="commentForRevisor">
        <span onClick={() => setShowLocationComment(true)}>
          Добавить комментарий для ревизора
        </span>
      </div>

      {showLocationComment && (
        <div className="sub-variants">
          <p>Здесь можно уточнить адрес</p>
          <input
            type="text"
            placeholder="Введите текст"
            className="simpleInput"
            value={order.locationComment}
            onChange={handleChange("locationComment")}
          />
        </div>
      )}

      <h2 className="header">Данные сторон</h2>
      <p>
        Эта информация нужна для создания и управления сделкой, а также для
        отслеживания ее статусов.
        <br />
        Указанные данные не используются для рекламных рассылок и не передаются
        третьим лицам.
      </p>

      <div className="persons">
        <div className="persons-data">
          <p
            style={formBuyerValid ? { color: "#000000" } : { color: "crimson" }}
          >
            Ваши данные*
          </p>
          <input
            type="text"
            placeholder={formControls[0].name.placeholder}
            value={
              order.buyerInfo.hasOwnProperty("name") ? order.buyerInfo.name : ""
            }
            onChange={event => {
              handleChange("buyerInfo.name")(event);
              changeHandler(event, "name", 0);
            }}
            onBlur={() => focusHandler("name", 0)}
            style={
              order.formInfoValid[0].name
                ? { border: "1px solid #e3e6e9" }
                : { border: "1px solid crimson" }
            }
          />
          {!formControls[0].name.valid && formControls[0].name.touched && (
            <p className="input-errorMessage">
              {formControls[0].name.errorMessage || "Введите верное значение"}
            </p>
          )}
          <input
            type="text"
            placeholder={formControls[0].email.placeholder}
            value={
              order.buyerInfo.hasOwnProperty("email")
                ? order.buyerInfo.email
                : ""
            }
            onChange={event => {
              handleChange("buyerInfo.email")(event);
              changeHandler(event, "email", 0);
            }}
            onBlur={() => focusHandler("email", 0)}
            style={
              order.formInfoValid[0].email
                ? { border: "1px solid #e3e6e9" }
                : { border: "1px solid crimson" }
            }
          />
          {!formControls[0].email.valid && formControls[0].email.touched && (
            <p className="input-errorMessage">
              {formControls[0].email.errorMessage || "Введите верное значение"}
            </p>
          )}
          <input
            type="text"
            placeholder={formControls[0].phone.placeholder}
            value={
              order.buyerInfo.hasOwnProperty("phone")
                ? order.buyerInfo.phone
                : ""
            }
            onChange={event => {
              handleChange("buyerInfo.phone")(event);
              changeHandler(event, "phone", 0);
            }}
            onBlur={() => focusHandler("phone", 0)}
            style={
              order.formInfoValid[0].phone
                ? { border: "1px solid #e3e6e9" }
                : { border: "1px solid crimson" }
            }
          />
          {!formControls[0].phone.valid && formControls[0].phone.touched && (
            <p className="input-errorMessage">
              {formControls[0].phone.errorMessage || "Введите верное значение"}
            </p>
          )}
        </div>
        <div className="persons-data">
          <p
            style={
              formSellerValid ? { color: "#000000" } : { color: "crimson" }
            }
          >
            Данные продавца*
          </p>
          <input
            type="text"
            placeholder={formControls[1].name.placeholder}
            value={
              order.sellerInfo.hasOwnProperty("name")
                ? order.sellerInfo.name
                : ""
            }
            onChange={event => {
              handleChange("sellerInfo.name")(event);
              changeHandler(event, "name", 1);
            }}
            onBlur={() => focusHandler("name", 1)}
            style={
              order.formInfoValid[1].name
                ? { border: "1px solid #e3e6e9" }
                : { border: "1px solid crimson" }
            }
          />
          {!formControls[1].name.valid && formControls[1].name.touched && (
            <p className="input-errorMessage">
              {formControls[1].name.errorMessage || "Введите верное значение"}
            </p>
          )}
          <input
            type="text"
            placeholder={formControls[1].email.placeholder}
            value={
              order.sellerInfo.hasOwnProperty("email")
                ? order.sellerInfo.email
                : ""
            }
            onChange={event => {
              handleChange("sellerInfo.email")(event);
              changeHandler(event, "email", 1);
            }}
            onBlur={() => focusHandler("email", 1)}
            style={
              order.formInfoValid[1].email
                ? { border: "1px solid #e3e6e9" }
                : { border: "1px solid crimson" }
            }
          />
          {!formControls[1].email.valid && formControls[1].email.touched && (
            <p className="input-errorMessage">
              {formControls[1].email.errorMessage || "Введите верное значение"}
            </p>
          )}
          <input
            type="text"
            placeholder={formControls[1].phone.placeholder}
            value={
              order.sellerInfo.hasOwnProperty("phone")
                ? order.sellerInfo.phone
                : ""
            }
            onChange={event => {
              handleChange("sellerInfo.phone")(event);
              changeHandler(event, "phone", 1);
            }}
            onBlur={() => focusHandler("phone", 1)}
            style={
              order.formInfoValid[1].phone
                ? { border: "1px solid #e3e6e9" }
                : { border: "1px solid crimson" }
            }
          />
          {!formControls[1].phone.valid && formControls[1].phone.touched && (
            <p className="input-errorMessage">
              {formControls[1].phone.errorMessage || "Введите верное значение"}
            </p>
          )}
        </div>
      </div>

      <div className="deliveryTime">
        <RadioGroup
          options={options}
          defaultValue={order.clientSetDateTime ? "clientTime" : "expertTime"}
          onChange={handleChange("clientSetDateTime")}
        />
      </div>

      {order.clientSetDateTime && (
        <>
          <h2
            className="confirm-header"
            style={
              order.dealDate && order.dealTime
                ? { color: "#000000" }
                : { color: "crimson" }
            }
          >
            Согласованная дата и время сделки*
          </h2>
          <div className="confirm-section2">
            <div
              className="date"
              onClick={() => {
                if (showPickerTime) {
                  setShowPickerTime(!showPickerTime);
                }
                setShowPicker(!showPicker);
              }}
            >
              {order.dealDate && (
                <>
                  <span style={{ marginLeft: "-10px" }}>Дата осмотра:</span>
                  <span className="big">
                    {moment(order.dealDate, "dddd, D MMMM YYYY").format(
                      "DD.MM.YYYY"
                    )}
                  </span>
                </>
              )}
              {!order.dealDate && (
                <>
                  <FaRegCalendarAlt color="#27536B" />
                  <span>Выберите дату</span>
                </>
              )}
            </div>

            <div
              className="time"
              onClick={() => {
                if (showPicker) {
                  setShowPicker(!showPicker);
                }
                setShowPickerTime(!showPickerTime);
              }}
            >
              <FaRegClock color="#27536B" />
              <span>{order.dealTime ? order.dealTime : "Выберите время"}</span>
            </div>
          </div>
          {showPicker && (
            <div className="day_picker_deal">
              <DayPicker
                locale="ru"
                localeUtils={MomentLocaleUtils}
                value={order.dealDate}
                onDayClick={setSelectedDate}
                modifiers={{ disabled: { before: new Date() } }}
                className="DayPicker_myClass"
              />
            </div>
          )}
          {showPickerTime && (
            <div className="time_picker_deal">
              <TimePicker
                time={
                  order.dealTime
                    ? order.dealTime
                    : `${moment().format("HH:mm")}`
                }
                theme="classic"
                timeMode="24"
                withoutIcon={true}
                onTimeChange={setSelectedTime}
              />
            </div>
          )}
        </>
      )}

      {!order.clientSetDateTime && (
        <>
          <h2 className="confirm-header">Желаемая дата и время сделки</h2>
          <div className="confirm-section4">
            <WantedTimeSelector
              value={order.wantedDealDate}
              onChange={handleChange("wantedDealDate")}
            />
            <div className="time_picker_wanted">
              <TimePicker
                time={order.wantedDealTime}
                theme="classic"
                timeMode="24"
                withoutIcon={true}
                onTimeChange={setSelectedWantedTime}
              />
            </div>
          </div>
        </>
      )}
      {/* {showPicker && (
        <DayPicker
          locale="ru"
          localeUtils={MomentLocaleUtils}
          value={order.dealDate}
          onDayClick={setSelectedDate}
          modifiers={{disabled: {before: new Date()}}}
          className="DayPicker_myClass"
        />
      )}
      {showPickerTime && (
        <TimePicker 
          time={order.dealTime ? `${order.dealTime.hour} : ${order.dealTime.minute}` : ''}
          theme="classic"
          timeMode="24"
          withoutIcon={true}
          onTimeChange={setSelectedTime}
        />
      )} */}

      <div className="insurance">
        <CheckBox
          checked={order.insurance}
          onChange={handleChange("insurance")}
          label={"Застраховать заказ за 2000 рублей"}
        />
      </div>
      <div className={order.acceptRules ? "rules" : "rules unselect"}>
        <CheckBox
          checked={order.acceptRules}
          onChange={handleChange("acceptRules")}
          label={`Нажимая кнопку "Принять заказ", вы принимаете Правила использования сервиса`}
        />
      </div>
      <div className="step1-buttons">
        <Button onClick={nextStep} type="primary" disabled={validateRequire()}>
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default Step1;
