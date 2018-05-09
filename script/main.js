require.config( {
  baseUrl: "./script",
  paths: {
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
        return {InputStream, TokenStream, parse, generate, checkFilename, handleFiles, myExtObject};
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
  "domready"
], function (running, domReady ) {
  domReady( function () {
    window.running = running();
  } );
} );
