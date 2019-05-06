import {LoadScene} from "../scenes/LoadScene.js"
import {Game2Scene} from "../scenes/Game2Scene.js"
import {GameScene} from "../scenes/GameScene.js"
import {CST} from "../CST.js"
export const config = {
  type:Phaser.AUTO,
  parent:'phaser-example',
  width:CST.ABOUT.GAME.WIDTH,
  height:CST.ABOUT.GAME.HEIGHT,
  scene:[
    LoadScene,Game2Scene,GameScene
  ]
}
