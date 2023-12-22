/////////    Elements     \\\\\\\\\\\\\\\

let overIncome = 0;
let overExpense = 0;
////////////////////// Buttons //////////////////

const loginBtn = document.querySelector(".login_btn");
const signUpBtn = document.querySelector(".sign_up_btn");
const withdrawBtn = document.querySelector(".withdraw_btn");

//////////////// INputs   \\\\\\\\\\\\\\\\\\\\\
const loginTextInput = document.querySelector(".login_input");
const loginPasswordInput = document.querySelector(".log_pass_input");
const cardNumberInput = document.getElementById("card_num");
const transferMoney = document.getElementById("transfer_sum");

////////////// Elements   ////////////////
let mainCardSum = document.querySelector(".main_sum");
const cardHolderName = document.querySelector(".card_holer_name");
const cardType = document.querySelector(".card_type");
const cardNumber = document.querySelector(".card_num");
const cardValidate = document.querySelector(".card_year");
const overallIncome = document.querySelector(".income");
const overallEXpense = document.querySelector(".expense");
const profileUserName = document.getElementById("username");

//////////////// Components   //////////////////
const paymentHistoryComponent = document.querySelector(".payment_info_cnt");
const loginComponents = document.querySelector(".login_cnt");
/* Accounts */
const candidate1 = {
  password: 1111,
  cardInfo: {
    cardNum: "9860 6734 1201 8616",
    cardValidDate: "09/27",
    cardTYPE: "HUMO",
  },
  sum: "5,000,000",
  currency: "SUM",
  currencySymbol: "so'm",
  owner: {
    Name: "Jasurbek",
    Surname: "Ganiyev",
  },
  transferHistory: [
    {
      Sum: {
        dateInfo: {
          date: "18.03.2000",
          time: "12:35",
        },
        amount: "500000",
      },
    },
    {
      Sum: {
        dateInfo: {
          date: "17.07.2012",
          time: "15:45",
        },
        amount: "-1500000",
      },
    },
    {
      Sum: {
        dateInfo: {
          date: "21.09.2023",
          time: "10:27",
        },
        amount: "100000",
      },
    },
  ],
};
const candidate2 = {
  password: 2222,
  cardInfo: {
    cardNum: "4073 4200 1601 8616",
    cardValidDate: "08/24",
    cardTYPE: "Master Card",
  },
  sum: "22,516",
  currency: "USD",
  currencySymbol: "$",
  owner: {
    Name: "Nodirbek",
    Surname: "Abdullayev",
  },
  transferHistory: [
    {
      Sum: {
        dateInfo: {
          date: "31.10.2011",
          time: "10:59",
        },
        amount: "-115",
      },
    },
    {
      Sum: {
        dateInfo: {
          date: "19.12.2014",
          time: "14:45",
        },
        amount: "13000",
      },
    },
    {
      Sum: {
        dateInfo: {
          date: "25.04.2023",
          time: "6:31",
        },
        amount: "-5000",
      },
    },
  ],
};
let accounts = [candidate1, candidate2];

////////// Create Login   //////////////

function createLogin() {
  accounts.forEach((acc) => {
    acc.username =
      acc.owner.Name.charAt(0).toLowerCase() +
      acc.owner.Surname.charAt(0).toLowerCase();
  });
}
createLogin();

/* ---------------- Login Function ---------------- */

loginBtn.addEventListener("click", () => {
  let LogValue = loginTextInput.value;
  let LogPassValue = +loginPasswordInput.value;

  const account = accounts.find((acc) => acc.username === LogValue);
  if (!account) return;
  if (account.password !== LogPassValue) return;
  matchProfileInfo(account);
  calcMoney(account);
  loginComponents.classList.add("hide");
  signUpBtn.classList.remove("hide");
  loginTextInput.value = "";
  loginPasswordInput.value = "";
});

/* ------------ Sign Up Function  -------------- */

signUpBtn.addEventListener("click", () => {
  profileUserName.textContent = "";
  mainCardSum.textContent = "*********";
  cardNumber.textContent = "**** **** **** ****";
  cardValidate.textContent = "**/**";
  cardType.textContent = "Credit Card";
  paymentHistoryComponent.innerHTML = ``;
  loginComponent.classList.remove("hide");
  signUpComponent.classList.add("hide");
  overallEXpense.textContent = "******";
  overallIncome.textContent = "******";
  cardHolderName.textContent = "NAME SURNAME";
});

function matchProfileInfo(account) {
  profileUserName.textContent = `Xush kelibsiz, ${account.owner.Name} ${account.owner.Surname}!`;
  cardType.textContent = account.cardInfo.cardTYPE;
  cardHolderName.textContent = `${account.owner.Name.toUpperCase()} ${account.owner.Surname.toUpperCase()}`;
  cardNumber.textContent = account.cardInfo.cardNum;
  cardValidate.textContent = account.cardInfo.cardValidDate;
  if (account.currency === "SUM") {
    mainCardSum.textContent = `${account.sum} ${account.currencySymbol}`;
  } else {
    mainCardSum.textContent = `${account.currencySymbol} ${account.sum}`;
  }
  matchHistoryElements(account);
}

function createHistoryElements(account) {
  let historyCard = document.createElement("div");
  historyCard.className = "payment_info_card";
  let div = document.createElement("div");
  div.className = "payment_info_text";
  let h4 = document.createElement("h4");
  h4.className = "card_holder";
  let p = document.createElement("p");
  let spanDate = document.createElement("span");
  spanDate.id = "date";
  let spanTime = document.createElement("span");
  spanTime.id = "time";
  let h2 = document.createElement("h2");
  h2.className = "sum";
  h4.textContent = `${account.owner.Surname} ${account.owner.Name}`;

  ///////////// AppendChild   \\\\\\\\\\\\\\\

  historyCard.appendChild(div);
  historyCard.appendChild(h2);
  div.appendChild(h4);
  div.appendChild(p);
  p.appendChild(spanDate);
  p.appendChild(spanTime);
  paymentHistoryComponent.appendChild(historyCard);
  return {
    h2,
    h4,
    p,
    spanDate,
    spanTime,
  };
}
function matchHistoryElements(account) {
  account.transferHistory.forEach((info) => {
    const divElements = createHistoryElements(account);
    divElements.spanDate.textContent = info.Sum.dateInfo.date;
    divElements.spanTime.textContent = info.Sum.dateInfo.time;
    if (+info.Sum.amount < 0) {
      divElements.h2.style.color = "#b80d0d";
      overExpense += +info.Sum.amount;
      divElements.h2.textContent = `${info.Sum.amount} ${account.currencySymbol}`;
    } else {
      overIncome += +info.Sum.amount;
      divElements.h2.textContent = `+${info.Sum.amount} ${account.currencySymbol}`;
    }
  });
  overallEXpense.textContent = `${overExpense} ${account.currencySymbol}`;
  overallIncome.textContent = `+${overIncome} ${account.currencySymbol}`;
}

function calcMoney(account) {
  withdrawBtn.addEventListener("click", () => {
    let userCardNum = account.cardInfo.cardNum.replaceAll(" ", "");
    let transMoneyValue = transferMoney.value;
    if (transMoneyValue) {
      if (userCardNum === "9860673412018616") {
        if (String(cardNumberInput.value) === "4073420016018616") {
          checkAccount(account, transMoneyValue);
        }
      } else if (userCardNum === "4073420016018616") {
        if (String(cardNumberInput.value) === "9860673412018616") {
          checkAccount(account, transMoneyValue);
        }
      }
    }
    cardNumberInput.value = "";
  });
}
function getCurrentTime() {
  let currentDateInput = new Date();
  function addZero(number) {
    number < 10 ? "0" + number : number;
    return number;
  }

  let hour = addZero(currentDateInput.getHours());
  let minute = addZero(currentDateInput.getMinutes());
  let currentTime = `${hour}:${minute}`;
  let day = addZero(currentDateInput.getDate());
  let month = addZero(currentDateInput.getMonth() + 1);
  let year = addZero(currentDateInput.getFullYear());
  let currentDate = `${day}.${month}.${year}`;
  return {
    currentTime,
    currentDate,
  };
}

function checkAccount(account, transMoneyValue) {
  let currentSum = +account.sum.replaceAll(",", "");
  currentSum -= transMoneyValue;
  let historyElements = createHistoryElements(account);
  let getTime = getCurrentTime();
  historyElements.h2.style.color = "#b80d0d";
  historyElements.spanDate.textContent = getTime.currentDate;
  historyElements.spanTime.textContent = getTime.currentTime;
  historyElements.h2.textContent = `-${transMoneyValue} ${account.currencySymbol}`;
  overExpense -= transMoneyValue;
  overallEXpense.textContent = overExpense;

  // let formattedNumber = currentSum
  // localStorage.setItem("sum", JSON.stringify(currentSum));
  if (account.currency === "SUM") {
    mainCardSum.textContent = `${currentSum.toLocaleString()} ${
      account.currencySymbol
    }`;
  } else {
    mainCardSum.textContent = `${
      account.currencySymbol
    } ${currentSum.toLocaleString()}`;
  }
  transferMoney.value = "";
}

// function checkAccount(account, transMoneyValue) {
//   let currentSum = +account.sum.replaceAll(",", "");
//   currentSum -= transMoneyValue;
//   let getTime = getCurrentTime();
//   account.sum = currentSum;
//   let Sum = {
//     dateInfo: {
//       date: getTime.currentDate,
//       time: getTime.currentTime,
//     },
//     amount: -transMoneyValue,
//   };
//   overExpense -= transMoneyValue;
//   overallEXpense.textContent = overExpense;
//   console.log(Sum);
//   account.transferHistory.push({ Sum });
// }

// console.log(candidate1.transferHistory);
