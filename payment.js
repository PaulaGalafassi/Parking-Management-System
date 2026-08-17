const vehicleData = JSON.parse(
    localStorage.getItem("currentVehicle")
);

if (!vehicleData) {

    window.location.href = "index.html";

} else {

    const entryTime = new Date(vehicleData.entryTime);
    const exitTime = new Date();

    const difference = exitTime - entryTime;

    // Calculate hours, charging AU$10 per started hour
    const hours = Math.max(
        1,
        Math.ceil(difference / (1000 * 60 * 60))
    );

    const amount = hours * 10;


    // Display vehicle information

    document.getElementById("displayPlate").textContent =
        vehicleData.plate;

    document.getElementById("displayName").textContent =
        vehicleData.name;

    document.getElementById("displayContact").textContent =
        vehicleData.contact;

    document.getElementById("displayEntry").textContent =
        entryTime.toLocaleString();

    document.getElementById("displayExit").textContent =
        exitTime.toLocaleString();

    document.getElementById("displayDuration").textContent =
        hours + " hour(s)";

    document.getElementById("displayAmount").textContent =
        "AU$" + amount.toFixed(2);


    // Confirm Exit

    document.getElementById("confirmExit").addEventListener(
        "click",
        function() {

            // Get all parked vehicles
            let parkedVehicles = JSON.parse(
                localStorage.getItem("parkedVehicles")
            ) || [];


            // Remove the vehicle that is leaving
            parkedVehicles = parkedVehicles.filter(
                vehicle =>
                    vehicle.plate !== vehicleData.plate
            );


            // Save updated parking list
            localStorage.setItem(
                "parkedVehicles",
                JSON.stringify(parkedVehicles)
            );


            // Create parking history record

            const parkingRecord = {

                plate: vehicleData.plate,

                name: vehicleData.name,

                contact: vehicleData.contact,

                entryTime: vehicleData.entryTime,

                exitTime: exitTime.toISOString(),

                duration: hours,

                amount: amount

            };


            // Get existing history

            let parkingHistory = JSON.parse(
                localStorage.getItem("parkingHistory")
            ) || [];


            // Add new record

            parkingHistory.push(parkingRecord);


            // Save history

            localStorage.setItem(
                "parkingHistory",
                JSON.stringify(parkingHistory)
            );


            // Remove current vehicle

            localStorage.removeItem("currentVehicle");


            alert(
                "Payment confirmed!\n\n" +
                "Amount paid: AU$" +
                amount.toFixed(2)
            );


            // Return to main page

            window.location.href = "index.html";

        }
    );

}