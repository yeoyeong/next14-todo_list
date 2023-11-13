// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "yeoyeong",
    email: "asd@asd.com",
    password: "asd",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a1111a",
    name: "yeo",
    email: "qwe@qwe.com",
    password: "qwe",
  },
];

const todolist = [
  {
    user_id: users[0].id,
    title: "커피 마시기",
    detail: "커피 따뜻하게 마시기",
    status: "pending",
    date: "2022-12-06",
  },
  {
    user_id: users[0].id,
    title: "사이다 마시기",
    detail: "사이다 따뜻하게 마시기",
    status: "pending",
    date: "2022-11-14",
  },
  {
    user_id: users[0].id,
    title: "콜라 마시기",
    detail: "콜라 따뜻하게 마시기",
    status: "complete",
    date: "2022-10-29",
  },
  {
    user_id: users[0].id,
    title: "차 마시기",
    detail: "차 따뜻하게 마시기",
    status: "complete",
    date: "2023-09-10",
  },
  {
    user_id: users[0].id,
    title: "물 마시기",
    detail: "물 차갑게 마시기",
    status: "Proceeding",
    date: "2023-09-10",
  },
  {
    user_id: users[1].id,
    title: "맥북 마시기",
    detail: "맥북 차갑게 마시기",
    status: "Proceeding",
    date: "2023-09-10",
  },
];

module.exports = {
  users,
  todolist,
};
