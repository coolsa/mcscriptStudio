define(['mcscript','files'],function(mcscript,files){
  function compile(){
    this.compiledFiles = [];
    //console.log(mcscript);
  }
  compile.prototype = {
    compile: function(files){
      this.compiledFiles = this.compileFiles(files);//got to return something that i can work with in an actual functional style.
      //now to do things with output. ohhhh boy. copy pasting project.
      var data = {}
      //data["dir"] = this.compiledFiles[0].dir.split("/")[0];
      data["name"] = this.compiledFiles[0].name.split("/")[0]+"/"+"pack.mcmeta"
      data["data"] = "{\n\t\"pack\": {\n\t\t\"pack_format\": 1,\n\t\t\"description\": \"generated by mcscriptStudio, a MCScript based application.\"\n\t}\n}"
      this.compiledFiles.push(data);


      window.running.interface.files.output = window.running.interface.files.treeFolders(this.compiledFiles);
    },
    //porting the mcscript forweb into here.
    compileFiles: function(rawFiles){
      //so this keeps the file tree, as that is important to the compilation.
      //the functions are in the folder for the functions. eg the projects is the datapack name
      //then the files in the parent dir are placed straight in functions.
      //ex: proj/data/proj/functions/STUFF.
      // console.log(file);
      var compiledFiles = []
      var editedFiles = []
      var taggedFiles = []
      for(let file of rawFiles){
        var input = file.content.split("\n");
        for(let item of input){
          if(",;({[".indexOf(item.trim().slice(-1)) === -1){
            input[input.indexOf(item)] += ";";
          }
        }
        var directory = file.dir;
        input = input.join("\n"); //from forWeb.js
        var ast = mcscript.parse(mcscript.TokenStream(mcscript.InputStream(input)));
        var data = mcscript.generate(ast,file.name,file.dir.split("/")[0],file.dir.split("functions")[0]+"functions");
        //let compiledFiles = [];
        // console.log(data.startsWith(file.dir+"/"+file.name.replace(/\.mcscript/,"")),file.dir+"/"+file.name.replace(/\.mcscript/,""),data);
        // data = file.dir+"/"+file.name.replace(/\.mcscript/,"")+"\n"+data;
        //console.log(file.dir);
        if(file.name.endsWith('load.mcscript')){
          directory = directory.split("functions")[0]+"functions"
          data = '#file: ./mcscript/load\n' + data;
        }
        let savedData = data;
        data = data.split("#file: ");
        let extendArr = [];
        for(let datChunk of data){
          let extended = datChunk.split("#extend: ");
          if(extended.length > 1){
            extendArr=extended.slice(1);
            data[data.indexOf(datChunk)] = extended[0];
          }
        }
        var loopArr = [];
        var toUse = data.concat(extendArr);
        extendArr.push("\n")
        console.log(data,extendArr,toUse);
        for(var i = 0; i < toUse.length; i++){
          let datChunk = toUse[i];
          let looped = datChunk.split(/(?:#tagged: )(.*,)/);
          if(looped.length > 1){
            loopArr=looped.slice(1);
            for(var j = 0; j<looped.length;j++){
              if(j%2===1)j++;
              let loopFile = looped[j];
              toUse.splice(toUse.indexOf(datChunk),0,loopFile);
              i++;
            }
            toUse.splice(toUse.indexOf(datChunk),1);
          }
        }
        //console.log(loopArr,extendArr)
        directory = directory.replace(/\/\//g,"/");
        this.checkFilename(data,file.name,directory,function(fileName,dat){
          compiledFiles.push({name: fileName + '.mcfunction', data: dat.join("\n")});
        });
        this.checkFilename(extendArr,file.name,directory,function(fileName,dat){
          dat = "\n# Extended from "+file.name+" to "+ fileName + ".mcfunction\n" + dat.join("\n");
          editedFiles.push({name: fileName + '.mcfunction', data: dat});
        },true);
        var compLoop = []
        for(let i in loopArr){
          if(i%2==1){
            compLoop.push(loopArr[i]);
            compLoop.push(loopArr[i]);
          }
        }
        var loopFileNames = []
        this.checkFilename(compLoop,file.name,directory,function(fileName,dat){
          loopFileNames.push(fileName);//console.log(compLoop,taggedFile,fileName,dat);
        },true);
        for(var i = 0; i<loopArr.length;i+=2){
          var taggedFile = loopArr[i].split(",")[0].split(":");
          var fileTree = loopFileNames[i].split("/");

          var taggedName = fileTree.slice(0,2).join("/")+"/"+taggedFile[0]+"/tags/functions/"+taggedFile[1]+".json"
          var toTag = fileTree[2]+":"+fileTree.slice(fileTree.indexOf("functions")+1).join("/")
          taggedFiles.push({name:taggedName,data:toTag});
          //console.log(i,{name:taggedName,data:toTag})
        }
      }

      //if there are any duplicate files, merge them.
      for(var i in compiledFiles){
        for(var j = i; j<compiledFiles.length;j++){
          if(compiledFiles[i].name===compiledFiles[j].name&&i!=j){
            compiledFiles[i].data = compiledFiles[i].data+'\n'+compiledFiles[j].data;
            // console.log(compiledFiles.splice(j,1));
            compiledFiles.splice(j,1);
            j--;
          }
        }
      }
      //add the edited files
      for(var i = 0; i<editedFiles.length;i++){
        let editFiles = compiledFiles.find(function (obj) { if (obj.name === editedFiles[i].name) return obj});
        if(editFiles) compiledFiles[compiledFiles.indexOf(editFiles)].data = compiledFiles[compiledFiles.indexOf(editFiles)].data+editedFiles[i].data;
        else {
          compiledFiles.push({name: editedFiles[i].name, data: editedFiles[i].data});
        }
      }
      //finally add the tagged files.
      for(var i =0; i<taggedFiles.length;i++){
        var toTag = [taggedFiles[i].data]
        for(var j = i; j<taggedFiles.length;j++){
          if(i!=j && taggedFiles[i].name===taggedFiles[j].name){
            toTag.push(taggedFiles[j].data)
            taggedFiles.splice(j,1);
            j--;
          }
        }
        var seen = {}
        toTag = toTag.filter(function(item){
          return seen.hasOwnProperty(item) ? false : (seen[item]=true);
        }).join('",\n\t\t"');
        taggedFiles[i].data = '{\n\t"values":[\n\t\t"'+toTag+'"\n\t]\n}'
        compiledFiles.push(taggedFiles[i]);
        i++;
      }
      // for(let test of compiledFiles){
      //   console.log(test.name);
      // }\
      return compiledFiles;
      //this compiles the files for the thing, this is very nice! modified from forWeb.js
      //prepped input text for compiling.
    },
    checkFilename: function(data,oldFile,directory,then,ignoreSingle = false){
      if(data.length > 1){
        data.forEach(dat => {
          if(dat != ""){
            dat = dat.split("\n")
            let file = dat[0].trim()
            if((file.substring(0,2) == "./")) {
              file = directory +"/"+ oldFile.substring(0,oldFile.lastIndexOf('/') + 1) + file.substring(2,file.length)
            }
            if(file.substring(0,3) == "../") {
              let fileTree = file.split("../")
              let uri = directory.split("/")
              uri.splice(uri.length - (fileTree.length-1))
              directory = uri.join("/");
              file = directory +"/"+ fileTree[fileTree.length-1];
            }
            //console.log([file],directory.split("data")[0],!file.startsWith((directory.split("data")[0])));
            if(!file.startsWith(directory.split("data")[0])){
              file = directory +"/"+ oldFile.split(".mcscript")[0];
            }
            else
              dat.shift(0)

            then(file,dat)
          }
        })
      } else {
        let file = directory +"/" + oldFile.replace(".mcscript","");
        if(!ignoreSingle) then(file,data)
      }
    }
  }
  return compile;
});
