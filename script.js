numbers = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};
console.log(numbers[0]);
var finalResult = 0;
var operator = "";
var activeOperator = false;
// Khi btnAc click reset lại chuỗi display
let btnAC = document.getElementById("ac");
btnAC.addEventListener("click", function () {
  document.getElementById("display").innerText = "";
});
/**
    Khi btnSign click
    + Nếu chuỗi display có kí tự đầu tiên là - thì xóa dấu -
    + Nếu không có dấu trừ
      ++ Kiểm tra có rỗng không, nếu không rỗng thì thêm dấu - vào trước
**/
let btnSign = document.getElementById("sign");
btnSign.addEventListener("click", function () {
  if (firstChar() === "-") {
    let result = document.getElementById("display").innerText;
    let sbstr = result.substring(1, result.length);
    document.getElementById("display").innerText = sbstr;
  } else if (!emptyResult()) {
    prepend("-");
  }
});
/**
    Click vào nút %
    + Nếu chuỗi display khác trống, \
    thì lấy giá trị chuỗi display chia cho 100 và gán lại giá trị ô display
 */
let btnPercentage = document.getElementById("percentage");
btnPercentage.addEventListener("click", function () {
  if (!emptyResult()) {
    let percentage =
      parseFloat(document.getElementById("display").innerText) / 100;
    document.getElementById("display").innerText = percentage;
  }
});
/**
    Click vào nút + - * / =
    + Nếu là dấu = thì thực hiện tính toán, gán lại toán tử và trạng thái toán tử
    + Nếu không phải dấu = thì cập nhật operator
 */
let btnOperators = document.querySelectorAll(".btn-operator");
btnOperators.forEach((item) => {
  item.addEventListener("click", (e) => {
    let id = e.target.id;
    if (id === "=") {
      calculate();
      document.getElementById("display").innerText = finalResult;
      operator = "";
      activeOperator = false;
    } else {
      operator = id;
      activeOperator = true;
    }
  });
});
let btnNumbers = document.querySelectorAll(".btn-number");
btnNumbers.forEach((item) => {
  item.addEventListener("click", (e) => {
    let id = e.target.id;
    let num = numbers[id];
    if (activeOperator) {
      console.log("activeOperator");
      finalResult = parseFloat(document.getElementById("display").innerText);
      document.getElementById("display").innerText = "";
      activeOperator = false;
    }
    if (firstChar() === "0") {
      if (hasChar(".")) {
        append(num);
      }
    } else {
      append(num);
    }
  });
});
/**
    Click vào nút .
    + Nếu chuỗi display là rỗng thì thêm "0."
    + Nếu không rỗng thì thêm .
 */
let btnPoint = document.getElementById(".");
btnPoint.addEventListener("click", () => {
  if (emptyResult()) {
    append("0.");
  } else if (!hasChar()) {
    append(".");
  }
});

const calculate = () => {
  let actResult = parseFloat(document.getElementById("display").innerText);
  switch (operator) {
    case "+":
      finalResult += actResult;
      break;
    case "-":
      finalResult -= actResult;
      break;
    case "*":
      finalResult *= actResult;
      break;
    case "/":
      finalResult /= actResult;
      break;
    default:
      break;
  }
};
/**
 * Kiểm tra xem chuổi display có trống hay không
 * @returns true|false, true nếu là trống
 */
const emptyResult = () => {
  return document.getElementById("display").innerText === "";
};
/**
 * Kiểm tra xem '1 kí tự' char có tồn tại trong chuối display không
 * @param {*} char
 * @returns true|false, true nếu có 1 kí tự tồn tại trong chuỗi display
 */
const hasChar = (char) => {
  let result = document.getElementById("display").innerText;
  return result.indexOf(char) !== -1;
};
/**
 * Lấy kí tự đầu tiên của chuỗi display
 * @returns 'Kí tự' đầu tiên
 */
const firstChar = () => {
  return document.getElementById("display").innerText.charAt(0);
};
/**
 * Thêm 1 chuỗi txt nối vào chuỗi display
 * @param {*} txt
 */
const append = (txt) => {
  let result = document.getElementById("display").innerText;
  document.getElementById("display").innerText = result + txt;
};
/**
 * Thêm dấu - vào trước chuỗi display
 * @param {*} sign
 */
const prepend = (sign) => {
  let result = document.getElementById("display").innerText;
  document.getElementById("display").innerText = sign + result;
};
// Thiết lập thời gian
const hourA = document.querySelector(".hour");
const minuteA = document.querySelector(".minute");
const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  if (currentHour > 12) {
    currentHour -= 12;
  }
  hourA.textContent = currentHour.toString();
  minuteA.textContent = currentMinute.toString().padStart(2, "0");
};
setInterval(updateTime, 1000);
updateTime();
