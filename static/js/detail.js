$(function () {
    fnErWeiMaBottom();
    $(".mobile-link").mouseout(function () {
        fnErWeiMa("hide");

    }).mouseover(function () {
        fnErWeiMa("show");
    });

});

function fnErWeiMaBottom() {
    var jImgObj = $(".mobile-link .mobile-erweima .erweima-img img").first();
    //var jImgObj = $(".ewm-block .ewm-img-block .ewm-img").first();
    if (jImgObj) {
        if (jImgObj.attr("src")) {
        }
        else {
            var d_token = jImgObj.attr("data-token");
            var d_type = jImgObj.attr("data-type").toLowerCase();
            var d_code = jImgObj.attr("data-code");
            var d_name = jImgObj.attr("data-name");
            //博士硕士
            if (d_type == "cdfd") {
                d_token = "AB001";
            }
            else if (d_type == "cmfd") {
                d_token = "AC001";
            }

            jImgObj.attr("src", "../QrCodeImage.ashx?token=" + d_token + "&Type=" + d_type + "&Code=" + d_code);// + "&Name=" + d_name);
            $(".ewm-block .ewm-img-block .ewm-img").first().attr("src", "../QrCodeImage.ashx?token=" + d_token + "&Type=" + d_type + "&Code=" + d_code);// + "&Name=" + d_name);
        }
    }

}

//控制显示或者隐藏二维码及二维码图片参数及请求显示
function fnErWeiMa(optype) {
    if (optype == "show") {
        $(".mobile-link .mobile-erweima").show();
    }
    else {
        $(".mobile-link .mobile-erweima").hide();
    }
}

function modifyhref(aElement) {
    if (!aElement)
        return;

    var urlPart1 = aElement.href.split('?')[0];
    var params = aElement.href.split('?')[1];
    var code = getValueFromQueryString("code", params);
    var korder = getValueFromQueryString("korder", params);
    var sel = getValueFromQueryString("sel", params);
    var kw = getValueFromQueryString("kw", params);
    try {
        if (kw && kw != "") {
            var decodekw = decodeURI(kw);
            var kwarray = decodekw.split(/[,， ;；：]/); //多分隔符
            var newkw = "";
            var kwcount = 0;
            var i = 0;

            while (i < kwarray.length && kwcount < 2) {
                //console.log(i + " kw=" + kwarray[i]);
                if (kwarray[i]) {
                    newkw += kwarray[i] + " ";
                    kwcount++;
                }
                i++;
            }
            newkw = newkw.replace(/\s+$/gm, '');
            aElement.href = urlPart1 + "?" + "code=" + code + "&korder=" + korder + "&sel=" + sel + "&kw=" +
                encodeURI(newkw);
        }
    } catch (e) {
        //
    }
}

function getValueFromQueryString(name, url) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    if (url) {
        var r = url.match(reg);
        if (r != null) {
            return r[2];
        }
    }

    return null;
}