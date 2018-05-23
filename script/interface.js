define([
	'codemirror',
	'jquery',
	'projects',
	'modal',
	'jqueryresizable',
	'codemirror/mode/javascript/javascript',
	'codemirror/addon/scroll/simplescrollbars'
],function(CodeMirror, $, projects,modal){
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
			localStorage.text = JSON.stringify(window.running.interface.projects.files.projects);
			$(".file-file-selected").data("filedata")[Object.keys($(".file-file-selected").data("filedata"))[0]][0] = projcodeeditor.getValue();
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
//		this.compiler = new compiler($(".compiled-commands"),this.projcodeeditor);
	}
	interface.prototype = {
		buttons: function(){
			var that = this;
		  document.getElementById("compile").onclick = function() {
				console.log(window.running.interface.projects.files.findFiles($($(".file-selected").parents(".file-button")[$(".file-selected").parents(".file-button").length-1]).data("filedata")));
			};
			document.getElementById("undo").onclick = function() {
				window.running.interface.projcodeeditor.execCommand("undo");
			};
			document.getElementById("redo").onclick = function() {
				window.running.interface.projcodeeditor.execCommand("redo");
			};
			// $(".compiled-commands")[0].onclick = function() {
			// 	that.selectCompiled();
			// };
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
