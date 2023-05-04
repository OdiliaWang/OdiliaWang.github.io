var validList2,perPage=10,options=
{valueNames:["stock_no","stock_name","type","quantity_value","chargeback","extrafee","status",
        {name:"sort-price",attr:"data-price"},{name:"real_value",attr:"data-realvalue"}],              
                page:perPage,pagination:!0,plugins:[ListPagination({left:2,right:2})]},
                    validList2=document.getElementById("validList2");function filterData(){var o=document.getElementById("idStatus").value,l=document.getElementById("idType")
                        .value,r=document.getElementById("range-datepicker").value,s=r.split(" to ")[0],c=r.split(" to ")[1];
                            validList2.filter(function(e){var t=(matchData=(new DOMParser).parseFromString(e.values().status,"text/html"))
                                .body.firstElementChild.innerHTML,a=!1,n=!1,i=!1,a="all"==t||"all"==o||t==o,i="all"==e.values().type||"all"==l||e.values().type==l,
                                    n=new Date(e.values().order_date.slice(0,12))>=new Date(s)&&new Date(e.values().order_date.slice(0,12))<=new Date(c);
                                        return a&&i&&n||(a&&i&&""==r?a&&i:i&&n&&""==r?i&&n:void 0)}),
                                            validList2.update()}validList2&&(validList2=new List("validList2",options)
                                                .on("updated",function(e){0==e.matchingItems.length?document.getElementsByClassName("noresult")[0]
                                                    .style.display="block":document.getElementsByClassName("noresult")[0]
                                                        .style.display="none";
var t=1==e.i,a=e.i>e.matchingItems.length-e.page;document
    .querySelector(".pagination-prev.disabled")&&document
    .querySelector(".pagination-prev.disabled")
        .classList.remove("disabled"),document.querySelector(".pagination-next.disabled")&&document.querySelector(".pagination-next.disabled")
            .classList.remove("disabled"),t&&document.querySelector(".pagination-prev")
                .classList.add("disabled"),a&&document.querySelector(".pagination-next")
                    .classList.add("disabled"),e.matchingItems.length<=perPage?document.querySelector(".pagination-wrap")
                        .style.display="none":document.querySelector(".pagination-wrap")
                            .style.display="flex",0<e.matchingItems.length?document.getElementsByClassName("noresult")[0]
                                .style.display="none":document.getElementsByClassName("noresult")[0]
                                    .style.display="block"}),isCount=(new DOMParser)
                                        .parseFromString(validList2.items.slice(-1)[0]._values.id,"text/html"));
                                                                                                