//$(document).ready(function () {
//    var canvas = $("#canvas");
//    if (canvas == null)
//        return;
//    var context = canvas.get(0).getContext("2d");
//    $(window).resize(resizeCanvas);
//    function resizeCanvas() {
//        canvas.attr("width", $(window).get(0).innerWidth);
//        canvas.attr("height", $(window).get(0).innerHeight);
//        context.fillRect(0, 0, canvas.width(), canvas.height());
//    }
//    resizeCanvas();
//});
//canvas function
var canvas;
var context;
var offset = 0;
var msg = '';
var timeout = 0;
var data;

function init() {  //隨視窗大小初始化canvas大小
    offset = 0;
    clearInterval(timeout);
    timeout = 0;
    var keyURL = document.URL;
    console.log('keyURL: ' + keyURL);
    keyURL = keyURL.split('?')[1];
    var key = keyURL.split('=')[1];
    console.log('key: ' + key);
    //key = key.split('?')[1];
    //key = '101418817';
    if (key == null)
        window.location.replace('index.html');
    var dataStr = localStorage.getItem(key); //從localstorage取回data
    //if (dataStr == null)
    //    window.location.replace('index.html');
    data = JSON.parse(dataStr);
    data.italic = data.italic ? 'italic' : '';
    data.bold = data.bold ? 'bold' : '';
    //data.underline = data.underline ? 'underline' : '';
    canvas = document.getElementById('canvas');
    if (canvas == null) {
        return false;
    }
    context = canvas.getContext('2d');
    if (context == null)
        return false;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvasSetting(data);
}

function clearCanvas() {  //清除canvas
    if (canvas == null) {
        return false;
    }
    else {
        if (context == null)
            return false;
        context.clearRect(0, 0, innerWidth, innerHeight);
    }
}

function canvasSetting(data) {
    clearCanvas();
    if (canvas == null) {
        return false;
    }
    if (context == null)
        return false;
    msg = data.msg;
    var font_style = data.italic + ' ' + data.bold + ' ' + data.font_size + 'px ' + data.font; //設定font_style ex:context.font = 'italic bold 500px 新細明體';
    context.font = font_style;  
    context.textBaseline = 'alphabetic'; 
    //context.textAlign = 'center';
    canvas.style.backgroundColor = data.background_color;
    context.fillStyle = data.font_color;


    //context.fillText(msg, 0-msg.length*20, canvas.height/2);
    timeout =  setInterval(marquee, 30);
    //setTimeout(marquee,10000);
}

function drawUnderline(context, text, x, y, color, fontSize, textAlign) {  //在canvas上畫出underline
    var textWidth = context.measureText(text).width;
    var underlineP = parseInt(fontSize) / 15;  //取underline高度為字串大小除以15
    var startX=0;
    var startY = y + underlineP;
    var endX = 0;
    var endY = startY;
    var underlineHeight = underlineP;
    if (underlineHeight < 1)
        underlineHeight = 1;
    if (textAlign == 'right') {  //根據align位置決定x的起始與結束位置
        startX = x - textWidth;
        endX = x;
    } else if (textAlign == 'center') {
        startX = x - textWidth / 2;
        endX = x + textWidth / 2;
    } else {
        startX = x;
        endX = textWidth;

    }
    //start to draw underline
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = underlineHeight; //將線寬設成與underline高度等長
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.closePath();
    context.stroke();
}

function marquee() {  //跑馬燈
    var startX = canvas.width - offset;
    var startY = canvas.height / 2;
    clearCanvas();
    context.fillText(msg, startX, startY);  //從canvas的最右邊中間開始畫
    if(data.underline)
        drawUnderline(context, msg, startX, startY, data.font_color, data.font_size, 'left');
    offset += 5;
    if (offset > canvas.width + context.measureText(msg).width) //offset至少大於text整體寬度+canvas寬度才輪迴
        offset = 0;
    //clearCanvas();
    //setTimeout(marquee, 100);
}

