const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button")
const fromcur = document.querySelector(".from select");
const tocur = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText = currCode ;
        newOption.value = currCode;
        select.append(newOption);
    }

    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    } )
}

const updateFlag = (Element) =>{
    let currCode = Element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src= newSrc;
} 


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateRate();
})
 

const updateRate = async () => {
    let amount =document.querySelector(".amount input");
    let amtvale  = amount.value;
    if(amtvale === "" || amtvale < 1){
        amtvale = "1";
        amount.value = "1";
    } 

    //console.log(fromcur.value,tocur.value);
    const url = `${base_url}/${fromcur.value.toLowerCase()}/${tocur.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[tocur.value.toLowerCase()];
    

    let finalAmount = amtvale * rate;
    msg.innerText = `${amtvale} ${fromcur.value} = ${finalAmount} ${tocur.value}`
}

window.addEventListener("load" , () => {
    updateRate();
})
