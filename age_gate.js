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

    //Add event listener to verify age button
    $( "#verify-button" ).click(verifyAge);

    //Begin age verification logic
    function verifyAge() {
        //** */TBD day selector
        let dob = $( "#month-select" ).val() + " 1, " + $( "#year-select" ).val();
        //** */Need error handling here for incomplete entry
        if (calculateAge(dob) >= MINAGE) {
            console.log("Welcome");
        } else {
            console.log("GTFO");
        }
    }
    
    //Calculate age as an integer from date of birth
    function calculateAge(dob) {
        debugger
        const age = new Date(Date.now() - new Date(dob))
        debugger
        return Math.abs(age.getUTCFullYear() - 1970);
    }

});

// Constants
var MINAGE = 21;
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]