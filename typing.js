import { problems } from "./codeData.js";


let totalCPM = 0;
let totalAccuracy = 0;
let totalTypo = 0;
let solvedCount = 0;


const nicknameText = document.getElementById("nicknameText");
const problemTitle = document.getElementById("problemTitle");
const codeArea = document.getElementById("codeArea");
const typingInput = document.getElementById("typingInput");

const accuracyText = document.getElementById("accuracy");
const cpmText = document.getElementById("cpm");
const typoText = document.getElementById("typo");
const progressText = document.getElementById("progress");

const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");


const nickname = localStorage.getItem("nickname");


if (!nickname) {

    location.href = "index.html";

}


nicknameText.textContent = nickname;


let currentProblem = 0;

let startTime = null;

let typoCount = 0;



loadProblem();



typingInput.addEventListener(
    "input",
    updateTyping
);



typingInput.addEventListener(
    "keydown",
    (e)=>{


        if(e.key==="Tab"){

            e.preventDefault();

            insertTab();

        }


    }
);



restartBtn.addEventListener(
    "click",
    ()=>{


        currentProblem = 0;

        totalCPM = 0;

        totalAccuracy = 0;

        totalTypo = 0;

        solvedCount = 0;


        loadProblem();


    }
);



homeBtn.addEventListener(
    "click",
    ()=>{

        location.href="index.html";

    }
);




function loadProblem(){


    const problem =
        problems[currentProblem];


    problemTitle.textContent =
    `문제 ${problem.id} - ${problem.title}`;



    createCodeView(problem.code);



    typingInput.value="";

    typingInput.focus();



    accuracyText.textContent="100%";

    cpmText.textContent="0";

    typoText.textContent="0";

    progressText.textContent="0%";



    startTime=null;

    typoCount=0;


}





function createCodeView(code){


    codeArea.innerHTML="";



    [...code].forEach((char,index)=>{


        const span =
            document.createElement("span");


        span.textContent =
            char;


        span.dataset.index =
            index;



        codeArea.appendChild(span);


    });



    updateCursor();


}






function updateTyping(){


    const target =
        problems[currentProblem].code;


    const input =
        typingInput.value;



    if(startTime===null && input.length>0){

        startTime=Date.now();

    }



    const spans =
        codeArea.querySelectorAll("span");



    let correct=0;


    typoCount=0;



    spans.forEach((span,index)=>{


        span.className="";



        if(index<input.length){


            if(input[index]===target[index]){


                span.classList.add(
                    "correct"
                );


                correct++;


            }

            else{


                span.classList.add(
                    "wrong"
                );


                typoCount++;


            }


        }


    });



    updateCursor();




    const accuracy =
        input.length===0
        ?100
        :(correct/input.length)*100;



    const progress =
        (input.length/target.length)*100;




    let cpm=0;



    if(startTime!==null){


        const minutes =
        (Date.now()-startTime)/60000;



        if(minutes>0){


            cpm =
            Math.round(
                correct/minutes
            );


        }


    }



    accuracyText.textContent =
        accuracy.toFixed(1)+"%";


    cpmText.textContent =
        cpm;


    typoText.textContent =
        typoCount;


    progressText.textContent =
        Math.min(
            progress,
            100
        ).toFixed(1)+"%";





    if(input===target){


        setTimeout(
            nextProblem,
            300
        );


    }


}





function updateCursor(){


    const spans =
        codeArea.querySelectorAll("span");


    spans.forEach(span=>{


        span.classList.remove(
            "current"
        );


    });



    const index =
        typingInput.value.length;



    if(spans[index]){


        spans[index].classList.add(
            "current"
        );


        spans[index].scrollIntoView({

            block:"nearest"

        });


    }


}






function insertTab(){


    const start =
        typingInput.selectionStart;


    const end =
        typingInput.selectionEnd;



    const value =
        typingInput.value;



    typingInput.value =
        value.substring(0,start)
        +
        "    "
        +
        value.substring(end);



    typingInput.selectionStart =
    typingInput.selectionEnd =
        start+4;



    updateTyping();


}





function nextProblem(){


    totalCPM +=
        Number(
            cpmText.textContent
        );



    totalAccuracy +=
        parseFloat(
            accuracyText.textContent
        );



    totalTypo +=
        typoCount;



    solvedCount++;



    currentProblem++;



    if(currentProblem>=problems.length){



        const averageCPM =
        Math.round(
            totalCPM/solvedCount
        );



        const averageAccuracy =
        (
            totalAccuracy/
            solvedCount
        ).toFixed(1);



        localStorage.setItem(
            "lastCPM",
            averageCPM
        );


        localStorage.setItem(
            "lastAccuracy",
            averageAccuracy
        );


        localStorage.setItem(
            "lastTypo",
            totalTypo
        );



        location.href=
        "result.html";


        return;


    }



    loadProblem();


}