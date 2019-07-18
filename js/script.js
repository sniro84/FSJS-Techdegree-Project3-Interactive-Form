
$(document).ready(function() {
    // set focus on the name input
    $('#name').focus();

    // hide 'other title' by default
    $('#other-title').hide();

    // hide the "Select Theme" element
    $('#design').find('option:contains("Select Theme")').hide();

});

// other-title text field will only appear if other option will be selected.
const $jobRole = $('#title');
$jobRole.change(function() {
    ($jobRole.val() === 'other') ? $('#other-title').show() : $('#other-title').hide(); 
});

// make JS Puns the default theme
$('#design').val('js puns');
changeTheme('js-puns');

// display only the colors that matches the selected design
$('#design').change(function() {
    if ($('#design').val() === 'js puns')
        changeTheme('js-puns');
    else if ($('#design').val() === 'heart js')
        changeTheme('heart-js');
});



function changeTheme(theme)
{
    if (theme === 'js-puns')
        showColors("cornflowerblue","darkslategrey","gold");
    else  // (theme === 'heart-js')
        showColors("tomato","steelblue","dimgrey");        
}


function showColors(color1,color2,color3)
{
    // make first color the default choice from color drop-down list.
    $('#color').val(color1);

    // select the options
    $options = $('#color option');

    // if the option value (e.g color) equals one of the parameters, show it in the drop-down list. 
    $options.each( function(index, element) {
        switch (element.value)
        {
            case color1:  case color2:  case color3:
                $options.eq(index).show();
                break;
            default:
                $options.eq(index).hide();
        }    
    });
}




 	

 	



