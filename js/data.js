/**
 * Created by Lee on 2017/08/23.
 */
/**
 * 产品构造函数
 * @param name 产品名
 * @param price 价格
 * @param spec 规格
 * @param from 产地
 * @param proNum 产品编号
 * @param info 产品简介
 * @param proImg 产品图片
 * @constructor
 */
function Product(name, price, spec, from, proNum, info, proImg) {
    this.name = name;
    this.price = price;
    this.spec = spec;
    this.from = from;
    this.proNum = proNum;
    this.info = info;
    this.proImg = proImg;
}

//全部商品对象数组
var products = [
    new Product("良一蚕豆瓣500g", 30.0, "500g", "江苏", "41368", "美味蚕豆瓣", "images/index_products/p_01.png"),
    new Product("雪花杏包仁", 45.0, "200g", "浙江", "23633", "酸甜可口", "images/index_products/p_02.png"),
    new Product("良一瓜子仁500g", 20.0, "500g", "江苏", "48752", "美味瓜子仁", "images/index_products/p_03.png"),
    new Product("宏香记香辣烧烤牛肉棒", 37.0, "400g", "安徽", "75852", "香辣美味", "images/index_products/p_04.png"),
    new Product("开心果自然开口", 40.0, "280g", "江苏", "74223", "自然开口很好剥", "images/index_products/p_05.png"),
    new Product("良一葵瓜子", 20.5, "300g", "江苏", "74236", "美味瓜子", "images/index_products/p_06.png"),
    new Product("开口核桃", 50, "300g", "上海", "45224", "果仁易取", "images/index_products/p_07.png"),
    new Product("多味果脯", 42, "300g", "广东", "72624", "多种水果", "images/index_products/p_08.png"),
];

//最热商品对象数组
var hottestProducts = [
    products[2],
    products[3],
    products[1],
    products[0]
];

//折扣商品对象数组
var discountProducts = [
    products[4],
    products[5],
    products[6]
];

var sliderProducts = [
    products[7],
    products[0],
    products[1],
];

/**
 * 用户对象构造函数
 * @param name
 * @param password
 * @param nickname
 * @constructor
 */
function User(username, password, nickname) {
    this.username = username;
    this.password = password;
    this.nickname = nickname;
}


var userInfo = [
    {user: "csf2017", mail: "csf2017@qq.com", password: "123456", nickname: "ChengSF"},
    {user: "cc2017", mail: "cc2017@163.com", password: "123456", nickname: "ChengC"},
    {user: "cyq2017", mail: "cyq2017@sina.cn", password: "123456", nickname: "ChenYQ"},
    {user: "lyk2017", mail: "lyk2017@360.com", password: "123456", nickname: "LiYK"},
    {user: "lg2017", mail: "lg2017@360.com", password: "123456", nickname: "LiuG"},
    {user: "yc2017", mail: "yc2017@qq.com", password: "123456", nickname: "YuC"},
    {user: "ky2017", mail: "ky2017@qq.com", password: "123456", nickname: "KangY"},
];






