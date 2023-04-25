const cardContainer = document.querySelector('.card-container');
const card = document.querySelector('.card');

window.onload = () => {  
    'use strict';     
    if ('serviceWorker' in navigator) {     
    navigator.serviceWorker  
    .register('./sw.js'); 
    } 
    }

card.addEventListener('click', function() {
  cardContainer.classList.toggle('active');
});

// Create an array to hold the image objects
var imageObjects = [];

// Create 10 image objects and position them randomly outside the viewport
for (var i = 0; i < 10; i++) {
  var img = document.createElement("img");
  img.src = "imgs/stuk-logo.png";
  img.style.position = "absolute";
  img.id = "img" + i;
  img.style.overflow = "hidden";
  img.style.position = "absolute";

  let offset = 200;
  let topedge = window.innerWidth+offset*2;
  let sideedge = window.innerHeight+offset*2;
  let linepoint = Math.random()*((topedge)*2+(sideedge)*2);
  if (linepoint < topedge) {
    img.style.top = -offset + "px";
    img.style.left = linepoint - offset + "px";
  } else if (linepoint < topedge + sideedge) {
    img.style.top = linepoint - topedge + "px";
    img.style.left = topedge - offset + "px";
  } else if (linepoint < topedge * 2 + sideedge) {
    img.style.top = sideedge - offset + "px";
    img.style.left = linepoint - topedge - sideedge - offset + "px";
  } else {
    img.style.top = linepoint - topedge * 2 - sideedge + "px";
    img.style.left = -offset + "px";
  }
  img.style.transition = "transform 20s linear, top 20s linear, left 20s linear";
  var element = document.getElementById("backg");
  element.insertBefore(img, element.firstChild);
  imageObjects.push(img);
}

function moveImg(img) {
    let rect = document.getElementById(img.id).getBoundingClientRect();
    let xpos = Math.random()*window.innerWidth;
    let ypos = Math.random()*window.innerHeight;
    let dist = Math.sqrt(Math.pow(window.innerWidth, 2)+ Math.pow(window.innerHeight, 2));
    
    let l = Math.sqrt(Math.pow(xpos-rect.left, 2) + Math.pow(ypos-rect.top, 2));
    let endx = ((xpos - rect.left) / l) * dist;
    let endy = ((ypos - rect.top) / l) * dist;

    img.style.top = endy + "px";
    img.style.left = endx + "px";
}

// Animate the image objects by moving them across the viewport at random angles
function animate(timeAddOn) {
    imageObjects.forEach(function(img) {
    setTimeout(function() {
        moveImg(img);
    }, Math.random() * 20000);
  });
  setTimeout(function() {
    animate(20000)
  }, timeAddOn + Math.random() * 3000);
}

animate(0);

function onLongPress(element, callback) {
    let timer;
  
    element.addEventListener('touchstart', () => { 
      timer = setTimeout(() => {
        timer = null;
        callback();
      }, 2000);
    });
  
    function cancel() {
      clearTimeout(timer);
    }
  
    element.addEventListener('touchend', cancel);
    element.addEventListener('touchmove', cancel);
  }

  onLongPress(document.querySelector('.card-container'), () => {
    console.log('Long pressed', element);
    let name = prompt("Enter your name");
    let number = prompt("Enter your personal number");
    document.getElementById("name").innerText = name;
    document.getElementById("nummer").innerText = number;


  });