var contractList, checkAll = document.getElementById("checkAll"),
    perPage = (checkAll && (checkAll.onclick = function() {
        var e = document.querySelectorAll(' ');
        1 == checkAll.checked ? Array.from(e).forEach(function(e) {
            e.checked = !0, e.closest("tr").classList.add("table-active")
        }) : Array.from(e).forEach(function(e) {
            e.checked = !1, e.closest("tr").classList.remove("table-active")
        })
    }), 23),
    editlist = !1,
    options = {
        valueNames: ["id", "contract_name", "status"],
        page: perPage,
        pagination: !0,
        plugins: [ListPagination({
            left: 2,
            right: 2
        })]
    };
document.getElementById("contractList") && (contractList = new List("contractList", options).on("updated", function(e) {
    0 == e.matchingItems.length ? document.getElementsByClassName("noresult")[0].style.display = "block" : document.getElementsByClassName("noresult")[0].style.display = "none";
    var t = 1 == e.i,
        a = e.i > e.matchingItems.length - e.page;
    document.querySelector(".pagination-prev.disabled") && document.querySelector(".pagination-prev.disabled").classList.remove("disabled"), document.querySelector(".pagination-next.disabled") && document.querySelector(".pagination-next.disabled").classList.remove("disabled"), t && document.querySelector(".pagination-prev").classList.add("disabled"), a && document.querySelector(".pagination-next").classList.add("disabled"), e.matchingItems.length <= perPage ? document.querySelector(".pagination-wrap").style.display = "none" : document.querySelector(".pagination-wrap").style.display = "flex", e.matchingItems.length == perPage && document.querySelector(".pagination.listjs-pagination").firstElementChild.children[0].click(), 0 < e.matchingItems.length ? document.getElementsByClassName("noresult")[0].style.display = "none" : document.getElementsByClassName("noresult")[0].style.display = "block"
}));
const xhttp = new XMLHttpRequest;
xhttp.onload = function() {
    var e = JSON.parse(this.responseText);
    Array.from(e).forEach(e => {
        contractList.add({
            id: '<h6>' + e.id + "</h6>",
            contract_name: '<a href="javascript:void(0);" class="text-wrap text-dark"><h6>' + e.contract_name + "</h6></a>",
            status: isStatus(e.status)
        }), contractList.sort("status", {
        }), refreshCallbacks()
    }), contractList.remove("", '')
}, xhttp.open("GET", "assets/json/2table-contracts-list.json"), xhttp.send();
var isValue = (isCount = (new DOMParser).parseFromString(contractList.items.slice(-1)[0]._values.id, "text/html")).body.firstElementChild.innerHTML,
    idField = document.getElementById("id-field"),
    customerNameField = document.getElementById("customername-field"),
    emailField = document.getElementById("email-field"),
    dateField = document.getElementById("date-field"),
    phoneField = document.getElementById("phone-field"),
    statusField = document.getElementById("status-field"),
    addBtn = document.getElementById("add-btn"),
    editBtn = document.getElementById("edit-btn"),
    removeBtns = document.getElementsByClassName("remove-item-btn"),
    editBtns = document.getElementsByClassName("edit-item-btn");



function isStatus(e) {
    switch (e) {
        case "未簽署":
            return '<button type="button" class="btn btn-xs btn-primary">' + e + "</button>";
        case "已簽署":
            return '<button type="button" class="btn btn-xs btn-soft-light" disabled>' + e + "</span>"
    }
}


function refreshCallbacks() {
    removeBtns && Array.from(removeBtns).forEach(function(e) {
        e.addEventListener("click", function(e) {
            e.target.closest("tr").children[1].innerText, itemId = e.target.closest("tr").children[1].innerText;
            e = contractList.get({
                id: itemId
            });
            Array.from(e).forEach(function(e) {
                var t = (deleteid = (new DOMParser).parseFromString(e._values.id, "text/html")).body.firstElementChild;
                deleteid.body.firstElementChild.innerHTML == itemId && document.getElementById("delete-record").addEventListener("click", function() {
                    contractList.remove("id", t.outerHTML), document.getElementById("deleteRecordModal").click()
                })
            })
        })
    }), editBtns && Array.from(editBtns).forEach(function(e) {
        e.addEventListener("click", function(e) {
            e.target.closest("tr").children[1].innerText, itemId = e.target.closest("tr").children[1].innerText;
            e = contractList.get({
                id: itemId
            });
            Array.from(e).forEach(function(e) {
                var t = (isid = (new DOMParser).parseFromString(e._values.id, "text/html")).body.firstElementChild.innerHTML;
                t == itemId && (editlist = !0, idField.value = t, customerNameField.value = e._values.contract_name, emailField.value = e._values.email, dateField.value = e._values.date, phoneField.value = e._values.phone, statusVal && statusVal.destroy(), statusVal = new Choices(statusField), t = (val = (new DOMParser).parseFromString(e._values.status, "text/html")).body.firstElementChild.innerHTML, statusVal.setChoiceByValue(t), flatpickr("#date-field", {
                    dateFormat: "d M, Y",
                    defaultDate: e._values.date
                }))
            })
        })
    })
}
