// 诚英招聘

// 招聘类别切换
function toggleCollapse(event, targetId,linkElement) {
    event.preventDefault(); // 阻止事件的默认行为

    var targetCollapse = document.getElementById(targetId); // 获取ID
    if (targetCollapse) {
        var isExpanded = targetCollapse.classList.contains('show'); // 检查是否包含show

        // 关闭其他已展开的折叠内容
        var accordion = document.getElementById('accordionExample'); // 获取ID
        var collapseElements = document.getElementsByClassName('collapse'); // 获取Class
        for (var i = 0; i < collapseElements.length; i++) {
            if (collapseElements[i].id !== targetId) {
                collapseElements[i].classList.remove('show'); 
            }
        }

        if (!isExpanded) {
            // 展开目标折叠内容
            targetCollapse.classList.add('show');
        }

        // 移除所有链接的高亮样式
        var allLinks = document.querySelectorAll('#accordionExample a');
        for (var j = 0; j < allLinks.length; j++) {
            allLinks[j].classList.remove('highlight');
        }

        // 添加当前点击链接的高亮样式
        linkElement.classList.add('highlight');

        
    }


}
