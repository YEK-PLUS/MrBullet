import { CST } from "../CST.js";
export class LoadScene extends Phaser.Scene{
	constructor(){
		super({
			key:CST.SCENES.LOAD
		})
	}
	init(){ 

	}
	loadFont() {
		//DİNAMİK FONT YÜKLEME 
	}
	loadAtlas(){

		this.load.setPath("./assets/atlas");
		for (let prop in CST.ATLAS) {
			//@ts-ignore
			this.load.atlas(CST.ATLAS[prop].png, CST.ATLAS[prop].png ,CST.ATLAS[prop].json);
		}
	}
	loadImages() {
		this.load.setPath("./assets/image");

		for (let prop in CST.IMAGE) {
			//@ts-ignore
			this.load.image(CST.IMAGE[prop], CST.IMAGE[prop]);
		}
	}
	preload(){
		this.loadImages();
		this.loadAtlas();

		let loadingBar = this.add.graphics({
			fillStyle: {
				color: 0xffffff //white
			}
		});

		this.load.on("progress",(percent) => {
			loadingBar.fillRect(0, this.game.renderer.height / 15 * 13, this.game.renderer.width* percent, this.game.renderer.height / 15);
		});

		this.logo_loaded = false;
		this.load.on("load", (file) => {
			if(file.key == CST.IMAGE.LOGO){
				this.logo_loaded = true;
			}
			if(this.logo_loaded){
				this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, CST.IMAGE.LOGO).setDepth(1);
			}
		})
	}
	create(){
		this.audio = new Audio(this);
		this.scene.start(CST.SCENES.GAME,{
			audio : this.audio
		});
		//this.scene.launch();
	}
}
