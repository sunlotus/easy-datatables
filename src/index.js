var loadIndex;
// var console;
if (!window.console) {
    window.console = {
        log: function () {

        }
    };
} else if (!window.console.log) {
    window.console["log"] = function () {

    }
}


if (typeof($.cookie) === "undefined") {
    $.extend({
        cookie: function () {
            return "";
        }
    })
}
if (typeof($.i18n) === "undefined") {
    $.extend({
        i18n: {
            prop: function () {
                return "";
            }
        }
    })
}
loadingUtil = {
    show: function () {
        return 1;
    },
    hide: function (idx) {

    }
}

ajaxutls = {
    ajax: function (settings, resultSetting) {

        var defaultSetting = {
            type: "post",
            dataType: "json",
            async: true,
            traditional: false,
            contentType: "application/x-www-form-urlencoded",
            processData: true
        };
        var layerLoading = null;

        $.extend(defaultSetting, settings);

        var defaultRstSetting = {
            successMsg: "操作成功",
            showSuccessMsg: false,
            successFn: null,
            errorMsg: "操作失败",
            showErrorMsg: true,
            errorFn: null
        };
        $.extend(defaultRstSetting, resultSetting);

        $.ajax({
            url: defaultSetting.url,
            data: defaultSetting.data,
            type: defaultSetting.type,
            async: defaultSetting.async,
            traditional: defaultSetting.traditional,
            dataType: defaultSetting.dataType,
            contentType: defaultSetting.contentType,
            processData: defaultSetting.processData,
            success: function (responseData) {

                var successFn = defaultRstSetting.successFn;
                var successMsg = defaultRstSetting.successMsg;

                if (defaultRstSetting.showSuccessMsg) {
                    alert(successMsg);
                }
                if (successFn != null) {
                    if (typeof(successFn) == "function") {
                        successFn(responseData);
                    } else {
                        console.log(successMsg, responseData);

                    }
                }
            },
            error: function (xhr, statusText, error) {
                if (statusText == "parsererror") {
                    return;
                }
                if (defaultRstSetting.showErrorMsg) {
                    var msg = defaultRstSetting.errorMsg;
                    if (defaultRstSetting.errorFn != null) {
                        if (typeof (defaultRstSetting.errorFn) == "function") {
                            defaultRstSetting.errorFn(xhr, statusText, error);
                        } else {
                            alert(msg);
                        }
                    } else {
                        alert(msg);
                    }
                }
            }
        });
    }
}

//
if (typeof($.fn.dataTable) !== "undefined") {
    $.fn.dataTable.ext.errMode = function (s, h, m) {
        if (h == 1) {
            console.log("连接服务器失败！");
        } else if (h == 7) {
            console.log("返回数据错误！");
        }
    };
}

// 默认配置 配置
var easyDataTables = {

    //配置定义
    cfg: {
        table: {
            tableClass: "edt", //默认class选择器，初始化时如果不指定选择器，则使用该默认选择器
            url: "data-ajaxUrl", // 数据加载url
            method: "edt-method", // 数据请求方法：get / post
            tableId: "id", // tableId
            idFiled: "data-id-filed", //主键字段
            loading: "data-loading", //是否展示loading，默认false （暂不支持）
            deferLoading: "data-defferLoading", // 是否延迟加载
            pageSize: "data-pageSize", //分页大小属性
            pageType: "data-pageType", //分页类型属性
            hideSeq: "data-hideSeq", //是否隐藏序号列属性，默认false
            totalUrl: "data-totalUrl", //获取总计数据的url属性
            totalFlag: "data-totalFlag", //是否开启合计、总计功能
            childrenCallback: 'data-children-callback' //子表格功能，暂不支持
        },
        column: {
            filed: "field", //字段名称
            hideFlag: "data-hidden", // 是否隐藏，默认为false
            sortable: "data-sortable", //是否排序,默认为false
            query: "data-query", // 是否支持查询， 默认为false
            render: "render", //字段render
            i18n: "data-i18n-key", //标题国际化key
            plcI18n: "data-plc-i18nkey", //placeholder 国际化key
            tdClass: "data-edt-class", //td 需要添加的class
            tdWidth: "data-width", //列宽
            totalFlag: "data-totalFlag", //是否为合计总计字段
            totalTitleFlag: "data-totalTitleFlag", //
            totalRender: "data-totalRender", //总计、合计数据格式化函数
            expandFlag: "data-expand-flag",
            expandMethod: "data-expand-fn",
            clickMethod: "data-column-click-fn"
        },
        opt: {
            type: "data-opt-type", // 操作按钮类型：opt--操作按钮；toolbar--工具栏
            title: "data-title", // 按钮标题
            showTitle: "data-title-flag", //按钮标题是否展示
            tips: "data-title-tips", // 按钮提示信息，默认与title相同。如果tips与title不同，请自定义属性，例如：data-tips
            fn: "data-fn", //按钮点击事件函数
            btnClass: "data-btn-class", //按钮class
            icon: "data-btn-icon", // 按钮图标
            i18n: "data-i18n-key", // 标题国际化key
            tipsI18n: "data-i18n-key", //tips国际化key，默认与title相同。如果tips与title不同，请自定义属性,例如：data-tips-i18n
            exp: "data-exp", //按钮展示条件
            expAnd: "data-exp-and" //按钮展示条件2，和上面的条件是and关系
        }
    },
    custCfg: {},
    dataTables: {length: 0}, //api缓存
    tableCfg: {}, //datatable配置缓存
    methods: {}, //函数缓存
    instances: {}, //实例缓存
    idSelectorCache: {}
};

//初始化datatables
easyDataTables.init = function (selector, methods, custCfg) {
    console.log("init")
    var self = this;

    if (!this.instances[selector]) { //TODO 多实例
        this.instances[selector] = {};
    } else {
        $.each(this.instances[selector].dataTables, function (idx, item) {
            delete self.dataTables[tableId];
        });
    }
    this.instances[selector].dataTables = {};
    this.instances[selector].tables = [];
    this.instances[selector].tableCfg = {};
    this.instances[selector].methods = methods;
    // this.custCfg = {};//清空自定义配置
    var tmpCustCfg = {};
    $.extend(tmpCustCfg, this.cfg, custCfg || {});
    this.instances[selector].cfg = tmpCustCfg;

    if (selector || this.tmpCustCfg.table.tableClass) {
        var tables = $(selector || "." + tableClass);
        var instanceTables = this.instances[selector].dataTables;
        if (instanceTables.length > 0) {
            for (var tableId in instanceTables) {
                if (tableId == "length") {
                    continue;
                }
                instanceTables[tableId].destroy();
                delete instanceTables[tableId];
                delete this.idSelectorCache[tableId];
                instanceTables.length--;
            }
        }

        $.each(tables, function (idx, item) {

            var tableId = $(item).attr(tmpCustCfg.table.tableId);
            self.idSelectorCache[tableId] = selector;
            self.instances[selector].tables.push(tableId);
            var dataTables = self.instances[selector].dataTables;
            // self.custCfg[tableId] = tmpCustCfg;
            if (dataTables[tableId]) {
                return true;
            }

            self.instances[selector].tableCfg[tableId] = $(item).clone();
            if (dataTables[tableId]) {
                dataTables[tableId].destroy();
                delete dataTables[tableId];
                dataTables.length--;
            }
            dataTables.length++;
            var config = self.buildConfig($(item));

            var hideSeq = $(item).attr(self.getTabCfg(tableId, self).table.hideSeq) == "true";
            var hasChildren = $(item).attr(self.getTabCfg(tableId, self).table.childrenCallback);
            if (!hideSeq) {
                var thead = $(item).find("thead > tr");
                var seqTh = $("<th field='edt-seq' class=\"\" data-width='21'" +
                    " data-i18n-key=\"edt.common.seq\"></th>");
                var thFirst = thead.find("th:first");
                if (thFirst.attr("data-hidden") == "true") {
                    thFirst.after(seqTh);
                } else {
                    thead.prepend(seqTh);
                }
            }
            if (hasChildren) {
                var thead = $(item).find("thead > tr");
                var childOpCol = $("<th field='edt-children'data-width='21'></th>");
                var thFirst = thead.find("th:first");
                if (thFirst.attr("data-hidden") == "true") {
                    thFirst.after(childOpCol);
                } else {
                    thead.prepend(childOpCol);
                }
            }

            var dataTableApi = $(item).on('error.dt', function (e, settings, techNote, message) {
                console.log('An error has been reported by DataTables: ', message);//异常处理
            }).DataTable(config);
            self.dataTables[tableId] = dataTableApi;
            dataTables[tableId] = dataTableApi;

            $(item).on("chrome-tab.close", function () {
                self.destroyDatatable(tableId, self);
            });
            var childrenCallBack = $(item).attr(tmpCustCfg.table.childrenCallback);
            if (childrenCallBack) {
                $(item).on('click', 'td.edt-details-control > div > span.details-control', function () {
                    var tr = $(this).closest('tr');
                    var row = dataTableApi.row(tr);
                    if (row.child.isShown()) {
                        row.child.hide();
                        $(this).removeClass('fa-plus-square-o').addClass("fa-minus-square-o");
                    } else {
                        row.child(methods[tableId][childrenCallBack](row.data())).show();
                        $(this).removeClass('fa-minus-square-o').addClass("fa-plus-square-o");
                    }
                });
            }

            $(item).on("click", "td.edt-child-expand", function () {
                var tr = $(this).closest('tr');
                var row = dataTableApi.row(tr);
                var expendFn = $(this).attr(tmpCustCfg.column.expandMethod);
                if (row.child.isShown()) {
                    row.child.hide();
                } else {
                    row.child(methods[tableId][expendFn](row.data()), "edt-child-container").show();
                }
            });

            //列点击事件
            $(item).on("click", "td.edt-column-click", function () {
                var tr = $(this).closest('tr');
                var row = dataTableApi.row(tr);
                var expendFn = $(this).attr(tmpCustCfg.column.clickMethod);
                methods[tableId][expendFn](row.data());
            });
            //子表格分页监听
            $(item).on("click", "div.edt-child-pagebtn-container > span", function () {
                var btn = $(this);
                var currentNo = parseInt(btn.closest("div[data-current-pageno]").attr("data-current-pageno") || 1, 10);
                var pages = parseInt(btn.closest("div[data-total-pages]").attr("data-total-pages") || 1, 10);
                if (btn.is(".disabled") || btn.is(".current-page")) {
                    return;
                }

                /**
                 * 计算并展示需要展示的分页按钮
                 * @param btnContainer
                 * @param page
                 * @param pages
                 */
                function calcNeedShowBtns (btnContainer, page, pages) {
                    var preBegin = page - 3;
                    var nextEnd = page + 3;
                    var preMoreFlag = preBegin > 1;
                    var nextMoreFlag = nextEnd < pages;
                    var endOffset = 0;
                    var beforeOffset = 0;
                    if (preMoreFlag) {
                        preBegin = page - 1;
                        btnContainer.find("span[page-no='1']").removeClass("hide");
                        btnContainer.find("span.pre-page-more").removeClass("hide");
                    } else {
                        endOffset = -preBegin + 1;
                        preBegin = 1;
                    }
                    if (nextMoreFlag) {
                        nextEnd = page + 1;
                        btnContainer.find("span[page-no='" + pages + "']").removeClass("hide");
                        btnContainer.find("span.next-page-more").removeClass("hide");
                    } else {
                        beforeOffset = nextEnd - pages;
                        nextEnd = pages;
                    }
                    for (var i = preBegin - beforeOffset; i < nextEnd + 1 + endOffset; i++) {
                        btnContainer.find("span[page-no='" + i + "']").removeClass("hide");
                    }
                }

                function showBtns (btn, page, pages) {
                    var btnContainer = btn.closest("div.edt-child-pagebtn-container");
                    btnContainer.find("span.page-no").addClass("hide").removeClass("current-page");
                    btnContainer.find("span.pre-page-more").addClass("hide");
                    btnContainer.find("span.next-page-more").addClass("hide");
                    btnContainer.find("span[page-no='" + page + "']").removeClass("hide").addClass("current-page");
                    if (page <= 1) {
                        btnContainer.find("span.page-previous").addClass("disabled");
                    } else {
                        btnContainer.find("span.page-previous").removeClass("disabled");
                    }

                    if (page >= pages) {
                        btnContainer.find("span.page-next").addClass("disabled");
                    } else {
                        btnContainer.find("span.page-next").removeClass("disabled");
                    }
                    calcNeedShowBtns(btnContainer, page, pages);
                }

                function showPage (btn, page, pages) {
                    if (isNaN(page)) {
                        console.warn("can not get pageNo", page, pages);
                        return;
                    }
                    page = parseInt(page, 10);
                    var table = btn.closest("div.edt-child-page-container").prev();
                    table.find("tr[data-edt-child-page]").addClass("hide");
                    table.find("tr[data-edt-child-page='" + page + "']").removeClass("hide");
                    table.scrollLeft(0);
                    var pageContainer = btn.closest("div.edt-child-page-container");

                    var pageInfo = pageContainer.find("div.edt-child-page-info");
                    var total = pageContainer.attr("data-total-record");
                    pageContainer.attr("data-current-pageNo", page); //设置当前页
                    pageInfo.text("Showing " + page + " / " + pages + " ( Total " + total + " )");
                    showBtns(btn, page, pages);
                }

                //页码跳转
                if (btn.is(".page-no")) {
                    var page = btn.attr("page-no") || btn.text();
                    showPage(btn, page, pages);
                } else if (btn.is(".page-previous")) { //上一页
                    var page = currentNo - 1;
                    if (page < 1) {
                        page = 1;
                    }
                    showPage(btn, page, pages);
                } else if (btn.is(".page-next")) { //下一页
                    var page = currentNo + 1;
                    if (page > pages) {
                        page = pages;
                    }
                    showPage(btn, page, pages);
                }
            })
        })

    }
};

//获取table配置
easyDataTables.getTabCfg = function (tableId, easyDataTable) {
    var selector = easyDataTable.getSelector(tableId, easyDataTable);
    return easyDataTable.instances[selector].cfg || {};
};

//销毁表格
easyDataTables.destroyDatatable = function (tableId, easyDataTable) {
    var dataTables = easyDataTable.dataTables;
    dataTables[tableId].destroy();
    delete dataTables[tableId];
};

//获取选择器
easyDataTables.getSelector = function (tableId, easyDataTable) {
    return easyDataTable.idSelectorCache[tableId];
};
//获取方法
easyDataTables.getMethods = function (tableId, easyDataTable) {
    var selector = easyDataTable.getSelector(tableId, easyDataTable);
    return easyDataTable.instances[selector].methods[tableId] || {};
};

//构建工具栏
easyDataTables.buildToolbar = function (table) {
    var tableId = table.attr("id");
    var tmpCustCfg = this.getTabCfg(tableId, this);
    var toolbars = this.instances[this.getSelector(tableId, this)].tableCfg[table.attr(tmpCustCfg.table.tableId)].find("th >" +
        " span[data-opt-type='toolbar']");
    var toolbarParent = $("#" + table.attr(tmpCustCfg.table.tableId) + "Toolbar");
    if (toolbars.length) {
        var self = this;
        $.each(toolbars, function (idx, item) {
            var btn = $("<a></a>");
            var tmpCustCfg = self.getTabCfg(tableId, self);
            btn.addClass("btn edt-toolbar-btn btn-sm").addClass($(item).attr(tmpCustCfg.opt.btnClass));
            var icon = $(item).attr(tmpCustCfg.opt.icon);
            if (icon) {
                var iconDom = $("<i></i>");
                iconDom.addClass(icon);
                btn.append(iconDom);
            }
            var title = $(item).attr(tmpCustCfg.opt.title);
            var i18nTitle;
            if (title) {
                var titleDom = $("<span class='edt-i18n'></span>");
                var i18nKey = $(item).attr(tmpCustCfg.opt.i18n);
                var i18nTitle = title;
                if (i18nKey) {
                    titleDom.attr("data-i18n-key", i18nKey);
                    i18nTitle = self.i18nData(i18nKey, title);
                }
                titleDom.text(i18nTitle);
                btn.append(titleDom);
            }
            var tips = $(item).attr(tmpCustCfg.opt.tips);
            if (tips) {
                var i18nKey = $(item).attr(tmpCustCfg.opt.i18n);
                var tipsText = tips;
                if (i18nKey) {
                    tipsText = i18nTitle;
                    btn.addClass("edt-btn-tips");
                    btn.attr("data-i18n-key", i18nKey);
                }
                btn.addClass("ims-i18n-tips");
                btn.attr("title", tipsText);
                btn.attr("data-container", "body");
            }
            var fn = $(item).attr(tmpCustCfg.opt.fn);
            if (fn) {
                btn.on("click", self.getMethods(tableId, self)[fn] || function () {
                    console.log("unbind function")
                });
            }
            toolbarParent.append(btn);
        });

    }

};

//dom配置项
easyDataTables.buildDom = function (table) {

    var tableId = table.attr("id");
    var tmpCustCfg = this.getTabCfg(tableId, this);
    var dom = "<'row'r<'#" + tableId + "Toolbar.col-xs-12'T>><'col-xs-12't><'col-xs-12'<'col-xs-6'i><'col-xs-6'p>>";
    var queryProp = tmpCustCfg.column.query;
    var queryFlag = table.find("thead > tr > th[" + queryProp + "='true']").not("[field='edt-opt']").length > 0;
    if (queryFlag) {
        dom = "<'row'<'#" + tableId + "SearchBar.col-xs-12'>>" + dom;
    }

    return dom;
};

//构建查询输入框
easyDataTables.buildSearchColumn = function (idx, item, tableId) {
    var searchDiv = $("<div class='col-sm-3'></div>");
    var input = $("<input>");
    input.addClass("form-control edt-i18n-placeholder edt-query-condition");
    var tmpCustCfg = this.getTabCfg(tableId, this);

    var plcI18nKey = $(item).attr(tmpCustCfg.column.plcI18n) || $(item).attr(tmpCustCfg.column.i18n);
    var placeHolder = this.i18nData(plcI18nKey, "");
    var filedName = $(item).attr(tmpCustCfg.column.filed);
    input.attr("placeholder", placeHolder || filedName);
    input.attr("id", tableId + "_" + filedName);
    input.attr("name", filedName);
    input.attr("data-i18n-key", plcI18nKey);
    if (idx > 2) {
        searchDiv.addClass('edt-adv-search hide');
    }
    searchDiv.append(input);
    return searchDiv;
};

//获取国际化数据
easyDataTables.i18nData = function (key, defaultVal) {
    var result = defaultVal;
    if (key && typeof($.i18n) != 'undefined') {
        result = $.i18n.prop(key);
    }
    return result;
};


//构建查询栏
easyDataTables.buildSearchBar = function (table) {
    var tableId = table.attr("id");
    var tmpCustCfg = this.getTabCfg(tableId, this);

    var searchBarId = tableId + "SearchBar";

    var searchBar = $("#" + searchBarId);
    searchBar.addClass('edt-search-bar');
    var queryProp = tmpCustCfg.column.query;
    var searchColumns = table.find("thead > tr > th[" + queryProp + "='true']").not("[field='edt-opt']");
    if (searchColumns && searchColumns.length) {
        var self = this;
        $.each(searchColumns, function (idx, item) {
            searchBar.append(self.buildSearchColumn(idx, item, tableId))
        });
        var searchBtnDiv = $('<div class="col-sm-3"></div>');

        var searchBtn = $("<a class='btn btn-default btn-sm edt-query-btn'></a>");
        searchBtn.attr("id", tableId + "SearchBtn");
        var queryIcon = $("<i class='glyphicon glyphicon-search'></i>");
        var queryBtnText = $("<span class='edt-i18n' data-i18n-key='edt.common.query'></span>");
        queryBtnText.text(self.i18nData(queryBtnText.attr("data-i18n-key"), "查询"));
        searchBtn.append(queryIcon).append(queryBtnText);
        searchBtn.click(function () {
            (self.dataTables[tableId] || {
                draw: function () {
                    console.log("can not find datatable api.")
                }
            }).draw();
        });
        if (searchColumns.length > 3) {
            var moreBtn = $("<a class='btn btn-default btn-sm'></a>");
            moreBtn.click(function () {
                $('#' + tableId + 'SearchBar').find('div.edt-adv-search').toggleClass('hide');
                var moreStatus = $(this).find(".glyphicon").hasClass('glyphicon-chevron-up');
                if (!moreStatus) {
                    $(this).find('span.edt-i18n').attr('data-i18n-key', 'edt.common.advQuery.less')
                } else {
                    $(this).find('span.edt-i18n').attr('data-i18n-key', 'edt.common.advQuery')
                }
                $(this).find(".glyphicon").toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
                var key = $(this).find('span.edt-i18n').attr('data-i18n-key');
                $(this).find('span.edt-i18n').text(self.i18nData(key, moreStatus ? "更多" : "隐藏"))
            });
        }
        searchBtnDiv.append(searchBtn);
        searchBar.append(searchBtnDiv);
    }
};

//构造datatables配置
easyDataTables.buildParams = function (params, table) {
    var tableId = table.attr("id");
    var tmpCustCfg = this.getTabCfg(tableId, this);

    var queryProp = tmpCustCfg.column.query;
    var queryColumns = table.find("thead > tr > th[" + queryProp + "='true']").not("[field='edt-opt']");
    if (queryColumns.length > 0) {
        var tableId = table.attr(tmpCustCfg.table.tableId);
        var searchBarId = tableId + "SearchBar";
        var searchBar = $("#" + searchBarId);
        $.each(queryColumns, function (idx, item) {
            var paramName = $(item).attr(tmpCustCfg.column.filed);
            var item = searchBar.find("[name='" + paramName + "']");
            var value = item.val();
            if (value && !$(item).is(":hidden")) {
                params[paramName] = value;
            } else {
                delete params[paramName];
            }
        });
    }
};

//构造总计行
easyDataTables.buildTotal = function (table, data) {
    if (data) {
        var tableId = table.attr("id");
        var tmpCustCfg = this.getTabCfg(tableId, this);
        var api = this.dataTables[tableId];
        var datas = api.data();
        var tbody = table.find("tbody");
        var cols = table.find("th");
        var totalRow = $("<tr role=\"row\"></tr>");
        var methods = this.getMethods(tableId, this);
        tbody.append(totalRow);
        var rows = tbody.find("tr");
        totalRow.addClass("edt-total");
        totalRow.addClass(rows.length % 2 == 0 ? "even" : "odd");
        var totalTds = {};
        //初始化总计行
        $.each(cols, function (idx, item) {
            var td = $("<td></td>");
            var tdClass = $(rows[0]).find("td:nth-child(" + (idx + 1) + ")").attr("class");
            td.addClass(tdClass);
            var titleFlag = $(item).attr(tmpCustCfg.column.totalTitleFlag);
            if (titleFlag) {
                td.text($.i18n.prop("edt.datatable.total"));
            }
            var totalFlag = $(item).attr(tmpCustCfg.column.totalFlag);
            var filed = $(item).attr(tmpCustCfg.column.filed);
            if (filed == "edt-seq") {
                td.text(rows.length);
            }
            if (totalFlag) {
                var renderName = $(item).attr(tmpCustCfg.column.render);
                var value = data[filed];
                var totalRenderName = $(item).attr(tmpCustCfg.column.totalRender);
                if (totalRenderName && typeof(methods[totalRenderName]) === "function") {
                    value = methods[totalRenderName](value || 0, null, data);
                }

                if (renderName && typeof(methods[renderName]) === "function") {
                    value = methods[renderName](value || 0, null, data);
                }
                td.text(value);
            }
            totalRow.append(td);
        });
    }
};

//查询总计行
easyDataTables.queryTotal = function (table) {
    var tableId = table.attr("id");
    var tmpCustCfg = this.getTabCfg(tableId, this);
    var api = this.dataTables[tableId];
    var datas = api.data();
    if (datas && datas.length > 0) {
        var totalUrl = table.attr(tmpCustCfg.table.totalUrl);
        var params = api.ajax.params();
        var setting = {
            url: totalUrl,
            data: params,
            async: false
        };
        var self = this;
        var resultSetting = {
            successFn: function (responseData) {
                self.buildTotal(table, responseData);
            }
        };
        ajaxutls.ajax(setting, resultSetting);
    }
};

//构造生成合计行
easyDataTables.buildPageTotal = function (table) {
    var tableId = table.attr("id");
    var tmpCustCfg = this.getTabCfg(tableId, this);
    var api = this.dataTables[tableId];
    var datas = api.data();
    if (datas.length < 1) {
        return;
    }
    var tbody = table.find("tbody");
    var cols = table.find("th");
    var pageTotalRow = $("<tr role=\"row\"></tr>");
    tbody.append(pageTotalRow);
    var rows = tbody.find("tr");
    pageTotalRow.addClass("edt-page-total");
    pageTotalRow.addClass(rows.length % 2 == 0 ? "even" : "odd");
    var totalTds = {};
    //初始化合计行
    $.each(cols, function (idx, item) {
        var td = $("<td></td>");
        var tdClass = $(rows[0]).find("td:nth-child(" + (idx + 1) + ")").attr("class");
        td.addClass(tdClass);
        var titleFlag = $(item).attr(tmpCustCfg.column.totalTitleFlag);
        if (titleFlag) {
            td.text($.i18n.prop("edt.datatable.pageTotal"));
        }
        var totalFlag = $(item).attr(tmpCustCfg.column.totalFlag);
        var filed = $(item).attr(tmpCustCfg.column.filed);
        if (filed == "edt-seq") {
            td.text(rows.length);
        }
        if (totalFlag) {
            totalTds[filed] = td;
            td.data(tmpCustCfg.column.render, $(item).attr(tmpCustCfg.column.render));
            td.data(tmpCustCfg.column.totalRender, $(item).attr(tmpCustCfg.column.totalRender));
        }
        pageTotalRow.append(td);
    });
    var totalData = {};
    var methods = this.getMethods(tableId, this);
    //计算合计列数据
    $.each(datas, function (idx, item) {
        $.each(totalTds, function (key, val) {
            var totalVal = parseFloat(totalData[key] || 0);
            // totalVal += item[key];
            if (val.data(tmpCustCfg.column.render)) {
                var renderData = methods[val.data(tmpCustCfg.column.render)](item[key], null, item)
                totalVal += parseFloat(renderData || 0);
            } else {
                totalVal += item[key];
            }
            totalData[key] = totalVal;
        });
    });
    $.each(totalTds, function (key, val) {
        var totalVal = totalData[key];

        if (val.data(tmpCustCfg.column.totalRender)) {
            totalVal = methods[val.data(tmpCustCfg.column.totalRender)](totalVal, null, totalData);
        }

        if (val.data(tmpCustCfg.column.render)) {
            totalVal = methods[val.data(tmpCustCfg.column.render)](totalVal, null, totalData);
        }
        val.text(totalVal);
    });
};

//构造配置信息
easyDataTables.buildConfig = function (table) {
    var tableId = table.attr("id");
    var tmpCustCfg = this.getTabCfg(tableId, this);

    var tableId = table.attr(tmpCustCfg.table.tableId);

    var config = {};
    config.autoWidth = false; //关闭自动调整列宽
    if (table.attr(tmpCustCfg.table.deferLoading)) {
        config.deferLoading = 0;
    }
    self = this;
    config.ajax = {};
    config.ajax.url = table.attr(tmpCustCfg.table.url);
    config.ajax.data = function (params) {
        self.buildParams(params, table);
    };
    config.serverSide = true;
    config.serverMethod = table.attr(tmpCustCfg.table.method) || "POST";
    config.dom = this.buildDom(table);
    config.tableTools = {aButtons: []};
    config.columns = this.buildColumns(table);
    config.columnDefs = this.buildColumnDefs(table);
    config.pageLength = table.attr(tmpCustCfg.table.pageSize) || 10;
    config.pagingType = table.attr(tmpCustCfg.table.pageType) || 'simple_numbers';
    var self = this;
    config.preDrawCallback = function () {
        //新增查询显示processing功能
        var processing = table.attr(tmpCustCfg.table.loading);
        if (processing === 'true') {
            loadIndex = loadingUtil.show();
        }
    };
    config.drawCallback = function (dtSettings) {
        if (loadIndex) {
            loadingUtil.hide(loadIndex);
        }
        table.css("width", "100%");
        var methods = self.getMethods(tableId, self);
        if (typeof(methods["drawCallBack"]) == "function") {
            methods["drawCallBack"]();
        }
        table.parent().find(".edt-i18n[data-i18n-key], .ims-i18n[data-i18n-key]").each(function () {
            var key = $(this).attr("data-i18n-key");
            if (!key) {
                return true;
            }
            var params = [];
            if ($(this).attr("data-i18n-params")) {
                params = $(this).attr("data-i18n-params").split("|");
            }

            var i18nVal = $.i18n.prop(key, params);
            if (i18nVal != "[" + key + "]") {
                $(this).html(i18nVal);
            } else {
                console.warn("can not find key : " + key);
            }
        });
        var tmpCustCfg = self.getTabCfg(tableId, self);

        //绑定操作按钮事件

        setTimeout(function () {
            $("#" + tableId).find(".edt-btn").on("click", function () {
                var now = new Date().getTime();
                var lastOptime = $(this).data("opTime");

                //防止极品客户点击多次
                if (!lastOptime) {
                    $(this).data("opTime", now);
                } else if (now - lastOptime < 2000) {
                    return;
                }
                $(this).data("opTime", now);

                var row = $(this).attr("data-row");
                var tableId = $(this).closest("table").attr(tmpCustCfg.table.tableId);
                var rowData = self.dataTables[tableId].rows(parseInt(row)).data();
                var idFile = $(this).closest("table").attr(tmpCustCfg.table.idFiled);
                var btnFn = $(this).attr("data-fn");
                var methods = self.getMethods(tableId, self);

                if (rowData[0]) {
                    var data = rowData[0];
                    var dataId = data[idFile];
                    if (btnFn && methods[btnFn]) {
                        methods[btnFn](dataId, data);
                    }
                }
            });
            $(".edt-btn-tips").tooltip();
        }, 200);

        $("#" + tableId).find("tr > th").not(":first").addClass("edt-td");
        $("#" + tableId).find("tr > td").not(":first").addClass("edt-td");

        $("#" + tableId).find("th.hide").removeClass("hide");
        var colspan = $("#" + tableId).find("thead tr th").length;
        $("#" + tableId).find(".dataTables_empty").attr("colspan", colspan);
        $("#" + tableId).find("thead tr th").each(function (idx, item) {
            $("#" + tableId).find("tbody > tr > td:nth-child(" + (idx + 1) + ")").addClass($(item).attr(tmpCustCfg.column.tdClass));
        });

        setTimeout(function () {
            // self.dataTables[tableId].columns.adjust();
            self.fixFireFoxWidth(table);
            $("div[role='tooltip'].tooltip").remove();
        }, 20);

        //合计标志
        if (table.attr(tmpCustCfg.table.totalFlag)) {
            var pageTotal = self.buildPageTotal(table);
            var total;
            //总计查询链接
            if (table.attr(tmpCustCfg.table.totalUrl)) {
                //TODO 总计与合计回调
                total = self.queryTotal(table);
            }
        }
    };
    var lang = $.cookie('ims_language');
    if (!lang) {
        // lang = $.i18n.normaliseLanguageCode();
        lang = "en";//$.i18n.normaliseLanguageCode();
        lang = lang.replace("-", "_");
        var idx = lang.indexOf("_");
        lang = lang.substring(0, idx);
    }
    lang = lang || "en";

    if (config.pagingType) {
        lang += ("_" + config.pagingType);
    }

    /*    config.language = {
            url: "static/plugins/datatables/i18n/" + lang + ".json"
        };*/

    // var self = this;
    config.initComplete = function () {
        var methods = self.getMethods(tableId, self);
        self.buildToolbar(table, methods);
        self.buildSearchBar(table);
    };
    return config;
};

function isNotTotalRow (tr) {
    var totalFlag = tr.is(".edt-total");
    var pageTotalFlag = tr.is(".edt-page-total");
    return !totalFlag && !pageTotalFlag;
}

//列宽宽度问题
easyDataTables.fixFireFoxWidth = function (table) {
    if (table.is(":hidden")) {
        return;
    }
    var tableId = table.attr("id");
    // table.css("table-layout", "fixed");
    var exceptWidth = 0;
    var exceptCount = 0;
    var self = this;
    var tmpCustCfg = this.getTabCfg(tableId, this);

    table.find("th[data-width]").not("[data-isFixed='false']").each(function (idx, item) {
        if (!isNaN($(item).attr("data-width"))) {
            exceptWidth += parseInt($(item).attr("data-width"), 10) + 17;
            exceptCount++;
            $(item).attr("data-isFixed", true);
        }
    });
    console.log("parentWidth:" + table.parent().width());
    var maxWidth = table.parent().width() - exceptWidth;
    table.css("width", "");

    if (maxWidth != 0 && table.find("th").length == exceptCount) {
        var iWidth = maxWidth / exceptCount;

        table.find("th[data-width]").not("[data-isFixed='true']").each(function (idx, item) {
            if (!isNaN($(item).attr("data-width"))) {
                $(item).attr("data-width", parseInt($(item).attr("data-width"), 10) + iWidth)
            }
        });
    }

    var itemWidth = (maxWidth / (table.find("th").length - exceptCount));
    if (itemWidth - 17 > 0) {
        itemWidth -= 17;
    }
    table.find("thead > tr > th").each(function (idx, item) {
        var width = $(item).width();
        var isCustWidth = $(item).attr("data-width") != null;
        var custWidth = parseInt($(item).attr("data-width") || width, 10);
        if (!isCustWidth) {
            $(item).attr("data-isFixed", false);
        }
        isCustWidth = $(item).attr("data-isFixed") == "true";

        $(item).attr("data-width", custWidth);
        var realWidth = width;
        if (custWidth != itemWidth && !isCustWidth) {
            $(item).css("width", itemWidth + "px");
            $(item).attr("data-width", itemWidth);
            realWidth = itemWidth;
        } else if (custWidth < 0) {
            $(item).css("width", itemWidth + "px");
            $(item).attr("data-width", itemWidth);
            realWidth = itemWidth;
        } else {
            $(item).css("width", custWidth + "px");
            realWidth = custWidth;
        }

        var text = $(item).text();
        var div = $("<div></div>");
        div.css({
            // "width": custWidth,
            "overflow": "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap"
        });
        div.attr("title", text);
        div.attr("data-container", "body");
        div.html($(item).html());
        $(item).empty().append(div);
        var expandFlag = $(item).attr(tmpCustCfg.column.expandFlag);
        var expandMethod = $(item).attr(tmpCustCfg.column.expandMethod);
        var clickMethod = $(item).attr(tmpCustCfg.column.clickMethod);

        // }
        table.find("tr > td:nth-child(" + (idx + 1) + ")").each(function (idx, tdItem) {
            var text = $(tdItem).text();
            var width = $(tdItem).width();
            $(tdItem).css("width", realWidth + "px");
            $(tdItem).attr(tmpCustCfg.column.expandMethod, expandMethod);
            $(tdItem).attr(tmpCustCfg.column.clickMethod, clickMethod);
            if (expandFlag == "true" && isNotTotalRow($(this).closest("tr"))) {
                $(tdItem).addClass("edt-child-expand");
            }

            if (clickMethod && isNotTotalRow($(this).closest("tr"))) {
                $(tdItem).addClass("edt-column-click");
            }

            if (width > 0) {
                var div = $("<div></div>");
                div.css({
                    // "width": custWidth,
                    "overflow": "hidden",
                    "text-overflow": "ellipsis",
                    "white-space": "nowrap"
                });
                div.attr("title", text);
                div.attr("data-container", "body");
                div.html($(tdItem).html());
                $(tdItem).empty().append(div);
            }
        });
        var isEmpty = table.find("tr > td.dataTables_empty").length;
        if (isEmpty) {
            self.dataTables[table.attr("id")].columns.adjust();
        }

        table.find("td> div[title], th > div[title]").not(":hidden").tooltip();

    });
    table.resize();
};

//默认render函数
easyDataTables.defaultRender = function (data, type, row, meta) {
    return data || '';
};

//序列render
easyDataTables.seqRender = function (data, type, row, meta) {
    return meta.row + 1;
};

//构造columns
easyDataTables.buildColumns = function (table) {
    var columns = table.find("thead > tr > th");
    var tableId = table.attr("id");
    var columnsCfg = [];
    var tmpCustCfg = this.getTabCfg(tableId, this);
    if (columns) {
        var self = this;
        var seqCfg = {};
        var hideSeq = table.attr(this.getTabCfg(tableId, this).table.hideSeq) == "true";
        if (!hideSeq) {
            seqCfg.data = null;
            seqCfg.sortable = false;
            seqCfg.render = this.seqRender;
        }
        var insertFlag = false;
        $.each(columns, function (idx, item) {
            var columnCfg = {};
            var data = $(item).attr(tmpCustCfg.column.filed);

            columnCfg.data = data == "edt-opt" ? null : data;
            columnCfg.sortable = $(item).attr(tmpCustCfg.column.sortable) === "true";
            var render = $(item).attr(tmpCustCfg.column.render);
            if (render) {
                var methods = self.getMethods(tableId, self);
                columnCfg.render = methods[render] || self.defaultRender;
            }

            if ($(item).attr(tmpCustCfg.column.tdWidth)) {
                columnCfg.width = $(item).attr(tmpCustCfg.column.tdWidth);
            }
            if (idx == 0) {
                columnCfg.width = 35;
            }

            // $(item).html("");
            // $(item).addClass("hide");
            if (!hideSeq && idx == 0) {
                insertFlag = $(item).attr("data-hidden") == "true";
            }
            columnsCfg.push(columnCfg);
        });
        if (!hideSeq) {
            seqCfg.class = "edt-details-control";
            if (insertFlag) {
                columnsCfg.splice(1, 0, seqCfg);
            } else {
                columnsCfg.splice(0, 0, seqCfg);
            }

        }
        if (table.attr(tmpCustCfg.table.childrenCallback)) {
            var childrenExtendCfg = {};
            childrenExtendCfg.data = null;
            childrenExtendCfg.sortable = false;
            childrenExtendCfg.class = "edt-details-control";
            childrenExtendCfg.defaultContent = "";
            childrenExtendCfg.render = function () {
                return "<span class='details-control fa fa-plus-square-o'></span>";
            };

            if (insertFlag) {
                columnsCfg.splice(1, 0, childrenExtendCfg);
            } else {
                columnsCfg.splice(0, 0, childrenExtendCfg);
            }
        }
    }
    return columnsCfg;
};

//操作列render
easyDataTables.optionsRender = function (renderParam, table) {
    var tableId = table.attr("id");
    var tmpCustCfg = this.getTabCfg(tableId, this);
    var options = this.instances[this.getSelector(tableId, this)].tableCfg[table.attr(tmpCustCfg.table.tableId)].find("thead > tr >" +
        " th[field='edt-opt'] >" +
        " span[data-opt-type='opt']");

    var optionDiv = $("<div></div>");
    if (options.length) {
        var self = this;
        var rowData = renderParam.row;
        $.each(options, function (idx, item) {
            var tmpCustCfg = self.getTabCfg(tableId, self);

            var exp = $(item).attr(tmpCustCfg.opt.exp);
            var showFlag = true;
            if (exp) {
                //TODO 计算表达式
                var beginIdx = exp.indexOf("#");
                var endIdx = exp.lastIndexOf("#");
                var field = exp.substring(0, beginIdx);
                var expType;
                var valParam;
                if (beginIdx == endIdx) {
                    expType = exp.substring(beginIdx + 1);
                    valParam = "";
                } else {
                    expType = exp.substring(beginIdx + 1, endIdx);
                    valParam = exp.substring(endIdx + 1);
                }
                expType = (expType || "").toLowerCase();
                if ("eq" === (expType)) {
                    showFlag = rowData[field] == valParam;
                } else if ("nq" === (expType)) {
                    showFlag = rowData[field] != valParam;
                } else if ("empty" === (expType)) {
                    showFlag = valParam == "true" ? (rowData[field] == null || rowData[field] == "") : (rowData[field] != null && rowData[field] != "");
                } else if ("gt" === (expType)) {
                    if (!isNaN(valParam)) {
                        valParam = parseInt(valParam, 10);
                    }
                    showFlag = rowData[field] > valParam;
                } else if ("lt" === (expType)) {
                    if (!isNaN(valParam)) {
                        valParam = parseInt(valParam, 10);
                    }
                    showFlag = rowData[field] < valParam;
                } else if ("ge" === (expType)) {
                    if (!isNaN(valParam)) {
                        valParam = parseInt(valParam, 10);
                    }
                    showFlag = rowData[field] >= valParam;
                } else if ("le" === (expType)) {
                    if (!isNaN(valParam)) {
                        valParam = parseInt(valParam, 10);
                    }
                    showFlag = rowData[field] <= valParam;
                }

            }

            if (!showFlag) {
                return true;
            }

            var expAnd = $(item).attr(tmpCustCfg.opt.expAnd);
            var showFlagAnd = true;
            if (expAnd) {
                //TODO 计算表达式
                var beginIdx = expAnd.indexOf("#");
                var endIdx = expAnd.lastIndexOf("#");
                var field = expAnd.substring(0, beginIdx);
                var expType;
                var valParam;
                if (beginIdx == endIdx) {
                    expType = expAnd.substring(beginIdx + 1);
                    valParam = "";
                } else {
                    expType = expAnd.substring(beginIdx + 1, endIdx);
                    valParam = expAnd.substring(endIdx + 1);
                }
                expType = (expType || "").toLowerCase();
                if ("eq" === (expType)) {
                    showFlagAnd = rowData[field] == valParam;
                } else if ("nq" === (expType)) {
                    showFlagAnd = rowData[field] != valParam;
                } else if ("empty" === (expType)) {
                    showFlagAnd = valParam == "true" ? (rowData[field] == null || rowData[field] == "") : (rowData[field] != null && rowData[field] != "");
                } else if ("gt" === (expType)) {
                    if (!isNaN(valParam)) {
                        valParam = parseInt(valParam, 10);
                    }
                    showFlagAnd = rowData[field] > valParam;
                } else if ("lt" === (expType)) {
                    if (!isNaN(valParam)) {
                        valParam = parseInt(valParam, 10);
                    }
                    showFlagAnd = rowData[field] < valParam;
                } else if ("ge" === (expType)) {
                    if (!isNaN(valParam)) {
                        valParam = parseInt(valParam, 10);
                    }
                    showFlagAnd = rowData[field] >= valParam;
                } else if ("le" === (expType)) {
                    if (!isNaN(valParam)) {
                        valParam = parseInt(valParam, 10);
                    }
                    showFlagAnd = rowData[field] <= valParam;
                }

            }

            if (!showFlagAnd) {
                return true;
            }

            var option = $("<div class='btn btn-xs edt-btn'></div>");
            option.attr("data-row", renderParam.meta.row);
            option.attr("data-fn", $(item).attr(tmpCustCfg.opt.fn));

            var optionIcon = $(item).attr(tmpCustCfg.opt.icon) || "";
            if (optionIcon) {
                var optionIconI = $("<i class='edt-btn-icon'></i>");
                optionIconI.addClass(optionIcon);
                option.append(optionIconI);
            }

            var i18nKey = $(item).attr(tmpCustCfg.opt.i18n);

            var optionTitleFlag = $(item).attr(tmpCustCfg.opt.showTitle);
            if (optionTitleFlag == "true") {
                var optionTitle = self.i18nData(i18nKey, $(item).attr(tmpCustCfg.opt.tipsI18n));
                var optionTitleSpan = $("<span class='edt-btn-title'></span>");
                optionTitleSpan.text(optionTitle);
                option.append(optionTitleSpan);
            }

            var tips = $(item).attr(tmpCustCfg.opt.tips);
            if (tips != "") {
                option.attr("title", self.i18nData(i18nKey, $(item).attr(tmpCustCfg.opt.tips)));
                option.addClass("edt-btn-tips");
                option.attr("data-container", "body");
            }
            option.addClass("btn btn-sm").addClass($(item).attr(tmpCustCfg.opt.btnClass));

            optionDiv.append(option);
        });
    }
    var result = optionDiv.prop('outerHTML');
    return result;

};

//构建列定义
easyDataTables.buildColumnDefs = function (table) {
    var tableId = table.attr("id");
    var columns = table.find("thead > tr > th");
    var columnsCfg = [];
    var tmpCustCfg = this.getTabCfg(tableId, this);
    if (columns) {
        var self = this;

        var hideSeq = table.attr(this.getTabCfg(tableId, this).table.hideSeq) == "true";
        var seqCfg = {};
        var offset = 0;
        if (!hideSeq) {
            seqCfg.defaultContent = "";
            seqCfg.className = "text-center";
        }

        var insertFlag = false;

        $.each(columns, function (idx, item) {
            var columnCfg = {};
            columnCfg.targets = idx + offset;
            columnCfg.defaultContent = "";
            columnCfg.cellType = "td";
            //columnCfg.className = $(item).attr(tmpCustCfg.column.tdClass);
            if ($(item).attr(tmpCustCfg.column.hideFlag) == "true") {
                columnCfg.visible = false;
            }

            if ($(item).attr(tmpCustCfg.column.filed) == "edt-opt") {
                columnCfg.render = function (data, type, row, meta) {
                    var renderParams = {};
                    renderParams.data = data;
                    renderParams.type = type;
                    renderParams.row = row;
                    renderParams.meta = meta;
                    return self.optionsRender(renderParams, table);
                }
            }

            if ($(item).attr(tmpCustCfg.column.tdWidth)) {
                columnCfg.width = $(item).attr(tmpCustCfg.column.tdWidth);
            }
            if (!hideSeq && idx == 0) {
                insertFlag = $(item).attr("data-hidden") == "true";
                offset++;
            }
            columnsCfg.push(columnCfg);
        });
        if (!hideSeq) {
            seqCfg.targets = offset;
            if (insertFlag) {
                columnsCfg.splice(1, 0, seqCfg);
            } else {
                columnsCfg.splice(0, 0, seqCfg);
            }
        }

        if (table.attr(tmpCustCfg.table.childrenCallback)) {
            var childrenExtendCfg = {};
            childrenExtendCfg.data = null;
            childrenExtendCfg.class = "edt-details-control";
            childrenExtendCfg.defaultContent = "";
            if (insertFlag) {
                columnsCfg.splice(1, 0, childrenExtendCfg);
            } else {
                columnsCfg.splice(0, 0, childrenExtendCfg);
            }
        }
    }
    return columnsCfg;
};

window["easyDataTablesApis"] = easyDataTables.dataTables;
window["easyDataTables"] = easyDataTables;