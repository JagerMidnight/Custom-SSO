# Custom-SSO – Create Your Own SSO Portal

Easily set up your own Single Sign-On (SSO) system by forking and deploying this project.

---

## 🌐 Live Demo

Want to see it in action before installing?  
👉 [Try the Demo](https://custom-sso.vercel.app)

---

## ⚙️ Installation Guide

### 1. Fork the Repository  
Click below to fork this repository to your GitHub account:  
[Fork 🍴](https://github.com/JagerMidnight/Custom-SSO/fork)

> **Important:** After forking, delete the `public/_site` directory and all the files contained from your copy.

### 2. Deploy to Vercel  
Go to [Vercel](https://vercel.com) and create a **New Project** using your forked repository.  
You can name it whatever you like.

After deployment, you can customize the domain or make other modifications as needed.

### 3. Set Environment Variables  
In your Vercel dashboard, add the following environment variables:

| Variable Name              | Value                  |
|----------------------------|------------------------|
| `ADMIN_ACCOUNT_USERNAME`   | Your admin email       |
| `ADMIN_ACCOUNT_PASSWORD`   | Your admin password    |
| `ADMIN_ACCOUNT_2FA_METHOD` | Should be `EMAIL`      |
| `ADMIN_ACCOUNT_2FA_EMAIL`  | Email used for 2FA     |

---

✅ That's it! Your custom SSO is now ready.
