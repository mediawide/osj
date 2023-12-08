let urlSearch = null;
let noseData = null;
let eyesData = null;
let eyebrowsData = null;
let lipsData = null;
let facelineData = null;

let stepPhoto = [0];
let stepNose = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let stepEyes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let stepEyebrows = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let stepLips = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let stepFaceline = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let posNose = [];
let posEyes = [];
let posEyebrows = [];
let posLips = [];
let posFaceline = [];

const analysisTitle = document.querySelector(".analysis-title");
const analysisStep = document.querySelector(".analysis-step");
const analysisProgress = document.querySelector(".analysis-progress");
const nextBtn = document.querySelector(".analysis-next");
const prevBtn = document.querySelector(".analysis-prev");
const canvasWrapper = document.querySelector(".canvas-wrapper");
const resultNose = document.querySelector(".result-nose");
const resultEyes = document.querySelector(".result-eyes");
const resultEyebrows = document.querySelector(".result-eyebrows");
const resultLips = document.querySelector(".result-lips");
const resultFaceline = document.querySelector(".result-faceline");
let posBtn = document.querySelectorAll(".posBtn");

const canvas = document.querySelectorAll("canvas");

const ctx0 = canvas[0].getContext("2d");
const ctx1 = canvas[1].getContext("2d");
const ctx2 = canvas[2].getContext("2d");
const ctx3 = canvas[3].getContext("2d");
const ctx4 = canvas[4].getContext("2d");
const ctx5 = canvas[5].getContext("2d");
const ctx6 = canvas[6].getContext("2d");
const ctx7 = canvas[7].getContext("2d");
const ctx8 = canvas[8].getContext("2d");
const ctx9 = canvas[9].getContext("2d");
const ctx10 = canvas[10].getContext("2d");
const ctx11 = canvas[11].getContext("2d");
const ctx12 = canvas[12].getContext("2d");
const ctx13 = canvas[13].getContext("2d");
const ctx14 = canvas[14].getContext("2d");
const ctx15 = canvas[15].getContext("2d");
const ctx16 = canvas[16].getContext("2d");
const ctx17 = canvas[17].getContext("2d");
const ctx18 = canvas[18].getContext("2d");
const ctx19 = canvas[19].getContext("2d");
const ctx20 = canvas[20].getContext("2d");
const ctx21 = canvas[21].getContext("2d");
const ctx22 = canvas[22].getContext("2d");
const ctx23 = canvas[23].getContext("2d");
const ctx24 = canvas[24].getContext("2d");
const ctx25 = canvas[25].getContext("2d");

const ctxList = [ctx0, ctx1, ctx2, ctx3, ctx4, ctx5, ctx6, ctx7, ctx8, ctx9, ctx10, ctx11, ctx12, ctx13, ctx14, ctx15, ctx16, ctx17, ctx18, ctx19, ctx20, ctx21, ctx22, ctx23, ctx24, ctx25];

function moveNextStep(){
    if(nextBtn.classList.contains("untouchable")){
        return;
    }

    urlSearch = new URLSearchParams(location.search);

    if(urlSearch.get("step") == null){
        prevBtn.classList.remove("untouchable");
        changeContents(2);
        history.pushState(null, null, "?step=2");
    }else{
        changeContents((parseInt(urlSearch.get("step")) + 1));
        history.pushState(null, null, "?step=" + (parseInt(urlSearch.get("step")) + 1));
    }

    resultNose.innerHTML = "· 코(Nose) : " + JSON.stringify(posNose);
    resultEyes.innerHTML = "· 눈(Eyes) : " + JSON.stringify(posEyes);
    resultEyebrows.innerHTML = "· 눈썹(Eyebrows) : " + JSON.stringify(posEyebrows);
    resultLips.innerHTML = "· 입술(Lips) : " + JSON.stringify(posLips);
    resultFaceline.innerHTML = "· 얼굴 윤곽(Face Line) : " + JSON.stringify(posFaceline);

    nextBtn.classList.add("untouchable");
}

function movePrevStep(){
    if(prevBtn.classList.contains("untouchable")){
        return;
    }

    urlSearch = new URLSearchParams(location.search);

    if(urlSearch.get("step") == 2){
        prevBtn.classList.add("untouchable");
        changeContents(1)
        history.pushState(null, null, "/");
        posNose = [];
        stepNose = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }else{
        changeContents((parseInt(urlSearch.get("step")) - 1));
        history.pushState(null, null, "?step="+ (parseInt(urlSearch.get("step")) - 1));

        if(urlSearch.get("step") == 3){
            posEyes = [];
            stepEyes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }else if(urlSearch.get("step") == 4){
            posEyebrows = [];
            stepEyebrows = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }else if(urlSearch.get("step") == 5){
            posLips = [];
            stepLips = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }else if(urlSearch.get("step") == 6){
            posFaceline = [];
            stepFaceline = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
    }



    nextBtn.classList.remove("untouchable");
}

function moveHome(){
    location.href = "/";
    changeContents(1);
}

function changeContents(num){
    
    const parent = document.querySelector(".analysis-content");

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    switch(num){
        case 1:
            analysisStep.innerHTML = "STEP 1"
            analysisTitle.innerHTML = "정면 사진 업로드";
            analysisProgress.innerHTML = "1/6";

            let el_div = document.createElement("div");
            let el_label = document.createElement("label");
            el_label.setAttribute("for", "choosePhoto");

            if(stepPhoto[0] == 1){
                el_div.setAttribute("class", "photo selected");
                el_label.innerHTML = "✔ photo<br><span>사진 업로드</span>";
            }else{
                el_div.setAttribute("class", "photo");
                el_label.innerHTML = "photo<br><span>사진 업로드</span>";
            }

            el_div.appendChild(el_label);

            el_input = document.createElement("input");
            el_input.setAttribute("type", "file");
            el_input.setAttribute("id", "choosePhoto");
            el_input.setAttribute("name", "choosePhoto");
            el_input.setAttribute("accept", "image/*");
            el_input.setAttribute("onChange", "choosePhoto(this)");

            document.querySelector(".analysis-content").appendChild(el_div);
            document.querySelector(".analysis-content").appendChild(el_input);

            drawPrevDots(0);
            break;
        case 2:
            analysisStep.innerHTML = "STEP 2"
            analysisTitle.innerHTML = "코(Nose) 분석";
            analysisProgress.innerHTML = "2/6";

            drawPrevDots(1);
            loadContents(noseData, noseList, stepNose);
            break;
        case 3:
            analysisStep.innerHTML = "STEP 3"
            analysisTitle.innerHTML = "눈(Eyes) 분석";
            analysisProgress.innerHTML = "3/6";

            drawPrevDots(2);
            loadContents(eyesData, eyesList, stepEyes);
            break;
        case 4:
            analysisStep.innerHTML = "STEP 4"
            analysisTitle.innerHTML = "눈썹(Eyebrows) 분석";
            analysisProgress.innerHTML = "4/6";

            drawPrevDots(3);
            loadContents(eyebrowsData, eyebrowsList, stepEyebrows);
            break;
        case 5:
            analysisStep.innerHTML = "STEP 5"
            analysisTitle.innerHTML = "입술(Lips) 분석";
            analysisProgress.innerHTML = "5/6";

            drawPrevDots(4);
            loadContents(lipsData, lipsList, stepLips);
            break;
        case 6:
            analysisStep.innerHTML = "STEP 6"
            analysisTitle.innerHTML = "얼굴 윤곽(Face Line) 분석";
            analysisProgress.innerHTML = "6/6";

            drawPrevDots(5);
            loadContents(facelineData, facelineList, stepFaceline);
            break;
    }
}

function choosePhoto(e1){
    const file = e1.files;

    const reader = new FileReader();

    reader.onload = function (e2) {
      let photo = new Image();
      photo.onload = function () { ctx0.drawImage(photo, 0, 0, 1080, 1080); };
      photo.src = e2.target.result;
    };

    reader.readAsDataURL(file[0]);

    if(document.querySelector(".photo").classList.contains("selected")){
        return;
    }else{
        document.querySelector("label").innerHTML = "✔ " + document.querySelector("label").innerHTML;
        document.querySelector(".photo").classList.add("selected");
        stepPhoto[0] = 1;
        nextBtn.classList.remove("untouchable");
    }

    urlSearch = new URLSearchParams(location.search);

    if(urlSearch.get("step") != null){
        history.pushState(null, null, "/");
    }
}

function loadContents(_data, _list, _step){
    _data = JSON.parse(JSON.stringify(_list));
            
    for(let i = 0; i < _data.length; i++){

        let el_div = document.createElement("div");

        if(_step[i] == 1){
            el_div.setAttribute("class", "posBtn selected");
            el_div.innerHTML = "✔ " + _data[i].code + "<br><span>" + _data[i].desc + "</span>";
        }else{
            el_div.setAttribute("class", "posBtn");
            el_div.innerHTML = _data[i].code + "<br><span>" + _data[i].desc + "</span>";
        }

        el_div.dataset.id = i;

        document.querySelector(".analysis-content").appendChild(el_div);
    }

    posBtnClick(_step);
}

function posBtnClick(_step){
    posBtn = document.querySelectorAll(".posBtn");
    
    for (let btn of posBtn) {
        btn.addEventListener("click", function () {
            for(let i = 0; i < posBtn.length; i++){
                posBtn[i].classList.remove("activeBtn");
                if(_step[i] == 0){
                    posBtn[i].classList.remove("selected");
                }
            }
            this.classList.add("selected");
            this.classList.add("activeBtn");
        });
    }
}

function canvasClick(_activeBtn, _e, _step, _pos){
    if(_step[_activeBtn.dataset.id] == 0){
        _activeBtn.innerHTML = "✔ " + _activeBtn.innerHTML;
    }
    _step[_activeBtn.dataset.id] = 1;
    _pos[_activeBtn.dataset.id] = [_e.offsetX, _e.offsetY];
    drawDot(parseInt(_activeBtn.dataset.id) + 2, _e.offsetX, _e.offsetY, true, "#FF4848");

    for(let i = 0; i < _step.length; i++){
        if(_step[i] == 0){
            return;
        }
    }
    
    nextBtn.classList.remove("untouchable");
}

function drawDot(_id, _x , _y, _bool, _color){
    if(_bool){ ctxList[_id].clearRect(0, 0, 1080, 1080);}
    ctxList[_id].beginPath();
    ctxList[_id].arc(_x, _y, 4, 0, 2 * Math.PI);
    ctxList[_id].fillStyle = _color;
    ctxList[_id].fill();
}

canvasWrapper.addEventListener("click", function(e){

    const activeBtn = document.querySelector(".activeBtn");

    if(activeBtn != null){
        urlSearch = new URLSearchParams(location.search);

        switch(parseInt(urlSearch.get("step"))){
            case 2:
                canvasClick(activeBtn, e, stepNose, posNose);
                break;
            case 3:
                canvasClick(activeBtn, e, stepEyes, posEyes);
                break;
            case 4:
                canvasClick(activeBtn, e, stepEyebrows, posEyebrows);
                break;
            case 5:
                canvasClick(activeBtn, e, stepLips, posLips);
                break;
            case 6:
                canvasClick(activeBtn, e, stepFaceline, posFaceline);
                break;
        }
    }
})

function drawPrevDots(_id){

    for(let i = 1; i < ctxList.length; i++){
        ctxList[i].clearRect(0, 0, 1080, 1080);
    }

    if(_id >= 2){
        for(let i = 0; i < posNose.length; i++){
            drawDot(1, posNose[i][0], posNose[i][1], false, "#101010");
        }
    }
    
    if(_id >= 3){
        for(let i = 0; i < posEyes.length; i++){
            drawDot(1, posEyes[i][0], posEyes[i][1], false, "#101010");
        }
    }

    if(_id >= 4){
        for(let i = 0; i < posEyebrows.length; i++){
            drawDot(1, posEyebrows[i][0], posEyebrows[i][1], false, "#101010");
        }
    }

    if(_id >= 5){
        for(let i = 0; i < posLips.length; i++){
            drawDot(1, posLips[i][0], posLips[i][1], false, "#101010");
        }
    }

    if(_id >= 6){
        for(let i = 0; i < posFaceline.length; i++){
            drawDot(1, posFaceline[i][0], posFaceline[i][1], false, "#101010");
        }
    }

    if(_id == 1){
        for(let i = 0; i < posNose.length; i++){
            drawDot(i + 2, posNose[i][0], posNose[i][1], false, "#FF4848");
        }
    }else if(_id == 2){
        for(let i = 0; i < posEyes.length; i++){
            drawDot(i + 2, posEyes[i][0], posEyes[i][1], false, "#FF4848");
        }
    }else if(_id == 3){
        for(let i = 0; i < posEyebrows.length; i++){
            drawDot(i + 2, posEyebrows[i][0], posEyebrows[i][1], false, "#FF4848");
        }
    }else if(_id == 4){
        for(let i = 0; i < posLips.length; i++){
            drawDot(i + 2, posLips[i][0], posLips[i][1], false, "#FF4848");
        }
    }else if(_id == 5){
        for(let i = 0; i < posFaceline.length; i++){
            drawDot(i + 2, posFaceline[i][0], posFaceline[i][1], false, "#FF4848");
        }
    }
}