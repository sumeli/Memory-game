const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockboard = false;
let firstCard, secondCard;

function flipCard(){
    if(lockboard)
    return;
    if(this === firstCard)
    return;
    this.classList.add('flip');

    if(!hasFlippedCard){
        //first click
        hasFlippedCard = true;
        firstCard = this;
    }
    else{
        //second click
        secondCard = this;
        checkFormatch();
    }
}

function checkFormatch(){
   //checking if the cards matched
        if(firstCard.dataset.framework === secondCard.dataset.framework){
            //when it matches
            disableCard();
        }
        else{
            //when it does not matches
            unflipCrd();
        }
}

function disableCard(){
    //it's a match
    firstCard = removeEventListener('click', flipCard);
    secondCard = removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCrd(){
    lockboard = true;
    //it's not a match
    setTimeout(() =>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');  
        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard , lockboard] = [false, false];
    [firstCard , secondCard] = [null, null];
}

(function suffle(){
    cards.forEach(card => {
        let randompos = Math.floor(Math.random() * 20);
        card.style.order = randompos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard ));