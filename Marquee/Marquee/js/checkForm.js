function check_font_size() {
    var font_size = document.getElementById('font-size').value;
    var re = /^[0-9]+$/;
    if (font_size == '' || !re.test(font_size)) {
        alert('Font-size cannot be null or Non-numeric.');
        return false;
    }else {
        return true;
    }
}

function check_null() {
    msg = document.getElementById('msg').value;
    if (msg == '') {
        alert('Message cannot be null.');
        return false;
    } else {
        return true;
    }
}

function checkForm() {
    var fontSizeFlag = check_font_size();
    var checkNullFlag = check_null();
    if (check_font_size() && checkNullFlag) {
        getElement();
        window.location.replace('index.html');
    }
}