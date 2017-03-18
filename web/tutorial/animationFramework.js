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

    animationFW.makeSlider = function (params) {
        var slider = document.getElementById(params.id);
        slider.leftStart = params.leftStart || 5;
        slider.leftEnd = params.leftEnd || 200;
        slider.duration = params.duration || 4;

        console.log('slider created: ' + slider);

        slider.slideLeft = function () {
            slider.updateFields();
            slider.classList.remove('slider');
            slider.classList.add('slider');
            slider.appendSlideLeftCSSRules();
        };

        slider.appendSlideLeftCSSRules = function () {
            var str = "<style>.slider{ animation-name:slideLeft; animation-duration:" + slider.duration + "s; } "
                    + "@keyframes slideLeft{ from{left:" + slider.leftStart + "px;} to{left:" + slider.leftEnd + "px;} }</style>";

            console.log(str);
            $("head").append(str);
        };
        
        slider.updateFields = function() {
                slider.leftStart = document.getElementsByName('leftStart')[0].value;
                slider.leftEnd = document.getElementsByName('leftEnd')[0].value;
                slider.duration = document.getElementsByName('slideDuration')[0].value;
        }
        return slider;
    }


    animationFW.makeColorChanger = function (params) {
        var colorChanger = document.getElementById(params.id);
        colorChanger.startColor = params.startColor || "#FFFF00";
        colorChanger.endColor = params.endColor || "#FF0000";
        colorChanger.duration = params.duration || 4;

        colorChanger.changeColor = function () {
            colorChanger.updateFields();
            colorChanger.classList.remove('colorChanger');
            colorChanger.classList.add('colorChanger');
            colorChanger.appendChangeColorCSSRules();
        };

        colorChanger.appendChangeColorCSSRules = function () {
            var str = "<style>.colorChanger{ animation-name:changeColor; animation-duration:" + colorChanger.duration + "s; } "
                    + "@keyframes changeColor{ from{background-color:" + colorChanger.startColor + ";}"
                    + "to{background-color:" + colorChanger.endColor + ";} }</style>";

            $("head").append(str);
        };

        colorChanger.updateFields = function () {
            colorChanger.startColor = document.getElementsByName('startColor')[0].value;
            colorChanger.endColor = document.getElementsByName('endColor')[0].value;
            colorChanger.duration = document.getElementsByName('colorChangeDuration')[0].value;

        };
        return colorChanger;
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