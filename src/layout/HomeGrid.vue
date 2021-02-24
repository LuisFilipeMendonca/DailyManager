<template>
  <nav class="grid">
    <a href="/" class="link">
      <div class="badge">
        <div class="link__content">
          <span class="link__icon"><font-awesome-icon icon="tasks"/></span>
          <span class="link__description">Tasks</span>
        </div>
      </div>
    </a>
    <a href="/" class="link">
      <div class="badge">
        <div class="link__content">
          <span class="link__icon"
            ><font-awesome-icon icon="sticky-note"
          /></span>
          <span class="link__description">Notes</span>
        </div>
      </div>
    </a>
    <a href="/" class="link">
      <div class="badge">
        <div class="link__content">
          <span class="link__icon"
            ><font-awesome-icon icon="address-card"
          /></span>
          <span class="link__description">Contacts</span>
        </div>
      </div>
    </a>
    <a href="/" class="link">
      <div class="badge">
        <div class="link__content">
          <span class="link__icon"><font-awesome-icon icon="coins"/></span>
          <span class="link__description">Money</span>
        </div>
      </div>
    </a>
  </nav>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 64px;
}

.badge {
  background-color: #5c5c5b;
  width: 150px;
  height: 150px;
  border-radius: 3px;
  box-shadow: 0 0 5px #d1d1d0;
}

.link {
  transition: transform 0.3s linear;
}

.link:hover {
  transform: translateY(-3px);
}

.link__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #d1d1d0;
  position: relative;
}

.link__icon {
  font-size: 3rem;
  transition: transform 0.3s linear;
}

.link:hover .link__icon {
  transform: translateY(-16px);
}

.link__description {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 0);
  opacity: 0;
  transition: all 0.3s linear;
}

.link:hover .link__description {
  transform: translate(-50%, 16px);
  opacity: 1;
}
</style>
