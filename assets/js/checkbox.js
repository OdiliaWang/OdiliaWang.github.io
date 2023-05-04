$(function () {
    $("#uHadRead").click(function () {
      $("#uApply").prop("disabled", !$("#uHadRead:checked").length);
    });
  });
  