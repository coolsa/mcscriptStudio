define([
  'jquery'
],function($){
  function modal(){
    this.dialog = $(".dialog-top");
  }
  modal.prototype = {
    startup: function(){
  	   this.modal.toggle("dialog-unhide");
    }
  }
  return modal;
});
