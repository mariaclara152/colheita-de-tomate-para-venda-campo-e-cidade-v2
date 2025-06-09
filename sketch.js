let tomates = [];
let tomatesColhidos = 0;
let totalParaColher = 5;
let mostrarCaminhao = false;
let cena = 'campo';

function setup() {
  createCanvas(600, 450);
  textAlign(CENTER, CENTER);
  textSize(14);
  for (let i = 0; i < totalParaColher; i++) {
    tomates.push({
      x: random(80, 520),
      y: random(220, 380),
      colhido: false
    });
  }
}

function draw() {
  background(100, 200, 100); // campo verde

  if (cena === 'campo') {
    desenharCampo();

    for (let tomate of tomates) {
      if (!tomate.colhido) {
        desenharTomate(tomate.x, tomate.y);
      }
    }

    fill(255);
    textSize(18);
    text(`Tomates colhidos: ${tomatesColhidos} / ${totalParaColher}`, 150, 30);

    if (mostrarCaminhao) {
      desenharCaminhao(220, 300);
      fill(0);
      textSize(14);
      text("Clique no caminhão para ir à cidade", 300, 290);
    }

  } else if (cena === 'cidade') {
    background(150, 150, 250); // céu azul cidade
    fill(255);
    textSize(24);
    text("Você entregou os tomates na cidade!", width / 2, 40);
    fill(255, 255, 0);
    textSize(18);
    text("Clique em qualquer lugar para ir ao mercado", width / 2, height - 50);

  } else if (cena === 'mercado') {
    background(255, 200, 150); // cor do mercado
    fill(255);
    textSize(26);
    text("Tomates à venda no mercado!", width / 2, 40);
    
    // Desenha alguns tomates na barraca
    for (let i = 0; i < 5; i++) {
      desenharTomate(150 + i * 60, 250);
    }

    // Botão de reiniciar
    fill(255, 200, 0);
    rect(20, height - 60, 130, 40, 10);
    fill(0);
    textSize(16);
    text("Reiniciar", 85, height - 40);
  }
}

function mousePressed() {
  if (cena === 'campo') {
    for (let tomate of tomates) {
      if (!tomate.colhido && dist(mouseX, mouseY, tomate.x, tomate.y) < 20) {
        tomate.colhido = true;
        tomatesColhidos++;
      }
    }

    if (tomatesColhidos >= totalParaColher) {
      mostrarCaminhao = true;
    }

    if (mostrarCaminhao && mouseX > 220 && mouseX < 360 && mouseY > 300 && mouseY < 370) {
      cena = 'cidade';
    }

  } else if (cena === 'cidade') {
    cena = 'mercado';

  } else if (cena === 'mercado') {
    if (mouseX > 20 && mouseX < 150 && mouseY > height - 60 && mouseY < height - 20) {
      reiniciarJogo();
    }
  }
}

// Desenha um tomate com texto "Tomate"
function desenharTomate(x, y) {
  push();
  translate(x, y);
  fill(255, 0, 0);
  ellipse(0, 0, 30, 30);
  fill(0, 150, 0);
  triangle(-10, -10, 0, -20, 10, -10);
  fill(255);
  textSize(12);
  text("Tomate", 0, 0);
  pop();
}

// Desenha um caminhão com texto "Caminhão"
function desenharCaminhao(x, y) {
  push();
  translate(x, y);
  fill(50);
  rect(0, 20, 140, 50, 10);
  fill(80);
  rect(100, 0, 40, 70, 10);
  fill(30);
  ellipse(30, 75, 30, 30);
  ellipse(110, 75, 30, 30);
  fill(255);
  textSize(20);
  text("Caminhão", 70, 45);
  pop();
}

// Desenha fundo do campo
function desenharCampo() {
  fill(20, 150, 20);
  rect(0, height / 2, width, height / 2);
  fill(100, 250, 100);
  rect(0, 0, width, height / 2);
}

// Reinicia o jogo
function reiniciarJogo() {
  tomates = [];
  tomatesColhidos = 0;
  mostrarCaminhao = false;
  cena = 'campo';

  for (let i = 0; i < totalParaColher; i++) {
    tomates.push({
      x: random(80, 520),
      y: random(220, 380),
      colhido: false
    });
  }
}