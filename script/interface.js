define([
	'codemirror',
	'jquery',
	'projects',
	'modal',
	'compile',
	'jqueryresizable',
	'codemirror/mode/javascript/javascript',
	'codemirror/addon/scroll/simplescrollbars'
],function(CodeMirror, $, projects,modal,compile){
	function interface(){
		//this.$render-area = $(".main-code");
		this.projcodeeditor = CodeMirror($(".project-code-replace")[0],{
			mode: 'mcscript',
			lineNumbers: true,
			value: "",
			theme: 'pastel-on-dark',
			scrollbarStyle: 'simple'
		});
		this.projcodeeditor.setSize($(".center").width()-$(".output-render").width()-$(".splitter").width()-250,'100%');
		var projcodeeditor = this.projcodeeditor;
		this.projcodeeditor.on("change",function(){
			$(".file-file-selected").data("filedata")[Object.keys($(".file-file-selected").data("filedata"))[0]][0] = projcodeeditor.getValue();
			localStorage.text = JSON.stringify(window.running.interface.projects.files.projects);
		});
		this.outcodeeditor = CodeMirror($(".output-code-replace")[0],{
			mode: 'javascript',
			lineNumbers: true,
			readOnly: true,
			value: "",
			theme: 'pastel-on-dark',
			scrollbarStyle: 'simple'
		});
		this.outcodeeditor.setSize($(".center").width()-$(".project-render").width()-$(".splitter").width()-250,'100%');
		this.slider();
		this.buttons();
		this.projects = new projects();
		this.modal = new modal();
	}
	interface.prototype = {
		buttons: function(){
			var that = this;
		  $("#compile").click(function() {
        var data = $(".project-file-replace").children(".file-selected").data("filedata");//if project is clicked on
        if(data === undefined) data = that.projects.projFileList.children(".file-parent-active").data("filedata");//if file/folder is clicked on.
				console.log(that.projects.files.findFiles(data));
			});
			$("#undo").click(function() {
				that.projcodeeditor.execCommand("undo");
			});
			$("#redo").click(function() {
				that.projcodeeditor.execCommand("redo");
			});
		},
		slider: function(){
			var that = this;
			$(".project-render")[0].style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
			$(".project-render").resizable({
				handleSelector: ".splitter",
				resizeHeight:false,
				onDrag: function(){
					$(".output-render")[0].style.maxWidth = $(".center").width()-$(".project-render").width() +"px";
					that.outcodeeditor.setSize($(".center").width()-$(".project-render").width()-$(".splitter").width()-250,'100%');
					that.projcodeeditor.setSize($(".center").width()-$(".output-render").width()-$(".splitter").width()-250,'100%');
				},
				onDragEnd: function(){
					$(".output-render")[0].style.maxWidth = $(".center").width()-$(".project-render").width() +"px";
					that.outcodeeditor.setSize($(".center").width()-$(".project-render").width()-$(".splitter").width()-250,'100%');
					that.outcodeeditor.refresh();
					that.projcodeeditor.setSize($(".center").width()-$(".output-render").width()-$(".splitter").width()-250,'100%');
					that.projcodeeditor.refresh();
				}
			});
			$(".output-render").resizable({
				handleSelector: ".splitter",
				resizeHeight:false,
				onDrag: function(){
				},
				onDragEnd: function(){
				}
			});
			$(window).resize(function(){
				$(".project-render")[0].style.maxWidth = ($(".center").width()-$(".splitter").width()) +"px";
  			$(".output-render")[0].style.maxWidth = $(".center").width()-$(".project-render").width() +"px";
				$(".center")[0].style.maxHeight = $(window).height() + "px";
				that.projcodeeditor.setSize($(".center").width()-$(".output-render").width()-$(".splitter").width()-250,'100%');
				that.projcodeeditor.refresh();
				that.outcodeeditor.setSize($(".center").width()-$(".project-render").width()-$(".splitter").width()-250,'100%');
				that.outcodeeditor.refresh();
			});
		}
	}
	return interface;
});
