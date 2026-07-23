# 16_DEPLOYMENT.md

# Deployment Guide

## Goal

Deploy SkinSense AI with a React frontend and Flask backend in a
reliable production environment.

## Recommended Stack

Frontend: Vercel Backend: Render Repository: GitHub

## Build Commands

Frontend - npm install - npm run build

Backend - pip install -r requirements.txt

## Environment Variables

Frontend - VITE_API_URL

Backend - FLASK_ENV - MODEL_PATH

Never commit .env files.

## Production Checklist

-   Production API URL configured
-   HTTPS enabled
-   Environment variables verified
-   Build succeeds
-   Images optimized
-   Error pages tested
-   Lighthouse score checked

## CI/CD

Suggested GitHub Actions flow:

1.  Push to main
2.  Run lint
3.  Run tests
4.  Build frontend
5.  Deploy frontend
6.  Deploy backend

## Monitoring

Track: - Uptime - API latency - Frontend errors - Prediction failures

## Future

-   Docker
-   Kubernetes
-   CDN
-   Object storage
