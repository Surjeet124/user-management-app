# User Management App

Ye ek CRUD app hai jo maine React aur React Router use karke banaya hai. Data ke liye JSONPlaceholder API use kiya hai kyunki ye ek free fake API hai jo testing ke liye achha hai.

## Kya kya kiya hai

- Users ki list fetch karke card grid mein dikhaya hai (name, email, phone, company)
- Naya user add karne ke liye form banaya
- Existing user ko edit kar sakte ho
- User delete bhi kar sakte ho (confirm karne ke baad)
- React Router se do pages banaye - ek home page aur ek user ka detail page
- Loading ke time skeleton dikhta hai, aur agar koi error aaye to retry button ke saath error message

Note: JSONPlaceholder actual mein data save nahi karta, bas response bhejta hai. Isliye maine local state update kar diya har request ke baad taaki UI mein changes dikh sake.

## Kaise chalayein

```bash
npm install
npm start
```

Ye `localhost:3000` pe open ho jayega.

## Build karne ke liye

```bash
npm run build
```

## Aage kya kar sakte hain

- TypeScript mein convert karna
- window.confirm ki jagah proper modal use karna
- Kuch aur pages add karna maybe

## Ye seekha isse

Is project se maine React hooks (useState, useEffect, useContext), API calls (fetch, async/await), aur React Router ka use karna seekha. Context API use kiya taaki components ke beech data share ho sake bina prop drilling ke.