let totalExpense = 0;

window.addEventListener("DOMContentLoaded", () => {
  updateTotalExpense();
  displayFunction();
});

function handleSubmit(event) {
  event.preventDefault();

  const Name = document.getElementById("expense-name").value.trim();
  const Amount = parseFloat(
    document.getElementById("expense-amount").value.trim()
  );

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  const expense = { name: Name, amount: Amount };

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";
  updateTotalExpense();
  displayFunction();
}

function displayFunction() {
  const expenseList = document.getElementById("expense-list");

  expenseList.innerHTML = "";
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    li.innerHTML = `${expense.name}: $${expense.amount.toFixed(2)} 
      <button class="btn btn-danger btn-sm" onclick="removeExpense(${index})">Remove</button>
      <button class="btn btn-warning btn-sm" onclick="editExpense(${index})">Edit</button>`;

    expenseList.appendChild(li);
  });
  document.getElementById("total-expense").textContent =
    totalExpense.toFixed(2);
}

function removeExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses"));
  const removedExpenseAmount = expenses[index].amount;
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateTotalExpense();
  document.getElementById("total-expense").textContent =
    totalExpense.toFixed(2);
  displayFunction();
}

function editExpense(index) {
  let expenses = JSON.parse(localStorage.getItem("expenses"));

  const expenseToEdit = expenses[index];
  document.getElementById("expense-name").value = expenseToEdit.name;
  document.getElementById("expense-amount").value = expenseToEdit.amount;
  removeExpense(index);
}

function updateTotalExpense() {
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
}
