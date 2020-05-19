import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "../../components/UI/Button/Button";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Card from "../../components/Card/Card";
import {executors, best} from "../../data/data";
import photo from "../../images/image.jpg";
import CheckBox from "../../components/UI/CheckBox/CheckBox";

const Step3 = ({
                 step,
                 nextStep,
                 prevStep,
                 handleChange,
                 values,
                 handleExecutorIdChange
               }) => {
  const order = {...values}

  const [showFullList, setShowFullList] = useState(false)


  const bestList = best.map(ex => {
    return (
      <Card
        title={ex.title}
        exId={ex.id}
        specialisation={ex.specialization}
        rating={ex.rating}
        photo={photo}
        key={ex.id}
        handleExecutorIdChange={handleExecutorIdChange}
        selected={order.expertId === ex.id}
      />
    );
  });
  const lastList = executors.map(ex => {
    return (
      <Card
        title={ex.title}
        exId={ex.id}
        specialisation={ex.specialization}
        rating={ex.rating}
        photo={photo}
        key={ex.id}
        handleExecutorIdChange={handleExecutorIdChange}
        selected={order.expertId === ex.id}
      />
    );
  });

  const fullSource = [...best, ...executors]
  const fullList = fullSource.map(ex => {
    return (
      <Card
        title={ex.title}
        exId={ex.id}
        specialisation={ex.specialization}
        rating={ex.rating}
        photo={photo}
        key={ex.id}
        handleExecutorIdChange={handleExecutorIdChange}
        selected={order.expertId === ex.id}
      />
    );
  });

  return (
    <>
      <BreadCrumb step={step}/>
      <h2>Выбор Мастера</h2>
      <div className="executors" style={showFullList?{justifyContent: 'center', paddingTop: 27}:{}}>
        {!showFullList &&
        <>
          <div className="recommendations">
            <h4>Наши рекомендации</h4>
            {bestList}
          </div>
          <div className="last-five">
            <h4>Последние пять</h4>
            {lastList}
          </div>
        </>
        }

        {showFullList &&
        <div className='recommendations'>
          {fullList}
        </div>
        }

      </div>

      {!showFullList &&
      <span className="showAll"
            onClick={() => setShowFullList(!showFullList)}
      >посмотреть всех</span>
      }

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
          onClick={nextStep}
          type="primary"
          disabled={!order.acceptRules}
        >
          Продолжить
        </Button>
      </div>
    </>
  );
};

Step3.propTypes = {
  step: PropTypes.number.isRequired,
  nextStep: PropTypes.func.isRequired
};

export default Step3;
