Project Description:
    "MedLog is an app to help parents keep track of their family members' medical records and schedules.  A person can create a record containing information about which medication(s) and the times they need to be taken, for everyone in the family, including pets.  After filling out the details of each family member, which medicine they are on, a schedule can be viewed for the entire family, to see who needs to take what and when.  A calendar view can show everyone's appointments all together or filtered to just display a single person's schedule or log.  Entries can be added to a person's log when side effects, reactions, or symptoms appear, or if a scheduled appointment was missed."

Project Links:
    Live deploy:
    https://james-medlog.herokuapp.com
    Github client:
    https://github.com/thinkful-ei26/james-Medlog-client
    Github server:
    https://github.com/thinkful-ei26/james-Medlog-server

Project Stack:
    React for the frontend
    Redux for state management
    Node for the backend
    Express backend framework
    MongoDB for the database
    JWTs for authentication
    Mocha and Chai for endpoint testing
    Enzyme for React component testing

Screenshots:

<img src='./medlog-landing.png' alt='welcome'/>
<img src='./medlog-login.png' alt='login screen'/>

Create, update and remove family members is easy:

<img src='./medlog-family.png' alt='family screen' />

Create, update, and remove medication, also easy:

<img src='./medlog-medicine.png' alt='medicine screen' />

Start, Stop, and view who is using which medicines:

<img src='./medlog-treatment.png' alt='treatment screen' />

Starting someone on medicine adds a calendar viewable by month, day or week:

<img src='./medlog-day.png' alt='single day screen'/>

Also record medical related events in a filterable log.

<img src='./medlog-journal.png' alt='journal screen' />


Changing the medicine times:

<img src='./medicine-updated.png' alt='changes to schedule' />


Automatically adjusts the schedule:

<img src='./calendar-updated.png' alt='calendar updated' />


Stopping treatment clears the future scheduled events,
but keeps the history as a record:

<img src='./med-stop-keeps-history-clear-schedule.png' alt='calendar updated' />


Trying to start treatment or a journal comment without at least 1 person and 1 medication
displays buttons for the user to add people and medicine
and shows the number currently on the account:

<img src='./medlog-emptyFamily.png' alt='alternate add people and meds screen' />


Project Codebase:

/
    this readme
    the package.json
    the readme pictures

/public
    the welcome page pictures
    the main index.html file

/src
    the redux store in store.js
    the jwt token management in local-storage.js

    /src/actions
    actions for new accounts in register.js
    actions for login and token refreshing in auth.js
    calendar schedule events actions in events.js
    actions for medicines in meds.js
    family member actions in patients.js
    journal actions in log.js

    /src/components
    the home component in home.js
    home renders the header component from header.js
    the header renders the NavMenu component from navMenu.js
    home handles routes for registering new users with FormRegister.js and registerPage.js
    home handles logging in with formLogin.js and login.js
    after logging in the calendar view is served with calendar.js and it's filter with filter.js
    the navigation menu can be used to reach the family view with patient.js which gives each person a form via patientSingle.js
    the nav menu can also be used to view the medicines in medicine.js where each medicine has its own form from meds_single.js
    the nav menu Account details link shows the userinfo.js component for changing or account deletion
    the treatment nav menu link shows the treatment.js which handles showing which family members are currently scheduled for 1 or more medicines and starting and stopping new schedules
    finally the journal option on the nav menu renders the log.js component which displays the filter.js component and the log_single.js component

    /src/reducers
    redux state reducers
    eventsReducer in events.js,
    authReducer in auth.js,
    registerReducer in register.js,
    patienceReducer in patients.js,
    medsReducer in meds.js,
    logsReducer in log.js
