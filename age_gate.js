$( document ).ready(function() {

    //If cookie already set, bypass agegate entirely
    const cookieCheck = checkForCookie();
    if (cookieCheck) {
        window.location.replace(HOMEPAGE);
        return;
    };

    //Create headline with minimum age
    $( "h3" ).html(`You must be at least <br/><strong>${MINAGE}</strong><br/> to access this site`);

    //Create button text with minimum age
    $( "#underage-link" ).html(`I'm not ${MINAGE}`);

    //Add event listeners
    $( "#verify-button" ).click(verifyAge);
    $( ":text" ).keypress(isNumber);
    $( ":text" ).keyup(isValid);

    //Manage inputs to ensure valid dates
    function isNumber(event) {
        //Confirm that key pressed is a number
        const kc = event.keyCode;
        if (!(kc >= 48 && kc <= 57)) {
            return false;
        }
    }

    function isValid(event) {
        //Confirm that input is in correct range
        const value = parseInt(event.currentTarget.value);
        let range = [];
        let len = 2;
        switch (event.currentTarget.id) {
            case "month-select":
                range = [1, 12];
                break;
            case "day-select":
                range = [1, MONTHDAYS[$("#month-select").val()] || 31];
                break;
            case "year-select":
                const now = new Date;
                range = [1900, now.getFullYear()];
                len = 4;
        }
        //If entered value is sufficient length, check if it is within the correct range
        if (value.toString().length >= len && !(value >= range[0] && value <= range[1])) {
            $(event.currentTarget).val("");
        }
    }
    
    //Cookie functions
        //Check for cookie
        function checkForCookie() {
            //Break cookie string down into array of key-value pairs
            const cookieArray = document.cookie.split("; ");
            let cookieObj = {};
            cookieArray.forEach(ele => {
                //Add each key value pair to cookieObj
                const splitEle = ele.split("=");
                cookieObj[splitEle[0]] = splitEle[1];
            });
            //If rememberme set, return selected dates, else return false
            return cookieObj["rememberme"] ? 
                true : 
                false;
        }
    
        //Set cookie value to remember user
        function setCookie() {
            document.cookie = `rememberme=true; path=/`;
        }

        //If remember me is checked, set cookie to bypass agegate
        function rememberCheck() {
            if ($( "#cookie-check" ).is(":checked")) { 
                setCookie();
            }
        }
    
    //Age verification functions
        function verifyAge() {
            //Get values from inputs
            const month = $("#month-select").val();
            const day = $("#day-select").val();
            const year = $("#year-select").val();
            //Break out of function if any inputs return falsy or year is ridiculous
            if (!month || !day || !year || year < 1900 ) {
                return;
            }
            let dob = month + " " + day + ", " + year;
            if (calculateAge(dob) >= MINAGE) {
                console.log("Welcome");
                rememberCheck();
                const content = $( ".content" );
                content.fadeOut(500, function() {
                    content.html(`Duff Man says "Welcome"!`);
                    content.fadeIn(500, function() {
                        window.location.replace(HOMEPAGE);
                    });
                })
            } else {
                const headline = $( "h3" );
                headline.fadeOut(500, function() {
                    headline.html(`Sorry, you have to be <br/><strong>${MINAGE}</strong></br> to enter`);
                    headline.fadeIn(500);
                });
            }
        }

        //Calculate age as an integer from date of birth
        function calculateAge(dob) {
            const age = new Date(Date.now() - new Date(dob))
            return Math.abs(age.getUTCFullYear() - 1970);
        }

});


// Constants
    //Adjust to get correct homepage after passing age gate
var HOMEPAGE = "https://giphy.com/gifs/season-9-the-simpsons-9x1-3orif1ocafXfffpUzu/fullscreen"
    //Adjust to get correct legal drinking age, could incorporate geolocation data
var MINAGE = 21;
var MONTHDAYS = {"1":31, "2":29, "3":31, "4":30, "5":31, "6":30, "7":31, "8":31, "9":30, "10":31, "11":30, "12":31,
"01":31, "02":29, "03":31, "04":30, "05":31, "06":30, "07":31, "08":31, "09":30}