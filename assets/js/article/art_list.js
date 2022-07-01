$(function(){
    var form = layui.form
    var laypage = layui.laypage
    var layer = layui.layer
    template.defaults.imports.dataFormat = function(date){
    const dt = new Date(date)
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth()+1)
    var d = padZero(dt.getDate())
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
    return  y + '-'+ m + '-'+ d + '     ' + hh + ':' + mm + ":" +ss
   }
   function padZero (n) {
    return   n > 9 ? n : "0" + n
   }
    var q = {
        pagenum:1,
        pagesize:2,
        cate_id: '',
        state: '',
    }
    initTable()
    initCate()
    function initTable() {
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status !== 0) {
                    return layui.layer.msg('获取文章列表失败！')
                }
                
            var htmlStr = template('tpl-table',res)
            $('tbody').html(htmlStr)
            renderPage(res.total)
            }
        })    
        
    }
    function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status !== 0) {
                    return layui.layer.msg('获取文章分类列表失败！')
                }
                var htmlStr = template('tpl-cate',res)
                
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    $('#choose_form').on('submit',function(e){
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state=state
        initTable()
    })
    function renderPage(total){
       laypage.render({
        elem:'art_page',
        count:total,
        limit:q.pagesize,
        curr:q.pagenum,
        layout:['count','limit','prev', 'page', 'next','skip'],
        limits:[2,3,5,10],
        jump:function(obj,first){
            // console.log(obj)
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            // console.log(obj.curr)
            if(!first) {
                initTable()
            }
        }
       })
    }
    $('tbody').on('click','.art-delete',function(){
        var len = $('.art-delete').length
        console.log(len)
        var id = $(this).attr("data-id")
        layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){   
            $.ajax({
                method:'GET',
                url:'/my/article/delete/' + id,
                success:function(res){
                    if(res.status !== 0) {
                        return layui.layer.msg('删除文章失败！')
                    }
                    layui.layer.msg('删除文章成功！')
                    if(len === 1){
                    q.pagenum = q.pagenum ===1?1:q.pagenum-1
                    }
                    initTable()                   
                }
            })
            layer.close(index)
          });
       
    })
})