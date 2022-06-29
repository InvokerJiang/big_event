$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length > 6) {
                return '昵称长度必须在1到6个字符之间'
            }   
        }
    })
    initUserInfo()
    function initUserInfo () {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status !== 0)
                {
                    return layer.msg('获取用户信息失败!')
                } 
                console.log(res)
                form.val('formUserInfo',res.data)
            }
        })
    }
    $('#resetBtn').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新用户信息成功')
                window.parent.getUserInfo ()
            }
        })
    })
})
