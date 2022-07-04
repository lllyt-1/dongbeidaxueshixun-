/**
 * Created by Amy on 2018/8/9.
 */
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    var oTable = new TableInit();
    oTable.Init();
});

//回车事件
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        getUserList();
    }
});

$('#userManager').on("keydown", function (event) {
    var keyCode = event.keyCode || event.which;
    if (keyCode == "13") {
        //console.log("1111")
        event.preventDefault();
    }
});

function getUserList() {
    $("#userTable").bootstrapTable('refresh');
}

function TableInit() {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#userTable').bootstrapTable({
            url: httpRequestUrl + '/excleUser/queryListPage',         //请求后台的URL（*）
            method: 'POST',                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortOrder: "asc",                   //排序方式
            queryParamsType: '',
            dataType: 'json',
            paginationShowPageGo: true,
            showJumpto: true,
            pageNumber: 1, //初始化加载第一页，默认第一页
            queryParams: queryParams,//请求服务器时所传的参数
            sidePagination: 'server',//指定服务器端分页
            pageSize: 10,//单页记录数
            pageList: [10, 20, 30, 40],//分页步进值
            search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            silent: true,
            showRefresh: false,                  //是否显示刷新按钮
            showToggle: false,
            minimumCountColumns: 2,             //最少允许的列数
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列

            columns: [{
                checkbox: true,
                visible: false
            }, {
                field: 'id',
                title: '序号',
                align: 'center',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
                {
                    field: 'studentNumber',
                    title: '学号/师号',
                    align: 'center',
                },
                {
                    field: 'roleType',
                    title: '用户类型',
                    align: 'center',
                },
                {
                    field: 'name',
                    title: '名称',
                    align: 'center',
                },
                {
                    field: 'academy',
                    title: '所属院校',
                    align: 'center',
                },
                {
                    field: 'major',
                    title: '专业',
                    align: 'center',
                },

                {
                    field: 'classGrade',
                    title: '班级',
                    align: 'center',
                },
                {
                    field: 'sex',
                    title: '性别',
                    align: 'center',
                },

                {
                    field: 'wechat',
                    title: '微信号',
                    align: 'center',
                },
                {
                    field: 'qq',
                    title: 'qq号',
                    align: 'center',
                },
                {
                    field: 'mobile',
                    title: '手机号',
                    align: 'center',
                },
                {
                    field: 'mailbox',
                    title: '电子邮箱',
                    align: 'center',
                },

                {
                    field: 'createTime',
                    title: '创建时间',
                    align: 'center',
                },

                {
                    field: 'operation',
                    title: '操作',
                    align: 'center',
                    events: operateEvents,//给按钮注册事件
                    formatter: addFunctionAlty//表格中增加按钮
                }],
            responseHandler: function (res) {
                //console.log(res);
                if (res.code == "666") {
                    //var userInfo = res.data;
                    var userInfo = res.data.list;
                    var NewData = [];
                    if (userInfo.length) {
                        for (var i = 0; i < userInfo.length; i++) {
                            var dataNewObj = {
                                'id': '',
                                "roleType": '',
                                'studentNumber': '',
                                "name": '',
                                'academy': '',
                                'major': '',
                                'classGrade': '',
                                'sex': '',
                                'wechat': '',
                                'qq': '',
                                'mobile': '',
                                'mailbox': '',
                                'createTime': ''
                            };
                            dataNewObj.id = userInfo[i].id;
                            dataNewObj.roleType = userInfo[i].roleType;
                            dataNewObj.studentNumber = userInfo[i].studentNumber;
                            dataNewObj.name = userInfo[i].name;
                            dataNewObj.academy = userInfo[i].academy;
                            dataNewObj.major = userInfo[i].major;
                            dataNewObj.classGrade = userInfo[i].classGrade;
                            dataNewObj.sex = userInfo[i].sex;
                            dataNewObj.wechat = userInfo[i].wechat;
                            dataNewObj.qq = userInfo[i].qq;
                            dataNewObj.mobile = userInfo[i].mobile;
                            dataNewObj.mailbox = userInfo[i].mailbox;
                            dataNewObj.createTime = userInfo[i].createTime;
                            NewData.push(dataNewObj);
                        }
                    }
                    var data = {
                        total: res.data.totalCount,
                        rows: NewData
                    };

                    return data;
                }

            }

        });
    };

    // 得到查询的参数
    function queryParams(params) {
        var studentNumber = $("#keyWord").val();
        //console.log(userName);
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            page: params.pageNumber,
            limit: params.pageSize,
            studentNumber: studentNumber
        };
        return JSON.stringify(temp);
    }

    return oTableInit;
}


window.operateEvents = {
    //编辑
    'click #btn_count': function (e, value, row, index) {
        id = row.id;
        $.cookie('questionId', id);
    }
};


// 表格中按钮
function addFunctionAlty(value, row, index) {
    var btnText = '';

    btnText += "<button type=\"button\" id=\"btn_look\" onclick=\"editUserPage(" + "'" + row.id + "')\" class=\"btn btn-default-g ajax-link\">编辑</button>&nbsp;&nbsp;";

    return btnText;
}

//重置密码
function resetPassword(id) {
    alert("重置密码")

}

// 打开创建用户页
function openCreateUserPage(id, value) {

}

function editUserPage(id) {
    window.location.href = 'creatExcelUser.html?userId=' + id;

}

// 修改用户状态（禁用、开启）
function changeStatus(index) {

    alert("修改用户状态")
}

//删除用户
function deleteUser(id) {

    alert("删除用户")
}
