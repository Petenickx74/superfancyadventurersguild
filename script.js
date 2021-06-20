/*Collapsible Button*/
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}
/*Carousel functionality*/
window.onload = function() {

    var slider1 = new Slider({
        images: '.slider-1 img',
        btnPrev: '.slider-1 .buttons .prev',
        btnNext: '.slider-1 .buttons .next',
        auto: true,
        rate: 3000
    });
}
function Slider(obj) {

  this.images = document.querySelectorAll(obj.images);
  this.auto = obj.auto;
  this.btnPrev = obj.btnPrev;
  this.btnNext = obj.btnNext;
     this.rate = obj.rate || 1000;

  var i = 0;
     var slider = this;

  this.prev = function () {
    slider.images[i].classList.remove('shown');
    i--;

    if (i < 0) {
      i = slider.images.length - 1;
    }

    slider.images[i].classList.add('shown');
  }

  this.next = function () {
    slider.images[i].classList.remove('shown');
    i++;

    if (i >= slider.images.length) {
      i = 0;
    }

    slider.images[i].classList.add('shown');
  }

    document.querySelector(slider.btnPrev).onclick = slider.prev;
    document.querySelector(slider.btnNext).onclick = slider.next;

  if (slider.auto)  {
        setInterval(slider.next, slider.rate);
    }
};
//Audio.
var activeSong;
var playbutton = $("#songPlay")
var pausebutton = $("#songPause")
activeSong = document.getElementById("song");
pausebutton.hide()
//Plays the song. Just pass the id of the audio element.
function play(id){
  //Sets the active song to the song being played. All other functions depend on this.
  
  //Plays the song defined in the audio tag.
  activeSong.play();

  //Calculates the starting volume percentage of the song.
  var percentageOfVolume = activeSong.volume / 1;
  var percentageOfVolumeMeter = document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;

  //Fills out the volume status bar.
  var percentageOfSong = (activeSong.currentTime/activeSong.duration);
  var percentageOfSlider = document.getElementById('songSlider').offsetWidth * percentageOfSong;
  document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeMeter) + "px";
 
  playbutton.hide()
  pausebutton.show()

}
//Pauses the active song.
function pause(){
  activeSong.pause();

   playbutton.show()
  pausebutton.hide()

}
//Updates the current time function so it reflects where the user is in the song.
//This function is called whenever the time is updated.  This keeps the visual in sync with the actual time.
function updateTime(){
    var currentSeconds = (Math.floor(activeSong.currentTime % 60) < 10 ? '0' : '') + Math.floor(activeSong.currentTime % 60);
    var currentMinutes = Math.floor(activeSong.currentTime / 60);
    //Sets the current song location compared to the song duration.
    document.getElementById('songTime').innerHTML = currentMinutes + ":" + currentSeconds + ' / ' + Math.floor(activeSong.duration / 60) + ":" + (Math.floor(activeSong.duration % 60) < 10 ? '0' : '') + Math.floor(activeSong.duration % 60);

    //Fills out the slider with the appropriate position.
    var percentageOfSong = (activeSong.currentTime/activeSong.duration);
    var percentageOfSlider = document.getElementById('songSlider').offsetWidth * percentageOfSong;
    
    //Updates the track progress div.
    document.getElementById('trackProgress').style.width = Math.round(percentageOfSlider) + "px";
}
function volumeUpdate(number){
    //Updates the volume of the track to a certain number.
    activeSong.volume = number / 100;
}
//Changes the volume up or down a specific number
function changeVolume(number, direction){
    //Checks to see if the volume is at zero, if so it doesn't go any further.
    if(activeSong.volume >= 0 && direction == "down"){
        activeSong.volume = activeSong.volume - (number / 100);
    }
    //Checks to see if the volume is at one, if so it doesn't go any higher.
    if(activeSong.volume <= 1 && direction == "up"){
        activeSong.volume = activeSong.volume + (number / 100);
    }
    
    //Finds the percentage of the volume and sets the volume meter accordingly.
    var percentageOfVolume = activeSong.volume / 1;
    var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;
    
    document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
}
//Sets the location of the song based off of the percentage of the slider clicked.
function setLocation(percentage){
    activeSong.currentTime = activeSong.duration * percentage;
}
/*
Gets the percentage of the click on the slider to set the song position accordingly.
Source for Object event and offset: http://website-engineering.blogspot.com/2011/04/get-x-y-coordinates-relative-to-div-on.html
*/
function setSongPosition(obj,e){
    //Gets the offset from the left so it gets the exact location.
    var songSliderWidth = obj.offsetWidth;
    var evtobj=window.event? event : e;
    clickLocation =  evtobj.layerX - obj.offsetLeft;
    
    var percentage = (clickLocation/songSliderWidth);
    //Sets the song location with the percentage.
    setLocation(percentage);
}

//Set's volume as a percentage of total volume based off of user click.
function setVolume(percentage){
  
    activeSong.volume =  percentage;
    
    var percentageOfVolume = activeSong.volume / 1;
    var percentageOfVolumeSlider = document.getElementById('volumeMeter').offsetWidth * percentageOfVolume;
    
    document.getElementById('volumeStatus').style.width = Math.round(percentageOfVolumeSlider) + "px";
}

//Set's new volume id based off of the click on the volume bar.
function setNewVolume(obj,e){
    var volumeSliderWidth = obj.offsetWidth;
    var evtobj = window.event? event: e;
    clickLocation = evtobj.layerX - obj.offsetLeft;
    
    var percentage = (clickLocation/volumeSliderWidth);
    setVolume(percentage);
}
//Stop song by setting the current time to 0 and pausing the song.
function stopSong(){
    activeSong.currentTime = 0;
    activeSong.pause();
}