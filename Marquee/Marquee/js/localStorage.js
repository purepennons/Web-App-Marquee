function getElement() {
    var jsonElement = new Object;
    jsonElement.background_color //取得背景色
        = document.getElementById('background-color').options[document.getElementById('background-color').selectedIndex].value;
    jsonElement.font_color //取得字體色
        = document.getElementById('font-color').options[document.getElementById('font-color').selectedIndex].value;

    jsonElement.font //取得字體
        = document.getElementById('font').options[document.getElementById('font').selectedIndex].value;
    //check_font_size();
    jsonElement.font_size = document.getElementById('font-size').value; //取得字體大小
    jsonElement.msg = document.getElementById('msg').value; //取得訊息字串
    jsonElement.offset = document.getElementById('offset').value; //取得位移量
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
    //jsonElement.date = new Date();
    var jsonString = JSON.stringify(jsonElement);  //JSON字串化
    localStorage.setItem(jsonElement.date, jsonString); //以時間為key存入localstorage
    //window.location.replace('index.html');
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
        console.log(canvasHTML);
        createA1.href = canvasHTML;
        //createA1.href = 'javascript:' + window.location.replace(canvasHTML);
        createA1.id = 'href1' + key;
        createA1.class = 'href1Class';
        createA1.rel = 'external';
        //createA1.onclick = 'init()'; //無效
        var createH = document.createElement('h3');
        var titleText = document.createTextNode(JSON.parse(localStorage.getItem(key)).msg);
        createH.appendChild(titleText);
        //$("div").data("role") === "page";
        var createA2 = document.createElement('a');
        createA2.href = 'nullPage.html?key=' + key;
        createA2.id = 'href2' + key;
        createA2.class = 'href2Class';
        createA2.rel = 'external';
        createA1.appendChild(createH);
        createLi.appendChild(createA1);  
        createLi.appendChild(createA2);
        ulListView.appendChild(createLi);

        $('#ul-listView').delegate('#href1' + key, 'click', function () { //jquery mobile listview click event - redirect
            window.location.replace($(this).attr("href"));
            return false;
        });

        $('#ul-listView').delegate('#href2' + key, 'click', function () { //jquery mobile secondary listview click event - delete
            window.location.replace($(this).attr("href"));
            //$(this).parent('li').remove();  //立即刪除listView UI
            return false;
        });


        //document.getElementById(key).addEventListener('click',  //會導致註冊到相同event
        //    function () {
        //        //window.location.replace(canvasHTML);
        //        console.log('click: ' + key);
        //        location.assign(canvasHTML);
        //    },
        //    false);

    }
    //$('#ul-listView').delegate('a', 'click', function () { //可一次註冊listview裡全部第一個<a>的event
    //    window.location.replace($(this).attr("href"));
    //    return false;
    //});
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

//function deleteListItem(ulId, liId) {  逐項刪除li透過javascript
//    var ulListView = document.getElementById(ulId);
//    var rmLi = document.getElementById(liId);
//    if (rmLi != null)
//        ulListView.removeChild(rmLi);
//}

function deleteLocalStorage() {
    var keyURL = document.URL;
    keyURL = keyURL.split('?')[1];
    var key = keyURL.split('=')[1];
    console.log(key);
    try{
        localStorage.removeItem(key);
    } catch (e) {
        console.log('Nothing can be removed.');
    }
    window.location.replace('index.html');
}