function load() {
    //底部导航栏
    var allSpan = document.getElementById("all");
    var activeSpan = document.getElementById("active");
    var completedSpan = document.getElementById("completed");
    var clear = document.getElementById("clear");
    var activeCount = 0;
    var completedCount = 0;
    if (!localStorage.hasOwnProperty("type")) {
        localStorage.setItem("type", "completed");
    }
    createElement(localStorage.getItem("type"));
    clickListener();
    var input = document.getElementById("inputContents");
  
    input.addEventListener('keydown', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13 && input.value != "") {
            var data = loadData();
            var completed = { "title": input.value, "done": false };
            data.unshift(completed);
            saveData(data);
            createElement(localStorage.getItem("type"));
        }
    });


    //生成列表
    function createElement(type) {
        document.getElementById("inputContents").value = "";
        var img1=document.querySelector('.image+label')
        var divContent=document.querySelector('.divContent')
        var inputContents = document.querySelector('.inputContents')
        let ulContent = document.getElementById("ulContent");
        ulContent.innerHTML = "";
        var collection = localStorage.getItem("all");
        if (collection != null) {
            img1.style.display="block"
         divContent.style.display="block"
         inputContents.style.marginLeft ="0"
            var data = JSON.parse(collection);
            let allCount = 0;
            activeCount = 0;
            completedCount = 0;
            switch (type) {
                case "all":
                    allSpan.style.border = "1px solid rgba(175, 47, 47, 0.2)";
                    activeSpan.style.border = "none";
                    completedSpan.style.border = "none";
                    for (let i = 0; i < data.length; i++) {
                        listContent = document.createElement("div");
                        listContent.className = "listContent";
                        let checkboxContent = document.createElement("input");
                        checkboxContent.setAttribute("type", "checkbox");
                        checkboxContent.className = "checkboxContent";
                        checkboxContent.id = "checkboxContent";

                        // 背景图片代替checkbox自身样式
                        let label = document.createElement("label");
                        label.setAttribute("for", "checkboxContent");
                        label.className = "labelImg";

                        let spanContent = document.createElement("textarea");
                        spanContent.className = "spanContent";
                        spanContent.value = data[i].title;
                        spanContent.readOnly = true;
                        spanContent.style.outline = "none";
                        spanContent.style.height = "auto";

                        let img = document.createElement("img");
                        img.className = "deleteImg";
                        img.setAttribute("src", "image/delete.png");
                        //监听删除事件
                        img.addEventListener("click", function () {
                            remove(i);
                        });
                        if (data[i].done == true) {
                            checkboxContent.checked = true;
                            label.style.backgroundImage = "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')"
                            spanContent.style.textDecoration = "line-through";
                            spanContent.style.color = "#d9d9d9";
                            completedCount++;
                            document.getElementById("clear").style.display = "block";
                        }
                        else {
                            checkboxContent.checked = false;
                            label.style.backgroundImage = "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')"
                            spanContent.style.textDecoration = "none";
                            spanContent.style.color = "black";
                            activeCount++;
                        }

                        //监听鼠标双击事件
                        spanContent.addEventListener("dblclick", function () {
                            // alert("editContentReturn = " + editContent(spanContent, i));
                            spanContent.readOnly = false;
                            editContent(spanContent, i);
                        });

                        //监听checkbox选中事件
                        checkboxContent.addEventListener("change", function () {
                            checkboxChange(checkboxContent, spanContent, i, label);
                        });
                        listContent.appendChild(checkboxContent);
                        listContent.appendChild(spanContent);
                        listContent.appendChild(img);
                        //背景图片代替checkbox自身样式
                        listContent.appendChild(label);

                        //鼠标移入
                        listContent.addEventListener("mouseover", function () {
                            img.style.display = "block";
                        });

                        //鼠标移出
                        listContent.addEventListener("mouseout", function () {
                            img.style.display = "none";
                        });
                        ulContent.appendChild(listContent);
                        allCount++;
                    }
                    if (activeCount == 0 || activeCount == 1) {
                        document.getElementById("labelSpan").innerText = "item left";
                    }
                    else {
                        document.getElementById("labelSpan").innerText = "items left";
                    }

                    break;

                case "active":
                    //底部导航栏
                    activeSpan.style.border = "1px solid rgba(175, 47, 47, 0.2)";
                    allSpan.style.border = "none";
                    completedSpan.style.border = "none";

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].done == true) {
                            document.getElementById("clear").style.display = "block";
                        }
                        if (data[i].done == false) {
                            activeCount++;
                            listContent = document.createElement("div");
                            listContent.className = "listContent";
                            let checkboxContent = document.createElement("input");
                            checkboxContent.setAttribute("type", "checkbox");
                            checkboxContent.className = "checkboxContent";

                            // 背景图片代替checkbox自身样式
                            let label = document.createElement("label");
                            label.setAttribute("for", "checkboxContent");
                            label.className = "labelImg";

                            let spanContent = document.createElement("textarea");
                            spanContent.className = "spanContent";
                            spanContent.value = data[i].title;
                            spanContent.readOnly = true;
                            spanContent.className = "spanContent";
                            spanContent.innerText = data[i].title;
                            spanContent.style.outline = "none";

                            let img = document.createElement("img");
                            img.className = "deleteImg";
                            img.setAttribute("src", "image/delete.png");
                            //监听删除事件
                            img.addEventListener("click", function () {
                                remove(i);
                            });
                            //监听checkbox选中事件
                            checkboxContent.addEventListener("change", function () {
                                activeAndCompletedChange(checkboxContent, spanContent, i, "active", label);
                            });

                            //监听鼠标双击事件
                            spanContent.addEventListener("dblclick", function () {
                                spanContent.readOnly = false;
                                editContent(spanContent, i);
                            })

                            //鼠标移入
                            listContent.addEventListener("mouseover", function () {
                                img.style.display = "block";
                            });

                            //鼠标移出
                            listContent.addEventListener("mouseout", function () {
                                img.style.display = "none";
                            });
                            listContent.appendChild(label);

                            listContent.appendChild(checkboxContent);
                            listContent.appendChild(spanContent);
                            listContent.appendChild(img);
                            ulContent.appendChild(listContent);
                        }
                    }
                    if (activeCount == 0 || activeCount == 1) {
                        document.getElementById("labelSpan").innerText = "item left";
                    }
                    else {
                        document.getElementById("labelSpan").innerText = "items left";
                    }
                    break;

                case "completed":

                    //底部导航栏
                    completedSpan.style.border = "1px solid rgba(175, 47, 47, 0.2)";
                    allSpan.style.border = "none";
                    activeSpan.style.border = "none";

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].done == false) {
                            activeCount++;
                        }

                        if (data[i].done == true) {
                            document.getElementById("clear").style.display = "block";
                            completedCount++;
                            listContent = document.createElement("div");
                            listContent.className = "listContent";
                            let checkboxContent = document.createElement("input");
                            checkboxContent.setAttribute("type", "checkbox");
                            checkboxContent.className = "checkboxContent";

                            // 背景图片代替checkbox自身样式
                            let label = document.createElement("label");
                            label.setAttribute("for", "checkboxContent");
                            label.className = "labelImg";

                            let spanContent = document.createElement("textarea");
                            spanContent.className = "spanContent";
                            spanContent.value = data[i].title;
                            spanContent.readOnly = true;
                            spanContent.style.outline = "none";
                            let img = document.createElement("img");
                            img.className = "deleteImg";
                            img.setAttribute("src", "image/delete.png");
                            //监听删除事件
                            img.addEventListener("click", function () {
                                remove(i);
                            });
                            checkboxContent.checked = true;
                            label.style.backgroundImage = "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')";
                            spanContent.style.textDecoration = "line-through";
                            spanContent.style.color = "#d9d9d9";
                            //监听checkbox选中事件
                            checkboxContent.addEventListener("change", function () {
                                activeAndCompletedChange(checkboxContent, spanContent, i, "completed", label);
                            });

                            //监听鼠标双击事件
                            spanContent.addEventListener("dblclick", function () {
                                spanContent.readOnly = false;
                                editContent(spanContent, i);
                            })

                            //鼠标移入
                            listContent.addEventListener("mouseover", function () {
                                img.style.display = "block";
                            });

                            //鼠标移出
                            listContent.addEventListener("mouseout", function () {
                                img.style.display = "none";
                            });
                            listContent.appendChild(label);

                            listContent.appendChild(checkboxContent);
                            listContent.appendChild(spanContent);
                            listContent.appendChild(img);
                            ulContent.appendChild(listContent);
                        }
                    }
                    if (activeCount == 0 || activeCount == 1) {
                        document.getElementById("labelSpan").innerText = "item left";
                    }
                    else {
                        document.getElementById("labelSpan").innerText = "items left";
                    }
                    break;
                default:
                    break;
            }
            document.getElementById("number").innerText = activeCount;
        }else{
         img1.style.display="none"
         divContent.style.display="none"
        }

    }
    //删除列表项数据
    function remove(i) {
        var data = loadData();
        var todo = data.splice(i, 1)[0];
        saveData(data);
        window.location.reload();
    }

    //创建存储数据的数组
    function loadData() {
        var collection = localStorage.getItem("all");
        if (collection != null) {
            return JSON.parse(collection);
        }
        else return [];
    }

    //保存数据
    function saveData(data) {
        localStorage.setItem("all", JSON.stringify(data));
    }

    //checkbox改变事件
    function checkboxChange(check, span, j, label) {
        if (check.checked) {
            label.style.backgroundImage = "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')";
            span.style.textDecoration = "line-through";
            span.style.color = "#d9d9d9";
            //将存储数据中的done设为true
            updata(j, true);
            activeCount--;
            completedCount++;
            document.getElementById("number").innerText = activeCount;
            //has completed task , show clear span
            document.getElementById("clear").style.display = "block";
            if (activeCount == 0 || activeCount == 1) {
                document.getElementById("labelSpan").innerText = "item left";
            }
            else {
                document.getElementById("labelSpan").innerText = "items left";
            }
        }
        else {
            label.style.backgroundImage = "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')";
            span.style.textDecoration = "none";
            span.style.color = "black";
            updata(j, false);
            activeCount++;
            completedCount--;
            document.getElementById("number").innerText = activeCount;
            if (completedCount == 0) {
                document.getElementById("clear").style.display = "none";
            }
            if (activeCount == 0 || activeCount == 1) {
                document.getElementById("labelSpan").innerText = "item left";
            }
            else {
                document.getElementById("labelSpan").innerText = "items left";
            }
        }
    }

    //active and completed checkbox
    function activeAndCompletedChange(check, span, j, type, label) {
        if (check.checked) {
            label.style.backgroundImage = "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E')";
            span.style.textDecoration = "line-through";
            span.style.color = "#d9d9d9";
            //将存储数据中的done设为true
            updata(j, true);
            activeCount--;
            completedCount++;
            document.getElementById("number").innerText = activeCount;
            createElement(type);
            document.getElementById("clear").style.display = "block";
            if (activeCount == 0 || activeCount == 1) {
                document.getElementById("labelSpan").innerText = "item left";
            }
            else {
                document.getElementById("labelSpan").innerText = "items left";
            }
        }
        else {
            label.style.backgroundImage = "url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E')";
            span.style.textDecoration = "none";
            span.style.color = "black";
            updata(j, false);
            activeCount++;
            completedCount--;
            document.getElementById("number").innerText = activeCount;
            createElement(type);
            if (completedCount == 0) {
                document.getElementById("clear").style.display = "none";
            }
            if (activeCount == 0 || activeCount == 1) {
                document.getElementById("labelSpan").innerText = "item left";
            }
            else {
                document.getElementById("labelSpan").innerText = "items left";
            }
        }
    }

    //更新数据
    function updata(j, flag) {
        var data = loadData();
        data[j].done = flag;
        saveData(data);
    }

    //点击监听事件
    function clickListener() {
        allSpan.addEventListener("click", function () {
            allSpan.style.border = "1px solid #FFD39B";
            activeSpan.style.border = "none";
            completedSpan.style.border = "none";
            localStorage.setItem("type", "all");
            createElement(localStorage.getItem("type"));
        });
        activeSpan.addEventListener("click", function () {
            allSpan.style.border = "none";
            activeSpan.style.border = "1px solid #FFD39B";
            completedSpan.style.border = "none";
            localStorage.setItem("type", "active");
            createElement(localStorage.getItem("type"));
        });

        completedSpan.addEventListener("click", function () {
            allSpan.style.border = "none";
            activeSpan.style.border = "none";
            completedSpan.style.border = "1px solid #FFD39B";
            localStorage.setItem("type", "completed");
            createElement(localStorage.getItem("type"));
        });

        clear.addEventListener("click", function () {
            deleteComplete();
        });

        //选择所有列表项
        let img = document.getElementById("image");
        let imgs = document.querySelector(".image+label");
        img.addEventListener("change", function () {
            let data = loadData();
            if (activeCount == 0) {
                img.checked = false;
            }
            else {
                img.checked = true;
            }
            if (data.length > 0) {
                if (img.checked) {
                    imgs.style.backgroundImage='url("image/down_black.png")'
                    for (let i = data.length - 1; i >= 0; i--) {
                        data[i].done = true;
                    }
                    saveData(data);
                    createElement(localStorage.getItem("type"));
                    document.getElementById("clear").style.display = "block";
                    document.getElementById("labelSpan").innerText = "item left";
                }
                else {
                    imgs.style.backgroundImage='url("image/down_gray.png")'
                    for (let i = data.length - 1; i >= 0; i--) {
                        data[i].done = false;
                    }
                    saveData(data);
                    createElement(localStorage.getItem("type"));
                    document.getElementById("clear").style.display = "none";
                    document.getElementById("labelSpan").innerText = "items left";
                }
            }
        });
    }

    //删除已完成任务,倒序遍历，避免删除出错
    function deleteComplete() {
        let deleteData = loadData();
        for (let i = deleteData.length - 1; i >= 0; i--) {
            if (deleteData[i].done == true) {
                deleteData.splice(i, 1)[0];
            }
        }
        saveData(deleteData);
        window.location.reload();
    }

    function editContent(spanContent, i) {
        spanContent.style.outline = "#949494 solid 1px"
        let title = spanContent.value;
        spanContent.setSelectionRange(0, spanContent.value.length);
        spanContent.focus();
        spanContent.onblur = function () {
            if (spanContent.value.length == 0) {
                let data = loadData();
                let todo = data.splice(i, 1)[0];
                saveData(data);
                window.location.reload();
            }
            else {
                updateSpan(i, spanContent.value);
                spanContent.readOnly = true;
                spanContent.style.outline = "none";
            }
        }
        //回车键和失去焦点均可更新标题
        spanContent.addEventListener('keydown', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) {
            if (spanContent.value.length == 0) {
                let data = loadData();
                let todo = data.splice(i, 1)[0];
                saveData(data);
                window.location.reload();
            }
            else {
                updateSpan(i, spanContent.value);
                spanContent.readOnly = true;
                spanContent.style.outline = "none";
            }
        }
    });
    }
    //更新标题
    function updateSpan(i, value) {
        let data = loadData();
        data[i].title = value;
        saveData(data);
    }
}