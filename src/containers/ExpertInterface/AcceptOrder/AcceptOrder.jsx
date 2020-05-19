import React, { useState } from "react";
import "./AcceptOrder.scss";
import map from "../../../images/map.png";
import CheckBox from "../../../components/UI/CheckBox/CheckBox";
import Button from "../../../components/UI/Button/Button";
import { FaAngleDown } from "react-icons/fa";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { acceptOrder } from "../../../store/actions/order";

const AcceptOrder = ({ history, acceptOrder }) => {
  const [mapVisibility, setMapVisibility] = useState(false);

  const showMap = () => {
    setMapVisibility(!mapVisibility);
  };

  const noop = () => {};

  const goBack = () => {
    history.goBack();
  };

  return (
    <div className="OrderDetails">
      <div className="block1">
        <div>
          <p className="order-price">1000руб.</p>
          <p>До 3 августа 18:00</p>
          <p>Осмотр автомобиля</p>
        </div>

        <div className="block1-photos">
          <div className="photo" />
          <div className="photo" />
          <div className="photo" />
        </div>
      </div>

      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Категория</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <span>Услуги</span>
        </div>
      </div>
      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Подкатегория</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <span>Авто</span>
        </div>
      </div>
      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Вид услуг</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <span>Диагностика/Подбор авто</span>
        </div>
      </div>

      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Стоимость товара</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <span>650 000 руб.</span>
        </div>
      </div>

      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Местоположение</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <span>Санкт-Петербург, ул. Комиссара Смирнова, д. 15, оф. 343</span>
          <span className="place-detail">
            (Вход через служебную проходную, слева от главного входа. Салон
            “Максимум”)
          </span>
        </div>
        <span className="mapLink" onClick={showMap}>
          {mapVisibility ? "Скрыть карту" : "Показать на карте"}
        </span>
        {mapVisibility && (
          <div className="map">
            <img src={map} alt="карта" />
          </div>
        )}
      </div>

      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Описание</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <span>
            Хочу купить Hyundai Solaris 2019г., новый, цвет кузова - Синий.
            Комплектации Active Plus 4D 1.6 АT 20 MY Автомобиль продается
            официальным дилером Hyundai Максимум. Необходимо осмотреть авто
            перед покупкой. Описать + и -{" "}
          </span>
        </div>
      </div>

      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Задачи</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <ul className="tasks">
            <li>Видеосъемка</li>
            <li>
              Фотосъемка <FaAngleDown color="#333333" size={10} />
              <ul className="sublist">
                <li>Документы продавца</li>
                <li>Правоустанавливающие документы</li>
                <li>Объект, комплектация</li>
                <li>Техническая документация</li>
                <li>Фиксация работоспособности</li>
              </ul>
            </li>
            <li>Стриминг</li>
            <li>Профессиональная диагностика объекта</li>
            <li>Пробивка по базам</li>
            <li>Дополнительная проверка</li>
          </ul>
          <div className="extra-options">
            <input type="text" placeholder="Что еще желаете проверить?" />
          </div>
        </div>
      </div>

      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Доставка</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <span>Нет</span>
        </div>
      </div>

      <div className="OrderDetails-confirm">
        <div className="OrderDetails-confirm-header">
          <span>Созвон с продавцом</span>
        </div>
        <div className="OrderDetails-confirm-detail">
          <span>Нужен</span>
        </div>
      </div>

      <div className="insurance">
        <CheckBox
          checked={true}
          type="expert"
          onChange={noop}
          label={"Застраховать заказ за 100 рублей"}
        />
      </div>
      <div className="rules">
        <CheckBox
          checked={true}
          type="expert"
          onChange={noop}
          label={`Нажимая кнопку "Принять заказ", вы принимаете Правила использования сервиса`}
        />
      </div>

      <div className="buttons">
        <Button onClick={goBack} type="secondary">
          Вернуться
        </Button>

        <Button
          onClick={() => {
            acceptOrder(1);
            history.push("/expert/search");
          }}
          type="primary"
          disabled={false}
        >
          Принять заказ
        </Button>
      </div>
    </div>
  );
};

export default connect(null, { acceptOrder })(withRouter(AcceptOrder));
