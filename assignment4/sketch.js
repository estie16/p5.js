// ===========================================================
// [변수 선언부] 
// ===========================================================
let isEating = false; // 애니메이션 시작 여부
let progress = 0;     // 진행률 (0.0 ~ 1.0)

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // 1. 배경 및 고정된 요소 그리기 (사용자 정의 함수 호출)
  // 코드를 draw()에 흩뿌리지 않고 깔끔하게 함수로 정리함
  drawStaticScene();

  // 2. 얼굴 애니메이션 (제자리에서 입 동작)
  drawFaceAnimation();

  // 3. 아이스크림 캐릭터 이동 애니메이션
  drawIceCreamAnimation();
}

// ===========================================================
// [사용자 정의 함수 1] 배경과 움직이지 않는 정적 요소들
// ===========================================================
function drawStaticScene() {
  let t = frameCount * 0.05; // 시간 변수

  // (1) 배경색 변화
  let bgR = map(sin(t), -1, 1, 210, 255);
  let bgG = map(cos(t * 0.8), -1, 1, 230, 255);
  let bgB = map(sin(t * 1.2), -1, 1, 210, 240);
  background(bgR, bgG, bgB);

  strokeWeight(0);

  // (2) 탁자 변화
  fill(130 + sin(t) * 20, 70 + cos(t) * 10, 30);
  rect(200, 300, 200, 100);
}

// ===========================================================
// [사용자 정의 함수 2] 얼굴 및 입 동작
// ===========================================================
function drawFaceAnimation() {
  push();
    translate(452, 100); // 얼굴 중심점

    strokeWeight(2);
    stroke(0);

    // 입 벌림 각도 계산
    let mouthGap = 0;
    if (isEating) {
      mouthGap = sin(progress * PI) * 0.4; 
    }

    fill('#FFFF99');
    // 입 그리기 (PIE 모드)
    arc(0, 0, 150, 150, radians(173) + mouthGap, radians(110) - mouthGap, PIE);
    
    // 눈 (점)
    strokeWeight(14);
    point(-9, -25);
  pop();
}

// ===========================================================
// [사용자 정의 함수 3] 아이스크림 캐릭터 이동 및 소멸
// ===========================================================
function drawIceCreamAnimation() {
  let t = frameCount * 0.05;

  // 클릭 시 진행률 증가
  if (isEating) {
    progress += 0.015;
    if (progress > 1.0) progress = 1.0;
  }

  // 다 먹기 전(progress < 1.0)까지만 그리기
  if (progress < 1.0) {
    push();
      // [이동] (300, 200) -> (450, 100)
      let curX = lerp(300, 450, progress);
      let curY = lerp(200, 100, progress);
      translate(curX, curY);

      // [축소]
      let s = map(progress, 0, 1, 1, 0);
      scale(s);
      
      // [회전]
      rotate(progress * 2.0);

      // --- 캐릭터 그리기 (상대 좌표) ---
      stroke(0);
      strokeWeight(2);

      // (1) 몸통 (삼각형)
      fill('#FFB266');
      triangle(-50, 0, 50, 0, 0, 100);

      // (2) 선들
      line(-30, 0, -30, 40);
      line(0, 100, 0, 0);
      line(30, 0, 30, 40);

      // (3) 아이스크림 (원)
      let r = map(sin(t*3), -1, 1, 200, 255);
      let g = map(cos(t*2), -1, 1, 150, 220);
      let b = map(sin(t*4), -1, 1, 180, 250);
      fill(r, g, b);
      ellipse(0, -50, 100, 100);

      // (4) 체리 (50% 시점에서 먼저 사라짐)
      if (progress < 0.5) {
        stroke(0);
        strokeWeight(2);
        fill('#FF6666');
        ellipse(0, -115, 30, 30); // 체리 원
        line(10, -155, 0, -125);  // 체리 꼭지
      }
    pop();
  }
}

// 마우스 클릭 시 실행
function mousePressed() {
  if (!isEating) {
    isEating = true;
    progress = 0;
  }
}