
    const ctx = document.getElementById('deliveryChart').getContext('2d');
    const deliveryChart = new Chart(ctx, {
        type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
    {
        label: 'On Time',
    data: [70, 85, 90, 80, 100, 95, 110, 105, 100, 120, 125, 130],
    backgroundColor: 'rgba(76, 175, 80, 0.6)',
    borderColor: 'rgba(76, 175, 80, 1)',
    borderWidth: 2
                    },
    {
        label: 'Delayed',
    data: [10, 5, 7, 8, 5, 35, 20, 10, 7, 10, 15, 10],
    backgroundColor: 'rgba(231, 76, 60, 0.6)',
    borderColor: 'rgba(231, 76, 60, 1)',
    borderWidth: 2
                    },
    {
        label: 'Pending',
    data: [5, 10, 3, 5, 10, 5, 7, 5, 8, 5, 5, 0],
    backgroundColor: 'rgba(52, 152, 219, 0.6)',
    borderColor: 'rgba(52, 152, 219, 1)',
    borderWidth: 2
                    }
    ]
            },
    options: {
        scales: {
        y: {
        beginAtZero: true
                    }
                }
            }
        });

