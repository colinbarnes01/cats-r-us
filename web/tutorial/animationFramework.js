/* 
 * author: Colin
 * date created:  03/14/2017
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
            slider.leftEnd = document.getElementsByName(slider.htmlElementsMap.leftEnd)[0].value || 300;
            slider.duration = document.getElementsByName(slider.htmlElementsMap.duration)[0].value || 4;
        };

        slider.slideLeft = function () {
            slider.updateFields();
            slider.classList.remove('slider');
            slider.classList.add('slider');
            slider.appendSlideLeftCSSRules();
        };

        slider.appendSlideLeftCSSRules = function () {
            var str = "<style>.slider{ animation-name:slideLeft; animation-duration:" + slider.duration + "s;}"
                    + "@keyframes slideLeft{ from{left:" + slider.leftStart + "px;} to{left:" + slider.leftEnd + "px;} }</style>";

            $("head").append(str);
        };

        slider.updateFields();
        return slider;
    };


    animationFW.makeColorChanger = function (params) {
        var colorChanger = document.getElementById(params.id);
        colorChanger.htmlElementsMap = params;

        colorChanger.updateFields = function () {
            colorChanger.startColor = document.getElementsByName(colorChanger.htmlElementsMap.startColor)[0].value || "#00FF00";
            colorChanger.endColor = document.getElementsByName(colorChanger.htmlElementsMap.endColor)[0].value || "#0000FF";
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

    animationFW.makeTransformer = function (params) {
        var transformer = document.getElementById(params.id);
        transformer.htmlElementsMap = params;

        transformer.updateFields = function () {
            transformer.startScale = document.getElementsByName(transformer.htmlElementsMap.startScale)[0].value || .3;
            transformer.startBgColor = document.getElementsByName(transformer.htmlElementsMap.startBgColor)[0].value || "FF0000";
            transformer.startBorderRadius = document.getElementsByName(transformer.htmlElementsMap.startBorderRadius)[0].value || 50;
            transformer.middleBgColor = document.getElementsByName(transformer.htmlElementsMap.middleBgColor)[0].value || "FFA500";
            transformer.endScale = document.getElementsByName(transformer.htmlElementsMap.endScale)[0].value || 1.5;
            transformer.endBgColor = document.getElementsByName(transformer.htmlElementsMap.endBgColor)[0].value || "FFFF00";
            transformer.endBorderRadius = document.getElementsByName(transformer.htmlElementsMap.endBorderRadius)[0].value || 0;
            transformer.duration = document.getElementsByName(transformer.htmlElementsMap.duration)[0].value || 4;
        };

        transformer.transform = function () {
            transformer.updateFields();
            transformer.classList.remove('transformer');
            transformer.classList.add('transformer');
            transformer.appendTransformCSSRules();
        };

        transformer.appendTransformCSSRules = function () {
            var str = "<style>.transformer{ animation-name:transform; animation-duration:" + transformer.duration + "s; } "
                    + "@keyframes transform{ from {"
                    + "transform: scale(" + transformer.startScale + ");"
                    + "background-color:" + transformer.startBgColor + ";"
                    + "border-radius: " + transformer.startBorderRadius + "px;}"
                    + "50%{background-color: " + transformer.middleBgColor + ";}"
                    + "to{transform: scale(" + transformer.endScale + ");"
                    + "border-radius: " + transformer.endBorderRadius + "px;"
                    + "background-color:" + transformer.endBgColor + ";} }</style>";

            $("head").append(str);
        };

        transformer.updateFields();
        return transformer;
    };

    animationFW.makeAdvancedSlider = function (params) {
        var advSlider = document.getElementById(params.id);
        advSlider.htmlElementsMap = params;

        advSlider.updateFields = function () {
            console.log('adv slider duration: ' + document.getElementsByName(advSlider.htmlElementsMap.advSliderDuration)[0].value);
            advSlider.startColor = document.getElementsByName(advSlider.htmlElementsMap.startColorAdv)[0].value || "#ADD8E6";
            advSlider.endColor = document.getElementsByName(advSlider.htmlElementsMap.endColorAdv)[0].value || "#90EE90";
            advSlider.duration = document.getElementsByName(advSlider.htmlElementsMap.advSliderDuration)[0].value || 4;
            advSlider.leftStart = document.getElementsByName(advSlider.htmlElementsMap.leftStartAdv)[0].value || 5;
            advSlider.leftEnd = document.getElementsByName(advSlider.htmlElementsMap.leftEndAdv)[0].value || 500;
        };

        advSlider.slide = function () {
            advSlider.updateFields();
            advSlider.classList.remove('advancedSlider');
            advSlider.classList.add('advancedSlider');
            advSlider.appendAdvancedSlideCSSRules();
        };

        advSlider.appendAdvancedSlideCSSRules = function () {
            console.log('inside append advSlider.duration: ' + advSlider.duration);
            var str = "<style>.advancedSlider{ animation-name: advancedSlide; animation-duration:" + advSlider.duration + "s; } "
                    + "@keyframes advancedSlide{"
                    + "0% { background-color:" + advSlider.startColor + "; transform: rotate(0deg); left: " + advSlider.leftStart + "px; }"
                    + "70% { background-color:" + advSlider.endColor + "; transform: rotate(0deg); left: " + advSlider.leftEnd + "px; }"
                    + "100% { transform: rotate(-360deg); left: 5px; }"
                    + "}</style>";

            $("head").append(str);
        };
        
        advSlider.updateFields();
        return advSlider;
    };




    animationFW.restartAnimation = function (component) {
        var elementId = component.htmlElementsMap.id;
        var oldEle = $("#" + elementId);
        console.log("inside restart: " + oldEle);
        var newEle = oldEle.clone(true);

        oldEle.before(newEle);
        oldEle.remove();
    };

    return animationFW;
}
