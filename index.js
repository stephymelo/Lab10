/////Inputs
const identifcacion=document.getElementById('identificacion');
const nombre=document.getElementById('nombre');
const candidato=document.getElementById('candidato');
/////Botones
const registrarButton=document.getElementById('registrar');
const verCandidatosButton=document.getElementById('verCandidatos');
const verVotacionesButton=document.getElementById('verVotaciones')
const votarButton=document.getElementById('votar')
const database=firebase.database();




validarCandidato = (id, nom) => {

    if (id === "" || nom === "") {

        alert("Esta vacio");
        return false;
    }

    let candidatoNuevo = true ;
    database.ref('candidato').on('value', function (data) {
        data.forEach(
            function (CandidatoNuevo) {
                let valor = CandidatoNuevo.val();
                let idCan = valor.candidato;
                if (idCan === id) {
                    candidatoNuevo = false;
                }
            }
        )
    });
   return candidatoNuevo;
}

registrar = () => {
    let identi = identifcacion.value;
    let nomb = nombre.value;
    if (validarCandidato(identi, nomb)) {
        let Candidato = {
            id: identi,
            nombre: nomb
        }
        database.ref('candidato').push().set(Candidato);
    }
}

votar = () => {

    let idVotacion = candidato.value;
    let votacion ={
        idVoto:Math.random(),
        id:idVotacion
    }

        let v;
        let esDif = false;
        database.ref('Candidatos').on('value',function (data){
        data.forEach(
            function (voto) {
                let valor = voto.val();
                let id = valor.id;
                if (id === idVotacion) {
                   esDif=true;
                v =voto.v;
                }
            }
        )
        });
        if(esDif){
        database.ref('Candidatos').child(key).child('votos').push().set(voto);
        database.ref('Votos').push().set(votacion); 
        }
}

verCandidatos =()=>{
    let nombres =[];
    database.ref('Candidatos').on('value',function (data){
        data.forEach(
            function(Candidato){
                let valor = Candidato.val();
                nombres.push(valor.nombre+"  "+valor.id+" ");   
            }
        )
    })
    alert(nombres);
}

verVotaciones =()=>{
    let totalVotaciones;
    let votacionesPercentage =[];
    database.ref('Votos').on('value',function (data){
        totalVotaciones=data.numChildren();
    });

    database.ref('Candidatos').on('value',function (data){
        data.forEach(
            function(C){
               let valor = C.val();
               let key = C.key;
               let name = valor.nombre;
               database.ref('Candidatos').child(key).child('votos').on('value',function(dataVotaciones){

                    votacionesPercentage.push(name +" "+ dataVotaciones.numChildren()/totalVotaciones*100+" % ");
               });   
            }
        )
        alert(votacionesPercentage)  
    })

}


votarButton.addEventListener('click',votar);
registrarButton.addEventListener('click',registrar);
verCandidatosButton.addEventListener('click',verCandidatos);
verVotacionesButton.addEventListener('click',verVotaciones)





