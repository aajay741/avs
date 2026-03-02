# How to Deploy to Hostinger

Follow these simple steps to deploy your React + PHP Admin Panel to Hostinger.

## Step 1: Build the React Application
The front-end has already been built into a production package in the `/dist` folder. 
Whenever you make changes to the React code, run:
```bash
npm run build
```
This generates your production-ready frontend code inside the `dist` directory.

## Step 2: Upload Files to Hostinger
Using **Hostinger's File Manager** or an FTP client (like FileZilla), upload your files to the `public_html` directory:

1. Upload **everything inside** your local `dist` folder into `public_html/`. 
   *(Do **not** upload the "dist" folder itself, only its contents: `assets`, `index.html`, `.htaccess`, etc.)*
2. Upload your local `api` folder into `public_html/`. 
   *(So that it becomes `public_html/api/`)*

Your Hostinger file structure should look like this:
```
public_html/
├── api/                  <-- The PHP backend
│   ├── auth/
│   ├── blogs/
│   ├── dashboard/
│   ├── inquiries/
│   ├── media/
│   ├── uploads/
│   ├── config.php
│   └── setup.php
├── assets/               <-- React optimized JS, CSS, images
├── .htaccess             <-- Important! Enables React Router
└── index.html            <-- Main React entry point
```

## Step 3: Setup Hostinger Database
1. Go to your Hostinger control panel → **Databases → MySQL Databases**.
2. Create a new MySQL database. Note down:
   - **Database Name** (e.g., `u123456789_avs`)
   - **Username** (e.g., `u123456789_admin`)
   - **Password** (whatever you set)

## Step 4: Configure the API
1. In Hostinger's File Manager, open `public_html/api/config.php`.
2. Update the database credentials:
```php
define('DB_HOST', 'localhost');                // Usually stays localhost on Hostinger
define('DB_NAME', 'u123456789_avs');           // Your Hostinger DB Name
define('DB_USER', 'u123456789_admin');         // Your Hostinger DB Username
define('DB_PASS', 'YourSecretPassword!123');   // Your Hostinger DB Password
```
3. Save the file.

## Step 5: Run Database Setup
1. Open your browser and visit: `https://your-domain.com/api/setup.php`
2. This script will automatically:
   - Create all required database tables
   - Insert a default admin user
   - Add sample blog posts
   - Create the uploads directory
3. If you see **"Setup Complete!"**, everything is working.

## Step 6: Test Login
Go to: `https://your-domain.com/admin/login`

**Default credentials:**
- **Username:** `admin`
- **Password:** `admin123`

> ⚠️ **IMPORTANT:** Change the admin password after your first login!

## Step 7: Security Cleanup
After setup is confirmed working, **delete** `setup.php` from the server:
- Remove `public_html/api/setup.php`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 404 errors on page refresh | Make sure `.htaccess` was uploaded to `public_html/` |
| Database connection error | Double-check credentials in `config.php` |
| Login not working | Run `setup.php` again to reset the admin user |
| File uploads failing | Check that `api/uploads/` folder has write permissions (755 or 775) |
| CORS errors | Already handled dynamically in `config.php` |
