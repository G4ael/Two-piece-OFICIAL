let des = document.getElementById('des').getContext('2d')

let player = new Player(100,428,120,150,'./assets/mago_1.png')
let text1 = new Text() 
let text2 = new Text() 
let text3 = new Text() 
let text4 = new Text()
let text5 = new Text()
let text6 = new Text()

let gato = new Obj(900, 240, 400, 400, './assets/gato_1.png')

let linha1 = new Obj(900, 0, 10, 610)
let linha1_1 = new Obj(0, 0, 10, 610)
let linha1_2 = new Obj(1275, 0, 10, 610)
let linha2 = new Obj(10, 570, 890, 60, './assets/foor.png')
let linha2_2 = new Obj(0, 610, 1350, 100)
let linha3 = new Obj(0, -90, 1350, 100)

let tutorial1 = new Obj(120, 250, 150, 150, './assets/wasd.png')
let tutorial2 = new Obj(980, 205, 215, 215, './assets/mouse.png')

let barra1 = new Obj(100,100,100,20,'./assets/vida_1.png')

let bg = new Obj(0,0,900,621,'./assets/BG.png')
let bg_inicio = new Obj(0,0,1300,621,'./assets/BG_inicio.png')

let spell = new Audio('assets/spell.mp3')
spell.volume = 0.4

let dead = new Audio('./assets/dead.mp3')
dead.volume = 0.4

let sondtrack1 = new Audio('./assets/sondtrack1.mp3')
sondtrack1.volume = 0.5
sondtrack1.loop = true

let game_over1 = new Audio('./assets/game_over1.mp3')
game_over1.volume = 0.4

let jogar = false

let nivel = 1

let cenaInicio = true

//reproduz os som sem ter terminado o som anterior
function reproduzirAudio(audio) {
    audio.currentTime = 0 // Reinicia o áudio
    audio.play()
}
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
//Função para perder no jogo
function game_over(){
    if(player.vida <=0){
        jogar = false
//puxa os sons
        sondtrack1.pause()
        spell.pause()
        reproduzirAudio(game_over1)
    }
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

let grupoTiros = [] 
let grupoTirosInimigo = []
let tiros = {
    des(){
        grupoTiros.forEach((tiro)=>{ //desenha os tiros do player
            tiro.des_tiro()
        })
        grupoTirosInimigo.forEach((tiro)=>{ //desenha os tiros inimigos
            tiro.des_tiro()
        })
    },
    
    atual(){
        grupoTiros.forEach((tiro)=>{ //atualiza os tiros 
            tiro.mov() //puxa o movimento da class
            tiro.anim('tiro_') //pega função da animação
            if(tiro.y <= -5){
                grupoTiros.splice(tiro[0],1)
            }
            if (tiro.colid(linha1)){ //se bater no Obj linha o tiro é apagado
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
            }
            
            if (tiro.colid(linha2)){ //se bater no Obj linha o tiro é apagado
                 grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
            }

            if (tiro.colid(linha3)){ //se bater no Obj linha o tiro é apagado
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
            }

            if(tiro.colid(player) && tiro.a !== player.a){
                player.vida -= 1; //Reduz a vida do jogador em 1 se ele for atingido por um tiro
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1); //Remove o tiro da lista
            }

            // Verifica colisão entre o tiro do jogador e os tiros dos inimigos
            grupoTirosInimigo.forEach((tiroInimigo, index) => {
                if (tiro.colid(tiroInimigo)) {
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1); //Remove o tiro do jogador
                    grupoTirosInimigo.splice(index, 1); //Remove o tiro do inimigo
                }
            })
        })


        grupoTirosInimigo.forEach((tiro)=>{
            tiro.mov()
            if(tiro.y >= 630){
                grupoTirosInimigo.splice(tiro[0],1)
            }

            if(tiro.colid(player)){
                player.vida -= 1; // Reduz a vida do jogador em 1 se ele for atingido por um tiro inimigo
                grupoTirosInimigo.splice(grupoTirosInimigo.indexOf(tiro), 1); // Remove o tiro inimigo da lista
            }
        })
    }
}
//Criação dos inimigos
let grupoInimigo = []
let inimigo = {
    time1: 0, //tempo para os inimigos aparecerem
    time2: 0, //tempo para os inimigos aparecerem
    time3: 0, //tempo para os inimigos aparecerem

    criaInimigo(){
        this.time1 += 0.4
        this.time2 += 0.4
        this.time3 += 0.4
        let pos_x = (Math.random() * (835 - 2 +1)+2)  //onde os inimigos vão aparecer
        let pos_x2 = (Math.random() * (835 - 2 +1)+2) //onde os inimigos vão aparecer
        let pos_x3 = (Math.random() * (835 - 2 +1)+2) //onde os inimigos vão aparecer

        if(this.time1 >=60){
            this.time1 = 0
            grupoInimigo.push(new Inimigo(pos_x,-200,80,80,'./assets/Morcego_1.png'))
            console.log(grupoInimigo)
        }
        if(this.time2 >=85){
            this.time2 = 0
            grupoInimigo.push(new Inimigo(pos_x2,-300,80,80,'./assets/Morcego_2.png'))
            console.log(grupoInimigo)
        }
        if(this.time3 >=135){
            this.time3 = 0
            grupoInimigo.push(new Inimigo(pos_x3,-400,80,80,'./assets/Morcego_2.png'))
            console.log(grupoInimigo)
        }
    
        //Ajuste a criação de inimigos com base no nível atual
        if (nivel >= 2) {
            this.time1 += 0.5
            this.time2 += 0.5
            this.time3 += 0.5

        }else if(nivel >= 3){
            this.time1 += 0.6
            this.time2 += 0.6
            this.time3 += 0.6

        }else if(nivel >= 4){
            this.time1 += 0.8
            this.time2 += 0.8
            this.time3 += 0.8
        }
    },
    des(){
        grupoInimigo.forEach((inimigo)=>{ //Desenha o inimigo
            inimigo.des_img()
        })
    },

    //se o tiro pegar no inimigo ele é destruido
    destroiInimigo(){
        grupoTiros.forEach((tiro)=>{
            grupoInimigo.forEach((inimigo)=>{
                if(tiro.colid(inimigo)){
                    grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                    grupoInimigo.splice(grupoInimigo.indexOf(inimigo), 1)
                    player.pts += 1
                    reproduzirAudio(dead)
                }
            })
        })
    },
    atual(){
        this.criaInimigo()
        this.destroiInimigo()
        grupoInimigo.forEach((inimigo)=>{ //atualiza o inimigo
            inimigo.mov()
            inimigo.anim('Morcego_')
            inimigo.atual_inimigo()
        })
    }
}

//Movimento do player
document.addEventListener('keydown',(e)=>{
    if(e.key === 'a'){
        player.dir = -15

    } else if(e.key === 'd'){
        player.dir = 15
    }
})

document.addEventListener('keyup', (e)=>{
    if(e.key === 'a' || e.key === 'd'){
        player.dir = 0 // Parando o movimento quando a tecla for liberada
    }
})

function atualizaNivel() { //Um novo nivel a cada 50 pts
    if (player.pts >= nivel * 50) { //Verifica se o jogador atingiu um novo nível
        nivel++ //Adiciona +1 no nivel
    }
}


function desenha(){ //desenha todas as classes
    //sempre fica ativo
    bg.des_img()

    gato.des_img()

    text1.des_text('Pontos: ',950, 150, 'White', '26px Pixelify Sans')
    text3.des_text(player.pts, 1060, 151, 'White', '26px Pixelify Sans')
    text2.des_text('Vida: ',950, 80, 'White', '26px Pixelify Sans')
    text2.des_text('Nível: ',950, 220, 'White', '26px Pixelify Sans')
    text2.des_text(nivel ,1020, 220, 'White', '26px Pixelify Sans')

    player.des_vida()

    if(jogar){ //quando jogar for true desenha o player e os inimigos
        inimigo.des()
        tiros.des()

        linha1.des_obj()
        linha1_1.des_obj()
        linha1_2.des_obj()
        linha2.des_img() 
        linha2_2.des_obj()
        linha3.des_obj()

        player.des_img()
    }else{ //se o jogo não for true desenha apenas  as linhas e o text
        linha1.des_obj()
        linha1_1.des_obj()
        linha1_2.des_obj()
        linha2.des_img() 
        linha2_2.des_obj()
        linha3.des_obj()

        text5.des_text('Game Over',340, 320, 'White', '55px Pixelify Sans')
        text6.des_text('Pressione Enter para recomeçar', 265, 400, 'White', '26px Pixelify Sans');
    }

    
}

function atualiza(){ //faz a atualização das class e variaveis

    if(jogar){
        player.mov()
        player.anim('mago_')
        inimigo.atual()
        inimigo.atual('Morcego_')
        tiros.atual('tiro_')
        tiros.atual()
        game_over()
        atualizaNivel()
    }
}

// Função para desenhar a tela de introdução
function desenhaTelaInicio(){

    des.clearRect(0, 0, 1300, 600) //cria um quadrado para a tela de inicio

    bg_inicio.des_img()

    //faz o text
    text6.des_text('PIECE', 620, 300, 'White', '80px Pixelify Sans')
    text6.des_text('TWO', 450, 300, 'green', '80px Pixelify Sans')
    text6.des_text('Pressione Enter para começar', 450, 350, 'White', '26px Pixelify Sans')
    
    //desenha as linhas
    linha1_1.des_obj()
    linha1_2.des_obj()
    linha2_2.des_obj()
    linha3.des_obj()

    tutorial1.des_img()
    text6.des_text('Atirar', 1045, 250, 'White', '26px Pixelify Sans')
    tutorial2.des_img()
    text6.des_text('Movimento', 125, 250, 'White', '26px Pixelify Sans')

}

//Função para verificar o evento de tecla para iniciar o jogo
function verificaInicioJogo(event){
    if(event.key === 'Enter'){
        cenaInicio = false; //Define cenaInicio como false para começar o jogo
        reproduzirAudio(sondtrack1); //Inicia a trilha sonora do jogo
    }
}

// Adiciona um event para verificar o evento de tecla
document.addEventListener('keydown', verificaInicioJogo)

// Função principal para desenhar e atualizar o jogo
function main(){
    if(cenaInicio){
        desenhaTelaInicio();
    }else{
        des.clearRect(0, 0, 1300, 600);
        desenha();
        atualiza();
    }
    requestAnimationFrame(main);
}

main()
