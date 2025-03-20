# Barcode Scanner App

A React Native mobile application that allows users to scan barcodes using their device's camera. The app features a modern UI with dark/light theme support, a navigation drawer, and barcode history management.

## Features

- Barcode scanning using device camera
- Dark/Light theme support
- Barcode history tracking
- Copy barcodes to clipboard
- Delete individual or all scanned barcodes
- Haptic feedback for better user experience
- Supports multiple barcode formats (EAN-13, EAN-8, UPC-A, UPC-E)

## Prerequisites

- npm
- Expo CLI
- iOS/Android device with Expo Go app installed (or simulators)

## Installation

1. Clone the repository
```bash
git clone https://github.com/basilali/ScannerApp
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npx expo start
```

## Usage

### Home Screen
The landing page of the application. Navigate through the app using the drawer menu.

### Scanner Screen
- Opens device camera to scan barcodes
- Displays the last scanned barcode
- Provides haptic feedback on successful scans
- Automatically saves scanned barcodes to history

### History Screen
- View all scanned barcodes
- Copy barcodes to clipboard by tapping on them
- Delete individual barcodes using the trash icon
- Clear entire history with the clear button
- Haptic feedback on copy operations

## App Structure

- `App.js`: Main application component with navigation and theme setup
- `Scanner.jsx`: Camera view and barcode scanning functionality
- `History.jsx`: Barcode history management and clipboard operations
- `Home.jsx`: Home screen component
