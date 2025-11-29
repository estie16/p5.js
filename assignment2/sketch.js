// 600×400 캔버스, 원본 비율/배치에 맞춘 정밀 재현 (삼각형 앞머리 X)

function setup() {
  createCanvas(600, 400);
  noLoop();            // 정적 일러스트
}

function draw() {
   background(230, 245, 255); // ✅ 아주 연한 파스텔 하늘색 배경

  // 원본처럼 화면 상단-좌측 쪽에 작게 배치
  drawGirl(300, 190, 1.3);
}

function drawGirl(cx, cy, s) {
  push();
  translate(cx, cy);
  scale(s);

  // 팔레트
  const HAIR   = color(142,120,108);
  const SKIN   = color(250,222,205);
  const BAND   = color(226,172,208);
  const KNIT   = color(236,214,255);
  const STRIPE = color(186,160,230);

  strokeJoin(ROUND);
  strokeCap(ROUND);

  // ───────── 머리(뒤) ─────────
  noStroke(); fill(HAIR);
  // 윗머리 돔
  ellipse(0, -30, 110, 107);
  // 옆머리(중단발)
  rect(-55, -27, 110, 76, 5);
  // 아래단 둥근 컷
  arc(0, 58, 115, 86, PI, 0);
  
  // ───────── 얼굴/귀 ─────────
  fill(SKIN);
  ellipse(0, -6, 74, 84);
  ellipse(-38, -2.2, 17, 16);
  ellipse( 38, -2.2, 17, 16);

  // ───────── 머리띠 ─────────
  fill(BAND);
  arc(0, -42, 95, 60, PI, 0);
  fill(255);
  arc(0, -37, 90, 44, PI, 0);
  
  noStroke();
  fill(HAIR);
  arc(0, -24, 110, 75, PI, 0); 
  
  

  // ───────── 앞머리(곡선 가닥: 스칼럽) ─────────
  // 1) 이마 위에 머리 레이어를 먼저 깔고
  fill(HAIR);
  rect(-38, -38, 76, 24, 18);
  // 2) 피부색 원들로 아래 가장자리를 둥글게 "파내"서 가닥 느낌 만들기
  fill(SKIN);
  const scallopY = -20;    // 스칼럽 하단 기준
  const r = 20;            // 둥근 가닥 반지름
  // 4개의 둥근 가닥 (원본처럼 가운데가 가장 낮게 보이도록 약간의 높이 차 적용)
  //ellipse(-8, scallopY - 1, r, r);
  //ellipse(  -16, scallopY,     r, r);
  //ellipse(   16, scallopY,     r, r);
  //ellipse(  18, scallopY - 1, r, r);
  // 양 끝을 자연스럽게 연결해 이마 라인과 부드럽게 이어지게 처리
  //rect(20, -26, 2, 10);   // 왼쪽 모서리 정리
  //rect( 16, -26, 2, 10);   // 오른쪽 모서리 정리

  // ───────── 눈(큰, 짙갈색) ─────────
  stroke(0); strokeWeight(1.4); fill(35,28,25);
  ellipse(-16, -4, 12, 10);
  ellipse( 16, -4, 12, 10);
  // 하이라이트
  noStroke(); fill(255);
  ellipse(-19, -6, 3, 3);
  ellipse( 13, -6, 3, 3);
  // 속눈썹
  stroke(0);
  line(-21,-8, -25,-10); line(-22,-4, -26,-6);
  line( 21,-8,  25,-10); line( 22,-4,  26,-6);

  // ───────── 코/입 ─────────
  
  
  stroke(120, 90, 80); 
  noFill();
  point(0, 4);           // 👃 2 → 4 로 변경
  line(-1, 4, 1, 4);     // 👃 2 → 4 로 변경
  stroke(180, 90, 90);
  arc(0, 14, 20, 12, 0, PI);

  // ───────── 목/목걸이 ─────────
  noStroke(); fill(SKIN);
  rect(-7, 33.7, 14, 16, 4);
  
  //noFill(); stroke(70);
  //arc(0, 34, 22, 14, 0, PI);
  //noStroke(); fill(80);
  //ellipse(0, 39, 4, 4);
  
  
  // ───────── 상의(연보라, 가로 줄무늬) ─────────
  stroke(0); strokeWeight(1.2); fill(KNIT);
  // 둥근 어깨
  //arc(-32, 53, 30,14, PI, TWO_PI);
  //arc( 32, 53, 30, 14, PI, TWO_PI);
  

  
  // 몸통
  rect(-39, 48.9, 79, 74, 10);
  // 소매
  stroke(0);
  rect(-49, 47, 22, 68, 10);
  rect( 29, 47, 22, 68, 10);
  
    // 👇 이 아래에 반원 추가
  stroke(SKIN);           // ✅ 테두리 색을 살색으로 설정
  strokeWeight(2);        // ✅ 테두리 두께 (1~2px 추천)
  fill(SKIN);             // ✅ 속도 살색으로 채움
  arc(0, 50, 30, 20, 0, PI);
  line(-15, 49, 15, 49);

  // 목라인 밑에 아래로 둥근 호 (테두리만)
  noFill();
  stroke(0);       // ← 살색 선으로
  strokeWeight(1);    // ← 굵기 조절 (1.5~2 추천)
  arc(0, 49, 32, 22, 0, PI); // (x, y, 너비, 높이, 0, PI) → 아래로 둥근 곡선
  
  

  // 줄무늬 — 라인으로만 그려 층처럼 보이지 않게
  stroke(STRIPE); strokeWeight(6);
  for (let yy = 72; yy <= 106; yy += 12) line(-24, yy, 26, yy);     // 몸통
  for (let yy = 66; yy <= 94; yy += 12) {
    line(-46, yy, -30, yy);                                       // 왼 소매
    line( 32, yy,  48, yy);                                     // 오른 소매
  }

  // 밑단의 옅은 보라 타원(그림자)
  noStroke(); fill(236,214,255,170);
  ellipse(0, 110, 54, 16);

  // 손
  stroke(0); strokeWeight(0.7);
  fill(SKIN);
  ellipse(-40, 123, 18.5, 16.6);
  ellipse( 40, 123, 18.5, 16.6);

  pop();
}
