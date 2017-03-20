/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function makeCatFramework() {

    var catFramework = {};

    catFramework.makeCat = function (params) {
        if (!params) {
            alert("Please supply an input parameter to makeCat()");
        }
        if (!params.id) {
            alert("Please supply an id in the parameter to makecat()");
        }

        var cat = document.getElementById(params.id);

        cat.id = params.id;
        cat.top = params.top || 200;
        cat.left = params.left || 240;
        cat.style.top = cat.top + "px";
        cat.style.left = cat.left + "px";
        cat.style.position = params.position || "fixed";
        cat.style.height = params.height || "75px";
        cat.style.width = params.width || "75px";
        cat.style.backgroundImage = "url('pictures/cat_sprites.png')";
        cat.style.backgroundPosition = params.backgroundPosition || "-10px -200px";
        cat.style.backgroundSize = "1450%";
        cat.style.backgroundRepeat = "no-repeat";
        cat.style.zIndex = "2";

        // private variables to the cat object being created
        cat.speed = params.speed || "10";
        cat.direction = "FORWARD";
        cat.interval;                                  // interval is a js method for repeated actions, like changing sprites
        cat.spritePositions = params.spritePositions;
        
        // private variables to the constructor method
        var speed = params.speed || "10";
        var direction = "FORWARD";;
        
        
        
        cat.changeSpeed = function (newSpeed) {
            console.log("newSpeed: " + newSpeed);
            speed = newSpeed;
            updateCat();
        };

        cat.reverseDirection = function () {
            if (cat.direction == "FORWARD") {
                direction = "BACKWARD";
            } else {
                direction = "FORWARD";
            }
            updateCat();
            cat.reverseSpeed();
        };
        
        function updateCat() {
            cat.speed = speed;
            cat.direction = direction;
        }

        cat.reverseSpeed = function () {
            console.log(cat.direction);
            if (cat.direction == "FORWARD") {
                cat.changeSpeed(Math.abs(cat.speed));
            } else if (cat.direction == "BACKWARD") {
                cat.changeSpeed(-Math.abs(cat.speed));
            }
        }

        return cat;
    };

    catFramework.moveCat = function (cat) {
        console.log('inside moveCat with cat: ' + cat.id);
        console.log('inside moveCat with cat.speed:' + cat.speed);
        cat.left += parseInt(cat.speed);
        console.log('inside moveCat with cat.left: ' + cat.left);
        cat.style.left = cat.left + "px";
    };

    // VARIABLES FOR CAT ANIMATION ARE DEFINED HERE
    var interval01;
    var interval02;
    var curr_position = 0;  // used in the changeSprite function

    catFramework.animateCat = function (cat) {
        console.log('cat: ' + cat);
        if (interval01 == null) {
            interval01 = setInterval(function () {
                catFramework.changeSprite(cat);
                catFramework.moveCat(cat);
            }, 200);
            cat.interval = interval01;
        } else {
            interval02 = setInterval(function () {
                catFramework.changeSprite(cat);
                catFramework.moveCat(cat);
            }, 200);
            cat.interval = interval02;
        }
        if (cat.id === 'cat01') {
            document.getElementById("walkBtn01").disabled = true;
        } else {
            document.getElementById("walkBtn02").disabled = true;
        }
    };

    catFramework.stopCat = function (cat) {
        console.log('cat.id: ' + cat.id);
        if (cat.id === 'cat01') {
            document.getElementById("walkBtn01").disabled = false;
        } else {
            document.getElementById("walkBtn02").disabled = false;
        }
        clearInterval(cat.interval);
    };


    catFramework.changeSprite = function (cat) {
        curr_position++;
        if (curr_position > 2) {
            curr_position = 0;
        }
        cat.style.backgroundPosition = cat.spritePositions[curr_position];
    };

    catFramework.changePosition = function (params) {
        params.cat.style.left = params.left + "px";
        params.cat.style.top = params.top + "px";
    };



    return catFramework;
}

