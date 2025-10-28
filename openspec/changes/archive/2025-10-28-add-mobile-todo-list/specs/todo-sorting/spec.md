# Specification: Todo Sorting

## ADDED Requirements

### Requirement: TODO-MANUAL-SORT
The system SHALL allow users to manually reorder TODOs

#### Scenario: User moves TODO up in list
**Given** a TODO "Task B" is at position 2 in the list  
**When** the user clicks the "Move Up" button on "Task B"  
**Then** "Task B" moves to position 1  
**And** the previously first item moves to position 2  
**And** the new order is saved to local storage  
**And** the order persists after page reload

#### Scenario: User moves TODO down in list
**Given** a TODO "Task A" is at position 1 in the list  
**When** the user clicks the "Move Down" button on "Task A"  
**Then** "Task A" moves to position 2  
**And** the previously second item moves to position 1  
**And** the new order is saved to local storage

#### Scenario: User cannot move first TODO up
**Given** a TODO is at position 1 (first in list)  
**When** the user views the TODO item  
**Then** the "Move Up" button is disabled or hidden  
**And** the "Move Down" button is enabled (if not last item)

#### Scenario: User cannot move last TODO down
**Given** a TODO is at the last position in the list  
**When** the user views the TODO item  
**Then** the "Move Down" button is disabled or hidden  
**And** the "Move Up" button is enabled

### Requirement: TODO-DRAG-DROP
The system SHALL support drag-and-drop reordering on touch devices

#### Scenario: User drags TODO to new position
**Given** the user is on a touch-enabled device  
**When** the user long-presses a TODO item  
**And** drags it to a new position in the list  
**And** releases the touch  
**Then** the TODO is moved to the new position  
**And** other TODOs shift to accommodate the change  
**And** visual feedback indicates the drop target during drag  
**And** the new order is saved to local storage

#### Scenario: User drags TODO on desktop
**Given** the user is on a desktop device  
**When** the user clicks and holds a TODO item  
**And** drags it to a new position  
**And** releases the mouse  
**Then** the TODO is moved to the new position  
**And** the cursor changes to indicate draggable state  
**And** a ghost image shows during drag

#### Scenario: User cancels drag operation
**Given** the user has started dragging a TODO  
**When** the user releases outside the valid drop area  
**Or** presses Escape key  
**Then** the TODO returns to its original position  
**And** no order change is saved  
**And** visual feedback is cleared

### Requirement: TODO-SORT-AUTOMATIC
The system SHALL provide automatic sorting options

#### Scenario: User sorts by creation date
**Given** the user has multiple TODOs created at different times  
**When** the user selects "Sort by Date (Newest First)"  
**Then** TODOs are reordered with newest at the top  
**And** the sort preference is saved to local storage  
**And** newly added TODOs appear at the top

#### Scenario: User sorts by completion status
**Given** the user has both completed and incomplete TODOs  
**When** the user selects "Sort by Status"  
**Then** incomplete TODOs appear before completed TODOs  
**And** within each group, the previous order is maintained  
**And** the sort preference is saved

#### Scenario: User sorts alphabetically
**Given** the user has TODOs with various titles  
**When** the user selects "Sort Alphabetically"  
**Then** TODOs are reordered from A to Z by title  
**And** case is ignored for sorting  
**And** the sort preference is saved

#### Scenario: User switches back to manual sort
**Given** an automatic sort is active  
**When** the user selects "Manual Order"  
**Then** TODOs return to their last manually set order  
**And** the sort buttons become enabled  
**And** manual reordering is allowed again

### Requirement: TODO-SORT-PERSISTENCE
The system SHALL persist sort order and preferences

#### Scenario: User's sort preference persists across sessions
**Given** the user has set sort mode to "Date (Newest First)"  
**When** the user closes and reopens the browser  
**Then** the TODOs are still sorted by date  
**And** the sort mode indicator shows "Date (Newest First)"  
**And** newly added TODOs follow the active sort rule

#### Scenario: User's manual order persists with filters
**Given** the user has manually ordered TODOs  
**When** the user applies a category filter  
**Then** filtered TODOs maintain their relative manual order  
**When** the user clears the filter  
**Then** all TODOs return to their original manual order

### Requirement: TODO-SORT-VISUAL
The system SHALL provide clear visual feedback during sorting operations

#### Scenario: User sees drag handle on mobile
**Given** the user is on a mobile device  
**When** the user views a TODO item  
**Then** a drag handle icon (e.g., ☰) is visible on each item  
**And** the handle is positioned for easy thumb access  
**And** tapping the handle does not trigger other actions

#### Scenario: User sees sort mode indicator
**Given** a sort mode is active  
**When** the user views the TODO list  
**Then** the current sort mode is displayed in the header  
**And** a dropdown or menu shows all available sort options  
**And** the active option is visually highlighted

#### Scenario: User receives feedback during drag
**Given** the user is dragging a TODO item  
**When** the item is over a valid drop position  
**Then** a placeholder or gap appears at the drop position  
**And** the dragged item follows the cursor/finger smoothly  
**And** other items animate to make space  
**And** the drop target is visually highlighted

### Requirement: TODO-SORT-CATEGORY
The system SHALL support sorting within filtered views

#### Scenario: User sorts within category filter
**Given** the user has filtered TODOs by category "Work"  
**When** the user manually reorders the filtered TODOs  
**Then** only the order of "Work" TODOs changes  
**And** TODOs in other categories maintain their order  
**When** the user clears the filter  
**Then** all TODOs are displayed with correct global order

#### Scenario: User applies automatic sort to filtered view
**Given** the user has filtered TODOs by tag "urgent"  
**When** the user selects "Sort Alphabetically"  
**Then** only the filtered TODOs are reordered alphabetically  
**And** the sort applies only to the current filtered view  
**And** clearing the filter shows original order or applies global sort
