# 15_SECURITY.md

# Security Guidelines

## Goal

Protect users, uploaded files, and application integrity.

## File Uploads

-   Accept PNG, JPG, JPEG only
-   Enforce file size limits
-   Validate MIME type on frontend and backend
-   Reject unsupported formats

## Frontend

-   Never trust client input
-   Escape dynamic content
-   Avoid dangerous HTML rendering

## API

-   Use HTTPS in production
-   Handle errors gracefully
-   Never expose stack traces to users

## Secrets

-   Store environment variables in .env
-   Never commit secrets to Git
-   Keep API endpoints configurable

## Dependencies

-   Keep packages updated
-   Remove unused libraries
-   Audit dependencies regularly

## Privacy

-   Do not retain uploaded images unless explicitly supported
-   Clearly inform users about data handling
-   Avoid storing personally identifiable information unnecessarily

## Error Messages

Good: 'Unable to analyze the image. Please try again.'

Avoid: Internal server details or stack traces.

## Future Enhancements

-   Authentication
-   Rate limiting
-   Audit logs
-   CSP headers
-   Secure cookies (if auth added)

## Security Checklist

✓ Input validation ✓ Safe uploads ✓ HTTPS ✓ Dependency updates ✓
Friendly error handling
