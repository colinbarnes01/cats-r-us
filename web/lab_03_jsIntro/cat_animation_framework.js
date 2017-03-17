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
        cat.style.top = params.top || "200px";
        cat.style.left = params.left || "240px";
        cat.top = 200;
        cat.left = 240;

        cat.style.position = params.position || "fixed";
        cat.style.height = params.height || "75px";
        cat.style.width = params.width || "75px";
        cat.style.backgroundImage = "url('pictures/cat_sprites.png')";
        cat.style.backgroundPosition = params.backgroundPosition || "-10px -200px";
        cat.style.backgroundSize = "1450%";
        cat.style.backgroundRepeat = "no-repeat";
        cat.style.zIndex = "2";

        // private parameters
        cat.speed = 10;
        cat.direction = "FORWARD";
        cat.interval;   // interval is a js method for repeated actions, like changing sprites
        cat.spritePositions = params.spritePositions;
        console.log(cat.spritePositions);

        cat.setSpeed = function (speed) {
            catSpeed = speed;
            //display();
        };

        cat.setDirection = function (direction) {
            catDirection = direction;
            //display();
        };

        return cat;
    }

    catFramework.moveCat = function (cat) {
        //var cat = document.getElementById(cat.id);
        cat.left += cat.speed;
        cat.style.left = cat.left + "px";
    }

    catFramework.changePosition = function (params) {
        params.cat.style.left = params.left + "px";
        params.cat.style.top = params.top + "px";
    }

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
                changeSprite(cat);
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
    }



    return catFramework;
}

