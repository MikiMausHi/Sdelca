import React from "react";

const styles = {
  ul: {
    padding: 0,
    margin: "40px 80px",
    display: "flex",
    listStyle: "none",
    justifyContent: "space-between"
  }
};

const BreadCrumb = ({ step }) => {
  const items = [
    { id: 1, title: "Описание товара" },
    { id: 2, title: "Подтверждение" },
    { id: 3, title: "Выбор Мастера" },
    { id: 4, title: "Оплата" }
  ];

  const liItems = items.map(item => {
    const styles = item.id === step ? { fontWeight: 600 } : {};
    return (
      <li style={styles} key={item.id}>
        {item.id}. {item.title}
      </li>
    );
  });

  return <ul style={styles.ul}>{liItems}</ul>;
};

export default BreadCrumb;
