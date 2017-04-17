# Change Log
All notable changes to this project will be documented in this file.

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
- **NOT YET CLOSED** National trend chart text should not be a comparison with itself ([#634](https://github.com/18F/crime-data-frontend/issues/634))
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
