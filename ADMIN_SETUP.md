# 🔐 Instrucciones para Crear la Cuenta de Admin

## Paso 1: Crear la cuenta de admin en Firebase Authentication

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto **ansisociety**
3. En el menú izquierdo, ve a **Authentication**
4. Haz clic en **Agregar usuario**
5. Ingresa los siguientes datos:
   - **Correo electrónico:** `ansisociety@admin.com`
   - **Contraseña:** `30092003`
6. Haz clic en **Crear usuario**

## Paso 2: Configurar el rol de admin en Firestore

1. Ve a [Firestore Database](https://console.firebase.google.com/)
2. Selecciona tu proyecto **ansisociety**
3. En el menú izquierdo, ve a **Firestore Database**
4. Encuentra la colección **usuarios**
5. Busca el documento del admin (con el UID que se generó en el paso anterior)
   - Si no existe, créalo con el mismo UID como nombre del documento
6. Agrega/modifica el campo **rol** con el valor **admin**
7. Asegúrate de que los datos sean:
   ```
   {
     "correo": "ansisociety@admin.com",
     "nombre": "Admin",
     "apellidos": "ANSISOCIETY",
     "genero": "Otro",
     "fechaNacimiento": "2003-09-30",
     "rol": "admin",
     "createdAt": "2024-01-01T00:00:00Z"
   }
   ```

## Paso 3: Acceder al Panel Admin

1. Ve a http://localhost:3000 (o tu URL local)
2. Haz clic en **Iniciar Sesión**
3. Ingresa:
   - **Correo:** `ansisociety@admin.com`
   - **Contraseña:** `30092003`
4. Se redirigirá automáticamente al dashboard: `/admin`

## Funcionalidades del Admin

✅ **Dashboard Principal** - Panel con acceso rápido a todas las funciones
✅ **Usuarios Registrados** - Ver y buscar todos los usuarios del sistema
✅ **Reportes GAD-7** - Análisis de resultados de pruebas de ansiedad
   - Total de tests realizados
   - Puntuación promedio
   - Nivel de ansiedad más común
   - Distribución de niveles
   - Listado detallado de resultados

✅ **Gestión del Foro** - Moderar y eliminar publicaciones
   - Buscar publicaciones por título, autor o contenido
   - Eliminar publicaciones inapropiadas

---

**¡El sistema de admin está completamente funcional!** 🎉
