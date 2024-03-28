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

class Tiro extends Obj{
    constructor(x,y,w,h,a,velX,velY){
        super(x,y,w,h,a)//pega os parametros do Obj
        this.frame = 1
        this.tempo = 0
        this.velX = velX
        this.velY = velY
    }

    anim(nome){
        this.tempo +=1
        if(this.tempo > 5){
            this.tempo = 0
            this.frame += 1
        }
        if(this.frame>4){
            this.frame = 1
        }

        this.a = "assets/"+nome+this.frame+".png"
    }

        mov(){
            this.x += this.velX
            this.y += this.velY
        }
        des_tiro(){
            let img = new Image()
            img.src = this.a
            des.drawImage(img,this.x, this.y, this.w, this.h)
        }
}

class TiroInimigo extends Obj{
    des_tiro(){
        let img = new Image()
        img.src = this.a
        des.drawImage(img,this.x, this.y, this.w, this.h)
    }

    mov(){
        this.y += 3
    }
}