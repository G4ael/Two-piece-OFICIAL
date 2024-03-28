let des = document.getElementById('des').getContext('2d')

let player = new Player(100,428,120,150,'./assets/mago_1.png')

let barra1 = new Obj(100,100,100,20,'./assets/vida_1.png')

let jogar = false

// sistema para reiniciar o jogo
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        reiniciarJogo();
        // toda vez que apertar enter o jogo reinicia
    }
})

//quando aperta enter o jogo reinicia as variaveis
function reiniciarJogo() {
    player = new Player(100, 428, 120, 150, './assets/mago_1.png');
    grupoInimigo = [];
    grupoTiros = [];
    grupoTirosInimigo = [];
    player.pts = 0;
    player.vida = 4;
    nivel = 1;
    jogar = true;
    reproduzirAudio(sondtrack1)
}

//Função de atirar pelo mouse
document.addEventListener('click', (event) => {
    reproduzirAudio(spell)
    const mouseX = event.clientX //cordenada do mouse
    const mouseY = event.clientY //cordenada do mouse
    const angle = Math.atan2(mouseY - (player.y + player.h/2), mouseX - (player.x + player.w/2)) //angulo do mouse
    this.velocity = 0
    if(nivel >= 1){ //velocidade do tiro conforme o nivel
        this.velocity = 5 // velocidade do tiro
    }
    if(nivel >= 2){ //velocidade do tiro conforme o nivel
        this.velocity = 10 // velocidade do tiro
    }
    if(nivel >= 3){ //velocidade do tiro conforme o nivel
        this.velocity = 15 // velocidade do tiro
    }
    if(nivel >= 4){ //velocidade do tiro conforme o nivel
        this.velocity = 20 // velocidade do tiro
    }

    const velX = Math.cos(angle) * velocity
    const velY = Math.sin(angle) * velocity
    grupoTiros.push(new Tiro(player.x - 60 + player.w, player.y - 40, 40, 40, './assets/tiro_1.png', velX, velY))
    //grupo de tiros sendo puxado
})