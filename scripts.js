const len = document.getElementById('optionsDropdown').options.length - 1;//有几个选项
var times = 0;
var ranSort = 0;//种类随机
var ranNumber = 0;//数字随机
var ranArray = [];//记录随机数组范围
var lengthArray = 0;//记录选择了几个选项
var times = 0;//记录生成次数
var all = 0;//是否是所有方独选

var memory_sort = [];
var memory_num = [];//记录随机方
var show_times = 0;//显示次数

//初始化重点方
for (i = 0; i < len; i++) {
    array_fang[len - 1][i] = array_fang[ffang[i][0]][ffang[i][1]];
}
for (i = 0; i < len; i++) {
    array_poet[len - 1][i] = array_poet[ffang[i][0]][ffang[i][1]];
}

var optionsDropdown = document.getElementById("optionsDropdown");
// 使用循环遍历 sort 数组并为 select 元素添加 options
for (var i = 0; i < array_sort.length; i++) {
    var option = document.createElement("option");
    option.value = i;  // 设置 option 的 value 从 0 开始
    option.text = array_sort[i];  // 设置 option 的文本内容
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


var resultFangElement = document.getElementById('result_fang');
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
    for (i = 0; i < (fir ? (first[ranSort]) : (array_fang[ranSort].length)); i++) {
        var newOption = document.createElement("option");
        newOption.text = array_fang[ranSort][i];
        // 将新选项添加到菜单
        MenuSort.add(newOption);
    }
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

    document.getElementById("result_fang").innerHTML = "第" + show_times + "首方: <br>" + array_fang[ranSort][ranNumber];
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

    memory_sort[times + 1] = ranSort;
    memory_num[times + 1] = ranNumber;
    times++; show_times = times;
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
    var selectedMenuSort = document.getElementById("MenuSort");

    // 在这里你可以使用 selectedIndex 进行后续操作
    ranSort = memory_sort[selectedMenuHis];
    ranNumber = memory_num[selectedMenuHis];
    show_times = selectedMenuHis;

    addFang();
    selectedMenuSort.selectedIndex = ranNumber;//选定返回选中的方
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

const searchData = array_fang// 添加更多搜索建议;
//const suggestionsContainer = document.getElementById("suggestions");

document.getElementById("searchInput").addEventListener("input", function () {
    const userInput = document.getElementById("searchInput").value.toLowerCase();

    // 获取所有提示词候选
    const allSuggestions = searchData.flat();

    // 过滤出包含用户输入的提示词
    const matchingSuggestions = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(userInput)
    );


    displaySuggestions(matchingSuggestions);
});
document.getElementById("searchInput").addEventListener("click", function () {
    addFang();
    const userInput = document.getElementById("searchInput").value.toLowerCase();

    // 获取所有提示词候选
    const allSuggestions = searchData.flat();

    // 过滤出包含用户输入的提示词
    const matchingSuggestions = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(userInput)
    );
    words(0);
    displaySuggestions(matchingSuggestions);
});

function sInput() {
    for (let i = 0; i < array_fang.length; i++) {
        for (let j = 0; j < array_fang[i].length; j++) {
            // 检查用户输入是否等于数组中的元素
            if (document.getElementById("searchInput").value === array_fang[i][j]) {
                generateFang(j, i); words(1);
                return;  // 如果找到匹配，结束函数
            }
        }
    }
}

function displaySuggestions(suggestions) {
    document.getElementById("suggestions").innerHTML = "";

    if (suggestions.length > 0) {
        for (let i = 0; i < suggestions.length; i++) {
            const suggestionElement = document.createElement("div");
            suggestionElement.textContent = suggestions[i];

            suggestionElement.addEventListener("click", function () {
                // 将点击的建议的文本内容设置为userInput的值
                document.getElementById("searchInput").value = suggestions[i];
                document.getElementById("suggestions").style.display = "none";
                sInput();
            });

            document.getElementById("suggestions").appendChild(suggestionElement);
        }

        document.getElementById("suggestions").style.display = "block";
    } else {
        document.getElementById("suggestions").style.display = "none";
    }
}

// 点击其他地方时隐藏建议框
document.addEventListener("click", function (event) {
    if (event.target !== document.getElementById("searchInput")) {
        document.getElementById("suggestions").style.display = "none";
    }
});

function reschange(ask) {

    var resultFangElement = document.getElementById('result_fang');
    localStorage.setItem('pixel_fang', JSON.stringify(resultFangElement.style.fontSize = (parseFloat(window.getComputedStyle(resultFangElement).fontSize)) + (ask ? (2) : (-2)) + "px"));

    var resultPoetElement = document.getElementById('result_poet');
    localStorage.setItem('pixel_poet', JSON.stringify(resultPoetElement.style.fontSize = (parseFloat(window.getComputedStyle(resultPoetElement).fontSize)) + (ask ? (2) : (-2)) + "px"));

}

function clearInput() {
    document.getElementById('searchInput').value = '';
}
