// Implement age gate code as document ready callback
$( document ).ready(function() {

    //Create headline with minimum age
    $( "h3" ).html(`You must be at least ${MINAGE} to access this site`);

    //Create button text with minimum age
    $( "#underage-button" ).html(`I'm not ${MINAGE}`);

    //Add months to month selector
    $( "#month-select" ).append(MONTHS.map(month => {
        return `<option value=${month}>${month}</option>`
    }));
    
    //Calculate age as an integer from date of birth
    function calculateAge(dob) {
        const dobDate = new Date(dob);
        const now = Date.now();
        const age = Date(now - dobDate)
        return Math.abs(age.getUTCFullYear() - 1970);
    }

});

// Constants
var MINAGE = 21;
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]