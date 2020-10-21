const identifcacion=document.getElementById('identificacion');
const nombre=document.getElementById('nombre');
const candidato=document.getElementById('candidato');
const registrarButton=document.getElementById('registrar');
const verCandidatosButton=document.getElementById('verCandidatos');
const verVotacionesButton=document.getElementById('verVotaciones')
const votarButton=document.getElementById('votar')
var database=firebase.database();

/*  if(p!=p){
    alert('numero de votaciones');
    return;
} */


registrar=()=>{
    let nombreValue=nombre.value;
    let idValue=identifcacion.value;
    var user= new User(nombreValue,idValue);
    let json=JSON.stringify(user);
    console.log(json);
    database.ref('users/').push().set(user);

}

votacion=()=>{
    let candidatoValue=candidato.value;

    let voto={
        candidato:candidatoValue,
    }

    let json=JSON.stringify(voto);
    console.log(voto);
    //database.ref('users/').push().set(user);

}



votarButton.addEventListener('click',votacion);
registrarButton.addEventListener('click',registrar);




