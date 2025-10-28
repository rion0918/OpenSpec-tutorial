# Specification: Todo Categorization

## ADDED Requirements

### Requirement: TODO-CATEGORY

The system SHALL allow users to categorize TODOs for organization.

#### Scenario: User assigns category to TODO

**Given** the user is creating a new TODO  
**When** the user selects "Work" from the category dropdown  
**And** submits the TODO  
**Then** the TODO is created with category "Work"  
**And** the category is displayed as a badge on the TODO item  
**And** the category is saved to local storage

#### Scenario: User creates custom category

**Given** the user is creating a new TODO  
**When** the user types a new category name "Fitness" in the category field  
**And** submits the TODO  
**Then** the new category "Fitness" is created  
**And** the category is added to the available categories list  
**And** the category appears in the dropdown for future TODOs

#### Scenario: System provides default categories

**Given** the user is using the app for the first time  
**When** the user opens the category selector  
**Then** default categories are available: "Personal", "Work", "Shopping", "Uncategorized"  
**And** the user can select from these defaults

### Requirement: TODO-CATEGORY-FILTER
The system SHALL allow users to filter TODOs by category

#### Scenario: User filters by single category

**Given** the user has TODOs in multiple categories  
**When** the user selects "Work" in the category filter  
**Then** only TODOs with category "Work" are displayed  
**And** the filter remains active until cleared  
**And** the filter state is indicated in the UI

#### Scenario: User clears category filter

**Given** a category filter is active  
**When** the user clicks "Show All" or clears the filter  
**Then** all TODOs are displayed regardless of category  
**And** the filter indicator is removed

#### Scenario: User views TODO count per category

**Given** the user has TODOs in multiple categories  
**When** the user views the category filter  
**Then** each category shows the count of TODOs (e.g., "Work (5)")  
**And** the count updates when TODOs are added or removed  
**And** categories with zero TODOs are still displayed

### Requirement: TODO-TAG
The system SHALL allow users to tag TODOs with multiple labels

#### Scenario: User adds multiple tags to TODO

**Given** the user is creating a new TODO  
**When** the user enters tags "urgent" and "important"  
**And** submits the TODO  
**Then** the TODO is created with both tags  
**And** both tags are displayed as chips on the TODO item  
**And** the tags are saved to local storage

#### Scenario: User adds tag by typing

**Given** the user is creating a new TODO  
**When** the user types "bug" in the tag input  
**And** presses Enter  
**Then** the tag "bug" is added to the TODO  
**And** the tag input is cleared for additional tags  
**And** the tag appears as a chip with a remove button

#### Scenario: User removes tag from input

**Given** the user has added tags "urgent" and "review" while creating a TODO  
**When** the user clicks the remove button on the "urgent" chip  
**Then** the "urgent" tag is removed from the tag list  
**And** only "review" remains  
**And** the TODO can still be submitted with remaining tags

### Requirement: TODO-TAG-FILTER
The system SHALL allow users to filter TODOs by tags

#### Scenario: User filters by single tag

**Given** the user has TODOs with various tags  
**When** the user selects the "urgent" tag in the filter  
**Then** only TODOs containing the "urgent" tag are displayed  
**And** TODOs with multiple tags including "urgent" are shown  
**And** the active filter is visually indicated

#### Scenario: User filters by multiple tags (AND logic)

**Given** the user has TODOs with various tags  
**When** the user selects tags "urgent" AND "work"  
**Then** only TODOs containing both tags are displayed  
**And** the filter mode (AND) is clearly indicated  
**And** the user can toggle between AND/OR logic

#### Scenario: User filters by multiple tags (OR logic)

**Given** the user has TODOs with various tags  
**When** the user selects tags "urgent" OR "important" with OR mode active  
**Then** TODOs containing either "urgent" or "important" are displayed  
**And** TODOs with both tags are also displayed  
**And** the filter mode (OR) is clearly indicated

### Requirement: TODO-TAG-MANAGEMENT
The system SHALL manage tag creation and reuse

#### Scenario: User reuses existing tags

**Given** tags "urgent" and "work" have been used previously  
**When** the user starts typing in the tag input  
**Then** autocomplete suggestions appear showing existing tags  
**And** the user can select from suggestions  
**And** the tag is added without duplicates

#### Scenario: System displays all available tags

**Given** the user has created various tags across TODOs  
**When** the user views the tag filter section  
**Then** all unique tags are displayed as clickable chips  
**And** each tag shows the count of TODOs using it (e.g., "urgent (3)")  
**And** tags are sorted alphabetically or by frequency

#### Scenario: User views TODO with no tags

**Given** a TODO was created without tags  
**When** the user views the TODO in the list  
**Then** no tag chips are displayed  
**And** the layout remains clean without empty tag containers  
**And** the TODO is still fully functional

### Requirement: TODO-COMBINED-FILTER
The system SHALL allow users to filter by both category and tags simultaneously

#### Scenario: User applies category and tag filters together

**Given** the user has TODOs with various categories and tags  
**When** the user selects category "Work"  
**And** selects tag "urgent"  
**Then** only TODOs that are in "Work" category AND have "urgent" tag are displayed  
**And** both filters are visually indicated as active  
**And** the user can clear filters independently

#### Scenario: User clears all filters

**Given** both category and tag filters are active  
**When** the user clicks "Clear All Filters"  
**Then** all filters are removed  
**And** all TODOs are displayed  
**And** the filter UI returns to default state
