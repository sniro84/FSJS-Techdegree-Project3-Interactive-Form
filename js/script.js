
// perform these actions when the page loads
$(document).ready(function() {
    // set focus on the name input
    $('#name').focus();

    // hide 'other title' by default
    $('#other-title').hide();

    // hide the "Select Theme" message once user clicks design drop-down list
    $('#design').find('option:contains("Select Theme")').hide();

    // hide colors from color drop-down list
    $('#color option').hide();

    // show a message to the user in the color drop-down list
    const $optionMessage = $('<option></option>').text("Please select a T-shirt theme");
    $('#color').append($optionMessage);
    $('#color').val($optionMessage.val());
});


// other-title text field will only appear if other option will be selected.
const $jobRole = $('#title');
$jobRole.change(function() {
    ($jobRole.val() === 'other') ? $('#other-title').show() : $('#other-title').hide(); 
});

// display only the colors that matches the selected design
$('#design').change(function() {
    if ($('#design').val() === 'js puns')
        changeTheme('js-puns');
    else if ($('#design').val() === 'heart js')
        changeTheme('heart-js');
});

// creating a headline for the total display
const $totalDisplay = $('<h2></h2>').text("");
$('.activities').append($totalDisplay);

// total cost value
let $totalCost = 0;

// respond to user when a box is checked/unchecked
$('input[type="checkbox"]').change(function() {
    const $textContent = $(this).parent().text();
    const $dollarSignIndex = ($textContent).indexOf('$');
    const $cost = parseInt(($textContent).slice($dollarSignIndex + 1));

    // update total cost according to user clicks
    if (this.checked)
        $totalCost += $cost;
    else
        $totalCost -= $cost;
    ($totalDisplay).text("Total: $" + $totalCost);

    // continue from here --> disable conflictiong activities


    // console.log(this);
    // console.log($textContent);
    // console.log($dollarSignIndex);
    // console.log($cost);
    // console.log(typeof($cost));
    // console.log(this.checked);
    
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

    // select the color options
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




 	

 	



