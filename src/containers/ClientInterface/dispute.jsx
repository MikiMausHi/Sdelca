import React from "react";
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";

const Dispute = () => {
  const options1 = [
    { value: 1, title: "Не выполнены необходимые требования" },
    { value: 2, title: "Не выполнены необходимые требования" },
    { value: 3, title: "Не выполнены необходимые требования" },
    { value: 4, title: "Не выполнены необходимые требования" }
  ];
  const options2 = [
    { value: 1, title: "Частичная выплата" },
    { value: 2, title: "Частичная выплата" },
    { value: 3, title: "Частичная выплата" },
    { value: 4, title: "Частичная выплата" }
  ];

  const [result, setResult] = React.useState(false);

  const onClick = () => {
    setResult(!result);
  };

  return (
    <div className="dispute">
      <h2 className="confirm-header">Укажите причину открытия спора</h2>
      <Select options={options1} />
      <h2 className="confirm-header">Требования</h2>
      <Select options={options2} />
      <textarea className="dispute-comment" placeholder="Введите текст" />
      <div className="dispute-submit">
        <Button type="primary" onClick={onClick}>
          Открыть спор
        </Button>
      </div>

      {result && (
        <div className="result">
          <h2 className="confirm-header">Решение</h2>
          <p>
            В течении 3х дней мы изучим вопрос и результаты вы получите по
            окончании спора.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dispute;
