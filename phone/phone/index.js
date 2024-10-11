

window.onload = function () {
    function main() {
        let yes = document.querySelector(".yes");
        let no = document.querySelector(".no");
        let controller = document.querySelector(".controller"); // 控制器
        let box = document.querySelector(".box");
        let container = document.querySelector(".container");
        let popup = document.querySelector(".popup"); // 弹出层
        let items = document.querySelectorAll(".popup .item");
        let content = document.querySelector(".content");
        let nav = document.querySelector(".nav");
        let albumArea = document.querySelector(".albumArea");
        // let ul = document.querySelector(".albumArea .pics>ul");
        let line = document.querySelector(".box>.line "); // 主屏底部线
        let time = document.querySelector(".time");
        let info = document.querySelector(".info");
        let selectSetup = document.querySelector(".selectSetup"); // 下拉菜单
        let musicArea = document.querySelector(".musicArea");   // 音乐区域
        let cameraArea = document.querySelector(".cameraArea"); // 获取相机页dom
        let desktop = document.querySelector(".Desktop_slide_area");
        // 计算器
        let calculator = document.querySelector(".calculator");
        let item_calculator = document.querySelector(".item_calculator");

        let slideP = document.querySelectorAll(".panel .num_line .slide>p");
        let slide = document.querySelector(".panel .num_line .slide");
        let td = document.querySelectorAll(".digitalArea table tr td");

        let picNum = 26;  // 图库图片数量
        
        // 取消浏览器默认的点击事件
        document.addEventListener("mousedown", (e) => {
            e.preventDefault();
        }, false);

        function moveObj() {  // 控制器移动函数 
            let f = false;
            let RBoundary = container.offsetWidth - controller.offsetWidth;
            let BBoundary = container.offsetHeight - controller.offsetHeight;

            controller.addEventListener("mousedown", function (e) {
                controller.style.transition = "";
                controller.style.backgroundColor = "rgba(34, 41, 56,.9)";
                f = true;
                let x = e.offsetX;
                let y = e.offsetY;
                document.addEventListener("mousemove", function (e) {
                    let mX = e.clientX - box.offsetLeft - controller.offsetWidth / 2;
                    let mY = e.clientY - box.offsetTop - controller.offsetHeight / 2;
                    if (f) {
                        controller.style.left = mX + "px";
                        controller.style.top = mY + "px"
                        if (controller.style.left < 0 + "px") {
                            controller.style.left = 0 + "px";
                        } else if (controller.offsetLeft + controller.offsetWidth > container.offsetWidth) {
                            controller.style.left = RBoundary + "px";
                        }

                        if (controller.style.top < 0 + "px") {
                            controller.style.top = 0 + "px";
                        } else if (controller.offsetTop + controller.offsetHeight > container.offsetHeight) {
                            controller.style.top = BBoundary + "px";
                        }
                    }
                })
            })
            // 节流   
            // 改变控制器的背景色
            let flag = false;
            function change() {
                if (flag) {
                    return;
                }
                flag = true;
                let timer = setTimeout(() => {
                    flag = false;
                    controller.style.backgroundColor = "rgba(34, 41, 56, 0)";
                }, 1000);
            }

            controller.addEventListener("mouseup", () => {
                f = false;
                change();
                let mid = container.offsetWidth / 2;
                let cMid = controller.offsetWidth / 2;
                let cLeft = controller.offsetLeft;
                // console.log(oLeft);
                controller.style.left = cLeft + cMid < mid ? 0 + "px" : RBoundary + "px";
                controller.style.transition = "left .3s ease-in-out";
                // if (oLeft + cMid < mid) {
                //     controller.style.left = 0 + "px"
                // } else {
                //     controller.style.left = container.offsetWidth - controller.offsetWidth + "px";
                // }
            })
        }
        moveObj();
        controller.addEventListener("dblclick", function () {
            popup.style.display = "block";  // 点击控制器显示弹出层
            items[3].innerHTML = "<div class='controller'></div>";
            this.style.visibility = "hidden";
        })
        // 控制控制器显示遮罩层隐藏
        function showCP() {
            popup.style.display = "none";
            controller.style.visibility = "visible";
        }
        container.addEventListener("click", function () {
            showCP()
        })
        content.addEventListener("click", function () {
            showCP()
        })
        albumArea.addEventListener("click", function () {
            showCP()
        })

        // 充电模块  充电检测
        navigator.getBattery().then(function (battery) {
            // 剩余电量
            // 检测是否在充电
            let powers = battery.level * 100 + "%";
            // battery.addEventListener("levelchange", function () {
            //     console.log("Battery level: " + battery.level * 100 + "%");
            // });
            let powerSpan = document.querySelectorAll(".power span");
            // console.log(powerSpan);
            let img = document.querySelector(".info .power .con>img");
            powerSpan[0].innerHTML = powers;
            powerSpan[1].style.width = powers
            // 是否正在充电，yes-充电
            // let k = battery.charging ? "yes" : "no";
            img.style.opacity = battery.charging ? "1" : "0";

        });

        // 头部功能模块
        function headFun() {
            setInterval(() => {
                let date = new Date();
                let h = date.getHours();
                let m = date.getMinutes();
                h = h < 10 ? "0" + h : h;
                m = m < 10 ? "0" + m : m;
                let T = h + ":" + m;
                time.innerHTML = T;
            }, 300);


            // 下拉菜单栏
            let flag = false;
            info.addEventListener("mousedown", (e) => {
                flag = true;
                selectSetup.style.transition = "";
                box.addEventListener("mousemove", (e) => {

                    let mY = e.clientY - box.offsetTop - selectSetup.offsetHeight;
                    if (flag) {
                        selectSetup.style.top = mY + "px";
                    }
                })
            })
            selectSetup.addEventListener("mouseup", () => {
                flag = false;
                if (selectSetup.offsetTop + selectSetup.offsetHeight > box.offsetHeight / 3) {
                    selectSetup.style.top = 0 + "%";
                    selectSetup.style.transition = "all .3s ease-in-out";
                    line.style.display = "block";
                } else {
                    selectSetup.style.top = -100 + "%";
                    selectSetup.style.transition = "all .3s ease-in-out";
                }
            })

        }
        headFun();

        // 返回主屏幕函数
        function returnMain() {
            popup.style.display = "none";
            content.style.display = "none";
            content.className = "content";
            albumArea.style.display = "none";
            controller.style.visibility = "visible";
            selectSetup.style.top = "-100%";
            musicArea.style.display = "none";
            items[3].innerHTML = "";
            nav.style.display = "";
            cameraArea.style.display = "none";
            calculator.style.display = "none";
        }


        // 弹出层快捷功能
        function maskFun() {
            items[3].addEventListener("click", function () {
                returnMain();
                line.style.display = "none";  // 底部线


            })
            // 移入屏幕底部横线返回主屏
            line.addEventListener("mousemove", () => {
                returnMain();
                setTimeout(() => {
                    line.style.display = "none"
                }, 200);
            })
        }
        maskFun();


        // 桌面滑动区域app函数
        function deskTopFun() {
            // 摄像头
            cameraFun()
            function cameraFun() {
                let item_camera = document.querySelector(".item_camera");
                item_camera.addEventListener("click", () => {
                    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
                        document.querySelector("#video").srcObject = stream;
                    })

                    cameraArea.style.display = "block";
                    line.style.display = "block";

                })
            }

            // 计算器
            function calculatorFun() {
                let plus = document.querySelector(".plus");     // 加
                let minus = document.querySelector(".minus");   // 减
                let ride = document.querySelector(".ride");     // 乘
                let except = document.querySelector(".except")  // 除
                let square = document.querySelector(".square"); // 平方
                let dot = document.querySelector(".dot");
                let draw_surplus = document.querySelector(".draw_surplus") // 取余
                let back_space = document.querySelector(".back_space");  // 退格
                // C 清空
                function clearData() {
                    slideP[0].innerHTML = ""
                    slideP[1].innerHTML = ""
                }
                let s = true;
                // ← 退格
                function backSpace() {
                    // console.log(slideP[0].innerHTML.length);
                    let len1 = slideP[0].innerHTML.length;
                    let len2 = slideP[1].innerHTML.length;
                    if (slideP[1].innerHTML == "") {
                        s = true;
                    }
                    if (s == false) {
                        slideP[1].innerHTML = slideP[1].innerHTML.substr(0, len2 - 1);
                        len2 -= 1;
                        if (len2 == 0) {
                            slide.style.top = slide.offsetTop + 50 + "px";
                            pointerEv(back_space, true);
                        }
                    } else {
                        slideP[0].innerHTML = slideP[0].innerHTML.substr(0, len1 - 1);
                        len1 -= 1;
                    }

                }

                // 启动计算器软件
                item_calculator.addEventListener("click", function () {
                    calculator.style.display = 'block';
                    line.style.display = "block";
                })
                let res = "";

                function pointerEv(obj, sw) {
                    obj.style.pointerEvents = sw ? "none" : "";  // 防止多次点击运算符
                }

                // addSum.style.pointerEvents = k ? "none" : "";

                for (let i = 0; i < td.length; i++) {
                    td[i].addEventListener("click", function () {
                        let flag = false;
                        if (!isNaN(td[i].innerHTML)) {
                            pointerEv(plus, false);
                            pointerEv(minus, false);
                            pointerEv(ride, false);
                            pointerEv(except, false);
                            pointerEv(back_space, false);
                            pointerEv(draw_surplus, false);
                            pointerEv(dot, false);

                            slideP[0].innerHTML += td[i].innerHTML;
                            if (slideP[1].innerHTML != "") {
                                flag = true;
                            }
                        }
                        if (flag) {
                            clearData()
                            slideP[0].innerHTML += td[i].innerHTML;
                            slide.style.top = slide.offsetTop + 50 + "px";
                        }
                        let symbols = td[i].innerHTML;

                        switch (symbols) {
                            case "C":
                                if (slideP[1].innerHTML != "") {
                                    clearData()
                                    slide.style.top = slide.offsetTop + 50 + "px";
                                } else {
                                    slideP[0].innerHTML = ""
                                }
                                break;
                            case "←":
                                backSpace()
                                break;
                            case "+":
                                if (slideP[0].innerHTML != "") {
                                    slideP[0].innerHTML += "+";
                                    pointerEv(plus, true);
                                }
                                break;
                            case "-":
                                if (slideP[0].innerHTML != "") {
                                    slideP[0].innerHTML += "-";
                                    pointerEv(minus, true);
                                }
                                break;
                            case "×":
                                if (slideP[0].innerHTML != "") {
                                    slideP[0].innerHTML += "×";
                                    pointerEv(ride, true);
                                }
                                break;
                            case "÷":
                                if (slideP[0].innerHTML != "") {
                                    slideP[0].innerHTML += "÷";
                                    pointerEv(except, true);
                                }
                                break;
                            case "×<sup>2</sup>":
                                if (slideP[0].innerHTML != "") {
                                    squareFun(res);
                                }
                                break;
                            case "%":
                                if (slideP[0].innerHTML != "") {
                                    // slideP[0].innerHTML += "%";
                                    // pointerEv(draw_surplus, true);
                                    percentage(res)
                                }
                                break;
                            case ".":
                                if (slideP[0].innerHTML != "") {
                                    slideP[0].innerHTML += ".";
                                    pointerEv(dot, true);
                                }
                                break;
                            case "=":
                                res = slideP[0].innerHTML;
                                s = false;
                                // 如果没有输入则不执行 sum 函数
                                if (slideP[0].innerHTML != "") {
                                    addition(res);          // 加
                                    subtraction(res);       // 减
                                    multiplication(res);    // 乘
                                    division(res);          // 除
                                    // drawSurplus(res);
                                    // backSpace();
                                    slideP[0].innerHTML = "";
                                    slideP[1].style.fontSize = 40 + "px";
                                    slide.style.top = slide.offsetTop - 50 + "px";
                                }
                        }
                    })

                    // 加法函数
                    function addition(res) {
                        if (res.indexOf("-") == -1 && res.indexOf("×") == -1 && res.indexOf("÷") == -1) {
                            // console.log("加法");
                            // 如果最后一个字符是运算符则舍去
                            let theSum = 0; // 总和
                            res = res[res.length - 1] == "+" ? res.substr(0, res.length - 1) : res;
                            let arrNum = res.split("+");
                            // console.log("arrNum: " + arrNum);
                            // console.log("res: "+ res);
                            for (let i = 0; i < arrNum.length; i++) {
                                // + 将字符串转换为数值
                                let num = parseFloat(arrNum[i]);
                                // console.log(num);
                                // theSum += (num * 10) / 10;
                                theSum += num;

                            }
                            // console.log(theSum);
                            slideP[1].innerHTML = theSum;
                        }
                    }

                    // 减法函数
                    function subtraction(res) {
                        if (res.indexOf("+") == -1 && res.indexOf("×") == -1 && res.indexOf("÷") == -1) {
                            // console.log("减法");
                            res = res[res.length - 1] == "-" ? res.substr(0, res.length - 1) : res;
                            // console.log(res);
                            let arrNum = res.split("-");
                            let theSum = parseFloat(arrNum[0]);
                            // console.log(arrNum);
                            for (let i = 1; i < arrNum.length; i++) {
                                let num = parseFloat(arrNum[i]);
                                theSum -= num;
                            }
                            slideP[1].innerHTML = theSum;
                        }

                    }

                    // 乘法函数
                    function multiplication(res) {
                        if (res.indexOf("+") == -1 && res.indexOf("-") == -1 && res.indexOf("÷") == -1) {
                            // console.log("乘法");
                            res = res[res.length - 1] == "×" ? res.substr(0, res.length - 1) : res;
                            // console.log(res);
                            let arrNum = res.split("×");
                            let theSum = 1;
                            // console.log(arrNum);
                            for (let i = 0; i < arrNum.length; i++) {
                                let num = parseFloat(arrNum[i]);
                                theSum *= num;
                            }
                            slideP[1].innerHTML = theSum;
                        }
                    }

                    // 除法函数
                    function division(res) {
                        if (res.indexOf("+") == -1 && res.indexOf("-") == -1 && res.indexOf("×") == -1) {
                            // console.log("除法");
                            res = res[res.length - 1] == "÷" ? res.substr(0, res.length - 1) : res;
                            // console.log(res);
                            let arrNum = res.split("÷");
                            let theSum = parseFloat(arrNum[0]);
                            // console.log(arrNum);
                            for (let i = 1; i < arrNum.length; i++) {
                                let num = parseFloat(arrNum[i]);
                                console.log(num);
                                theSum /= num;
                            }
                            // toFixed() 将数字转换为字符串，并指定小数点后保留几位，不足用0补齐
                            // console.log(parseFloat(theSum.toFixed(2)));
                            slideP[1].innerHTML = parseFloat(theSum.toFixed(2));
                        }
                    }

                    function percentage(res) {
                        slideP[0].innerHTML = parseFloat(slideP[0].innerHTML) / 100;
                    }

                    // 平方
                    function squareFun(res) {
                        slideP[0].innerHTML = Math.pow(parseFloat(slideP[0].innerHTML), 2);
                    }
                }
            }
            calculatorFun();
        }
        deskTopFun();

        // 导航栏模块函数
        function navFun() {
            // line.style.display = "block"; 非主屏显示，否则不显示
            // 电话
            nav.children[0].addEventListener("click", () => {
                nav.style.display = "none";
                content.style.display = "flex"
                line.style.display = "block";
            })

            // 图库
            picFun();
            function picFun() {
                nav.children[1].addEventListener("click", () => {
                    // ul.innerHTML = "";
                    albumArea.children[0].children[0].innerHTML = ""; // 在下次点击时清空ul列表，重新渲染
                    nav.style.display = "none";
                    albumArea.style.display = "flex";

                    line.style.display = "block";
                    for (let i = 0; i < picNum; i++) {
                        let li = document.createElement("li");
                        albumArea.children[0].children[0].appendChild(li);

                        let lis = document.querySelectorAll("li"); // 获取创建所有的 li
                        let img = document.createElement("img");
                        lis[i].appendChild(img);
                    }
                    // let lis = document.querySelectorAll("li");
                    // for (let i = 0; i < lis.length; i++) {
                    //     let img = document.createElement("img");
                    //     lis[i].appendChild(img);
                    // }
                    let imgs = document.querySelectorAll("ul img");
                    for (let i = 0; i < imgs.length; i++) {
                        imgs[i].src = "../tuku/" + i + ".jpg";
                        imgs[i].addEventListener("click", () => {
                            container.style.background = "url(" + imgs[i].src + ")";
                            container.style.backgroundSize = "cover";
                            container.style.noRepeat = "no-repeat";
                            albumArea.style.display = "none";
                            nav.style.display = "";
                        })
                    }
                })
            }

            // 音乐
            nav.children[2].addEventListener("click", function () {
                musicArea.style.display = "block";
                line.style.display = "block";
            })
        }
        navFun();

        yes.addEventListener("click", function () {
            alert("此功能为开发！");
        })
        no.addEventListener("click", function () {
            alert("此功能为开发！");
        })

    }
    main();


}
