const fillers = ["what", "who", "where", "is", "for", "show", "could", "me", "can", "you", "what's", "whats", "by", "do", "the", "tell", "please"];
const calcs = ["plus", "times", "divide", "divided", "multiplied", "+", "-", "/", "*", "minus"];

function calculate(nums, symbol) {
    if (nums.length !== 2) {
        return false;
    }
    if (isNaN(parseInt(nums[0])) || isNaN(parseInt(nums[1])) ) {
        return false;
    }
    if (symbol === "+" || symbol === "plus") {
        return `${nums[0]} + ${nums[1]} = ${parseInt(nums[0]) + parseInt(nums[1])}`;
    } else if (symbol === "-" || symbol === "minus") {
        return `${nums[0]} - ${nums[1]} = ${parseInt(nums[0]) - parseInt(nums[1])}`;
    } else if (symbol === "*" || symbol === "multiplied" || symbol === "times") {
        return `${nums[0]} * ${nums[1]} = ${parseInt(nums[0]) * parseInt(nums[1])}`;
    } else if (symbol === "/" || symbol === "divided") {
        return `${nums[0]} / ${nums[1]} = ${Math.round(parseInt(nums[0]) / parseInt(nums[1]) * 100) / 100}`;
    }
}

function parseSearch(input) {
    search = input.toLowerCase();
    if (search.includes("?")) {
        search = search.replace("?", "");
    }
    const searchSplit = search.split(" ");
    const searchBare = searchSplit.filter(word => !fillers.includes(word));
    for (const symbol of calcs) {
        if (searchBare.includes(symbol)) {
            searchBare.splice(1, 1);
            const calculated = calculate(searchBare, symbol);
            if (calculated !== false) {
                return calculated;
            } else {
                return false;
            }
        }
        for (const word of searchBare) {
            if (word.includes(symbol)) {
                const nums = word.split(symbol);
                const calculated = calculate(nums, symbol);
                if (calculated !== false) {
                    return calculated;
                } else {
                    return false;
                }
            }
        }
    }
}

const responseWindow = document.getElementById("response");
const responseText = document.getElementById("response-text");
const searchButton = document.getElementById("submit-search");
const searchInput = document.getElementById("search-input");
const searchBox = document.getElementById("search-box");

document.getElementById("search-box").addEventListener('submit', function(event) {
    event.preventDefault();

    const userInput = document.getElementById("search-input").value;

    const response = parseSearch(userInput)
    if (response == false) {
        responseText.textContent = "Sorry, I'm not sure what you mean."
    } else {
        responseText.textContent = response
        responseWindow.style.opacity = "1.0";
        searchBox.style.top = "43%";
        responseWindow.style.top = "57%";

        console.log(response);
    }

})