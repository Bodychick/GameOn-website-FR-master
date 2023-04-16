function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
// Sélection des modals séparemment pour gérer l'affichage au submit
//const subButton = document.getElementById("subButton");

const modalbg = document.getElementById("modal-bg-ground");
const modalBtn = document.querySelectorAll(".modal-btn");
const monFormulaire = document.getElementsByName("reserve");

const radios = document.querySelectorAll("input[type=radio]");
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

let valideForm = {
  "first":false,
  "last":false,
  "email":false,
  "birthDate":false,
  "quantity":false,
  "lieu":false,
  "checkbox1":false,
}

//Selection de tous les boutons closes
const closeButton = document.querySelectorAll(".close");

//Check RADIO
let isRadioChecked=false;

//checkBoxConditionsGénérales
const checkbox1=document.getElementById("checkbox1");
const checkbox1Label=document.querySelector(".checkbox2-label");

//CONST REGEX
const regexName =/^[a-zA-Z-éèê]{2,}$/;
const regexMail =/^[a-zA-Z0-9.éèê_+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

//Nombre d'évènements déjà participé
const quantity = document.getElementById("quantity");

//Check si submit
const submitButton = document.querySelector(".btn-submit");

// close modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeButton.forEach((item)=> {
  item.addEventListener("click",function closeModal() {
    console.log("ça clique sur le bouton")
     // Cible la modale parente du bouton
     const modal = item.closest('.bground');
     // Masque la modale
     modal.style.display = 'none';
  });
});

function createModal(){
  
  modalbg.style.display="none";
  //------------ DEBUT CREATION MODAL 2 -----------------
  //On créé la div modal global
  const validateModal = document.createElement("div");
  validateModal.setAttribute("id","validateModal");
  validateModal.classList.add("bground");

  //On créé la div qui va devenir le child dans la modale
  const contentValidModal = document.createElement("div");
  contentValidModal.classList.add("content");

  //Ajout du bouton close dans le content
  const closeButtonModal = document.createElement("span")
  closeButtonModal.classList.add("close");

  //Ajout du content 
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");
  const title = document.createElement("h1")
  title.innerHTML="Merci de votre visite";
  title.classList.add("center")
  modalBody.appendChild(title);

  // Création du bouton OK
  const submitButton2 = document.createElement("button");
  submitButton2.textContent="OK";
  submitButton2.classList.add("btn-submit", "button");
  submitButton2.setAttribute("id","subButton");
  modalBody.appendChild(submitButton2);

  // Insertion du contenu juste après le bouton close
  contentValidModal.appendChild(closeButtonModal);
  contentValidModal.appendChild(modalBody);

  validateModal.appendChild(contentValidModal);

  //On insert la modal juste après modalBg
  modalbg.insertAdjacentElement("afterend",validateModal);

  //on sélectionne le bouton après sa création
 
  //------------------- FIN CREATION MODAL 2-------------------
  validateModal.style.display="block";

  const subButton = document.getElementById("subButton");

  subButton.addEventListener("click",function(){
    console.log("click");
   console.log(document.getElementById("validateModal"));
    document.getElementsByName("reserve")[0].reset();
    document.getElementById("validateModal").remove();
  });
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//Listener sur les inputs firstname et lastname
firstName.addEventListener("input",function checkTheName() {
  checkName(firstName,"firstNameID");
});

lastName.addEventListener("input",function checkTheName() {
  checkName(lastName,"lastNameID");
});


/* CHECK DE L'ADRESSE MAIL AVEC AFFICHAGE D'UN MESSAGE SI PROBLEME */
emailInput.addEventListener("input",testEmail)

function testEmail(){
  var email = emailInput.value;
  if (isValidateEmail(email) && document.getElementById("checkMail")!=null) {
    // L'email est valide, continuer avec le traitement du formulaire et il y a déjà un message affiché
    valideForm["email"]=true;
    const element= document.getElementById("checkMail");
    element.parentElement.removeChild(element);
  } 
  else if (isValidateEmail(email) == false && document.getElementById("checkMail")==null) {
    // L'email n'est pas valide, afficher un message d'erreur et il n'y a aucun message d'affiché
    createElement("p","checkMail",emailInput,"Veuillez entrer un email valide");
    valideForm["email"]=false;
  }
}

/* VERIFIER SI DATE DE NAISSANCE */
birthDate.addEventListener("change", checkBirthDate);

function checkBirthDate(){
  var dateOfBirth=birthDate.value;
  if(dateOfBirth >= todaysDate && document.getElementById("birthdateID")== null){
    //On ajoute un message s'il y en a pas de mis encore
    createElement("p","birthdateID",birthDate,"Veuillez entrer une date antérieure à celle d'aujourd'hui");
    console.log("Pas de message + Date sup ou égale à today")
    valideForm["birthDate"]=false;
  }
  else if(dateOfBirth >= todaysDate && document.getElementById("birthdateID")!= null){
    //Ne rien faire parce que il y a déjà un message d'affiché
    console.log("On laisse tout si message et date tjs today ou sup")
    valideForm["birthDate"]=false;
  }
  else if(dateOfBirth == "" && document.getElementById("birthdateID") == null){
    //On retire le message dans les autres cas
    createElement("p","birthdateID",birthDate,"Veuillez entrer votre date de naissance");
    console.log("On message si date non rentré et pas de messages")
    valideForm["birthDate"]=false;
  }
  else if(dateOfBirth < todaysDate && document.getElementById("birthdateID") != null && dateOfBirth != "") {
    valideForm["birthDate"]=true;
    console.log("Si date est bonne et un message on enlève")
    const element= document.getElementById("birthdateID");
    element.parentElement.removeChild(element);
  }
  else {
    valideForm["birthDate"]=true;
  }

}

quantity.addEventListener("input",checkQuantity);
function checkQuantity(){
  const quantityVal = quantity.value;
  if(quantityVal=="" && document.getElementById("quantityID")==null) {
    valideForm["quantity"]=false;
    createElement("p","quantityID",quantity,"Veuillez remplir ce champ");
  } 
  else if (quantityVal=="" && document.getElementById("quantityID")!=null)
  {
    valideForm["quantity"]=false;
    //ON LAISSE COMME C'EST
  }
  else if (quantityVal>=0 && document.getElementById("quantityID")!=null)
  {
    valideForm["quantity"]=true;
    const element= document.getElementById("quantityID");
    element.parentElement.removeChild(element);
  }
  else {
    valideForm["quantity"]=true;
  }
}

/* Vérifier qu'un nom et un prénom sont renseignés */
function checkName($name,$id) {
  if (regexName.test($name.value) == false && document.getElementById($id) == null )
  {
    valideForm[$name.name]=false;
    createElement("p",$id,$name,"2 caractères minimum sont nécessaires pour ce champ");
  }
  else if(regexName.test($name.value) == true && document.getElementById($id) != null) {
    valideForm[$name.name]=true;
    const element= document.getElementById($id);
    element.parentElement.removeChild(element);
  }
}

//Pour tous les radios,on check s'il y a un click
radios.forEach((item)=> {
  item.addEventListener("click",function checkRadio(){
    valideForm["lieu"]=true;
    if (item.checked == true && document.getElementById("radioMessage")!=null){
      const element= document.getElementById("radioMessage");
      element.parentElement.removeChild(element);
    }
  })
});

//
function checkRadio(){
  valideForm["lieu"]=false;
  radios.forEach((item)=> {
    if(item.checked==true){
      valideForm["lieu"]=true;
    }
  }); 
  console.log(valideForm["lieu"]==false)
  if (valideForm["lieu"]==false && document.getElementById("radioMessage")==null){
    createElement("p","radioMessage",formDataRadio,"Veuillez sélectionner un lieu");
  }
  else if (valideForm["lieu"]==true && document.getElementById("radioMessage")!=null){
    const element= document.getElementById("radioMessage");
    element.parentElement.removeChild(element);
  }
}

checkbox1.addEventListener("click",checkConditions);

function checkConditions(){
  console.log(checkbox1.checked);
  if (checkbox1.checked == false && document.getElementById("checkbox1Message")==null){
    console.log("Veuillez cocher la case");
    valideForm["checkbox1"]=false;
    createElement("p","checkbox1Message",checkbox1Label,"Veuillez cocher la case");
  } 
  else if (checkbox1.checked == false && document.getElementById("checkbox1Message")!=null) {
    //LAISSER LE MESSAGE
    valideForm["checkbox1"]=false;
  } else if(checkbox1.checked == true && document.getElementById("checkbox1Message")!=null){
    console.log("JE SUIS VRAI")
    valideForm["checkbox1"]=true;
    const element= document.getElementById("checkbox1Message");
    element.parentElement.removeChild(element);
  } else {
    valideForm["checkbox1"]=true;
  }
  
}

checkbox1.addEventListener("click",checkConditions)

//Fonction pour créer un message d'erreur 
function createElement($typeElem="p",$id="",$element,$message="Veuillez saisir une information"){
  // Création de l'élément à insérer
  console.log("je suis en create element")
  const errorMessage = document.createElement($typeElem);
  errorMessage.setAttribute("id",$id);
  errorMessage.textContent = $message;
  errorMessage.classList.add("warning-message"); 

  // Insertion de l'élément créé après l'élément <p> ayant la classe "text-label"
  $element.insertAdjacentElement("afterend", errorMessage);
}

// Vérifier si l'email est valide en utilisant test() de RegExp
function isValidateEmail(email) {
  return regexMail.test(email);
}

//Verifier si tous les éléments du tableau de vérification
function toutesLesValeursSontVraies(valideForm) {
  for (var val in valideForm) {
    if (valideForm[val] === false) {
      return false;
    }
  }
  return true;
}


//Alert quand bouton submit cliqué
submitButton.addEventListener("click",function(event){
  console.log(monFormulaire)
  console.log(birthDate.value)
  if(regexName.test(firstName.value)==true){
    valideForm["first"] == true;
  }
  else {
    valideForm["first"] == false;
    checkName(firstName,"firstNameID");
  }

  if(regexName.test(lastName.value)==true){
    valideForm["last"] == true;
  }
  else {
    valideForm["last"] == false;
    checkName(lastName,"lastNameID");
  }
  if(regexMail.test(emailInput.value)==true){
    valideForm["email"] == true;
  }
  else {
    valideForm["email"] == false;
    testEmail();
  }

  checkBirthDate();
  checkConditions();
  checkQuantity();
  checkRadio();

  if (toutesLesValeursSontVraies(valideForm)) {

    //affichage de la modal
    createModal();

    event.preventDefault();
  }
  else {
    event.preventDefault();
  }

});





