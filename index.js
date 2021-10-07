let stack = [];
let lastEntry = null;

let computed = document.querySelector("#comp-val");
let screen_value = document.querySelector("#screen-val");
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");

const getComputed = () => computed.innerText;

const printComputed = (num) => (computed.innerText = num.filter((e) => e));

const getOutput = () => screen_value.innerText;

const printOutput = (num) =>
  num == ""
    ? (screen_value.innerText = num)
    : (screen_value.innerText = getFormattedNumber(num));

const getFormattedNumber = (num) => {
  if (num == "-") {
    return "";
  }
  let n = Number(num);
  let value = n.toLocaleString("en");
  return value;
};

const reverseNumberFormat = (num) => Number(num.replace(/,/g, ""));

for (let digit of digits) {
  digit.addEventListener("click", function () {
    console.log(this.id);
    let output = reverseNumberFormat(getOutput());
    if (output != NaN) {
      output = output + this.id;
      printOutput(output);
      lastEntry = output;
    }
  });
}

for (let operator of operators) {
  operator.addEventListener("click", function () {
    if (this.id == "=") {
      if ((lastEntry !== " ") & (lastEntry !== null)) {
        stack.push(lastEntry);
      }
      lastEntry = null;
      printOutput("");
      printComputed(stack);
    } else if (this.id == "clear") {
      printOutput("");
      stack = [];
      printComputed(stack);
      lastEntry = null;
    } else if (this.id == "backspace") {
      let output = reverseNumberFormat(getOutput()).toString();

      if (output) {
        output = output.substr(0, lastEntry.length - 1);
        lastEntry = output;
        printOutput(output);
      }
    } else {
      if (stack.length > 1) {
        let first_pop = stack.pop();
        let result = eval(`${stack.pop()}${this.id}${first_pop}`);
        stack.push(result);
        printComputed(stack);
      }
    }
  });
}
