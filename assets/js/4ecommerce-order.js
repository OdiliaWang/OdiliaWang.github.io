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
    valueNames: ["id", "product_name", "debitDay", "payment", "chargeback", "extrafee", "status"],
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
    document.querySelector(".pagination-prev.disabled") && document.querySelector(".pagination-prev.disabled").classList.remove("disabled"), 
    document.querySelector(".pagination-next.disabled") && document.querySelector(".pagination-next.disabled").classList.remove("disabled"), t && document.querySelector(".pagination-prev").classList.add("disabled"), a && document.querySelector(".pagination-next").classList.add("disabled"), e.matchingItems.length <= perPage ? document.querySelector(".pagination-wrap").style.display = "none" : document.querySelector(".pagination-wrap").style.display = "flex", e.matchingItems.length == perPage && document.querySelector(".pagination.listjs-pagination").firstElementChild.children[0].click(), 0 < e.matchingItems.length ? document.getElementsByClassName("noresult")[0].style.display = "none" : document.getElementsByClassName("noresult")[0].style.display = "block"
});
const xhttp = new XMLHttpRequest;
xhttp.onload = function() {
var e = JSON.parse(this.responseText);
Array.from(e).forEach(function(e) {
    orderList.add({
        id: e.id + "<br>" + e.product_name,
        date: str_dt(e.date),
        debitDay: e.debitDay,
        payment: e.payment,
        chargeback: e.chargeback,
        extrafee: e.extrafee,
        status: isStatus(e.status)
    }), orderList.sort("id", {
        order: "desc"
    }), refreshCallbacks()
})}, xhttp.open("GET", "assets/json/4orders-list.init.json"), xhttp.send();
var isValue = (isCount = (new DOMParser).parseFromString(orderList.items.slice(-1)[0]._values.id, "text/html")).body.firstElementChild.innerHTML,
idField = document.getElementById("orderId"),
productNameField = document.getElementById("productname-field"),
dateField = document.getElementById("date-field"),
debitDayField = document.getElementById("debitDay-field"),
paymentField = document.getElementById("payment-field"),
statusField = document.getElementById("delivered-status"),
addBtn = document.getElementById("add-btn"),
editBtn = document.getElementById("edit-btn"),
removeBtns = document.getElementsByClassName("remove-item-btn"),
editBtns = document.getElementsByClassName("edit-item-btn");

function filterOrder(e) {
var t = e;
orderList.filter(function(e) {
    e = (matchData = (new DOMParser).parseFromString(e.values().status, "text/html")).body.firstElementChild.innerHTML;
    return "All" == e || "All" == t || e == t
}), orderList.update()
}


function SearchData() {
var 
    i = document.getElementById("demo-datepicker").value,
    d = i.split(" to ")[0],
    o = i.split(" to ")[1];
orderList.filter(function(e) {
    var t = (matchData = (new DOMParser).parseFromString(e.values().status, "text/html")).body.firstElementChild.innerHTML,
        a = !1,
        n = !1,
        l = !1,
        a = "all" == t || "all" == s || t == s,
        n = "all" == e.values().payment || "all" == r || e.values().payment == r,
        l = new Date(e.values().date.slice(0, 12)) >= new Date(d) && new Date(e.values().date.slice(0, 12)) <= new Date(o);
    return a && n && l || (a && n && "" == i ? a && n : n && l && "" == i ? n && l : void 0)
}), orderList.update()
}

function isStatus(e) {
switch (e) {
    case "失敗":
        return '<span class="badge badge-soft-danger text-uppercase">' + e + "</span>";
    case "成功":
        return '<span class="badge badge-soft-primary text-uppercase">' + e + "</span>";
}
}

// function ischeckboxcheck() {
// Array.from(document.getElementsByName("checkAll")).forEach(function(a) {
//     a.addEventListener("change", function(e) {
//         1 == a.checked ? e.target.closest("tr").classList.add("table-active") : e.target.closest("tr").classList.remove("table-active");
//         var t = document.querySelectorAll('[name="checkAll"]:checked').length;
//         e.target.closest("tr").classList.contains("table-active"), document.getElementById("remove-actions").style.display = 0 < t ? "block" : "none"
//     })
// })
// }

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
}), editBtns && Array.from(editBtns).forEach(function(e) {
    e.addEventListener("click", function(e) {
        e.target.closest("tr").children[1].innerText, itemId = e.target.closest("tr").children[1].innerText;
        e = orderList.get({
            id: itemId
        });
        Array.from(e).forEach(function(e) {
            var t = (isid = (new DOMParser).parseFromString(e._values.id, "text/html")).body.firstElementChild.innerHTML;
            t == itemId && (editlist = !0, idField.value = t, customerNameField.value = e._values.customer_name, productNameField.value = e._values.product_name, dateField.value = e._values.date, debitDayField.value = e._values.debitDay, example && example.destroy(), example = new Choices(paymentField, {
                searchEnabled: !1
            }), t = e._values.payment, example.setChoiceByValue(t), productnameVal && productnameVal.destroy(), productnameVal = new Choices(productNameField, {
                searchEnabled: !1
            }), t = e._values.product_name, productnameVal.setChoiceByValue(t), statusVal && statusVal.destroy(), statusVal = new Choices(statusField, {
                searchEnabled: !1
            }), t = (val = (new DOMParser).parseFromString(e._values.status, "text/html")).body.firstElementChild.innerHTML, statusVal.setChoiceByValue(t), flatpickr("#date-field", {
                enableTime: !0,
                dateFormat: "d M, Y, h:i K",
                defaultDate: e._values.date
            }))
        })
    })
})
}

document.querySelector(".pagination-next").addEventListener("click", function() {
    document.querySelector(".pagination.listjs-pagination") && document.querySelector(".pagination.listjs-pagination").querySelector(".active") && document.querySelector(".pagination.listjs-pagination").querySelector(".active").nextElementSibling.children[0].click()
    }), document.querySelector(".pagination-prev").addEventListener("click", function() {
    document.querySelector(".pagination.listjs-pagination") && document.querySelector(".pagination.listjs-pagination").querySelector(".active") && document.querySelector(".pagination.listjs-pagination").querySelector(".active").previousSibling.children[0].click()
    });
// function clearFields() {
// customerNameField.value = "", productNameField.value = "", dateField.value = "", debitDayField.value = "", paymentField.value = "", example && example.destroy(), example = new Choices(paymentField), productnameVal && productnameVal.destroy(), productnameVal = new Choices(productNameField), statusVal && statusVal.destroy(), statusVal = new Choices(statusField)
// }

// function deleteMultiple() {
// ids_array = [];
// var e, t = document.querySelectorAll(".form-check [value=option1]");
// for (i = 0; i < t.length; i++) 1 == t[i].checked && (e = t[i].parentNode.parentNode.parentNode.querySelector("td a").innerHTML, ids_array.push(e));
// "undefined" != typeof ids_array && 0 < ids_array.length ? Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: !0,
//     confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
//     cancelButtonClass: "btn btn-danger w-xs mt-2",
//     confirmButtonText: "Yes, delete it!",
//     buttonsStyling: !1,
//     showCloseButton: !0
// }).then(function(e) {
//     if (e.value) {
//         for (i = 0; i < ids_array.length; i++) orderList.remove("id", '<a href="apps-ecommerce-order-details.html" class="fw-medium link-primary">' + ids_array[i] + "</a>");
//         document.getElementById("remove-actions").style.display = "none", document.getElementById("checkAll").checked = !1, Swal.fire({
//             title: "Deleted!",
//             text: "Your data has been deleted.",
//             icon: "success",
//             confirmButtonClass: "btn btn-info w-xs mt-2",
//             buttonsStyling: !1
//         })
//     }
// }) : Swal.fire({
//     title: "Please select at least one checkbox",
//     confirmButtonClass: "btn btn-info",
//     buttonsStyling: !1,
//     showCloseButton: !0
// })
// }
