define([
  'files',
  'jqueryui'
],function(files){
  function projects(){
    this.projFileList = $('.project-file-replace');
    this.buttons();
    this.files = new files();
    //console.log($.data(this.projFileList,"filedata"));
    this.display(this.files["projects"],this.projFileList,this.projFileList);
    this.selectedButton = undefined;
    this.projFileList.data("filedata",this.files.projects);
  }
  projects.prototype = {
    newFile: function(spot){
      var name = prompt("File Name", "file");
      if(name===""||(this.files.matchingFile(spot,name)))
        alert("Your file cannot be named this!");
      else {
        var file = {};
        file[name] = "\n";
        spot.push(file);
      };
      this.projFileList.empty();
      this.display(this.files["projects"],this.projFileList,this.projFileList);
      localStorage.text = JSON.stringify(this.files.projects);
    },
    newFolder: function(spot){
      var name = prompt("Folder Name", "folder");
      if(name===""||(this.files.matchingFolder(spot,name)))
        alert("Your folder cannot be named this!");
      else spot.push([name]);
      this.projFileList.empty();
      this.display(this.files["projects"],this.projFileList,this.projFileList);
      localStorage.text = JSON.stringify(this.files.projects);
    },
    newProject: function(){
      var name = prompt("Project Name", "project");
      if(name===""||(this.files.matchingFolder(this.files.projects,name)))
        alert("Your project cannot be named this!");
      else this.files.projects.push([name]);
      this.projFileList.empty();
      this.display(this.files["projects"],this.projFileList,this.projFileList);
      localStorage.text = JSON.stringify(this.files.projects);
    },
    buttons: function(){
      that=this;
      $('#export-project').click(
        function(){
          //so lets make the projects have a different colour to them? that seems like a good idea.

        }
      );
      $('#delete').click(
        function(){
          var index = $(".file-selected").parent().data("filedata").indexOf($(".file-selected").data("filedata"));
          if(index>-1) $(".file-selected").parent().data("filedata").splice(index,index)
          that.projFileList.empty();
          localStorage.text = JSON.stringify(that.files.projects);
          that.display(that.files["projects"],that.projFileList,that.projFileList);
        }
      );
      $('#new-file').click(
        function(){
          if(Object.prototype.toString.call($(".file-selected").data("filedata")) === "[object Array]"){
            that.newFile($(".file-selected").data("filedata"));
          };
          if(Object.prototype.toString.call($(".file-selected").data("filedata"))=== "[object Object]"){
            console.log("file");
            if(Object.prototype.toString.call($(".file-selected").parent().data("filedata")) === "[object Array]"){
              that.newFile($(".file-selected").parent().data("filedata"));
            };
          };
        }
      );
      $('#new-folder').click(
        function(){
          if(Object.prototype.toString.call($(".file-selected").data("filedata")) === "[object Array]"){
            that.newFolder($(".file-selected").data("filedata"));
          };
          if(Object.prototype.toString.call($(".file-selected").data("filedata"))=== "[object Object]"){
            console.log("file");
            if(Object.prototype.toString.call($(".file-selected").parent().data("filedata")) === "[object Array]"){
              that.newFolder($(".file-selected").parent().data("filedata"));
            };
          };
        }
      );
      $('#new-project').click(
        function(){
        that.newProject();
        }
      );
    },//renders the buttons
    display: function(files,spot,main){
      that = this;
      for(var i = 1; i < files.length; i++){
        //files
        if(Object.prototype.toString.call(files[i]) === "[object Object]"){
          spot.append($('<div/>', {
            class:"file-button ", text:Object.keys(files[i])[0]
          }).dblclick(function(e){
            e.stopPropagation();
          }).hover(
            function(){
              $(main).find("*").removeClass("file-hover");
              $(main).find("*").removeClass("file-active");
              $(this).addClass("file-hover");
              $(this).parents().addClass("file-active");
              $(main).removeClass("file-active");
            }, function(){
              $(this).removeClass("file-hover");
            }
          ).click(function(e){
            e.stopPropagation();
            $(main).find("*").removeClass("file-selected");
            $(main).find("*").removeClass("file-file-selected");
            $(main).find("*").removeClass("file-parent-active");
            $(this).addClass("file-selected");
            $(this).addClass("file-file-selected");
            $(this).parents().addClass("file-parent-active");
            $(main).removeClass("file-parent-active");
            that.files.getCurrentFile(this);
            window.running.interface.projcodeeditor.setValue($(this).data("filedata")[Object.keys($(this).data("filedata"))[0]][0]);
          }));
          $.data(spot[0].lastChild,"filedata",files[i]);
        }

        //folders
        if(Object.prototype.toString.call(files[i]) === "[object Array]"){
          spot.append($('<div/>',{
            class:"file-button", text: files[i][0]
          }).dblclick(function(e){
            e.stopPropagation();
            //console.log($(this).data("filedata"));
            $(this).children('.file-button').toggle();
          }).hover(
            function(){
              $(main).find("*").removeClass("file-hover");
              $(main).find("*").removeClass("file-active");
              $(this).addClass("file-hover");
              $(this).parents().addClass("file-active");
              $(main).removeClass("file-active");
            }, function(){
              $(this).removeClass("file-hover");
            }
          ).click(function(e){
            e.stopPropagation();
            $(main).find("*").removeClass("file-selected");
            $(main).find("*").removeClass("file-parent-active");
            $(this).addClass("file-selected");
            $(this).parents().addClass("file-parent-active");
            $(main).removeClass("file-parent-active");
          }));
          $.data(spot[0].lastChild,"filedata",files[i]);
          this.display(files[i],$(spot[0].lastChild),main);
        }
      }
    }
  }
  return projects;
});
