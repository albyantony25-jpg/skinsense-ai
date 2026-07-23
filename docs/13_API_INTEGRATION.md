# 13_API_INTEGRATION.md

# API Integration Guide

## Goal

Connect the React frontend to the existing Flask backend without
changing backend behavior.

## Principles

-   Keep API calls centralized
-   Never call fetch directly inside UI components
-   Handle loading, success, and error states consistently

## Suggested Structure

services/ - api.ts - prediction.ts

## Prediction Flow

User uploads image ↓ Frontend validates file ↓ POST request to
prediction endpoint ↓ Backend returns prediction ↓ Frontend renders
results

## Request States

-   Idle
-   Uploading
-   Processing
-   Success
-   Error

## Error Handling

Display friendly messages for: - Network failure - Invalid file -
Timeout - Server unavailable - Unexpected response

## Loading UX

Show: - AI scanning animation - Progress messages - Disable Analyze
button

## Timeouts

Provide retry option if request exceeds expected duration.

## Security

-   Validate file type before upload
-   Limit file size
-   Sanitize displayed text
-   Do not expose internal errors

## Future Enhancements

-   Authentication
-   Scan history API
-   PDF generation API
-   Notifications
-   Analytics endpoints
