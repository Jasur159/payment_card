// /////////    Elements     \\\\\\\\\\\\\\\
// let loggedAccount;
// let cardHistory = [];
// ////////////////////// Buttons //////////////////

// const loginBtn = document.querySelector(".login_btn");
// const signUpBtn = document.querySelector(".sign_up_btn");
// const withdrawBtn = document.querySelector(".withdraw_btn");

// //////////////// INputs   \\\\\\\\\\\\\\\\\\\\\
// const loginTextInput = document.querySelector(".login_input");
// const loginPasswordInput = document.querySelector(".log_pass_input");
// const cardNumberInput = document.getElementById("card_num");
// const transferMoney = document.getElementById("transfer_sum");

// ////////////// Elements   ////////////////
// let mainCardSum = document.querySelector(".main_sum");
// const cardHolderName = document.querySelector(".card_holer_name");
// const cardType = document.querySelector(".card_type");
// const cardNumber = document.querySelector(".card_num");
// const cardValidate = document.querySelector(".card_year");
// const overallIncome = document.querySelector(".income");
// const overallEXpense = document.querySelector(".expense");
// const profileUserName = document.getElementById("username");

// //////////////// Components   //////////////////
// const paymentHistoryComponent = document.querySelector(".payment_info_cnt");
// const loginComponents = document.querySelector(".login_cnt");

// //////// Data - Dasturda kerak bo'ladigan ma'lumotlar
// // Brinchi account ma'lumoti
// let account1 = {
//   password: "1111",
//   cardInfo: {
//     cardNumber: 8600140234565678,
//     cardType: "UZCARD",
//     cardValidYear: "09/27",
//   },
//   owner: {
//     firstName: "Jasurbek",
//     lastName: "G'aniyev",
//   },
//   transfers: [
//     {
//       amount: 200,
//       date: "2019-11-18T21:31:17.178Z",
//     },
//     {
//       amount: 455.23,
//       date: "2019-12-23T07:42:02.383Z",
//     },
//     {
//       amount: -306.5,
//       date: "2020-01-28T09:15:04.904Z",
//     },
//     {
//       amount: 25000,
//       date: "2020-04-01T10:17:24.185Z",
//     },
//     {
//       amount: -642.21,
//       date: "2020-05-08T14:11:59.604Z",
//     },
//     {
//       amount: -133.9,
//       date: "2020-05-27T17:01:17.194Z",
//     },
//     {
//       amount: -79.97,
//       date: "2020-07-11T23:36:17.929Z",
//     },
//     {
//       amount: -1300,
//       date: "2020-07-12T10:51:36.790Z",
//     },
//   ],
//   currency: "UZS",
//   locale: "ru-RU",
// };
// // Ikkinchi account ma'lumoti
// let account2 = {
//   password: "2222",
//   cardInfo: {
//     cardNumber: 8411347213244488,
//     cardType: "VISA",
//     cardValidYear: "07/24",
//   },
//   owner: {
//     firstName: "Nodir",
//     lastName: "Abdug'aniyev",
//   },
//   transfers: [
//     {
//       amount: 5000,
//       date: "2019-11-18T21:31:17.178Z",
//     },
//     {
//       amount: 3400,
//       date: "2019-12-23T07:42:02.383Z",
//     },
//     {
//       amount: -150,
//       date: "2020-01-28T09:15:04.904Z",
//     },
//     {
//       amount: -790,
//       date: "2020-04-01T10:17:24.185Z",
//     },
//     {
//       amount: -642.21,
//       date: "2020-05-08T14:11:59.604Z",
//     },
//     {
//       amount: -310,
//       date: "2020-05-27T17:01:17.194Z",
//     },
//     {
//       amount: -1000,
//       date: "2020-07-11T23:36:17.929Z",
//     },
//     {
//       amount: 8500,
//       date: "2020-07-12T10:51:36.790Z",
//     },
//     {
//       amount: -30,
//       date: "2020-07-12T10:51:36.790Z",
//     },
//   ],
//   currency: "USD",
//   locale: "en-EN",
// };
// // Akkountlarni accounts arrayiga yig'ib oldik
// let accounts = [account1, account2];

// const createHistoryElements = () => {
//   const div = document.createElement("div");
// };

// const setCardHistory = (acc) => {
//   const historyElemets = createHistoryElements();
// };

// /* ----------- Pulni formatlash  ---------- */
// /*   bunda biz toLocaleStringdan foydalanamiz

// example: money.toLocaleString(acc.locale, {
//     style: "currency",
//     currency: acc.currency,
//   });

//   bu yerda money bu => kirib kelayotgan mablag' yani numberda
//   accountni locale ni beramiz 
//   va style bu funksiya uchun "currency" bo'ladi
//   oxiridagi currency esa akkountdan olinadi
// */
// const formatMoney = (acc, money) => {
//   return money.toLocaleString(acc.locale, {
//     style: "currency",
//     currency: acc.currency,
//   });
// };

// const calcMainCardSum = (acc) => {
//   return acc.transfers.reduce((balance, tr) => balance + tr.amount, 0);
// };

// const setCardDetails = (acc) => {
//   cardType.textContent = acc.cardInfo.cardType;
//   cardHolderName.textContent = Object.values(acc.owner).join(" ").toUpperCase();
//   cardNumber.textContent =
//     String(acc.cardInfo.cardNumber).substring(0, 4) +
//     " **** **** " +
//     String(acc.cardInfo.cardNumber).substring(12, 16);
//   cardValidate.textContent = acc.cardInfo.cardValidYear;
// };

// const setAllInfo = (acc) => {
//   const mainSum = calcMainCardSum(acc);
//   console.log(mainSum);
//   mainCardSum.textContent = formatMoney(acc, mainSum);
//   setCardDetails(acc);
//   setCardHistory(acc);
// };

// const createLogin = () => {
//   accounts.forEach((acc) => {
//     acc.username =
//       acc.owner.firstName.charAt(0).toLowerCase() +
//       acc.owner.lastName.charAt(0).toLowerCase();
//   });
// };
// createLogin();

// loginBtn.addEventListener("click", () => {
//   const account = accounts.find((acc) => acc.username === loginTextInput.value);
//   if (+account.password !== +loginPasswordInput.value) {
//     return;
//   }
//   loggedAccount = account;

//   setAllInfo(account);
//   loginTextInput.value = "";
//   loginPasswordInput.value = "";
// });
