/**
 * Created by chen on 2017/8/18.
 */

$(".list-block").click(function () {
    $.router.load("detail.html");
});


itcast.iScroll({
    swipeDom: document.querySelector('.content'), /*����������*/
    swipeType: 'y', /*�����ķ���*/
    swipeDistance: 100/*����ľ���*/
});
