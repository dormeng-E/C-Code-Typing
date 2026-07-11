// 저장된 결과 가져오기

const nickname = localStorage.getItem("nickname");

const cpm = Number(
    localStorage.getItem("lastCPM")
);

const accuracy = Number(
    localStorage.getItem("lastAccuracy")
);

const typo = Number(
    localStorage.getItem("lastTypo")
);


// 화면 출력

document.getElementById("nickname").textContent = nickname;

document.getElementById("cpm").textContent = cpm;

document.getElementById("accuracy").textContent =
    accuracy + "%";

document.getElementById("typo").textContent = typo;



// 기존 최고 기록 가져오기

const bestCPM = Number(
    localStorage.getItem("bestCPM") || 0
);

const bestAccuracy = Number(
    localStorage.getItem("bestAccuracy") || 0
);


const totalPlay = Number(
    localStorage.getItem("totalPlay") || 0
);


// 최고 기록 갱신

if (cpm > bestCPM) {

    localStorage.setItem(
        "bestCPM",
        cpm
    );

}


if (accuracy > bestAccuracy) {

    localStorage.setItem(
        "bestAccuracy",
        accuracy
    );

}


// 플레이 횟수 증가

localStorage.setItem(
    "totalPlay",
    totalPlay + 1
);



// 최고 기록 표시

const bestCPMText =
    document.getElementById("bestCPM");

const bestAccuracyText =
    document.getElementById("bestAccuracy");


if (bestCPMText) {

    bestCPMText.textContent =
        Math.max(cpm, bestCPM);

}


if (bestAccuracyText) {

    bestAccuracyText.textContent =
        Math.max(
            accuracy,
            bestAccuracy
        ) + "%";

}



// 다시 시작 버튼

const retryBtn =
    document.getElementById("retryBtn");


if (retryBtn) {

    retryBtn.addEventListener(
        "click",
        () => {

            location.href =
                "typing.html";

        }
    );

}



// 홈 버튼

const homeBtn =
    document.getElementById("homeBtn");


if (homeBtn) {

    homeBtn.addEventListener(
        "click",
        () => {

            location.href =
                "index.html";

        }
    );

}