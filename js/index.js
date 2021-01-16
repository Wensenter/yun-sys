//#region 公共方法
// 返回上一级
$('.back-btn').click(function(){
    window.history.back();
})

//#endregion

//#region record-order-data
// 切换tab
$('.tab-switch').click(function(){
    let curIndex = $(this).attr('data-index')
  
    $('.tab-switch').removeClass('active')
    $(this).addClass('active')
    $('.data-tab-item').each((index,item) => {
       
        if($(item).attr('data-index') == curIndex) {
            $(item).removeClass('d_none')
        } else {
            $(item).addClass('d_none')
        }
    })
})
$('#toggleRecord').click(function() {
    $(this).toggleClass('active')
    if(!$(this).hasClass('active')) {
        $(this).parent('.record-info').find('.record-info-body').addClass('d_none')
    } else {
        $(this).parent('.record-info').find('.record-info-body').removeClass('d_none')
    }
})
//#endregion

//#region record-order-phase
// $('.check-btns').click(function() {
//     $('.modal-wrap').removeClass('d_none')
// })
// $('.modal-wrap .icon-close').click(function() {
//     $('.modal-wrap').addClass('d_none')
// })
// $('.modal-wrap .cancel-btn').click(function() {
//     $('.modal-wrap').addClass('d_none')
// })
// $('.modal-wrap .sure-btn').click(function() {
//     $('.modal-wrap').addClass('d_none')
// })
//#endregion

//#region record-ip.html
// 输入框获取焦点
$('.record-search').focus(function(){
    let curVal = $(this).val()
    $(this).parent('.record-input-box').removeClass('no-empty')
})
// 输入框失去焦点
$('.record-search').blur(function(){
    let curVal = $(this).val()
    if(!curVal) $(this).parent('.record-input-box').addClass('no-empty')
})
// 根据输入框搜索
$('.update-btn').click(function(){
    let curVal = $('.record-search').val()
    console.log('去搜索');
})

// 取消输入框内容1
$('.cross-btn').click(function(){
    $('.record-search').val('')
    $(this).parent('.record-input-box').addClass('no-empty')
})
// 取消输入框内容2
$('.cancel-btn').click(function(){
    $('.record-search').val('')
    $(this).parent('.record-input-box').addClass('no-empty')
})

// 粘贴复制
$('.copy-btn').click(function(){
    let curVal = $(this).parent('.record-ips-item').find('.copy-text').text()
    $('.copy-area').val(curVal)
    $('.copy-area').select()
    document.execCommand("copy");
    alert('复制成功：' + curVal)
})

//#endregion





