const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    mistakeTag = document.querySelector(".mistake span"),
    timeTag = document.querySelector(".time span b"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span"),
    tryAgainBtn = document.querySelector(".content button");


let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = mistakes = isTyping = 0;

function randomPara(){
    // getting random number and it will be always less than paragraphs length
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML="";
    // getting random item from the paragraphs array, splitting all characters
    paragraphs[randIndex].split("").forEach(span=>{
       let spanTag = `<span>${span}</span>`;
       typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    // focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());

}

randomPara();

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];

    if(charIndex < characters.length -1 && timeLeft > 0){
        if(!isTyping){// once timer starts it won't restart again on every key typed
            timer = setInterval(initTimer, 1000);
            console.log(timer);
            isTyping = true;
        }

        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        }else {
            if (characters[charIndex].innerText === typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++; // increment either is correct or incorrect
        }
        characters.forEach(span => span.classList.remove("active"))
        characters[charIndex].classList.add("active");

        //subtracting total mistakes from the total typed characters then dividing it by 5 and again dividing this output by subtracting timeleft from maxtime and last multiplying the output with 60.5 means assuming 5 char = 1 word
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);

        // if timeleft is greater yhan 0 then decrement the timeLeft else clear the timer
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistakeTag.innerHTML = mistakes;
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIndex - mistakes; // cpm will not count mistakes
    }else{
        inpField.value="";
        clearInterval(timer);
    }
}

function initTimer() {

    if(timeLeft > 0){
        timeLeft --;
        timeTag.innerHTML = timeLeft;
    }else{
        clearInterval(timer);
    }
}

function resetGame() {
    randomPara();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);