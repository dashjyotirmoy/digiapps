export default [
  {
    title: "Velocity and Efficiency ",
    list: [
      {
        head: "Release Cycle Time",
        subItem: [
          "Indicates whether DevOps methodologies have helped or hindered the teams ability to get functionality to market",
          "Lesser cycle time means the organisation can launch products to market faster",
          "Longer cycle time could indicate that the development process isn't efficient enough and there might be bottlenecks in the process",
          "Should reduce as the team gets a better hold of DevOps methodologies "
        ]
      },
      {
        head: "Deployment Lead Time",
        subItem: [
          "Indicates the efficiency of the development process, complexity of the code and team and developer capabilities",
          "Should reduce as the team gets a better hold of  DevOps methodologies",
          "If the lead time is much higher than cycle time, it indicates large inventory or WIP "
        ]
      }
    ]
  },
  {
    title: "Quality",
    list: [
      {
        head: "SonarQube Metrics",
        subItem: [
          "Bugs track code that is demonstrably wrong or highly likely to yield unexpected behaviour",
          "Vulnerabilities are raised on code that is potentially vulnerable to exploitation by hackers",
          "Code smells are maintainability issues in the code that indicates design weakness which will slow down development and increase risk of bugs and failures in future",
          "Coverage is the portion of code covered by unit tests",
          "Duplication indicates duplication of code in terms of lines of code, code blocks and files"
        ]
      },
      {
        head: "Outstanding Bugs",
        subItem: [
          "Gives the difference between the number of defects found and fixed-highlighting the numbers of open defects by criticality"
        ]
      },
      {
        head: "Average Defect Resolution Time",
        subItem: [
          "This metrics gives the average time taken to resolve issues. This is useful to show you the trends in resolution time. Lower resolution time means team can fix issues faster"
        ]
      }
    ]
  },
  {
    title: "Organizational Effectiveness",
    list: [
      {
        head: "Interpretation",
        subItem: [
          "A high ratio indicates a mature team that is able to spend the majority of its time on delivering new functionality",
          "A high ratio indicates that more team members are getting the opportunity to build emerging skills, thereby leading to higher employee satisfaction",
          "Knowledge sharing is an essential aspect of DevOps principles and behaviour, and should increase with team members adoption of DevOps practices"
        ]
      }
    ]
  },
  {
    title: "Customer Value",
    list: [
      {
        head: "Feature Usage",
        subItem: [
          "With faster delivery of applications and features and quicker feedback loops, the features would ideally be more aligned to customer needs, thereby increasing feature usage",
          "It is also to handle the increased demand and traffic, and make the required changes",
          "High user satisfaction indicates users are happy with the effectiveness and quality of a product or feature",
          "If the rating is low, use user satisfaction surveys and NPS to understand the reasons for users dissatisfaction"
        ]
      }
    ]
  }
];
