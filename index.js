//获取元素
var header=document.getElementById('shop');
var buttons=header.getElementsByTagName('a');
var shopList=document.getElementById('shopList');
var data =null;
//请求数据
var xhr = new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange=function () {
    if(xhr.readyState==4 && xhr.status==200){
        data =JSON.parse(xhr.responseText);
    }
};
xhr.send();//将数据进行发送
//3.将数据绑定到页面当中
function bindHtml(data) {
    var str = ``;
    data.forEach(function (item,index) {
        str+=`<li>
                <img src="${item.img}" alt="">
                <p class="title">${item.title}</p>
                <p class="hot">热度：${item.hot}</p>
                <del>￥9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </li>`
    });
    shopList.innerHTML=str;
}
bindHtml(data);
//4.点击按钮实现排序
//先循环数据排序，在绑定页面展示
for (var i = 0; i < buttons.length; i++) {
    buttons[i].index=-1;//自定义属性为-1
    //给每一个按钮添加点击事件
    buttons[i].onclick=function () {
        this.index*=-1;//每次点击的时候让元素身上 自定义属性发生变化
        var value = this.getAttribute('attrName');
        productSort.call(this,value);
        changeArrow.call(this);
        clearArrow.call(this);
    }

}
function productSort(value) {
    //var that=this
    var _this =this;
   /* if(value==='hot') {
        data.sort(function (a, b) {
            return a.hot - b.hot
        })
    }else if (value=='price'){
        data.sort(function (a, b) {
            return a.price - b.price
        })
    }elseif(value==='time'){
    tata.sort(function (a,b) {
    return new Date(a.time)-new Date(b.time)
    })
    */
   if(value==='time'){
       //如果点击的是时间的话，我们需要将时间转化成毫秒数来进行相减
        data.sort(function (a,b) {
            return (new Date(a.time)-new Date(b.time))*_this.index//that.index
        })
    }else {
       //如果不是时间，直接相减
        data.sort(function (a,b) {
            //我们可以再对象后面加一个[变量]
            return (a[value]-b[value])*_this.index//that.index
        })
    }
    bindHtml(data);//将排好序的data显示到页面
}

//5.点击的时候让箭头发生变化
function changeArrow() {
    this.index//1升序 2降序
    var down =this.children[1];
    var up =this.children[0];

    if(this.index<0){
        //根据a标签上的行内自定义属性对应的属性值变换，判断是否为升序还是降序
      // down.className='bg down'
        down.classList.add('bg');
        up.classList.remove('bg');
    }else {
        down.classList.remove('bg');
        up.classList.add('bg');
    }
}
//6.只保留最后点击的按钮，清除其他箭头的颜色
function clearArrow() {
    for (var i = 0; i < buttons.length; i++) {
        //判断当前点击的元素是否是循环的元素
        //如果 循环的三个按钮不是我当前点击的元素时，我将其清除掉bg类名
    if(this!=buttons[i]){
        buttons[i].children[0].classList.remove('bg');
        buttons[i].children[1].classList.remove('bg');
        buttons[i].index=-1;//让index清空，开始都从升序排列

    }

    }
}