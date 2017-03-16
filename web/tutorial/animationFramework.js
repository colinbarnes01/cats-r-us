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

    animationFW.slideLeft = function (id) {
        console.log('inside slideLeft with id: ' + id);
        document.getElementById(id).classList.add('slider');
        animationFW.appendSlideLeftCSSRules();
    };

    animationFW.appendSlideLeftCSSRules = function () {
        var str = "<style>.slider{ animation-name:slideLeft; animation-duration:4s; } "
                + "@keyframes slideLeft{ from{left:5px;} to{left:200px;} }</style>";

        console.log(str);
        $("head").append(str);
    };

    animationFW.changeColor = function (id) {
        console.log('inside changeColor with id: ' + id);
        document.getElementById(id).classList.add('colorChanger');
        animationFW.appendChangeColorCSSRules();
    };

    animationFW.appendChangeColorCSSRules = function () {
        var str = "<style>.colorChanger{ animation-name:changeColor; animation-duration:4s; } "
                + "@keyframes changeColor{ from{background-color:yellow;} to{background-color:red;} }</style>";

        console.log(str);
        $("head").append(str);
    };

    return animationFW;
}


/*
            .slider {
                animation-name: slideLeft;
                animation-duration: 4s;
            }

            @keyframes slideLeft {
                from {
                    left: 5px;
                }
                to {
                    left: 200px;
                }
            }*/