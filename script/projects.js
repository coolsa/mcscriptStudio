define([
	'jquery',
  'files'
],function($, files){
  function projects(){
    this.projFileList = $('.project-file-replace');
    this.buttons();
    this.files = new files();
    $.data(this.projFileList,"filedata",this.files);
    //console.log($.data(this.projFileList,"filedata"));
    this.display(this.files["projects"],this.projFileList,this.projFileList);
    this.selectedButton = undefined;
  }
  projects.prototype = {
    buttons: function(){
      $('#new-file').click(
        function(){
          if(Object.prototype.toString.call($(".file-selected").data("filedata")) === "[object Object]"){
            console.log("folder");
          };
          if(Object.prototype.toString.call($(".file-selected").data("filedata"))=== "[object Array]"){
            console.log("file");
            if(Object.prototype.toString.call($(".file-selected").parent().data("filedata")) === "[object Object]"){
                console.log("folder");
              };
          };
        }
      )
    },
    display: function(files,spot,main,level=0){
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
            console.log($(this).data("filedata"));
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
          this.display(files[i],$(spot[0].lastChild),main,level+1);
        }
      }
    },
    // selectButton: function(){
    //   //this should highlight a button and then set it as the this.selectedButton
    //   //this would make it possible for the newfile to add or delete files/folders.
    //   this has been replaced with $(".project-file-replace").find(".file-selected")
    // $.data(window.running.interface.projects.projFileList,"filedata") is also useful.
    // }
  }
  return projects;
});
