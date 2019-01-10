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