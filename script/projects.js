define([
	'jquery',
  'files'
],function($, files){
  function projects(){
    this.projFileList = $('.project-file-replace');
    this.buttons();
    this.files = new files();
    this.display(this.files["projects"],this.projFileList,this.projFileList);
  }
  projects.prototype = {
    buttons: function(){
      $('#new-file').click(
        function(){
          console.log("wow you pressed it!");
        }
      )
    },
    display: function(files,spot,main,level=0){
      var tree = Object.keys(files);
      for(var i = 0; i < tree.length; i++){
        if(typeof files[tree[i]] === "string"){
          spot.append($('<div/>', {
            class:"file-button ", alt:files[tree[i]], text:tree[i]
          }).click(function(e){
            e.stopPropagation();
            this.text = files[tree[i]];
            console.log(this.text);
            window.running.interface.projcodeeditor.setValue($(this).attr('alt'));
          }));
        }
        if(typeof files[tree[i]] === "object"){
          spot.append($('<div/>',{
            class:"file-button",text: tree[i]
          }).click(function(e){
            e.stopPropagation();
            $(this).children('.file-button').toggle();
          }));
          this.display(files[tree[i]],$(spot[0].lastChild),main,level+1);
        }
      }
    }
  }
  return projects;
});
