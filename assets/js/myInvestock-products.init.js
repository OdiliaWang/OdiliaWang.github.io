function getChartColorsArray(e){if(null!==document.getElementById(e)){var t=document.getElementById(e).getAttribute("data-colors");if(t)return(t=JSON.parse(t)).map(function(e){var t=e.replace(" ","");if(-1===t.indexOf(",")){var o=getComputedStyle(document.documentElement).getPropertyValue(t);return o||t}e=e.split(",");return 2!=e.length?t:"rgba("+getComputedStyle(document.documentElement).getPropertyValue(e[0])+","+e[1]+")"});console.warn("data-colors atributes not found on",e)}}var options,chart,chartDonutBasicColors=getChartColorsArray("myInvestock-simple");chartDonutBasicColors&&(options={series:[44,55,41,17,15],labels:["Direct","Social","Email","Other","Referrals"],chart:{height:333,type:"donut"},legend:{position:"bottom"},stroke:{show:!1},dataLabels:{dropShadow:{enabled:!1}},colors:chartDonutBasicColors},(chart=new ApexCharts(document.querySelector("#myInvestock-simple"),options)).render());