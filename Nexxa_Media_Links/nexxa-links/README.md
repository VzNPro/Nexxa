# Nexxa Media — página de links

Página estática em HTML, CSS e JavaScript. Não usa frameworks, contas, chaves ou serviços externos para funcionar.

## Como abrir

1. Extraia o ZIP e abra a pasta `nexxa-links` no VS Code.
2. Abra `index.html` no navegador. Se preferir, use a extensão Live Server do VS Code.
3. Edite `styles.css` para mudar o visual e `index.html` para mudar os textos.

## Configure antes de publicar

Abra `links.js` e substitua as três strings vazias pelos seus links reais, sempre começando com `https://`:

```js
window.NEXXA_LINKS = {
  whatsapp: "https://wa.me/55DDDNUMERO",
  instagram: "https://www.instagram.com/SEU_USUARIO/",
  telegram: "https://t.me/SEU_CANAL"
};
```

No WhatsApp, use DDI `55` + DDD + número, somente dígitos (sem `+`, espaços ou pontuação). Os exemplos acima são marcadores: coloque os seus dados de verdade. Enquanto um link estiver vazio ou com domínio inesperado, clicar no botão mostrará um aviso, sem redirecionar.

## Estrutura

- `index.html`: textos e elementos da página.
- `styles.css`: paleta, layout responsivo e animações.
- `links.js`: os três URLs que você deve preencher.
- `script.js`: comportamento dos botões e efeitos leves.
- `assets/nexxa-logo.png`: logo fornecida por você.

Para publicar no Cloudflare Pages, faça upload dos arquivos da pasta `nexxa-links` (com `index.html` na raiz do projeto) ou conecte o repositório Git. Teste os três botões no celular antes de compartilhar a página. Use apenas referências reais e autorizadas no seu canal.

Se tiver Node.js instalado, rode `node --test tests/smoke.test.js` para verificar os arquivos e a configuração dos botões.
