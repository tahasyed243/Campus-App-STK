# 📌 Campus App – Real-Time Campus Recruitment System

An innovative **real-time recruitment platform** designed for universities and companies to seamlessly manage campus placements. Built with **React.js** on the frontend and **Firebase** for backend services, this system enables **students, companies, and admins** to interact in real time with live data updates.

---

## 🚀 Tech Stack

* **Frontend:** React.js (modern UI + responsive design)
* **Backend/Services:** Firebase

  * 🔑 **Authentication** (role-based: Student, Company, Admin)
  * 🗄️ **Realtime Database** (for jobs, applications, user data, and admin actions)
  * 📂 **Firebase Storage** *(optional – resumes, profile pictures)*

---

## 🔐 Access Control

* ✅ Login is **mandatory** for all user roles
* 🚫 Blocked users **cannot log in** or access any content
* 🔄 All user, job, and application updates are **synced in real time**

---

## 👨‍🎓 Student Features

* Register & log in
* Create & update profile (stored in Firebase Realtime DB)
* Browse job listings **in real time**
* Apply to jobs (applications stored under job + student record)
* Track applied jobs and **application statuses live**

---

## 🏢 Company Features

* Register & log in
* Create & update **company profile**
* Post, edit, or delete jobs (all changes update instantly)
* View **all posted jobs** in real time
* Manage student applications for each job (live updates)

---

## 🛠️ Admin Features

* Approve/reject new **student & company registrations**
* View all users (students & companies) with roles & status
* Block/unblock users ⚡ (blocked users lose access immediately)
* View all jobs across the system
* Monitor applicants per job + associated companies

---

## ⚡ Real-Time Behavior

* Uses Firebase listeners:

  * `.on('value')` → Jobs list
  * `.on('child_added')` → Applications
  * `.on('value')` → User profile & status changes
* Admin actions (block/unblock, approve/reject) apply **instantly**
* No page refresh required → Users see updates live

---

## 🃏 Project Card

### 🎓 Campus App – Real-Time Recruitment System

📍 **Who it's for?** Students, Companies & Admins in campus recruitment

✨ **Why it's special?**

* Real-time updates (no refresh required)
* Role-based access with Firebase Auth
* Live job applications + statuses
* Admin-powered moderation

🚀 **Built With:** React.js + Firebase

---

## 📥 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/tahasyed243/campus-app-STK.git
cd campus-app

# Install dependencies
npm install

# Start development server
npm start
```

---

## 📌 Future Enhancements

* Job recommendation system
* Analytics dashboard for admins

---

## 💡 Author

Developed with ❤️ for smarter campus recruitment!