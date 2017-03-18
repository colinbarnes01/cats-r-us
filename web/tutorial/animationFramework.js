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
        slider.htmlElementsMap = params;     // we need this because we have to check the html
        // input fields and update the slider obj every button click


        slider.updateFields = function () {
            slider.leftStart = document.getElementsByName(slider.htmlElementsMap.leftStart)[0].value || 5;
            slider.leftEnd = document.getElementsByName(slider.htmlElementsMap.leftEnd)[0].value || 200;
            slider.duration = document.getElementsByName(slider.htmlElementsMap.duration)[0].value || 4;
        };

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

        slider.updateFields();
        return slider;
    }


    animationFW.makeColorChanger = function (params) {
        var colorChanger = document.getElementById(params.id);
        colorChanger.htmlElementsMap = params;

        colorChanger.updateFields = function () {
            colorChanger.startColor = document.getElementsByName(colorChanger.htmlElementsMap.startColor)[0].value || "#FFFF00";
            colorChanger.endColor = document.getElementsByName(colorChanger.htmlElementsMap.endColor)[0].value || "#FF0000";
            colorChanger.duration = document.getElementsByName(colorChanger.htmlElementsMap.duration)[0].value || 4;
        };

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

        colorChanger.updateFields();
        return colorChanger;
    };


    animationFW.restartAnimation = function (component) {
        var elementId = component.htmlElementsMap.id;
        console.log(elementId);
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