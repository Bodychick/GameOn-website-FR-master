function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const closeButton = document.querySelector(".close");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const radios = document.querySelectorAll(".checkbox-input");
const formDataRadio = document.getElementById("formDataRadio");

// Récupération des inputs
const firstName= document.getElementById('first');
const lastName= document.getElementById('last');
const emailInput = document.getElementById("email");

const birthDate = document.getElementById("birthdate");
var today = new Date();
const annee = today.getFullYear();
const mois = String(today.getMonth() + 1).padStart(2, '0');
const jour = String(today.getDate()).padStart(2, '0');
const todaysDate = `${annee}-${mois}-${jour}`;
birthDate.max = todaysDate;

//checkBoxConditionsGénérales
const checkBox1=document.getElementById("checkbox1");

//CONST REGEX
const regexName = /[a-zA-Z-]{3,}$/;
const regexMail =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

//Nombre d'évènements déjà participé
const quantity = document.getElementById("quantity");

//Check si submit
const submitButton = document.querySelector(".btn-submit");

// close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeButton.addEventListener("click",function closeModal() {
  modalbg.style.display="none";
});

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Listener sur les inputs firstname et lastname
firstName.addEventListener('change',function checkTheName() {
  checkName(firstName,"firstNameID");
});

lastName.addEventListener('change',function checkTheName() {
  checkName(lastName,"lastNameID");
});


/* CHECK DE L'ADRESSE MAIL AVEC AFFICHAGE D'UN MESSAGE SI PROBLEME */
emailInput.addEventListener("change",function testEmail(){
  var email = emailInput.value;
  if (isValidateEmail(email) && document.getElementById("checkMail")!=null) {
    // L'email est valide, continuer avec le traitement du formulaire et il y a déjà un message affiché
    const element= document.getElementById("checkMail");
    element.parentElement.removeChild(element);
  } 
  else if (isValidateEmail(email) == false && document.getElementById("checkMail")==null) {
    // L'email n'est pas valide, afficher un message d'erreur et il n'y a aucun message d'affiché
    createElement("p","checkMail",emailInput,"Veuillez entrer un email valide");
  }
})

/* CHECK SI DATE DE NAISSANCE */
birthDate.addEventListener("change", function checkBirthDate(){
  const dateOfBirth=birthDate.value;
  if(dateOfBirth >= todaysDate && document.getElementById("birthdateID")== null){
    //On ajoute un message s'il y en a pas de mis encore
    createElement("p","birthdateID",birthDate,"Veuillez entrer une date antérieure à celle d'aujourd'hui");
    console.log("Pas de message + Date sup ou égale à today")
  }
  else if(dateOfBirth >= todaysDate && document.getElementById("birthdateID")!= null){
    //DO NOTHING parce que il y a déjà un message d'affiché
    console.log("On laisse tout si message et date tjs today ou sup")
  }
  else if(dateOfBirth == "" && document.getElementById("birthdateID") == null){
    //On retire le message dans les autres cas
    createElement("p","birthdateID",birthDate,"Veuillez entrer votre date de naissance");
    console.log("On message si date non rentré et pas de messages")
  }
  else if(dateOfBirth < todaysDate && document.getElementById("birthdateID") != null) {
    console.log("Si date est bonne et un message on enlève")
    const element= document.getElementById("birthdateID");
    element.parentElement.removeChild(element);
  }

});

quantity.addEventListener("change",function checkQuantity(){
  const quantityVal = quantity.value;
  console.log(quantity.value)
  if(quantityVal=="" && document.getElementById("quantityID")==null) {
    createElement("p","quantityID",quantity,"Veuillez sélectionner une option");
  } 
  else if (quantityVal=="" && document.getElementById("quantityID")!=null)
  {
    //ON LAISSE COMME C'EST
  }
  else if (quantityVal>=0 && document.getElementById("quantityID")!=null)
  {
    const element= document.getElementById("quantityID");
    element.parentElement.removeChild(element);
  }
});

/* Vérifier qu'un nom et un prénom sont renseignés */
function checkName($name,$id) {
  console.log(regexName.test($name.value));
  if (!regexName.test($name.value) && document.getElementById($id) == null )
  {
    createElement("p",$id,$name,"3 caractères minimum sont nécessaires pour ce champ");
  }
  else if(regexName.test($name.value) && document.getElementById($id) != null) {
    const element= document.getElementById($id);
    element.parentElement.removeChild(element);
  }
}

//CHECK SI Radio est coché
modalbg.addEventListener("mouseenter", function checkAllRadio(){
  let isChecked = checkRadio();
  console.log(isChecked)  
  if (isChecked == false && document.getElementById("formDataRadio")==null){
    createElement("p","formDataRadio",formDataRadio,"Veuillez sélectionner un lieu")
  }
  else if (isChecked == true && document.getElementById("formDataRadio")!=null){
    const element= document.getElementById("formDataRadio");
    element.parentElement.removeChild(element);
  }
});

function checkRadio() {
  let isRadioChecked=false;
  radios.forEach((item)=> {
    if(item.checked){
      isRadioChecked=true;
    }
  });
  return isRadioChecked;
}


//Fonction pour créer un message d'erreur 
function createElement($typeElem="p",$id="",$element,$message="Veuillez saisir une information"){
  // Création de l'élément à insérer
  //console.log("je suis en create element")
  const errorMessage = document.createElement($typeElem);
  errorMessage.setAttribute("id",$id);
  errorMessage.textContent = $message;
  errorMessage.classList.add("warning-message"); 

  // Insertion de l'élément créé après l'élément <p> ayant la classe "text-label"
  $element.insertAdjacentElement("afterend", errorMessage);
}

function isValidateEmail(email) {
  // Vérifier si l'email est valide en utilisant test() de RegExp
  return regexMail.test(email);
}


//Alert quand bouton submit cliqué
submitButton.addEventListener("submit",function(){
  console.log('Click sur bouton');
  window.alert('Formulaire envoyé avec succès');
});



