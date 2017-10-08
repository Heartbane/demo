/**
 * Created by chen on 2017/8/18.
 */

$(".list-block").click(function () {
    $.router.load("detail.html");
});


itcast.iScroll({
    swipeDom: document.querySelector('.content'), /*父容器对象*/
    swipeType: 'y', /*滑动的方向*/
    swipeDistance: 100/*缓冲的距离*/
});
