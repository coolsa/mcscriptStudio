require.config( {
  baseUrl: "./script",
  paths: {
    vendor: "../node_modules",
    jquery: "../node_modules/jquery/dist/jquery.min",
    mcscript: "../node_modules/mcscript/lib/forWeb",
    jszip: "../node_modules/jszip/dist/jszip.min",
    domready: "../node_modules/requirejs-domready/domReady",
    jqueryresizable: "../node_modules/jquery-resizable-dom/dist/jquery-resizable.min"
  },
  shim:{
    'mcscript': {
      exports: 'mcscript',
      init: function(){
        return {InputStream, TokenStream, parse, generate, checkFilename, handleFiles, compile, myExtObject};
      }
    }
  },
  packages: [ {
    name: "codemirror",
    location: "../node_modules/codemirror",
    main: "lib/codemirror"
  } ]
} );

require( [
  "running",
  "domready",
  "script/syntax/mcscript-mode.js",
  "codemirror/keymap/sublime",
  "codemirror/addon/edit/matchbrackets"
], function (running, domReady) {
  domReady( function () {
    window.running = new running();
  } );
} );
