/**
 * Created by Administrator on 2017/8/18 0018.
 */
$(function () {

    //页面刷新-----------------------------------------------------------
    $(document).on("pageAnimationEnd", ".page", function () {
        location.reload();
    })

    //个人信息---------------------------------------------------------------

    $("#p-info-go").on("click", function () {
        $.router.load("change-name.html");
    });

    //修改昵称-------------------------------------------------------------

    $(document).on("click", "#c-name-back", function () {
        $.router.back();
    });

    var change_name = document.querySelector("#change_name");
    var user = JSON.parse(sessionStorage.getItem("user"));
    var allUser = JSON.parse(localStorage.getItem("allUser"));
    if (change_name != null) {
        $("#input_name").get(0).select();
        $("#input_name").val(user.nickname);
        $(".sure-button").css("backgroundColor", "#329465");
        $(document).on('keyup', function () {
            if ($("#input_name").val() == "" || $("#input_name").val() == null) {
                $(".sure-button").css("backgroundColor", "#6C6C6A");
            } else {
                $(".sure-button").css("backgroundColor", "#329465");
            }
        });

        var regEX = /^\d{1,10}$/;
        var regEX1 = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
        $(document).on("click", ".sure-button", function () {
            var inputValue = strim($("#input_name").val());
            if (inputValue === "") {
                $(".warning").html("");
                $(".warning").html("输入不能为空 !").css("color", "red");
            } else if (regEX.test(inputValue)) {
                $(".warning").html("");
                $(".warning").html("输入不能纯数字 !").css("color", "red");
            } else if (inputValue.length > 10) {
                $(".warning").html("");
                $(".warning").html("昵称不能超过10个字 !").css("color", "red");
            } else {
                $(".warning").html("");
                $.confirm('确定修改？',
                    function () {
                        var username = user.user;
                        for (var i = 0; i < allUser.length; i++) {
                            if (username == allUser[i].user) {
                                allUser[i].nickname = inputValue;
                                user.nickname = inputValue;
                                sessionStorage.setItem("user", JSON.stringify(user));
                                localStorage.setItem("allUser", JSON.stringify(allUser));
                            }
                        }
                        $.toast("修改成功");
                        setTimeout(function () {
                            $.router.back();
                        }, 2000);
                    }
                );
                $(".modal-button").html("取消");
                $(".modal-button-bold").html("确定");
            }
            $("#input_name").get(0).focus();
        })
    }


    function strim(str) {
        return str.replace(/^\s+|\s+$/g, "");
    }

    //收藏页面----------------------------------------------------------

    itcast.iScroll({
        swipeDom: document.querySelector(".collect-content"),
        swipeType: 'y',
        swipeDistance: 100
    })

    //-------------------------------------------------------
    $(document).on('click', '.confirm-o-cancel', function () {
        $(this).parent().addClass("index")

        $(this).parent().siblings().removeClass("index")

        $(".collect-ul>.index .icon-fanhui-size").css("color", "#ea8c97")


        $.confirm('确定删除 ？',
            function () {
                $.toast("删除成功")
            }
        );
        $(".modal-button").html("取消");
        $(".modal-button-bold").html("确定");

        $(document).on("click", ".modal-button-bold ", function () {
            $(".collect-ul>.index").remove()
        })
        $(document).on("click", ".modal-button ", function () {
            $(".collect-ul>.index .icon-fanhui-size").css("color", "#d0d0d0")
        })

    })

    //退出登录
    $(document).on('click', '#logout_btn', function () {
        $.confirm('确定退出登录?',
            function () {
                sessionStorage.removeItem("user");
                localStorage.removeItem("myaddressInfo");
                localStorage.removeItem("cartdata");
                $.toast("退出成功");
                setTimeout(function () {
                    $.router.load("index.html");
                }, 2000);
            },
            function () {
            }
        );
        $(".modal-button").text("取消");
        $(".modal-button-bold").text("确定");
    });

    //获取当前用户登录昵称
    var person_info = document.querySelector("#person_info");
    if (person_info != null) {
        var user = JSON.parse(sessionStorage.getItem("user"));
        $("#p_nickname").text(user.nickname);
    }


//收藏页面-----------------------------------------------------------


})


//window.onload= function () {
//    var go =document.querySelector("#go");
//    itcast.tap(go,function () {
//        go.href="change-name.html"
//    })
//    var back =document.querySelector("#back");
//    itcast.tap(back,function () {
//        back.href="person-info.html"
//    })
//}