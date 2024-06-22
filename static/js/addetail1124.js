lastScrollY = 0;
var arr_id = new Array("left_gg", "right_gg", "right_80x80", "left_80x80");
function heartBeat(arr_id) {
    try {
        var diffY;
        if (document.documentElement && document.documentElement.scrollTop)
            diffY = document.documentElement.scrollTop;
        else if (document.body)
            diffY = document.body.scrollTop
        else
        { /*Netscape stuff*/ }

        percent = .1 * (diffY - lastScrollY);
        if (percent > 0) percent = Math.ceil(percent);
        else percent = Math.floor(percent);

        for (var i = 0; i < arr_id.length; i++) {
            if (document.getElementById(arr_id[i]) != null) {
                document.getElementById(arr_id[i]).style.top = parseInt(document.getElementById(arr_id[i]).style.top) + percent + "px";
            }
        }

        lastScrollY = lastScrollY + percent;
    }
    catch (qq) {

    }
}
window.setInterval("heartBeat(arr_id)", 1);

function closeBanner(div_id) {
    document.getElementById(div_id).style.display = 'none';
    return;
}
function addfavorite(title, url) {
    try {
        title = title ? title : '知网空间-全球领先的数字图书馆！';
        url = url ? url : (('https:' == document.location.protocol) ? ' https://' : ' http://')+ 'www.cnki.com.cn';
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
function detailSearch() {
    var kw = document.getElementById('txt_word').value.trim();
    if (kw == '输入关键词') {
        window.open('//search.cnki.com.cn/Search/Result?theme=' + escape('<xsl:value-of select="$QueryKey1"/><xsl:value-of select="$QueryKey2"/>'));
    }
    else if (kw == '') {
        alert("请输入关键词");//window.open('//search.cnki.com.cn/')
    }
    else {
        window.open('//search.cnki.com.cn/Search/Result?theme=' + escape(document.getElementById('txt_word').value.trim()));
    }
}

function YJSearch() {
    var kw = document.getElementById('txt_word').value.trim();
    if (kw == '输入关键词') {
        window.open('//search.cnki.com.cn/Search/Result?theme=' + escape('<xsl:value-of select="$QueryKey1"/><xsl:value-of select="$QueryKey2"/>'));
    }
    else if (kw == '') {
        window.open('http://yuanjian.cnki.com.cn/');
    }
    else {
        window.open('//search.cnki.com.cn/Search/Result?theme=' + escape(document.getElementById('txt_word').value.trim()));
    }
}


function magazineSearch() {
    var kw = document.getElementById('txt_word').value.trim();
    if (kw == '' || kw == '输入关键词') {
        window.open('//search.cnki.com.cn/SearchMagazine.aspx');
    }
    else {
        window.open('//search.cnki.com.cn/SearchMagazine.aspx?q=' + escape(document.getElementById('txt_word').value.trim()));
    }
}
function change_color() {
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
}
function closetopad() {
    document.getElementById("jpylstopad").style.display = "none";
}


function downArticle(curObj) {
    try {       
        var d_fn = curObj.getAttribute("data-fn");
        var d_dbcode = curObj.getAttribute("data-dbcode");
        var d_year = curObj.getAttribute("data-year");
        var d_dflag = curObj.getAttribute("data-dflag");
        var url ="https://pay.cnki.net/zscsdoc/download?flag=cnkispace&plat=cnkispace&filename=" + d_fn + "&dbytpe=" + d_dbcode + "&year=" + d_year + "&dytpe=" + d_dflag.replace("down","");
        //alert(d_fn+d_dbcode+d_year+d_dflag);
        try {
            if (/MSIE\s*(\d+\.\d+);/.test(navigator.userAgent) || /MSIE(\d+\.\d+);/.test(navigator.userAgent) || navigator.userAgent.indexOf('MSIE')>=0||navigator.userAgent.indexOf('msie')>=0) {
                var referLink = document.createElement('a');
                referLink.href = url;
                document.body.appendChild(referLink);
                referLink.click();
            } else {
                window.location.href = url;
            } 
        } catch (e) {
            window.location.href = url;
        }
        
    } catch (e) {
        alert(e);
    }
}