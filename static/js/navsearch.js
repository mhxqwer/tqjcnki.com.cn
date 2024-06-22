function addfavorite(title, url) {
    try {
        title = title ? title : '知网空间-全球领先的数字图书馆！';
        url = url ? url : (('https:' == document.location.protocol) ? ' https://' : ' http://') + 'www.cnki.com.cn';
        if (document.all) {
            window.external.addFavorite(url, title);
        }
        else if (window.sidebar) {
            window.sidebar.addPanel(title, url, title);
        }
        else {
            alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
        }
    } catch (e) {
        alert('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
}
function change_color(zc) {
    try {
        if (zc != "") {
            document.getElementById(zc).style.cssText = "font-size:14px;text-decoration:none; color:#F00; font-weight:bold;";
            return;
        }
    } catch (e) {

    }
    try {
        if (location.href.toLowerCase().indexOf("www.cnki.com.cn") > 0) {
            document.getElementById("header_cjfd").className = "navon";
        }
        else if (location.href.toLowerCase().indexOf("cdmd") > 0) {
            document.getElementById("header_cdmd").className = "navon";

        }
        else if (location.href.toLowerCase().indexOf("cpfd") > 0) {
            document.getElementById("header_cpfd").className = "navon";

        }
        else {
            document.getElementById("header_cjfd").className = "navon";
        }
    } catch (e) {

    }
}
function indexSearch() {
    var kw = document.getElementById('txt_word').value.replace(/^\s*|\s*$/g, "");
    if (kw == '输入关键词' || kw == '') {
        alert("请输入关键词");//window.open('//search.cnki.com.cn/')
    }
    else {
        window.open('//search.cnki.com.cn/Search/Result?theme=' + escape(kw));
    }
}
function magazineSearch() {
    var kw = document.getElementById('txt_word').value.replace(/^\s*|\s*$/g, "");

    if (kw == '' || kw == '输入关键词') {
        window.open('//search.cnki.com.cn/SearchMagazine.aspx');
    }
    else {
        window.open('//search.cnki.com.cn/SearchMagazine.aspx?q=' + escape(kw));
    }
}
function YuanJianSearch() {
    var kw = document.getElementById('txt_word').value.replace(/^\s*|\s*$/g, "");
    if (kw == '输入关键词' || kw == '') {
        alert("请输入关键词");//window.open('//search.cnki.com.cn/')
    }
    else {
       // window.open('//search.cnki.com.cn/Search/Result?theme=' + escape(kw));
	var form = document.createElement("form");
        form.style.display = "none";
        document.body.appendChild(form);

        form.action = '//search.cnki.com.cn/Search/Result';
        form.method = "GET";

        var contentInput = document.createElement("input");
        contentInput.type = "hidden";
        contentInput.name = "content";
        contentInput.value = kw;
        form.appendChild(contentInput);

        form.submit();
    }
}
function aiRead() {
    var kw = document.getElementById('txt_word').value.replace(/^\s*|\s*$/g, "");
    if(kw=="请输入关键词"){
      kw="";
    }
    $("#question").val(kw);
    $("#aiform").submit();
}
