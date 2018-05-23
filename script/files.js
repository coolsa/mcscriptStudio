define([
],function(){
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
    try{
      this.projects = JSON.parse(localStorage.text);
      if(this.projects && typeof this.projects=== "object"){

      }else{
        this.projects = [""]
      }
    }catch(e){
      this.projects = [""]
    }
    localStorage.text = JSON.stringify(this.projects);
    // if(localStorage.text===undefined || localStorage.text==="undefined")localStorage.text="[\"\"]";
    // this.projects = JSON.parse(localStorage.text);
    //this is a test for now. no longer needed really.
    // this.projects = [
    //   "skip",
    //   [
    //     "project",
    //     {"file": [
    //       "//so what i want to do: skygrid. very important\n//to get my bearings in this compiler, how about starting with skyblock?\n//skyblock requires for setup: \n//square spiral\n//force chunk generation\n//something with player interaction\n//lets get the square spiral to work first.\n//the algorithm was something i did ages ago...\n\n//how about skipping the skyblock, thats been done hundreds of times.\n//lets do the blocks for skygrid\n//this is going to be ugly for the floating blocks, but that is ok.\n//something for basic blocks, floating blocks, and dedicated complictated blocks.\n\n//i think i hit the nail on the head for the best way to do the random blocks.\n//using an amount of entities at the same spot as a command block\n//now i have to change the way i set it up to be more compatable and use less commands, because of reasons.\n\n#file: ./skygrid/setup/blocks\n/setblock 0 0 0 air\n/summon \nmodal basicBlock(weight,block){\n  #file: ./skygrid/blocks/$(block)\n  /setblock ~ ~ ~ $(block)\n  #extend: ./skygrid/setup/blocks\n  forEach(var spawn = 0; spawn < weight; spawn++){\n    /say test\n  }\n}\n\nbasicBlock(5,test2)\nbasicBlock(3,test)\n#file: ./skygrid/functions/spiral\n"
    //       ]
    //     },
    //     [
    //       "folder",
    //       {"file": ["wow neat another file!"]},
    //       [
    //         "folder",
    //         {"file": ["wow nested folders!"]},
    //         {"file2": ["wow two files!"]}
    //       ]
    //     ]
    //   ]
    // ]
  }
  files.prototype = {
    //should alter data of the files object. aka this thing.
    matchingFile: function(spot,name){
      var matching = false;
      for(i=1;i<spot.length;i++){
        if(spot[i][name]!=undefined) matching = true;
      }
      return matching;
    },
    matchingFolder: function(spot,name){
      var matching = false;
      for(i=1;i<spot.length;i++){
        if(spot[i][0]===name) matching = true;
      }
      return matching;
    },
    findFiles: function(folder,files = {},prefix=""){
      for(var i=1;i<folder.length;i++){
        if(Object.prototype.toString.call(folder[i]) === "[object Object]"){
          files[prefix + "/" + Object.keys(folder[i])[0]] = folder[i][Object.keys(folder[i])[0]];
        }

        //folders
        if(Object.prototype.toString.call(folder[i]) === "[object Array]"){
          this.findFiles(folder[i],files,prefix+"/"+folder[i][0]);
        }
      }
      return files;
    }
  }
  return files;
});
