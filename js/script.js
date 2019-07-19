// creating a headline for the total display
const $totalDisplay = $('<h2></h2>').text("");
$('.activities').append($totalDisplay);

// total cost value
let $totalCost = 0;

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
        showColors("JS Puns");
    else if ($('#design').val() === 'heart js')
        showColors("I ♥ JS"); 
});

// respond to user when a box is checked/unchecked
$('input[type="checkbox"]').change(function() {

    // actitivity description
    const $description = $(this).parent().text();

    // helper variables to store information from activity description
    const $dollarIndex = ($description).indexOf('$');
    const $dashIndex = ($description).indexOf('—');
    const $commaIndex = ($description).indexOf(',');
    const $time = ($description).slice($dashIndex + 2, $commaIndex);
    const $spaceIndex = ($time).indexOf(" "); 
    const $day = ($time).slice(0,$spaceIndex);
    const $hours = ($time).slice($spaceIndex + 1);

    // the cost of the clicked activity
    const $cost = parseInt(($description).slice($dollarIndex + 1));

    // the activity that has been clicked
    const $currentActivity = this;
    
    // update total cost according to user clicks
    if ($currentActivity.checked)
        $totalCost += $cost;
    else
        $totalCost -= $cost;
    ($totalDisplay).text("Total: $" + $totalCost); 

    // disable conflictiong activities
    $('input[type="checkbox"]').each(function() {

        // iterated actitivity description
        const $otherDescription = $(this).parent().text();

        // helper boolean variables to decide whether a checkbox should be turned on/off.
        const $sameActivity = ($description !== $otherDescription);
        const $includesDay = ($otherDescription).includes($day);
        const $includesHours =  ($otherDescription).includes($hours);

        // a conflicting activity has been found
        if ($sameActivity && $includesDay && $includesHours)
        {
            // if the current activity has been checked, grey out conflicting activities.
                if ($currentActivity.checked) {
                $(this).attr("disabled", true);
                $(this).parent()[0].style.color = "grey";
            }

            // if the current activity has been unchecked, make the no-longer conflicting activities clickable.
            else {
                $(this).attr("disabled", false);
                $(this).parent()[0].style.color = "black";
            }
        }
                  
    });
});


/** this helper function recieves a shirt category and show colors
    associated with it in the colors drop-down list. **/ 
function showColors(shirtCategory)
{
    // select the color options
    $options = $('#color option');

    // if the option value (e.g color) equals one of the parameters, show it in the drop-down list. 
    $options.each( function(index, element) {
        if (element.text.includes(shirtCategory))
            $options.eq(index).show();
        else
            $options.eq(index).hide();    
    });

    // make first color the default choice from color drop-down list.
    $options.each( function(index, element) {
        if (element.text.includes(shirtCategory))  // color belongs to shirt category
        {
            $('#color').val(element.value);
            return false; // break out of the loop once a color has been found.
        }
    });  
}




 	

 	


