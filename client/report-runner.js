/**
 * Created by stephen.hand on 03/12/2015.
 */
$(function(){
    $("#sql-send").click(function(){
        $.ajax("http://localhost:8080/api/query", {
            method:"POST",
            data:{sql:$("#sql-text")[0].value},
            success:function(result){
                barGraphGenerator($("#graph-box"), result);
                $("#result-box").html(JSON.stringify(result))
            }
        })
    })
});