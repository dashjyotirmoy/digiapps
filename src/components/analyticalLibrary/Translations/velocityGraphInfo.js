export const velocityGraphInfo = {
  "Release Cycle Time": ` <div>
  <p>
  Release Cycle Time depicts the time taken by a user story and/or a bug
  to change from active (when the work starts) to closed (when the work
  is completed) state at a sprint level. This involves measuring the cycle time for each issue (story, bug,
    etc.) we work on from the time we start coding until the issue is
    resolved and the code change is released to production and being used
    by the customers.
</p>

<p>
  For eg: If a user story / bug is created and assigned to some
  developer on 01/01/2000 (the work state is New), then suppose the
  developer takes up the task and start working on it on 07/01/2000 (the
  work state is changed to Active now) and completes the task on
  09/01/2000 (the work state is changed to Closed now). 
  </p>
  <p>Here Release Cycle Time is calculated from 07/01/2000 to 09/01/2000
  i.e, 2 days
  </p>
</p>

      
    </div>`,
  "Deployment Lead Time": `<p>
    Deployment Lead Time depicts the time taken by a user story and/or a
    bug to change from new (when the work is created) to closed (when the
    work is completed) state at a sprint level.
  </p>
  <p>
    For eg: If a user story / bug is created and assigned to some
    developer on 01/01/2000 (the work state is New), then suppose the
    developer takes up the task and start working on it on 07/01/2000 (the
    work state is changed to Active now) and completes the task on
    09/01/2000 (the work state is changed to Closed now).
  </p>
  <p>
    Here Deployment Lead Time is calculated from 01/01/2000 to 09/01/2000
    i.e, 9 days
  </p>`,
  "Deployment/ Change Frequency": ` <p>
  Deployment Lead Time depicts the time taken by a user story and/or a
  bug to change from new (when the work is created) to closed (when the
  work is completed) state at a sprint level.
</p>
<p>
  For eg: If a user story / bug is created and assigned to some
  developer on 01/01/2000 (the work state is New), then suppose the
  developer takes up the task and start working on it on 07/01/2000 (the
  work state is changed to Active now) and completes the task on
  09/01/2000 (the work state is changed to Closed now).
</p>
<p>
  Here Deployment Lead Time is calculated from 01/01/2000 to 09/01/2000
  i.e, 9 days
</p>`,

  "Project Burndown": ` <p>
    Project Burndown shows how many story points are completed and how
    many are left to be completed across sprints of the project.
  </p>
  <p>
    It also shows the average project burndown, number of items not
    estimated, total scope increase, total story points remaining and the
    completed percentage.
  </p>
  <p>
    Original scope is all remaining story points as of the specified?Start
    Date of Sprint 1 (first three days of sprint 1)
  </p>
  
  <h6>Percentage completed is calculated by</h6>
  <p>
    Percentage Completed = (No. of story points completed till date) / (
    Total scope) * 100
  </p>
  <p>
    Items not estimated: No. of user stories that do not have a value for
    “story points”, i.e., where story points is null.
  </p>
  <p>
    Total scope increase is calculated by the summation of story points in
    user stories which are added after the sprint starts with a grace
    period of 2 days (from start date) for each sprint.
  </p>
  <h6>Story points remaining per sprint is calculated by:</h6>
  <p>
    Total Story Points in that sprint - Closed Story Points in that sprint
  </p>
  `,

  "Sprint Burndown": ` <p>
    Sprint Burndown shows how many hours are left to be burnt each day in
    a particular sprint that is selected in the project metrics.
  </p>
  <p>
    It also displays the average sprint burndown, total scope increase,
    total hours remaining and the completed percentage
  </p>
  <h6>Original Scope</h6>
  <p>
    Original Scope will be evaluated based on the total no. of hours
    planned at the start of the sprint (first three days of a sprint).
  </p>
  <h6>Average Burndown (Bavg) is calculated by:</h6>
  <p>Bavg = (Original Scope-Hl) / D</p>
  <p>Where,</p>
  <p>Hl = No. of remaining hours on last day of the sprint,</p>
  <p>
    D = Duration of the sprint (weekends, i.e., Sat and Sun are not
    included).
  </p>`,

  "Velocity Trend": `<p>
    Velocity Trend shows the comparison between planned and delivered
    story points till the current sprint. We are also setting the
    allowable upper limit and lower limit as +/-10% for sprint-wise
    efficiency analysis.
  </p>`
};
