let langOption = document.querySelectorAll("select");
let from = document.querySelector(".fromtext");
let button = document.querySelector(".button");
let to = document.querySelector(".totext");
let fromvoice = document.querySelector(".fromvoice")
let tovoice = document.querySelector(".tovoice")
let wordcount = document.querySelector(".count");
let copytext = document.querySelector(".copy");

langOption.forEach((get,con) =>{

    for (let code in language) {

        let selected;
        if(con == 0 && code == "en-GB")
        {
            selected = "selected";
        }
        else if(con == 1 && code == "ta-LK"){
            selected = "selected";
        }

        let option = `<option value="${code}" ${selected}>${language[code]}</option>`;

        get.insertAdjacentHTML('beforeend',option);
        
    }
})

button.addEventListener('click',function(){
    let content = from.value;
    fromContent = langOption[0].value;
    toContent = langOption[1].value;

    let dataLink = `https://api.mymemory.translated.net/get?q=${content}!&langpair=${fromContent}|${toContent}`;

    fetch(dataLink).then(translate => translate.json()).then(data => {
        to.value = data.responseData.translatedText;
    })
})

fromvoice.addEventListener("click",function(){

    let talk;
    talk = new SpeechSynthesisUtterance(from.value);
    talk.lang = langOption[0].value;
    speechSynthesis.speak(talk);
})

tovoice.addEventListener("click",function(){

    let transtalk;
    transtalk = new SpeechSynthesisUtterance(to.value);
    transtalk.lang = langOption[1].value;
    speechSynthesis.speak(transtalk);
})

from.addEventListener("keyup",function(){
    wordcount.innerHTML = `${from.value.length}/1000`;
})

copytext.addEventListener("click",function(){
    navigator.clipboard.writeText(to.value);
})