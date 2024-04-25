/* eslint-disable no-restricted-globals */

// Este service worker pode ser personalizado!
// Consulte https://developers.google.com/web/tools/workbox/modules
// para ver a lista de módulos disponíveis do Workbox ou adicione qualquer outro
// código que você desejar.
// Você também pode remover este arquivo se preferir não usar um
// service worker, e a etapa de construção do Workbox será ignorada.

import { clientsClaim } from "workbox-core"; // Importa a função clientsClaim do workbox-core
import { ExpirationPlugin } from "workbox-expiration"; // Importa o plugin ExpirationPlugin do workbox-expiration
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching"; // Importa funções relacionadas à precaching do workbox-precaching
import { registerRoute } from "workbox-routing"; // Importa a função registerRoute do workbox-routing
import { StaleWhileRevalidate } from "workbox-strategies"; // Importa a estratégia StaleWhileRevalidate do workbox-strategies

clientsClaim(); // Garante que os clientes (abas) serão ativados imediatamente ao registrar o service worker

// Precarrega todos os ativos gerados pelo processo de build.
// Suas URLs são injetadas na variável de manifesto abaixo.
// Esta variável deve estar presente em algum lugar do seu arquivo de service worker,
// mesmo que você decida não usar o precarregamento. Consulte https://cra.link/PWA
precacheAndRoute(self.__WB_MANIFEST);

// Configuração de roteamento estilo App Shell, para que todas as solicitações de navegação
// sejam atendidas com seu shell index.html. Saiba mais em
// https://developers.google.com/web/fundamentals/architecture/app-shell
const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
    // Retorna falso para isentar solicitações de serem atendidas pelo index.html.
    ({ request, url }) => {
        // Se esta não for uma navegação, pule.
        if (request.mode !== "navigate") {
            return false;
        } // Se esta for uma URL que começa com /_, pule.

        if (url.pathname.startsWith("/_")) {
            return false;
        } // Se isso se parecer com uma URL de recurso, porque contém // uma extensão de arquivo, pule.

        if (url.pathname.match(fileExtensionRegexp)) {
            return false;
        } // Retorna true para sinalizar que queremos usar o manipulador.

        return true;
    },
    createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html")
);

// Um exemplo de rota de cache em tempo de execução para solicitações que não são tratadas pelo
// precarregamento, neste caso, solicitações .png do mesmo domínio, como aquelas de public/
registerRoute(
    // Adicione outras extensões de arquivo ou critérios de roteamento conforme necessário.
    ({ url }) =>
        url.origin === self.location.origin && url.pathname.endsWith(".png"), // Personalize esta estratégia conforme necessário, por exemplo, alterando para CacheFirst.
    new StaleWhileRevalidate({
        cacheName: "images", // Nome do cache para imagens
        plugins: [
            // Garante que, quando este cache em tempo de execução atingir um tamanho máximo, as
            // imagens menos usadas sejam removidas.
            new ExpirationPlugin({ maxEntries: 50 }), // Define o número máximo de entradas no cache
        ],
    })
);

// Isso permite que o aplicativo da web acione a função skipWaiting via
// registration.waiting.postMessage({type: 'SKIP_WAITING'})
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting(); // Pula o estágio de espera e ativa imediatamente o novo service worker
    }
});

// Qualquer outra lógica personalizada do service worker pode ser colocada aqui.
