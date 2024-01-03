<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-logo">
        <img src="../../public/layout/images/logo_X-analityc.png" class="logo-img">
        <div class="login-title">Bienvenido a X-Analityc!</div>
        <span class="login-subtitle">Inicia Sesión para continuar</span>
      </div>
      <div class="login-form">
        <div class="form-group">
          <label for="email" class="form-label">Usuario</label>
          <input id="email" v-model="email" type="text" class="form-input" placeholder="Usuario">
        </div>
        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <input id="password" v-model="password" type="password" class="form-input" placeholder="Contraseña">
        </div>
        <div class="form-group">
          <div class="remember-me">
            <input id="rememberme" v-model="checked" type="checkbox" class="remember-me-checkbox">
            <label for="rememberme" class="remember-me-label">Recuérdame</label>
          </div>
          <a href="#" class="forgot-password">¿Olvidaste tu contraseña?</a>
        </div>
        <button class="login-button" @click="login">Iniciar Sesión</button>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      email: '',
      password: '',
      checked: false,
      users: [
        { email: 'lucas', password: '1234' },
        { email: 'jona', password: '1234' },
        { email: 'analityc', password: '1234' },
      ],
    };
  },
  methods: {
    login() {
      const user = this.users.find(
        (user) => user.email === this.email && user.password === this.password
      );

      if (user) {
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // Ejemplo de redireccionamiento a una página de dashboard utilizando Vue Router
          this.$router.push('/dashboard');
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error en el inicio de sesión',
          text: 'Usuario o contraseña incorrectos',
          confirmButtonText: 'Aceptar',
        });
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.login-card {
  max-width: 360px;
  padding: 24px;
  border-radius: 16px;
  background-color: #ffffff;
}

.login-logo {
  text-align: center;
  margin-bottom: 24px;
}

.logo-img {
  width: 120px;
  height: 120px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: #888888;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #dddddd;
}

.remember-me {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.remember-me-checkbox {
  margin-right: 8px;
}

.remember-me-label {
  font-size: 14px;
}

.forgot-password {
  font-size: 14px;
  color: #3366cc;
  text-decoration: none;
}

.login-button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #ffffff;
  background-color: #3366cc;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
