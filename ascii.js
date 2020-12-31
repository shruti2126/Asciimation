/*
Name: Shruti Sharma
Section: CSE 154 AG

This file consists of code that determine the behaviour of elements in the
ascii.html page (like buttons, drop-downs etc.).
*/
"use strict";

//wraps all content of the file in one function to prevent unwanted hacks into
//code and changes to functionality.
(function () {

  //Helps to get elements from HTML file by Id.
  function $(id) {
    return document.getElementById(id);
  }

  let timer = null;
  let counter = 0; //stores all frames of asciimation.
  let currentFrame; //The part of asciimation that appears on screen at a
  //certain time.

  //Sets up all events on the page like the click of buttons or selection from
  //drop-down menus.
  window.onload = function () {
    $("start").onclick = startAnimation;
    $("stop").onclick =  stopAnimation;
    $("animation").onchange = selectAnimation;
    $("size").onchange = selectSize;
    let speeds = document.querySelectorAll("input[name='speed']");
    for(let i = 0; i< speeds.length; i++) {
      speeds[i].onchange = changeSpeed;
    }
  };

  //Splits the asciimation into single frames that then begin to appear one
  //after the other at a set interval of time (in milliseconds).
  //Disables the start button and the "select animation" drop-down. //enables
  //stop button.
  function startAnimation() {
    currentFrame = $("mytextarea").value.split("=====\n");
    let currentSpeed =
    document.querySelector("input[name='speed']:checked").value;
    timer = setInterval(frame, currentSpeed);
    $("start").disabled = true;
    $("animation").disabled = true;
    $("stop").disabled = false;
  }

  //stops animation and re-displays all frames.
  //disables stop button.
  //enables start and "select animation" drop-down menu.
  function stopAnimation() {
    clearInterval(timer);
    $("mytextarea").value = ANIMATIONS[$("animation").value];
    $("start").disabled = false;
    $("animation").disabled = false;
    $("stop").disabled = true;
  }

  //Changes speed at which animation is running.
  function changeSpeed() {
    clearInterval(timer);
    let currentSpeed =
    document.querySelector("input[name='speed']:checked").value;
    timer = setInterval(frame, currentSpeed);
  }

  //Allows user to select different asciimations available from
  //drop-down menu.
  function selectAnimation() {
    let value = this.value;
    $("mytextarea").value = ANIMATIONS[value];
    $("stop").disabled = true;
  }

  //Displays each frame in the asciimation after a set amount of time.
  function frame() {
    if(counter >= currentFrame.length) {
      counter = 0;
    }
    $("mytextarea").value = currentFrame[counter];
    counter++;
  }

  //Allows user to change size of frames appearing in the text area even
  //while the animation is ongoing.
  function selectSize() {
    $("mytextarea").style.fontSize = this.value + "pt";
  }

})();
