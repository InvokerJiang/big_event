$(function(){
    $('#reg_link').on('click',function(){
        $('.reg_box').show()
        $('.login_box').hide()
    })
    $('#login_link').on('click',function(){
        $('.reg_box').hide()
        $('.login_box').show()
    })
    var form = layui.form
    var layer = layui.layer
    form.verify({
    pwd:[/^[\S]{6,12}$/
    ,'密码必须6到12位,且不能出现空格'],
    repwd:function(value){
        var psw = $('.reg_box [name=password]').val()
        if (psw !== value) {
            return '两次输入的密码不一致'
        }
    }
    })
    $('#reg_form').on("submit",function(e){
        e.preventDefault()
        var data = {username:$('#reg_form [name=username]').val(),
        password: $('#reg_form [name=password]').val()}
        $.post('/api/reguser',data, 
    function(res){
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        layer.msg('注册成功')
        $('#login_link').click()
    })
    })
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            type:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0) {
                return    layer.msg(res.message)
                }
                layer.msg('登陆成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})

