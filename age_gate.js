$( document ).ready(function() {

    //Create headline with minimum age
    $( "h3" ).html(`You must be at least ${MINAGE} to access this site`);

    //Create button text with minimum age
    $( "#underage-button" ).html(`I'm not ${MINAGE}`);

    //Add months to month selector
    $( "#month-select" ).append(MONTHS.map(month => {
        return `<option value=${month}>${month}</option>`
    }));

    //Add event listeners
    $( "#verify-button" ).click(verifyAge);
    // $( "#cookie-check" ).click(cookieCheck);

    //Check for cookies
    const cookieCheck = checkForCookie();
    debugger
    if (cookieCheck) {
        $( "#month-select" ).val(cookieCheck["month"]);
        $( "#year-select" ).val(cookieCheck["year"]);
        $( "#cookie-check" ).prop("checked", true);
    };

    //Cookie functions
        //Check for cookie
        function checkForCookie() {
            //Break cookie string down into array of key-value pairs
            debugger
            const cookieArray = document.cookie.split("; ");
            let cookieObj = {};
            cookieArray.forEach(ele => {
                //Add each key value pair to cookieObj
                const splitEle = ele.split("=");
                cookieObj[splitEle[0]] = splitEle[1];
            });
            //If rememberme set, return selected dates, else return false
            return cookieObj["rememberme"] ? 
                {month: cookieObj["month"], year: cookieObj["year"]} : 
                false;
        }
    
        //Set cookie values
        function setCookie(remember, month, year) {
            document.cookie = `rememberme=${remember}; path=/`;
            document.cookie = `month=${month}; path=/`;
            document.cookie = `year=${year}; path=/`;
        }

        //Handle remember me checkbox
        function rememberCheck() {
            if ($( "#cookie-check" ).is(":checked")) { 
                setCookie("true", $( "#month-select" ).val(), $( "#year-select" ).val());
                console.log(document.cookie);
            } else {
                setCookie("", "", "");
                console.log(document.cookie);
            }
        }
    
    //Age verification functions
        //Begin age verification logic
        function verifyAge() {
            //** */TBD day selector
            let dob = $("#month-select").val() + " 1, " + $("#year-select").val();
            //** */Need error handling here for incomplete entry
            if (calculateAge(dob) >= MINAGE) {
                console.log("Welcome");
            } else {
                console.log("GTFO");
            }
            rememberCheck();
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