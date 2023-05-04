var str_dt = function(e) {
    var e = new Date(e),
        t = (e.getHours() + ":" + e.getMinutes()).split(":"),
        a = 12 <= (n = t[0]) ? "PM" : "AM",
        n = (n %= 24) < 10 ? "0" + n : n ,
        t = (t = t[1]) < 10 ? "0" + t : t;
        return month = "" + ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"][e.getMonth()], day = "" + e.getDate(), year = e.getFullYear(), month.length < 2 && (month = "0" + month), [year + "/" + month + "/" + (day = day.length < 2 ? "0" + day : day) + " <small class='text-muted'>" + n + ":" + t + " " + a + "</small>"]},

checkAll = document.getElementById("checkAll"),
perPage = (checkAll && (checkAll.onclick = function() {
    for (var e = document.querySelectorAll('.form-check-all input[type="checkbox"]'), t = document.querySelectorAll('.form-check-all input[type="checkbox"]:checked').length, a = 0; a < e.length; a++) e[a].checked = this.checked, e[a].checked ? e[a].closest("tr").classList.add("table-active") : e[a].closest("tr").classList.remove("table-active");
    document.getElementById("remove-actions").style.display = 0 < t ? "none" : "block"
}), 8),
editlist = !1,
options = {
    valueNames: ["id", "date", "amount", "type", "value", "status"],
    page: perPage,
    pagination: !0,
    plugins: [ListPagination({
        left: 2,
        right: 2
    })]
},
orderList = new List("orderList", options).on("updated", function(e) {
    0 == e.matchingItems.length ? document.getElementsByClassName("noresult")[0].style.display = "block" : document.getElementsByClassName("noresult")[0].style.display = "none";
    var t = 1 == e.i,
        a = e.i > e.matchingItems.length - e.page;
    document.querySelector(".pagination-prev.disabled") && document.querySelector(".pagination-prev.disabled").classList.remove("disabled"), document.querySelector(".pagination-next.disabled") && document.querySelector(".pagination-next.disabled").classList.remove("disabled"), t && document.querySelector(".pagination-prev").classList.add("disabled"), a && document.querySelector(".pagination-next").classList.add("disabled"), e.matchingItems.length <= perPage ? document.querySelector(".pagination-wrap").style.display = "none" : document.querySelector(".pagination-wrap").style.display = "flex", e.matchingItems.length == perPage && document.querySelector(".pagination.listjs-pagination").firstElementChild.children[0].click(), 0 < e.matchingItems.length ? document.getElementsByClassName("noresult")[0].style.display = "none" : document.getElementsByClassName("noresult")[0].style.display = "block"
});
const xhttp = new XMLHttpRequest;
xhttp.onload = function() {
var e = JSON.parse(this.responseText);
Array.from(e).forEach(function(e) {
    orderList.add({
        id: e.id,
        date: str_dt(e.date),
        amount: e.amount,
        type: e.type,
        value: e.value,
        status: isStatus(e.status)
    }), orderList.sort("id", {
        order: "desc"
    }), refreshCallbacks()
}), orderList.remove("id",)
}, xhttp.open("GET", "assets/json/5ebba-list.init.json"), xhttp.send();
var isValue = (isCount = (new DOMParser).parseFromString(orderList.items.slice(-1)[0]._values.id, "text/html")).body.firstElementChild.innerHTML,
idField = document.getElementById("orderId"),
productNameField = document.getElementById("productname-field"),
dateField = document.getElementById("date-field"),
amountField = document.getElementById("amount-field"),
typeField = document.getElementById("type-field"),
removeBtns = document.getElementsByClassName("remove-item-btn"),
tabEl = (refreshCallbacks(), document.querySelectorAll('a[data-bs-toggle="tab"]'));

function SearchData() {
    var i = document.getElementById("idStatus").value,
        l = document.getElementById("demo-datepicker").value,
        n = l.split(" to ")[0],
        r = l.split(" to ")[1];
    orderList.filter(function(e) {
        var t = (matchData = (new DOMParser).parseFromString(e.values().status, "text/html")).body.firstElementChild.innerHTML,
            a = !1,
            s = !1,
            a = "all" == t || "all" == i || t == i,
            s = new Date(e.values().due_date.slice(0, 12)) >= new Date(n) && new Date(e.values().due_date.slice(0, 12)) <= new Date(r);
        return a && s || (a && "" == l ? a : s && "" == l ? s : void 0)
    }), orderList.update()
}

function filterOrder(e) {
var t = e;
orderList.filter(function(e) {
    e = (matchData = (new DOMParser).parseFromString(e.values().type, "text/html")).body.firstElementChild.innerHTML;
    return "All" == e || "All" == t || e == t
}), orderList.update()
}


function SearchData() {
var s = document.getElementById("").value,
    r = document.getElementById("idtype").value,
    i = document.getElementById("demo-datepicker").value,
    d = i.split(" to ")[0],
    o = i.split(" to ")[1];
orderList.filter(function(e) {
    var t = (matchData = (new DOMParser).parseFromString(e.values().status, "text/html")).body.firstElementChild.innerHTML,
        a = !1,
        n = !1,
        l = !1,
        a = "all" == t || "all" == s || t == s,
        n = "all" == e.values().type || "all" == r || e.values().type == r,
        l = new Date(e.values().date.slice(0, 12)) >= new Date(d) && new Date(e.values().date.slice(0, 12)) <= new Date(o);
    return a && n && l || (a && n && "" == i ? a && n : n && l && "" == i ? n && l : void 0)
}), orderList.update()
}

function isStatus(e) {
    switch (e) {   
        case "成功":
            return '<span class="badge badge-soft-primary text-uppercase">' + e + "</span>";
        case "取消":
            return '<span class="badge badge-soft-secondary text-uppercase">' + e + "</span>";
        case "失敗":
            return '<span class="badge badge-soft-danger text-uppercase">' + e + "</span>"
    }
}

function refreshCallbacks() {
    removeBtns && Array.from(removeBtns).forEach(function(e) {
        e.addEventListener("click", function(e) {
            e.target.closest("tr").children[1].innerText, itemId = e.target.closest("tr").children[1].innerText;
            e = orderList.get({
                id: itemId
            });
            Array.from(e).forEach(function(e) {
                var t = (deleteid = (new DOMParser).parseFromString(e._values.id, "text/html")).body.firstElementChild;
                deleteid.body.firstElementChild.innerHTML == itemId && document.getElementById("delete-record").addEventListener("click", function() {
                    orderList.remove("id", t.outerHTML), document.getElementById("deleteRecord-close").click()
                })
            })
        })
    })
}


document.querySelector(".pagination-next").addEventListener("click", function() {
    document.querySelector(".pagination.listjs-pagination") && document.querySelector(".pagination.listjs-pagination").querySelector(".active") && document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click()
    }), document.querySelector(".pagination-prev").addEventListener("click", function() {
    document.querySelector(".pagination.listjs-pagination") && document.querySelector(".pagination.listjs-pagination").querySelector(".active") && document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click()
    });

