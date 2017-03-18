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

    animationFW.slideLeft = function (params) {
        //console.log('inside slideLeft with params: ', params);
        var ele = document.getElementById(params.id);
        ele.classList.remove('slider');
        document.getElementById(params.id).classList.add('slider');
        animationFW.appendSlideLeftCSSRules(params);
    };

    animationFW.appendSlideLeftCSSRules = function (params) {
        var str = "<style>.slider{ animation-name:slideLeft; animation-duration:" + params.duration + "s; } "
                + "@keyframes slideLeft{ from{left:" + params.leftStart + "px;} to{left:" + params.leftEnd + "px;} }</style>";

        //console.log(str);
        $("head").append(str);
    };

    animationFW.changeColor = function (params) {
        console.log('inside changeColor with params: ' + params);
        document.getElementById(params.id).classList.add('colorChanger');
        animationFW.appendChangeColorCSSRules(params);
    };

    animationFW.appendChangeColorCSSRules = function (params) {
        var str = "<style>.colorChanger{ animation-name:changeColor; animation-duration:" + params.duration + "s; } "
                + "@keyframes changeColor{ from{background-color:" + params.startColor + ";}"
                + "to{background-color:" + params.endColor + ";} }</style>";

        console.log(str);
        $("head").append(str);
    };

    animationFW.listenForButtonClickAndRestartAnimation = function () {
        $("#sliderButton").click(function () {
            console.log("inside slider btn click");
            animationFW.restartAnimation("box1");
        });
        $("#changeColorButton").click(function () {
            console.log("inside change color btn click");
            animationFW.restartAnimation("box2");
        });
    };

    animationFW.restartAnimation = function (elementId) {
        var oldEle = $("#" + elementId);
        console.log("inside restart: " + oldEle);
        var newEle = oldEle.clone(true);

        oldEle.before(newEle);
        oldEle.remove();
        //$("." + oldBox.attr("class") + ":last").remove();
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