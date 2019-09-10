$( document ).ready(function() {

    //Create headline with minimum age
    $( "h3" ).html(`You must be at least ${MINAGE} to access this site`);

    //Create button text with minimum age
    $( "#underage-button" ).html(`I'm not ${MINAGE}`);

    //Build options in month and day selectors
    $( "#month-select" ).append(MONTHS.map(month => {
        return `<option value=${month}>${month}</option>`
    }));

    $( "#day-select" ).append( createDays() );
    function createDays() {
        let days = [];
        for (let i = 1; i < 32; i++) {
            days.push(`<option value=${i}>${i}</option>`);
        }
        return days;
    }

    //Add event listeners
    $( "#verify-button" ).click(verifyAge);
    // $( "#cookie-check" ).click(cookieCheck);

    //Check for cookie, if present, set all values to cookie values
    const cookieCheck = checkForCookie();
    if (cookieCheck) {
        $( "#month-select" ).val(cookieCheck["month"]);
        $( "#day-select" ).val(cookieCheck["day"]);
        $( "#year-select" ).val(cookieCheck["year"]);
        $( "#cookie-check" ).prop("checked", true);
    };

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
                {month: cookieObj["month"], day: cookieObj["day"], year: cookieObj["year"]} : 
                false;
        }
    
        //Set cookie values
        function setCookie(remember, month, day, year) {
            document.cookie = `rememberme=${remember}; path=/`;
            document.cookie = `month=${month}; path=/`;
            document.cookie = `day=${day}; path=/`;
            document.cookie = `year=${year}; path=/`;
        }

        //Handle remember me checkbox
        function rememberCheck() {
            if ($( "#cookie-check" ).is(":checked")) { 
                setCookie("true", $( "#month-select" ).val(), $( "#day-select").val(), $( "#year-select" ).val());
            } else {
                setCookie("", "", "");
            }
        }
    
    //Age verification functions
        //Begin age verification logic
        function verifyAge() {
            let dob = $("#month-select").val() + " " + $("#day-select").val() + ", " + $("#year-select").val();
            //** */Need error handling here for incomplete entry
            if (calculateAge(dob) >= MINAGE) {
                console.log("Welcome");
                rememberCheck();
            } else {
                console.log("GTFO");
            }
        }

        //Calculate age as an integer from date of birth
        function calculateAge(dob) {
            const age = new Date(Date.now() - new Date(dob))
            return Math.abs(age.getUTCFullYear() - 1970);
        }

});


// Constants
var MINAGE = 21;
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]