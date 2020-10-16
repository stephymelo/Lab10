const identifcacion=document.getElementById('indentificacion');
const nombre=document.getElementById('nombre');
const candidato=document.getElementById('candidato');
const registrarButton=document.getElementById('registrar');
const verCandidatosButton=document.getElementById('verCandidatos');
const verVotacionesButton=document.getElementById('verVotaciones')
var database=firebase.database();

/*  if(p!=p){
    alert('numero de votaciones');
    return;
} */


registrar=()=>{
    let nombreValue=nombre.value;
    let idValue=identifcacion.value;
    let candidatoValue=candidato.value;

    let user = {
        nombre:nombreValue,
        identifcacion:idValue,
    }

    let json=JSON.stringify(user);
    database.ref('users/').push().set(user);

    registrarButton.addEventListener('click',registrar);

}