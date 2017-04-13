## Welcome!

We're so glad you're thinking about contributing to an 18F open source project! If you're unsure about anything, just [send us an email](mailto:18f@gsa.gov) with your question — or submit the issue or pull request anyway. The worst that can happen is you'll be politely asked to change something. We love all friendly contributions.

We want to ensure a welcoming environment for all of our projects. Our staff follow the [18F Code of Conduct](https://github.com/18F/code-of-conduct/blob/master/code-of-conduct.md) and all contributors should do the same.

We encourage you to read this project's CONTRIBUTING policy (you are here), its [LICENSE](LICENSE.md), and its [README](README.md).

* If you see an error or have feedback, the best way to let us know is to file an issue.
* To contribute a specific change to the site, outside contributors will need to fork this repo.

## High-level roadmap
The Crime Data Explorer project is composed of a few repositories:

0. [18f/crime-data-explorer](/18f/crime-data-explorer) - Main project repo
1. [18f/crime-data-api](/18f/crime-data-api)
2. [18f/crime-data-frontend](/18f/crime-data-frontend) - You are here
3. [18f/crime-data-prototypes](/18f/crime-data-prototypes)
4. [18f/crime-data-style](/18f/crime-data-style)

We track work across these repositories with [this Waffle.io board](https://waffle.io/18F/crime-data-explorer).

We keep a running list of changes to this application in the [CHANGELOG](CHANGELOG.md).

## Code standards

### Technology
- Languages
  - ES6 Javascript ([primer](http://webapplog.com/es6/))
  - CSS
- JS unit testing:
  - Jest
- View layer
  - [React (15.4.x)](https://facebook.github.io/react/docs/getting-started.html)
- Data/model layer
  - [Redux](http://redux.js.org/)
- Build
  - [Webpack](http://webpack.github.io/docs/)
  - [UglifyJS](https://github.com/mishoo/UglifyJS)
  - [Babel](https://babeljs.io/docs/setup/)
- Front end router
  - [React Router](https://github.com/ReactTraining/react-router/tree/v3/docs)

### Workflow
- Open branches off main repo (as opposed to a fork) due to secure CircleCI env vars.
- Add the "ready for review" label when the code is ready to be reviewed by another team member. You can also request a review from a specific person in Github.
  - Work-in-progress PRs are encouraged. Be sure to tag the review with "ready for review" when it's ready though.
- As another team member, review the code and ensure it conforms to the coding standards and exit criteria
  - PRs do not need to be assigned due to small team size
- When it is reviewed and ready to be merged, use Github's [Code
  Review](https://help.github.com/articles/approving-a-pull-request-with-required-reviews/)
  feature to approve the pull request.
- Any team member (code author or otherwise) can merge the code once it has an
  approved review.
  - Updates on PRs in the repo will be posted in the #fbi-cde-dev Slack channel

#### Other Git standards
- Squashing commits is allowed but discouraged, except in rare instances.
- The team prefers rebasing over merging, though we use GitHub to close out pull requests. This means that PRs will be merged, but if you're refreshing a local branch make sure to use rebase. For example, if you want to update your `staging` branch to reflect the most recent changes on GitHub use `git pull --rebase origin staging`.

### Branches
- Open branches off main repo due to Circle CI env var problem. For now, remember to branch off of the `master` branch.
- Begin the branch name with your first initials. This is helpful for keeping track of branch ownership.
- Include a short description of the feature that's being developed after your initial.

### Commit message
In general, commit messages can be written in whatever way the author decides, but here are some guidelines:
- Focus on the "why" rather then the "what".
- Have the first line be the "what".
- Discuss the "why" in more detail on subsequent lines.

### Coding style
- [Airbnb styleguide for JS](https://github.com/airbnb/javascript)
  - Re-add deprecation warnings on linter when upgrade react.
- [18F styleguide for CSS](https://pages.18f.gov/frontend/css-coding-styleguide/)
- Linting will be run before tests run, so will fail the tests if files are not linted.
- Additionally, linting should always
  - fail on CI
  - should not stop watching commands
  - should not fail builds
  - should fail test runs

### Linting
The code base includes linting configurations and tools, but is currently not fully linted. This means that there's an "opt-in" policy to linting: you decide when to add a file to linting.
- Theres a lint ignore file, `.eslintignore` with all non-linted files.
- If you touch another file that isn't linted yet, you should generally fix it and remove it from the lint ignore.
  - Unless under strict time constraints.
- No new files should be added to the lint ignore. Consequently, all new files should be linted.

### Code review
- When doing code reviews, the reviewer should pull down the code and test on their local computer. This is because the staging site is not often used, meaning bugs could be present for long amounts of time.
  - If a code change is very simple, or is not a code change (but maybe a document change) it doesn't need to be pulled down.

## Experience principles

### Device support
- Browser support is all major browsers and Internet Explorer 10 and up.
- Pages and views should work on different device screen-sizes, and should work as specified in design mockups.
  - If making a feature work on mobile is time-consuming, and there isn't an official design for the mobile view of the feature yet, the mobile view can be held off until a design becomes available.
- Support for browsers not running javascript should be attempted if it's easy, but not a major focus
  - Eventually the react code base will allow server-side, isomorphic rendering
    for both performance and support reasons. This means code should attempt to
    ensure things work without it when it's not detrimental to project timeline
    to do so.

### Performance
Adding performance tracking and metrics is currently a TODO. Here are some items in consideration:

- What metrics should be tracked? ie: page load, speed index, custom events, number of requests, total request size, etc.
- When should performance be measured? ie: on live staging site, locally during test runs.
- How should performance be measured? ie: with what tools
- What should performance budgets for decided metrics be? ie: faster then 1000 for speed index, faster then 1s for certain custom event, total request size below 2mb.
- How should performance metrics and budgets be incorporated into workflow? Going over a budget requires re-implementation, or issue.
- Any library added that's total file size is above 25kb should be evaluated for performance affect.
