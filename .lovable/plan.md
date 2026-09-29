# Visual invitation builder overhaul

## Goal

Replace the current form first customization flow with a direct visual builder. Customers will compose the real invitation page itself: add blocks from a library, edit content in place, drag every section into any order, and see the same responsive result that guests will later receive.

The overhaul will cover:

- New invitation creation in the current order flow
- Editing an existing invitation from the customer dashboard
- Wedding, birthday, and corporate templates
- Desktop and mobile editing
- Demo, builder preview, and live page consistency

The legacy `/configure/:templateId` page remains untouched as previously requested; “both flows” means the active order flow and editing existing invitations.

## Builder experience

### Direct editing canvas

- Replace the separate block selection and configuration screens with one full height builder.
- Render the chosen invitation template as the central canvas, using the same block components and responsive rules as the live page.
- Make editable text, dates, places, choices, lists, images, and colors selectable directly where they appear.
- Open a focused editing control beside the selected content on desktop and in a bottom sheet on mobile. Typing updates the canvas immediately without a second preview step.
- Keep checkout details and the final purchase action separate from page composition so the canvas remains uncluttered.

### Block library and arrangement

- Show available but unused blocks in a searchable side library on desktop and a collapsible tray on mobile.
- Let customers drag a block from the library into any visible insertion point on the invitation.
- Let every placed section, including intro, event details, countdown, RSVP, calendar, and ending, be reordered.
- Use clear drag handles so editing text never accidentally starts a drag.
- On mobile, support hold and drag plus accessible move up and move down controls.
- Allow blocks to be hidden or removed with an undo option. Required event data remains validated before checkout even when its visual section is moved or hidden.
- Preserve pricing rules: adding a paid block updates the order total during creation. Existing invitations only expose already purchased blocks as usable; adding another paid block enters the existing add on payment flow rather than unlocking it for free.

### Motion and feedback

- Add restrained lift, insertion gap, snap, and short gold highlight animations while dragging and when a block lands.
- Animate newly added and removed blocks without shifting unrelated content abruptly.
- Keep transitions template appropriate and disable nonessential motion when reduced motion is requested.
- Prevent the intro animation from blocking or unmounting the builder canvas. In editing mode it becomes a replayable preview instead of interrupting work.
- Audit unfinished or awkward transitions across the final creation and editing journey, including loading, empty, saving, validation, checkout handoff, and returning to the dashboard.

## Design safeguards

- Create shared section spacing and transition rules so any neighboring block combination remains intentional on mobile and desktop.
- Give each block declared layout needs such as full width, media ratio, minimum content, and safe background transition behavior.
- Automatically reconcile adjacent backgrounds, dividers, and vertical spacing instead of relying on each template’s current hardcoded margins.
- Show valid drop locations only and reserve their dimensions during dragging to prevent jumps.
- Keep controls outside the final invitation rendering layer, so editor chrome can never leak into demos or live pages.
- Validate text lengths, empty states, image crops, and mobile wrapping within each block rather than allowing broken layouts.

## Shared rendering architecture

- Introduce one canonical invitation model and an ordered page layout containing stable block instance IDs and block types.
- Separate purchased block entitlements from visual order. The existing `selected_blocks` list continues to describe paid options; the new ordered layout describes every rendered section.
- Build a central block registry containing each block’s renderer, editor, defaults, validation, pricing relationship, and layout safeguards.
- Extract currently inline core sections into registered blocks so they can move exactly like optional sections.
- Replace the hardcoded section order in all five premium template pages with one ordered renderer.
- Replace duplicated template selection and preview event conversion logic with shared resolvers and adapters.
- Use the same renderer for demos, the builder canvas, dashboard editing, and public event pages, while supplying the appropriate mode and permissions.

## Saving and compatibility

- Add an authenticated, owner only draft record for builder state so unfinished work survives refreshes and device changes.
- Before sign in, autosave safely in the browser; merge that draft into the customer’s private draft after authentication.
- Debounce content changes, save ordering immediately after a completed move, and show clear Saving, Saved, Offline, and Retry states.
- Use revision checks so a slow save cannot overwrite a newer edit.
- Existing live invitations receive a deterministic fallback layout matching their current visual order. Their first edit saves that order into the new model without changing what guests see.
- Keep the public event view read only and preserve the existing privacy boundary: drafts are never publicly readable.

## Editing workflow for existing invitations

- Replace the current long edit dialog with the same visual builder, preloaded with the live invitation.
- Keep lifecycle, renewal, guest management, analytics, and administrative actions in the dashboard rather than crowding the builder.
- Provide undo and redo for content, visibility, and ordering changes during the session.
- Autosave edits as a private working revision and provide a clear Apply changes action for the live invitation, preventing half finished edits from appearing to guests.
- Show a concise summary when unpublished changes exist and allow the customer to discard them.

## Validation

- Add unit tests for ordered layout normalization, legacy fallback order, block insertion, movement, removal, entitlements, undo and redo, and revision conflict handling.
- Add interaction tests for desktop drag and drop, keyboard movement, mobile move controls, inline editing, autosave recovery, and failed save retry.
- Verify creation through checkout handoff and editing through Apply changes while authenticated.
- Compare demo, builder, and public rendering for every template and representative block combination.
- Check phone, tablet, and desktop widths, long German and English content, reduced motion, keyboard navigation, and touch dragging.
- Update both English and German product documentation to describe the finished builder and its saving behavior.

## Technical details

- Use `@dnd-kit` for sortable lists, cross container dragging, pointer, touch, and keyboard sensors rather than custom drag physics.
- Add an authenticated `event_drafts` table with explicit grants and row level policies, plus a version field for conflict safe autosaving.
- Add an ordered JSON layout to events or an equivalent dedicated structure while retaining `selected_blocks` for pricing and compatibility.
- Keep existing `block_config` content readable through an adapter; migrate lazily or backfill deterministic layouts without destructively rewriting customer content.
- Build editor overlays around registered blocks rather than embedding editor state inside public block components.
- Record the new canonical renderer and draft architecture in `AGENTS.md` during implementation.

## Delivery order

1. Canonical block schema, registry, legacy adapter, storage changes, and tests
2. Shared ordered renderer across all template and preview paths
3. Desktop builder with direct editing, library, drag and drop, and autosave
4. Mobile builder with hold and drag, move controls, and bottom sheet editing
5. Existing invitation revision and Apply changes workflow
6. Animation, spacing, responsive, accessibility, and end to end polish audit
7. Documentation and final cross template verification
