#

# 网页链接
## https://xianyu1orang.github.io/TCM-tools/
# 方剂范围
## 本方范围取自中国大陆中医药院校的教科书，其中方歌部分经本人改编

# 文档说明
## html为最终可执行文件，style为css修饰，script为可执行代码，data为剔除本体代码需载入的方剂内容
## 当你想要添加自己的方歌时可以参考以下规则
### function processString(inputString) {
###    const punctuationMap = {
###        '.': '。', ',': '，', '?': '？', '!': '！', ';': '；'
###    };// 添加其他标点符号映射
###
###    const regex = /[.,?!;]/g; // 根据需要添加其他标点符号
###    inputString = inputString.replace(regex, match => punctuationMap[match] || match);
###    inputString = inputString.replace(/([，。；])(?!<br>)/g, "$1<br>");
###    return inputString;
### }
### 以上正则表达式的意思是首先将英文符号转化为中文，继而为每一个符号添加换行


