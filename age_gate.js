$( document ).ready(function() {

    //Create headline with minimum age
    $( "h3" ).html(`You must be at least <br/><strong>${MINAGE}</strong><br/> to access this site`);

    //Create button text with minimum age
    $( "#underage-button" ).html(`I'm not ${MINAGE}`);

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
        if (value.toString().length >= len && (value < range[0] || value > range[1])) {
            $(event.currentTarget).val("");
        }
    }
    
    //Cookie functions
        //Check for cookie, if present, set all values to cookie values
        const cookieCheck = checkForCookie();
        if (cookieCheck) {
            $("#month-select").val(cookieCheck["month"]);
            $("#day-select").val(cookieCheck["day"]);
            $("#year-select").val(cookieCheck["year"]);
            $("#cookie-check").prop("checked", true);
        };

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
var MONTHDAYS = {"1":31, "2":29, "3":31, "4":30, "5":31, "6":30, "7":31, "8":31, "9":30, "10":31, "11":30, "12":31,
"01":31, "02":29, "03":31, "04":30, "05":31, "06":30, "07":31, "08":31, "09":30}