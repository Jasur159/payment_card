/////////    Elements     \\\\\\\\\\\\\\\
let loggedAccount;
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

//////// Data - Dasturda kerak bo'ladigan ma'lumotlar
// Brinchi account ma'lumoti
let account1 = {
  password: "1111",
  cardInfo: {
    cardNumber: 8600140234565678,
    cardType: "HUMO",
    cardValidYear: "09/27",
  },
  owner: {
    firstName: "Jasurbek",
    lastName: "G'aniyev",
  },
  transfers: [
    {
      amount: 200,
      date: "2019-11-18T21:31:17.178Z",
    },
    {
      amount: 455.23,
      date: "2019-12-23T07:42:02.383Z",
    },
    {
      amount: -306.5,
      date: "2020-01-28T09:15:04.904Z",
    },
    {
      amount: 25000,
      date: "2020-04-01T10:17:24.185Z",
    },
    {
      amount: -642.21,
      date: "2020-05-08T14:11:59.604Z",
    },
    {
      amount: -133.9,
      date: "2020-05-27T17:01:17.194Z",
    },
    {
      amount: -79.97,
      date: "2020-07-11T23:36:17.929Z",
    },
    {
      amount: -1300,
      date: "2020-07-12T10:51:36.790Z",
    },
  ],
  currency: "UZS",
  locale: "ru-RU",
};
// Ikkinchi account ma'lumoti
let account2 = {
  password: "2222",
  cardInfo: {
    cardNumber: 8411347213244488,
    cardType: "VISA",
    cardValidYear: "07/24",
  },
  owner: {
    firstName: "Nodir",
    lastName: "Abdug'aniyev",
  },
  transfers: [
    {
      amount: 5000,
      date: "2019-11-18T21:31:17.178Z",
    },
    {
      amount: 3400,
      date: "2019-12-23T07:42:02.383Z",
    },
    {
      amount: -150,
      date: "2020-01-28T09:15:04.904Z",
    },
    {
      amount: -790,
      date: "2020-04-01T10:17:24.185Z",
    },
    {
      amount: -642.21,
      date: "2020-05-08T14:11:59.604Z",
    },
    {
      amount: -310,
      date: "2020-05-27T17:01:17.194Z",
    },
    {
      amount: -1000,
      date: "2020-07-11T23:36:17.929Z",
    },
    {
      amount: 8500,
      date: "2020-07-12T10:51:36.790Z",
    },
    {
      amount: -30,
      date: "2020-07-12T10:51:36.790Z",
    },
  ],
  currency: "USD",
  locale: "en-EN",
};
// Akkountlarni accounts arrayiga yig'ib oldik
let accounts = [account1, account2];

// Formatting money
const formatMoney = (money, acc) => {
  let formMoney = money.toLocaleString(acc.locale, {
    style: "currency",
    currency: acc.currency,
  });
  return formMoney;
};

// Kartada qancha kirim va qancha chiqimni hisoblash uchun function
const calcAllTransferMoney = (acc) => {
  let allIncome = 0;
  let allExpense = 0;
  let historyAllPayments = acc.transfers.map((obj) => {
    if (obj.amount < 0) {
      allExpense += obj.amount;
    } else {
      allIncome += obj.amount;
    }
  });
  overallEXpense.textContent = formatMoney(allExpense, acc);
  overallIncome.textContent = `+${formatMoney(allIncome, acc)}`;
};

// To'lov o'tqazilgan sanalarni to'girlash uchun function
const getTime = (timeZone) => {
  let UTMDateInput = new Date(timeZone);
  function addZero(number) {
    number < 10 ? "0" + number : number;
    return number;
  }

  let hour = addZero(UTMDateInput.getUTCHours());
  let minute = addZero(UTMDateInput.getUTCMinutes());
  let paymentTime = `${hour}:${minute}`;
  let day = addZero(UTMDateInput.getUTCDate());
  let month = addZero(UTMDateInput.getUTCMonth() + 1);
  let year = addZero(UTMDateInput.getUTCFullYear());
  let paymentDate = `${day}.${month}.${year}`;
  return {
    paymentTime,
    paymentDate,
  };
};

// Biz to'lovlarni windowga qo'shish uchun elementlar yaratib olamiz
/* !!!!   eslatma qachinki siz biror bir element yaratishga funksiya qilsangiz 
          siz asosiy parentga funksiyani uchuda append qilmasligingiz kerak
          chunki append qilsangiz pul jo'natayotganda agar abyektdan foydalansangiz 
          siz kiritgan yangi qiymatni parentga qo'shib avvalgi natijalar bilan chiqaradi
          lekin yangi natija va eski natija 2 marta chiqib qoladi
          shuning uchun siz har doim asosiy append parentni asosiy funksiyada qo'llang */
const createHistoryElements = (acc) => {
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
  h4.textContent = Object.values(acc.owner).join(" ");

  ///////////// AppendChild   \\\\\\\\\\\\\\\

  historyCard.appendChild(div);
  historyCard.appendChild(h2);
  div.appendChild(h4);
  div.appendChild(p);
  p.appendChild(spanDate);
  p.appendChild(spanTime);
  return {
    h2,
    p,
    spanDate,
    spanTime,
    historyCard,
  };
};
// !!! Asosiy parentni qo'llayotganda eski natoojalarni o'chirib tashlashingiz kerak chunki avvalgi natijalardan qutilib
//     yangi natijani avvalgisiga qo'shib yozib qo'yishi uchun
// Tashlangan va tashlab olingan pullarni ko'rsatuvchi funksiya tuzamiz
const paymentHistory = (acc) => {
  // Example !!!
  paymentHistoryComponent.innerHTML = "";

  acc.transfers.forEach((obj) => {
    let historyFormMoney = formatMoney(obj.amount, acc);
    let historyElement = createHistoryElements(acc);
    // Example !!!
    paymentHistoryComponent.appendChild(historyElement.historyCard);
    let time = getTime(obj.date);
    if (obj.amount < 0) {
      historyElement.h2.style.color = "#b80d0d";
      historyElement.h2.textContent = historyFormMoney;
    } else {
      historyElement.h2.style.color = "#068822";
      historyElement.h2.textContent = `+${historyFormMoney}`;
    }
    historyElement.spanDate.textContent = time.paymentDate;
    historyElement.spanTime.textContent = time.paymentTime;
  });
};

// Kartadagi pulni hisoblash
const calcMoney = (acc) => {
  let money = acc.transfers.reduce((calc, history) => {
    calc += history.amount;
    return calc;
  }, 0);
  return money;
};

// Karta malumotlarini joyiga joylashtiramiz
const matchCardInfo = (acc) => {
  cardType.textContent = acc.cardInfo.cardType;
  cardHolderName.textContent = Object.values(acc.owner).join(" ").toUpperCase();
  cardValidate.textContent = acc.cardInfo.cardValidYear;
  let cardFixedNumber =
    String(acc.cardInfo.cardNumber).slice(0, 4) +
    " **** **** " +
    String(acc.cardInfo.cardNumber).slice(12, 16);
  cardNumber.textContent = cardFixedNumber;
};

// Account ma'lumotlarini joy joyiga qo'yib chiqish
const setProfile = (acc) => {
  matchCardInfo(acc);
  let allMoney = calcMoney(acc);
  let formattedMoney = formatMoney(allMoney, acc);
  mainCardSum.textContent = formattedMoney;
  paymentHistory(acc);
  calcAllTransferMoney(acc);
};

// Username Yaratish
function createLogin() {
  accounts.forEach((acc) => {
    acc.username =
      acc.owner.firstName.charAt(0).toLowerCase() +
      acc.owner.lastName.charAt(0).toLowerCase();
  });
}
createLogin();

/* ---------------- Login Section ---------------- */
loginBtn.addEventListener("click", () => {
  let LogTextValue = loginTextInput.value;
  let LogPassValue = +loginPasswordInput.value;
  const account = accounts.find((acc) => acc.username === LogTextValue);
  if (!account) return;
  if (+account.password !== LogPassValue) return;
  loggedAccount = account;
  loginComponents.classList.add("hide");
  signUpBtn.classList.remove("hide");
  loginTextInput.value = "";
  loginPasswordInput.value = "";
  setProfile(account);
});

/*    ------------------------ Sign Up Section ----------- */
signUpBtn.addEventListener("click", () => {
  profileUserName.textContent = "";
  mainCardSum.textContent = "*********";
  cardNumber.textContent = "**** **** **** ****";
  cardValidate.textContent = "**/**";
  cardType.textContent = "Credit Card";
  paymentHistoryComponent.innerHTML = ``;
  loginComponents.classList.remove("hide");
  overallEXpense.textContent = "******";
  signUpBtn.classList.add("hide");
  overallIncome.textContent = "******";
  cardHolderName.textContent = "NAME SURNAME";
});

/// Pul jo'natilgan vaqtni olish
function getCurrentTime() {
  let currentDate = new Date();
  const nowUTCPlus5 = new Date(currentDate.getTime() + 5 * 60 * 60 * 1000);
  let isoStringTime = nowUTCPlus5.toISOString();
  return isoStringTime;
}

/// pul yechish uchun funksiya
const sendMoney = (decrMoney, cardNum) => {
  if (cardNum) {
    if (decrMoney) {
      if (decrMoney > 0) {
        let paymentObj = {
          amount: decrMoney * -1,
          date: getCurrentTime(),
        };
        loggedAccount.transfers.push(paymentObj);

        // Updating new result
        updateEverything();
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    return;
  }
};

// Pul yechish tugmasi
withdrawBtn.addEventListener("click", () => {
  let decrMoney = +transferMoney.value;
  let withdrawCardNum = +cardNumberInput.value;
  console.log(withdrawCardNum);
  sendMoney(decrMoney, withdrawCardNum);
  depositMoney(decrMoney, withdrawCardNum);
  cardNumberInput.value = "";
  transferMoney.value = "";
});

const depositMoney = (Money, cardNum) => {
  if (cardNum) {
    if (Money) {
      if (loggedAccount.cardInfo.cardNumber === 8600140234565678) {
        if (cardNum === 8411347213244488) {
          let payment = {
            amount: Money / 12370,
            date: getCurrentTime(),
          };
          account2.transfers.push(payment);
          updateEverything();
        } else {
          return;
        }
      } else if (loggedAccount.cardInfo.cardNumber === 8411347213244488) {
        if (cardNum === 8600140234565678) {
          let payment = {
            amount: Money * 12370,
            date: getCurrentTime(),
          };
          account1.transfers.push(payment);
          updateEverything();
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      return;
    }
  } else {
    return;
  }
};

function updateEverything() {
  let allMoneyInAcc = calcMoney(loggedAccount);
  let formattedMoney = formatMoney(allMoneyInAcc, loggedAccount);
  mainCardSum.textContent = formattedMoney;
  // Updating new result in Obj
  calcAllTransferMoney(loggedAccount);
  paymentHistory(loggedAccount);
}
