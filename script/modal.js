function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const body = document.getElementsByTagName("body")[0];


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  body.classList.add("stop-scroll");
}


// closing modal
function closeModal (){
  modalbg.style.display = "none";
  body.classList.remove("stop-scroll");
}



// Validation functions 
const validNames = (name) => {
  const target = document.getElementById(name);
  const error = target.parentElement.getElementsByClassName("error-text")[0];
  const input = target.value;
  const trim = input.trim();
  if(trim.length < 2){
    error.classList.add("error-active");
    return -1;
  }else {
    error.classList.remove("error-active");
    return 0;
  }
}

const validEmail = () => {
  const target = document.getElementById("email");
  const error = target.parentElement.getElementsByClassName("error-text")[0];
  const input = target.value;
  const trim = input.trim();
  if ((trim.search(/\./) < 1) || trim.search("@") < 1){
    error.classList.add("error-active");
    return -1;
  }else {
    error.classList.remove("error-active");
    return 0;
  }
}

const validBirthdate = () => {
  const target = document.getElementById("birthdate");
  const error = target.parentElement.getElementsByClassName("error-text")[0];
  const input = target.value;
  const trim = input.trim();
  // if there's a partial date, return error.
  if (!trim){
    error.classList.add("error-active");
    return -1;
  }
  // parse out date for further validation
  // Will have to verify with client what years they would like.
  const bDate = new Date (trim);
  const bottomDate = new Date ("01-01-1900");
  const topDate = new Date ("01-01-2019");
  if((bDate < bottomDate) || (bDate > topDate)){
    error.classList.add("error-active");
    return -1;
  }else{
    error.classList.remove("error-active");
    return 0;
  }
}

const validQuantity = () => {
  const target = document.getElementById("quantity");
  const error = target.parentElement.getElementsByClassName("error-text")[0];
  const input = target.value;
  const trim = input.trim();
  if (trim.length == 0){
    error.classList.add("error-active");
    return -1;
  }
  const toInt = parseInt(trim);
  if (toInt <= -1 || toInt == null){
    error.classList.add("error-active");
    return -1;
  }else{
    error.classList.remove("error-active");
    return 0;
  }
}

const validLocation = () => {
  const target = document.getElementsByName("location");
  const error = target[0].parentElement.getElementsByClassName("error-text")[0];
  
  let checks = 0;
  for (i=0; i<target.length; i++){
    if (target[i].checked){
      checks++;
    }
  } 
  if (checks == 0){
    error.classList.add("error-active");
    validLocBind();
    return -1;
  }else{
    error.classList.remove("error-active");
    return 0;
  }
}

const validTerms = () => {
  const target = document.getElementById("checkbox1");
  const error = target.parentElement.getElementsByClassName("error-text")[0];
  if (!target.checked){
    error.classList.add("error-active");
    return -1;
  }else{
    error.classList.remove("error-active");
    return 0;
  }
}

// Binders for real-time validation
document.getElementById("first").addEventListener("keyup", function (){validNames("first")});

document.getElementById("last").addEventListener("keyup", function(){validNames("last")});

document.getElementById("email").addEventListener("keyup", function(){validEmail()});

document.getElementById("birthdate").addEventListener("keyup", function(){validBirthdate()});

document.getElementById("quantity").addEventListener("keyup", function(){validQuantity()});

document.getElementById("checkbox1").addEventListener("click", function(){validTerms()});

// These two set the binder on the location after error

const validLocEvent = (tar) => {
  const targets = document.getElementsByName("location");
  const target = targets[tar];
  const error = target.parentElement.getElementsByClassName("error-text")[0];
  target.addEventListener("click", function(){
    error.classList.remove("error-active");
    return;
  });
}

const validLocBind = () => {
  const target = document.getElementsByName("location");
  for (i = 0; i<target.length; i++){
    validLocEvent(i);
  }
}

// Final validation
const validate = () => {
  
  let val = 0;
  val = val + validNames("first");

  console.log("val = "+val);

  val = val + validNames("last");
  val = val + validEmail();
  val = val + validBirthdate();
  val = val + validLocation();
  val = val + validQuantity();
  //return false;
  if (val < 0){
    console.log("saw false" + val);
    return false;
  }else{
    console.log("saw true" + val);
    return false;
  }
  
}
