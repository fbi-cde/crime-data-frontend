# Change Log
All notable changes to this project be documented in this file.

## [2.14.1] - 2017-08-03
### Fixed
- Agency name is persistent through page refresh ([#1190](https://github.com/18F/crime-data-frontend/issues/1190))

### Removed
- Remove supplemental homicide report download link & description ([crime-data-explorer#273](https://github.com/18F/crime-data-explorer/issues/273))


## [2.14.0] - 2017-08-02
### Added
- Toggle for count/percent of sex demographic stacked bar chart ([#1182](https://github.com/18F/crime-data-frontend/pull/1182))

### Fixed
- Prevent scrolling underneath sidebar on mobile ([#984](https://github.com/18F/crime-data-frontend/issues/984))
- Only show two trend lines in Explorer ([crime-data-explorer#261](https://github.com/18F/crime-data-explorer/issues/261))
- Prevent empty feedback submissions ([crime-data-explorer#267](https://github.com/18F/crime-data-explorer/issues/267))


## [2.13.0] - 2017-07-25
### Added
- Arrest data and Supplemental Homicide Report (SHR) data descriptions ([#1174](https://github.com/18F/crime-data-frontend/pull/1174))

### Fixed
- Use number of offenses for NIBRS text ([crime-data-explorer#259](https://github.com/18F/crime-data-explorer/issues/259))


## [2.12.1] - 2017-07-20
### Fixed
- Use proper snippet for [Digital Analytics Program (DAP)](https://www.digitalgov.gov/services/dap/) ([#1175](https://github.com/18F/crime-data-frontend/issues/1175))


## [2.12.0] - 2017-07-19
### Added
- [Digital Analytics Program (DAP)](https://www.digitalgov.gov/services/dap/) integration ([#1137](https://github.com/18F/crime-data-frontend/issues/1137))

### Changed
- Gzip generated CSS as well as the JS ([#1152](https://github.com/18F/crime-data-frontend/pull/1152))
- Make source text more consistent ([#1159](https://github.com/18F/crime-data-frontend/pull/1159))
- Better meta tags for social network sharing ([#1162](https://github.com/18F/crime-data-frontend/pull/1162))

### Removed
- Restrictions from `robots.txt` ([#1168](https://github.com/18F/crime-data-frontend/pull/1168))


## [2.11.1] - 2017-07-14
### Fixed
- Bigger NIBRS histogram touch targets ([#524](https://github.com/18F/crime-data-frontend/issues/524))
- Feedback tool fits better on small displays ([#988](https://github.com/18F/crime-data-frontend/issues/988))
- Handle agencies that have no associated coordinates ([#1158](https://github.com/18F/crime-data-frontend/pull/1158))
- Upgrade Node to `6.11.x` ([#1161](https://github.com/18F/crime-data-frontend/pull/1161))


## [2.11.0] - 2017-07-12
### Added
- Legend to distinguish between the legacy and revised rape definitions in trend chart ([#1150](https://github.com/18F/crime-data-frontend/pull/1150))

### Changed
- Do not show NIBRS related details for violent/property crime at the agency level ([#1146](https://github.com/18F/crime-data-frontend/pull/1146))
- Upgrade to webpack 2 and a single configuration file ([#1147](https://github.com/18F/crime-data-frontend/pull/1147))
- Refactor analytics and sharing utils into components ([#1152](https://github.com/18F/crime-data-frontend/pull/1152))

### Fixed
- Agency chart year comparison text handles no data years ([#1098](https://github.com/18F/crime-data-frontend/issues/1098)))
- API footer design ([#1125](https://github.com/18F/crime-data-frontend/issues/1125))


## [2.10.0] - 2017-07-10
### Added
- Show agency location on map ([#1116](https://github.com/18F/crime-data-frontend/pull/1116))

### Changed
- Histogram click and hover behavior work better on tap devices ([#1129](https://github.com/18F/crime-data-frontend/pull/1129))
- Reference to the number of agencies in the UCR program ([#1132](https://github.com/18F/crime-data-frontend/pull/1132))
- The newest service worker should control the site ([#1139](https://github.com/18F/crime-data-frontend/pull/1139))
- Some definitions updated with feedback from the FBI ([crime-data-explorer#238](https://github.com/18F/crime-data-explorer/issues/238))

### Fixed
- Trend chart legend is scrollable in on mobile ([#980](https://github.com/18F/crime-data-frontend/issues/980))


## [2.9.1] - 2017-06-06
### Changed
- Use `<h2>` instead of `<h3>` to preserve the document outline ([#1121](https://github.com/18F/crime-data-frontend/pull/1121))

### Fixed
- Load NIBRS data for agencies ([#1123](https://github.com/18F/crime-data-frontend/pull/1123))
- Rape trend chart download ([crime-data-explorer#229](https://github.com/18F/crime-data-explorer/issues/229))


## [2.9.0] - 2017-06-30
### Added
- Map for Washington, DC ([#1050](https://github.com/18F/crime-data-frontend/pull/1050))
- Caveats for agency chart ([#1053](https://github.com/18F/crime-data-frontend/issues/1053))

### Changed
- Responsiveness of no data indicators in agency charts ([#1048](https://github.com/18F/crime-data-frontend/pull/1048))
- Update NIBRS chart designs ([#1055](https://github.com/18F/crime-data-frontend/pull/1055), [#1056](https://github.com/18F/crime-data-frontend/pull/1056),
[#1057](https://github.com/18F/crime-data-frontend/pull/1057), [crime-data-explorer#198](https://github.com/18F/crime-data-explorer/issues/198))
- Other dataset descriptions ([#1058](https://github.com/18F/crime-data-frontend/pull/1058))
- Stick US state button at the bottom of agency search ([#1060](https://github.com/18F/crime-data-frontend/pull/1060))
- Content for revised rape definition ([#1067](https://github.com/18F/crime-data-frontend/issues/1067))
- Content on homepage and about page ([#1076](https://github.com/18F/crime-data-frontend/pull/1076))
- Active development banner text ([#1089](https://github.com/18F/crime-data-frontend/pull/1089))
- a11y compliance for the form elements ([#1093](https://github.com/18F/crime-data-frontend/pull/1093))
- Update agency names to include "Police Department" and "Sheriff's Office" ([#1096](https://github.com/18F/crime-data-frontend/pull/1096), [#1111](https://github.com/18F/crime-data-frontend/pull/1111), [#1113](https://github.com/18F/crime-data-frontend/pull/1113))
- Deploy URLs changed for the different environments ([#1097](https://github.com/18F/crime-data-frontend/pull/1097), [#1110](https://github.com/18F/crime-data-frontend/pull/1110))
- Include PII warning in feedback tool ([#1107](https://github.com/18F/crime-data-frontend/pull/1107))

### Fixed
- Trend download CSV ([#1059](https://github.com/18F/crime-data-frontend/pull/1059), [#1075](https://github.com/18F/crime-data-frontend/pull/1075), [#1081](https://github.com/18F/crime-data-frontend/pull/1081))

### Removed
- Contact us section on the about page ([#1054](https://github.com/18F/crime-data-frontend/pull/1054))
- Trend series labels for states and the nation ([#1072](https://github.com/18F/crime-data-frontend/pull/1072))
- Phone number from footer ([#1108](https://github.com/18F/crime-data-frontend/pull/1108))
- HTTP basic authentication ([#1117](https://github.com/18F/crime-data-frontend/pull/1117))


## [2.8.0] - 2017-06-23
### Added
- Dynamic page titles ([#1024](https://github.com/18F/crime-data-frontend/pull/1024))
- Add US state button to bottom of agency search results ([#1028](https://github.com/18F/crime-data-frontend/pull/1028))
- Show trend lines for both rape definitions ([#1038](https://github.com/18F/crime-data-frontend/pull/1038))

### Changed
- Alphabetize race and ethnicity of offenders/victims ([#821](https://github.com/18F/crime-data-frontend/issues/821))
- Update README with instructions about getting api.data.gov API keys ([#1018](https://github.com/18F/crime-data-frontend/pull/1018))
- Use `/arson` endpoint ([#1025](https://github.com/18F/crime-data-frontend/pull/1025))
- Include crime glossary term in agency overview text ([#1037](https://github.com/18F/crime-data-frontend/pull/1037))
- Use bold text in national overview ([#1041](https://github.com/18F/crime-data-frontend/pull/1041))
- Improve error states for data loading errors ([crime-data-explorer#192](https://github.com/18F/crime-data-explorer/issues/192))

### Fixed
- Footer no longer covers page on iPad ([#799](https://github.com/18F/crime-data-frontend/issues/799))
- Page no longer stays zoomed after closing glossary ([#973](https://github.com/18F/crime-data-frontend/issues/973))
- Data download boxes on homepage are equally sized ([#975](https://github.com/18F/crime-data-frontend/issues/975))
- Using trend chart year selector no longer zooms in ([#983](https://github.com/18F/crime-data-frontend/issues/983))
- Show place thumbnail on tablet sized displays ([#992](https://github.com/18F/crime-data-frontend/issues/992))
- 404 page works for static assets ([crime-data-explorer#209](https://github.com/18F/crime-data-explorer/issues/209))


## [2.7.0] - 2017-06-22
### Added
- Handle errors from API requests in action creators ([#909](https://github.com/18F/crime-data-frontend/pull/909))
- State and national overview text have "estimated" term component ([#925](https://github.com/18F/crime-data-frontend/pull/925))
- Include offender and victim ethnicity in NIBRS charts ([#933](https://github.com/18F/crime-data-frontend/pull/933))
- Favicon ([#936](https://github.com/18F/crime-data-frontend/pull/936))
- Estimated and US territory datasets to the Downloads page ([#937](https://github.com/18F/crime-data-frontend/pull/937), [#1026](https://github.com/18F/crime-data-frontend/pull/1026))
- 404 page ([#943](https://github.com/18F/crime-data-frontend/pull/943))
- FBI and CDE logos in the footer ([crime-data-explorer#117](https://github.com/18F/crime-data-explorer/issues/117))

### Changed
- Glossary icon can be displayed as multiple sizes based on contextual copy ([#885](https://github.com/18F/crime-data-frontend/pull/885))
- Refine agency search interface and behavior ([#897](https://github.com/18F/crime-data-frontend/pull/897), [#953](https://github.com/18F/crime-data-frontend/pull/953), [#960](https://github.com/18F/crime-data-frontend/pull/960)
[#967](https://github.com/18F/crime-data-frontend/pull/967))
- Use a service worker instead of `localStorage` ([#906](https://github.com/18F/crime-data-frontend/pull/906))
- Use https://api.data.gov API for `-demo` app ([#908](https://github.com/18F/crime-data-frontend/pull/908))
- Filter out federal agencies from agency search results ([#917](https://github.com/18F/crime-data-frontend/pull/917))
- Lazily load agency data into the application ([#928](https://github.com/18F/crime-data-frontend/pull/928))
- Adjust Explorer introduction text to use crime name ([#961](https://github.com/18F/crime-data-frontend/pull/961))
- Modify the About page layout, map and content ([#968](https://github.com/18F/crime-data-frontend/pull/968), [#991](https://github.com/18F/crime-data-frontend/pull/991))
- Glossary placeholder text is relevant to CDE ([#969](https://github.com/18F/crime-data-frontend/pull/969))
- Use `swagger.json` from API instead of local file ([#998](https://github.com/18F/crime-data-frontend/pull/998))
- Use data reporting method specific units in agency chart text ([#1000](https://github.com/18F/crime-data-frontend/pull/1000))
- Update Downloads and Docs page layout and content ([#1001](https://github.com/18F/crime-data-frontend/pull/1001))
- Use whole numbers for agency chart Y axis ([crime-data-explorer#166](https://github.com/18F/crime-data-explorer/issues/166))

### Fixed
- About the data text has glossary links ([#723](https://github.com/18F/crime-data-frontend/issues/723))
- Long NIBRS table strings should wrap to multiple lines on small displays ([985](https://github.com/18F/crime-data-frontend/issues/985))
- NIBRS attributes add up to the presented total ([crime-data-explorer#74](https://github.com/18F/crime-data-explorer/issues/74))
- Selecting DC no longer breaks the app ([crime-data-explorer#184](https://github.com/18F/crime-data-explorer/issues/184))
- Show agency name, not ORI in incident details title ([#185](https://github.com/18F/crime-data-explorer/issues/185))
- Agency bar chart source reflects submitted data type ([crime-data-explorer#187](https://github.com/18F/crime-data-explorer/issues/187))
- Sparklines are more responsive to their container size ([crime-data-explorer#199](https://github.com/18F/crime-data-explorer/issues/199))
- Hide every other year on agency chart X axis on small displays ([crime-data-explorer#203](https://github.com/18F/crime-data-explorer/issues/203))

### Removed
- "Beta" modal ([#924](https://github.com/18F/crime-data-frontend/pull/924))
- Pin from agency page map ([#941](https://github.com/18F/crime-data-frontend/pull/941))


## [2.6.1] - 2017-06-09
### Fixed
- "Explorer" top navigation link goes to US and violent crime view ([#828](https://github.com/18F/crime-data-frontend/issues/828))
- Properly map violent and property crimes for agency API requests ([#898](https://github.com/18F/crime-data-frontend/pull/898))


## [2.6.0] - 2017-06-08
### Added
- Arson overview and related chart text ([#803](https://github.com/18F/crime-data-frontend/pull/803))
- Pin on map component for agencies, dropped in the center ([#805](https://github.com/18F/crime-data-frontend/pull/805))
- Show indicator for years with zero values ([#833](https://github.com/18F/crime-data-frontend/pull/833))
- No data text for agency view ([#845](https://github.com/18F/crime-data-frontend/pull/845))
- "Cleared", "rate", "reported", and "unestimated data" added to glossary terms ([#846](https://github.com/18F/crime-data-frontend/pull/846), [#850](https://github.com/18F/crime-data-frontend/pull/850))
- Links and logos to site footer ([crime-data-explorer#117](https://github.com/18F/crime-data-explorer/issues/117))

### Changed
- Improve the agency search view ([#801](https://github.com/18F/crime-data-frontend/pull/801/files), [#802](https://github.com/18F/crime-data-frontend/pull/802), [#804](https://github.com/18F/crime-data-frontend/pull/804), [#819](https://github.com/18F/crime-data-frontend/pull/819))
- Remove `agencySearch=true` feature flag to expose agency search UI ([#854](https://github.com/18F/crime-data-frontend/pull/854))
- Mention "updates to the data" as part of "what's coming" ([crime-data-explorer#149](https://github.com/18F/crime-data-explorer/issues/149))

### Fixed
- Handle Nebraska and Guam ORIs ([#806](https://github.com/18F/crime-data-frontend/issues/806))
- Do not show NIBRS incidents tables for agencies that do not submit NIBRS data ([#807](https://github.com/18F/crime-data-frontend/issues/807))
- Top navigation "Explorer" link ([#827](https://github.com/18F/crime-data-frontend/issues/827))
- UCR participation download ([#844](https://github.com/18F/crime-data-frontend/pull/844))
- Remove empty rows in incident details charts ([crime-data-explorer#162](https://github.com/18F/crime-data-explorer/issues/162))
- Sparklines for rape views ([crime-data-explorer#168](https://github.com/18F/crime-data-explorer/issues/168))


## [2.5.1] - 2017-05-30
### Changed
- Use data from the API for agency bar charts ([#796](https://github.com/18F/crime-data-frontend/pull/796))
- Show agency search results grouped by county ([#797](https://github.com/18F/crime-data-frontend/pull/797))

### Fixed
- Downloads on Internet Explorer ([#793](https://github.com/18F/crime-data-frontend/pull/793))
- Participation download links ([crime-data-explorer#160](https://github.com/18F/crime-data-explorer/issues/160))


## [2.5.0] - 2017-05-25
### Added
- Labels to trend chart ([#763](https://github.com/18F/crime-data-frontend/pull/763))
- Agency search functionality, accessible with a `agencySearch=true` as a URL query parameter ([#765](https://github.com/18F/crime-data-frontend/pull/765))
- State and national spark lines for the agency view ([#773](https://github.com/18F/crime-data-frontend/pull/773))
- More glossary terms ([#775](https://github.com/18F/crime-data-frontend/pull/775), [#776](https://github.com/18F/crime-data-frontend/pull/776))

### Changed
- Move place thumbnail from the sidebar to the main content ([#764](https://github.com/18F/crime-data-frontend/pull/764))
- API passthrough endpoint changed to `/api-docs` so that the API documentation can be available at `/api` ([#766](https://github.com/18F/crime-data-frontend/pull/766))
- Adjust title of "LEOKA" dataset as an available dataset ([#771](https://github.com/18F/crime-data-frontend/pull/771))
- Connect `<Term />` component to the redux store so that it does not require `dispatch` as a prop ([#772](https://github.com/18F/crime-data-frontend/pull/772))


## [2.4.0] - 2017-05-11
### Added
- "Participation" included in glossary terms ([#600](https://github.com/18F/crime-data-frontend/issues/600))

### Fixed
- Show arson trend line for states and national views ([#759](https://github.com/18F/crime-data-frontend/pull/759))


## [2.3.1] - 2017-05-11
### Fixed
- Violent crime trend line ([#758](https://github.com/18F/crime-data-frontend/pull/758))


## [2.3.0] - 2017-05-11
### Changed
- Design of trend chart ([#742](https://github.com/18F/crime-data-frontend/pull/742))
- Use a different title of assaults on law enforcement officers dataset  ([#750](https://github.com/18F/crime-data-frontend/pull/750))

### Fixed
-  Link to API documentation no longer 404s ([#111](https://github.com/18F/crime-data-explorer/issues/111))
- Changelog link in footer goes to frontend repo instead of explorer repo ([#749](https://github.com/18F/crime-data-frontend/pull/749))
- Draw trend line for reported larceny theft rates ([#755](https://github.com/18F/crime-data-frontend/pull/755))


## [2.2.0] - 2017-05-10
### Added
- Augment Explorer page download with a readme ([#716](https://github.com/18F/crime-data-frontend/issues/716))
- Agency data fetching and reducers ([#745](https://github.com/18F/crime-data-frontend/pull/745))

### Changed
- Default to "All violent crime" on home page ([#739](https://github.com/18F/crime-data-frontend/pull/739))
- Clicking a state on the home page map should bring the user to that state's page with "All violent crime" selected ([#740](https://github.com/18F/crime-data-frontend/pull/740))

### Fixed
- Fix participation download link ([#736](https://github.com/18F/crime-data-frontend/pull/736))
- Show numerical values in Explorer introduction paragraph instead of `NaN` ([#737](https://github.com/18F/crime-data-frontend/issues/737))
- Sort trend data so the line does not double back on itself ([#738](https://github.com/18F/crime-data-frontend/pull/738))
- Fix Explorer link in the footer ([#744](https://github.com/18F/crime-data-frontend/pull/744))

### Removed
-  Remove years in NIBRS section title ([#741](https://github.com/18F/crime-data-frontend/pull/741))


## [2.1.0] - 2017-05-05
### Added
- Feedback mechanism ([#705](https://github.com/18F/crime-data-frontend/issues/705))
- Rural, suburban, and urban added as glossary terms ([#717](https://github.com/18F/crime-data-frontend/pull/717))
- Include chart details and hover interaction to bar chart ([#718](https://github.com/18F/crime-data-frontend/pull/718))

### Changed
- Moved trend chart y axis above chart ([#692](https://github.com/18F/crime-data-frontend/issues/692))
- Miscellaneous design fixes ([#728](https://github.com/18F/crime-data-frontend/pull/728))

### Fixed
- Properly handle Shift+Tab for <BetaModal /> ([#726](https://github.com/18F/crime-data-frontend/pull/726))
- Track single page app URL changes as different page views ([#729](https://github.com/18F/crime-data-frontend/pull/729))
- Only use relevant NIBRS years when calculating incident totals ([#731](https://github.com/18F/crime-data-frontend/pull/731))


## [2.0.0] - 2017-04-26
### Added
- Draw data points as circles on trend lines based on `showMarker` prop passed to `<TrendChart />` ([#702](https://github.com/18F/crime-data-frontend/pull/702))
- Include [`prettier`](https://www.npmjs.com/package/prettier) for code style consistency ([#708](https://github.com/18F/crime-data-frontend/pull/708))
- Display a beta stage modal on all initial page loads ([#711](https://github.com/18F/crime-data-frontend/pull/711))

### Changed
- Rename repo (and supporting documentation) from `crime-data-explorer` to `crime-data-frontend` ([#688](https://github.com/18F/crime-data-frontend/pull/688))
- Trend chart refinements such as more explicit comparison text between the state and national trend lines ([#701](https://github.com/18F/crime-data-frontend/pull/701))
- Breaking changes to routing to accommodate upcoming agency view ([#703](https://github.com/18F/crime-data-frontend/pull/703))
- Use `prop-types` library instead of `React.PropTypes` ([#706](https://github.com/18F/crime-data-frontend/pull/706))
- Use estimated data to draw trend lines instead of un-estimated data ([#707](https://github.com/18F/crime-data-frontend/pull/707))

### Removed
- API helper functions to fetch un-estimated data ([#707](https://github.com/18F/crime-data-frontend/pull/707))


## [1.3.0] - 2017-04-17
### Added
- HTTP Basic Authentication added to production applications ([#695](https://github.com/18F/crime-data-frontend/pull/695))

### Fixed
- Unify header, body, and footer alignment on wide displays ([#697](https://github.com/18F/crime-data-frontend/pull/697))


## [1.2.1] - 2017-04-13
### Fixed
- Fixed test failures due to a changed dependency ([#690](https://github.com/18F/crime-data-frontend/pull/690))


## [1.2.0] - 2017-04-12
### Added
- Document the release process for this application ([#674](https://github.com/18F/crime-data-frontend/pull/674))
- Gzip `bundle.js` with `webpack` in the build process ([#678](https://github.com/18F/crime-data-frontend/pull/678))
- Add version number and changelog link to the footer ([#679](https://github.com/18F/crime-data-frontend/pull/679))

### Changed
- Default to percents (not counts) in NIBRS tables ([#632](https://github.com/18F/crime-data-frontend/pull/632))
- Use state postal abbreviations in API calls ([#646](https://github.com/18F/crime-data-frontend/pull/646))
- Use a stacked bar chart instead of a donut chart ([#648](https://github.com/18F/crime-data-frontend/pull/648))
- Make "incident-based (NIBRS)" a clickable glossary term ([#650](https://github.com/18F/crime-data-frontend/pull/650))
- Move from node `6.9.x` branch to `6.10.x` ([#671](https://github.com/18F/crime-data-frontend/pull/671))
- Download data returns a `.zip` file instead of triggering multiple downloads ([#680](https://github.com/18F/crime-data-frontend/pull/680)
- Use newly re-organized API endpoints ([#683](https://github.com/18F/crime-data-frontend/pull/683))

### Fixed
- Add UCR link for the national view ([#534](https://github.com/18F/crime-data-frontend/issues/534))
- National trend chart text should not be a comparison with itself ([#634](https://github.com/18F/crime-data-frontend/issues/634))
- Glossary clears previous errors ([#642](https://github.com/18F/crime-data-frontend/issues/642))
- Update API documentation link ([#644](https://github.com/18F/crime-data-frontend/issues/644))
- Fix police employee data download link ([#675](https://github.com/18F/crime-data-frontend/issues/675))


## [1.1.0] - 2017-03-29
### Added
- Show user an error in the glossary component ([#611](https://github.com/18F/crime-data-frontend/pull/611))

### Changed
- Standardize import style in the code base ([#602](https://github.com/18F/crime-data-frontend/pull/602))
- Update [`README.md`](https://github.com/18F/crime-data-frontend/blob/master/README.md) with new deployment instructions ([#622](https://github.com/18F/crime-data-frontend/pull/622))
- Promote "Explorer" in header and footer ([#623](https://github.com/18F/crime-data-frontend/issues/623))
- Alter the hierarchy of the Download and Docs page ([#635](https://github.com/18F/crime-data-frontend/pull/635))
- Use stacked bar chart instead of donut chart for NIBRS demographics ([#648](https://github.com/18F/crime-data-frontend/pull/648))

### Fixed
- Completed a brief accessibility audit and some subsequent bug fixes ([#193](https://github.com/18F/crime-data-frontend/issues/193),
[#585](https://github.com/18F/crime-data-frontend/issues/585),
[#586](https://github.com/18F/crime-data-frontend/issues/586))
- Refined the trend chart to more closely match the design ([#548](https://github.com/18F/crime-data-frontend/issues/548))
- Trend chart text should not jump around when there are changes in the rate ([#588](https://github.com/18F/crime-data-frontend/issues/588))
- National participation text includes population values instead of "NaN" ([#591](https://github.com/18F/crime-data-frontend/issues/591),
[#610](https://github.com/18F/crime-data-frontend/pull/610))
- Restore rounded corners on "beta banner" ([#608](https://github.com/18F/crime-data-frontend/issues/608))
- Round corner on mobile filter menu button ([#609](https://github.com/18F/crime-data-frontend/issues/609))


## [1.0.0] - 2017-03-15
### Added
- Server side rendering for increased user performance and accessibility ([#142](https://github.com/18F/crime-data-frontend/issues/142))
- Add state participation and population downloads ([#475](https://github.com/18F/crime-data-frontend/pull/475))
- Legacy rape definition indicator ([#536](https://github.com/18F/crime-data-frontend/pull/536))
- Google Analytics tracking

### Changed
- New and more prominent beta banner implemented ([crime-data-api#377](https://github.com/18F/crime-data-api/issues/377))
- About page design
- Use first year a state submits NIBRS if since query is earlier in time ([#459](https://github.com/18F/crime-data-frontend/issues/459))
- Increased test coverage for actions, reducers and utility functions ([#480](https://github.com/18F/crime-data-frontend/pull/480))
- Updated human trafficking links, text about NIBRS conversion, caveat about rankings ([#497](https://github.com/18F/crime-data-frontend/pull/497))
- Handle missing data in trend charts ([#514](https://github.com/18F/crime-data-frontend/pull/514))
- Add hover effect to NIBRS donut chart ([#535](https://github.com/18F/crime-data-frontend/pull/535))
- Check `crime` and `place` filter params before using them for API calls ([#566](https://github.com/18F/crime-data-frontend/pull/566), [#567](https://github.com/18F/crime-data-frontend/pull/567))
- Changed breakpoint for beta banner ([#584](https://github.com/18F/crime-data-frontend/pull/584))

### Fixed
- Use specified crime for fetching location_name NIBRS dimension ([crime-data-api#416](https://github.com/18F/crime-data-api/issues/416))
- Removed "United States" from bulk incident download menu ([#433](https://github.com/18F/crime-data-frontend/issues/433))
- Scroll to top of page on any URL change ([#446](https://github.com/18F/crime-data-frontend/issues/446))
- Use proper plural or singular forms where appropriate in NIBRS charts ([#450](https://github.com/18F/crime-data-frontend/issues/450))
- Move mobile sidebar toggle to match designs ([#451](https://github.com/18F/crime-data-frontend/issues/451))
- Apostrophe showing as prime in Explorer ([#499](https://github.com/18F/crime-data-frontend/issues/499))
- External footer links were resulting in 404 errors ([#516](https://github.com/18F/crime-data-frontend/issues/516))
- "Download Data" button for NIBRS demographic cards should trigger three individual CSV downloads ([#538](https://github.com/18F/crime-data-frontend/issues/538))
- Small visualization fixes ([#563](https://github.com/18F/crime-data-frontend/issues/563), [#569](https://github.com/18F/crime-data-frontend/issues/569), [#572](https://github.com/18F/crime-data-frontend/issues/572), [#573](https://github.com/18F/crime-data-frontend/issues/573), [#574](https://github.com/18F/crime-data-frontend/issues/574))

### Removed
- Breadcrumbs removed from Explorer view ([#444](https://github.com/18F/crime-data-frontend/pull/444))
- Pink hover fill on USA map on About page ([#458](https://github.com/18F/crime-data-frontend/issues/458))
