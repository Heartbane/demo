/**
 * Created by Muggle on 2017/8/23.
 */
jQuery(function () {
    var sum1 = 1;
    var sum2 = 1;
    var sum3 = 1;
    var sum4 = 0;
    jQuery(".lessThan1").click(function () {
        sum1++;
        jQuery(this).siblings("input").val(sum1);
        var a = jQuery(this).parent().siblings(".cat_text").find(".item_qian").html();
        a = parseInt(a);
        sum4+=a;
        jQuery(".cat_total").html(sum+sum4);


    })
    jQuery(".lessThan2").click(function () {
        sum2++;
        jQuery(this).siblings("input").val(sum2);
    })
    jQuery(".lessThan3").click(function () {
        sum3++;
        $(this).siblings("input").val(sum3);
    })
    jQuery(".set").mousedown(function () {
        this.style.background = "#eee";
    })
    jQuery(".pet").mousedown(function () {
        this.style.background = "#464646";
    })
    jQuery(".cat_label").click(function () {
        setTimeout(function () {
            jQuery(".cat_cb").find(":checkbox").prop("checked",jQuery("#cat_cBoxAll").prop("checked"));
            var cked = jQuery("#cat_cBoxAll").prop("checked");
            if(cked){
                jQuery(".cat_cb").addClass("active");
            }else{
                jQuery(".cat_cb").removeClass("active");
            }
            var money = 0;
            var sum = 0;
            $(".cat_cb.active .item_qian").each(function (i,v) {
                var countzs = $(this).parents(".cat_cb").find(".cat_input").val()-0;
                money = ($(v).html()-0);
                sum  = sum + money*countzs;
            })
            jQuery(".cat_total").html(sum);
        },0)
    })
    //jQuery("#cat_cBoxAll").click(function () {
    //    var cked = jQuery(this).prop("checked");
    //    jQuery(".cat_cb").find(":checkbox").prop("checked", cked);
    //})

    var sum = 0;
    jQuery(".cat_cb").click(function (event) {
        if(!jQuery(this).hasClass("active")){
            jQuery(this).addClass("active");
            var a = jQuery(this).find(".item_qian").html();
            var c = jQuery(this).find(".cat_input").val();
            c = parseInt(c);
            a = parseInt(a);
            sum+=a*c;
            jQuery(".cat_total").html(sum);
        }else{
            var a = jQuery(this).find(".item_qian").html();
            var c = jQuery(this).find(".cat_input").val();
            c = parseInt(c);
            a = parseInt(a);
            sum-=a*c;
            jQuery(".cat_total").html(sum);
            jQuery(this).removeClass("active");
        }
        var length1 = jQuery(".cat_cb").length;
        var length2 = jQuery(".cat_cb.active").length;
        //length2 = length2+1;
        if (length1 === length2) {
            jQuery("#cat_cBoxAll").prop("checked", true);
        } else {
            jQuery("#cat_cBoxAll").prop("checked", false);
        }
        //event.stopPropagation();
    })
    //document.onclick = function (e) {
    //    console.log(e.target);
    //}


    //点击删除
    jQuery("#cat_del").click(function(){
        var label =  jQuery(this).parents(".cat_page").children(".native-scroll").find(".active");
        jQuery(label).parent("li").remove("li");
        var total_a = jQuery(".cat_total").html();
        var total_b = jQuery(label).find(".item_qian").text();
        console.log(total_a);
        console.log(total_b);
        total_a = total_a-total_b;
        jQuery(".cat_total").text(total_a);
    })
    //返回上一页
})