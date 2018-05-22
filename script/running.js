define(["interface","modal"],function(interface,modal){
  function running(){
    //when this runs:
    //setup the interface.
    //load and setup the files.
    this.interface = new interface();
    this.modal = new modal();
  }
  return running;
})
