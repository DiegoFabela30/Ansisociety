#!/usr/bin/env node

/**
 * Script para crear cuenta de admin en Firebase
 * 
 * ANTES DE EJECUTAR:
 * 1. Ve a Firebase Console -> Project Settings -> Service Accounts
 * 2. Haz clic en "Generate New Private Key"
 * 3. Guarda el archivo JSON descargado como "firebase-key.json" en la raíz del proyecto
 * 4. Ejecuta este script: node setup-admin.js
 */

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Verificar si existe la clave de Firebase
const keyPath = path.join(__dirname, 'firebase-key.json');
if (!fs.existsSync(keyPath)) {
  console.error('❌ Error: No se encontró firebase-key.json');
  console.error('');
  console.error('Por favor:');
  console.error('1. Ve a https://console.firebase.google.com/');
  console.error('2. Selecciona tu proyecto');
  console.error('3. Ve a Project Settings -> Service Accounts');
  console.error('4. Haz clic en "Generate New Private Key"');
  console.error('5. Guarda el archivo como firebase-key.json en la raíz del proyecto');
  console.error('6. Vuelve a ejecutar este script');
  process.exit(1);
}

try {
  const serviceAccount = require('./firebase-key.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
  });

  const auth = admin.auth();
  const db = admin.firestore();

  async function createAdminAccount() {
    const email = 'ansisociety@admin.com';
    const password = '30092003';

    try {
      console.log('🔧 Creando cuenta de admin...\n');

      // Crear usuario en Authentication
      console.log('📧 Creando usuario en Authentication...');
      const userRecord = await auth.createUser({
        email: email,
        password: password,
        displayName: 'Admin ANSISOCIETY',
      });
      console.log(`✅ Usuario creado: ${userRecord.uid}\n`);

      // Crear documento en Firestore con rol admin
      console.log('📁 Creando documento en Firestore...');
      await db.collection('usuarios').doc(userRecord.uid).set({
        uid: userRecord.uid,
        correo: email,
        nombre: 'Admin',
        apellidos: 'ANSISOCIETY',
        genero: 'Otro',
        fechaNacimiento: '2003-09-30',
        rol: 'admin',
        createdAt: new Date().toISOString(),
      });
      console.log(`✅ Documento creado con rol "admin"\n`);

      // Resumen
      console.log('=====================================');
      console.log('✅ ¡CUENTA DE ADMIN CREADA EXITOSAMENTE!');
      console.log('=====================================\n');
      console.log('Credenciales:');
      console.log(`📧 Email: ${email}`);
      console.log(`🔐 Contraseña: ${password}\n`);
      console.log('Acceso:');
      console.log('1. Ve a http://localhost:3000/login');
      console.log(`2. Ingresa email: ${email}`);
      console.log(`3. Ingresa contraseña: ${password}`);
      console.log('4. Serás redirigido a /admin\n');
      console.log('Admin UID: ' + userRecord.uid);
      console.log('=====================================\n');

      process.exit(0);
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log('⚠️ La cuenta ya existe. Actualizando el documento de admin en Firestore...');

        try {
          const existingUser = await auth.getUserByEmail(email);
          await db.collection('usuarios').doc(existingUser.uid).set({
            uid: existingUser.uid,
            correo: email,
            nombre: 'Admin',
            apellidos: 'ANSISOCIETY',
            genero: 'Otro',
            fechaNacimiento: '2003-09-30',
            rol: 'admin',
            createdAt: new Date().toISOString(),
          }, { merge: true });

          console.log(`✅ El usuario existe: ${existingUser.uid}`);
          console.log('✅ El rol admin se ha asegurado en Firestore');
          console.log('\nAccede con:');
          console.log(`📧 Email: ${email}`);
          console.log(`🔐 Contraseña: 30092003`);
          console.log('Ve a http://localhost:3000/login y usa esas credenciales.');
        } catch (err) {
          console.error('No se pudo actualizar el documento de admin en Firestore');
          console.error(err);
          process.exit(1);
        }
      } else {
        console.error('❌ Error:', error.message);
        process.exit(1);
      }
      process.exit(0);
    }
  }

  createAdminAccount();
} catch (error) {
  console.error('❌ Error iniciando Firebase:', error.message);
  process.exit(1);
}
