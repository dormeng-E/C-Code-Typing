const nicknameInput = document.getElementById("nickname");
const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");


// 저장된 닉네임 불러오기

const savedNickname = localStorage.getItem("nickname");

if (savedNickname) {

    nicknameInput.value = savedNickname;

}


// 엔터 입력으로 시작

nicknameInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        startGame();

    }

});


// 시작 버튼

startBtn.addEventListener("click", startGame);



function startGame() {


    message.textContent = "";


    const nickname = nicknameInput.value.trim();



    // 닉네임 검사

    if (nickname.length < 2) {

        message.textContent =
            "닉네임은 2글자 이상 입력하세요.";

        return;

    }



    if (nickname.length > 20) {

        message.textContent =
            "닉네임은 20글자 이하입니다.";

        return;

    }



    const regex = /^[가-힣a-zA-Z0-9_]+$/;



    if (!regex.test(nickname)) {

        message.textContent =
            "닉네임은 한글, 영어, 숫자, _(언더바)만 사용할 수 있습니다.";

        return;

    }



    // 닉네임 저장

    localStorage.setItem(
        "nickname",
        nickname
    );



    // 기본 기록 생성

    if (!localStorage.getItem("bestCPM")) {

        localStorage.setItem(
            "bestCPM",
            0
        );

        localStorage.setItem(
            "bestAccuracy",
            0
        );

        localStorage.setItem(
            "totalPlay",
            0
        );

    }



    // 타자 화면 이동

    location.href = "typing.html";


}