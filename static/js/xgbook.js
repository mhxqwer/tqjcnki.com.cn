window.xgbook = (function ($) {
    //ua block
    if (navigator.userAgent.toLowerCase().match(/spider/)) {
        return;
    }
    var xgbook = {
        baseurl: '//mall.cnki.net/xinke',
        log: function () {
            try {
                console.log('=====>' + new Date().getTime() + '<=====');
                var len = arguments.length;
                for (var i = 0; i < len; i++) {
                    console.log(arguments[i]);
                }
            } catch (e) {

            }
        },
        testField:"",
        curPageName: "",
        curKeyword:"",
        pageNameList:["kan","detail","baike"],
        getBookData: function(pagename,zjcode, ztcode, keyword) {
            if(typeof pagename =="undefined")
            {
                pagename ="" 
                return;
            }
            if($.inArray(pagename,this.pageNameList)==-1)//返回值： -1：表示数组中不包含元素，>-1,表示返回元素在数组中的下标位置，从0开始。
            {
                this.log("pagename=", pagename, " not in Array:[", this.pageNameList.join(","),"]");
                return;
            }
            this.curPageName = pagename;

            if (typeof zjcode == "undefined") {
                zjcode = "";
            }

            if (typeof ztcode == "undefined") {
                ztcode = "";
            }
            if (typeof keyword == "undefined") {
                keyword = "";
            }
            this.curKeyword = keyword;
            if (zjcode == "" && ztcode == "" && keyword == "")
                return;

            var pageSize = "-3";
            if (this.curPageName == "kan")
            {
                pageSize = "-6";
                keyword = "";
            }
            else if (this.curPageName == "detail")
            {
                pageSize = "-3";
                keyword = "";
            }
            else if (this.curPageName == "baike")
            {
                pageSize = "-3";
            }

            var reqUrl =this.baseurl+ "/Search/SearchBookListAPI?fillOther=1&pageIndex=1&pageSize="+pageSize+"&keyword="
                + encodeURI(keyword) + "&k_zj=" + zjcode + "&k_zt=" + ztcode + "&jsoncallback=?";
            try
            {
                $.getJSON(reqUrl,
                function (data) {
                    try {
                        if (typeof data == "string")
                            data = JSON.parse(data);
                        //xgbook.log(xgbook.curPageName, ";[", xgbook.pageNameList.join(","), "]");
                        //xgbook.log("xgbook.testField:", xgbook.testField);
                        //xgbook.log("this:", this.toString());
                        //xgbook.log("this.testField:", this.testField);
                        switch (xgbook.curPageName) {
                            case xgbook.pageNameList[0]:
                                xgbook.kanRender(data);
                                break;
                            case xgbook.pageNameList[1]:
                                xgbook.detailRender(data);
                                break;
                            case xgbook.pageNameList[2]:
                                xgbook.baikeRender(data);
                                break;
                            default:
                                xgbook.log("jsonp call back this.curPageName=", xgbook.curPageName, " not in Array:[", xgbook.pageNameList.join(","), "]");
                                break;
                        }
                    } catch (e) {
                        xgbook.log("jsonp callback exception:" + e);
                    }
                    //xgbook.log("jsonp callback end");
                });

            } catch (e) {
                xgbook.log(" $.getJSON jsonp exception:" + e);
            }
            
        },
        kanRender: function (bookData) {
            var ulhtml = "";
            var maxCount = bookData.rows.length > 6 ? 6 : bookData.rows.length;
            for (i = 0; i < maxCount; i++) {
                ulhtml += '<li>'

                        + '     <a href="https://mall.cnki.net/Xinke/web/Info/' + bookData.rows[i].sku + '" target="_blank" class="img"><img src="//qiangguo.cnki.net/Mall/Images/Book/Cover/Big/' + bookData.rows[i].sku + '.jpg" width="126" height="178"></a>'
                        + '     <p><a href="https://mall.cnki.net/Xinke/web/Info/' + bookData.rows[i].sku + '" target="_blank" title="' + bookData.rows[i].title + '" >' + subString(bookData.rows[i].title, 22) + '</a></p>'
                        + '</li>';
            }
            var html = ""
                + '<div class="xgbook">'
                + '	<h1>相关图书</h1>'
                + '    <div class="booklist">'
                + '    	<ul class="clearfix">'
                + ulhtml
                + '        </ul>'
                + '    </div>'
                + '</div>';

            $($(".body_div2:first div:first-child")[0]).before(html);
        },
        detailRender: function (bookData) {
            var ulhtml = "";
            var maxCount = bookData.rows.length > 3 ? 3 : bookData.rows.length;
            for (i = 0; i < maxCount; i++) {
                ulhtml += '<li>'

                        + '     <a href="https://mall.cnki.net/Xinke/web/Info/' + bookData.rows[i].sku + '" target="_blank" class="img"><img src="//qiangguo.cnki.net/Mall/Images/Book/Cover/Big/' + bookData.rows[i].sku + '.jpg" width="126" height="178"></a>'
                        + '     <p><a href="https://mall.cnki.net/Xinke/web/Info/' + bookData.rows[i].sku + '" target="_blank" title="' + bookData.rows[i].title + '" >' + subString(bookData.rows[i].title, 18) + '</a></p>'
                        + '</li>';
            }

            var html = '<tr>'
                    + '     <td align="left" height="26" class="ban_list_r"><span class="b15">相关图书</span></td>'
                    + '</tr>'
                    + '<tr>'
                    + '     <td bgcolor="#F4F8FE">'
                    + '   	 <table cellspacing="0" cellpadding="0" width="100%" style="border:1px solid #7498d6;">'
                    + '       	  <tbody>'
                    + '            	 <tr>'
                    + '               	 <td>'
                    + '                   	 <ul class="xgts">'
                    +                            ulhtml
                    + '                       </ul>'
                    + '                   </td>'
                    + '               </tr>'
                    + '            </tbody>'
                    + '       </table>'
                    + '     </td>'
                    + '</tr>';
            $("#simblank").parent().before(html);
        },
        baikeRender: function (bookData) {
            var ulhtml = "";
            var maxCount = bookData.rows.length > 3 ? 3 : bookData.rows.length;
            for (i = 0; i < maxCount; i++) {
                ulhtml += '<li>'

                        + '     <a href="https://mall.cnki.net/Xinke/web/Info/' + bookData.rows[i].sku + '" target="_blank" class="img"><img src="//qiangguo.cnki.net/Mall/Images/Book/Cover/Big/' + bookData.rows[i].sku + '.jpg" width="126" height="178"></a>'
                        + '     <p><a href="https://mall.cnki.net/Xinke/web/Info/' + bookData.rows[i].sku + '" target="_blank" title="' + bookData.rows[i].title + '" >' + subString(bookData.rows[i].title, 22) + '</a></p>'
                        + '</li>';
            }
            var html = ""
            + '<div class="cl"></div>'
            + '<div class="thesis">'
            + '<h2>“ ' + xgbook.curKeyword + '” <span>的相关图书</span></h2>'
            + '<ul class="xgts">'
            + ulhtml
            + '</ul>'
            + '<p class="cl"></p>';
            + '</div>'
            $(".sidepan2 .thesis:last").after(html);
        },
        getWapRemBook: function () {
            var cnki_protocol = ('https:' == document.location.protocol) ? ' https://' : ' http://'
            jQuery.getScript(cnki_protocol+"www.cnki.com.cn/xkb/cnkispace/book/rem.html", function (data, status, jqxhr) {
                if (csBookRem.length > 0) {
                    console.log(csBookRem);
                    let ulhtml = '';
                    for (var i = 0; i < csBookRem.length&&i<2; i++) {
                        ulhtml = ulhtml +'<li class="rightxkbook">'
                            + '<a target="_blank" href="https://mall.cnki.net/Xinke/web/Info/' + csBookRem[i].sku + '" class="clearfix" style="display: block;">'
                            + '<img class="rightxkbook-cover" src="//qiangguo.cnki.net/Mall/Images/Book/Cover/Small/' + csBookRem[i].sku + '.jpg" >'
                            + '<div class="rightxkbook-context">'
                            + '<div class="rightxkbook-title">' + csBookRem[i].title + '</div>'
                            + '<div class="rightxkbook-detail">' + csBookRem[i].BookDes + '</div>'
                            + '</div>'
                            + '</a>'
                            + '</li>';
                    }
                    ulhtml += '<a class="rightxkbook-more" target="_blank" href="https://mall.cnki.net/Xinke/">更多 ></a>';
                    var html = '<tr style="background: #e6f6ff;">     <td align="left" height="26" class="ban_list_r" style="position: relative;"><span class="b15" style="color: #008aff;">精品图书</span></td></tr>'
                        + '<tr>'
                        + '<td bgcolor="#F4F8FE">'
                        + '<table cellspacing="0" cellpadding="0" width="100%" style="background:white">'
                        + '<tbody>'
                        + '<tr>'
                        + '<td>'
                        + '<ul style="padding: 10px 10px 1px 10px;">'
                        + ulhtml
                        + '</ul>'
                        + '</td>'
                        + '</tr>'
                        + '</tbody>'
                        + '</table>'
                        + '</td>'
                        + '</tr>'
                    $("#simblank").parent().before(html);
                }
            });
        },
        detailRenderV2: function (bookData) {
            var ulhtml = "";
            var maxCount = bookData.rows.length > 3 ? 3 : bookData.rows.length;
            for (i = 0; i < maxCount; i++) {
                ulhtml += '<li>'

                    + '     <a href="https://mall.cnki.net/Xinke/web/Info/' + bookData.rows[i].sku + '" target="_blank" class="img"><img src="//qiangguo.cnki.net/Mall/Images/Book/Cover/Big/' + bookData.rows[i].sku + '.jpg" width="126" height="178"></a>'
                    + '     <p><a href="https://mall.cnki.net/Xinke/web/Info/' + bookData.rows[i].sku + '" target="_blank" title="' + bookData.rows[i].title + '" >' + subString(bookData.rows[i].title, 18) + '</a></p>'
                    + '</li>';
            }

            var html = '<tr>'
                + '     <td align="left" height="26" class="ban_list_r"><span class="b15">相关图书</span></td>'
                + '</tr>'
                + '<tr>'
                + '     <td bgcolor="#F4F8FE">'
                + '   	 <table cellspacing="0" cellpadding="0" width="100%" style="border:1px solid #7498d6;">'
                + '       	  <tbody>'
                + '            	 <tr>'
                + '               	 <td>'
                + '                   	 <ul class="xgts">'
                + ulhtml
                + '                       </ul>'
                + '                   </td>'
                + '               </tr>'
                + '            </tbody>'
                + '       </table>'
                + '     </td>'
                + '</tr>';
            $("#simblank").parent().before(html);
        },
    };
    return xgbook;

})(jQuery);


//截取字符，中英文都可以，还可以添加…
function subString(str, len, hasDot) {
    var newLength = 0;
    var newStr = "";
    var chineseRegex = /[^\x00-\xff]/g;
    var singleChar = "";
    var strLength = str.replace(chineseRegex, "**").length;
    for (var i = 0; i < strLength; i++) {
        singleChar = str.charAt(i).toString();
        if (singleChar.match(chineseRegex) != null) {
            newLength += 2;
        }
        else {
            newLength++;
        }
        if (newLength > len) {
            break;
        }
        newStr += singleChar;
    }

    if (hasDot && strLength > len) {
        newStr += "...";
    }
    return newStr;
}
