import "moment/locale/ru";
import moment from "moment";

export const categories = [
  {
    id: 1,
    title: "Завтра",
    date: `${moment().add(1, 'day').format('dddd, D MMMM YYYY')}`
  },
  {
    id: 2,
    title: `${moment().add(2, 'day').format('dddd, D MMMM')}`,
    date: `${moment().add(2, 'day').format('dddd, D MMMM YYYY')}`
  },
  {
    id: 3,
    title: `${moment().add(3, 'day').format('dddd, D MMMM')}`,
    date: `${moment().add(3, 'day').format('dddd, D MMMM YYYY')}`
  },
  {
    id: 4,
    title: 'Выбрать дату',
    date: undefined
  }
];
