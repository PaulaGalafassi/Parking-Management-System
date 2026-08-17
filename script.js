const form = document.getElementById("plateForm");


// Load parked vehicles from localStorage
let parkedVehicles = JSON.parse(
    localStorage.getItem("parkedVehicles")
) || [];


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const plate = document.getElementById("plate").value
        .trim()
        .toUpperCase();


    // Manager command
    if (plate === "MANEGERSTENNINGS") {

        window.location.href = "history.html";

        return;
    }


    // Check if vehicle is already inside
    const vehicle = parkedVehicles.find(
        vehicle => vehicle.plate === plate
    );


    if (vehicle) {

        // Save the selected vehicle
        // so payment.html can access it
        localStorage.setItem(
            "currentVehicle",
            JSON.stringify(vehicle)
        );

        // Go to payment page
        window.location.href = "payment.html";


    } else {

        // Show registration form
        document.getElementById("entryForm").style.display = "block";

    }

});


// Register Entry button
const registerButton = document.getElementById("registerButton");


registerButton.addEventListener("click", function() {

    const plate = document.getElementById("plate").value
        .trim()
        .toUpperCase();


    const name = document.getElementById("name").value
        .trim();


    const contact = document.getElementById("contact").value
        .trim();


    // Check if fields are empty
    if (name === "" || contact === "") {

        alert("Please enter your name and contact.");

        return;
    }


    // Get current date and time
    const entryTime = new Date();


    // Create vehicle object
    const vehicle = {

        plate: plate,

        name: name,

        contact: contact,

        entryTime: entryTime.toISOString()

    };


    // Add vehicle to the list
    parkedVehicles.push(vehicle);


    // Save the updated list
    localStorage.setItem(
        "parkedVehicles",
        JSON.stringify(parkedVehicles)
    );


    alert(
        "Vehicle registered successfully!\n\n" +

        "Plate: " + plate + "\n" +

        "Name: " + name + "\n" +

        "Entry time: " +
        entryTime.toLocaleString()
    );


    // Hide registration form
    document.getElementById("entryForm").style.display = "none";


    // Clear fields
    document.getElementById("name").value = "";
    document.getElementById("contact").value = "";

});