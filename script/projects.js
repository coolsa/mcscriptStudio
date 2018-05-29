define([
  'files',
  'jquery',
  'compile',
],function(files,$,compile){
  function projects(files){
    this.projFileList = $('.project-file-replace');
    this.buttons();
    this.files = files;
    //console.log($.data(this.projFileList,"filedata"));
    this.display(this.files["projects"],this.projFileList);
    this.projFileList.data("filedata",this.files.projects);
  }
  projects.prototype = {
    newFile: function(files,spot){
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
          if(name===""||(that.files.matchingFile(files,name))){
            window.running.modal.error.text("The file cannot be named this!");
            window.running.modal.error.show();
            setTimeout(function(){window.running.modal.error.hide()},5000);
          }
          else {
            window.running.modal.dialog.hide();
            window.running.modal.modal.empty();
            var file = {};
            file[name] = [""];
            files.push(file);
            localStorage.text = JSON.stringify(that.files.projects);
            that.newFileButton(files,spot,file,true);
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
    newFolder: function(files,spot){
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
            var file = [name]
            files.push(file);
            localStorage.text = JSON.stringify(that.files.projects);
            that.newFolderButton(files,spot,file,true);
            // that.projFileList.empty();
            // that.display(that.files["projects"],that.projFileList);
            //console.log($(this).parent());
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
    newProject: function(files,spot){
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
            var file = [name];
            that.files.projects.push(file);
            // that.projFileList.empty();
            // that.display(that.files["projects"],that.projFileList);
            //console.log($(this).parent());
            localStorage.text = JSON.stringify(that.files.projects);
            that.newFolderButton(that.files.projects,that.projFileList,file,true);
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
    confirmDelete: function(spot){
      var that=this;
      window.running.modal.modal.empty();
   	  window.running.modal.modal.append(
        $("<div/>",{class:"dialog-button dialog-button-left",text:"cancel"})
        .click(function(){
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<div/>",{class:"dialog-button dialog-button-right",text:"delete"})
        .click(function(){
          var index = spot.parent().data("filedata").indexOf(spot.data("filedata"));
          //console.log(spot.parent().data("filedata"),index,spot.parent().data("filedata")[index]);
          if(index>-1) spot.parent().data("filedata").splice(index,1)
          localStorage.text = JSON.stringify(that.files.projects);
          //console.log(spot.parent().data("filedata"),index);
          spot.remove();
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<div/>",{class:"dialog-header",text:"Cannot undo Deletion! Confirm?"})
      );
      window.running.modal.error.hide();
  	  window.running.modal.dialog.show();
    },
    buttons: function(){
      var that=this;
      $('#delete').click(
        function(){
          that.confirmDelete($(".file-selected"));
        }
      );
      $('#new-file').click(
        function(){
          if(Object.prototype.toString.call($(".file-selected").data("filedata")) === "[object Array]"){
            that.newFile($(".file-selected").data("filedata"),$(".file-selected"));
          };
          if(Object.prototype.toString.call($(".file-selected").data("filedata"))=== "[object Object]"){
            if(Object.prototype.toString.call($(".file-selected").parent().data("filedata")) === "[object Array]"){
              that.newFile($(".file-selected").parent().data("filedata"),$($(".file-selected").parent()));
            };
          };
        }
      );
      $('#new-folder').click(
        function(){
          if(Object.prototype.toString.call($(".file-selected").data("filedata")) === "[object Array]"){
            that.newFolder($(".file-selected").data("filedata"),$(".file-selected"));
          };
          if(Object.prototype.toString.call($(".file-selected").data("filedata"))=== "[object Object]"){
            if(Object.prototype.toString.call($(".file-selected").parent().data("filedata")) === "[object Array]"){
              that.newFolder($(".file-selected").parent().data("filedata"),$(".file-selected").parent());
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
      $('#import-project').click(function(){
        that.importProject();
      });
      $('#export-project').click(function(){
        that.exportProject();
      });
      $('#compile').click(function(){
        //put your compiler stuff here.
        //compile();
        // console.log(that.files.findFiles(that.files.projects));
      });
    },//renders the buttons
    newFileButton: function(folder,spot,file,clicking=false){
      spot.append($('<div/>', {
        class:"file-button", text:Object.keys(file)[0]
      }).dblclick(function(e){
        e.stopPropagation();
      }).hover(
        function(){
          $(".file-hover").removeClass("file-hover");
          $(".file-active").removeClass("file-active");
          $(this).addClass("file-hover");
          $(this).parents().addClass("file-active");
          $('.project-file-replace').removeClass("file-active")
        }, function(){
          $(this).removeClass("file-hover");
        }
      ).click(function(e){
        e.stopPropagation();
        $(".file-selected").removeClass("file-selected");
        $(".file-file-selected").removeClass("file-file-selected");
        $(".file-parent-active").removeClass("file-parent-active");
        $(this).addClass("file-selected");
        $(this).addClass("file-file-selected");
        $(this).parents().addClass("file-parent-active");
        $('.project-file-replace').removeClass("file-parent-active");
        window.running.interface.projcodeeditor.setValue($(this).data("filedata")[Object.keys($(this).data("filedata"))[0]][0]);
      }));
      $.data(spot[0].lastChild,"filedata",file);
      if(clicking) spot[0].lastChild.click();
    },
    newFolderButton: function(folder,spot,file,clicking=false){
      spot.append($('<div/>',{
        class:"file-button", text: "▼"
      }).dblclick(function(e){
        e.stopPropagation();
        //console.log($(this).data("filedata"));
        if($(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue=="▼") {
          $(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue="▶";
          $(this).children('.file-button').hide();
          //console.log($(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue)
        }
        else if($(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue=="▶") {
          $(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue="▼";
          $(this).children('.file-button').show();
        }
      }).hover(
        function(){
          $(".file-hover").removeClass("file-hover");
          $(".file-active").removeClass("file-active");
          $(this).addClass("file-hover");
          $(this).parents().addClass("file-active");
          $('.project-file-replace').removeClass("file-active")
        }, function(){
          $(this).removeClass("file-hover");
        }
      ).click(function(e){
        e.stopPropagation();
        $(".file-selected").removeClass("file-selected");
        $(".file-parent-active").removeClass("file-parent-active");
        $(this).addClass("file-selected");
        $(this).parents().addClass("file-parent-active");
        $('.project-file-replace').removeClass("file-parent-active");
      }).append($('<span/>',{ text: file[0]
      })));
      $.data(spot[0].lastChild,"filedata",file);
      if(clicking) spot[0].lastChild.click();
    },
    display: function(files,spot){
      that = this;
      for(var i = 1; i < files.length; i++){
        //files
        if(Object.prototype.toString.call(files[i]) === "[object Object]"){
          this.newFileButton(files[i],spot,files[i]);
        }

        //folders
        if(Object.prototype.toString.call(files[i]) === "[object Array]"){
          this.newFolderButton(files[i],spot,files[i]);
          this.display(files[i],$(spot[0].lastChild));
        }
      }
    },
    importProject: function(){
      //get the data, then push it it with this.projFileList.data("filedata").push( DATA GOES HERE)
      //then render it with this.display(["",DATA GOES HERE],this.projFileList)
      //got to fetch the input some way though.
      //upload request through modal? sureeee.
      var that=this;
      window.running.modal.modal.empty();
   	  window.running.modal.modal.append(
        $("<div/>",{class:"dialog-button dialog-button-left",text:"cancel"})
        .click(function(){
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<input/>",{class:"dialog-button-input",id:"files",type:"file"})
        .change(function(){
          file = this.files[0];
          var reader = new FileReader();
          reader.onloadend = function() {
            var data = JSON.parse(reader.result)
            var name = data[0];
            if(name===""||(that.files.matchingFolder(that.files.projects,name))){
              name = file.name.slice(file.name,file.name.length-5);
              data[0] = name;
              console.log(data[0]);
            }
            if(name===""||(that.files.matchingFolder(that.files.projects,name))){
              window.running.modal.error.text("The project name is damaging!");
              window.running.modal.error.show();
              setTimeout(function(){window.running.modal.error.hide()},5000);
            }
            else {
              that.projFileList.data("filedata").push(data);
              that.display(["",data],that.projFileList)
              localStorage.text = JSON.stringify(that.files.projects);
              window.running.modal.dialog.hide();
              window.running.modal.modal.empty();
            }
          }
          reader.readAsText(file);
        })
      ).append($("<label/>",{class:"dialog-button dialog-button-right",text:"upload",for:"files",text:"upload"})
      ).append(
        $("<div/>",{class:"dialog-header",text:"Import project from json file." })
      );
      window.running.modal.error.hide();
  	  window.running.modal.dialog.show();
    },
    exportProject: function(){
      var that=this;
      window.running.modal.modal.empty();
   	  window.running.modal.modal.append(
        $("<div/>",{class:"dialog-button dialog-button-left",text:"cancel"})
        .click(function(){
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<div/>",{class:"dialog-button dialog-button-right",text:"download"})
        .click(function(){
          var data = $(".project-file-replace").children(".file-selected").data("filedata");//if project is clicked on
          if(data === undefined) data = that.projFileList.children(".file-parent-active").data("filedata");//if file/folder is clicked on.
          name = data.slice(0,1)[0];
          data = JSON.stringify(data)
          console.log(name[0],data);
          var blob = new Blob([data], {type: 'text/json'});
          if(window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveBlob(blob, name+".json");
          }
          else{
              var elem = window.document.createElement('a');
              elem.href = window.URL.createObjectURL(blob);
              elem.download = name+".json";
              document.body.appendChild(elem);
              elem.click();
              document.body.removeChild(elem);
          }
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<div/>",{class:"dialog-header",text:"Exporting project as json file." })
      );
      window.running.modal.error.hide();
  	  window.running.modal.dialog.show();
    }
  }
  return projects;
});
