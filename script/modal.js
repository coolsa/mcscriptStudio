define([
  'jquery'
],function($){
  function modal(){
    this.dialog = $(".dialog-top");
    this.modal = $(".dialog");
    this.error = $(".dialog-error");
  }
  modal.prototype = {
    // nameInput: function(name,runthis,extra){//runthis is always function using
    //   var that=this;
    //   this.modal.empty();
   	//   this.modal.append(
    //     $("<div/>",{class:"dialog-button dialog-button-left",text:"cancel"})
    //     .click(function(){that.dialog.toggle("dialog-unhide");that.modal.empty();})
    //   ).append(
    //     $("<div/>",{class:"dialog-button dialog-button-right",text:"create"})
    //     .click(function(){//somehow make this do the thing. with todo as a function? yes.
    //       runthis($(".dialog-text-input").text().extra);
    //       that.dialog.toggle("dialog-unhide");that.modal.empty();
    //       console.log($(this).parent());
    //     })
    //   ).append(
    //     $("<div/>",{class:"dialog-header",text:"Create new folder"}).append(
    //       $("<div/>",{class:"dialog-error",text:"Folder cannot be named this!"});
    //     )
    //   );
    //
  	//   this.dialog.toggle("dialog-unhide");//open when initialized.
    // },
    confirm: function(name){
      console.log($(".dialog-text-input").text());
    }
  }
  return modal;
});
