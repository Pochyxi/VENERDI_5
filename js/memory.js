let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
//libreria per icone
//https://html-css-js.com/html/character-codes/


let arrayComparison = [];

document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer
var interval;
let find = document.getElementsByClassName('find');
let modal = document.getElementById('modal');
var timer = document.querySelector('.timer');

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
// una funzione che rimuove la classe active e chiama la funzione startGame()
function playAgain() {
    modal.classList.remove("active");
    startGame();
}

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
// pulisce tutti gli elementi che eventualmente contiene
// poi fa ciclo per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto
function startGame() {
    clearInterval(interval) // attualmente interval è una variabile senza nome, questo comando mi servirà, quando andrò a definire interval come una setInterval function che mostra il timer di gioco  e quindi ad ogni partita deve resettarsi

    arrayConfronto = []; // questo è il mio array vuoto

    var arrayCasuale = shuffle(arrayAnimali);

    var lista = document.getElementById('griglia');

    while (lista.hasChildNodes()) { // questo è un ciclo che dice fino a che il div con id griglia ha qualsiasi tipo di contenuto, toglilo fino a quando hasChildNodes() sarà false cioè il div è completamente vuoto.
        lista.removeChild(lista.firstChild);
    }

    for (var i = 0; i < 24; i++) { // un ciclo per inserire i div nuovi e compilare il div griglia 
        var box = document.createElement('div'); // questo e il div più esterno
        var elemento = document.createElement('div'); // questo è il div interno
        elemento.className = 'icon' // do la classe icon al div interno
        document.getElementById('griglia').appendChild(box).appendChild(elemento);
        elemento.innerHTML = arrayCasuale[i]
    }
    // faccio partire il timer
    startTimer2();

    var icon = document.getElementsByClassName('icon');
    var icons = [...icon];

    for (var i = 0; i < icons.length; i++) {
        icons[i].addEventListener('click', displayIcon);
        icons[i].addEventListener('click', openModal);
    }


}


function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon]; // creare un array da un HTMLCollection
    this.classList.toggle('show') // aggiunge e rimuove la classe show da icons
    arrayComparison.push(this)// aggiungiamo l'elemento icon all'array di comparazione

    var lunghezza = arrayComparison.length; // ritorna il numero della lunghezza dell'array di comparazione

    if (lunghezza === 2) { // se la lunghezza dell'array di comparazione e uguale a 2
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) { // se il contenuto 1 risulta uguale al contenuto 2
            arrayComparison[0].classList.add('find', 'disabled');//disabilita contenuto 1 e aggiungi la classe find(animazione)
            arrayComparison[1].classList.add('find', 'disabled');// fai anche al contenuto 2 la stessa cosa
            arrayComparison = []; // fatto ciò svuotami l'array di comparazione
        } else { // se non sono uguali
            icons.forEach(function(item){
                item.classList.add('disabled') // aggiungi alle icone solo la classe disabled
            });
            
            setTimeout(function(){
                arrayComparison[0].classList.remove('show');// rimuovo la classe show
                arrayComparison[1].classList.remove('show');
                icons.forEach(function(item) {
                    item.classList.remove('disabled'); // rimuovo la classe disabled a tutte le icone
                    for (var i = 0; i < find.length; i++) {
                        find[i].classList.add('disabled');
                    }
                });
                arrayComparison = []; // pulisco l'array di comparazione
            }, 700) // l'evento avrà luogo 700ms dopo
        }
    }
} 


//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte
function openModal(){
    if (find.length == 24) {
        clearInterval(interval);
        modal.classList.add('active');
        document.getElementById('tempoTrascorso').innerHTML = timer.innerHTML
        closeModal();
    }
}


// una funzione che nasconde la modale alla fine e riavvia il gioco
function closeModal() {
    closeicon.addEventListener('click', function(e) {
        modal.classList.remove('active');
        startGame();
    })
}


// una funzione che calcola il tempo e aggiorna il contenitore sotto
// function startTimer() {
//     var secondi = 0;
//     var minuti = 0;
//     var ore = 0;

//     interval = setInterval(function(){
//         timer.innerHTML = 'Tempo: ' + minuti + ' min ' + secondi + ' sec';
//         secondi ++;
//         if (secondi == 60) {
//             minuti++;
//             secondi = 0;
//         }
//         if (minuti == 60) {
//             ore++;
//             minuti = 0;
//         }
//     }, 1000);
// }



