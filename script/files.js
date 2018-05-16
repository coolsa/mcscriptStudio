define([
	'jquery'
],function($){
  /*
  todo:
  make a thing that loads this all fancy and stuff
  this is meant to do things like:
  hold the files in an object form
  using prototypes to add or remove some folders or files or new projects
  files are in a object tree
  ex:

  */
  function files(){
    this.projects = {
      "file": "//so what i want to do: skygrid. very important\n//to get my bearings in this compiler, how about starting with skyblock?\n//skyblock requires for setup: \n//square spiral\n//force chunk generation\n//something with player interaction\n//lets get the square spiral to work first.\n//the algorithm was something i did ages ago...\n\n//how about skipping the skyblock, thats been done hundreds of times.\n//lets do the blocks for skygrid\n//this is going to be ugly for the floating blocks, but that is ok.\n//something for basic blocks, floating blocks, and dedicated complictated blocks.\n\n//i think i hit the nail on the head for the best way to do the random blocks.\n//using an amount of entities at the same spot as a command block\n//now i have to change the way i set it up to be more compatable and use less commands, because of reasons.\n\n#file: ./skygrid/setup/blocks\n/setblock 0 0 0 air\n/summon \nmodal basicBlock(weight,block){\n  #file: ./skygrid/blocks/$(block)\n  /setblock ~ ~ ~ $(block)\n  #extend: ./skygrid/setup/blocks\n  forEach(var spawn = 0; spawn < weight; spawn++){\n    /say test\n  }\n}\n\nbasicBlock(5,test2)\nbasicBlock(3,test)\n#file: ./skygrid/functions/spiral\n",
      "folder": {
        "file": "wow neat another file!",
        "folder": {
          "file": "wow nested folders!",
          "file2": "wow two files!"
        }
      }
    }
  }
  return files;
});
