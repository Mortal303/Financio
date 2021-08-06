function tooltips() {
    var o = $('[data-toggle="tooltip"]');
    $('[role="tooltip"]').remove(), o && o.data("bs.tooltip", !1).tooltip({
        container: "body",
        trigger: "hover"
    })
}

function popovers() {
    $('[data-toggle="popover"]').popover()
}

function scrollTop(o, t) {
    $("html,body").animate({
        scrollTop: o
    }, t)
}

function numberWithCommas(o) {
    return o.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function urlParam(o) {
    var t = new RegExp("[?&]" + o + "=([^&#]*)").exec(window.location.href);
    return null == t ? null : t[1] || 0
}

function urlParamString(o, t) {
    var n = new RegExp("[?&]" + o + "=([^&#]*)").exec(t);
    return null == n ? null : n[1] || 0
}

function dropdownLg() {
    $(".dropdown.click .dropdown-menu").on("click.bs.dropdown", function(o) {
        $("#ui-datepicker-div").on("click", function() {}), o.stopPropagation()
    })
}

function isUppercase(o) {
    return o === o.toUpperCase()
}

function affixNav(o, t) {
    var n = $(".navbar").outerHeight(!0) + 20,
        e = $("#" + t).offset().top - n;
    $("#" + o).affix({
        offset: {
            top: function() {
                return e
            },
            bottom: function() {
                return $(".footer-wrapper").outerHeight(!0) + 80
            }
        }
    }).css("top", n + "px").css("width", $("#" + o).outerWidth(!0) + "px"), $("#" + o).on("affix.bs.affix", function() {
        $(this).css("top", n)
    })
}

function scrollSpyNav(o) {
    var t = $(".navbar").outerHeight(!0) + 20;
    $("body").css("position", "relative").scrollspy({
        target: "#" + o,
        offset: t
    })
}

function backToTop() {
    var o = $(document).height() / 2;
    $(window).scroll(function() {
        $(window).scrollTop() > o ? $("#back-to-top").css("opacity", "1") : $("#back-to-top").css("opacity", "0")
    })
}

function validateEmail(o) {
    return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(o)
}

function validateDomain(o) {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(o)
}

function dayDiff(o, t) {
    var o = new Date(o),
        t = new Date(t);
    return Math.round((t - o) / 864e5)
}

function toGetParams(o) {
    if (o) return $.param(o)
}

function fixedEncodeURIComponent(o) {
    return encodeURIComponent(o).replace(/[!'()*]/g, function(o) {
        return "%" + o.charCodeAt(0).toString(16)
    })
}
var commonData = {
        navbarToggle: {
            navbarIcon: "fa-bars",
            toggleIcon: !0
        },
        backToTop: ""
    },
    mixinsMethods = {},
    commonMethods = {
        methods: {
            toggleMobileNav: function() {
                commonData.navbarToggle.navbarIcon = "fa-times" === commonData.navbarToggle.navbarIcon ? "fa-bars" : "fa-times"
            },
            setBackToTopOpacity: function(o) {
                if (this.$refs.backToTop) {
                    var t = app.offsetHeight / 2;
                    commonData.backToTop = o >= t ? "opacity:1" : "opacity:0"
                }
            },
            scrollToTop: function(o, t) {
                scrollTop(o, t)
            },
            scrollToDiv: function(o) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                    n = document.getElementById(o),
                    e = n.offsetTop;
                t && (e -= t), scrollTop(e, 1e3)
            },
            initTooltip: function() {
                tooltips()
            },
            initPopover: function() {
                popovers()
            },
            strLowerCase: function(o) {
                return o.toLowerCase()
            },
            existCookie: function(o) {
                return this.$cookie.isKey(o)
            },
            getCookie: function(o) {
                var t = this.$cookie.get(o);
                return "null" == t && (t = null), t
            },
            setCookie: function(o, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                this.$cookie.set(o, t, n)
            },
            deleteCookie: function(o) {
                this.$cookie.delete(o)
            },
            formatThousand: function(o) {
                var t = o.toString().split(".");
                return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), t.join(".")
            }
        }
    };
$(function() {
    tooltips(), popovers(), dropdownLg(), backToTop()
});