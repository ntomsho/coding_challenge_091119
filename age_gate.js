// Implement as document ready callback
$( document ).ready(function() {

    function calculateAge(dob) {
        const dobDate = new Date(dob);
        const now = Date.now();
        const age = Date(now - dobDate)
        return Math.abs(age.getUTCFullYear() - 1970);
    }
    
})