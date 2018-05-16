define([
	'jquery'
],function($){
  /*
  todo:
  make a thing that loads this all fancy and stuff
  this is meant to do things like:
  hold the files in an object form
  using prototypes to add or remove some folders or files or new projects
  files are in a object tree
  ex:

  */
  function files(){
    this.projects = {
      "file": "wow such file",
      "folder": {
        "file": "wow neat another file!",
        "folder": {
          "file": "wow nested folders!",
          "file2": "wow two files!"
        }
      }
    }
  }
  return files;
});
