define([
	'jquery',
  'files'
],function($, files){
  function makeDisplay(object,spot,main,level=0){
    var tree = Object.keys(object);
    for(var i = 0; i < tree.length; i++){
      if(typeof object[tree[i]] === "string"){
        main.append($('<div/>', {class:"file-button ", alt:object[tree[i]], text:tree[i]}).click(function(){window.running.interface.projcodeeditor.setValue($(this).attr("alt"));}));
      }
      if(typeof object[tree[i]] === "object"){
        main.append($('<div/>',{class:"file-button",text: tree[i]}).append('<div/>',{class:"file-dropdown",text:'▶'}).click(function(){$(this).toggle()}));
        makeDisplay(object[tree[i]],$(main[0].lastChild),main,level+1);
      }
    }
  }
  function projects(){
    this.projFileList = $('.project-file-replace');
    this.buttons();
    this.files = new files();
    makeDisplay(this.files,this.projFileList,this.projFileList);
  }
  projects.prototype = {
    buttons: function(){
      $('#testeroni').click(
        function(){
          console.log("wow you pressed it!");
        }
      )
    },
  }
  return projects;
});
