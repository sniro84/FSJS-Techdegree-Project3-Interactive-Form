/******************************************
Treehouse FSJS Techdegree:
Project 3 - Interactive Form
Name: Snir Holland
Date: 22/07/2019
******************************************/

// total cost value
let $totalCost = 0;

// activities counter
let $activityCount = 0;

// error messages to show when user fills out parts incorrectly
let $errorMessageName = $('<label></label>').text("");
$errorMessageName.css('color','red');

let $errorMessageMail = $('<label></label>').text("");
$errorMessageMail.css('color','red');

let $errorMessageCreditCardNum = $('<label></label>').text("");
$errorMessageCreditCardNum.css('color','red');

let $errorMessageCreditCardZip = $('<label></label>').text("");
$errorMessageCreditCardZip.css('color','red');

let $errorMessageCreditCardCvv = $('<label></label>').text("");
$errorMessageCreditCardCvv.css('color','red');

const $errorMessageActivity = $('<label></label>').text("");
$errorMessageActivity.css('color','red');
$('.activities').append($errorMessageActivity);

// creating a headline for the total display
const $totalDisplay = $('<label></label>').text("");
$('.activities').append($totalDisplay);

// perform the following actions when the page loads
$(document).ready(function() {
    // set focus on the name input
    $('#name').focus();

    // hide 'other title' by default
    $('#other-title').hide();

    // hide the "Select Theme" message once user clicks design drop-down list
    $('#design').find('option:contains("Select Theme")').hide();

    // hide colors from color drop-down list
    $('#color option').hide();

    // hide color label and drop-down list
    $('div #colors-js-puns').hide();

    // show a message to the user in the color drop-down list
    const $optionMessage = $('<option></option>').text("Please select a T-shirt theme");
    $('#color').append($optionMessage);
    $('#color').val($optionMessage.val());

    // hide the "Select Payment Method" message once user clicks payment drop-down list
    $('#payment option[value="select_method"]').hide();

    // hide the text related to paypal and bitcoin payment options
    $('#credit-card').next().hide();
    $('#credit-card').next().next().hide();
});


// "your job role" text field will only appear if other option will be selected.
$('#title').change(function() {
    ($('#title').val() === 'other') ? $('#other-title').show() : $('#other-title').hide(); 
});

// respond to changes when a different design has been picked
$('#design').change(function() {

    // show color label and drop-down list.
    $('div #colors-js-puns').show();
    
    // filter colors with respect to selected design.
    if ($('#design').val() === 'js puns')
        showColors("JS Puns");
    else if ($('#design').val() === 'heart js')
        showColors("I ♥ JS"); 
});

// respond to changes in activity selection when a box is checked/unchecked
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

    // the cost of the chosen activity
    const $cost = parseInt(($description).slice($dollarIndex + 1));

    // the activity that has been clicked 
    const $chosenActivity = this;

    // update activity count and total cost with respect to checked boxes
    if ($chosenActivity.checked)
    {
        $totalCost += $cost;
        $activityCount++;
    }
    else
    {
        $totalCost -= $cost;
        $activityCount--;
    }
    
    // update display of total cost    
    if ($totalCost > 0)    
        ($totalDisplay).text("Total: $" + $totalCost);
    else     
        ($totalDisplay).text("");

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
            // if the chosen activity has been checked, grey out conflicting activities.
            if ($chosenActivity.checked) {
                $(this).attr("disabled", true);
                $(this).parent()[0].style.color = "grey";               
            }

            // if the chosen activity has been unchecked, make the no-longer conflicting activities clickable.
            else {
                $(this).attr("disabled", false);
                $(this).parent()[0].style.color = "black";
            }
        }  
    });

    // make sure at least one activity has been checked (requires a seperate event handler)
    $('input[type="checkbox"]').focusout();    
});

// respond to changes in the quantity of checked activities
$('input[type="checkbox"]').focusout(function() {
    
    if (isValidActivityChecked())  // at least one activity has been checked
    {
        $errorMessageActivity.text(""); 
        this.style.border = ""; 
    }
    else  // no activities have been checked
    {
        $errorMessageActivity.text("Please choose at least one activity.");
        this.style.border = "solid 3px red";
    }
});

// respond to changes in payment option
$('#payment').change(function() {

    // helper variables to store payment options
    const $creditCard = $('#credit-card');
    const $payPal = $creditCard.next();
    const $bitcoin = $payPal.next();
    
    // hide all the descriptive text content that is related to payment options
    $creditCard.hide();
    $payPal.hide();
    $bitcoin.hide();

    // show descriptive text content with respect to the user's choice of payment
    if ($('#payment').val() === "credit card")
        $creditCard.show();        
    else if ($('#payment').val() === "paypal")
        $payPal.show();        
    else 
        $bitcoin.show();
});

// dynamically respond to changes in the name text field.
$('input#name').on('keyup focusout' , function() {
    
    // creating an error message
    const $value = $('input#name').val();
    ($errorMessageName).insertAfter($('input#name')); 

    if (isValidName($value)) // valid name --> hide error message
    {
        $errorMessageName.text("");
        this.style.border = "";
    }
    else   // invalid name --> show error message
    {
        $errorMessageName.text("Please fill out a name.");
        this.style.border = "solid 3px red";
    }
});

// dynamically respond to changes in the email text field.
$('input#mail').on('keyup focusout' , function() {

    // creating an error message
    const $value = $('input#mail').val();
    ($errorMessageMail).insertAfter($('input#mail'));

    if (isValidEmail($value)) // valid email address --> hide error message
    {
        $errorMessageMail.text("");
        this.style.border = "";
    }
    else // invalid email address --> show error message
    {
        if ($value === "")
            $errorMessageMail.text("Please fill out an Email.");
        else   
            $errorMessageMail.text("'"  + $value + "' is not a valid Email address.");
        this.style.border = "solid 3px red";
    }
});

// dynamically respond to changes in the credit card number text field.
$('input#cc-num').on('keyup focusout' , function() {

    // creating an error message
    const $value = $('input#cc-num').val();
    ($errorMessageCreditCardNum).insertAfter($('input#cc-num'));

    if (isValidCreditCardNum($value))  // valid credit card number --> hide error message
    {
        $errorMessageCreditCardNum.text("");
        this.style.border = "";
    }
    else  // invalid credit card number --> show error message
    {
        if ($value === "")
            $errorMessageCreditCardNum.text("Please fill out a credit card number.");
        else
            $errorMessageCreditCardNum.text("Please fill out a number that is between 13 and 16 digits long.");
        this.style.border = "solid 3px red";
    }
});

// dynamically respond to changes in the zip code text field.
$('input#zip').on('keyup focusout' , function() {

    // creating an error message
    const $value = $('input#zip').val();
    ($errorMessageCreditCardZip).insertAfter($('input#zip'));

    if (isValidZipCode($value)) // valid zip code --> hide error message
    {
        $errorMessageCreditCardZip.text("");
        this.style.border = "";
    }
    else   // invalid zip code --> show error message
    {
        if ($value === "")
            $errorMessageCreditCardZip.text("Please fill out a zip code.");
        else
            $errorMessageCreditCardZip.text("Zip Code must be a 5-digit number.");
        this.style.border = "solid 3px red";
    }
});

// dynamically respond to changes in the CVV text field.
$('input#cvv').on('keyup focusout' , function() {

    // creating an error message
    const $value = $('input#cvv').val();
    ($errorMessageCreditCardCvv).insertAfter($('input#cvv'));

    if (isValidCvv($value))  // valid CVV value --> hide error message
    {
        $errorMessageCreditCardCvv.text("");
        this.style.border = "";
    }
    else  // invalid CVV value --> show error message
    {
        if ($value === "")
            $errorMessageCreditCardCvv.text("Please fill out a CVV value.");
        else
            $errorMessageCreditCardCvv.text("CVV value must be a 3-digit number.");
        this.style.border = "solid 3px red";
    }
});

// respond to clicks on the "register" button
$('form').submit(function(event) {

    // show the error messages if such exist.
    $('input#mail').focusout();
    $('input#name').focusout();
    $('input[type="checkbox"]').focusout();
    $('input#cc-num').focusout();
    $('input#zip').focusout();
    $('input#cvv').focusout();

    // if the form has been filled incorrectly, prevent it from being sent.
    if (!isValidForm())
        event.preventDefault();    
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

// helper function that validates name
function isValidName(name)
{
    return !( /^[\s]*$/.test(name) );
}

// helper function that validates email
function isValidEmail(email)
{
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// helper function that validates activities quantity
function isValidActivityChecked()
{
    return ($activityCount > 0);
}

// helper function that validates credit card number 
function isValidCreditCardNum(number)
{
    return /^\d{13,16}$/.test(number);
}

// helper function that validates zip code
function isValidZipCode(number)
{
    return /^\d{5}$/.test(number);
} 	

// helper function that validates CVV value
function isValidCvv(number)
{
    return /^\d{3}$/.test(number);
} 

// master validation function 
function isValidForm()
{
    // helper variables to store name and mail values
    const $nameValue = $('input#name').val();
    const $mailValue = $('input#mail').val();

    // helper boolean variables
    const $invalidName = !isValidName($nameValue);
    const $invalidMail = !isValidEmail($mailValue);

    // if either name, email address or activity count is invalid, the form is invalid. 
    if ($invalidName || $invalidMail || $activityCount === 0)
        return false;

    // if payemnt option is not credit card, skip the following    
    if ($('#payment').val() === "credit card")
    {
        // helper variables to store credit card details
        const $ccNumValue = $('input#cc-num').val();
        const $zipCodevalue = $('input#zip').val();
        const $cvvValue = $('input#cvv').val();

        // helper boolean variables
        const $invalidCardNum = !isValidCreditCardNum($ccNumValue);
        const $invalidZipCode = !isValidZipCode($zipCodevalue);
        const $invalidCvv = !isValidCvv($cvvValue);

        // if either one of the credit card details is invalid, the form is invalid.
        if ($invalidCardNum || $invalidZipCode || $invalidCvv)
            return false;
    }

    // the form is valid and ready to be submitted
    return true;
}




