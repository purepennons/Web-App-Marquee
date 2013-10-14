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
    var dt = new Date();
    var month = dt.getMonth()+1;
    var date = dt.getDate();
    var hour = dt.getHours();
    var min = dt.getMinutes();
    var sec = dt.getSeconds();
    jsonElement.date = month.toString() + date.toString() + hour.toString() + min.toString() + sec.toString(); //取得系統當下時間當作key
    var jsonString = JSON.stringify(jsonElement);  //JSON字串化
    localStorage.setItem(jsonElement.date, jsonString); //以時間為key存入localstorage
    window.location.replace('index.html');
}

function createListViews() {
    var ulListView = document.getElementById('ul-listView');
    var numOfLi = ulListView.getElementsByTagName('li').length + 1;
    var canvasHTML;
    clearListViews('ul-listView');
    for (var key in localStorage) {
        var createLi = document.createElement('li');
        createLi.id = key.toString();
        var createA1 = document.createElement('a');
        canvasHTML = 'canvas.html?key=' + key;
        createA1.href = canvasHTML;
        createA1.id = 'href' + key;
        //createA1.onclick = 'init()'; //無效
        var createH = document.createElement('h3');
        var titleText = document.createTextNode(JSON.parse(localStorage.getItem(key)).msg);
        createH.appendChild(titleText);
        var createA2 = document.createElement('a');
        createA2.href = '#';
        createA1.appendChild(createH);
        createLi.appendChild(createA1);  
        createLi.appendChild(createA2);
        ulListView.appendChild(createLi);

        document.getElementById('href' + key).addEventListener('click',
            function () {
                window.location.replace(canvasHTML);    
            },
            false);
    }
    $("#page1").page();
    $('#ul-listView').listview('refresh');  //更新jquery變動
}

function clearListViews(ulId) {  //清空ListView裡的li
    var ulListView = document.getElementById(ulId);
    for (var key in localStorage) {
        var rmLi = document.getElementById(key);
        if(rmLi != null)
            ulListView.removeChild(rmLi);
    }
    
}
 