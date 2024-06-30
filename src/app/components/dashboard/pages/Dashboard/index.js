//Local Storage
const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transaction")) || [];
  },
  set(transactions) {
    localStorage.setItem(
      "dev.finances:transaction",
      JSON.stringify(transactions)
    );
  },
};

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    //add transaction
    Transaction.all.push(transaction);
    App.reload();
  },
  remove(index) {
    Transaction.all.reverse().splice(index, 1);
    App.reload();
  },




  incomes() {
    // total incomes
    let income = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },
  expenses() {
    // total expenses
    let expense = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },
  total() {
    //total incomes + expenses
    return Transaction.incomes() + Transaction.expenses();
  },
};

const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    // adding transaction on html using the "DOM.innerHTMLTransaction" function
    DOM.transactionsContainer.appendChild(tr);
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img onclick="Transaction.remove(${index})" src="./assets/x-circle.svg" class="remove-transaction" alt="Remover transação">
      </td>
      `;
    return html;
  },

  //update balance cards (incomes, expenses and total)
  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );

    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    //clear transactions before update
    DOM.transactionsContainer.innerHTML = "";
  },
};

const Utils = {
  //formatting Form values
  formatAmount(value) {
    value = Number(value) * 100;

    //check if user add a - (minus sign) instead select "Income" and "Expense" Buttons
    if (value < 0) {
      value = -value;
    }
    if (Form.incomeOrExpense === "income") {
      value = value;
    } else {
      value = -value;
    }

    return value;
  },

  formatDate(date) {
    //date to user locale date
    date = date.toLocaleString();
    date = date.replaceAll("-", "/");
    return date;
  },

  formatCurrency(value) {
    //formatting value to user local currency
    value = Number(value) / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return value;
  },
};

const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  incomeOrExpense: "",

  setIncome() {
    Form.incomeOrExpense = "income";
    document.querySelector("#incomeButton").classList.add("income");
    document.querySelector("#expenseButton").classList.remove("expense");
  },

  setExpense() {
    Form.incomeOrExpense = "expense";
    document.querySelector("#expenseButton").classList.add("expense");
    document.querySelector("#incomeButton").classList.remove("income");
  },

  getValues() {
    //get input (modal) values
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
      incomeOrExpense: Form.incomeOrExpense,
    };
  },

  validateField() {
    const { description, amount, date, incomeOrExpense } = Form.getValues();

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === "" ||
      incomeOrExpense === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Por favor, preencha todos os campos!",
      });
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  formatValues() {
    let { description, amount, date, value } = Form.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      amount,
      date,
    };
  },

  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.date.value = "";
    Form.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      //verify fields before submit
      Form.validateField();
      const transaction = Form.formatValues();
      //salvar
      Transaction.add(transaction);
      //clear modal fields
      Form.clearFields();
      //close modal
      Modal.close();
    } catch (error) {
      console.log(error.message);
    }
  },
};

// ChartJS - doughnut chart - chart config
var ctx = document.getElementById("myChart");
var myDonutChart;

const AddChart = {
  Destroy() {
    if (myDonutChart) {
      myDonutChart.destroy();
    }
    this.update();
  },

  getData() {
    let data;
    if (
      Transaction.incomes().toString() !== "0" ||
      Transaction.expenses().toString() !== "0"
    ) {
      data = {
        datasets: [
          {
            data: [Transaction.incomes() / 100, Transaction.expenses() / 100],
            backgroundColor: ["#28D39A", "#ff7782", "#7380EC"],
            usePointStyle: true,
          },
        ],
        labels: ["Incomes", "Expenses"],
      };
    } else {
      data = {
        datasets: [
          {
            data: [100],
            backgroundColor: ["#bbb"],
            usePointStyle: true,
          },
        ],
        labels: ["No Transactions"],
      };
    }
    return data;
  },

  getOptions() {
    let options;
    if (
      Transaction.incomes().toString() === "0" &&
      Transaction.expenses().toString() === "0"
    ) {
      var style = getComputedStyle(document.body);
      const darkThemeTextColor = style.getPropertyValue("--color-info-dark");

      options = {
        tooltips: { enabled: false },
        hover: { mode: null },
        legend: {
          position: "bottom",
          usePointStyle: true,
          labels: {
            fontSize: 16,
            fontFamily: "Poppins, sans-serif",
            fontStyle: "500",
            fontColor: darkThemeTextColor,
            usePointStyle: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    } else {
      var style = getComputedStyle(document.body);
      const darkThemeTextColor = style.getPropertyValue("--color-info-dark");

      options = {
        legend: {
          position: "bottom",
          usePointStyle: true,
          labels: {
            fontSize: 16,
            fontFamily: "Poppins, sans-serif",
            fontStyle: "500",
            fontColor: darkThemeTextColor,
            usePointStyle: true,
          },
          onHover: function (event, legendItem) {
            // There is only a legendItem when your mouse is positioned over one
            if (legendItem) {
              event.target.style.cursor = "pointer";
            }
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    }

    return options;
  },

  update() {
    let options = this.getOptions();
    let data = this.getData();

    myDonutChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: options,
    });
  },
};

const App = {
  init() {
    Transaction.all.reverse().forEach(DOM.addTransaction);
    DOM.updateBalance();
    Storage.set(Transaction.all.reverse());
  },
  reload() {
    myDonutChart.destroy();
    DOM.clearTransactions();
    AddChart.update();
    App.init();
  },
};

App.init();
AddChart.update();

// profile functions

function openPop() {
  document.getElementById('pop').style.display = 'block';
}

function closePop() {
  document.getElementById('pop').style.display = 'none';
}

function toggleDependentField() {
  var maritalStatus = document.getElementById('maritalStatus').value;
  var dependentField = document.getElementById('dependentField');
  if (maritalStatus === 'married' || maritalStatus === 'divorced') {
    dependentField.style.display = 'block';
  } else {
    dependentField.style.display = 'none';
  }
}

function submitForm() {
  var submittedData = document.getElementById('submittedData');
  var formData = {
    "Name": document.getElementById('name').value,
    "Date Of Birth": document.getElementById('dob').value,
    "Qualification": document.getElementById('qualification').value,
    "Occupation": document.getElementById('occupation').value,
    "Mobile": document.getElementById('mobile').value,
    "Email": document.getElementById('email').value,
    "Married Status": document.getElementById('maritalStatus').value,
    "Number of Dependents": document.getElementById('dependents').value
  };

  // Display submitted data
  submittedData.innerHTML = "<h4>Submitted Data:</h4>";
  for (var key in formData) {
    submittedData.innerHTML += "<p><strong>" + key + ":</strong> " + formData[key] + "</p>";
  }

  // Show submitted data
  submittedData.style.display = 'block';

  // Close the modal after submitting
  closePop();
}


// investment functions

function openInv() {
  document.getElementById('inv').style.display = 'flex';
}

function closeInv() {
  document.getElementById('inv').style.display = 'none';
}

function updateOutputinv() {
  const data = {
    emergencyFund: document.getElementById('emergencyFund').value,
    realEstate: document.getElementById('realEstate').value,
    monthlySIP: document.getElementById('monthlySIP').value,
    debtInvestment: document.getElementById('debtInvestment').value,
    equityInvestment: document.getElementById('equityInvestment').value,
    goldBondInvestment: document.getElementById('goldBondInvestment').value,
    savingsInvestment: document.getElementById('savingsInvestment').value,
  };

  const outputinvContainer = document.getElementById('output-invcontainer');
  outputinvContainer.innerHTML = '';

  for (const key in data) {
    const outputinvGroup = document.createElement('div');
    outputinvGroup.classList.add('output-invgroup');

    const outputElement = document.createElement('h4');
    outputElement.textContent = `${key}:`;
    const valueElement = document.createElement('p');
    valueElement.textContent = data[key];

    outputinvGroup.appendChild(outputElement);
    outputinvGroup.appendChild(valueElement);
    outputinvContainer.appendChild(outputinvGroup);
  }

  closeInv();
}

// Loan Javascript function

function openInl() {
  document.getElementById('inl').style.display = 'flex';
}

function closeInl() {
  document.getElementById('inl').style.display = 'none';
}

function toggleLoanFields() {
  const haveLoan = document.getElementById('haveLoan').value;
  const loanFields = document.getElementById('loanFields');

  if (haveLoan === 'Y') {
    loanFields.style.display = 'flex';
  } else {
    loanFields.style.display = 'none';
  }
}

function updateOutputinl() {
  const haveLoan = document.getElementById('haveLoan').value;
  const data = {
    haveLoan: haveLoan,
    goodLoanAmount: haveLoan === 'Y' ? document.getElementById('goodLoanAmount').value : '',
    goodLoanEMI: haveLoan === 'Y' ? document.getElementById('goodLoanEMI').value : '',
    badLoanAmount: haveLoan === 'Y' ? document.getElementById('badLoanAmount').value : '',
    badLoanEMI: haveLoan === 'Y' ? document.getElementById('badLoanEMI').value : '',
  };

  const outputinlContainer = document.getElementById('output-inlcontainer');
  outputinlContainer.innerHTML = '';

  for (const key in data) {
    if (key === 'haveLoan') continue; // Skip the 'haveLoan' field

    const outputinlGroup = document.createElement('div');
    outputinlGroup.classList.add('output-inlgroup');

    const outputElement = document.createElement('h4');
    outputElement.textContent = `${key}:`;
    const valueElement = document.createElement('p');
    valueElement.textContent = data[key];

    outputinlGroup.appendChild(outputElement);
    outputinlGroup.appendChild(valueElement);
    outputinlContainer.appendChild(outputinlGroup);
  }

  // Display total loan amount and total EMI
  const totalLoanAmount = parseInt(data.goodLoanAmount) + parseInt(data.badLoanAmount) || 0;
  const totalEMI = parseInt(data.goodLoanEMI) + parseInt(data.badLoanEMI) || 0;

  document.getElementById('totalLoanAmount').textContent = totalLoanAmount.toString();
  document.getElementById('totalEMI').textContent = totalEMI.toString();

  closeInl();
}

// insurance functions

function openIns() {
  document.getElementById('ins').style.display = 'flex';
}

function closeIns() {
  document.getElementById('ins').style.display = 'none';
}

function toggleTermInsuranceFields() {
  const haveTermInsurance = document.getElementById('haveTermInsurance').value;
  const termInsuranceFields = document.getElementById('termInsuranceFields');

  if (haveTermInsurance === 'Y') {
    termInsuranceFields.style.display = 'flex';
  } else {
    termInsuranceFields.style.display = 'none';
  }
}

function toggleHealthInsuranceFields() {
  const haveHealthInsurance = document.getElementById('haveHealthInsurance').value;
  const healthInsuranceFields = document.getElementById('healthInsuranceFields');

  if (haveHealthInsurance === 'Y') {
    healthInsuranceFields.style.display = 'flex';
  } else {
    healthInsuranceFields.style.display = 'none';
  }
}

function toggleOtherInsuranceFields() {
  const haveOtherInsurance = document.getElementById('haveOtherInsurance').value;
  const otherInsuranceFields = document.getElementById('otherInsuranceFields');

  if (haveOtherInsurance === 'Y') {
    otherInsuranceFields.style.display = 'flex';
  } else {
    otherInsuranceFields.style.display = 'none';
  }
}

function updateOutputins() {
  const haveTermInsurance = document.getElementById('haveTermInsurance').value;
  const haveHealthInsurance = document.getElementById('haveHealthInsurance').value;
  const haveOtherInsurance = document.getElementById('haveHealthInsurance').value;

  const data = {
    haveTermInsurance: haveTermInsurance,
    termInsuranceAmount: haveTermInsurance === 'Y' ? document.getElementById('termInsuranceAmount').value : '',
    termInsurancePremium: haveTermInsurance === 'Y' ? document.getElementById('termInsurancePremium').value : '',
    haveHealthInsurance: haveHealthInsurance,
    healthInsuranceAmount: haveHealthInsurance === 'Y' ? document.getElementById('healthInsuranceAmount').value : '',
    healthInsurancePremium: haveHealthInsurance === 'Y' ? document.getElementById('healthInsurancePremium').value : '',
    haveOtherInsurance: haveOtherInsurance,
    otherInsuranceAmount: haveOtherInsurance === 'Y' ? document.getElementById('otherInsuranceAmount').value : '',
    otherInsurancePremium: haveOtherInsurance === 'Y' ? document.getElementById('otherInsurancePremium').value : '',
  };

  const outputinsContainer = document.getElementById('output-inscontainer');
  outputinsContainer.innerHTML = '';

  for (const key in data) {
    if (key.startsWith('have')) continue; // Skip the 'have' fields

    const outputinsGroup = document.createElement('div');
    outputinsGroup.classList.add('output-insgroup');

    const outputElement = document.createElement('h4');
    outputElement.textContent = `${key}:`;
    const valueElement = document.createElement('p');
    valueElement.textContent = data[key];

    outputinsGroup.appendChild(outputElement);
    outputinsGroup.appendChild(valueElement);
    outputinsContainer.appendChild(outputinsGroup);
  }

  // Display total protection cover amount and total monthly premium payout
  const totalProtectionCover = parseInt(data.termInsuranceAmount) + parseInt(data.healthInsuranceAmount) + parseInt(data.otherInsuranceAmount) || 0;
  const totalPremiumPayout = parseInt(data.termInsurancePremium) + parseInt(data.healthInsurancePremium) + parseInt(data.otherInsurancePremium) || 0;

  document.getElementById('totalProtectionCover').textContent = totalProtectionCover.toString();
  document.getElementById('totalPremiumPayout').textContent = totalPremiumPayout.toString();

  closeIns();
}

//  financial fitness score 


function financialfitnessscore(
  income, expense
  //  dob, emergencyFund, 
  // debtInvestment, equityInvestment, 
  // goodLoanAmount,  badLoanAmount, haveHealthInsurance
  // income, expense, dob, name, qualification, occupation, mobile, email,
  // maritalStatus, dependents, emergencyFund, realEstate, monthlySIP,
  // debtInvestment, equityInvestment, goldBondInvestment, savingsInvestment,
  // goodLoanAmount, goodLoanEMI, badLoanAmount, badLoanEMI, totalLoanamount,
  // totalEMI, haveHealthInsurance, healthInsuranceFields, haveTermInsurance,
  // termInsuranceFields, haveOtherInsurance, otherInsuranceFields,
  // termInsuranceAmount, termInsurancePremium, healthInsuranceAmount,
  // healthInsurancePremium, otherInsuranceAmount, otherInsurancePremium,
  // totalProtectionCover, totalPremiumPayout
) {
  let financialFitnessScore = 0;

  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();

  let eligibilityNotification = "";
  if (age >= 0 && age <= 35) {
      eligibilityNotification =
          "Well done! You are eligible for the aggressive, moderate, and conservative investment categories to improve your financial fitness score.";
  } else if (age >= 36 && age <= 45) {
      eligibilityNotification =
          "Well done! You are eligible for the moderate and conservative investment categories to improve your financial fitness score.";
  } else if (age > 45) {
      eligibilityNotification =
          "Well done! You are eligible for the conservative investment category to improve your financial fitness score.";
  }

  if (expense < 0.5 * income) {
      financialFitnessScore++;
  }

  if (emergencyFund > 6 * income) {
      financialFitnessScore++;
  }

  if (goodLoanAmount > badLoanAmount) {
      financialFitnessScore++;
  }

  if (haveHealthInsurance === "Y") {
      financialFitnessScore++;
  }

  if (haveTermInsurance === "Y") {
      financialFitnessScore++;
  }

  if (debtInvestment < equityInvestment) {
      financialFitnessScore++;
  }
  console.log("this is financialfitnessscore", financialFitnessScore)
  // document.getElementById("notification").innerHTML = eligibilityNotification;
  // document.getElementById("financialScoreResult").innerHTML = "Your Financial Fitness Score: " + financialFitnessScore;

  return financialFitnessScore;
}

function calculateFinancialFitness() {

  // const income = (parseFloat(document.getElementById("income").value)).toString().length ? parseFloat(document.getElementById("income").value) : 0 ;
  // const incomeElement = document.getElementById("income");
  const incomeElement = Transaction.incomes()/100;
  

const income = incomeElement ? (parseFloat(incomeElement) || 0) : 0;

  console.log(income);
  // const expenseElement = (document.getElementById("expense"));
  const expenseElement = Math.abs(Transaction.expenses())/100;

  const expense = expenseElement ? (parseFloat(expenseElement) || 0) : 0
  console.log(expense);
//   const dobElement = document.getElementById("dob");
// const dob = dobElement ? dobElement.value : "";
//   console.log(dob);
//   const name = document.getElementById("name").value;
//   const qualification = document.getElementById("qualification").value ;
//   const occupation = document.getElementById("occupation").value;
//   const mobile = document.getElementById("mobile").value;
//   const email = document.getElementById("email").value;
//   const maritalStatus = document.getElementById("maritalStatus").value;
//   const dependents = parseInt(document.getElementById("dependents").value);
//   const emergencyFundelement = parseFloat(document.getElementById("emergencyFund").value);
//   const emergencyFund = emergencyFundelement ? (parseFloat(emergencyFundelement.value) ||0) : 0;
//   console.log( emergencyFund)
//   const realEstate = parseFloat(document.getElementById("realEstate").value);
//   const monthlySIP = parseFloat(document.getElementById("monthlySIP").value);
//   const debtInvestment = parseFloat(document.getElementById("debtInvestment").value);
//   console.log( debtInvestment)
//   const equityInvestment = parseFloat(document.getElementById("equityInvestment").value);
//   console.log( equityInvestment);
//   const goldBondInvestment = parseFloat(document.getElementById("goldBondInvestment").value);
//   const savingsInvestment = parseFloat(document.getElementById("savingsInvestment").value);
//   const goodLoanAmount = parseFloat(document.getElementById("goodLoanAmount").value);
//   console.log(goodLoanAmount);
//   const goodLoanEMI = parseFloat(document.getElementById("goodLoanEMI").value);
//   const badLoanAmount = parseFloat(document.getElementById("badLoanAmount").value);
//   console.log(badLoanAmount);
//   const badLoanEMI = parseFloat(document.getElementById("badLoanEMI").value);
//   const haveHealthInsurance = document.getElementById("haveHealthInsurance").value;
//   console.log(haveHealthInsurance);
//   const haveTermInsurance = document.getElementById("haveTermInsurance").value;

  debugger
  var fittnessScore = financialfitnessscore(
      income, expense
      // , dob,
      //  name, qualification, occupation, mobile, email,
      // maritalStatus, dependents, 
      //emergencyFund,
      //  realEstate, monthlySIP,
      //debtInvestment, equityInvestment,
      //  goldBondInvestment, savingsInvestment,
      //goodLoanAmount, 
      // goodLoanEMI,
       //badLoanAmount, haveHealthInsurance
  );
  console.log("inside loop inside calculateFinancialFitness");
  console.log("live fitnessscore" ,fittnessScore);
  return fittnessScore
}

document.addEventListener('DOMContentLoaded', () => {
  const meterArrow = document.querySelector('.scoreMeter .meterArrow');
  const meterScore = document.querySelector('.scoreMeter .meterScore .score');

  const updateMeter = (score) => {
    const rotation = (score / 10) * 225;
    meterArrow.style.transform = `rotate(${rotation}deg)`;
    meterArrow.dataset.score = score.toFixed(0);
    meterScore.textContent = `${score.toFixed(0)}/10`;
  };

  debugger
  let a = this.calculateFinancialFitness();
  console.log("financial score above initialScore", a)
  // Initial animation with a predefined score (e.g., 8)
  var initialScore = a;  // Set the initial score here
  window.updateInitialScore = (score) => {
    updateMeter(score);
  };

  // Delay the initial animation to allow smooth transition
  // const intervalTime = 1000;

  setTimeout(() => {
    meterArrow.style.transition = 'transform 3s ease-in-out';
    updateMeter(initialScore);
  }, 500); 
  // Adjust the delay for the desired smoothness
  // function updateMeterContinuously() {
  //   console.log("inside loop");
  //   meterArrow.style.transition = 'transform 3s ease-in-out';
  //   updateMeter(initialScore);
  // }
  // const intervalId = setInterval(updateMeterContinuously, intervalTime);


  const updateInitialScore = (financialFitnessScore) => {
    initialScore = financialFitnessScore;
    updateMeter(initialScore);
};
});