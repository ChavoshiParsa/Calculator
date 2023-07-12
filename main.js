function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function select(name, type) {
  let element;
  switch (type) {
    case "id":
      element = document.querySelector("#" + name);
      break;
    case "class":
      element = document.querySelector("." + name);
      break;
    case "tag":
      element = document.querySelector("" + name);
      break;

    default:
      break;
  }

  return element;
}
let cl = "class";
function selects(name, type) {
  let element = [];

  switch (type) {
    case "id":
      element = document.querySelectorAll("#" + name);
      break;
    case "class":
      element = document.querySelectorAll("." + name);
      break;
    case "tag":
      element = document.querySelectorAll("" + name);
      break;

    default:
      break;
  }

  return element;
}

function print(string) {
  console.log(string);
}

function setCookie(name, value, daysToLive) {
  const date = new Date();
  date.setTime(date.getTime() + daysToLive * 60 * 60 * 24 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path = P:`;
}

function deleteCookie(name) {
  setCookie(name, null, null);
}

function getCookie(name) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");

  let result = null;
  cArray.forEach((element) => {
    if (element.indexOf(name) == 0) {
      result = element.substring(name.length + 1);
    }
  });

  return result;
}

let current1 = "";
let current2 = "";

let previous = "";
let currentOperator = "";
let isOperator = false;
let isFinal = false;

let numbers = selects("number", cl);
let operators = selects("operator", cl);

let displayP = select("displayP", cl);
let displayC = select("displayC", cl);
let displayI = select("displayI", cl);
let id = "id";
let del = select("del", id);
let ac = select("delAll", id);

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (isFinal) {
      delAll();
    }
    if (isOperator) {
      current2 = current2 + number.textContent;
      displayC.textContent = current1 + currentOperator + current2;
      instantResult();
    } else {
      current1 += number.textContent;
      displayC.textContent = current1;
      displayI.textContent = "Instant Result: " + current1;
    }
  });
});

operators[4].addEventListener("click", finalResult);

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (operator.textContent == "=") {
    } else {
      if (isOperator) {
        if (current2 == "") {
          currentOperator = operator.textContent;
          displayC.textContent = current1 + currentOperator;
        } else {
          currentOperator = operator.textContent;
          finalResult();
          displayC.textContent = current1 + currentOperator;
        }
      } else {
        currentOperator = operator.textContent;
        displayC.textContent = current1 + currentOperator;
        isOperator = true;
      }
      isFinal = false;
    }
  });
});

del.addEventListener("click", () => {
  if (isOperator) {
    current2 = current2.substring(0, current2.length - 1);
    displayC.textContent = current1 + currentOperator + current2;
    instantResult();
  } else {
    current1 = current1.substring(0, current1.length - 1);
    displayC.textContent = current1;
    displayI.textContent = "Instant Result: " + current1;
  }
});

ac.addEventListener("click", delAll);

function delAll() {
  current1 = "";
  current2 = "";
  previous = "";
  currentOperator = "";
  isOperator = false;
  displayC.textContent = "‌";
  displayP.textContent = "‌";
  displayI.textContent = "Instant Result: 0";
  isFinal = false;
}

function finalResult() {
  displayP.textContent = displayC.textContent;
  let result;
  isFinal = true;
  switch (currentOperator) {
    case "÷":
      result = Number(current1) / Number(current2);
      if (result == 1 / 0) {
        displayC.textContent = "Undefined";
      } else {
        show();
      }
      break;
    case "×":
      result = Number(current1) * Number(current2);
      show();
      break;
    case "-":
      result = Number(current1) - Number(current2);
      show();
      break;
    case "+":
      result = Number(current1) + Number(current2);
      show();
      break;

    default:
      break;
  }

  function show() {
    result = String(result);
    if (result.indexOf(".") != -1) {
      result = result.split(".");
      result = result[0] + "." + result[1].substring(0, 3);
    }
    result = Number(result);
    current1 = result;
    current2 = "";
    previous = "";
    displayC.textContent = "= " + result;
  }
}

function instantResult() {
  let result;
  switch (currentOperator) {
    case "÷":
      result = Number(current1) / Number(current2);
      if (result == 1 / 0) {
        displayC.textContent = "Undefined";
      } else {
        show();
      }
      break;
    case "×":
      result = Number(current1) * Number(current2);
      show();
      break;
    case "-":
      result = Number(current1) - Number(current2);
      show();
      break;
    case "+":
      result = Number(current1) + Number(current2);
      show();
      break;

    default:
      break;
  }

  function show() {
    result = String(result);
    if (result.indexOf(".") != -1) {
      result = result.split(".");
      result = result[0] + "." + result[1].substring(0, 3);
    }
    result = Number(result);
    displayI.textContent = "Instant Result: " + result;
  }
}
