const { defineConfig } = require('vite')

module.exports = defineConfig({
    publicDir: 'static',
    server: {
        host: true,
    }
})