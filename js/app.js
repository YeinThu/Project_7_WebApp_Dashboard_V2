// Variables
const bellContainer = document.querySelector('.bell-container');
const dot = document.querySelector('.dot');
const navLinks = document.querySelectorAll('.nav-container a');
const alertBanner = document.querySelector('#alert');
const user = document.getElementById('userField');
const message = document.getElementById('messageField');
const send = document.getElementById('send');
// Canvas Variables
const trafficCanvas = document.querySelector('#traffic-chart');
const dailyCanvas = document.querySelector('#daily-chart');
const mobileCanvas = document.querySelector('#mobile-chart');

// Notification Bell
bellContainer.addEventListener('click', (e) => {
  const target = e.target;

  dot.style.display = 'none';

  $('.notifications').toggle();
})

// Nav Links
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const navContainer = document.querySelector('.nav-container .active');
    
    if (e.target.tagName === 'IMG') {
      navContainer.className = '';
      e.target.parentElement.className = 'active';
    }
    else {
      navContainer.className = '';
      e.target.className = 'active';
    }
  })
})

// Alert HTML
alertBanner.innerHTML = `
  <div class="alert-banner">
    <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
    <a class="alert-banner-close">x</a>
  </div>
`;

// Alert Banner
alertBanner.addEventListener('click', (e) => {
  if (e.target.className === 'alert-banner-close') {
    e.target.parentElement.remove();
  }
})

// Send Event Listener
send.addEventListener('click', e => {
  e.preventDefault();

  if (user.value === '' && message.value === '') {
    alert('Please fill out user and message fields before sending');
  } else if (user.value === '') {
    alert('Please fill out user field before sending');
  } else if (message.value === '') {
    alert('Please fill out message field before sending');
  } else {
    alert(`Message successfully sent to: ${user.value}`);
  }
});

// Traffic Weekly Data
let trafficWeeklyData = {
  labels: ['16-22', '23-29', '30-5', '6-12', '13-19', '20-26', '27-3', '4-10', '11-17', '18-24', '25-31'],
  datasets: [{
    data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1
  }]
};

// Traffic Hourly Data
let trafficHourlyData = {
  labels: ['10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
  datasets: [{
    data: [25, 30, 15, 35, 20, 45, 20, 15, 35, 15, 20],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1
  }]
}

// Traffic Daily Data
let trafficDailyData = {
  labels: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [{
    data: [225, 350, 300, 150, 250, 450, 300, 250, 400, 350, 200],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1
  }]
}

// Traffic Monthly Data
let trafficMonthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
  datasets: [{
    data: [2900, 5100, 4500, 3600, 3200, 5700, 4200, 3100, 5500, 2600, 5400],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 1
  }]
}

// Traffic Options
let trafficOptions = {
  aspectRatio: 2.5,
  animation: {
    duration: 0
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
};

// Traffic Chart
function createTrafficChart(data) {
  let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data,
    options: trafficOptions
  });
}

// Traffic Elements 
const trafficNavLinks = document.querySelectorAll('.traffic-nav-link');
const trafficNavUl = document.querySelector('.traffic-nav');

// Load Chart On Page Load
window.addEventListener('DOMContentLoaded', function() {
  let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficWeeklyData,
    options: trafficOptions
  });
})

// Traffic Graph Event Listener 
trafficNavLinks.forEach(trafficNavLink => {
  trafficNavLink.addEventListener('click', e => {
    let current = e.target;
    trafficNavUl.querySelector('.current').classList.remove('current');
    current.classList.add('current');

    if (current.textContent === 'Weekly') {
      createTrafficChart(trafficWeeklyData);
    }
    if (current.textContent === 'Hourly') {
      createTrafficChart(trafficHourlyData);
    }
    if (current.textContent === 'Daily') {
      createTrafficChart(trafficDailyData);
    }
    if (current.textContent === 'Monthly') {
      createTrafficChart(trafficMonthlyData);
    }
    
  })
})

// Daily Traffic Data
const dailyData = {
  labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  datasets: [{
    label:'# of Hits',
    data: [75, 115, 175, 125, 225, 200, 100],
    backgroundColor: '#7477BF',
    borderWidth: 1
  }]
};

// Daily Traffic Options
const dailyOptions = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  legend: {
    display: false
  }
};

// Daily Traffic Chart
let dailyChart = new Chart(dailyCanvas, {
  type: 'bar',
  data: dailyData,
  options: dailyOptions
});

// Mobile Data
const mobileData = {
  labels: ['Desktop', 'Tablet', 'Phones'],
  datasets: [{
    label: '# of Users',
    data: [2000, 550, 500],
    borderWidth: 0,
    backgroundColor: ['#7477BF', '#78CF82', '#51B6C8']
  }]
};

// Mobile Options
const mobileOptions = {
  legend: {
    position: 'right',
    labels: {
      boxWidth: 20,
      fontStyle: 'bold'
    }
  }
};

// Mobile Chart
let mobileChart = new Chart(mobileCanvas, {
  type: 'doughnut',
  data: mobileData,
  options: mobileOptions
});

// Local Storage For Settings
// Settings Elements
const emailSwitch = document.querySelector('.email-switch');
const publicSwitch = document.querySelector('.public-switch');
const timeZone = document.querySelector('#timezone');
const saveBtn = document.querySelector('#save');
const cancelBtn = document.querySelector('.button-cancel');

// Get Settings From Local Storage
function getSettingsFromStorage() {
  let settings;

  if (localStorage.getItem('settings') == null) {
    settings = [];
  }
  else {
    settings = JSON.parse(localStorage.getItem('settings'))
  }

  return settings;
}

// Set Settings To Local Storage
function setSettingsInStorage(email, public, timeZoneValue) {
  let settings = getSettingsFromStorage();
  let mySettings = {
    email,
    public,
    timeZoneValue
  };

  settings.push(mySettings);

  localStorage.setItem('settings', JSON.stringify(settings));
}

// Save Settings Event Listener
saveBtn.addEventListener('click', () => {
  let email = emailSwitch.checked ? 'Send Email Notification: Yes' : 'Send Email Notification: No';
  let public = publicSwitch.checked ? 'Set Profile To Public: Yes' : 'Set Profile To Public: No';
  let timeZoneValue = timeZone.options[timeZone.selectedIndex].text;

  setSettingsInStorage(email, public, timeZoneValue);
})

// Clear Local Storage
cancelBtn.addEventListener('click', () => {
  localStorage.clear();
})