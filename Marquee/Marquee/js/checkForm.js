function check_font_size() {
    var font_size = document.getElementById('font-size').value;
    var re = /^[0-9]+$/;
    if (font_size == '' || !re.test(font_size)) {
        alert('Font-size cannot be null or Non-numeric.');
    }
}