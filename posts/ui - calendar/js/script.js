//

(function (root, factory) {
    root.myCalendar = factory(root);
})(this, (root) => {
    const monthList = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ];
    const dayList = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday'
    ];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const privateVar = 'No, No, No...';

    const init = () => {
        const element = document.getElementById('calendar');

        const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        // Creating the div for our calendar's header
        const header = document.createElement('div');
        header.classList.add('header');
        element.appendChild(header);

        // Creating the div that will contain the days of our calendar
        const content = document.createElement('div');
        element.appendChild(content);

        // Our "previous" button
        const previousButton = document.createElement('button');
        previousButton.setAttribute('data-action', '-1');
        previousButton.textContent = '\u003c';
        header.appendChild(previousButton);

        // Creating the div that will contain the actual month/year
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        header.appendChild(monthDiv);

        // Our "next" button
        const nextButton = document.createElement('button');
        nextButton.setAttribute('data-action', '1');
        nextButton.textContent = '\u003e';
        header.appendChild(nextButton);

        // Next/previous button functionality
        element.querySelectorAll('button').forEach((element) => {
            element.addEventListener('click', () => {
                console.log(element.getAttribute('data-action'));
                currentMonth.setMonth(
                    currentMonth.getMonth() * 1 +
                    parseInt(element.getAttribute('data-action')) * 1
                );
                loadMonth(currentMonth, content, monthDiv);
            });
        });

        // Load current month
        loadMonth(currentMonth, content, monthDiv);
    };

    const createDaysNamesCells = (content) => {
        for (let i = 0; i < dayList.length; i++) {
            const cell = document.createElement('span');
            cell.classList.add('cell');
            cell.classList.add('day');
            cell.textContent = dayList[i].substring(0, 3).toUpperCase();
            content.appendChild(cell);
        }
    };

    const createEmptyCellsIfNecessary = (content, date) => {
        for (let i = 0; i < date.getDay(); i++) {
            const cell = document.createElement('span');
            cell.classList.add('cell');
            cell.classList.add('empty');
            content.appendChild(cell);
        }
    };

    const loadMonth = (date, content, monthDiv) => {
        // Empty the calendar
        content.textContent = '';

        // Adding the month/year displayed
        monthDiv.textContent =
            monthList[date.getMonth()].toUpperCase() + ' ' + date.getFullYear();

        // Creating the cells containing the days of the week
        createDaysNamesCells(content);

        // Creating empty cells if necessary
        createEmptyCellsIfNecessary(content, date);

        // Number of days in the current month
        const monthLength = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        // Creating the cells containing current's month's days
        for (let i = 1; i <= monthLength; i++) {
            const cell = document.createElement('span');
            cell.classList.add('cell');
            cell.textContent = `${i}`;
            content.appendChild(cell);

            // Cell's timestamp
            const timestamp = new Date(
                date.getFullYear(),
                date.getMonth(),
                i
            ).getTime();
            cell.addEventListener('click', () => {
                console.log(timestamp);
                console.log(new Date(timestamp));

                document.querySelector('.cell.today')?.classList.remove('today');
                cell.classList.add('today');
            });

            // Add a special class for today
            if (timestamp === today.getTime()) {
                cell.classList.add('today');
            }
        }
    };
    return {
        init
    };
});
