# 🚀 Node + TypeScript Backend Starter

Plantilla base para crear APIs REST con **Node.js + TypeScript + Express + Prisma**.

Diseñada para iniciar proyectos rápidamente sin empezar desde cero.

---

## 📌 Características

- ✅ Node.js + TypeScript
- ✅ Express
- ✅ Arquitectura modular
- ✅ Validación con Zod
- ✅ Manejo centralizado de errores
- ✅ Prisma ORM
- ✅ Variables de entorno validadas
- ✅ Logger básico
- ✅ Estructura lista para escalar

---

## 📁 Estructura del Proyecto
src/
├─ server.ts
├─ app.ts
├─ routes/
├─ controllers/
├─ middleware/
└─ lib/

prisma/
├─ schema.prisma
└─ seed.ts


---

## ⚙️ Instalación

```bash
npm install

🔧 Configuración

Copiar archivo .env.example a .env

Configurar variables:
PORT=3000
DATABASE_URL="mysql://user:password@localhost:3306/mydb"

🧪 Desarrollo
npm run dev


Servidor disponible en:
http://localhost:3000/api/health

🏗️ Build para Producción

npm run build
npm start

🗄️ Prisma

Generar cliente:

npm run prisma:generate

Migrar base de datos:

npm run prisma:migrate

Abrir Prisma Studio:

npm run prisma:studio

Seed:

npm run seed
