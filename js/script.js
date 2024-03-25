const balance = document.querySelector("#balance");
const description = document.querySelector("#desc");
const amount = document.querySelector("#amount");
const income = document.querySelector("#in-amt");
const expense = document.querySelector("#ex-amt");
const trans = document.querySelector("#trans")
const form = document.querySelector("#form");
const home = document.getElementById("home");
const history = document.getElementById("history");


if(history){
    history.addEventListener('click',() => {
        document.getElementById("description").style.display = "block";
        document.getElementById("display").style.display = "none";
        history.classList.add("word");
        home.classList.remove("word");
    })
}
if(home){
    home.addEventListener('click',() => {
        document.getElementById("display").style.display = "block";
        document.getElementById("description").style.display = "none";
        home.classList.add("word");
        history.classList.remove("word");
    })
}
const data = [
    {id:1,description:"Flower",amount:-70},
    {id:2,description:"Salary",amount:35000},
    {id:3,description:"Book",amount:-70},
    {id:4,description:"Camera",amount:-70},
    {id:5,description:"Petrol",amount:70}
];
// let transactions = data;

const localStorageTrans = JSON.parse(localStorage.getItem("trans"));
let transactions = localStorage.getItem("trans") !== null ? localStorageTrans : [] ;
function loadTransaction(transaction){
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "exp" : "inc")
    item.innerHTML = `${transaction.description} 
                        <span>${transaction.amount}</span>
                        <button class="btn-close" onclick="removeTrans(${transaction.id})">X</button>`
    trans.appendChild(item);
}
function removeTrans(id){
    if(confirm("Are you want to delete this Transaction ?")){ // It returns either 1 or 0
        transactions = transactions.filter((t) => t.id != id);
        config();
        updateLocalStorage();
    }
    else{
        return;
    }
}

function showAmount(){
    const amounts = transactions.map((t) => t.amount); // Taaking the amount and store it in new Array using map function
    // console.log(amounts);
    const total = amounts.reduce((acc,item)=> (acc+item),0).toFixed(2);//To convert the array into a single value and (,0) represnts the initoal value
    balance.innerHTML = `₹ ${total}`;
    const incomeAmt = amounts.filter((t) => t > 0).reduce((acc,item) => (acc+item),0).toFixed(2);
    income.innerHTML = `₹ ${incomeAmt}`;
    const expAmt = amounts.filter((t) => t < 0).reduce((acc,item) => (acc+item),0).toFixed(2);
    expense.innerHTML = `₹ ${Math.abs(expAmt)}`;
}

function config(){
    trans.innerHTML = " "; // To make the content delete
    transactions.forEach(loadTransaction);
    showAmount();
}
function addTransaction(e){
    e.preventDefault(); // To stop the execution of Default action
    if(description.value.trim() == "" || amount.value.trim() == ""){
        alert("Please Enter bothe the Amount and Description");
    }
    else{
        const transaction = {id:randomNumber(),description:description.value,amount: +amount.value}; // The reason for putting '+' is to convert the string to integer
        transactions.push(transaction);
        loadTransaction(transaction);
        description.value = "";
        amount.value = "";
        showAmount();
        updateLocalStorage();
    }
}
function randomNumber(){
    return Math.floor(Math.random() * 1000000);
}
// To set a Local Storage
function updateLocalStorage(){
    localStorage.setItem("trans",JSON.stringify(transactions));
}

form.addEventListener("submit",addTransaction);

window.addEventListener("load",function(){
    config();
});