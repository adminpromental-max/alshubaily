# AlShubaily — Next.js

موقع مجموعة الشبيلي (Next.js App Router + Tailwind + Shadcn UI).

## التشغيل محلياً

```bash
cd web
npm install
npm run dev
```

افتح: http://localhost:3000

## Intro

- فيديو الانترو: `public/assets/intro/intro.mp4`
- الصوت: `public/assets/intro/intro.mp3`
- خلفية الشاشة: `#0A0E17` (نفس لون الفيديو)
- بعد انتهاء الفيديو → الصفحة الرئيسية

## الرفع على GitHub

```bash
cd web
git add .
git commit -m "Initial AlShubaily site with video intro"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/alshubaily.git
git push -u origin main
```

## الرفع على Vercel

1. ادخلي [vercel.com](https://vercel.com) واربطي حساب GitHub
2. **Add New Project** → اختاري repo `alshubaily`
3. **Root Directory:** `web` (إذا الريبو فيه المجلد الأب) أو `.` إذا الريبو = مجلد web فقط
4. Framework: **Next.js** (تلقائي)
5. Deploy

أو من الطرفية:

```bash
cd web
npx vercel login
npx vercel
npx vercel --prod
```

## هيكل المشروع

```
web/
├── public/assets/
│   ├── intro/          ← فيديو وصوت الانترو
│   └── Alshubaily-logo.png
├── src/app/            ← App Router
├── src/components/
│   ├── intro/          ← IntroGateway (فيديو)
│   ├── home/           ← الصفحة الرئيسية
│   └── landing/
└── vercel.json
```
