<template>
  <header class="header">
    <h1>Daily Manager</h1>
    <nav>
      <ul class="nav__menu">
        <li class="nav__item"><a class="nav__link" href="/">Login</a></li>
        <li class="nav__item">
          <a class="nav__link nav__link--register" href="/">Register</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.nav__menu {
  display: flex;
}

.nav__item:not(:last-of-type) {
  margin-right: 16px;
}

.nav__link {
  color: #d1d1d0;
  padding: 4px 16px;
}

.nav__link--register {
  background-color: #d1d1d0;
  color: #454544;
  border-radius: 3px;
}
</style>
