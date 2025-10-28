# Tasks: Add Mobile Todo List

## Project Setup

- [x] Initialize Next.js 14+ project with TypeScript
- [x] Install dependencies: uuid, tailwindcss, @types/uuid
- [x] Configure Tailwind CSS for mobile-first design
- [x] Set up project structure (app/, components/, lib/ directories)
- [x] Create TypeScript type definitions for Todo data model

## Core Data Layer

- [x] Implement `useLocalStorage` custom hook for browser storage operations
- [x] Add error handling for QuotaExceededError
- [x] Implement `useTodos` custom hook for TODO state management
- [x] Add CRUD operations: create, delete, toggle completion
- [x] Implement order management functions (reorder, move up/down)
- [x] Add category and tag management functions
- [ ] Write tests for local storage hooks

## UI Components - Basic Structure

- [x] Create `TodoList.tsx` container component
- [x] Create `TodoItem.tsx` with checkbox, title, delete button
- [x] Style TODO items for mobile (44px+ touch targets)
- [x] Create `TodoForm.tsx` for adding new TODOs
- [x] Add input validation for TODO title (required)
- [x] Create empty state component for zero TODOs

## UI Components - Categories

- [x] Create `CategorySelector.tsx` dropdown/input component (integrated in TodoForm)
- [x] Implement default categories: Personal, Work, Shopping, Uncategorized
- [x] Add custom category creation functionality
- [ ] Create `CategoryFilter.tsx` with TODO count per category
- [x] Style category badges with distinct colors
- [ ] Implement category filter logic

## UI Components - Tags

- [x] Create `TagInput.tsx` with chip-style input (integrated in TodoForm)
- [x] Implement tag addition by pressing Enter
- [x] Add tag removal functionality (X button on chips)
- [ ] Create `TagFilter.tsx` with all available tags
- [x] Implement tag autocomplete from existing tags
- [ ] Add AND/OR filter mode toggle
- [ ] Implement multi-tag filtering logic

## Sorting Functionality

- [x] Add "Move Up" and "Move Down" buttons to TodoItem
- [x] Implement button disabling for first/last items
- [ ] Add drag handle icon (☰) to each TODO item
- [ ] Implement touch-friendly drag-and-drop with react-beautiful-dnd or similar
- [ ] Add visual feedback during drag (placeholder, ghost image)
- [x] Create sort mode selector dropdown
- [x] Implement automatic sort: by date (newest first)
- [x] Implement automatic sort: by completion status
- [x] Implement automatic sort: alphabetically
- [x] Persist sort mode preference to local storage
- [x] Handle sorting within filtered views correctly

## Mobile Optimization

- [x] Implement responsive layout (320px+ width support)
- [x] Ensure all touch targets are 44x44px minimum
- [x] Add momentum scrolling for long lists
- [x] Implement fixed header while scrolling
- [ ] Add swipe gesture for delete action (optional but nice-to-have)
- [ ] Test on actual mobile devices (iOS Safari, Android Chrome)

## Accessibility

- [x] Add semantic HTML (button, list, checkbox elements)
- [x] Implement ARIA labels for all interactive elements
- [x] Add keyboard navigation support (Tab, Enter, Space)
- [x] Ensure focus indicators are visible
- [ ] Test with screen reader (VoiceOver or NVDA)
- [ ] Add skip-to-content link for keyboard users

## Visual Polish

- [x] Design and implement color scheme for mobile
- [x] Add smooth animations for TODO completion
- [x] Style completed TODOs with strikethrough and opacity
- [ ] Add ripple effect for touch interactions
- [ ] Implement loading states if needed
- [x] Create confirmation modal for delete action

## Data Persistence & Edge Cases

- [x] Test local storage save on every state change
- [x] Test data restoration on page reload
- [x] Handle local storage quota exceeded gracefully
- [x] Display user-friendly error messages
- [ ] Test with 100+ TODOs for performance
- [ ] Consider implementing virtual scrolling if needed

## Combined Features Testing

- [ ] Test category + tag filtering together (filters not implemented yet)
- [ ] Test sorting with active filters
- [x] Test data persistence with all features enabled
- [x] Test on different screen sizes (320px, 375px, 428px, desktop)
- [x] Verify all features work offline
- [ ] Test browser compatibility (Chrome, Safari, Firefox, Edge)

## Documentation

- [ ] Add README with setup instructions
- [ ] Document component props and usage
- [x] Add inline code comments for complex logic
- [ ] Create user guide for TODO app features
- [x] Document known limitations (no sync, no edit)

## Final Validation

- [x] Run `openspec validate add-mobile-todo-list --strict`
- [x] Fix any validation errors
- [ ] Verify all scenarios in spec are implemented (partial)
- [ ] Conduct user testing with 2-3 people
- [ ] Address any usability issues found
- [ ] Prepare for deployment
