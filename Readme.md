# Easy DataTables

## 简介
简化datatables使用方式，通过html自定义属性实现对datatables的配置

## 配置说明
### table配置
|配置项|说明|默认值|
|-----|----|----|
|data-ajaxUrl|获取后台数据的服务器url|无|
|edt-method  |请求方法: POST / GET |POST|
|data-id-filed|主键字段名称         | 无|
|data-defferLoading|是否延迟加载数据：0-延迟加载    | 无|
|data-pageSize|每页记录数      | 10|
|data-pageType|分页组件样式    | simple_numbers|
|data-hideSeq |是否隐藏序号列    | false|
|data-totalFlag|是否开启总计合计功能    | false|
|data-totalUrl |获取总计数据的服务器URL    |无|


### column配置

|配置项|说明|默认值|
|-----|----|----|
|filed|字段名称|无|
|data-hidden  |是否隐藏当前列 |false|
|data-query|是否为查询条件         | false|
|render|数据格式化函数   | |
|data-edt-class|列class      | |
|data-width|列宽    | |
|data-totalFlag |是否为合计、总计字段    | false|
|data-totalRender|总计合计数据格式化函数    ||
|data-totalUrl |获取总计数据的服务器URL    |无|

### 操作列配置


|配置项|说明|默认值|
|-----|----|----|
|data-opt-type|操作按钮类型，opt-操作按钮、toolbar-工具栏按钮||
|data-title  |按钮标题 ||
|data-title-flag|是否展示按钮标题         | false|
|data-title-tips|按钮tip信息   |与按钮标题相同 |
|data-fn|按钮点击事件函数     | |
|data-btn-class|按钮class    | |
|data-btn-icon |按钮图标    | |
|data-exp|按钮展示条件，示例：status#eq#1    ||

### demo
[demo](https://blog.toney.top/easy/datatables/index.html)

![demo](https://blog.toney.top/easy/datatables/demo.png)

html:
```html
<div class="edt-container">
    <table id="employeeTable" class="table table-bordered table-striped edt" data-hideSeq="true"
           data-ajaxUrl="https://blog.toney.top/easy/datatables/data.json" edt-method="GET" data-id-filed="id"
           data-loading="true">
        <thead>
        <tr>
            <th field="id" data-hidden="true"></th>
            <th field="name" data-edt-class="text-center">姓名
            </th>
            <th field="position" data-edt-class="text-center">职位
            </th>
            <th field="office" data-edt-class="text-center">办公地点
            </th>
            <th field="age" data-edt-class="text-center">年龄
            </th>
            <th field="startDate" render="dateFormat" data-edt-class="text-center">入职日期
            </th>
            <th field="salary" render="salaryFormat" data-edt-class="text-center">薪资
            </th>
            <th field="edt-opt" data-hidden="false" data-sortable="false" data-edt-class="text-center"
                data-title="操作">
                    <span class="hide" data-title="详情" data-fn="showDetail"
                          data-btn-icon="glyphicon glyphicon-th-list"
                          data-opt-type="opt" data-btn-class="btn-info"></span>
                <span class="hide" data-title="修改" data-fn="showEdit"
                      data-btn-icon="glyphicon glyphicon-pencil"
                      data-opt-type="opt"
                      data-btn-class="btn-warning"></span>
                <span class="hide" data-title="删除" data-fn="confirmDel"
                      data-btn-icon="glyphicon glyphicon-trash"
                      data-opt-type="opt"
                      data-btn-class="btn-danger"></span>

                <span data-opt-type="toolbar" class="hide" data-title="新增"
                      data-fn="showAdd" data-btn-icon="glyphicon glyphicon-plus"
                      data-btn-class="btn-info"></span>

            </th>
        </tr>
        </thead>
    </table>

</div>
<div class="modal fade " id="employeeModal" data-backdrop="static">
    <div class="modal-dialog  modal-lg " style="z-index:999;">
        <div class="modal-content">
            <form class="form-horizontal" id="employeeForm" action="" role="form"
                  method="post">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal"
                            aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">员工信息</h4>
                </div>

                <div class="modal-body" style="min-height: 0px !important;max-height: 450px;overflow: auto">
                    <div class="form-group">
                        <label class="col-lg-2 col-sm-2 control-label ">姓名</label>
                        <div class="col-lg-10 col-sm-10">
                            <input type="text" class="form-control" name="name" id="name">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-sm-2 control-label ">职位</label>
                        <div class="col-lg-10 col-sm-10">
                            <input type="text" class="form-control" name="position" id="position">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-sm-2 control-label ">办公地点</label>
                        <div class="col-lg-10 col-sm-10">
                            <input type="text" class="form-control" name="office" id="office">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-sm-2 control-label ">年龄</label>
                        <div class="col-lg-10 col-sm-10">
                            <input type="text" class="form-control" name="age" id="age">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-sm-2 control-label ">入职日期</label>
                        <div class="col-lg-10 col-sm-10">
                            <input type="text" class="form-control" name="startDate" id="startDate">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-lg-2 col-sm-2 control-label ">薪资</label>
                        <div class="col-lg-10 col-sm-10">
                            <input type="text" class="form-control" name="salary" id="salary">
                        </div>
                    </div>

                </div>
                <div>
                    <div class="modal-footer">
                        <button type="button" id="saveEmployee"
                                class="btn btn-primary">保存
                        </button>
                        <button type="button" class="btn btn-default"
                                data-dismiss="modal">关闭
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
```

js:
```javascript
    easyDataTables.init("#employeeTable", {
        "employeeTable": {
            "dateFormat": dateFormat,
            "salaryFormat": salaryFormat,
            "showDetail": showDetail,
            "showEdit": showEdit,
            "confirmDel": confirmDel,
            "showAdd": showAdd
        }
    });

    /**
     * 日期格式化
     */
    function dateFormat (data, type, row, meta) {
        return data;
    }

    /**
     * 数字格式化
     */
    function salaryFormat (data, type, row, meta) {
        return "¥ " + data;
    }

    function showDetail (dataId, data) {
        $("#employeeModal").find("#name").val(data.name);
        $("#employeeModal").find("#position").val(data.position);
        $("#employeeModal").find("#office").val(data.office);
        $("#employeeModal").find("#age").val(data.age);
        $("#employeeModal").find("#startDate").val(data.startDate);
        $("#employeeModal").find("#salary").val(data.salary);
        $("#employeeModal").modal("show");
    }

    function confirmDel (dataId, data) {
       var confirm= $.confirm({
            title: '警告',
            content: '确认删除【'+data.name+'】?',
            type: 'green',
            icon: 'glyphicon glyphicon-question-sign',
            buttons: {
                ok: {
                    text: '确认',
                    btnClass: 'btn-primary',
                    action: function () {
                        console.log(username + " deleted. ");
                        confirm.close();
                    }
                },
                cancel: {
                    text: '取消',
                    btnClass: 'btn-primary'
                }
            }
        });
    }

    function showEdit (dataId, data) {
        showDetail(dataId, data);
    }


    function showAdd () {
        $("#employeeModal").find("#name").val("");
        $("#employeeModal").find("#position").val("");
        $("#employeeModal").find("#office").val("");
        $("#employeeModal").find("#age").val("");
        $("#employeeModal").find("#startDate").val("");
        $("#employeeModal").find("#salary").val("");
        $("#employeeModal").modal("show");
    }

```

css:
```css
       .edt-container {
            margin: 50px 0 0 10%;
            width: 80%;
        }

        .edt-container div.row > div {
            text-align: right;
        }

        .edt-container div.row {
            margin-right: 0px;
            margin-left: 0px;
        }

        .edt-container div.row > div {
            text-align: right;
        }

        .edt-container div.row {
            margin-right: 0px;
            margin-left: 0px;
        }

        .dataTables_wrapper .dataTables_paginate .paginate_button.disabled, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:hover, .dataTables_wrapper .dataTables_paginate .paginate_button.disabled:active {
            background-color: #efefef !important;
            border: 1px solid #ccc;
        }

        .dataTables_wrapper .dataTables_paginate .paginate_button {
            border: 1px solid #999;
            margin: 0 0 0 -1px;
        }

        .dataTables_wrapper .dataTables_paginate .paginate_button:hover,
        .dataTables_wrapper .dataTables_paginate .paginate_button:active {
            background: #f1f1f1 !important;
            color: #566cff !important;
            border: 1px solid #999;

        }

        .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
            color: #fff !important;
        }

        .dataTables_wrapper .dataTables_paginate .paginate_button.current {
            color: #ddd !important;
            background: #566cff !important;
        }
```


### FAQ
1. 配置数据列时需要增加一个隐藏列，第一列会出现排序图标