// When prompted, you can enter your OAuth token, but we recommend you set up a variable for it:
// You can use -u "username:$token" and set up a variable for token to avoid leaving your token in shell history, which should be avoided.
// curl -i -u username:$token https://api.github.com/users/octocat
// unauthenticated request
// curl -i https://api.github.com/repos/twbs/bootstrap

//The format of the search query is:
// q=SEARCH_KEYWORD_1+SEARCH_KEYWORD_N+QUALIFIER_1+QUALIFIER_N
// q=GitHub+Octocat+in:readme+user:defunkt

// search repos example https://help.github.com/en/github/searching-for-information-on-github/searching-for-repositories
//curl https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc

// You can search for multiple topics by adding more topic: instances, and including the mercy-preview header. For example:
// curl -H "Accept: application/vnd.github.mercy-preview+json" https://api.github.com/search/repositories?q=topic:ruby+topic:rails

//res example
// [
//     {
//     "id": 56125,
//     "node_id": "MDEwOlJlcG9zaXRvcnk1NjEyNQ==",
//     "name": "clearance",
//     "full_name": "thoughtbot/clearance",
//     "private": false,
//     "owner": {
//       "login": "thoughtbot",
//       "id": 6183,
//       "node_id": "MDEyOk9yZ2FuaXphdGlvbjYxODM=",
//       "avatar_url": "https://avatars3.githubusercontent.com/u/6183?v=4",
//       "gravatar_id": "",
//       "url": "https://api.github.com/users/thoughtbot",
//       "html_url": "https://github.com/thoughtbot",
//       "followers_url": "https://api.github.com/users/thoughtbot/followers",
//       "following_url": "https://api.github.com/users/thoughtbot/following{/other_user}",
//       "gists_url": "https://api.github.com/users/thoughtbot/gists{/gist_id}",
//       "starred_url": "https://api.github.com/users/thoughtbot/starred{/owner}{/repo}",
//       "subscriptions_url": "https://api.github.com/users/thoughtbot/subscriptions",
//       "organizations_url": "https://api.github.com/users/thoughtbot/orgs",
//       "repos_url": "https://api.github.com/users/thoughtbot/repos",
//       "events_url": "https://api.github.com/users/thoughtbot/events{/privacy}",
//       "received_events_url": "https://api.github.com/users/thoughtbot/received_events",
//       "type": "Organization",
//       "site_admin": false
//     },
//     "html_url": "https://github.com/thoughtbot/clearance",
//     "description": "Rails authentication with email & password.",
//     "fork": false,
//     "url": "https://api.github.com/repos/thoughtbot/clearance",
//     "forks_url": "https://api.github.com/repos/thoughtbot/clearance/forks",
//     "keys_url": "https://api.github.com/repos/thoughtbot/clearance/keys{/key_id}",
//     "collaborators_url": "https://api.github.com/repos/thoughtbot/clearance/collaborators{/collaborator}",
//     "teams_url": "https://api.github.com/repos/thoughtbot/clearance/teams",
//     "hooks_url": "https://api.github.com/repos/thoughtbot/clearance/hooks",
//     "issue_events_url": "https://api.github.com/repos/thoughtbot/clearance/issues/events{/number}",
//     "events_url": "https://api.github.com/repos/thoughtbot/clearance/events",
//     "assignees_url": "https://api.github.com/repos/thoughtbot/clearance/assignees{/user}",
//     "branches_url": "https://api.github.com/repos/thoughtbot/clearance/branches{/branch}",
//     "tags_url": "https://api.github.com/repos/thoughtbot/clearance/tags",
//     "blobs_url": "https://api.github.com/repos/thoughtbot/clearance/git/blobs{/sha}",
//     "git_tags_url": "https://api.github.com/repos/thoughtbot/clearance/git/tags{/sha}",
//     "git_refs_url": "https://api.github.com/repos/thoughtbot/clearance/git/refs{/sha}",
//     "trees_url": "https://api.github.com/repos/thoughtbot/clearance/git/trees{/sha}",
//     "statuses_url": "https://api.github.com/repos/thoughtbot/clearance/statuses/{sha}",
//     "languages_url": "https://api.github.com/repos/thoughtbot/clearance/languages",
//     "stargazers_url": "https://api.github.com/repos/thoughtbot/clearance/stargazers",
//     "contributors_url": "https://api.github.com/repos/thoughtbot/clearance/contributors",
//     "subscribers_url": "https://api.github.com/repos/thoughtbot/clearance/subscribers",
//     "subscription_url": "https://api.github.com/repos/thoughtbot/clearance/subscription",
//     "commits_url": "https://api.github.com/repos/thoughtbot/clearance/commits{/sha}",
//     "git_commits_url": "https://api.github.com/repos/thoughtbot/clearance/git/commits{/sha}",
//     "comments_url": "https://api.github.com/repos/thoughtbot/clearance/comments{/number}",
//     "issue_comment_url": "https://api.github.com/repos/thoughtbot/clearance/issues/comments{/number}",
//     "contents_url": "https://api.github.com/repos/thoughtbot/clearance/contents/{+path}",
//     "compare_url": "https://api.github.com/repos/thoughtbot/clearance/compare/{base}...{head}",
//     "merges_url": "https://api.github.com/repos/thoughtbot/clearance/merges",
//     "archive_url": "https://api.github.com/repos/thoughtbot/clearance/{archive_format}{/ref}",
//     "downloads_url": "https://api.github.com/repos/thoughtbot/clearance/downloads",
//     "issues_url": "https://api.github.com/repos/thoughtbot/clearance/issues{/number}",
//     "pulls_url": "https://api.github.com/repos/thoughtbot/clearance/pulls{/number}",
//     "milestones_url": "https://api.github.com/repos/thoughtbot/clearance/milestones{/number}",
//     "notifications_url": "https://api.github.com/repos/thoughtbot/clearance/notifications{?since,all,participating}",
//     "labels_url": "https://api.github.com/repos/thoughtbot/clearance/labels{/name}",
//     "releases_url": "https://api.github.com/repos/thoughtbot/clearance/releases{/id}",
//     "deployments_url": "https://api.github.com/repos/thoughtbot/clearance/deployments",
//     "created_at": "2008-09-24T19:57:58Z",
//     "updated_at": "2020-02-18T07:42:35Z",
//     "pushed_at": "2020-02-12T16:43:40Z",
//     "git_url": "git://github.com/thoughtbot/clearance.git",
//     "ssh_url": "git@github.com:thoughtbot/clearance.git",
//     "clone_url": "https://github.com/thoughtbot/clearance.git",
//     "svn_url": "https://github.com/thoughtbot/clearance",
//     "homepage": "https://thoughtbot.com",
//     "size": 6521,
//     "stargazers_count": 3235,
//     "watchers_count": 3235,
//     "language": "Ruby",
//     "has_issues": true,
//     "has_projects": true,
//     "has_downloads": true,
//     "has_wiki": true,
//     "has_pages": false,
//     "forks_count": 432,
//     "mirror_url": null,
//     "archived": false,
//     "disabled": false,
//     "open_issues_count": 15,
//     "license": {
//       "key": "mit",
//       "name": "MIT License",
//       "spdx_id": "MIT",
//       "url": "https://api.github.com/licenses/mit",
//       "node_id": "MDc6TGljZW5zZTEz"
//     },
//     "topics": [
//       "clearance",
//       "rails",
//       "rails-authentication",
//       "ruby",
//       "rubygem",
//       "thoughtbot"
//     ],
//     "forks": 432,
//     "open_issues": 15,
//     "watchers": 3235,
//     "default_branch": "master",
//     "score": 1.0
//   },
// ...]
