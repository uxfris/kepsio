# Pre-Launch Manual Testing Guide

## Overview

This guide provides a comprehensive, step-by-step checklist for manually testing Kepsio before launch. Follow each section in order to ensure all features work correctly.

---

## 🎯 Testing Priorities

- **Critical**: Core user flows that must work perfectly
- **High**: Important features that significantly impact UX
- **Medium**: Secondary features and edge cases

---

## 1. Authentication & Onboarding

### 1.1 Sign Up (Critical)

- [ ] Navigate to `/signup`
- [ ] Enter a **new email** and password
- [ ] Click "Sign Up"
- [ ] Verify you receive a confirmation email (if email verification enabled)
- [ ] Confirm account via email link
- [ ] Verify you're redirected to `/onboarding`

**Expected Result**: Account created successfully, redirected to onboarding

### 1.2 Onboarding Flow (Critical)

- [ ] **Step 1 - Platform Selection**

  - [ ] Verify all platforms display correctly (Instagram, Twitter, LinkedIn, TikTok, Facebook, Multi-platform)
  - [ ] Select a platform (e.g., Instagram)
  - [ ] Verify green checkmark appears on selected platform
  - [ ] Try clicking "Continue" without selection (should be disabled)
  - [ ] Verify selection highlights properly

- [ ] **Step 2 - Brand Tone**

  - [ ] Verify all tone options display with emoji, title, description, and example
  - [ ] Select a tone (e.g., "Professional & Polished")
  - [ ] Verify checkmark appears on selected tone
  - [ ] Click "Back" button and verify you return to Step 1
  - [ ] Navigate back to Step 2

- [ ] **Step 3 - Content Types**

  - [ ] Select multiple content types (at least 3)
  - [ ] Verify counter shows correct number selected (e.g., "3 selected")
  - [ ] Verify selected items highlight in accent color
  - [ ] Click "Get Started"
  - [ ] Verify you're redirected to `/dashboard`

- [ ] **Skip Options**

  - [ ] Go back to onboarding (log out and create new account)
  - [ ] Click "Skip for now" on Step 1
  - [ ] Verify you're taken to dashboard
  - [ ] Go back again, try "Skip and use smart defaults"
  - [ ] Verify dashboard loads with default settings

- [ ] **Keyboard Navigation**
  - [ ] Test Arrow Left/Right keys to navigate between steps
  - [ ] Test Enter key to proceed
  - [ ] Test Escape key to skip

**Expected Result**: Smooth onboarding flow, all selections persist, successful redirect to dashboard

### 1.3 Sign In (Critical)

- [ ] Log out from dashboard
- [ ] Navigate to `/login`
- [ ] Enter **correct** credentials
- [ ] Verify redirect to `/dashboard`
- [ ] Test **incorrect** credentials
- [ ] Verify error message displays
- [ ] Test "Forgot Password" link (if implemented)

**Expected Result**: Successful login redirects to dashboard, failed login shows error

---

## 2. Dashboard & Navigation

### 2.1 Dashboard Page (High)

- [ ] Verify dashboard loads at `/dashboard`
- [ ] Check **Usage Summary Card**
  - [ ] Verify generations count (e.g., "5 / 10 generations used")
  - [ ] Progress bar displays correctly
  - [ ] Free plan badge shows
- [ ] Check **Quick Actions Section**
  - [ ] "Generate Captions" button works
  - [ ] "Train Your Voice" button works
  - [ ] "View Library" button works
- [ ] Check **Recent Activity** (if applicable)
- [ ] Verify all stats load properly

**Expected Result**: Dashboard displays correctly with accurate usage data

### 2.2 Navbar (High)

- [ ] **When Logged In**

  - [ ] Verify avatar appears (top right)
  - [ ] Label shows "Dashboard"
  - [ ] Click avatar → dropdown opens
  - [ ] Dropdown shows:
    - [ ] User email
    - [ ] Plan badge (e.g., "Free Plan")
    - [ ] "Dashboard" link
    - [ ] "Settings" link
    - [ ] "Sign Out" button
  - [ ] Click outside dropdown → closes
  - [ ] Click "Settings" → navigates to `/settings`
  - [ ] Click "Sign Out" → logs out and redirects to home

- [ ] **When Logged Out**
  - [ ] Verify "Sign In" and "Start Free" buttons appear
  - [ ] Click "Sign In" → navigates to `/login`
  - [ ] Click "Start Free" → navigates to `/signup`

**Expected Result**: Navbar adapts based on auth state, all links work

### 2.3 Sidebar Navigation (High)

- [ ] Verify sidebar is visible on all dashboard pages
- [ ] Test all navigation links:

  - [ ] Dashboard (`/dashboard`)
  - [ ] Generate (`/generate`)
  - [ ] Library (`/library`)
  - [ ] Brand Voice (`/brand-voice`)
  - [ ] Team (`/team`)
  - [ ] Analytics (`/analytics`)
  - [ ] Integrations (`/integrations`)
  - [ ] API Access (`/api-access`)
  - [ ] Settings (`/settings`)
  - [ ] Upgrade (`/upgrade`)

- [ ] Verify active page highlights in sidebar
- [ ] Test responsive behavior (mobile menu)

**Expected Result**: All navigation links work, active state displays correctly

---

## 3. Caption Generation (Critical)

### 3.1 Generate Page - Basic Flow

- [ ] Navigate to `/generate`
- [ ] **Input Section**
  - [ ] Enter caption topic (e.g., "Morning coffee routine")
  - [ ] Verify character counter works
  - [ ] Verify placeholder text displays
- [ ] **Optional Settings**

  - [ ] Select platform (Instagram, Twitter, etc.)
  - [ ] Select tone
  - [ ] Select content type
  - [ ] Verify dropdown options populate correctly

- [ ] **Generate Captions**
  - [ ] Click "Generate Captions" button
  - [ ] Verify loading state shows (spinner, "Generating..." text)
  - [ ] Wait for generation to complete
  - [ ] Verify 5 caption variations appear (Free plan)
  - [ ] Check each caption for quality and relevance

**Expected Result**: Captions generate successfully with proper variations

### 3.2 Generated Captions Actions (High)

For each generated caption:

- [ ] **Copy Button**

  - [ ] Click copy icon
  - [ ] Verify toast notification: "Caption copied!"
  - [ ] Paste into text editor to confirm it copied

- [ ] **Save Button**

  - [ ] Click save/bookmark icon
  - [ ] Verify toast notification: "Caption saved!"
  - [ ] Icon changes to "saved" state (filled)

- [ ] **Edit Button**

  - [ ] Click edit icon
  - [ ] Modal opens with caption text
  - [ ] Edit caption text
  - [ ] Click "Save"
  - [ ] Verify caption updates in UI
  - [ ] Verify toast: "Caption updated!"

- [ ] **Delete Button**
  - [ ] Click delete/trash icon
  - [ ] Confirmation dialog appears
  - [ ] Click "Cancel" → nothing happens
  - [ ] Click delete again
  - [ ] Click "Confirm"
  - [ ] Verify caption removed from UI
  - [ ] Verify toast: "Caption deleted!"

**Expected Result**: All caption actions work correctly

### 3.3 Usage Limits (Critical)

- [ ] **Free Plan User**
  - [ ] Generate captions until you reach 10 generations
  - [ ] Attempt 11th generation
  - [ ] Verify paywall modal appears
  - [ ] Modal shows "Upgrade to Pro" message
  - [ ] Click "Upgrade" → navigates to `/upgrade`
  - [ ] Click "Cancel" → modal closes

**Expected Result**: Usage limits enforced, paywall triggers correctly

### 3.4 File Upload (High)

- [ ] Locate file upload section (if on Generate page)
- [ ] Click "Upload" or drag-and-drop area
- [ ] **Test .txt file**
  - [ ] Upload `sample-captions.txt`
  - [ ] Verify content populates input field or shows preview
- [ ] **Test .csv file**
  - [ ] Upload `sample-captions.csv`
  - [ ] Verify proper parsing and display
- [ ] **Test invalid file**
  - [ ] Try uploading .pdf or .exe
  - [ ] Verify error message shows

**Expected Result**: Valid files upload successfully, invalid files rejected with error

---

## 4. Library Management (High)

### 4.1 Library Page

- [ ] Navigate to `/library`
- [ ] Verify saved captions display in grid/list format
- [ ] **Check Empty State**
  - [ ] If no captions saved, verify empty state shows
  - [ ] "No saved captions yet" message
  - [ ] "Generate Now" button works

### 4.2 Filters & Search (High)

- [ ] **Search**

  - [ ] Type in search box (e.g., "coffee")
  - [ ] Verify real-time filtering
  - [ ] Verify results highlight search term
  - [ ] Clear search → all captions return

- [ ] **Platform Filter**

  - [ ] Select "Instagram" filter
  - [ ] Verify only Instagram captions show
  - [ ] Select "All Platforms"
  - [ ] Verify all captions return

- [ ] **Tone Filter**

  - [ ] Select specific tone
  - [ ] Verify filtering works
  - [ ] Reset filter

- [ ] **Date Range** (if implemented)
  - [ ] Select date range
  - [ ] Verify captions filter by date

### 4.3 Caption Actions in Library

- [ ] **Copy from Library**

  - [ ] Click copy on any caption
  - [ ] Verify toast notification
  - [ ] Paste to confirm

- [ ] **Edit from Library**

  - [ ] Click edit icon
  - [ ] Edit modal opens
  - [ ] Make changes
  - [ ] Save
  - [ ] Verify changes persist

- [ ] **Delete from Library**

  - [ ] Click delete icon
  - [ ] Confirm deletion
  - [ ] Verify caption removed from library

- [ ] **Bulk Actions** (if implemented)
  - [ ] Select multiple captions
  - [ ] Test bulk delete
  - [ ] Test bulk export

**Expected Result**: Library displays saved captions, all filters and actions work

---

## 5. Brand Voice (High)

### 5.1 Training Samples Tab

- [ ] Navigate to `/brand-voice`
- [ ] Click "Training Samples" tab
- [ ] **Add Training Sample**

  - [ ] Click "Add Sample" button
  - [ ] Modal opens
  - [ ] Enter sample caption text (min 20 characters)
  - [ ] Add optional notes
  - [ ] Click "Add Sample"
  - [ ] Verify toast: "Training sample added!"
  - [ ] Verify sample appears in list

- [ ] **Edit Training Sample**

  - [ ] Click edit icon on any sample
  - [ ] Edit modal opens with existing text
  - [ ] Make changes
  - [ ] Click "Save Changes"
  - [ ] Verify toast: "Training sample updated!"
  - [ ] Verify changes display

- [ ] **Delete Training Sample**

  - [ ] Click delete icon
  - [ ] Confirmation dialog appears
  - [ ] Click "Delete"
  - [ ] Verify toast: "Training sample deleted!"
  - [ ] Verify sample removed from list

- [ ] **Empty State**
  - [ ] Delete all samples
  - [ ] Verify empty state shows
  - [ ] "No training samples yet" message

**Expected Result**: Training samples CRUD operations work correctly

### 5.2 Tone & Style Tab

- [ ] Click "Tone & Style" tab
- [ ] **Platform Selection**

  - [ ] Change platform dropdown
  - [ ] Verify toast: "Platform updated successfully!"
  - [ ] Refresh page → verify selection persists

- [ ] **Tone Selection**

  - [ ] Change tone dropdown
  - [ ] Verify toast: "Tone updated successfully!"
  - [ ] Refresh page → verify selection persists

- [ ] **Content Types**
  - [ ] Toggle content type checkboxes
  - [ ] Verify toast for each change
  - [ ] Verify selections persist after refresh

**Expected Result**: All changes save to database automatically with toast notifications

### 5.3 Voice Insights Tab (High)

- [ ] Click "Voice Insights" tab
- [ ] **With Training Data**
  - [ ] If training samples exist, verify insights display:
    - [ ] Tone analysis
    - [ ] Word patterns
    - [ ] Style recommendations
- [ ] **Without Training Data**
  - [ ] If no samples, verify empty state:
    - [ ] "Train your voice first" message
    - [ ] "Add Samples" button navigates to Training Samples tab

**Expected Result**: Insights display when data available, empty state otherwise

---

## 6. Team Collaboration (Medium - Pro Feature)

### 6.1 Team Page Access

- [ ] **Free User**

  - [ ] Navigate to `/team`
  - [ ] Verify paywall or upgrade prompt
  - [ ] Cannot access team features

- [ ] **Pro/Enterprise User**
  - [ ] Navigate to `/team`
  - [ ] Page loads successfully

### 6.2 Team Management (Pro Users)

- [ ] **Invite Team Member**

  - [ ] Click "Invite Member" button
  - [ ] Enter email address
  - [ ] Select role (Member/Admin)
  - [ ] Click "Send Invite"
  - [ ] Verify toast: "Invitation sent!"
  - [ ] Check email for invitation

- [ ] **Member List**

  - [ ] Verify all team members display
  - [ ] Shows name, email, role, status

- [ ] **Edit Member Role**

  - [ ] Click edit icon next to member
  - [ ] Change role dropdown
  - [ ] Save changes
  - [ ] Verify toast confirmation
  - [ ] Verify role updates in list

- [ ] **Remove Team Member**
  - [ ] Click remove/delete icon
  - [ ] Confirmation dialog appears
  - [ ] Confirm removal
  - [ ] Verify member removed from list

### 6.3 Shared Captions (Pro Users)

- [ ] **Share Caption**

  - [ ] Go to Library
  - [ ] Click "Share" icon on caption
  - [ ] Select team members to share with
  - [ ] Add optional note
  - [ ] Click "Share"
  - [ ] Verify toast: "Caption shared!"

- [ ] **View Shared Captions**

  - [ ] Go to Team page
  - [ ] Click "Shared Captions" tab
  - [ ] Verify shared captions display
  - [ ] Shows who shared and when

- [ ] **Sort/Filter Shared Captions**
  - [ ] Test sort by date
  - [ ] Test sort by member
  - [ ] Test filter options

**Expected Result**: Team features work for Pro users, paywalled for Free users

---

## 7. Analytics (Medium - Pro Feature)

### 7.1 Analytics Page Access

- [ ] **Free User**

  - [ ] Navigate to `/analytics`
  - [ ] Verify upgrade prompt or limited view

- [ ] **Pro User**
  - [ ] Navigate to `/analytics`
  - [ ] Page loads with full analytics

### 7.2 Analytics Data (Pro Users)

- [ ] **Overview Stats**

  - [ ] Total generations count
  - [ ] Total saved captions
  - [ ] Most used platform
  - [ ] Most used tone

- [ ] **Charts & Graphs**

  - [ ] Usage over time chart displays
  - [ ] Platform breakdown pie chart
  - [ ] Tone distribution chart
  - [ ] All data points are accurate

- [ ] **Date Range Selector**

  - [ ] Change date range (Last 7 days, 30 days, etc.)
  - [ ] Verify charts update accordingly

- [ ] **Export Data** (if implemented)
  - [ ] Click "Export" button
  - [ ] Download CSV file
  - [ ] Verify data accuracy in file

**Expected Result**: Analytics display accurate data for Pro users

---

## 8. Billing & Subscriptions (Critical)

### 8.1 Upgrade Flow

- [ ] As Free user, navigate to `/upgrade` or `/pricing`
- [ ] **Pricing Page**

  - [ ] Verify 3 plans display (Free, Pro, Enterprise)
  - [ ] Pro plan marked as "Popular"
  - [ ] All features listed correctly
  - [ ] Prices display: $0, $19, $100

- [ ] **Select Pro Plan**
  - [ ] Click "Upgrade to Pro" button
  - [ ] Verify redirect to Stripe Checkout
  - [ ] **Complete Test Purchase**
    - [ ] Use Stripe test card: `4242 4242 4242 4242`
    - [ ] Expiry: Any future date (e.g., 12/25)
    - [ ] CVC: Any 3 digits (e.g., 123)
    - [ ] ZIP: Any 5 digits (e.g., 12345)
  - [ ] Click "Subscribe"
  - [ ] Verify redirect to `/success` or `/dashboard`
  - [ ] Verify toast: "Subscription activated!"

### 8.2 Post-Upgrade Verification

- [ ] **Check Plan Status**

  - [ ] Go to `/settings`
  - [ ] Click "Billing" tab
  - [ ] Verify shows "Pro Plan"
  - [ ] Verify next billing date
  - [ ] Verify payment method (last 4 digits)

- [ ] **Check Usage Limits**

  - [ ] Dashboard usage widget shows "Unlimited generations"
  - [ ] Generate more than 10 captions (Free limit)
  - [ ] Verify no paywall appears
  - [ ] Generate captions with 10 variations (Pro feature)

- [ ] **Check Pro Features**
  - [ ] Team page accessible
  - [ ] Analytics page accessible
  - [ ] API Access page accessible

### 8.3 Manage Subscription

- [ ] **Update Payment Method**

  - [ ] Settings → Billing
  - [ ] Click "Update Payment Method"
  - [ ] Stripe Customer Portal opens
  - [ ] Add/update card
  - [ ] Verify changes reflect in app

- [ ] **Cancel Subscription**
  - [ ] Settings → Billing
  - [ ] Click "Cancel Subscription"
  - [ ] Confirmation dialog appears
  - [ ] Click "Confirm Cancellation"
  - [ ] Verify toast: "Subscription cancelled"
  - [ ] Verify plan shows "Expires on [date]"
  - [ ] After expiry date, verify downgrade to Free

**Expected Result**: Smooth upgrade flow, accurate plan status, Stripe integration works

---

## 9. Settings (High)

### 9.1 Profile Settings

- [ ] Navigate to `/settings`
- [ ] **Profile Tab**

  - [ ] Display name field
  - [ ] Email field (read-only)
  - [ ] Update display name
  - [ ] Click "Save Changes"
  - [ ] Verify toast: "Profile updated!"
  - [ ] Refresh page → verify changes persist

- [ ] **Avatar Upload** (if implemented)
  - [ ] Upload profile picture
  - [ ] Verify preview
  - [ ] Save
  - [ ] Verify avatar updates in navbar

### 9.2 Account Settings

- [ ] **Account Tab**

  - [ ] Shows account creation date
  - [ ] Shows current plan
  - [ ] Shows email verification status

- [ ] **Change Password**
  - [ ] Enter current password
  - [ ] Enter new password
  - [ ] Confirm new password
  - [ ] Click "Update Password"
  - [ ] Verify toast: "Password updated!"
  - [ ] Log out and log back in with new password

### 9.3 Preferences Settings

- [ ] **Preferences Tab**
  - [ ] Email notifications toggle
  - [ ] Marketing emails toggle
  - [ ] Theme selection (if implemented)
  - [ ] Language selection (if implemented)
  - [ ] Save preferences
  - [ ] Verify toast confirmation
  - [ ] Verify preferences persist

### 9.4 Billing Settings

- [ ] **Billing Tab**
  - [ ] Current plan displays
  - [ ] Next billing date (if subscribed)
  - [ ] Payment method (last 4 digits)
  - [ ] "Manage Billing" button opens Stripe Portal
  - [ ] View billing history
  - [ ] Download invoices

### 9.5 Danger Zone

- [ ] **Delete Account**
  - [ ] Click "Delete Account" button
  - [ ] Confirmation dialog appears
  - [ ] Enter confirmation text (e.g., "DELETE")
  - [ ] Click "Permanently Delete"
  - [ ] Verify account deletion
  - [ ] Verify redirect to home page
  - [ ] Attempt to log in → should fail

**Expected Result**: All settings update correctly and persist

---

## 10. Integrations (Medium)

### 10.1 Integrations Page

- [ ] Navigate to `/integrations`
- [ ] **Available Integrations Display**
  - [ ] Verify integration cards show (Instagram, Twitter, etc.)
  - [ ] Each card shows connection status
  - [ ] "Connect" button for unconnected
  - [ ] "Disconnect" button for connected

### 10.2 Connect Integration

- [ ] **Select Integration** (e.g., Instagram)
  - [ ] Click "Connect" button
  - [ ] OAuth flow initiates
  - [ ] Authorize app on platform
  - [ ] Verify redirect back to app
  - [ ] Verify toast: "Instagram connected!"
  - [ ] Verify status changes to "Connected"

### 10.3 Disconnect Integration

- [ ] Click "Disconnect" on connected integration
- [ ] Confirmation dialog appears
- [ ] Confirm disconnection
- [ ] Verify toast: "Disconnected"
- [ ] Verify status changes to "Not Connected"

**Expected Result**: OAuth flows work, connections persist

---

## 11. API Access (Medium - Enterprise Feature)

### 11.1 API Page Access

- [ ] **Free/Pro User**

  - [ ] Navigate to `/api-access`
  - [ ] Verify upgrade prompt
  - [ ] "Upgrade to Enterprise" button

- [ ] **Enterprise User**
  - [ ] Page loads with API dashboard

### 11.2 API Key Management (Enterprise)

- [ ] **Generate API Key**

  - [ ] Click "Generate New Key" button
  - [ ] Key appears on screen
  - [ ] Copy key to clipboard
  - [ ] Verify toast: "API key copied!"

- [ ] **View API Keys**

  - [ ] List of existing keys displays
  - [ ] Shows key name, created date, last used

- [ ] **Revoke API Key**
  - [ ] Click "Revoke" on a key
  - [ ] Confirmation dialog
  - [ ] Confirm revocation
  - [ ] Verify key removed from list

### 11.3 API Documentation

- [ ] Verify API docs link works
- [ ] Verify rate limits displayed
- [ ] Verify example requests shown

**Expected Result**: API features work for Enterprise users

---

## 12. Error Handling (High)

### 12.1 Network Errors

- [ ] **Simulate Offline**

  - [ ] Turn off internet/WiFi
  - [ ] Try generating captions
  - [ ] Verify error message shows
  - [ ] "Connection error, please try again"
  - [ ] Try saving caption
  - [ ] Verify appropriate error message

- [ ] **Slow Connection**
  - [ ] Throttle connection in DevTools
  - [ ] Verify loading states appear
  - [ ] Verify timeouts handled gracefully

### 12.2 Validation Errors

- [ ] **Empty Input Fields**

  - [ ] Try generating captions without topic
  - [ ] Verify validation error shows
  - [ ] "Please enter a topic" message

- [ ] **Invalid Email Format**

  - [ ] Enter invalid email in signup
  - [ ] Verify validation error
  - [ ] "Please enter a valid email"

- [ ] **Password Requirements**
  - [ ] Enter weak password
  - [ ] Verify error shows requirements
  - [ ] "Password must be at least 8 characters"

### 12.3 Rate Limiting

- [ ] Rapidly click "Generate Captions" multiple times
- [ ] Verify rate limit message if triggered
- [ ] "Please wait before generating again"

### 12.4 404 & Invalid Routes

- [ ] Navigate to `/invalid-route-123`
- [ ] Verify 404 page displays
- [ ] "Page not found" message
- [ ] "Go to Dashboard" button works

**Expected Result**: All errors handled gracefully with clear messages

---

## 13. Performance & UX (High)

### 13.1 Page Load Times

- [ ] **Dashboard**

  - [ ] Measure load time (< 2 seconds ideal)
  - [ ] Verify skeleton loaders appear during load

- [ ] **Generate Page**

  - [ ] Load time acceptable
  - [ ] No layout shift during load

- [ ] **Library Page**
  - [ ] Loads quickly even with many captions
  - [ ] Consider pagination/infinite scroll

### 13.2 Mobile Responsiveness

- [ ] **Test on Mobile Device** (or Chrome DevTools)

  - [ ] iPhone 12/13/14 viewport
  - [ ] Samsung Galaxy viewport
  - [ ] iPad viewport

- [ ] **Check Each Page**
  - [ ] Navbar mobile menu works
  - [ ] Sidebar becomes hamburger menu
  - [ ] Forms are usable
  - [ ] Buttons are tap-friendly
  - [ ] Text is readable (font size)
  - [ ] No horizontal scrolling
  - [ ] Modals fit on screen

### 13.3 Browser Compatibility

- [ ] **Test on Different Browsers**

  - [ ] Chrome
  - [ ] Firefox
  - [ ] Safari
  - [ ] Edge

- [ ] Verify all features work in each browser
- [ ] Check for visual inconsistencies

### 13.4 Accessibility

- [ ] **Keyboard Navigation**

  - [ ] Tab through all interactive elements
  - [ ] Verify focus indicators visible
  - [ ] All actions accessible via keyboard

- [ ] **Screen Reader** (basic test)

  - [ ] Enable VoiceOver (Mac) or NVDA (Windows)
  - [ ] Navigate key pages
  - [ ] Verify content is readable

- [ ] **Color Contrast**
  - [ ] Use browser extension to check contrast ratios
  - [ ] Verify meets WCAG AA standards

**Expected Result**: Fast load times, mobile-friendly, works across browsers

---

## 14. Security (Critical)

### 14.1 Authentication

- [ ] **Session Persistence**

  - [ ] Log in
  - [ ] Close browser
  - [ ] Reopen → verify still logged in

- [ ] **Session Timeout**
  - [ ] Leave browser idle for extended period
  - [ ] Attempt action
  - [ ] Verify re-authentication required if session expired

### 14.2 Protected Routes

- [ ] **Test Unauthenticated Access**
  - [ ] Log out
  - [ ] Try accessing `/dashboard`
  - [ ] Verify redirect to `/login`
  - [ ] Try accessing `/generate`
  - [ ] Verify redirect to `/login`

### 14.3 Authorization

- [ ] **Free User Accessing Pro Features**
  - [ ] As Free user, try accessing `/team`
  - [ ] Verify paywall or access denied
  - [ ] Try accessing `/analytics`
  - [ ] Verify restricted

### 14.4 Data Privacy

- [ ] Verify no sensitive data in URL parameters
- [ ] Check that API keys are never exposed in frontend code
- [ ] Verify user data is scoped correctly (can't see other users' data)

**Expected Result**: Robust authentication, proper authorization, secure data handling

---

## 15. Edge Cases & Bugs (Medium)

### 15.1 Common Edge Cases

- [ ] **Long Text Input**

  - [ ] Enter extremely long caption topic (1000+ characters)
  - [ ] Verify character limit enforced or truncation

- [ ] **Special Characters**

  - [ ] Enter emojis in caption topic: "🚀🎉💡"
  - [ ] Verify proper handling and generation

- [ ] **SQL Injection Attempt** (basic test)

  - [ ] Enter `'; DROP TABLE users; --` in search
  - [ ] Verify no errors, proper sanitization

- [ ] **XSS Attempt** (basic test)
  - [ ] Enter `<script>alert('XSS')</script>` in form
  - [ ] Verify script doesn't execute, text is escaped

### 15.2 Concurrent Actions

- [ ] Open app in two browser tabs
- [ ] Save caption in Tab 1
- [ ] Verify appears in Tab 2 (or after refresh)
- [ ] Delete caption in Tab 2
- [ ] Verify removed in Tab 1 (or after refresh)

### 15.3 Browser Back/Forward

- [ ] Complete onboarding flow
- [ ] Click browser back button
- [ ] Verify doesn't return to onboarding
- [ ] Navigate through multiple pages
- [ ] Use back/forward buttons
- [ ] Verify state management correct

**Expected Result**: Edge cases handled properly, no crashes or security issues

---

## 16. Final Checks (Critical)

### 16.1 Content & Copy

- [ ] **Proofread All Text**

  - [ ] Check for typos across all pages
  - [ ] Verify grammar and punctuation
  - [ ] Ensure consistent tone and brand voice

- [ ] **Legal Pages**
  - [ ] Navigate to `/terms`
  - [ ] Verify Terms of Service displays
  - [ ] Navigate to `/privacy`
  - [ ] Verify Privacy Policy displays
  - [ ] Both pages should be complete and accurate

### 16.2 SEO & Meta Tags

- [ ] **View Page Source**
  - [ ] Verify `<title>` tags on each page
  - [ ] Verify meta descriptions
  - [ ] Verify Open Graph tags for social sharing
  - [ ] Verify favicon loads

### 16.3 Environment Variables

- [ ] Verify all `.env` variables set correctly
- [ ] Check Stripe keys (test mode vs production)
- [ ] Check Supabase URLs and keys
- [ ] Check OpenAI API key (if used)

### 16.4 Monitoring & Logging

- [ ] Verify error logging set up (Sentry, LogRocket, etc.)
- [ ] Test error triggers and verify logs capture
- [ ] Verify analytics tracking works (Google Analytics, Mixpanel, etc.)

**Expected Result**: All content polished, SEO optimized, proper monitoring

---

## 17. Post-Test Actions

### 17.1 Test Results Summary

- [ ] Document all bugs found
- [ ] Prioritize bugs (Critical, High, Medium, Low)
- [ ] Create GitHub issues for each bug
- [ ] Assign to team members

### 17.2 Fix & Retest Cycle

- [ ] Fix critical bugs first
- [ ] Retest affected areas
- [ ] Mark resolved issues as verified

### 17.3 Final Sign-Off

- [ ] All critical and high priority issues resolved
- [ ] Stakeholder approval obtained
- [ ] Ready for production deployment

---

## 🎉 Launch Checklist

Before going live:

- [ ] All sections above tested and passed
- [ ] Critical bugs resolved
- [ ] Database backups configured
- [ ] Monitoring and alerts set up
- [ ] SSL certificate configured
- [ ] Domain DNS properly configured
- [ ] Switch Stripe to production mode
- [ ] Final smoke test on production
- [ ] Support email/chat ready
- [ ] Launch announcement prepared

---

## Testing Tips

1. **Use Multiple Accounts**: Test with Free, Pro, and Enterprise accounts
2. **Clear Cache**: Periodically clear browser cache during testing
3. **Take Screenshots**: Document bugs with screenshots
4. **Browser DevTools**: Monitor console for errors
5. **Network Tab**: Check API responses and timing
6. **Real Devices**: Test on actual mobile devices, not just simulators
7. **Fresh Eyes**: Have someone unfamiliar with the app test it
8. **User Perspective**: Think like a new user, not a developer

---

## Quick Test (30-Minute Smoke Test)

If time is limited, run this abbreviated test:

1. **Sign up** → Complete onboarding → Reach dashboard (3 min)
2. **Generate captions** → Save one → Copy one (3 min)
3. **View library** → Edit caption → Delete caption (2 min)
4. **Brand voice** → Add training sample (2 min)
5. **Upgrade to Pro** → Complete Stripe checkout (3 min)
6. **Generate with Pro limits** (10 variations) (2 min)
7. **Access Team page** (2 min)
8. **Access Analytics** (2 min)
9. **Update settings** → Change password (3 min)
10. **Test on mobile** → Key flows (8 min)

**Total**: ~30 minutes for critical path testing

---

## Reporting Bugs

When you find a bug, document:

1. **Title**: Brief description
2. **Severity**: Critical / High / Medium / Low
3. **Steps to Reproduce**: Numbered list
4. **Expected Result**: What should happen
5. **Actual Result**: What actually happened
6. **Screenshots**: Visual proof
7. **Environment**: Browser, OS, device
8. **User Type**: Free/Pro/Enterprise

Example:

```
Title: Caption generation fails on long topics
Severity: High
Steps:
  1. Go to /generate
  2. Enter topic with 500+ characters
  3. Click "Generate Captions"
Expected: Captions generate or show character limit error
Actual: Page crashes with 500 error
Screenshot: [attached]
Environment: Chrome 120, macOS 14.5, MacBook Pro
User: Free plan
```

---

## Need Help?

If you discover issues during testing:

- Check the `TROUBLESHOOTING.md` file
- Review error logs
- Test in incognito/private mode
- Clear browser cache and cookies
- Check network connectivity
- Verify environment variables

---

**Good luck testing! 🚀**

_Last Updated: October 31, 2025_
