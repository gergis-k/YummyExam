// Flag
let flag = true;

let Name,
    Email,
    Password,
    ConfirmPassword,
    Phone,
    Age;

let GlobalArr = [];


let regexName = /^[a-zA-Z ]{2,30}$/,
    regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
    regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
    regexPhone = /^01[0-2]{1}[0-9]{8}$/,
    regexAge = /^[1-9]{1}[0-9]{1}$/;

let rowData = document.getElementById('row-data');


// Nav Menu
$('#btn-nav').click(function () {
    if (flag) {
        $('.menu-bar').addClass('open-menu').removeClass('close-menu');
        let navWidth = $('.menu-bar').width();
        $('.right-nav').css('left', navWidth);
        $(this).html('<i class="fa-solid fa-xmark"></i>');
        flag = false;
    } else {
        $('.menu-bar').addClass('close-menu').removeClass('open-menu');
        $('.right-nav').css('left', '0');
        $(this).html('<i class="fa-solid fa-bars"></i>');
        flag = true;
    }
});

// Fade Loading
$(window).on('load', function () {
    $('.main-loading').fadeOut(1000, () => {
        $('body').css('overflow', 'auto');
    });
});

// Reset everything function
function reset() {

    // go to top
    $('html, body').animate({
        scrollTop: 0
    }, 1000);

    // clear search-box
    $('#search-box').html('');

    // clear row-data
    $('#row-data').html('');

    // colse nav
    $('.menu-bar').addClass('close-menu').removeClass('open-menu');
    $('.right-nav').css('left', '0');
    $('#btn-nav').html('<i class="fa-solid fa-bars"></i>');
    flag = true;

}

// displayArea - GlobalArr
function displayArea() {
    let display = '';
    GlobalArr.forEach((item, index) => {
        display += `
        `;
    });
    rowData.innerHTML = display;
}

// fetch async - https://www.themealdb.com/api/json/v1/1/list.php?a=list
async function fetchArea() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let data = await response.json();
    return data;
}

// fetchIngredient
async function fetchIngredient() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let data = await response.json();
    return data;
}

async function getMealById(id) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    data = await response.json();
    meal = data.meals[0];
    displayMeal(meal);
}

async function fetchCategories() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let data = await response.json();
    return data;
}

// displayCategories()
function display(arr) {
    let display = '';
    arr.forEach((item, index) => {
        display += `
        <div class="col-md-6 col-lg-3">
        <div class="position-relative shadow rounded post-box">
            <div class="post p-5 text-center mb-2" onclick="filterByArea('${item.strArea}')">
                <i class="fa-solid fa-city fa-3x" style="color: #e65a50ab;"></i>
                <h5>${item.strArea}</h5>
            </div>
        </div>
    </div>
        `;
    });
    rowData.innerHTML = display;
}

// displayMeal
function displayMeal(meal) {
    let display = '';
    display += `
    <div class="col-md-4">
        <img class="w-100" src="${meal.strMealThumb}">
        <h1 class="mt-3">${meal.strMeal}</h1>
    </div>
    <div class="col-md-8">
        <h2 class="mb-3">Instructions</h2>
        <p>
            ${meal.strInstructions}
        </p>
        <p><span class="fw-bolder">Area :</span> ${meal.strArea}</p>
        <p><span class="fw-bolder">Category :</span> ${meal.strCategory}</p>
        <h4>Recipes :</h4>
        <ul class="d-flex">
            <li class="my-3 mx-2 p-2 badge text-bg-success">${meal.strIngredient1}</li>
            <li class="my-3 mx-2 p-2 badge text-bg-success">${meal.strIngredient2}</li>
            <li class="my-3 mx-2 p-2 badge text-bg-success">${meal.strIngredient3}</li>
            <li class="my-3 mx-2 p-2 badge text-bg-success">${meal.strIngredient4}</li>
            <li class="my-3 mx-2 p-2 badge text-bg-success">${meal.strIngredient5}</li>
            <li class="my-3 mx-2 p-2 badge text-bg-success">${meal.strIngredient6}</li>
        </ul>

        <h4 class="my-2 mx-1 p-1">Tags :</h4>

        <a class="btn btn-success text-white" target="_blank"
            href="${meal.strSource}">Source</a>

        <a class="btn btn-danger text-white" target="_blank"
            href="${meal.strYoutube}">Youtub</a>
    </div>
    `;
    rowData.innerHTML = display;
}

function displayMeals(arr) {
    let display = '';
    arr.forEach((item, index) => {
        display += `
    <div class="col-md-6 col-lg-3">
                        <div class="position-relative shadow rounded post-box">
                            <div class="post" onclick="getMealById(${item.idMeal})">
                                <img src="${item.strMealThumb}"
                                    class="w-100 rounded">
                                <div class="post-layer d-flex align-items-center">
                                    <div class="info p-2">
                                    <h5>${item.strMeal}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

        `;
    });
    rowData.innerHTML = display;
}

// displayIngredients
function displayIngredients(arr) {
    let display = '';
    arr.forEach((item, index) => {
        display += `
        <div class="col-md-6 col-lg-3">
        <div class="position-relative shadow rounded post-box">
            <div class="post p-5 text-center mb-2" onclick="filterByIngredient('${item.strIngredient}')">
                <i class="fa-solid fa-bowl-food fa-3x" style="color: #9ee650ab;"></i>
                <h5>${item.strIngredient}</h5>
                <p>
                    ${item.strDescription.split(" ").splice(0, 10).join(" ")}...
                </p>
            </div>
        </div>
    </div>
        `;
    });
    rowData.innerHTML = display;
}

// filterByCategory
async function filterByCategory(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let data = await response.json();
    displayMeals(data.meals);
}



// displayCategories
function displayCategories(arr) {
    let display = '';
    arr.forEach((item, index) => {
        display += `
        <div class="col-md-6 col-lg-3">
        <div class="position-relative shadow rounded post-box">
            <div class="post" onclick="filterByCategory('${item.strCategory}')">
                <img src="${item.strCategoryThumb}"
                    class="w-100 rounded">
                <div class="post-layer
                d-flex align-items-center">
                    <div class="info p-2">
                        <h5>${item.strCategory}</h5>
                        <p>
                            ${item.strCategoryDescription.split(" ").splice(0, 10).join(" ")}...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `;
    });
    rowData.innerHTML = display;
}

// filterByIngredient
async function filterByIngredient(ingredient) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let data = await response.json();
    displayMeals(data.meals);
}

async function filterByArea(area) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    data = await response.json();
    meals = data.meals.slice(0, 20);
    displayMeals(meals);
}

async function search(i) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${i}`);
    meals = await meals.json();
    displayMeals(meals.meals);
    return meals;
}

async function getByLetter(letter) {
    if (letter) {
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
    }
}

// Nav a click - [data-target]
$('.menu-bar .nav-item a').click(async function () {
    let target = $(this).attr('data-target');
    reset();

    if (target == 'search') {
        rowData.innerHTML = ""
        document.getElementById("search-box").innerHTML =
            `
        <div class="row">
            <div class="col-md-6"><input id="searchInput" class="form-control" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input class="form-control" type="text" maxlength="1" id="letterInput"
                    placeholder="search By First Letter...">
            </div>
        </div>
        `

        $("#searchInput").keyup((e) => {
            search(e.target.value);
        });

        $("#letterInput").keyup((e) => {
            getByLetter(e.target.value);
        });

        $('#letterInput').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }

    if (target == 'contact') {

        // fill row-data by contact view - using html function

        $('#row-data').html(`
        <div id="contact" class="container mx-auto my-5">
            <h2 class="text-center fw-bold mb-4">ContacUs...</h2>

            <div class="row g-3 mb-4">
                <div class="col-md-6">
                    <div class="form-group">
                        <input class="form-control" required
                            placeholder="Enter Your Name" id="nameid">
                        <div class="invalid-feedback">
                            Please choose a username.
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input class="form-control" required
                            placeholder="Enter Email" id="emailid">
                        <div class="invalid-feedback">
                            Enter valid email. *Ex: xxx@yyy.zzz
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input class="form-control" required
                            placeholder="Enter phone" id="phoneid">
                        <div class="invalid-feedback">
                            Enter valid Phone Number
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input class="form-control" required
                            placeholder="Enter Age" id="ageid">
                        <div class="invalid-feedback">
                            Enter valid Age
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input class="form-control" required
                            type="password"
                            placeholder="Enter Password" id="passid">
                        <div class="invalid-feedback">
                            Enter valid password *Minimum eight characters, at least one letter and one
                            number:*
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <input class="form-control" required type="password" id="repassid"
                            placeholder="Enter RePassword">
                        <div class="invalid-feedback">
                            Enter valid Repassword
                        </div>
                    </div>
                </div>


            </div>

            <div class="text-center">
                <button type="submit" id="submitBtn"
                    class="btn btn-outline-primary">Submit</button>
            </div>



        </div>
        `);

        Name = document.getElementById("nameid");
        Email = document.getElementById("emailid");
        Phone = document.getElementById("phoneid");
        Age = document.getElementById("ageid");
        Password = document.getElementById("passid");
        ConfirmPassword = document.getElementById("repassid");

        // enable btn or disabel
        if (regexName.test(Name.value) && regexEmail.test(Email.value) && regexPassword.test(Password.value) && regexPhone.test(Phone.value) && regexAge.test(Age.value) && Password.value == ConfirmPassword.value) {
            document.getElementById("submitBtn").disabled = false;
        } else {
            document.getElementById("submitBtn").disabled = true;
        }

        // Name Validation
        Name.addEventListener("keyup", function (event) {
            if (regexName.test(Name.value)) {
                Name.classList.remove("is-invalid");
                Name.classList.add("is-valid");
            } else {
                Name.classList.remove("is-valid");
                Name.classList.add("is-invalid");
            }

            // enable btn or disabel
            if (regexName.test(Name.value) && regexEmail.test(Email.value) && regexPassword.test(Password.value) && regexPhone.test(Phone.value) && regexAge.test(Age.value) && Password.value == ConfirmPassword.value) {
                document.getElementById("submitBtn").disabled = false;
            } else {
                document.getElementById("submitBtn").disabled = true;
            }

        });

        // Email Validation
        Email.addEventListener("keyup", function (event) {
            if (regexEmail.test(Email.value)) {
                Email.classList.remove("is-invalid");
                Email.classList.add("is-valid");
            } else {
                Email.classList.remove("is-valid");
                Email.classList.add("is-invalid");
            }

            // enable btn or disabel
            if (regexName.test(Name.value) && regexEmail.test(Email.value) && regexPassword.test(Password.value) && regexPhone.test(Phone.value) && regexAge.test(Age.value) && Password.value == ConfirmPassword.value) {
                document.getElementById("submitBtn").disabled = false;
            } else {
                document.getElementById("submitBtn").disabled = true;
            }
        });

        // Phone Validation
        Phone.addEventListener("keyup", function (event) {
            if (regexPhone.test(Phone.value)) {
                Phone.classList.remove("is-invalid");
                Phone.classList.add("is-valid");

            } else {
                Phone.classList.remove("is-valid");
                Phone.classList.add("is-invalid");
            }

            // enable btn or disabel
            if (regexName.test(Name.value) && regexEmail.test(Email.value) && regexPassword.test(Password.value) && regexPhone.test(Phone.value) && regexAge.test(Age.value) && Password.value == ConfirmPassword.value) {
                document.getElementById("submitBtn").disabled = false;
            } else {
                document.getElementById("submitBtn").disabled = true;
            }
        });

        // Age Validation
        Age.addEventListener("keyup", function (event) {
            if (regexAge.test(Age.value)) {
                Age.classList.remove("is-invalid");
                Age.classList.add("is-valid");


            } else {
                Age.classList.remove("is-valid");
                Age.classList.add("is-invalid");
            }

            // enable btn or disabel
            if (regexName.test(Name.value) && regexEmail.test(Email.value) && regexPassword.test(Password.value) && regexPhone.test(Phone.value) && regexAge.test(Age.value) && Password.value == ConfirmPassword.value) {
                document.getElementById("submitBtn").disabled = false;
            } else {
                document.getElementById("submitBtn").disabled = true;
            }
        });

        // Password Validation
        Password.addEventListener("keyup", function (event) {
            if (regexPassword.test(Password.value)) {
                Password.classList.remove("is-invalid");
                Password.classList.add("is-valid");


            } else {
                Password.classList.remove("is-valid");
                Password.classList.add("is-invalid");
            }

            // enable btn or disabel
            if (regexName.test(Name.value) && regexEmail.test(Email.value) && regexPassword.test(Password.value) && regexPhone.test(Phone.value) && regexAge.test(Age.value) && Password.value == ConfirmPassword.value) {
                document.getElementById("submitBtn").disabled = false;
            } else {
                document.getElementById("submitBtn").disabled = true;
            }
        });

        // Confirm Password Validation
        ConfirmPassword.addEventListener("keyup", function (event) {
            if (ConfirmPassword.value == Password.value) {
                ConfirmPassword.classList.remove("is-invalid");
                ConfirmPassword.classList.add("is-valid");


            } else {
                ConfirmPassword.classList.remove("is-valid");
                ConfirmPassword.classList.add("is-invalid");
            }

            // enable btn or disabel
            if (regexName.test(Name.value) && regexEmail.test(Email.value) && regexPassword.test(Password.value) && regexPhone.test(Phone.value) && regexAge.test(Age.value) && Password.value == ConfirmPassword.value) {
                document.getElementById("submitBtn").disabled = false;
            } else {
                document.getElementById("submitBtn").disabled = true;
            }
        });

        // btn click
        document.getElementById("submitBtn").addEventListener("click", function (event) {
            if (regexName.test(Name.value) && regexEmail.test(Email.value) && regexPassword.test(Password.value) && regexPhone.test(Phone.value) && regexAge.test(Age.value) && Password.value == ConfirmPassword.value) {
                console.log("Success");
            } else {
                console.log("Failed");
            }
        });

    }
    else if (target == 'a') {
        // fetch - area
        let data = await fetchArea();
        GlobalArr = data.meals.splice(0, 20);
        // console.log(GlobalArr);
        display(GlobalArr);
    } else if (target == 'i') {
        // fetch - ingredient
        let data = await fetchIngredient();
        GlobalArr = data.meals.splice(0, 20);
        // console.log(GlobalArr);
        displayIngredients(GlobalArr)
    } else if (target == 'categories') {
        // fetch - categories
        let data = await fetchCategories();
        GlobalArr = data.categories.splice(0, 20);
        // console.log(GlobalArr);
        displayCategories(GlobalArr);
    }

});

search("");