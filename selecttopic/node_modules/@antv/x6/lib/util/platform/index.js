"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
var ua = navigator.userAgent;
var Platform;
(function (Platform) {
    Platform.IS_MAC = navigator.appVersion.indexOf('Mac') > 0;
    Platform.IS_IOS = !!ua.match(/(iPad|iPhone|iPod)/g);
    Platform.IS_WINDOWS = navigator.appVersion.indexOf('Win') > 0;
    Platform.IS_IE = ua.indexOf('MSIE') >= 0;
    Platform.IS_IE11 = !!ua.match(/Trident\/7\./);
    Platform.IS_EDGE = !!ua.match(/Edge\//);
    /**
     * A flag indicating whether the browser is Netscape (including Firefox).
     */
    Platform.IS_NETSCAPE = ua.indexOf('Mozilla/') >= 0 &&
        ua.indexOf('MSIE') < 0 &&
        ua.indexOf('Edge/') < 0;
    /**
     * A flag indicating whether the the this is running inside a Chrome App.
     */
    Platform.IS_CHROME_APP = window.chrome != null &&
        window.chrome.app != null &&
        window.chrome.app.runtime != null;
    Platform.IS_CHROME = ua.indexOf('Chrome/') >= 0 && ua.indexOf('Edge/') < 0;
    Platform.IS_OPERA = ua.indexOf('Opera/') >= 0 || ua.indexOf('OPR/') >= 0;
    Platform.IS_FIREFOX = ua.indexOf('Firefox/') >= 0;
    Platform.IS_SAFARI = ua.indexOf('AppleWebKit/') >= 0 &&
        ua.indexOf('Chrome/') < 0 &&
        ua.indexOf('Edge/') < 0;
    /**
     * A flag indicating whether this device supports touchstart/-move/-end
     * events (Apple iOS, Android, Chromebook and Chrome Browser on touch-enabled
     * devices).
     */
    Platform.SUPPORT_TOUCH = 'ontouchstart' in document.documentElement;
    /**
     * A flag indicating whether this device supports Microsoft pointer events.
     */
    Platform.SUPPORT_POINTER = window.PointerEvent != null && !Platform.IS_MAC;
    Platform.SUPPORT_PASSIVE = false; // eslint-disable-line import/no-mutable-exports
    try {
        var options = Object.defineProperty({}, 'passive', {
            get: function () {
                Platform.SUPPORT_PASSIVE = true;
            },
        });
        var div = document.createElement('div');
        if (div.addEventListener) {
            div.addEventListener('click', function () { }, options);
        }
    }
    catch (err) {
        // pass
    }
    /**
     * A flag indicating whether foreignObject support is not available. This
     * is the case for Opera, older SVG-based browsers and all versions of IE.
     */
    Platform.NO_FOREIGNOBJECT = !document.createElementNS ||
        "" + document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject') !== '[object SVGForeignObjectElement]' ||
        ua.indexOf('Opera/') >= 0;
    Platform.SUPPORT_FOREIGNOBJECT = !Platform.NO_FOREIGNOBJECT;
})(Platform = exports.Platform || (exports.Platform = {}));
(function (Platform) {
    function getHMRStatus() {
        var mod = window.module;
        if (mod != null && mod.hot != null && mod.hot.status != null) {
            return mod.hot.status();
        }
        return 'unkonwn';
    }
    Platform.getHMRStatus = getHMRStatus;
    function isApplyingHMR() {
        return getHMRStatus() === 'apply';
    }
    Platform.isApplyingHMR = isApplyingHMR;
    // This function checks if the specified event is supported by the browser.
    // Source: http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
    var TAGNAMES = {
        select: 'input',
        change: 'input',
        submit: 'form',
        reset: 'form',
        error: 'img',
        load: 'img',
        abort: 'img',
    };
    function isEventSupported(event) {
        var elem = document.createElement(TAGNAMES[event] || 'div');
        var eventName = "on" + event;
        var isSupported = eventName in elem;
        if (!isSupported) {
            elem.setAttribute(eventName, 'return;');
            isSupported = typeof elem[eventName] === 'function';
        }
        return isSupported;
    }
    Platform.isEventSupported = isEventSupported;
})(Platform = exports.Platform || (exports.Platform = {}));
//# sourceMappingURL=index.js.map