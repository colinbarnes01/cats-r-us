/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function makeBallFramework() {
    
    var ballFramework = {};
    

    
    ballFramework.makeBall = function (params) {
        if (!params) {
            alert("Please supply an input parameter to makeBall()");
        }
        if (!params.id) {
            alert("Please supply an id in the parameter to makeBall()");
        }
        console.log('params.id in ballFramework.makeBall(): ', params.id);
               
        var ball = document.getElementById(params.id);
        ball.style.top = params.top || "300px";
        ball.style.left = params.left || "240px";
        ball.style.position = params.position || "fixed";
        ball.style.height = params.height || "276px";
        ball.style.width = params.width || "276px";
        //ball.style.backgroundColor = params.backgroundColor || "red";
        ball.style.backgroundImage = "url('pictures/beach-ball.png')";
        ball.style.borderRadius = "50%";
        
        return ball;
    }
    
    return ballFramework;
}

