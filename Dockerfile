# Etapa de construcción
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Generar Prisma Client (si usas Prisma)
# RUN npx prisma generate

# Copiar el resto del código
COPY . .

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa de producción
FROM node:20-alpine

# Instalar tzdata para zona horaria y curl para healthchecks
RUN apk add --no-cache tzdata curl

# Establecer zona horaria (opcional, ajusta según necesites)
ENV TZ=America/Argentina/Buenos_Aires

WORKDIR /app

# Crear usuario no root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm ci --only=production && npm cache clean --force

# Copiar código compilado de la etapa builder
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist

# Crear directorio para datos JSON y asignar permisos
RUN mkdir -p /app/src/data && \
    chown -R nodejs:nodejs /app

# Cambiar a usuario no root
USER nodejs

# Exponer puerto
EXPOSE 3000

# Healthcheck para monitoreo
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Comando para iniciar la aplicación
CMD ["node", "dist/server.js"]