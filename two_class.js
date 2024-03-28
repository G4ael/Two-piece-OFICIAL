class Player extends Obj{
    dir = 0
    pts = 0
    vida = 4
    
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
}