const SelectOptions = document.querySelectorAll("select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
let amount = document.querySelector("input");
for (let option of SelectOptions) {
  for (code in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = code;
    newoption.value = code;
    if (option.name === "from" && code === "USD") {
      newoption.selected = "selected";
    } else if (option.name === "to" && code === "INR") {
      newoption.selected = "selected";
    }
    option.append(newoption);
  }
  option.addEventListener("change", (e) => {
    updateflag(e.target);
  });
  option.addEventListener("change", (e) => {
    convert(e);
  });
}
async function convert(e) {
  e.preventDefault();
  
  let amtValue = amount.value;

  if (amtValue === "" || amtValue < 1) {
    amtValue = 1;
    amount.value = 1;
  }

  const URL = `https://api.frankfurter.app/latest?&from=${fromCurr.value}&to=${toCurr.value}`;

  let response = await fetch(URL);

  let data = await response.json();

  const rate = data.rates[toCurr.value];
  let finalAmount = amtValue * rate;
  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${
    toCurr.value
  }`;
}

const updateflag = (ele) => {
  let currencyCode = ele.value;

  let countryCode = countryList[currencyCode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = ele.parentElement.querySelector("img");
  img.src = newsrc;
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  convert(e);
});
window.addEventListener("load", (e) => {
  convert(e);
});


//   e.preventDefault();
//   let amount = document.querySelector("input");
//   let amtValue = amount.value;

//   if (amtValue === "" || amtValue < 1) {
//     amtValue = 1;
//     amount.value = 1;
//   }

//   const URL = `https://api.frankfurter.app/latest?amount=${amtValue}&from=${fromCurr.value}&to=${toCurr.value}`;

//   let response = await fetch(URL);

//   let data = await response.json();

//   let rate = data.rates[toCurr.value];

//   let finalAmount = amtValue * rate;
//   msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
// });
let exchange = document.querySelector("i");
// console.log(fromCurr.value + "-->" + toCurr.value);

exchange.addEventListener("click",async (e) => {
  
  // console.log(e.target);
  let temp = toCurr.value;
  toCurr.value = fromCurr.value;
  fromCurr.value = temp;
  // console.log(fromCurr.value + "-->" + toCurr.value);
  let amtValue=amount.value;
  const URL = `https://api.frankfurter.app/latest?&from=${toCurr.value}&to=${fromCurr.value}`;

  let response = await fetch(URL);

  let data = await response.json();
  // console.log(data);

  const rate = data.rates[fromCurr.value];
  let finalAmount = amtValue / rate;
  msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmount.toFixed(3)} ${
    toCurr.value}`


  // msg.innerText=` = ${finalAmount.toFixed(2)} ${toCurr.value}=${amtValue} ${fromCurr.value}`
  let i1 = document.getElementById("fromimg");
  i1.src = `https://flagsapi.com/${countryList[fromCurr.value]}/flat/64.png`;
  let i2 = document.getElementById("toimg");
  i2.src = `https://flagsapi.com/${countryList[toCurr.value]}/flat/64.png`;

 
});
