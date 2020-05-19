import React, {useState} from "react";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Button from "../../components/UI/Button/Button";
import CheckBox from "../../components/UI/CheckBox/CheckBox";
import map from "../../images/map.png";

const Step2 = ({step, values, nextStep, prevStep, handleChange}) => {
  const order = {...values}
  const [mapVisibility, setMapVisibility] = useState(false);

  const showMap = () => {
    setMapVisibility(!mapVisibility);
  };
  return (
    <div className="step2">
      <BreadCrumb step={step}/>

      <h2 className="header">Осмотр автомобиля</h2>

      <div className="step2-confirm">
        <div className="step2-confirm-header">
          <span>Категория</span>
        </div>
        <div className="step2-confirm-detail">
          <span>{order.category}</span>
        </div>
      </div>
      <div className="step2-confirm">
        <div className="step2-confirm-header">
          <span>Название объявления</span>
        </div>
        <div className="step2-confirm-detail">
          <span>{order.adName}</span>
        </div>
      </div>
      <div className="step2-confirm">
        <div className="step2-confirm-header">
          <span>Стоимость товара</span>
        </div>
        <div className="step2-confirm-detail">
          <span>{order.objPrice} руб.</span>
        </div>
      </div>

      <div className="step2-confirm">
        <div className="step2-confirm-header">
          <span>Местоположение</span>
        </div>
        <div className="step2-confirm-detail">
          <span>{order.objLocation}</span>
          <span className="place-detail">
            {order.locationComment && `(${order.locationComment})`}
          </span>
        </div>
        <span className="mapLink" onClick={showMap}>
          {mapVisibility ? "Скрыть карту" : "Показать на карте"}
        </span>
        {mapVisibility && (
          <div className="map">
            <img src={map} alt="карта"/>
          </div>
        )}
      </div>

      <div className="step2-confirm">
        <div className="step2-confirm-header">
          <span>Описание</span>
        </div>
        <div className="step2-confirm-detail">
          <span>{order.objDescription}</span>
        </div>
      </div>

      {order.attachedPhotos.length > 0 && (
        <>
          <div className="step2-confirm">
            <div className="step2-confirm-header">
              <span>Фотографии</span>
            </div>
            <div className="step2-confirm-photos">
              <div className="photo"/>
              <div className="photo"/>
              <div className="photo"/>
            </div>
          </div>

        </>
      )}


      <div className="insurance">
        <CheckBox
          checked={order.insurance}
          onChange={handleChange("insurance")}
          label={"Застраховать заказ за 2000 рублей"}
        />
      </div>
      <div className={order.acceptRules ? 'rules' : 'rules unselect'}>
        <CheckBox
          checked={order.acceptRules}
          onChange={handleChange("acceptRules")}
          label={`Нажимая кнопку "Принять заказ", вы принимаете Правила использования сервиса`}
        />
      </div>

      <p className="step2-finish">
        Проверьте правильность указанной информации. Советуем указать четкое
        описание услуги и уточняющие детали. В случае возникновения спора мы
        будем опираться на это описание.
      </p>

      <div className="buttons">
        <Button onClick={prevStep} type="secondary">
          Вернуться
        </Button>

        <Button
          onClick={nextStep}
          type="primary"
          disabled={!order.acceptRules}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default Step2;
