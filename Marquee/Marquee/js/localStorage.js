function getElement() {
    var jsonElement = new Object;
    jsonElement.background_color //取得背景色
        = document.getElementById('background-color').options[document.getElementById('background-color').selectedIndex].value;
    jsonElement.font_color //取得字體色
        = document.getElementById('font-color').options[document.getElementById('font-color').selectedIndex].value;

    jsonElement.font //取得字體
        = document.getElementById('font').options[document.getElementById('font').selectedIndex].value;
    check_font_size();
    jsonElement.font_size = document.getElementById('font-size').value; //取得字體大小
    jsonElement.msg = document.getElementById('msg').value; //取得訊息字串
    jsonElement.speed = document.getElementById('speed').value; //取得速度
    jsonElement.italic = document.getElementById('italic').checked; //取得斜體狀態
    jsonElement.bold = document.getElementById('bold').checked; //取得粗體狀態
    jsonElement.underline = document.getElementById('underline').checked;   //取得文字底線狀態
    jsonElement.date = new Date(); //取得系統當下時間
    console.log(jsonElement.date);
    var jsonString = JSON.stringify(jsonElement);  //JSON字串化
    localStorage.setItem(jsonElement.date, jsonString); //以時間為key存入localstorage

}
 