define(["interface"],function(interface){
  function running(){
    //when this runs:
    //setup the interface.
    //load and setup the files.
    this.interface = new interface();
  }
  return running;
})
