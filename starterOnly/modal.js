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

//Listener sur les inputs firstname et lastname
firstName.addEventListener('focusout',function checkTheName() {
  checkName(firstName,"firstNameID");
});

lastName.addEventListener('focusout',function checkTheName() {
  checkName(lastName,"lastNameID");
});

/* Vérifier qu'un nom et un prénom sont renseignés */
function checkName($name,$id) {
  console.log($name.value.length);
  if ($name.value.length<=2 && document.getElementById($id) == null )
  {
    console.log("Inferieur à 2")
    createElement("p",$id,$name,"Veuillez entrer votre prénom");
  }
  else if($name.value.length>2 && document.getElementById($id) != null) {
    console.log("jSupp à 2")
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

//Alert quand bouton submit cliqué
submitButton.addEventListener("click",function(){
  console.log('Click sur bouton');
  windows.alert('Formulaire envoyé');
});



