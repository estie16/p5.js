/*
=============================================
캐리커처 조작 방법

- 마우스 움직이기: 눈동자가 마우스를 따라 움직여요.
- 마우스 클릭: 클릭하는 동안 눈을 감아요.
- 방향키 (↑, ↓, ←, →): 캐리커처를 움직일 수 있어요.
- 'O' 키: 입을 'O' 모양으로 바꿔요.
- 'S' 키: 다시 웃는 입 모양으로 돌아와요.
- 'C' 키: 스웨터 색깔을 랜덤으로 바꿔요.
- 'G' 키: 10초 동안의 애니메이션을 GIF 파일로 저장해요.
=============================================
*/

// =============================================
// 전역 변수 선언 (애니메이션과 상호작용을 위해)
// =============================================

let characterX, characterY; // 캐리커처의 전체 위치
let isBlinking = false;     // 눈 깜빡임 상태 (마우스 클릭)
let mouthMode = 'smile';    // 입 모양 상태 ('smile' 또는 'open')

// 색상 변수 (키보드로 변경하기 위해)
let knitColor, stripeColor, bandColor;

function setup() {
    createCanvas(600, 400);

    // 초기 위치 설정 (캔버스 중앙)
    characterX = width / 2;
    characterY = 210;

    // 초기 색상 설정
    knitColor = color(236, 214, 255);
    stripeColor = color(186, 160, 230);
    bandColor = color(226, 172, 208);
}

function draw() {
    background(230, 245, 255); // 아주 연한 파스텔 하늘색 배경

    // 키보드 입력에 따라 캐릭터 위치 업데이트
    handleKeyboardInput();

    // 상호작용 값을 포함하여 그리기 함수 호출
    drawGirl();
}

// =============================================
// 키보드/마우스 이벤트 핸들러
// =============================================

function keyPressed() {
    if (key === 'o' || key === 'O') {
        mouthMode = 'open';
    } else if (key === 's' || key === 'S') {
        mouthMode = 'smile';
    } else if (key === 'c' || key === 'C') {
        knitColor = color(random(200, 255), random(200, 255), random(200, 255));
        stripeColor = color(random(150, 200), random(150, 200), random(150, 200));
    } else if (key === 'g' || key === 'G') {
        // 'G' 키를 누르면 10초간 녹화하여 GIF로 저장
        saveGif('20221359 김유나 과제#3.gif', 10);
    }
}

function handleKeyboardInput() {
    if (keyIsPressed) {
        if (keyCode === LEFT_ARROW) {
            characterX -= 3;
        } else if (keyCode === RIGHT_ARROW) {
            characterX += 3;
        } else if (keyCode === UP_ARROW) {
            characterY -= 3;
        } else if (keyCode === DOWN_ARROW) {
            characterY += 3;
        }
    }
    characterX = constrain(characterX, 100, width - 100);
    characterY = constrain(characterY, 180, height - 70);
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      isBlinking = true;
    }
}

function mouseReleased() {
    isBlinking = false;
}

// =============================================
// 캐리커처 그리기 함수
// =============================================

function drawGirl() {
    let s = 1.3; // 크기 배율
    let cx = characterX; // 중심 X 좌표
    let cy = characterY; // 중심 Y 좌표

    const HAIR = color(142, 120, 108);
    const SKIN = color(250, 222, 205);

    strokeJoin(ROUND);
    strokeCap(ROUND);

    // ───────── 머리(뒤) ─────────
    noStroke();
    fill(HAIR);
    ellipse(cx, cy - 30 * s, 110 * s, 107 * s);
    rect(cx - 55 * s, cy - 27 * s, 110 * s, 76 * s, 5 * s);
    arc(cx, cy + 58 * s, 115 * s, 86 * s, PI, 0);

    // ───────── 얼굴/귀 ─────────
    fill(SKIN);
    ellipse(cx, cy - 6 * s, 74 * s, 84 * s);
    ellipse(cx - 38 * s, cy - 2.2 * s, 17 * s, 16 * s);
    ellipse(cx + 38 * s, cy - 2.2 * s, 17 * s, 16 * s);

    // ───────── 머리띠 ─────────
    fill(bandColor);
    arc(cx, cy - 42 * s, 95 * s, 60 * s, PI, 0);
    fill(255);
    arc(cx, cy - 37 * s, 90 * s, 44 * s, PI, 0);

    noStroke();
    fill(HAIR);
    arc(cx, cy - 24 * s, 110 * s, 75 * s, PI, 0);

    // ───────── 앞머리 ─────────
    fill(HAIR);
    rect(cx - 38 * s, cy - 38 * s, 76 * s, 24 * s, 18 * s);

    // =============================================
    // 눈 (마우스 따라가기 & 깜빡임 기능 추가)
    // =============================================
    if (isBlinking) {
        stroke(0);
        strokeWeight(1.5 * s);
        noFill();
        arc(cx - 16 * s, cy - 4 * s, 12 * s, 10 * s, 0, PI);
        arc(cx + 16 * s, cy - 4 * s, 12 * s, 10 * s, 0, PI);
    } else {
        // 눈동자 오프셋 계산
        let maxOffset = 2.5 * s;
        let eyeOffsetX = (mouseX - width / 2) * 0.02;
        let eyeOffsetY = (mouseY - height / 2) * 0.02;
        eyeOffsetX = constrain(eyeOffsetX, -maxOffset, maxOffset);
        eyeOffsetY = constrain(eyeOffsetY, -maxOffset, maxOffset);

        let leftEyeX = cx - 16 * s;
        let rightEyeX = cx + 16 * s;
        let eyeY = cy - 4 * s;

        // 눈동자
        stroke(0);
        strokeWeight(1.4 * s);
        fill(35, 28, 25);
        ellipse(leftEyeX + eyeOffsetX, eyeY + eyeOffsetY, 12 * s, 10 * s);
        ellipse(rightEyeX + eyeOffsetX, eyeY + eyeOffsetY, 12 * s, 10 * s);

        // 하이라이트
        noStroke();
        fill(255);
        ellipse(leftEyeX - 3 * s + eyeOffsetX, eyeY - 2 * s + eyeOffsetY, 3 * s, 3 * s);
        ellipse(rightEyeX - 3 * s + eyeOffsetX, eyeY - 2 * s + eyeOffsetY, 3 * s, 3 * s);

        // 속눈썹
        stroke(0);
        strokeWeight(1 * s);
        // 왼쪽 눈
        line(cx - 21*s + eyeOffsetX, cy - 8*s + eyeOffsetY, cx - 25*s + eyeOffsetX, cy - 10*s + eyeOffsetY);
        line(cx - 22*s + eyeOffsetX, cy - 4*s + eyeOffsetY, cx - 26*s + eyeOffsetX, cy - 6*s + eyeOffsetY);
        // 오른쪽 눈
        line(cx + 21*s + eyeOffsetX, cy - 8*s + eyeOffsetY, cx + 25*s + eyeOffsetX, cy - 10*s + eyeOffsetY);
        line(cx + 22*s + eyeOffsetX, cy - 4*s + eyeOffsetY, cx + 26*s + eyeOffsetX, cy - 6*s + eyeOffsetY);
    }

    // =============================================
    // 코/입 (키보드 입력에 따라 모양 변경)
    // =============================================
    stroke(120, 90, 80);
    noFill();
    point(cx, cy + 4 * s);
    line(cx - 1 * s, cy + 4 * s, cx + 1 * s, cy + 4 * s);

    if (mouthMode === 'smile') {
        stroke(180, 90, 90);
        arc(cx, cy + 14 * s, 20 * s, 12 * s, 0, PI);
    } else if (mouthMode === 'open') {
        stroke(180, 90, 90);
        fill(255);
        ellipse(cx, cy + 16 * s, 12 * s, 14 * s);
    }

    // ───────── 목 ─────────
    noStroke();
    fill(SKIN);
    rect(cx - 7 * s, cy + 33.7 * s, 14 * s, 16 * s, 4 * s);

    // =============================================
    // 상의 (키보드 입력에 따라 색상 변경)
    // =============================================
    stroke(0);
    strokeWeight(1.2 * s);
    fill(knitColor);
    rect(cx - 39 * s, cy + 48.9 * s, 79 * s, 74 * s, 10 * s); // 몸통
    rect(cx - 49 * s, cy + 47 * s, 22 * s, 68 * s, 10 * s);   // 왼 소매
    rect(cx + 29 * s, cy + 47 * s, 22 * s, 68 * s, 10 * s);    // 오른 소매

    // 목 라인
    stroke(SKIN);
    strokeWeight(2 * s);
    fill(SKIN);
    arc(cx, cy + 50 * s, 30 * s, 20 * s, 0, PI);
    line(cx - 15 * s, cy + 49 * s, cx + 15 * s, cy + 49 * s);

    noFill();
    stroke(0);
    strokeWeight(1 * s);
    arc(cx, cy + 49 * s, 32 * s, 22 * s, 0, PI);

    // 줄무늬
    stroke(stripeColor);
    strokeWeight(6 * s);
    // 몸통 줄무늬
    line(cx - 24 * s, cy + 72 * s, cx + 26 * s, cy + 72 * s);
    line(cx - 24 * s, cy + 84 * s, cx + 26 * s, cy + 84 * s);
    line(cx - 24 * s, cy + 96 * s, cx + 26 * s, cy + 96 * s);
    line(cx - 24 * s, cy + 106 * s, cx + 26 * s, cy + 106 * s);
    // 왼소매 줄무늬
    line(cx - 46 * s, cy + 66 * s, cx - 30 * s, cy + 66 * s);
    line(cx - 46 * s, cy + 78 * s, cx - 30 * s, cy + 78 * s);
    line(cx - 46 * s, cy + 90 * s, cx - 30 * s, cy + 90 * s);
    // 오른소매 줄무늬
    line(cx + 32 * s, cy + 66 * s, cx + 48 * s, cy + 66 * s);
    line(cx + 32 * s, cy + 78 * s, cx + 48 * s, cy + 78 * s);
    line(cx + 32 * s, cy + 90 * s, cx + 48 * s, cy + 90 * s);

    // 손
    stroke(0);
    strokeWeight(0.7 * s);
    fill(SKIN);
    ellipse(cx - 40 * s, cy + 123 * s, 18.5 * s, 16.6 * s);
    ellipse(cx + 40 * s, cy + 123 * s, 18.5 * s, 16.6 * s);
}

