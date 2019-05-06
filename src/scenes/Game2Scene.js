import { CST } from "../CST.js";
export class Game2Scene extends Phaser.Scene{

	constructor(){
		super({
			key:CST.SCENES.GAME2,
			physics:{
				arcade: {
				},
				matter: {
				}
			}
		})
	}

	init(){
		this.ld = 2;

	}

	setMan(){

	}
	loadLevelTiles(){
		 // 0 = null
		 // 1 = tile
		 // 2 = MAN part 1
		 // 3 = MAN part 2
		 // 4 = gangster PART 1
		 // 5 = gangster PART 2
		
		let current= {
			y:this.back_height - 9 * this.tile.HEIGHT,
			x:0
		}
		let tiles = [];
		let gang ;
		this.level.forEach(y => {
			y.forEach(x => {
				if(x == 1){
					var image = this.physics.add.staticImage(current.x, current.y, CST.IMAGE.TILE).setOrigin(0).setDepth(0);
					image.setDisplaySize(this.tile.WIDTH, this.tile.HEIGHT);﻿
					image.body﻿.y = current.y;﻿﻿﻿﻿﻿
					image.body﻿.x = current.x;﻿﻿﻿﻿﻿
					image.setSize(this.tile.WIDTH, this.tile.HEIGHT);﻿
					tiles.push(image);
				}
				if(x == 2){
					//ADAM ÇİZ
					var image = this.add.image(current.x, current.y + 10, CST.IMAGE.MAN2).setOrigin(0).setDepth(0);
					image.setDisplaySize(this.tile.WIDTH*2, this.tile.HEIGHT*2);﻿
					image.setSize(this.tile.WIDTH, this.tile.HEIGHT*2);﻿

					var gfx = this.add.graphics().setDefaultStyles({ lineStyle: { width: 10, color: 0xffffff, alpha: 0.5 } });
					let _c = image;

					var line = this.add.image(_c.x + _c.width - 14 , _c.y+ _c.height / 2  , CST.IMAGE.GUN);
					line.setOrigin(0.35,0.5)
					line.rotation = 360-45;
					line.displayWidth = 100;
					line.displayHeight = 100;
					line.scaleY *= -1


					var velocity = new Phaser.Math.Vector2();
					this.input.on('pointermove', function (pointer) {
						var BetweenPoints = Phaser.Math.Angle.BetweenPoints;
						var SetToAngle = Phaser.Geom.Line.SetToAngle;
						var velocityFromRotation = this.physics.velocityFromRotation;
						var angle = BetweenPoints({x:_c.x + _c.width - 14 ,y:_c.y + _c.height / 2}, pointer);
						SetToAngle(line, _c.x + _c.width - 14 , _c.y+ _c.height / 2, angle, 128);
						velocityFromRotation(angle, 500, velocity);
						gfx.clear();
					
						if(!this.end_){line.rotation = angle;};
						gfx.setDepth(1);
					}, this);
					this.input.on('pointerup', function (pointer) {
						var BetweenPoints = Phaser.Math.Angle.BetweenPoints;
						var SetToAngle = Phaser.Geom.Line.SetToAngle;
						var velocityFromRotation = this.physics.velocityFromRotation;
						var angle = BetweenPoints({x:_c.x + _c.width - 14 ,y:_c.y + _c.height / 2}, pointer);
						SetToAngle(line, _c.x + _c.width - 14 , _c.y+ _c.height / 2, angle, 128);
						velocityFromRotation(angle, 500, velocity);
						gfx.clear();
						if(!this.end_){line.rotation = angle};
						gfx.setDepth(1);
						if(!this.bull.onMove && !this.bull.shot && this.bullC > 0){
							this.bull.setActive(true).setVisible(true);
							this.bull.enableBody(true, _c.x + _c.width - 14 , _c.y+ _c.height / 2, true, true).setVelocity(velocity.x, velocity.y);
							this.bull.onMove = true;
						}

					}, this);

				}
				if(x == 4 ){
					//ADAM ÇİZ
					var image = this.physics.add.staticImage(current.x - 20, current.y + 10, CST.IMAGE.MAN1).setOrigin(0).setDepth(0);
					image.setDisplaySize(this.tile.WIDTH * 2 , this.tile.HEIGHT*2);﻿
					image.body﻿.y = current.y + 10 ;﻿﻿﻿﻿﻿
					image.body﻿.x = current.x;﻿﻿﻿﻿﻿
					image.setSize(this.tile.WIDTH, this.tile.HEIGHT*2 - 10);﻿
					gang = image;
				}
				current.x += this.tile.WIDTH;
			});
			current.y += this.tile.HEIGHT;
			current.x = 0;
		});
		this.physics.add.collider(this.bull, tiles);
		this.physics.add.collider(this.bull, gang , this.finish);

	}
	fire(){

	}
	finish(bull,gang){
		bull.setActive(false).setVisible(false);
		gang.setActive(false).setVisible(false);
		bull.onMove = false;
		bull.shot = true;
		bull.setVelocity(0,0)

	}
	setBulletIO(){
		let a = {
			x: ((this.game.renderer.width)-((10 + 5) * 3)) / 2 ,
			width: 10,
			space:5,
			height:20,
			y: 10
		}
		if(this.bullimages == undefined){
				this.bullimages = [];
		}
		this.bullimages.forEach(image =>{
			image.displayWidth = 0;
			image.displayHeight = 0;
		});

		for (var i = 0; i < this.bullC; i++) {
			
			if(!this.bullimages[i]){
				this.bullimages[i] = this.add.image(a.x,a.y,"as");
			}
				this.bullimages[i].x = a.x;
				this.bullimages[i].y = a.y;
				this.bullimages[i].displayWidth = a.width;
				this.bullimages[i].displayHeight = a.height;
			a.x += a.space + a.width;
			
		}
	}
	gameover(){
		if(this.bull.onMove){
			this.bull.onMove = false;
			this.bullC -=1
			this.setBulletIO();
		}
	}
	create(){

		let tile = {
			WIDTH : CST.ABOUT.GAME.WIDTH / 9,
			HEIGHT : CST.ABOUT.GAME.WIDTH / 9,
		}
		this.tile = tile;
		this.back_height = CST.ABOUT.GAME.HEIGHT - tile.HEIGHT * 4;
		let a = this.add.image(0,0,CST.IMAGE.TITLE).setOrigin(0).setDepth(0);
		a.displayWidth = CST.ABOUT.GAME.WIDTH;
		a.displayHeight = this.back_height;
		this.bullet = {
			w:10,
			h:10,
			x:0,
			y:0
		}
		this.bull = this.physics.add.image(this.bullet.x,this.bullet.y, "sd").setOrigin(0).setDepth(0);
		this.bull.setDisplaySize(this.bullet.w, this.bullet.h);﻿
		this.bull.body﻿.y = this.bullet.x;﻿﻿﻿﻿﻿
		this.bull.body﻿.x = this.bullet.y;﻿﻿﻿﻿﻿
		this.bull.setSize(this.bullet.w, this.bullet.h);﻿
		this.bull.setCollideWorldBounds(true);
		this.bull.setBounce(1,1);
		this.bull.setActive(false).setVisible(false);
		this.bull.onMove = false;
		this.bull.shot = false;
		this.bullC = 3

		if(this.ld == 1){
			this.level = [
				[0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0],
				[0,0,0,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0],
				[0,0,2,0,1,0,4,0,0],
				[0,0,3,0,1,0,5,0,0]
			];
		}
		if(this.ld == 2){
			this.level = [
				[1,0,0,0,0,0,0,0,0],
				[1,0,0,0,0,0,0,0,0],
				[1,0,0,0,0,0,0,0,0],
				[1,0,0,0,0,0,4,0,0],
				[1,0,0,0,0,0,5,0,0],
				[1,0,0,0,0,0,1,1,1],
				[1,0,0,0,0,0,0,0,0],
				[1,0,0,0,0,0,2,0,0],
				[1,0,0,0,0,0,3,0,0]
			];
		}
		for (var i = CST.ABOUT.GAME.HEIGHT; i >= this.back_height; i-=tile.HEIGHT) {
			for (var _i = CST.ABOUT.GAME.WIDTH; _i >= 0; _i-=tile.WIDTH) {
				var image = this.physics.add.staticImage(_i, i, CST.IMAGE.TILE).setOrigin(0).setDepth(0);
					image.setDisplaySize(this.tile.WIDTH, this.tile.HEIGHT);﻿
					image.body﻿.y = i;﻿﻿﻿﻿﻿
					image.body﻿.x = _i;﻿﻿﻿﻿﻿
					image.setSize(this.tile.WIDTH, this.tile.HEIGHT);﻿
					this.physics.add.collider(this.bull, image);
			}
		}

		this.loadLevelTiles()

		this.physics.world.setBoundsCollision(false, false, false, false);
		this.setMan();

		this.setBulletIO();
		this.end_ = false;
	}
	end(){
		let gfx = this.add.graphics({
			fillStyle: {
    		    color: 0x000000,
    		    alpha: 0.7
    		}
		});
		var polygon = new Phaser.Geom.Polygon([
				0,0,
				this.game.renderer.width,0,
				this.game.renderer.width,this.game.renderer.height,
				0,this.game.renderer.height

		]);
		
		gfx.fillPoints(polygon.points,true);

		let a = this.add.image((this.game.renderer.width ) / 2 , this.game.renderer.height / 5, CST.IMAGE.MAN);
			a.displayWidth = 120;
			a.displayHeight = 120;

		let b = this.add.image((this.game.renderer.width ) / 2 , this.game.renderer.height / 5 * 2, CST.IMAGE.LOGO);
			b.displayWidth = this.game.renderer.width / 3*2;
			b.displayHeight = this.game.renderer.width / 3 /2;

		let x = this.add.image((this.game.renderer.width ) / 2 , this.game.renderer.height /5 *4.5 , CST.IMAGE.NEXT);
			x.displayWidth = this.game.renderer.width / 3*2 / 3*2;
			x.displayHeight = this.game.renderer.width / 3 /2 / 3*2;
	}
	update(){
		if(this.bull.shot && !this.end_){
			this.end();
			this.end_ = true
		}
        if (this.bull.y < 0)
        {
            this.gameover();
        }
        if (this.bull.x<0 || this.bull.x>CST.ABOUT.GAME.WIDTH){
        	this.gameover();
        }
    }
}
