export const labelConst = [{
	clientName: 'digitalops',
	mappings: {
			logoName: 'DevOps Dashboard',
			projectLabel: 'Projects',
			teamLabel: 'Teams',
			sprintLabel: 'Sprints',
			count: [{name:'Head Count'},{name:'Sprint Count'},{name: 'Team Head Count'}],
			feature: 'Features',
			userStory: 'User Stories',
			repository: 'Repository',
			branch: 'Branch',
			release: 'Release',
			roleDesignation: true,
			tabItems: [{name:'Overview',eventKey:'overview'},
						{name:'Security',eventKey:'security'},
						{name: 'Velocity and Efficiency',eventKey:'velocity'},
						{name: 'Quality',eventKey:'quality'},
						{name: 'Insights',eventKey:'insights'}],
	}
},
{
	clientName: 'aia',
	mappings: {
			logoName: 'AIA Dashboard',
			projectLabel: 'Projects',
			teamLabel: 'Teams',
			sprintLabel: 'Sprints',
			count: [{name:'Project Members'},{name:'Sprints'},{name: 'Team Members'}],
			feature: 'Features',
			userStory: 'User Stories',
			repository: 'Repository',
			branch: 'Branch',
			release: 'Release',
			roleDesignation: true,
			tabItems: [{name:'Overview',eventKey:'overview'},
						{name:'Security',eventKey:'security'},
						{name: 'Velocity and Efficiency',eventKey:'velocity'},
						{name: 'Quality',eventKey:'quality'},
						{name: 'Insights',eventKey:'insights'}]

	}
},
{
	clientName: 'wpc',
	mappings: {
			logoName: 'EY Dash',
			projectLabel: 'Portfolio',
			teamLabel: 'Projects',
			sprintLabel: 'Sprints',
			count: [],
			feature: 'Features',
			userStory: 'User Stories',
			repository: 'Repository',
			branch: 'Branch',
			release: 'Release',
			roleDesignation: false,
			tabItems: [{name: 'Velocity and Efficiency',eventKey:'velocity'},
						{name: 'Quality',eventKey:'quality'},
						{name:'Security',eventKey:'security'},
						{name: 'Insights',eventKey:'insights'}]
	}
}];