import { CST } from "../CST.js";
export class EndScene extends Phaser.Scene{

	constructor(){ 
		super({
			key:CST.SCENES.END,
		})
	}

	init(){
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




		for (var i = CST.ABOUT.GAME.HEIGHT; i >= this.back_height; i-=tile.HEIGHT) {
			for (var _i = CST.ABOUT.GAME.WIDTH; _i >= 0; _i-=tile.WIDTH) {
				var image = this.add.image(_i, i, CST.IMAGE.TILE).setOrigin(0).setDepth(0);
					image.setDisplaySize(this.tile.WIDTH, this.tile.HEIGHT);﻿
					image.setSize(this.tile.WIDTH, this.tile.HEIGHT);﻿
			}
		}
	}
}
