const len = document.getElementById('optionsDropdown').options.length - 1;//有几个选项
var times = 0;
var ranSort = 0;//种类随机
var ranNumber = 0;//数字随机
var ranArray = [];//记录随机数组范围
var lengthArray = 0;//记录选择了几个选项
var times = 0;//记录生成次数
var all = 0;//是否是所有方独选
var treeAll = 0;

var memory_sort = [];
var memory_num = [];//记录随机方
var show_times = 0;//显示次数
var iniID = structure.length;
var swtGenerate = 1;//2為舊版，1為新版
var deltimes = 0;
var getArrayIndex = [];
var src_fang = null;//百科引用链接


//初始化重点方
for (i = 0; i < len; i++) {
    array_fang[len - 1][i] = array_fang[ffang[i][0]][ffang[i][1]];
}
for (i = 0; i < len; i++) {
    array_poet[len - 1][i] = array_poet[ffang[i][0]][ffang[i][1]];
}

//框架構建
for (var i = 0; i < structure.length; i++) {//一级类型注入 structure.length
    listSort.push(JSON.parse('{"title": "' + structure[i].sortname + '", "id": ' + i + ', "children":[],"checked":false}'))

    if (structure[i].property.length == 0) {
        for (var l = 0; l < array_fang[i].length; l++) listSort[i].children.push(JSON.parse('{"title": "' + array_fang[i][l] + '","index":[' + i + "," + l + ']}'))
    }
    else {
        for (var j = 0; j < structure[i].property.length; j++) {//二级类型注入 
            listSort[i].children.push(JSON.parse('{"title": "' + structure[i].property[j] + '", "id": ' + (iniID++) + ', "children":[]}'));
        }
        for (var k = 0; k < array_fang[i].length && i < structure.length - 1; k++) {//三级类型注入 array_fang[i].length
            listSort[i].children[structure[i].sort[k]].children.push(JSON.parse('{"title": "' + array_fang[i][k] + '", "id": ' + (iniID++) + ',"index":[' + i + "," + k + ']}'));
        }
    }
}

var optionsDropdown = document.getElementById("optionsDropdown");
// 使用循环遍历 sort 数组并为 select 元素添加 options
for (var i = 0; i < structure.length; i++) {
    var option = document.createElement("option");
    option.value = i;  // 设置 option 的 value 从 0 开始
    option.text = structure[i].sortname;  // 设置 option 的文本内容
    optionsDropdown.add(option);
}

//注明方剂类型

// 获取复选框元素
var checkboxFir = document.getElementById('myFir');
// 初始化一级方选项
var fir = false;

// 检查本地存储是否有保存的状态
const savedCheckboxState = localStorage.getItem('State');
// 如果有保存的状态，则设置复选框的状态
if (savedCheckboxState) {
    document.getElementById('myFir').checked = savedCheckboxState === 'true';
    fir = JSON.parse(localStorage.getItem('State'));
}
checkboxFir.addEventListener('change', function () {
    // 记录是否为一级方
    fir = this.checked;
    localStorage.setItem('State', JSON.stringify(this.checked));
    addFang();
});

//读取本地方剂类型已选项
ranArray = JSON.parse(localStorage.getItem('ranArr'));
const meSort = document.getElementById("optionsDropdown");
const options = meSort.options; options[0].selected = false;
ranArray.forEach(value => {
    // 设置对应值的选项为选中状态
    const option = meSort.querySelector(`[value="${value}"]`);
    if (option) {
        option.selected = true;
    }
});

var resultFangElement = document.getElementById('result_times');
resultFangElement.style.fontSize = JSON.parse(localStorage.getItem('pixel_fang') ? localStorage.getItem('pixel_fang') : "40px");
resultFangElement = document.getElementById('result_fang');
resultFangElement.style.fontSize = JSON.parse(localStorage.getItem('pixel_fang') ? localStorage.getItem('pixel_fang') : "40px");
var resultPoetElement = document.getElementById('result_poet');
resultPoetElement.style.fontSize = JSON.parse(localStorage.getItem('pixel_poet') ? localStorage.getItem('pixel_poet') : "35px");

function addHis() {//新增历史方歌
    // 获取菜单元素
    var MenuHis = document.getElementById("MenuHis");
    // 创建新选项
    var newOption = document.createElement("option");
    newOption.text = "第" + times + "首" + array_fang[ranSort][ranNumber];
    // 将新选项添加到菜单
    MenuHis.add(newOption);
}

function addFang() {//导入所属目录的方歌
    // 获取菜单元素
    var dynamicMenu = document.getElementById("MenuSort");

    // 创建新选项
    dynamicMenu.innerHTML = '';
    for (i = 0; i < (fir ? (first[ranSort] + 1) : (array_fang[ranSort].length)); i++) {
        var newOption = document.createElement("option");
        newOption.text = array_fang[ranSort][i];
        // 将新选项添加到菜单
        MenuSort.add(newOption);
    }

    document.getElementById("MenuSort").selectedIndex = (ranNumber < first[ranSort] && array_fang[ranSort].length < first[ranSort] - 1) ? 0 : ranNumber;
    //选定返回选中的方
}

function processString(inputString) {
    const punctuationMap = {
        '.': '。', ',': '，', '?': '？', '!': '！', ';': '；'
    };// 添加其他标点符号映射

    const regex = /[.,?!;]/g; // 根据需要添加其他标点符号
    inputString = inputString.replace(regex, match => punctuationMap[match] || match);
    inputString = inputString.replace(/([，。；])(?!<br>)/g, "$1<br>");
    return inputString;
}

// 示例用法

function getSelectedValues() {
    const dropdown = document.getElementById("optionsDropdown");
    const selectedOptions = dropdown.selectedOptions;
    all = (dropdown.options[0].selected == true && selectedOptions.length == 1);
    // 监听菜单选项的变化

    const options = dropdown.options;

    if (selectedOptions.length === 0) {
        ("请选择至少一个选项！");
        return 0; // 阻止进一步的操作
    }

    // 清空数组并将选中的值添加到数组中
    ranArray = [];
    lengthArray = (all) ? (dropdown.options.length - 1) : selectedOptions.length;
    for (let i = 0; i < lengthArray; i++) {
        ranArray.push(all ? dropdown.options[i + 1].value : (dropdown.options[0].selected == true) ? (selectedOptions[i + ((i == lengthArray - 1) ? 0 : 1)].value) : (selectedOptions[i].value));
    }

    return 1;
}

function words(condition) {
    if (!times) return 0;

    document.getElementById("result_times").innerHTML = "第" + show_times + "首方: <br>";
    document.getElementById("result_fang").innerHTML = array_fang[ranSort][ranNumber];
    src_fang = array_fang[ranSort][ranNumber];//百科链接赋值
    var poet = document.getElementById("result_poet");
    if (condition) poet.innerHTML = (!poet.innerHTML) ? ("歌诀：<br>" + processString(array_poet[ranSort][ranNumber]) + ((array_poet[ranSort][ranNumber].charAt(array_poet[ranSort][ranNumber].length - 1) != "。") ? "。" : "")) : ""; else poet.innerHTML = "";
}

function generateFang(innum, insort) {
    if (!getSelectedValues()) return 0;

    var lim_array = [];
    var lim_times = 0;

    for (i = 0; i < lengthArray; i++) {
        for (ii = 0; ii < array_fang[ranArray[i]].length; ii++) {
            lim_array[lim_times] = ranArray[i];
            lim_times++;
        }
    }

    lim_times = Math.floor(Math.random() * lim_array.length);//选的几类方里挑一个，根据方剂数量采用加权平均法
    ranSort = (insort < 0) ? lim_array[lim_times] : insort;
    ranNumber = (innum < 0) ? Math.floor(Math.random() * (fir ? first[ranSort] : array_fang[ranSort].length)) : innum;

    if (swtGenerate == 2) {//新版界面
        var ran = Math.floor(Math.random() * getArrayIndex.length);
        ranSort = getArrayIndex[ran][0];
        ranNumber = getArrayIndex[ran][1];
    }

    memory_sort[times + 1] = ranSort;
    memory_num[times + 1] = ranNumber;
    times++; show_times = times;
    src_fang = array_fang[ranSort][ranNumber];
    addHis(); addFang();

    localStorage.removeItem('ranArr');
    if (!all) localStorage.setItem('ranArr', JSON.stringify(ranArray));

    //菜单返回
    var selectElementA = document.getElementById("MenuSort");
    selectElementA.selectedIndex = ranNumber;
    var selectElementB = document.getElementById("MenuHis");
    selectElementB.selectedIndex = times;

    //初始化禁用历史
    var dis = document.getElementById("MenuHis");
    dis.querySelector('option:first-child').disabled = true;

    showTest(1);
    words(0);
}

function handleHis() {
    // 获取被选中的选项的序列（索引）
    var selectedMenuHis = document.getElementById("MenuHis").selectedIndex;

    // 在这里你可以使用 selectedIndex 进行后续操作
    ranSort = memory_sort[selectedMenuHis];
    ranNumber = memory_num[selectedMenuHis];
    show_times = selectedMenuHis;

    addFang();
    words(0);
}

function handleSort() {
    // 获取被选中的选项的序列（索引）
    var selectedIndex = document.getElementById("MenuSort").selectedIndex;
    // 在这里你可以使用 selectedIndex 进行后续操作
    ranNumber = selectedIndex;
    words(0);
}

function showTest(testAsk) {
    var t = document.getElementById("test");
    var s = ("ranNumber:" + ranNumber + "（随机到的第几个方）<br>ranSort:" + ranSort + "（随机到的第几类方）<br>ranArray:" + ranArray + "（随机范围）<br>lengthArray:" + lengthArray);
    t.innerHTML = (testAsk ? (t.innerHTML ? s : "") : (t.innerHTML ? ("") : s));
}

//初始化搜索框
for (let i = 0; i < array_fang.length; i++) {
    for (let j = 0; j < array_fang[i].length; j++) {
        var newOption = document.createElement("option");
        newOption.text = array_fang[i][j];
        newOption.value = '{"num":' + j.toString() + ',"sort":' + i.toString() + '}';
        // 将新选项添加到菜单
        search.add(newOption);
    }
} layui.use(function () {
    // select 事件
    layui.form.on('select(select-filter)', function (data) {
        let index = JSON.parse(data.value);
        generateFang(index.num, index.sort); words(1);
    });
});

function reschange(ask) {
    var resultFangElement = document.getElementById('result_times');
    localStorage.setItem('pixel_fang', JSON.stringify(resultFangElement.style.fontSize = (parseFloat(window.getComputedStyle(resultFangElement).fontSize)) + (ask ? (2) : (-2)) + "px"));
    var resultFangElement = document.getElementById('result_fang');
    localStorage.setItem('pixel_fang', JSON.stringify(resultFangElement.style.fontSize = (parseFloat(window.getComputedStyle(resultFangElement).fontSize)) + (ask ? (2) : (-2)) + "px"));
    var resultPoetElement = document.getElementById('result_poet');
    localStorage.setItem('pixel_poet', JSON.stringify(resultPoetElement.style.fontSize = (parseFloat(window.getComputedStyle(resultPoetElement).fontSize)) + (ask ? (2) : (-2)) + "px"));
}

function handleSliderChange(value) {
    if (value == 0) document.getElementById("author").style.display = "block";
    else document.getElementById("author").style.display = "none";

    if ((deltimes++) == 2) localStorage.setItem('del', document.getElementById("del").style.display = "none");
}


if (localStorage.getItem('del') == "none") {
    document.getElementById("del").style.display = "none";
    document.getElementById("author").style.display = "none";
}

function switchOn() {
    var swt = document.getElementById("swt");
    var myForm = document.getElementById('myForm');
    var treeBox = document.getElementById('treeBox');

    if (swt.className == "layui-icon layui-icon-next") {
        swt.className = 'layui-icon layui-icon-prev';

        myForm.style.display = 'none';
        treeBox.style.display = 'block';
        swtGenerate = 2;
    } else {
        swt.className = 'layui-icon layui-icon-next';
        myForm.style.display = 'block';
        treeBox.style.display = 'none';
        swtGenerate = 1;
    }

}

try {
    function getArrIndex(tree) {
        var inputString = JSON.stringify(tree.getChecked("treeIt"));
        var patternIndex = /"index":\[(\d+),(\d+)\]/g;
        var patternId = /"id":(\d+)/g;
        getArrayIndex = []

        var match;

        while (match = patternIndex.exec(inputString)) {
            getArrayIndex.push([parseInt(match[1]), parseInt(match[2])]);
        }
        var matches = inputString.match(patternId);

        while ((match = patternId.exec(inputString)) !== null) {
            matches.push(match[1]);
        } alert(matches)
        localStorage.removeItem("ArrayId");
        localStorage.setItem("ArrayId", matches);
    }

    function treeSelected(tree, type, id) {
        if (type == "all") {
            alert()
            if (treeAll == false) { treeAll = true; tree.setChecked("treeIt", [0]) }
            else {
                alert()
                treeAll = false; tree.reload("treeIt", 0)
            }
        }
        else if (type == "section") {

        }
    }



    layui.use(function () {
        var layer = layui.layer;
        var util = layui.util;

        var dropdown = layui.dropdown;
        // 渲染
        dropdown.render({
            elem: '.demo-dropdown-base', // 绑定元素选择器，此处指向 class 可同时绑定多个元素
            data: [{
                title: '中医百科',
                id: "https://zhongyibaike.com/wiki/"
            }, {
                title: '中医方剂网',
                id: "https://www.zhongyifangji.com/home/index/search?searchtype=prescription&searchkeyword="
            }, {
                title: '百度百科',
                id: "https://baike.baidu.com/item/"
            }],
            click: function (obj) {
                layer.open({type: 2,
                    title: obj.title + "的资料查询",
                    shadeClose: true, // 点击遮罩关闭层
                    maxmin: true, //开启最大化最小化按钮
                    area: ['500px', '800px'],
                    content: obj.id + src_fang
              });
            }
        });

        util.on('lay-on', {
            'test-tips-bottom': function () {
                layer.tips("<span style = 'text-align: center;font-Size: 40px;'>" + structure[ranSort].property[structure[ranSort].sort[ranNumber]] + "</span>", this, {
                    tips: 3,
                    area: ['240px', '50px']
                });
            },
            'confirm': function () {
                layer.open({
                    area: ['500px', '350px'],
                    content: `
                    <img src="https://s3.bmp.ovh/imgs/2024/03/05/5ec3351b992cb7fb.jpg" style="width:200px;height:200px">
                        `
                })
            },
            'test-page-custom': function () {
                layer.open({
                    type: 1,
                    area: ['350px', '450px'],
                    resize: false,
                    shadeClose: true,
                    title: '方劑類型選擇',
                    content: `
                        <div style="text-align:center">    
                            <button class="layui-btn layui-btn-primary layui-btn-radius" onclick = "alert(tree.qxChecked('treeIt'));">所有方</button>
                            <button class="layui-btn layui-btn-primary layui-btn-radius" onclick = "alert(localStorage.getItem('ArrayId'));tree.setChecked('treeIt',localStorage.getItem('ArrayId'))">一級方</button>
                        </div>
                        <div id="ID-tree-showCheckbox"  style="font-size:25px"></div>
                        `
                })
                layui.tree.qxChecked = function (id) {
                    var that = thisModule.that[id];
                    return that.qxChecked();
                };
                layui.tree.render({
                    elem: '#ID-tree-showCheckbox',
                    id: "treeIt",
                    data: listSort,
                    onlyIconControl: true,
                    showCheckbox: true,
                    click: function (obj) {
                        var classStr = 'layui-unselect layui-form-checkbox layui-form-checked';
                        //通过 样式名 定位当前节点元素
                        var checkbox = obj.elem.find('.layui-form-checkbox');
                        var classNameStr = checkbox[0].className;		//获取当前节点样式（className）

                        //判断 当前节点样式 是否包含 选中(勾选样式) 并执行 下一步操作
                        if (classNameStr === classStr) {
                            checkbox.removeClass('layui-form-checked');			//删除 勾选样式
                        } else {
                            checkbox.addClass('layui-form-checked');					//添加 勾选样式
                        }
                        getArrIndex(layui.tree)
                    },
                    oncheck: function (obj) {
                        const blob = new Blob([JSON.stringify(structure)], {
                            type: "text/plain",
                        });
                        getArrIndex(layui.tree);

                        // 使用 Clipboard API 將 Blob 對象複製到剪切板
                        //navigator.clipboard.write([new ClipboardItem({ "text/plain": blob })]);
                    }
                    //edit: ['add', 'update'] // 开启节点的右侧操作图标

                });

            }
        })
    });
} catch (err) { alert(err) };
