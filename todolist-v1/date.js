exports.getDate = function () {
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
};

module.exports.getDay = getDay;

function getDay() {
    const today = new Date();
    const options = {
        weekday: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
    return day;
} 