define([
  'files',
  'jquery'
],function(files,$){
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
      var that=this;
      window.running.modal.modal.empty();
   	  window.running.modal.modal.append(
        $("<div/>",{class:"dialog-button dialog-button-left",text:"cancel"})
        .click(function(){
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<div/>",{class:"dialog-button dialog-button-right",text:"create"})
        .click(function(){//somehow make this do the thing. with lmao nah, putting this into projects.
          var name = $(".dialog-text-input").text();
          if(name===""||(that.files.matchingFile(spot,name))){
            window.running.modal.error.text("The file cannot be named this!");
            window.running.modal.error.show();
            setTimeout(function(){window.running.modal.error.hide()},5000);
          }
          else {
            window.running.modal.dialog.hide();
            window.running.modal.modal.empty();
            var file = {};
            file[name] = [""];
            spot.push(file);
            that.projFileList.empty();
            that.display(that.files["projects"],that.projFileList,that.projFileList);
            //console.log($(this).parent());
            localStorage.text = JSON.stringify(that.files.projects);
          }
        })
      ).append(
        $("<div/>",{class:"dialog-header",text:"Create new file"})
      ).append(
        $("<div/>",{class:"dialog-text-input",text:"file"}).attr("contenteditable",'true')
      );
      window.running.modal.error.hide();
  	  window.running.modal.dialog.show();
    },
    newFolder: function(spot){
      var that=this;
      window.running.modal.modal.empty();
   	  window.running.modal.modal.append(
        $("<div/>",{class:"dialog-button dialog-button-left",text:"cancel"})
        .click(function(){
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<div/>",{class:"dialog-button dialog-button-right",text:"create"})
        .click(function(){//somehow make this do the thing. with lmao nah, putting this into projects.
          var name = $(".dialog-text-input").text();
          if(name===""||(that.files.matchingFolder(spot,name))){
            window.running.modal.error.text("The folder cannot be named this!");
            window.running.modal.error.show();
            setTimeout(function(){window.running.modal.error.hide()},5000);
          }
          else {
            window.running.modal.dialog.hide();
            window.running.modal.modal.empty();
            spot.push([name]);
            that.projFileList.empty();
            that.display(that.files["projects"],that.projFileList,that.projFileList);
            //console.log($(this).parent());
            localStorage.text = JSON.stringify(that.files.projects);
          }
        })
      ).append(
        $("<div/>",{class:"dialog-header",text:"Create new folder"})
      ).append(
        $("<div/>",{class:"dialog-text-input",text:"folder"}).attr("contenteditable",'true')
      );
      window.running.modal.error.hide();
  	  window.running.modal.dialog.show();
//open when initialized.
    },
    newProject: function(){
      var that=this;
      window.running.modal.modal.empty();
   	  window.running.modal.modal.append(
        $("<div/>",{class:"dialog-button dialog-button-left",text:"cancel"})
        .click(function(){
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<div/>",{class:"dialog-button dialog-button-right",text:"create"})
        .click(function(){//somehow make this do the thing. with lmao nah, putting this into projects.
          var name = $(".dialog-text-input").text();
          if(name===""||(that.files.matchingFolder(that.files.projects,name))){
            window.running.modal.error.text("The project cannot be named this!");
            window.running.modal.error.show();
            setTimeout(function(){window.running.modal.error.hide()},5000);
          }
          else {
            window.running.modal.dialog.hide();
            window.running.modal.modal.empty();
            that.files.projects.push([name]);
            that.projFileList.empty();
            that.display(that.files["projects"],that.projFileList,that.projFileList);
            //console.log($(this).parent());
            localStorage.text = JSON.stringify(that.files.projects);
          }
        })
      ).append(
        $("<div/>",{class:"dialog-header",text:"Create new project"})
      ).append(
        $("<div/>",{class:"dialog-text-input",text:"project"}).attr("contenteditable",'true')
      );
      window.running.modal.error.hide();
  	  window.running.modal.dialog.show();
    },
    buttons: function(){
      var that=this;
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
            if(Object.prototype.toString.call($(".file-selected").parent().data("filedata")) === "[object Array]"){
              that.newFolder($(".file-selected").parent().data("filedata"));
              //window.running.modal.nameInput("folder",that.newFolder,$(".file-selected").parent().data("filedata"))
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
            class:"file-button", text:Object.keys(files[i])[0]
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
            window.running.interface.projcodeeditor.setValue($(this).data("filedata")[Object.keys($(this).data("filedata"))[0]][0]);
          }));
          $.data(spot[0].lastChild,"filedata",files[i]);
        }

        //folders
        if(Object.prototype.toString.call(files[i]) === "[object Array]"){
          spot.append($('<div/>',{
            class:"file-button", text: "▼"
          }).dblclick(function(e){
            e.stopPropagation();
            //console.log($(this).data("filedata"));
            if($(".file-selected").contents().filter(function(){return this.nodeType == 3;})[0].nodeValue=="▼") {
              $(".file-selected").contents().filter(function(){return this.nodeType == 3;})[0].nodeValue="▶";
              console.log($(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue)
            }
            else if($(".file-selected").contents().filter(function(){return this.nodeType == 3;})[0].nodeValue=="▶") {
              $(".file-selected").contents().filter(function(){return this.nodeType == 3;})[0].nodeValue="▼";
            }
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
          }).append($('<span/>',{ text: files[i][0]
          })));
          $.data(spot[0].lastChild,"filedata",files[i]);
          this.display(files[i],$(spot[0].lastChild),main);
        }
      }
    }
  }
  return projects;
});
