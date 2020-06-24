
function load_images(){
    //player,virus,gem
    
    enemy_image = new Image;
    enemy_image.src = "Assets/v2.png";
    
    player_img = new Image;
    player_img.src = "Assets/superhero.png";
    
    gem_img = new Image;
    gem_img.src = "Assets/gemm.png";
    
    trophy = new Image;
    trophy.src = "Assets/trophy.png";
    
    health = new Image;
    health.src = "Assets/gem.png";
    
}

function init(){
    //define the objects that we will have in the game
    
    canvas = document.getElementById("mycanvas");
    W = 700;
    H = 400;
    game_over = false;
    score = 0;
    
    canvas.width = W;
    canvas.height = H;
    
    //create context i.e. a pen to add graphics on canvas
    pen = canvas.getContext('2d');
    
    e1 = {
        x : 150,
        y : 50,
        w : 60,
        h : 60,
        speed : 20
    };
    
    e2 = {
        x : 300,
        y : 150,
        w : 60,
        h : 60,
        speed : 30
    };
    
    e3 = {
        x : 450,
        y : 20,
        w : 60,
        h : 60,
        speed : 40
    };
    
    e = [e1,e2,e3];
    
    player = {
        x : 20,
        y : H/2,
        w : 60,
        h : 60,
        speed : 20,
        moving : false,
        health : 100
    };
    
    gem = {
        x : W-100,
        y : H/2,
        w : 60,
        h : 60
    };
    
    //event listener for the movement of the player
    
    canvas.addEventListener("mousedown",function(){
        player.moving = true;                     //movement na deke hum sirf ek var isliye update kar rahe hain jisse 
    });                                           //movement hum update function me de sake.
    
    canvas.addEventListener("mouseup",function(){
        player.moving = false;                     
    }); 
}

function isCollision(rect1,rect2){
    
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
            return true;
        }
    
    else{
        return false;
    }
}

function draw(){
    
    //clear the screen 
    pen.clearRect(0,0,W,H);
    
    //draw the image
    //pen.fillStyle = "red";
    //pen.fillRect(box.x,box.y,box.w,box.h);
    
    //draw the player
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    
    //draw the gem
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);
    
    //draw the enemies
    for(let i=0;i<e.length;i++){
        pen.drawImage(enemy_image,e[i].x,e[i].y,e[i].w,e[i].h);
    } 
    
    pen.drawImage(trophy,18,20,30,30);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto";
	pen.fillText(score,45,50);
    
    pen.drawImage(health,108,20,30,30);
	pen.fillStyle = "blue";
	pen.font = "20px Roboto";
	pen.fillText(player.health,135,50);
}

function update(){
    //collision detection between player and gem
    if(isCollision(player,gem)){
        game_over = true;
        alert("YOU WON!!");
    }
    
    //collision detection between player and enemy
    for(let i=0;i<e.length;i++){
        if(isCollision(player,e[i])){
            player.health -= 50;
            if(player.health < 0){
                game_over = true;
                alert("YOU LOST!!");
            }
            
        }
    }
    
    
    //player
    if(player.moving == true){
        player.x += player.speed;
        player.health += 10;
        score += 40;
    }
    
    //enemies
    for(let i=0;i<e.length;i++){
        
        e[i].y += e[i].speed;
        
        if(e[i].y >= H - e[i].h || e[i].y < 0){
            e[i].speed *= -1;
        }
    }
    
}

function gameloop(){
    draw();
    update();
}

load_images();
init();

var f = setInterval(gameloop,100);





