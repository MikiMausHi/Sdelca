import React, {useState} from "react";
import RadioGroup from "../../components/UI/RadioGroup/RadioGroup";
import Button from "../../components/UI/Button/Button";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import PropTypes from "prop-types";
import CheckBox from "../../components/UI/CheckBox/CheckBox";
import map from "../../images/map.png";
import downArrow from "../../images/down.svg";
import upArrow from "../../images/up.svg";

const options = [
  {
    name: "deliveryType",
    value: "курьер",
    label: "Курьером по городу 500р."
  },
  {name: "deliveryType", value: "тк", label: "Транспортной компанией"},
  {name: "deliveryType", value: "нет", label: "Не нужна"}
];
const commissionOptions = [
  {
    name: "commissionPayer",
    value: "seller",
    label: "Продавец"
  },
  {name: "commissionPayer", value: "buyer", label: "Покаупатель"},
  {
    name: "commissionPayer",
    value: "50/50",
    label: "50% Продавец. 50% Покупатель"
  }
];

const Step4 = ({
                 step,
                 prevStep,
                 values,
                 handleChange,
                 changeAmount,
                 placeOrder
               }) => {

  const order = {...values}

  const [mapVisibility, setMapVisibility] = useState(false);

  const showMap = () => {
    setMapVisibility(!mapVisibility);
  };

  return (
    <>
      <BreadCrumb step={step}/>
      <h2>Уведомить ревизора о необходимости доставки</h2>
      <div className="delivery">
        <p>Выберите вид доставки</p>
        <div className="radio">
          <RadioGroup
            options={options}
            defaultValue={order.deliveryType}
            onChange={handleChange("deliveryType")}
          />
        </div>
      </div>

      {order.deliveryType === 'курьер' ? (
        <>
          <div className="address">
            <p>Адрес</p>
            <p>{order.addressText}</p>
            <span className="mapLink" onClick={showMap}>
          {mapVisibility ? "Скрыть карту" : "Показать на карте"}
        </span>
            {mapVisibility && (
              <div className="map">
                <img src={map} alt="карта"/>
              </div>
            )}
          </div>
          <div className="comment">
            <p>Комментарий для курьера</p>
            <textarea
              className="comment-area"
              value={order.deliveryComment}
              onChange={handleChange("deliveryComment")}
            />
          </div>
        </>
      ) : null}


      <div className="deal">
        <h2>Ваша сделка</h2>
        <div className="amount">
          <label className="amount-label">Стоимость сделки, руб. *</label>
          <div className="number-input">
            <input
              type="number"
              step="50"
              id="amount_id"
              className="amount-input"
              value={order.amount}
              onChange={handleChange("amount")}
            />
            <div className="arrows">
              <span
                className="arrow arrow-up"
                onClick={() => changeAmount("up")}
              >
                <img src={upArrow} alt="up"/>
              </span>
              <span className="arrow arrow-middle"/>
              <span
                className="arrow arrow-down"
                onClick={() => changeAmount("down")}
              >
                <img src={downArrow} alt="down"/>
              </span>
            </div>
          </div>

          <p className="commission">
            В том числе комиссия: {order.commission} Р.
          </p>
          <p>Кто платит комиссию?</p>
          <div className="radio">
            <RadioGroup
              options={commissionOptions}
              defaultValue={order.commissionPayer}
              onChange={handleChange("commissionPayer")}
            />
          </div>
          <p>Стоимость услуг Мастера: 500 Р.</p>
          <p>Дополнительные условия сделки: 350 Р.</p>

          <p>
            Доставка&nbsp;
            {order.deliveryType === "курьер"
              ? "курьером по городу: 500 Р."
              : order.deliveryType === "тк"
                ? "транспортной компанией: 0 Р."
                : "не нужна: 0 Р."}
          </p>

          <span className="amount-total">итого: {order.amountTotal} Р.</span>
        </div>
      </div>

      <div className="insurance">
        <CheckBox
          checked={order.insurance}
          onChange={handleChange("insurance")}
          label={"Застраховать заказ за 2000 рублей"}
        />
      </div>
      <div className="rules">
        <CheckBox
          checked={order.acceptRules}
          onChange={handleChange("acceptRules")}
          label={`Нажимая кнопку "Принять заказ", вы принимаете Правила использования сервиса`}
        />
      </div>

      <div className="buttons">
        <Button onClick={prevStep} type="secondary">
          Вернуться
        </Button>
        <Button
          onClick={placeOrder}
          type="primary"
          disabled={!order.acceptRules}
        >
          Заказать
        </Button>
      </div>
    </>
  );
};

Step4.propTypes = {
  step: PropTypes.number.isRequired,
  placeOrder: PropTypes.func.isRequired,
  prevStep: PropTypes.func.isRequired
};

export default Step4;
