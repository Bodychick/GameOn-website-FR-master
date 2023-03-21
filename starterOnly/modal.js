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
const radio = document.querySelectorAll(".checkbox-input");

// Récupération de l'élément <p> ayant la classe "text-label"
const textLabel = document.querySelector("p.text-label");
const warningMessage = document.querySelector("p.warning-message");

// Récupération des inputs
const firstName= document.getElementById('first');
const lastName= document.getElementById('last');
const emailInput = document.getElementById("email");
const email = emailInput.value;

//Listener sur les inputs firstname et lastname
firstName.addEventListener('focusout',function checkTheName() {
  checkName(firstName,"firstNameID");
});

lastName.addEventListener('focusout',function checkTheName() {
  checkName(lastName,"lastNameID");
});


/* CHECK DE L'ADRESSE MAIL AVEC AFFICHAGE D'UN MESSAGE SI PROBLEME */
emailInput.addEventListener("focusout",function testEmail(email){
  console.log(validateEmail(email));
  if (validateEmail(email) && document.getElementById("checkMail")!=null) {
    // L'email est valide, continuer avec le traitement du formulaire
    const element= document.getElementById("checkMail");
    element.parentElement.removeChild(element);
  } 
  else if (validateEmail(email) == false && document.getElementById("checkMail")==null) {
    // L'email n'est pas valide, afficher un message d'erreur
    createElement("p","checkMail",emailInput,"Veuillez entrer un email valide");
  }
})

/* Vérifier qu'un nom et un prénom sont renseignés */
function checkName($name,$id) {
  if ($name.value.length<=2 && document.getElementById($id) == null )
  {
    createElement("p",$id,$name,"Veuillez entrer votre prénom");
  }
  else if($name.value.length>2 && document.getElementById($id) != null) {
    const element= document.getElementById($id);
    element.parentElement.removeChild(element);
  }

}

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

//CHECK SI Radio est coché
modalbg.addEventListener("show.bs.modal", function(){
  console.log("Modal chargée");
  checkRadio();
});

function checkRadio() {
  var nbRadioChecked=0;
  radio.forEach((item)=> {
    if(item.checked){
      nbRadioChecked++;
    }
  });
  if(nbRadioChecked==0 && warningMessage){
    createElement();
  }
}


function createElement($typeElem="p",$id="",$element,$message="Veuillez saisir une information"){
  // Création de l'élément à insérer
  console.log("je sui en create element")
  const errorMessage = document.createElement($typeElem);
  errorMessage.setAttribute("id",$id);
  errorMessage.textContent = $message;
  errorMessage.classList.add("warning-message"); 

  // Insertion de l'élément créé après l'élément <p> ayant la classe "text-label"
  $element.insertAdjacentElement("afterend", errorMessage);
}

function validateEmail(email) {
  // Expression régulière pour valider un email
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;
  
  // Vérifier si l'email est valide en utilisant test() de RegExp
  return regex.test(email);
}


//Alert quand bouton submit cliqué
submitButton.addEventListener("click",function(){
  console.log('Click sur bouton');
  windows.alert('Formulaire envoyé');
});



