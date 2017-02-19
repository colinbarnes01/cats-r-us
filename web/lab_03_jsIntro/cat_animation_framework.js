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

        cat.style.top = params.top || "200px";
        cat.style.left = params.left || "240px";
        cat.top = 200;
        cat.left = 240;

        cat.style.position = params.position || "fixed";
        cat.style.height = params.height || "75px";
        cat.style.width = params.width || "75px";
        //cat.style.backgroundColor = params.backgroundColor || "red";
        cat.style.backgroundImage = "url('pictures/cat_sprites.png')";
        cat.style.backgroundPosition = params.backgroundPosition || "-10px -200px";
        cat.style.backgroundSize = "1450%";
        cat.style.backgroundRepeat = "no-repeat";
        //cat.style.borderRadius = "50%";
        //cat.style.border = "red solid";
        cat.style.zIndex = "2";

        return cat;
    }

    catFramework.changeSprite = function (id, position) {
        var cat = document.getElementById(id);
        cat.style.backgroundPosition = position;
    }

    catFramework.moveCat = function (id, speed) {
        var cat = document.getElementById(id);
        console.log('speed ', speed);
        cat.left += speed;
        console.log('cat.left ', cat.left)
        cat.style.left = cat.left + "px";
    }
    
    return catFramework;
}

