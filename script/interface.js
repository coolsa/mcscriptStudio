define([
	'codemirror',
	'jquery',
	'jqueryresizable',
	'codemirror/mode/javascript/javascript',
	'codemirror/addon/scroll/simplescrollbars'
],function(CodeMirror, $){
	function interface(){
		//this.$render-area = $(".main-code");
		if(localStorage.text==undefined)localStorage.text="";
		this.projcodeeditor = CodeMirror($(".project-code-replace")[0],{
			mode: 'mcscript',
			lineNumbers: true,
			value: localStorage.text,
			theme: 'pastel-on-dark',
			scrollbarStyle: 'simple'
		});
		this.projcodeeditor.setSize($(".center").width()-$(".output-render").width()-$(".splitter").width()-200,'100%');
		var projcodeeditor = this.projcodeeditor;
		this.projcodeeditor.on("change",function(){localStorage.text = projcodeeditor.getValue()});
		this.outcodeeditor = CodeMirror($(".output-code-replace")[0],{
			mode: 'javascript',
			lineNumbers: true,
			readOnly: true,
			value: localStorage.text,
			theme: 'pastel-on-dark',
			scrollbarStyle: 'simple'
		});
		this.outcodeeditor.setSize($(".center").width()-$(".project-render").width()-$(".splitter").width()-200,'100%');
		this.slider();
		this.buttons();
//		this.compiler = new compiler($(".compiled-commands"),this.projcodeeditor);
	}
	interface.prototype = {
		buttons: function(){
			var that = this;
		  document.getElementById("compile").onclick = function() {
				window.running.interface.compiler.fancy();
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
				},
				onDragEnd: function(){
					$(".output-render")[0].style.maxWidth = $(".center").width()-$(".project-render").width() +"px";
					that.outcodeeditor.setSize($(".center").width()-$(".project-render").width()-$(".splitter").width()-200,'100%');
					that.outcodeeditor.refresh();
					that.projcodeeditor.setSize($(".center").width()-$(".output-render").width()-$(".splitter").width()-200,'100%');
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
				that.projcodeeditor.setSize($(".center").width()-$(".output-render").width()-$(".splitter").width()-200,'100%');
				that.projcodeeditor.refresh();
				that.outcodeeditor.setSize($(".center").width()-$(".project-render").width()-$(".splitter").width()-200,'100%');
				that.outcodeeditor.refresh();
			});
		}
	}
	return interface;
});
