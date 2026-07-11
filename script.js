const problems = [

`#include <stdio.h>

int main()
{
    printf("Hello World");
    return 0;
}`,



`int main()
{
    int number = 10;

    printf("%d", number);

    return 0;
}`,



`for(int i=0; i<10; i++)
{
    printf("%d", i);
}`,



`if(score >= 90)
{
    printf("A");
}
else
{
    printf("B");
}`,



`int add(int a, int b)
{
    return a+b;
}`


];




let currentProblemIndex =
Math.floor(Math.random()*problems.length);


let codeText =
problems[currentProblemIndex];



const codeDisplay =
document.getElementById("codeDisplay");


const inputBox =
document.getElementById("inputBox");


const timer =
document.getElementById("timer");


const resultOverlay =
document.getElementById("resultOverlay");


const result =
document.getElementById("result");


const nextBtn =
document.getElementById("nextBtn");


const nickname =
document.getElementById("nickname");


const saveBtn =
document.getElementById("saveBtn");


const rankingList =
document.getElementById("rankingList");



let startTime=null;

let timerInterval=null;

let finished=false;




function loadCode(){


codeDisplay.innerHTML="";


for(let i=0;i<codeText.length;i++){


let span=document.createElement("span");


span.textContent=codeText[i];

span.id="char"+i;


codeDisplay.appendChild(span);


}


}



loadCode();






inputBox.addEventListener("input",function(){


if(finished)return;



if(startTime===null){


startTime=new Date();


timerInterval=
setInterval(updateTimer,100);


}



checkInput();


});







function checkInput(){


let input=inputBox.value;



for(let i=0;i<codeText.length;i++){


let char=
document.getElementById("char"+i);


char.className="";



if(i<input.length){


if(input[i]===codeText[i]){

char.className="correct";

}

else{

char.className="wrong";

}


}



}



if(input.length===codeText.length){


let correct=true;


for(let i=0;i<input.length;i++){


if(input[i]!==codeText[i]){

correct=false;

}

}


if(correct){

finish();

}


}


}








function updateTimer(){


let now=new Date();


let seconds=
(now-startTime)/1000;


timer.innerText=
seconds.toFixed(1)+"초";


}









function finish(){


finished=true;


clearInterval(timerInterval);



let endTime=new Date();



let seconds=
(endTime-startTime)/1000;



let speed=
(codeText.length/seconds)*60;



result.innerHTML=

`
소요 시간 : ${seconds.toFixed(1)}초
<br><br>
타자 속도 : ${Math.floor(speed)}타
`;



resultOverlay.style.display="flex";


inputBox.disabled=true;


loadRanking();



}







function loadRanking(){


let data=
localStorage.getItem(
"ranking_"+currentProblemIndex
);



if(data===null){

rankingList.innerHTML=
"<li>기록 없음</li>";

return;

}



let ranking=
JSON.parse(data);



rankingList.innerHTML="";



ranking.forEach(function(item){


let li=document.createElement("li");


li.innerHTML=
`
${item.name}
<br>
${item.speed}타
`;

rankingList.appendChild(li);


});


}








saveBtn.addEventListener("click",function(){


let name=
nickname.value.trim();



if(name===""){

alert("닉네임을 입력하세요");

return;

}



let speed=
Number(
result.innerHTML.match(/\d+(?=타)/)[0]
);



let key=
"ranking_"+currentProblemIndex;



let ranking=
JSON.parse(
localStorage.getItem(key)
)
||
[];



ranking.push({

name:name,

speed:speed

});



ranking.sort(function(a,b){

return b.speed-a.speed;

});



ranking=ranking.slice(0,10);



localStorage.setItem(

key,

JSON.stringify(ranking)

);



loadRanking();



saveBtn.style.display="none";


});








nextBtn.addEventListener("click",function(){


currentProblemIndex=
Math.floor(Math.random()*problems.length);


codeText=
problems[currentProblemIndex];



inputBox.value="";

inputBox.disabled=false;


finished=false;


startTime=null;


clearInterval(timerInterval);


timer.innerText="0.0초";


resultOverlay.style.display="none";


nickname.value="";


saveBtn.style.display="inline-block";


loadCode();


loadRanking();


});









inputBox.addEventListener("keydown",function(e){


if(e.key==="Tab"){


e.preventDefault();



let start=this.selectionStart;


let end=this.selectionEnd;



this.value=
this.value.substring(0,start)
+"    "
+this.value.substring(end);



this.selectionStart=
this.selectionEnd=start+4;


}


});