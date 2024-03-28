let player = new Player (100,428,120,150,'./assets/mago_1.png')
let pontos = new Text() 
let vida = new Text() 
let play_pontos = new Text() 
let play_vida = new Text()
let game_over = new Text()
let enter = new Text()
let piece = new Text()
let two = new Text()


let gato = new Obj(900, 240, 400, 400, './assets/gato_1.png')

let linha1 = new Obj(900, 0, 10, 610)
let linha1_1 = new Obj(0, 0, 10, 610)
let linha1_2 = new Obj(1275, 0, 10, 610)
let linha2 = new Obj(10, 570, 890, 60, './assets/foor.png')
let linha2_2 = new Obj(0, 610, 1350, 100)
let linha3 = new Obj(0, -90, 1350, 100)

text1.des_text('Pontos: ',950, 150, 'White', '26px Pixelify Sans')
text3.des_text(player.pts, 1060, 151, 'White', '26px Pixelify Sans')
text2.des_text('Vida: ',950, 80, 'White', '26px Pixelify Sans')
text2.des_text('Nível: ',950, 220, 'White', '26px Pixelify Sans')
text2.des_text(nivel ,1020, 220, 'White', '26px Pixelify Sans')

linha1.des_obj()
linha1_1.des_obj()
linha1_2.des_obj()
linha2.des_img() 
linha2_2.des_obj()
linha3.des_obj()

linha1.des_obj()
linha1_1.des_obj()
linha1_2.des_obj()
linha2.des_img() 
linha2_2.des_obj()
linha3.des_obj()

game_over.des_text('Game Over',340, 320, 'White', '55px Pixelify Sans')
enter.des_text('Pressione Enter para recomeçar', 265, 400, 'White', '26px Pixelify Sans');

if(jogar){
    player.mov()
    player.anim('mago_')
    inimigo.atual()
    inimigo.atual('Morcego_')
}

function desenhaTelaInicio(){

    des.clearRect(0, 0, 1300, 600) //cria um quadrado para a tela de inicio

    bg_inicio.des_img()

    //faz o text
    piece.des_text('PIECE', 620, 300, 'White', '80px Pixelify Sans')
    two.des_text('TWO', 450, 300, 'green', '80px Pixelify Sans')
    enter.des_text('Pressione Enter para começar', 450, 350, 'White', '26px Pixelify Sans')
    
    //desenha as linhas
    linha1_1.des_obj()
    linha1_2.des_obj()
    linha2_2.des_obj()
    linha3.des_obj()

}
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
