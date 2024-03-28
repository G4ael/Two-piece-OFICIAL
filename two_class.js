class Player extends Obj{
    dir = 0
    pts = 0
    vida = 4
    speed = 0

    frame = 1
    tempo = 0

    des_vida(){ //desenha a barra de vida
        let vidaImg = new Image()

        if(this.vida >= 4){
            vidaImg.src = "assets/vida_1.png"
        }else if(this.vida >= 3){
            vidaImg.src = "assets/vida_2.png"
        }else if(this.vida >= 2){
            vidaImg.src = "assets/vida_3.png"
        }else if(this.vida >= 1){
            vidaImg.src = "assets/vida_4.png"
        }else{
            vidaImg.src = "assets/vida_5.png"
        }

        des.drawImage(vidaImg, 1005, 45, 150, 50) //onde o desenho vai ficar
    }

    anim(nome){ //animação
        this.tempo +=1
        if(this.tempo > 5){
            this.tempo = 0
            this.frame += 1
        }
        if(this.frame>8){
            this.frame = 1
        }
        this.a = "assets/"+nome+this.frame+".png"
    }

    mov(){
        this.speed += this.dir * 0.1
        this.speed *= 0.9; // suavizar o movimento
        this.x += this.speed

        // Velocidade máxima do jogador
        if (this.speed > 3) {
            this.speed = 3
        } else if (this.speed < -3) {
            this.speed = -3
        }

        //até onde o player pode andar
        if(this.x <= 0){
            this.x = 0
            this.speed = 0
        } else if(this.x >= 835){
            this.x = 835
            this.speed = 0
        }
    }
}

class Inimigo extends Obj{
    vida_inimigo = 5
    pararY = 180  // posição onde o inimigo vai parar
    tempoProximoTiro = Math.random() * 100 // tempo até o próximo tiro do inimigo
    intervaloTiro = 60 // intervalo de tempo entre os tiros dos inimigos
    tempoTiro = 0

    tempo = 0
    frame = 1

    anim(nome){
        this.tempo +=1
        if(this.tempo > 40){
            this.tempo = 0
            this.frame += 1
        }
        if(this.frame>2){
            this.frame = 1
        }
        this.a = "assets/"+nome+this.frame+".png"
    }

    atual_inimigo(){
        if(this.y <= this.pararY){
            this.y += 0.5
        }else if(this.vida_inimigo <= 0){
            this.recomeca()
        }

        this.tempoTiro++
        if(this.tempoTiro >= this.tempoProximoTiro){
            this.tempoTiro = 0
            this.atira()
            this.tempoProximoTiro = Math.random() * 350 // define um novo tempo para o próximo tiro
        }
    }

    vel = Math.random() * (2 - 0.5) + 0.5

    mov(){
        if(this.y <= this.pararY){
            this.y += 0.5
        }

    }

    atira(){
        grupoTirosInimigo.push(new TiroInimigo(this.x - 40 + this.w, this.y + 40, 30, 40, './assets/tiro.png')) 
    }
}
