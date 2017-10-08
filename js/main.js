//SUI相关设置

$.config = {
    autoInit: false,
    router: true,
    showPageLoadingIndicator: true,
};


/**
 * 给首页各标签列表下添加商品
 * @param proArr
 * @param appendTo
 */
function addProductsToIndex(proArr, appendTo) {
    for (var i = 0; i < proArr.length; i++) {
        $('<li><a href="javascript:void(0);"><img src="' + proArr[i].proImg + '" alt=""/> </a> <p class="product-info">' + proArr[i].name + '</p><p class="product-price">&yen;' + proArr[i].price.toFixed(1) + '</p> </li>').appendTo(appendTo);
    }
}

/**
 * 给每个商品添加对象
 * @param selector
 * @param proArr
 */
function bindProductToImg(selector, proArr) {
    $(selector).each(function (index, obj) {
        obj.product = proArr[index];
    });
}

var index = document.querySelector("#index");
//判断当前页是否是首页
if (index != null) {
    //动态添加最新上架商品列表
    addProductsToIndex(products, "#index_tab1_items");
    //动态添加最高人气商品列表
    addProductsToIndex(hottestProducts, "#index_tab2_items");
    //动态添加限时折扣商品列表
    addProductsToIndex(discountProducts, "#index_tab3_items");

    //动态绑定给每个商品图片DOM对象对应的商品对象
    bindProductToImg("#index #index_tab1_items li img", products);
    bindProductToImg("#index #index_tab2_items li img", hottestProducts);
    bindProductToImg("#index #index_tab3_items li img", discountProducts);

    //每次点击相应的商品图片就会将localStorage里商品的信息修改
    $(document).on("click", "#index #index_tab1_items li img", function () {
        var proJSonStr = JSON.stringify(this.product);
        localStorage.setItem("product", proJSonStr);
        $.router.load("detail.html");
    });

    $(document).on("click", "#index #index_tab2_items li img", function () {
        var proJSonStr = JSON.stringify(this.product);
        localStorage.setItem("product", proJSonStr);
        $.router.load("detail.html");

    });

    $(document).on("click", "#index #index_tab3_items li img", function () {
        var proJSonStr = JSON.stringify(this.product);
        localStorage.setItem("product", proJSonStr);
        $.router.load("detail.html");
    });

    //判断当前本地存储中是否有所有用户的信息，如果没有，将数据添加到其中
    var allUser = localStorage.getItem("allUser");
    if (!allUser) {
        var tempAllUser = JSON.stringify(userInfo);
        localStorage.setItem("allUser", tempAllUser);
    }

    //判断当前是否已登录(sessionStorage里是否有用户数据)
    var user = sessionStorage.getItem("user");
    if (!user) {
        $("#options").css("display", "none");
        $("#login_btn").css("display", "block");
        $("#user_name").text("未登录");
    } else {
        $("#options").css("display", "flex");
        $("#login_btn").css("display", "none");
        var userObj = JSON.parse(user);
        $("#user_name").text(userObj.nickname);
    }

    var allProducts = JSON.stringify(products);
    if (!localStorage.getItem("allProducts")) {
        localStorage.setItem("allProducts", allProducts);
    }
}


/*var detail = document.querySelector("#detail");
 if (detail != null) {
 var str = localStorage.getItem("product");
 var product = JSON.parse(str);
 $("#pro_name").text(product.name);
 $("#pro_spec").text(product.spec);
 $("#pro_from").text(product.from);
 $("#pro_proNum").text(product.proNum);
 $("#pro_info").text(product.info);
 $("#pro_price").text(product.price.toFixed(1));
 }*/

//页面跳转动画开始前关闭侧边栏
$(document).on("pageAnimationStart", ".page", function () {
    $.closePanel();
});

//页面跳转动画结束以后重新加载页面
$(document).on("pageAnimationEnd", ".page", function () {
    location.reload();
});

//打开左侧边栏
$(document).on("click", ".to-category", function () {
    $.openPanel("#panel-left-demo");
});

//打开右侧边栏
$(document).on("click", ".to-selfcenter", function () {
    $.openPanel("#panel-right-demo");
});

//向右滑动打开左侧边栏
$(document).on("swipeRight", function () {
    $.openPanel("#panel-left-demo");
});

//向左滑动打开右侧边栏
$(document).on("swipeLeft", function () {
    $.openPanel("#panel-right-demo");
});

//左侧边栏跳转至首页
$(document).on("click", ".link-index", function () {
    $.router.load('index.html');
});

//左侧边栏跳转至分类页
$(document).on("click", ".link-category", function () {
    $.router.load('#category');
});

//返回上一页
$(document).on("click", ".goback", function () {
    $.router.back();
});

/*分类页category start*/
$(document).on("click", ".tosort", function () {
    $.router.load("sort.html");
});
/*分类页category end*/

/*订单indent自定义js start*/
var indent = document.querySelector("#indent");
if (indent != null) {
    $(document).on('click', '.indent_page .confirm-ok-cancel', function () {
        if ($("#profile").val() == "") {
            $.toast("请先添加收货地址");
            return false;
        }
        $.confirm('确定提交？',
            function () {
                localStorage.removeItem("cartdata");
                localStorage.removeItem("totalPrice");
                $.toast("提交成功");
                setTimeout(function () {
                    location.assign("index.html");
                }, 2000);
            }
        );
        $(".modal-button").html("取消");
        $(".modal-button-bold").html("确定");
    });

    $(document).on('click', '#add_address', function () {
        $.router.load("site.html");
    });

    var totalPrice = window.localStorage.getItem("totalPrice");
    $("#totalPrice").val("￥" + totalPrice);

    var result = window.localStorage.getItem("myaddressInfo");
    if (result) {
        var resultObj = JSON.parse(result);
        $("#profile").val(resultObj["address"]);
    }
    var time = document.querySelector("#indent_time");

    function CurentTime() {
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分

        var clock = year + "-";

        if (month < 10)
            clock += "0";

        clock += month + "-";

        if (day < 10)
            clock += "0";

        clock += day + " ";

        if (hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm;
        return clock;
    }

    time.value = CurentTime();
    var Number = document.querySelector("#indent_number");
    var Num = "";
    for (var i = 0; i < 15; i++) {
        Num += Math.ceil(Math.random() * 10);
    }
    Number.value = Num;
}
/*订单indent自定义js end*/

/*地址site自定义js start*/
var site = document.querySelector("#site");
if (site != null) {
    var nameReg = /^[\u4e00-\u9fa5]{0,4}$/;
    var mobileReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    var codeReg = /[1-9]\d{5}(?!\d)/;
    var emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    $(document).on('click', '.site_page .confirm-ok-cancel', function () {
        if (!nameReg.test($("#site_name").val()) || $("#site_name").val() == "") {
            $("#site_name").get(0).select();
            $.toast("请填写正确的姓名");
            return false;
        } else if (!mobileReg.test($("#site_mobile").val()) || $("#site_mobile").val() == "") {
            $("#site_mobile").get(0).select();
            $.toast("请填写正确的手机号");
            return false;
        } else if (!codeReg.test($("#site_zonecode").val()) || $("#site_zonecode").val() == "") {
            $("#site_zonecode").get(0).select();
            $.toast("请填写正确的邮编");
            return false;
        } else if (!emailReg.test($("#site_email").val()) || $("#site_email").val() == "") {
            $("#site_email").get(0).select();
            $.toast("请填写正确的E-mail地址");
            return false;
        } else if ($("#site_address").val() == "") {
            $("#site_address").get(0).select();
            $.toast("请填写详细地址信息");
            return false;
        }
        $.confirm('确定保存？',
            function () {
                $.toast("保存成功");
                var addressInfo = {
                    name: $("#site_name").val(),
                    mobile: $("#site_mobile").val(),
                    zonecode: $("#site_zonecode").val(),
                    email: $("#site_email").val(),
                    address: $("#site_address").val(),
                }
                var addressInfoStr = JSON.stringify(addressInfo);
                window.localStorage.setItem("myaddressInfo", addressInfoStr);

                setTimeout(function () {
                    $.router.back();
                }, 2000);
            }
        );
        $(".modal-button").html("取消");
        $(".modal-button-bold").html("确定");
    });
    result = window.localStorage.getItem("myaddressInfo");
    if (result) {
        resultObj = JSON.parse(result);
        $("#site_name").val(resultObj["name"]);
        $("#site_mobile").val(resultObj["mobile"]);
        $("#site_zonecode").val(resultObj["zonecode"]);
        $("#site_email").val(resultObj["email"]);
        $("#site_address").val(resultObj["address"]);
    }
}


/*地址site自定义js end*/

/*搜索search自定义js start*/
$(document).on('click', '#gosearch', function () {
    var keyword = $.trim($("#search").val());
    if (keyword == "") {
        $.toast("请输入搜索关键字");
        $("#search").get(0).focus();
        return false;
    }
    var searchResult = [];
    for (var i = 0; i < products.length; i++) {
        var pName = products[i].name;
        var flag = pName.indexOf(keyword);
        if (flag != -1) {
            searchResult.push(products[i]);
        }
    }
    if (searchResult.length == 0) {
        $.toast("搜索无结果");
        $("#search").get(0).focus();
    } else {
        localStorage.setItem("searchResult", JSON.stringify(searchResult));
        $.router.load('search_result.html');
    }
});

$(document).on('click', '.gosearch', function () {
    $("#cate_name").text($(this).text());
    //$.router.load('search_result.html');
});

$(document).on('click', '.godetails', function () {
    $.router.load('sort.html');
});

$(".dahai-dj").on('click', function () {
    $(".xiala-box").toggleClass("xiala-box02");
});

$(".dahai-joincat").on('click', function () {
    window.location.href = 'cat.html';
    window.localStorage.setItem("mydata", "Hello");
});

//搜索结果页，获取当前的商品搜索结果，并为每个结果绑定对应的商品对象
var search_result = document.querySelector("#search_result");
if (search_result != null) {
    var searchR = JSON.parse(localStorage.getItem("searchResult"));
    if (searchR != null) {
        for (var i = 0; i < searchR.length; i++) {
            $('<div class="list-block media-list dahai-list-block"><ul><li><a href="javascript:void(0)" class="item-link item-content"> <div class="item-media"><img src="' + searchR[i].proImg + '" style="width: 4rem;"></div><div class="item-inner"><div class="item-title-row"> <div class="item-title dahai-item-title">' + searchR[i].name + '</div> </div> <div class="item-subtitle">' + searchR[i].info + '</div> <p class="dahai-p"> <span>总价:&yen; <span>' + searchR[i].price.toFixed(1) + '</span></span></p></div> </a> </li> </ul> </div>').appendTo("#result_list");
        }

        $(".list-block").each(function (index, dom) {
            dom.product = searchR[index];
        });

        $(document).on("click", ".list-block", function () {
            localStorage.setItem("product", JSON.stringify(this.product));
            $.router.load("detail.html");
        })
    }

}

/*搜索search自定义js end*/

/*登录login 以及 注册register 忘记密码forget 自定义js start*/
var login = document.querySelector("#login");
if (login != null) {    //判断登录界面是否加载成功
    var o = {};    // 创建对象  用于存储用户输入的信息
    $("#user").get(0).focus();
    $(document).on('click', '#loginBtn', function () {
        var flag = false;   //是否登录成功的标志
        var username = $("#user").val();
        var password = $("#code").val();
        var allUser = JSON.parse(localStorage.getItem("allUser"));
        //循环 用于模拟数据和用书输入的数据左匹配 匹配成功把数据存在本地 便于主页用
        for (var i = 0; i < allUser.length; i++) {
            if (username == allUser[i].user && password == allUser[i].password) {
                flag = true;
                o = allUser[i];
                var str = JSON.stringify(o);
                sessionStorage.setItem("user", str);
                break;
            }
        }
        //登录成功后跳转到主页  否则提示用户输入错误
        if (flag) {
            $.toast("登陆成功");
            setTimeout(function () {
                $.router.load("index.html");
            }, 2000);
        } else {
            $.toast("用户名或密码填写错误，请确认");
        }
    });
}


var register = document.querySelector("#register");
var regExmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
var regExName = /^[a-zA-Z][a-zA-Z0-9]{2,20}$/;
var regExCode = /^\w+$/;
if (register != null) {   //判断是否进入界面
    $("#user").get(0).focus();
    var p = false;
    //挨个判断用户输入的是否正确
    /*$("#user").blur(function () {
     if (!regExName.test(this.value)) {
     p = false;
     $(this).val("");
     } else {
     p = true;
     }
     });
     $("#mail").blur(function () {
     if (!regExmail.test(this.value)) {
     $(this).val("");
     p = false;
     } else {
     p = true;
     }
     });
     $("#password").blur(function () {
     if (!regExCode.test(this.value)) {
     $(this).val("");
     p = false;
     } else {
     p = true;
     }
     });
     $("#confirm").blur(function () {
     if ($("#password").val() === $("#confirm").val()) {
     p = true;
     } else {
     $(this).val("");
     p = false;
     }
     });*/
    $(document).on('click', '.confirm-ok-cancel', function () {
            if ($("#user").val() == "") {
                $("#user").get(0).select();
                $.toast("请输入用户名");
                return false;
            } else if ($("#user").val().length < 6) {
                $("#user").get(0).select();
                $.toast("用户名过短");
                return false;
            } else if (!regExmail.test($("#mail").val()) || $("#mail").val() == "") {
                $("#mail").get(0).select();
                $.toast("请填写正确的邮箱");
                return false;
            } else if ($("#password").val().length < 8) {
                $("#password").get(0).select();
                $.toast("密码过短");
                return false;
            } else if ($("#password").val() != $("#confirm").val()) {
                $("#confirm").get(0).select();
                $.toast("两次密码输入不一致");
                return false;
            }
            if (($("#user").val() && $("#mail").val() && $("#password").val() && $("#confirm").val()) !== "") {
                p = true;
                //将用户注册的信息保存在一对象中
                var obj = {
                    user: $("#user").val(),
                    mail: $("#mail").val(),
                    password: $("#password").val(),
                    nickname: "gww" + Math.floor(Math.random() * 1000)
                };
                //将对象强转成字符串
                var str = JSON.stringify(obj);
                var allUser = JSON.parse(localStorage.getItem("allUser"));
                allUser.push(obj);
                localStorage.setItem("allUser", JSON.stringify(allUser));
                //将数据保存在sessionStorage中
                sessionStorage.setItem("user", str);
                $.toast("注册成功");
                //因为sui框架中 $.router.load("XX")  会有两秒的延迟时间  利用着两秒后跳转页面
                setTimeout(function () {
                    $.router.load("index.html");
                }, 2000);
            }
            else {
                $.toast("信息填写错误，请检查");
            }
        }
    );
}
/*登录login 以及 注册register 忘记密码forget 自定义js end*/

/**
 * 设置轮播图相关参数
 */
function setSwiper() {
    $(".swiper-container").swiper({
        loop: true,
        loopAdditionalSlides: 1,
        autoplay: 2500,
        autoplayDisableOnInteraction: false,
        pagination: '.swiper-pagination',
    });
}
setSwiper();
