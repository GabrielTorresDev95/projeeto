const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  // Transpilar dependências específicas (útil para pacotes que não são ES5)
  transpileDependencies: true,
  
  // Configurações do webpack
  configureWebpack: {
    devtool: 'source-map', // Gera source maps para melhor debugging
    performance: {
      hints: false // Desativa avisos de tamanho de assets grandes
    }
  },
  
  // Configurações do servidor de desenvolvimento
  devServer: {
    port: 8080,          // Porta do servidor local
    hot: true,           // Habilita Hot Module Replacement
    open: true,          // Abre o navegador automaticamente
    client: {
      overlay: {         // Configurações para erros no navegador
        warnings: false,
        errors: true
      }
    }
  },
  
  // Outras configurações úteis:
  lintOnSave: process.env.NODE_ENV !== 'production', // Habilita ESLint apenas em desenvolvimento
  productionSourceMap: false // Desativa source maps em produção para melhor performance
})