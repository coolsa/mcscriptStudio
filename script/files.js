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
  }
  files.prototype = {
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
    fileTree: function(folder,files = [],prefix=""){
      for(var i=1;i<folder.length;i++){
        if(Object.prototype.toString.call(folder[i]) === "[object Object]"){
          var file = {};
          file["dir"] = prefix;
          file["name"] = Object.keys(folder[i])[0]+".mcscript";
          file["content"] = folder[i][Object.keys(folder[i])[0]][0];
          files.push(file);
        }

        //folders
        if(Object.prototype.toString.call(folder[i]) === "[object Array]"){
          if(prefix === "") this.fileTree(folder[i],files,folder[i][0]+"/functions");
          else this.fileTree(folder[i],files,prefix+"/"+folder[i][0]);
        }
      }
      return files;
    },
    treeFolders: function(fileTree){//with dir, name, content revert back to old nested arrays.

    }
  }
  return files;
});
