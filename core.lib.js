/*
**@Author  douchaoyang
*/
/**
 * ���������ռ�
 * @param {string} �ռ����ƣ��ɶ�� 
 * @return {object} ����
 */
var namespace = function () {
    var argus = arguments;
    for (var i = 0; i < argus.length; i++) {
        var objs = argus[i].split(".");
        var obj = window;
        for (var j = 0; j < objs.length; j++) {
            obj[objs[j]] = obj[objs[j]] || {};
            obj = obj[objs[j]];
        }
    }
    return obj;
};

namespace("core.base");

(function (base) {
    /**
     * Ϊ������չ
     * @param {object} object ����
     * @return {bool} ��/��
     */
    base.extend = function (destination, source) {
        if (destination == null) {
            destination = source;
        } else {
            for (var property in source) {
                if (getParamType(source[property]).toLowerCase() === "object" && getParamType(destination[property]).toLowerCase() === "object") extend(destination[property], source[property]); else destination[property] = source[property];
            }
        }
        return destination;
    };
    base.extendLess = function (destination, source) {
        var newopt = source;
        for (var i in destination) {
            if (isObject(source) && typeof source[i] != "undefined") {
                destination[i] = newopt[i];
            }
        }
        return destination;
    };
    /**
     * ��ʽ�̳���
     * @param {object} subClass ����
     * @param {object} superClass ������
     * @return {undefined} 
     */
    base.extendClass = function (subClass, superClass) {
        var F = function () { };
        F.prototype = superClass.prototype;
        subClass.prototype = new F();
        subClass.prototype.constructor = subClass;
        subClass.superclass = superClass.prototype;
        if (superClass.prototype.constructor == Object.prototype.constructor) {
            superClass.prototype.constructor = superClass;
        }
    };
    /**
     * ԭ�ͼ̳���
     * @param {object} object ����
     * @return {object} ���ɵ�����
     */
    base.cloneClass = function (object) {
        if (!isObject(object)) return object;
        if (object == null) return object;
        var F = new Object();
        for (var i in object) F[i] = cloneClass(object[i]);
        return F;
    };
    /**
     * ��������
     * @param {function,context} object
     * @return {object}
     */
    base.bind = function (fn, context) {
        return function () {
            return fn.apply(context, arguments);
        };
    };
    base.extend(base, {
        /**
         * �ж϶����Ƿ���
         * ��ʵֻ�Զ����е�Ԫ���ж���Ч�����Ǵ��������˷������޷����ã���Ҫ�����try
         * @param {object} object ����
         * @return {bool} ��/��
         */
        isUndefined: function (o) {
            return o === undefined && typeof o == "undefined";
        },
        /**
         * �ж϶����Ƿ�����
         * @param {object} object ����
         * @return {bool} ��/��
         */
        isArray: function (obj) {
            return getParamType(obj).toLowerCase() === "array";
        },
        /**
         * �ж϶����Ƿ���
         * @param {object} object ����
         * @return {bool} ��/��
         */
        isFunction: function (obj) {
            return getParamType(obj).toLowerCase() === "function";
        },
        /**
         * �ж϶����Ƿ����
         * @param {object} object ����
         * @return {bool} ��/��
         */
        isObject: function (obj) {
            return getParamType(obj).toLowerCase() === "object";
        },
        /**
         * �ж϶����Ƿ���ֵ
         * @param {object} object ����
         * @return {bool} ��/��
         */
        isNumber: function (obj) {
            return getParamType(obj).toLowerCase() === "number";
        },
        /**
         * �ж϶����Ƿ��ַ���
         * @param {object} object ����
         * @return {bool} ��/��
         */
        isString: function (obj) {
            return getParamType(obj).toLowerCase() === "string";
        },
        /**
         * �ж��Ƿ񲼶�ֵ
         * @param {object} object ����
         * @return {bool} ��/��
         */
        isBoolean: function (obj) {
            return getParamType(obj).toLowerCase() === "boolean";
        },
        /**
         * �ж϶����Ƿ�����
         * @param {object} object ����
         * @return {bool} ��/��
         */
        isDate: function (obj) {
            return getParamType(obj).toLowerCase() === "date";
        },
        /**
         * �ж϶����Ƿ�DOMԪ��
         * @param {object} obj DOM����
         * @return {bool} ��/��
         */
        isDom: function (obj) {
            try {
                return obj && typeof obj === "object" && !isUndefined(obj.nodeType) && obj.nodeType == 1 && !isUndefined(obj.nodeName) && typeof obj.nodeName == "string";
            } catch (e) {
                //console.log(e)
                return false;
            }
        },
        /**
         * ��ȡDOM�����ֵ
         * @param {object} obj DOM����
         * @return {string} ȡvalue��innerHTML
         */
        getDomValue: function (obj) {
            return obj.value || obj.innerHTML;
        },
        /**
         * ��������
         * @param {serial,function} �������󼯺�
         * @return {undefined}
         */
        forEach: function (haystack, callback) {
            var i = 0, length = haystack.length, name;
            if (length !== undefined) {
                for (; i < length;) {
                    if (callback.call(haystack[i], i, haystack[i++]) === false) {
                        break;
                    }
                }
            } else {
                for (name in haystack) {
                    callback.call(haystack[name], name, haystack[name]);
                }
            }
        },
        /**
         * ��ȡdom����
         * @param {string|dom} dom��id�����k
         * @return {dom} 
         */
        g: function (obj) {
            return typeof obj == "object" ? obj : document.getElementById(obj);
        }
    });
    /**
     * ��ȡ��������
     * @private
     * @param {object} object ����
     * @return {string} ����
     * ���ж����ͣ�Boolean Number String Function Array Date RegExp Object
     */
    function getParamType(obj) {
        return obj == null ? String(obj) : Object.prototype.toString.call(obj).replace(/\[object\s+(\w+)\]/i, "$1") || "object";
    }
})(core.base);

/**
 * �����ķ�����չ��window������
*/
core.base.extend(window, core.base);

/**
 * ͨ����������
 */
namespace("core.config");

(function (config) {
    extend(config, {
        version: "20170228",
        loaderPath: location.protocol + "//",
        charset: "utf-8",
        expires: 3e4
    });
})(core.config);

namespace("core.loader");

(function (loader) {
    extend(loader, {
        loadScript: function (url, callback) {
            var script = document.createElement("script");
            var head = document.getElementsByTagName("head")[0];
            script.type = "text/javascript";
            script.charset = core.config.charset;
            if (script.readyState) {
                script.onreadystatechange = function () {
                    if ("loaded" == script.readyState || "complete" == script.readyState) {
                        script.onreadystatechange = null;
                        callback.call(this);
                    }
                };
            } else {
                script.onload = function () {
                    callback.call(this);
                };
                script.onerror = function () {
                    console.log("Script Load Error! Please Refresh!");
                };
            }
            script.src = url;
            head.appendChild(script);
        },
        loadCss: function (url, callback) {
            var head = document.getElementsByTagName("head")[0];
            var link = head.appendChild(document.createElement("link"));
            link.href = url;
            link.rel = "stylesheet";
            callback.call(this);
        },
        loadImage: function (arr, callback) {
            if (!isArray(arr)) return;
            var l = arr.length, n = 0;
            for (var i = 0; i < l; i++) {
                load(arr[i]);
            }
            function load(url) {
                var m = new Image();
                m.onload = m.onerror = function () {
                    m = null;
                    loaded();
                };
                m.src = url;
            }
            function loaded() {
                n++;
                callback.call(this, n);
            }
        }
    });
})(core.loader);

namespace("core.dom");

(function (dom) {
    var userAgent = navigator.userAgent.toLowerCase();
    extend(dom, {
        /**
         * �ж����������
         */
        browser: {
            /**
             * ��ȡ�汾��
             */
            version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, "0"])[1],
            /**
             * �Ƿ�webkit�����
             */
            webkit: /webkit/.test(userAgent),
            /**
             * �Ƿ�opera�����
             */
            opera: /opera/.test(userAgent),
            /**
             * �Ƿ�IE�����
             */
            msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
            /**
             * �Ƿ�mozilla�����
             */
            mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
            /**
             * �Ƿ�TT�����
             */
            tt: /tencenttraveler/.test(userAgent),
            /**
             * �Ƿ�chrome�����
             */
            chrome: /chrome/.test(userAgent),
            /**
             * �Ƿ�firefox�����
             */
            firefox: /firefox/.test(userAgent),
            /**
             * �Ƿ�safari�����
             */
            safari: /safari/.test(userAgent),
            /**
             * �Ƿ�gecko�����
             */
            gecko: /gecko/.test(userAgent),
            /**
             * �Ƿ�IE6
             */
            ie6: !-[1,] && !window.XMLHttpRequest
        },
        /**
         * ����Ԫ��
         * @param {string} tagName ��ǩ����
         * @return {dom} 
         */
        creatElment: function (a) {
            return document.createElement(a);
        },
        /**
         * ɾ��Ԫ��
         * @param {string} tagName ��ǩ����
         * @return {null} 
         */
        removeElment: function (a) {
            a.parentNode.removeChild(a);
        },
        /**
         * ��head��ǩ�����Ԫ��
         * @param {dom} domԪ��
         */
        headAdd: function (a) {
            return document.getElementsByTagName("head")[0].appendChild(a);
        },
        /**
         * ��body��ǩ�����Ԫ��
         * @param {dom} domԪ��
         */
        bodyAdd: function (a) {
            return document.getElementsByTagName("body")[0].appendChild(a);
        },
        /*
        **ͨ��������ȡDOM����
        */
        getElementsByClassName: function (className) {
            var elems = [];
            if (!document.getElementsByClassName) {
                var dom = document.getElementsByTagName("*");
                for (var i = 0; i < dom.length; i++) {
                    if (dom[i].className) {
                        var classs = dom[i].className.split(/\s+/);
                        for (var c = 0; c < classs.length; c++) {
                            if (classs[c] == className) {
                                elems.push(dom[i]);
                            }
                        }
                    }
                }
            } else {
                var dom = document.getElementsByClassName(className);
                for (var i = 0; i < dom.length; i++) {
                    elems.push(dom[i]);
                }
            }
            return elems
        },
        /**
         * �ж�DOM�����Ƿ������ʽ������
         * @param {dom} element dom����
         * @param {string} className ��ʽ����
         * @return {bool} 
         */
        hasClassName: function (element, className) {
            var elementClassName = element.className;
            return elementClassName.length > 0 && (elementClassName == className || new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName));
        },
        /**
         * ΪDOM����������ʽ������
         * @param {dom} element dom����
         * @param {string} className ��ʽ����
         * @return {dom} 
         */
        addClassName: function (element, className) {
            if (!element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"))) element.className += " " + className;
            return element
        },
        /**
         * ΪDOM����ɾ����ʽ������
         * @param {dom} element dom����
         * @param {string} className ��ʽ����
         * @return {dom} 
         */
        removeClassName: function (element, className) {
            if (element.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"))) {
                var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
                element.className = element.className.replace(reg, " ");
            }
            return element
        },
        /**
         * Ϊdom����������ʽ
         * @param {dom} ele dom����
         * @param {object} styles ��ʽ���� like:{width:100,height:100}
         * @return undefined
         */
        setStyle: function (ele, styles) {
            for (var i in styles) {
                ele.style[i] = styles[i];
            }
        },
        /**
         * Ϊdom�����ȡѡ�����Ե���ʽ
         * @param {dom} ele dom����
         * @param {string} prop ��������
         * @return ������ʽ
         */
        getStyle: function (el, prop) {
            var viewCSS = isFunction(document.defaultView) ? document.defaultView() : document.defaultView;
            if (viewCSS && viewCSS.getComputedStyle) {
                var s = viewCSS.getComputedStyle(el, null);
                return s && s.getPropertyValue(prop);
            }
            return el.currentStyle && (el.currentStyle[prop] || null) || null;
        },
        /**
         * ��ҳ���ݸ߶�
         * @return {int} ��ҳ���ݸ߶�
         */
        getPageHeight: function () {
            var h = window.innerHeight && window.scrollMaxY ? window.innerHeight + window.scrollMaxY : document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight;
            return h > document.documentElement.scrollHeight ? h : document.documentElement.scrollHeight;
        },
        /**
         * ��ҳ���ݿ��
         * @return {int} ��ҳ���ݿ��
         */
        getPageWidth: function () {
            return window.innerWidth && window.scrollMaxX ? window.innerWidth + window.scrollMaxX : document.body.scrollWidth > document.body.offsetWidth ? document.body.scrollWidth : document.body.offsetWidth;
        },
        /**
         * �������������߶�
         * @return {int} ����������߶�
         */
        getWinHeight: function () {
            return window.innerHeight ? window.innerHeight : document.documentElement && document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight;
        },
        /**
         * ���������������
         * @return {int} ������������
         */
        getWinWidth: function () {
            return window.innerWidth ? window.innerWidth : document.documentElement && document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth;
        },
        /**
         * ������������ඥ���߶�
         * @return {int} �������ඥ���߶�
         */
        getScrollTop: function () {
            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        },
        /**
         * ���������������߿��
         * @return {int} ����������߿��
         */
        getScrollLeft: function () {
            return document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
        },
        /**
         * ����������������߶�
         * @return {int} �������ඥ���߶�
         */
        setScrollTop: function (h) {
            document.documentElement.scrollTop = h;
            window.pageYOffset = h;
            document.body.scrollTop = h;
        },
        /**
         * ������������������
         * @return {int} ����������߿��
         */
        setScrollLeft: function (l) {
            document.documentElement.scrollLeft = l;
            window.pageXOffset = l;
            document.body.scrollLeft = l;
        },
        /**
         * ����dom͸����
         * @param {dom} ele dom����
         * @param {int} level ͸����ֵ��0-100��������
         * @return {undefined} 
         */
        setOpacity: function (ele, level) {
            //level = Math.min(1,Math.max(level,0));
            if (this.browser.msie && (!document.documentMode || document.documentMode < 9)) {
                ele.style.filter = "Alpha(opacity=" + level + ")";
            } else {
                ele.style.opacity = level / 100;
            }
        },
        /**
         * ��ȡҳ���ж���ľ���Xλ��
         * @param {dom} e dom����
         * @return {int} 
         */
        getX: function (e) {
            var t = e.offsetLeft;
            while (e = e.offsetParent) t += e.offsetLeft;
            return t;
        },
        /**
         * ��ȡҳ���ж���ľ���Yλ��
         * @param {dom} e dom����
         * @return {int} 
         */
        getY: function (e) {
            var t = e.offsetTop;
            while (e = e.offsetParent) t += e.offsetTop;
            return t;
        },
        /**
         * ��ȡurl�еĲ���ֵ
         * @param {string} pa ��������
         * @return {string} ����ֵ
         */
        request: function (pa) {
            var url = window.location.href.replace(/#+.*$/, ""), params = url.substring(url.indexOf("?") + 1, url.length).split("&"), param = {};
            for (var i = 0; i < params.length; i++) {
                var pos = params[i].indexOf("="), //����name=value  
                    key = params[i].substring(0, pos), val = params[i].substring(pos + 1);
                //��ȡvalue 
                param[key] = val;
            }
            return typeof param[pa] == "undefined" ? "" : param[pa];
        }
    });
})(core.dom);

namespace("core.array");

(function (array) {
    extend(array, {
        /**
         * �ж��������ݸ���
         * @param {array} array ����
         * @return {int} ����
         */
        getLength: function (arr) {
            var l = 0;
            for (var key in arr) {
                l++;
            }
            return l;
        },
        /**
         * ��������
         * @param {array} array ����
         * @return {array} ���������
         */
        clone: function (arr) {
            var a = [];
            for (var i = 0; i < arr.length; ++i) {
                a.push(arr[i]);
            }
            return a;
        },
        /**
         * �ж��������Ƿ�������ֵ
         * @param {array} arr �������
         * @param {object} value ����
         * @return {bool} ��/��
         */
        hasValue: function (arr, value) {
            var find = false;
            if (isArray(arr) || isObject(arr)) for (var key in arr) {
                if (arr[key] == value) find = true;
            }
            return find;
        },
        /**
         * ����ֵ��������е�key
         * @param {array} arr �������
         * @param {object} value ����
         * @return {string} key
         */
        getArrayKey: function (arr, value) {
            var findKey = -1;
            if (isArray(arr) || isObject(arr)) for (var key in arr) {
                if (arr[key] == value) findKey = key;
            }
            return findKey;
        },
        /**
         * ����a1������a2û�е�ֵ
         * @param {array} a1 �������
         * @param {array} a2 �������
         * @return {array} key
         */
        filter: function (a1, a2) {
            var res = [];
            for (var i = 0; i < a1.length; i++) {
                if (!array.hasValue(a2, a1[i])) res.push(a1[i]);
            }
            return res;
        },
        /**
         * ���������ֵ�Ľ���
         * @param {array} arr ����
         * @param {array} arr ����
         * @return {array} key
         */
        unique: function (a1, a2) {
            return array.filter(a1, a2).concat(array.filter(a2, a1));
        }
    });
})(core.array);

namespace("core.string");

(function (string) {
    extend(string, {
        /**
         * �����ַ������ֽڳ���
         * ������2 Ӣ����1
         * @param {string} str �ַ���
         * @return {int}
         */
        getByteLength: function (str) {
            var bytes = 0, i = 0;
            for (; i < str.length; ++i, ++bytes) {
                if (str.charCodeAt(i) > 255) {
                    ++bytes;
                }
            }
            return bytes;
        },
        /**
         * �����ж��ٸ�˫�ֽ��ַ�
         * @param {string} str �ַ���
         * @return {int}
         */
        getDwordNum: function (str) {
            return string.getByteLength(str) - str.length;
        },
        /**
         * �����ж��ٸ������ַ�
         * @param {string} str �ַ���
         * @return {int}
         */
        getChineseNum: function (str) {
            return str.length - str.replace(/[\u4e00-\u9fa5]/g, "").length;
        },
        /**
         * ��ȡ�����ַ���
         * ȡiMaxBytes �����һ�������ַ����ֵĵط��滻�ַ�
         * @param {string} str �ַ���
         * @param {int} iMaxBytes �ַ���
         * @param {string} sSuffix �油�ַ���
         * @return {string}
         */
        cutChinese: function (str, iMaxBytes, sSuffix) {
            if (isNaN(iMaxBytes)) return str;
            if (string.getByteLength(str) <= iMaxBytes) return str;
            var i = 0, bytes = 0;
            for (; i < str.length && bytes < iMaxBytes; ++i, ++bytes) {
                if (str.charCodeAt(i) > 255) {
                    ++bytes;
                }
            }
            sSuffix = sSuffix || "";
            return (bytes - iMaxBytes == 1 ? str.substr(0, i - 1) : str.substr(0, i)) + sSuffix;
        },
        /**
         * ȥ���ַ�����ߵķǿ��ַ�
         * @param {string} str �ַ���
         * @return {string}
         */
        trimLeft: function (str) {
            return str.replace(/^\s+/, "");
        },
        /**
         * ȥ���ַ����ұߵķǿ��ַ�
         * @param {string} str �ַ���
         * @return {string}
         */
        trimRight: function (str) {
            return str.replace(/\s+$/, "");
        },
        /**
         * ȥ���ַ����������ߵķǿ��ַ�
         * @param {string} str �ַ���
         * @return {string}
         */
        trim: function (str) {
            return string.trimRight(string.trimLeft(str));
        },
        /**
         * �ɶ��ַ����滻
         * @param {string} str �ַ���
         * @param {array} str �ַ���<br/>
              array�������� [0] �������ݣ�[1] �滻����<br/>
              array���Գ��ֶ��<br/>
         * @return {string}
         */
        replacePairs: function () {
            var str = arguments[0];
            for (var i = 1; i < arguments.length; ++i) {
                var re = new RegExp(arguments[i][0], "g");
                str = str.replace(re, arguments[i][1]);
            }
            return str;
        },
        /**
         * �ַ����滻ΪHTML������ʽ
         * @param {string} str �ַ���
         * @return {string}
         */
        toHtml: function (str) {
            var CONVERT_ARRAY = [["&", "&#38;"], [" ", "&#32;"], ["'", "&#39;"], ['"', "&#34;"], ["/", "&#47;"], ["<", "&#60;"], [">", "&#62;"], ["\\\\", "&#92;"], ["\n", "<br />"], ["\r", ""]];
            return string.replacePairs.apply(this, [str].concat(CONVERT_ARRAY));
        },
        /**
         * У�������ַ
         * @param {string} str �ַ���
         * @return {bool}
         */
        isMail: function (str) {
            return /^(?:[\w-]+\.?)*[\w-]+@(?:[\w-]+\.)+[\w]{2,3}$/.test(str);
        },
        /**
         * У����ͨ�绰��������룺���ԡ�+����ͷ���������⣬�ɺ��С�-��
         * @param {string} str �ַ���
         * @return {bool}
         */
        isTel: function (str) {
            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/.test(str);
        },
        /**
         * У���ֻ����룺���������ֿ�ͷ
         * @param {string} str �ַ���
         * @return {bool}
         */
        isMobile: function (str) {
            return /^1[34578]\d{9}$/.test(str);
        },
        /**
         * У����������
         * @param {string} str �ַ���
         * @return {bool}
         */
        isZipCode: function (str) {
            return /^(\d){6}$/.test(str);
        },
        /**
         * �Ƿ����֤����
         * @param {string} str �ַ���
         * @return {bool}
         */
        isIDCard: function (str) {
            var C15ToC18 = function (c15) {
                var cId = c15.substring(0, 6) + "19" + c15.substring(6, 15);
                var strJiaoYan = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
                var intQuan = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
                var intTemp = 0;
                for (i = 0; i < cId.length; i++) intTemp += cId.substring(i, i + 1) * intQuan[i];
                intTemp %= 11;
                cId += strJiaoYan[intTemp];
                return cId;
            };
            var Is18IDCard = function (IDNum) {
                var aCity = {
                    11: "����",
                    12: "���",
                    13: "�ӱ�",
                    14: "ɽ��",
                    15: "���ɹ�",
                    21: "����",
                    22: "����",
                    23: "������",
                    31: "�Ϻ�",
                    32: "����",
                    33: "�㽭",
                    34: "����",
                    35: "����",
                    36: "����",
                    37: "ɽ��",
                    41: "����",
                    42: "����",
                    43: "����",
                    44: "�㶫",
                    45: "����",
                    46: "����",
                    50: "����",
                    51: "�Ĵ�",
                    52: "����",
                    53: "����",
                    54: "����",
                    61: "����",
                    62: "����",
                    63: "�ຣ",
                    64: "����",
                    65: "�½�",
                    71: "̨��",
                    81: "���",
                    82: "����",
                    91: "����"
                };
                var iSum = 0, info = "", sID = IDNum;
                if (!/^\d{17}(\d|x)$/i.test(sID)) {
                    return false;
                }
                sID = sID.replace(/x$/i, "a");
                if (aCity[parseInt(sID.substr(0, 2))] == null) {
                    return false;
                }
                var sBirthday = sID.substr(6, 4) + "-" + Number(sID.substr(10, 2)) + "-" + Number(sID.substr(12, 2));
                var d = new Date(sBirthday.replace(/-/g, "/"));
                if (sBirthday != d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()) return false;
                for (var i = 17; i >= 0; i--) iSum += Math.pow(2, i) % 11 * parseInt(sID.charAt(17 - i), 11);
                if (iSum % 11 != 1) return false;
                return true;
            };
            return str.length == 15 ? Is18IDCard(C15ToC18(str)) : Is18IDCard(str);
        },
        /**
         * �Ƿ�ȫ��������
         * @param {string} str �ַ���
         * @return {bool}
         */
        isChinese: function (str) {
            return string.getChineseNum(str) == str.length ? true : false;
        },
        /**
         * �Ƿ�ȫ����Ӣ��
         * @param {string} str �ַ���
         * @return {bool}
         */
        isEnglish: function (str) {
            return /^[A-Za-z]+$/.test(str);
        },
        /**
         * �Ƿ����ӵ�ַ
         * @param {string} str �ַ���
         * @return {bool}
         */
        isURL: function (str) {
            if (location.protocol == "https") {
                return /^https:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
            } else {
                return /^http:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(str);
            }
        },
        /**
         * �Ƿ������ַ���
         * @param {string} str �ַ���
         * @return {bool}
         */
        isNumberString: function (str) {
            return /^\d+$/.test(str);
        }
    });
})(core.string);

namespace("core.cookie");

(function (cookie) {
    extend(cookie, {
        /**
         * ����cookie
         * @param {string} sName cookie��
         * @param {string} sValue cookieֵ
         * @param {int} iExpireSec ʧЧʱ�䣨�룩
         * @param {string} sDomain ������
         * @param {string} sPath ����·��
         * @param {bool} bSecure �Ƿ����
         * @return {void}
         */
        set: function (sName, sValue, iExpireSec, sDomain, sPath, bSecure) {
            if (sName == undefined) {
                return;
            }
            if (sValue == undefined) {
                sValue = "";
            }
            var oCookieArray = [sName + "=" + escape(sValue)];
            if (!isNaN(iExpireSec)) {
                var oDate = new Date();
                oDate.setTime(oDate.getTime() + iExpireSec * 1e3);
                iExpireSec == 0 ? "" : oCookieArray.push("expires=" + oDate.toGMTString());
            }
            if (sDomain != undefined) {
                oCookieArray.push("domain=" + sDomain);
            }
            if (sPath != undefined) {
                oCookieArray.push("path=" + sPath);
            }
            if (bSecure) {
                oCookieArray.push("secure");
            }
            document.cookie = oCookieArray.join("; ");
        },
        /**
         * ��ȡcookie
         * @param {string} sName cookie��
         * @param {string} sValue Ĭ��ֵ
         * @return {string} cookieֵ
         */
        get: function (sName, sDefaultValue) {
            var sRE = "(?:; |^)" + sName + "=([^;]*);?";
            var oRE = new RegExp(sRE);
            if (oRE.test(document.cookie)) {
                return unescape(RegExp["$1"]);
            } else {
                return sDefaultValue || null;
            }
        },
        /**
         * ��ȡcookie
         * @param {string} sName cookie��
         * @param {string} sDomain ������
         * @param {sPath} sPath ����·��
         * @return {void} 
         */
        clear: function (sName, sDomain, sPath) {
            var oDate = new Date();
            cookie.set(sName, "", -oDate.getTime() / 1e3, sDomain, sPath);
        }
    });
})(core.cookie);

namespace("core.date");

(function (date) {
    var _d = new Date();
    extend(date, {
        /**
         * ��ȡ����
         * @param {string} sep �ָ��� Ĭ��Ϊ-
         * @return {string} yyyy-mm-dd
         */
        toDateString: function (nd) {
            var a = [], dt = isDate(nd) ? nd : _d;
            m = dt.getMonth() + 1, d = dt.getDate(), sep = arguments[1] ? arguments[1] : isString(arguments[0]) ? arguments[0] : "-";
            a.push(dt.getFullYear());
            a.push(m.toString().length < 2 ? "0" + m : m);
            a.push(d.toString().length < 2 ? "0" + d : d);
            return a.join(sep);
        },
        /**
         * ��ȡ���ں�ʱ��
         * @param {string} sep �ָ��� Ĭ��Ϊ-
         * @return {string} yyyy-mm-dd hh:ii:ss
         */
        toDateTimeString: function (nd) {
            var dt = isDate(nd) ? nd : _d, h = dt.getHours(), i = dt.getMinutes(), s = dt.getSeconds(), a = [];
            a.push(h.toString().length < 2 ? "0" + h : h);
            a.push(i.toString().length < 2 ? "0" + i : i);
            a.push(s.toString().length < 2 ? "0" + s : s);
            return date.toDateString.apply(this, arguments) + " " + a.join(":");
        },
        /**
         * �Ƿ�����
         * @param {int} year ���
         * @return {bool} ��/��
         */
        isLeapYear: function (year) {
            return 0 == year % 4 && (year % 100 != 0 || year % 400 == 0);
        },
        /**
         * ��ȡ������ʱ��
         * @return {date} Date
         */
        getSeverDateTime: function () {
            var xhr = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            xhr.open("HEAD", window.location.href, false);
            xhr.send();
            var d = new Date(xhr.getResponseHeader("Date"));
            return d;
        }
    });
})(core.date);

namespace("core.number");

(function (number) {
    extend(number, {
        /**
         * �Ƿ�ĳһ��Χ������
         * @param {int} n ��ֵ
         * @param {int} iMin ��Χ��ֵ
         * @param {int} iMax ��Χ��ֵ
         * @return {bool} 
         */
        isInt: function (n, iMin, iMax) {
            if (!isFinite(n)) {
                return false;
            }
            if (!/^[+-]?\d+$/.test(n)) {
                return false;
            }
            if (iMin != undefined && parseInt(n) < parseInt(iMin)) {
                return false;
            }
            if (iMax != undefined && parseInt(n) > parseInt(iMax)) {
                return false;
            }
            return true;
        },
        /**
         * �Ƿ�ĳһ��Χ������
         * @param {float} n ��ֵ
         * @param {float} fMin ��Χ��ֵ
         * @param {float} fMax ��Χ��ֵ
         * @return {bool} 
         */
        isFloat: function (n, fMin, fMax) {
            if (!isFinite(n)) {
                return false;
            }
            if (fMin != undefined && parseFloat(n) < parseFloat(fMin)) {
                return false;
            }
            if (fMax != undefined && parseFloat(n) > parseFloat(fMax)) {
                return false;
            }
            return true;
        },
        /**
         * �Ƿ�QQ����
         * @param {int} qq qq��
         * @return {bool} 
         */
        isQQ: function (qq) {
            return /^[1-9]{1}\d{4,11}$/.test(qq);
        },
        /**
         * ȡ�������
         * @param {int} n ����
         * @return {int} 0~n����������
         */
        randomInt: function (n) {
            return Math.floor(Math.random() * n);
        }
    });
})(core.number);

namespace("core.event");

(function (event) {
    extend(event, {
        /**
         * ֹͣ�¼���������
         * @param {event} e �¼�
         * @return {dom} 
         */
        preventDefault: function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        /**
         * ��ֹ�¼�ð�ݴ���
         * @param {event} e �¼�
         * @return {dom} 
         */
        stopPropagation: function (e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        },
        /**
         * ΪDOM���������¼�
         * @param {dom} element dom����
         * @param {string} type �¼�����
         * @param {function} type �¼�����
         * @return {undefined} 
         */
        addEvent: function (el, type, fn) {
            if (window.addEventListener) {
                el["e" + type + fn] = fn;
                el[type + fn] = function (e) {
                    var _e = e || window.event, _r = el["e" + type + fn](_e);
                    if (_r == false) {
                        event.preventDefault(_e);
                        event.stopPropagation(_e);
                    }
                };
                el.addEventListener(type, el[type + fn], false);
            } else if (window.attachEvent) {
                el["e" + type + fn] = fn;
                el[type + fn] = function (e) {
                    var _r = el["e" + type + fn](window.event);
                    if (_r == false) event.preventDefault(window.event);
                };
                el.attachEvent("on" + type, el[type + fn]);
                return;
            } else {
                el["on" + type] = fn;
            }
        },
        /**
         * ΪDOM�����Ƴ��¼�
         * @param {dom} element dom����
         * @param {string} type �¼�����
         * @param {function} type �¼�����
         * @return {undefined} 
         */
        removeEvent: function (el, type, fn) {
            if (window.removeEventListener) {
                el.removeEventListener(type, el[type + fn], false);
                el[type + fn] = null;
            } else if (window.detachEvent) {
                el.detachEvent("on" + type, el[type + fn]);
                el[type + fn] = null;
                return;
            } else {
                el["on" + type] = null;
            }
        },
        tapEvent: function (el, fn) {
            var before = 0, after = 0, calcel = false;
            el.addEventListener("touchstart", function (event) {
                before = event.timeStamp;
                calcel = false
            });
            el.addEventListener("touchmove", function (event) {
                calcel = true
            });
            el.addEventListener("touchend", function (event) {
                after = event.timeStamp;
                if (!calcel && after - before < 500) fn.call(this)
            })
        }
    });
})(core.event);

namespace("core.object");

(function (object) {
    extend(object, {
        /**
         * ���л�JSON����
         * ��objectת��Ϊurl�����ַ����������Լ���&�ָ�����a=1&b=2&c=3
         * ��������Ϊstring �����encodeURIComponent����
         * ��������Ϊbool ����0����false 1����true
         * ��������Ϊ�������������еݹ����л�
         * ��������Ϊfunction �򷵻�function.toString
         * @param {object} jsonObj json����
         * @return {string}
         */
        serialize: function (jsonObj) {
            var newJsonObj = null;
            if (typeof jsonObj == "undefined" || typeof jsonObj == "function") newJsonObj = "";
            if (typeof jsonObj == "number") newJsonObj = jsonObj.toString();
            if (typeof jsonObj == "boolean") newJsonObj = jsonObj ? "1" : "0";
            if (typeof jsonObj == "object") {
                if (!jsonObj) newJsonObj = "";
                if (jsonObj instanceof RegExp) newJsonObj = jsonObj.toString();
            }
            if (typeof jsonObj == "string") newJsonObj = jsonObj;
            if (typeof newJsonObj == "string") return encodeURIComponent(newJsonObj);
            var ret = [];
            if (jsonObj instanceof Array) {
                for (var i = 0; i < jsonObj.length; i++) {
                    if (typeof jsonObj[i] == "undefined") continue;
                    ret.push(typeof jsonObj[i] == "object" ? "" : object.serialize(jsonObj[i]));
                }
                return ret.join("|");
            } else {
                for (var i in jsonObj) {
                    if (typeof jsonObj[i] == "undefined") continue;
                    newJsonObj = null;
                    if (typeof jsonObj[i] == "object") {
                        if (jsonObj[i] instanceof Array) {
                            newJsonObj = jsonObj[i];
                            ret.push(i + "=" + object.serialize(newJsonObj));
                        } else {
                            ret.push(i + "=");
                        }
                    } else {
                        newJsonObj = jsonObj[i];
                        ret.push(i + "=" + object.serialize(newJsonObj));
                    }
                }
                return ret.join("&");
            }
        },
        /**
         * �����л�ΪJSON����
         * ��url������ʽ�Ķ������л���ΪJSON����
         * ��serialize���Ӧ
         * @param {object} jsonObj json����
         * @return {string}
         */
        unSerialize: function (jsonStr, de) {
            de = de || 0;
            jsonStr = jsonStr.toString();
            if (!jsonStr) return {};
            var retObj = {}, obj1Ret = jsonStr.split("&");
            if (obj1Ret.length == 0) return retObj;
            for (var i = 0; i < obj1Ret.length; i++) {
                if (!obj1Ret[i]) continue;
                var ret2 = obj1Ret[i].split("=");
                if (ret2.length >= 2) {
                    var ret0 = obj1Ret[i].substr(0, obj1Ret[i].indexOf("=")), ret1 = obj1Ret[i].substr(obj1Ret[i].indexOf("=") + 1);
                    if (!ret1) ret1 = "";
                    if (ret0) retObj[ret0] = de == 0 ? decodeURIComponent(ret1) : ret1;
                }
            }
            return retObj;
        },
        /**
         * ������object����utf8��ʽ��url����
         * @param {object} newopt �������
         * @return {object} �ѽ������
         */
        decode: function (newopt) {
            if (typeof newopt == "string") {
                try {
                    return decodeURIComponent(newopt);
                } catch (e) { }
                return newopt;
            }
            if (typeof newopt == "object") {
                if (newopt == null) {
                    return null;
                }
                if (newopt instanceof Array) {
                    for (var i = 0; i < newopt.length; i++) {
                        newopt[i] = object.decode(newopt[i]);
                    }
                    return newopt;
                } else if (newopt instanceof RegExp) {
                    return newopt;
                } else {
                    for (var i in newopt) {
                        newopt[i] = object.decode(newopt[i]);
                    }
                    return newopt;
                }
            }
            return newopt;
        }
    });
})(core.object);

/**
 * ������չ��core����
*/
extend(core, core.loader);

extend(core, core.dom);

extend(core, core.array);

extend(core, core.string);

extend(core, core.cookie);

extend(core, core.date);

extend(core, core.number);

extend(core, core.event);

extend(core, core.object);