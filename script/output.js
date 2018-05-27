define([
  'files',
  'jquery',
  'compile'
],function(files,$,compile){
  function output(files){
    this.outFileList = $('.output-file-replace');
    this.buttons();
    this.files = files;
    //console.log($.data(this.outFileList,"filedata"));
    this.display(this.files.output,this.outFileList);
    this.outFileList.data("filedata",this.files.output);
  }
  output.prototype = {
  //   newFileButton: function(folder,spot,file){
  //     spot.append($('<div/>', {
  //       class:"output-file-button", text:Object.keys(file)[0]
  //     }).dblclick(function(e){
  //       e.stopPropagation();
  //     }).hover(
  //       function(){
  //         $(that.outFileList).find("*").removeClass("output-file-hover");
  //         $(that.outFileList).find("*").removeClass("output-file-active");
  //         $(this).addClass("output-file-hover");
  //         $(this).parents().addClass("output-file-active");
  //         $(that.outFileList).removeClass("output-file-active");
  //       }, function(){
  //         $(this).removeClass("output-file-hover");
  //       }
  //     ).click(function(e){
  //       e.stopPropagation();
  //       $(that.outFileList).find("*").removeClass("output-file-selected");
  //       $(that.outFileList).find("*").removeClass("output-file-file-selected");
  //       $(that.outFileList).find("*").removeClass("output-file-parent-active");
  //       $(this).addClass("output-file-selected");
  //       $(this).addClass("output-file-file-selected");
  //       $(this).parents().addClass("output-file-parent-active");
  //       $(that.outFileList).removeClass("output-file-parent-active");
  //       window.running.interface.outcodeeditor.setValue($(this).data("filedata")[Object.keys($(this).data("filedata"))[0]][0]);
  //     }));
  //     $.data(spot[0].lastChild,"filedata",file);
  //   },
  //   newFolderButton: function(folder,spot,file){
  //     spot.append($('<div/>',{
  //       class:"output-file-button", text: "▼"
  //     }).dblclick(function(e){
  //       e.stopPropagation();
  //       //console.log($(this).data("filedata"));
  //       if($(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue=="▼") {
  //         $(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue="▶";
  //         $(this).children('.output-file-button').hide();
  //         //console.log($(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue)
  //       }
  //       else if($(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue=="▶") {
  //         $(this).contents().filter(function(){return this.nodeType == 3;})[0].nodeValue="▼";
  //         $(this).children('.output-file-button').show();
  //       }
  //     }).hover(
  //       function(){
  //         $(that.outFileList).find("*").removeClass("output-file-hover");
  //         $(that.outFileList).find("*").removeClass("output-file-active");
  //         $(this).addClass("output-file-hover");
  //         $(this).parents().addClass("output-file-active");
  //         $(that.outFileList).removeClass("output-file-active");
  //       }, function(){
  //         $(this).removeClass("output-file-hover");
  //       }
  //     ).click(function(e){
  //       e.stopPropagation();
  //       $(that.outFileList).find("*").removeClass("output-file-selected");
  //       $(that.outFileList).find("*").removeClass("output-file-parent-active");
  //       $(this).addClass("output-file-selected");
  //       $(this).parents().addClass("output-file-parent-active");
  //       $(that.outFileList).removeClass("output-file-parent-active");
  //     }).append($('<span/>',{ text: file[0]
  //     })));
  //     $.data(spot[0].lastChild,"filedata",file);
  //   },
    newFileButton: function(folder,spot,file){
      spot.append($('<div/>', {
        class:"output-file-button", text:Object.keys(file)[0]
      }).dblclick(function(e){
        e.stopPropagation();
      }).hover(
        function(){
          $(".output-file-hover").removeClass("output-file-hover");
          $(".output-file-active").removeClass("output-file-active");
          $(this).addClass("output-file-hover");
          $(this).parents().addClass("output-file-active");
          $('.output-file-replace').removeClass("output-file-active")
        }, function(){
          $(this).removeClass("output-file-hover");
        }
      ).click(function(e){
        e.stopPropagation();
        $(".output-file-selected").removeClass("output-file-selected");
        $(".output-file-file-selected").removeClass("output-file-file-selected");
        $(".output-file-parent-active").removeClass("output-file-parent-active");
        $(this).addClass("output-file-selected");
        $(this).addClass("output-file-file-selected");
        $(this).parents().addClass("output-file-parent-active");
        $('.output-file-replace').removeClass("output-file-parent-active");
        window.running.interface.outcodeeditor.setValue($(this).data("filedata")[Object.keys($(this).data("filedata"))[0]][0]);
      }));
      $.data(spot[0].lastChild,"filedata",file);
    },
    newFolderButton: function(folder,spot,file){
      spot.append($('<div/>',{
        class:"output-file-button", text: "▼"
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
          $(".output-file-hover").removeClass("output-file-hover");
          $(".output-file-active").removeClass("output-file-active");
          $(this).addClass("output-file-hover");
          $(this).parents().addClass("output-file-active");
          $('.output-file-replace').removeClass("output-file-active")
        }, function(){
          $(this).removeClass("output-file-hover");
        }
      ).click(function(e){
        e.stopPropagation();
        $(".output-file-selected").removeClass("output-file-selected");
        $(".output-file-parent-active").removeClass("output-file-parent-active");
        $(this).addClass("output-file-selected");
        $(this).parents().addClass("output-file-parent-active");
        $('.output-file-replace').removeClass("output-file-parent-active");
      }).append($('<span/>',{ text: file[0]
      })));
      $.data(spot[0].lastChild,"filedata",file);
    },
    buttons: function(){
      var that=this;
      $('#download').click(function(){
        that.downloadProject();
      });
    },
    display: function(files,spot){

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
    downloadProject: function(){
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
          var data = $(".output-output-file-replace").data("filedata");//whatever is in output is to be downloaded.
          // if(data === undefined) data = that.outFileList.children(".output-file-parent-active").data("filedata");//if file/folder is clicked on.
          // name = data.slice(0,1)[0];
          // data = JSON.stringify(data)
          // console.log(name[0],data);
          // var blob = new Blob([data], {type: 'text/csv'});
          // if(window.navigator.msSaveOrOpenBlob) {
          //     window.navigator.msSaveBlob(blob, name+".json");
          // }
          // else{
          //     var elem = window.document.createElement('a');
          //     elem.href = window.URL.createObjectURL(blob);
          //     elem.download = name+".json";
          //     document.body.appendChild(elem);
          //     elem.click();
          //     document.body.removeChild(elem);
          // } //all of this is useless for output.
          window.running.modal.dialog.hide();
          window.running.modal.modal.empty();
        })
      ).append(
        $("<div/>",{class:"dialog-header",text:"Download compiled .zip of project." })
      );
      window.running.modal.error.hide();
  	  window.running.modal.dialog.show();
    }
  }
  return output;
});
