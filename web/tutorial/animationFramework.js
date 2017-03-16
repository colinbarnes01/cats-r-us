/* 
 * author: Colin
 * date created:  03/14/2017
 * 
 * GOALS:
 * 1) call a keyframe animation from a wrapper function in my js FW || NOT DONE
 * 2) create wrapper functions for several fun keyframes || NOT DONE
 * 3) allow users to create custom animations (optional?) || NOT DONE
 * 
 */
"use strict";

function makeAnimationFW() {

    var animationFW = {};

    animationFW.changeBgColor = function (id) {
        var ele = document.getElementById(id);
        console.log(ele);
        ele.style.backgroundColor = "blue";
    }

    animationFW.slideLeft = function (id) {
        console.log('inside slideLeft with id: ' + id);
        document.getElementById(id).classList.add('slider');
    }

    return animationFW;
}

