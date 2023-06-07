var currentPage = 1;

const settingsDir = "./";
const settingsFile = "settings";
const settingsFileSuffix = ".json";

const contentDir = "data/";
const contentFileSuffix = ".json";

var settingsFileUrl = settingsDir + settingsFile + settingsFileSuffix;




// 获取配置后回调
var getSettingsCallbak = function(data) {
    $("title").text(data.title);
    vm.$data.settings = data;
    vm.$data.nav = data.nav;
    vm.$data.name = data.name;
    vm.$data.aboutLink = data.aboutLink;
    vm.$data.users = data.users;
    currentPage = data.newestPageNum;
    getJSON(buildContentFileName(), getContentCallbak);
};

// 获取内容后回调
var getContentCallbak = function(data) {
    var item = {
        page: currentPage,
        data: data
    };
    vm.$data.items.push(item);
    $(".fancybox").fancybox();
    // vm.$data.items.push.apply(vm.$data.items, item)
};

// 构建内容文件名字
var buildContentFileName = function() {
    return contentDir + currentPage + "/" + "data" + contentFileSuffix;
}

// 获取JSON文件工具方法
var getJSON = function(url, callback) {

    var t = Date.parse(new Date()).toString().substr(0, 8);
    $.getJSON(url, {
        "reqTime": t
    },
    function(data, status) {
        console.log(data);
        callback(data);
    }).done(function(d) {}).fail(function(d) {
        next();
    }).always(function(d) {});;

};

const {
    createApp
} = Vue;

const app = createApp({
    data() {
        return {
            items: [],
            settings:{
                topBg:""
            },
            loadmore:true,
            loadbtn:"点击加载更多",
            nav:"",
            name:"",
            aboutLink:"",
            users:{}
        }
    },
    methods: {
        //  formatDate(value, args) {
        //     return format(value, args);
        // },
        load(event) {
            next();
        }
    },
    mounted: function() {
        // const that = this;
        init();
       
    }
});

const vm = app.mount('#app');


function init() {

    // 加载配置文件
    getJSON(settingsFileUrl, getSettingsCallbak);
    
};

function next(){
    if (currentPage <= 1) {
        vm.$data.loadmore = false;
        vm.$data.loadbtn = "已无数据";
        return;
    };
    currentPage -= 1;
    getJSON(buildContentFileName(), getContentCallbak);
    if (currentPage <= 1 ){
        vm.$data.loadmore = false;
        vm.$data.loadbtn = "已无数据";
    }
}


// function format(value,args){
//     var dt = new Date(value*1000);
//                 if(args == 'yyyy-M-d') {// yyyy-M-d
//                 let year = dt.getFullYear();
//                 let month = dt.getMonth() + 1;
//                 let date = dt.getDate();
//                 return `${year}-${month}-${date}`;
//             } else if(args == 'yyyy-M-d H:m:s'){// yyyy-M-d H:m:s
//                 let year = dt.getFullYear();
//                 let month = dt.getMonth() + 1;
//                 let date = dt.getDate();
//                 let hour = dt.getHours();
//                 let minute = dt.getMinutes();
//                 let second = dt.getSeconds();
//                 return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
//             } else if(args == 'yyyy-MM-dd') {// yyyy-MM-dd
//                 let year = dt.getFullYear();
//                 let month = (dt.getMonth() + 1).toString().padStart(2,'0');
//                 let date = dt.getDate().toString().padStart(2,'0');
//                 return `${year}-${month}-${date}`;
//             } else {// yyyy-MM-dd HH:mm:ss
//                 let year = dt.getFullYear();
//                 let month = (dt.getMonth() + 1).toString().padStart(2,'0');
//                 let date = dt.getDate().toString().padStart(2,'0');
//                 let hour = dt.getHours().toString().padStart(2,'0');
//                 let minute = dt.getMinutes().toString().padStart(2,'0');
//                 let second = dt.getSeconds().toString().padStart(2,'0');
//                 return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
//     };
// }
