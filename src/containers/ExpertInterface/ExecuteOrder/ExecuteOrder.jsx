import React, { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { MdPhoneForwarded } from "react-icons/md";
import map from "../../../images/map.png";
import CheckBox from "../../../components/UI/CheckBox/CheckBox";
import Button from "../../../components/UI/Button/Button";
import CountDown from "../../../components/CountDown/CountDown";
import UploadFiles from "../../../components/UploadFiles/UploadFiles";
import "./ExecuteOrder.scss";
import skype from "../../../images/messengers/skype.svg";
import whatsapp from "../../../images/messengers/whatsapp.svg";
import viber from "../../../images/messengers/viber.svg";
import telegram from "../../../images/messengers/telegram.svg";

const ExecuteOrder = () => {
  const [mapVisibility, setMapVisibility] = useState(false);
  const showMap = () => {
    setMapVisibility(!mapVisibility);
  };

  const [uploadVisibility, setUploadVisibility] = useState(false);
  const showUpload = () => {
    setUploadVisibility(!uploadVisibility);
  };

  const confirm = () => {
    console.log("Confirm pressed");
  };

  return (
    <div className="wrapper">
      <h2 className="confirm-header">Данные сторон</h2>
      <div className="confirm-section1">
        <div className="confirm-revisor">
          <div className="confirm-revisor-title">
            <p>Иван Сусанин, тел +79113745248</p>
            <span>
              <MdPhoneForwarded color="#333333" />
            </span>
          </div>

          <span>Заказчик</span>
        </div>
        <div className="countdown">
          <CountDown date="2020-05-01 17:00" />
        </div>
      </div>
      <h2 className="confirm-header">Согласованная дата и время сделки</h2>
      <div className="confirm-section2">
        <div className="date">
          <FaRegCalendarAlt color="#27536B" />
          <span>Выберите дату</span>
        </div>
        <div className="time">
          <FaRegClock color="#27536B" />
          <span>Выберите время</span>
        </div>
      </div>

      <div className="execute-btn">
        <Button onClick={confirm} type="primary" disabled>
          Подтвердить
        </Button>
      </div>

      <div className="section">
        <CheckBox
          type="expert"
          checked={true}
          label={"Принял заказ"}
          onChange={() => {}}
        />
      </div>

      <h2 className="confirm-header">Выполнение заказа</h2>

      <div className="confirm-section3">
        <div className="confirm-section3-step">
          <CheckBox
            type="expert"
            checked={false}
            label={"Выехал на адрес"}
            onChange={() => {}}
          />
          <span className="fixtime">
            1:30<span className="fixseconds">:30</span>
          </span>
        </div>
        <div className="place">
          <h3>Местоположение</h3>
          <p className="place-address">
            Санкт-Петербург, ул. Комиссара Смирнова, д. 15, оф. 343
            <br />
            <span>
              (Вход через служебную проходную, слева от главного входа. Салон
              “Максимум”)
            </span>
          </p>

          <span className="mapLink" onClick={showMap}>
            {mapVisibility ? "Скрыть карту" : "Показать на карте"}
          </span>
          {mapVisibility && (
            <div className="map">
              <img src={map} alt="карта" />
            </div>
          )}
        </div>
        <div className="confirm-btn">
          <Button onClick={confirm} type="primary">
            Подтвердить
          </Button>
        </div>
      </div>
      <h2 className="confirm-header">Проверка</h2>
      <div className="confirm-section3">
        <div className="confirm-section3-step">
          <CheckBox
            type="expert"
            checked={true}
            label={"Сделать 10 фото автомобиля"}
            onChange={() => {}}
            // color={loadedFiles.length >= 3 ? "#333333" : "red"}
          />
          <span className="fixtime">
            3:25<span className="fixseconds">:15</span>
          </span>
        </div>

        <h2 className="header">Описание</h2>
        <p className="photo-description">
          Внимание! Фотографии должны быть четкие и соответствовать инструкциям
          к данной категории товаров или услуг.
        </p>
        <p className="upload-files-link" onClick={showUpload}>
          Загрузить файлы
        </p>

        {uploadVisibility && <UploadFiles />}
      </div>

      <div className="section">
        <CheckBox
          type="expert"
          // checked={false}
          label={"Профессиональная диагностика объекта"}
          onChange={() => {}}
        />
      </div>
      <div className="section">
        <CheckBox
          type="expert"
          // checked={true}
          label={"Пробивка по базам"}
          onChange={() => {}}
        />
      </div>
      <div className="section">
        <CheckBox
          type="expert"
          // checked={true}
          label={"Дополнительная проверка"}
          onChange={() => {}}
        />
      </div>
      <div className="section">
        <CheckBox
          type="expert"
          // checked={true}
          label={"Компьютерная диагностика"}
          onChange={() => {}}
        />
      </div>
      <div className="section">
        <CheckBox
          type="expert"
          // checked={true}
          label={"Проверка остекления и оптики"}
          onChange={() => {}}
        />
      </div>
      <div className="section">
        <CheckBox
          type="expert"
          // checked={true}
          label={"Стриминг"}
          onChange={() => {}}
        />
        <p>Выбор программы</p>
        <div className="programs">
          <div className="programs-block">
            <img src={skype} alt="skype" />
            Skype
          </div>
          <div className="programs-block">
            <img src={whatsapp} alt="whatsapp" />
            Whatsapp
          </div>
          <div className="programs-block">
            <img src={viber} alt="viber" />
            Viber
          </div>
          <div className="programs-block">
            <img src={telegram} alt="telegram" />
            Telegram
          </div>
        </div>
      </div>
      <p className="finish">
        Необходимо дождаться завершения заказа от клиента
      </p>

      <div className="section">
        <CheckBox
          type="expert"
          checked={false}
          label={"Проверка завершена"}
          onChange={() => {}}
        />
      </div>

      <p className="finish reject">Отказаться от заказа</p>
    </div>
  );
};

export default ExecuteOrder;
