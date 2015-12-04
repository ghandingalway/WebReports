/**
 * Created by stephen.hand on 04/12/2015.
 */
var tableGenerator = (function(){
    return function(element, data){
        if (data.length)       {
            var columns = [];
            for(prop in data[0]){
                columns.push({title:prop, data:prop});
            }
            element.DataTable({
                columns:columns,
                data:data
            });
        }

    }
})();