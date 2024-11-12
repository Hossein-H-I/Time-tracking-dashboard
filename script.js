let timeData = [];

// Fetch the data from the JSON file
fetch('./data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        timeData = data; // Store the fetched data
        updateDashboard('weekly'); // Initialize with weekly data
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

function updateDashboard(period) {
    timeData.forEach(activity => {
        const activityTitle = activity.title.toLowerCase().replace(" ", "-");
        const currentHours = activity.timeframes[period].current;
        const previousHours = activity.timeframes[period].previous;

        document.getElementById(`${activityTitle}-hrs`).innerText = `${currentHours}hrs`;
        document.getElementById(`${activityTitle}-time`).innerText = `Last Week - ${previousHours}hrs`;
    });
}

// Event listeners for menu items
document.getElementById('daily').addEventListener('click', (e) => {
    e.preventDefault();
    updateDashboard('daily');
});

document.getElementById('weekly').addEventListener('click', (e) => {
    e.preventDefault();
    updateDashboard('weekly');
});

document.getElementById('monthly').addEventListener('click', (e) => {
    e.preventDefault();
    updateDashboard('monthly');
});