class Calculator {
  constructor(prevInput, curInput) {
    this.prevInput = prevInput;
    this.curInput = curInput;
    this.clear();
  }

  clear() {
    this.curOperand = "";
    this.prevOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.curOperand = this.curOperand.slice(0, -1);
  }

  addNum(number) {
    if (
      (String(this.curOperand).includes(".") && number == ".") ||
      this.curOperand.length > 9
    )
      return;
    this.curOperand = this.curOperand + number;
  }

  operate(op) {
    if (this.curOperand == "") return;
    if (this.prevOperand != "") {
      this.calculate();
    }
    this.operation = op;
    this.prevOperand = this.curOperand + " " + this.operation;
    this.curOperand = "";
  }

  calculate() {
    if (this.curOperand == "" || this.prevOperand == "") return;
    switch (this.operation) {
      case "+":
        this.curOperand = +this.prevOperand.slice(0, -1) + +this.curOperand;
        break;
      case "-":
        this.curOperand = +this.prevOperand.slice(0, -1) - +this.curOperand;
        break;
      case "*":
        this.curOperand = +this.prevOperand.slice(0, -1) * +this.curOperand;
        break;
      case "÷":
        this.curOperand = +this.prevOperand.slice(0, -1) / +this.curOperand;
        break;
    }
    this.prevOperand = "";
  }

  updateDisplay() {
    this.prevInput.textContent = this.prevOperand;
    this.curInput.textContent = this.curOperand;
  }
}

const previousDataInput = document.querySelector("[data-previous]");
const currentDataInput = document.querySelector("[data-current]");

const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-delete-all]");

const numberBtns = document.querySelectorAll("[data-num]");
const operationBtns = document.querySelectorAll("[data-operation]");

const equalBtn = document.querySelector("[data-equal]");

//////////////// creating object instance
const calculator = new Calculator(previousDataInput, currentDataInput);

numberBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    calculator.addNum(this.textContent);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    calculator.operate(this.textContent);
    calculator.updateDisplay();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", function () {
  calculator.delete();
  calculator.updateDisplay();
});

allClearBtn.addEventListener("click", function () {
  calculator.clear();
  calculator.updateDisplay();
});
