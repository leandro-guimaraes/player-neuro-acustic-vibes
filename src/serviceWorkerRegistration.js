// Este código opcional é usado para registrar um service worker.
// register() não é chamado por padrão.

// Isso permite que o aplicativo carregue mais rapidamente em visitas subsequentes na produção e fornece
// capacidades offline. No entanto, também significa que os desenvolvedores (e usuários)
// só verão atualizações implantadas em visitas subsequentes a uma página, depois que todas as
// guias existentes abertas na página foram fechadas, já que os recursos anteriormente armazenados em cache
// são atualizados em segundo plano.

// Para saber mais sobre os benefícios desse modelo e instruções sobre como
// optar por participar, leia https://cra.link/PWA

const isLocalhost = Boolean(
    window.location.hostname === "localhost" ||
        // [::1] é o endereço localhost IPv6.
        window.location.hostname === "[::1]" ||
        // 127.0.0.0/8 é considerado localhost para IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
);

export function register(config) {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
        // O construtor URL está disponível em todos os navegadores que suportam SW.
        const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
        if (publicUrl.origin !== window.location.origin) {
            // Nosso service worker não funcionará se PUBLIC_URL estiver em uma origem diferente
            // da qual nossa página é servida. Isso pode acontecer se um CDN for usado para
            // servir ativos; consulte https://github.com/facebook/create-react-app/issues/2374
            return;
        }

        window.addEventListener("load", () => {
            const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

            if (isLocalhost) {
                // Isso está sendo executado no localhost. Vamos verificar se um service worker ainda existe ou não.
                checkValidServiceWorker(swUrl, config);

                // Adicione alguns logs adicionais ao localhost, direcionando os desenvolvedores para o
                // documentação do service worker/PWA.
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        "Este aplicativo da web está sendo servido primeiro em cache por um service " +
                            "worker. Para saber mais, visite https://cra.link/PWA"
                    );
                });
            } else {
                // Não é localhost. Apenas registre o service worker
                registerValidSW(swUrl, config);
            }
        });
    }
}

function registerValidSW(swUrl, config) {
    navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                if (installingWorker == null) {
                    return;
                }
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === "installed") {
                        if (navigator.serviceWorker.controller) {
                            // Neste ponto, o conteúdo precarregado atualizado foi buscado,
                            // mas o service worker anterior ainda servirá o conteúdo mais antigo
                            // até que todas as guias do cliente sejam fechadas.
                            console.log(
                                "Novo conteúdo está disponível e será usado quando todas as " +
                                    "guia para esta página estiverem fechadas. Veja https://cra.link/PWA."
                            );

                            // Executa o retorno de chamada
                            if (config && config.onUpdate) {
                                config.onUpdate(registration);
                            }
                        } else {
                            // Neste ponto, tudo foi precarregado.
                            // É o momento perfeito para exibir uma
                            // mensagem "O conteúdo está armazenado em cache para uso offline".
                            console.log("O conteúdo está armazenado em cache para uso offline.");

                            // Executa o retorno de chamada
                            if (config && config.onSuccess) {
                                config.onSuccess(registration);
                            }
                        }
                    }
                };
            };
        })
        .catch((error) => {
            console.error("Erro durante o registro do service worker:", error);
        });
}

function checkValidServiceWorker(swUrl, config) {
    // Verifique se o service worker pode ser encontrado. Se não puder, recarregue a página.
    fetch(swUrl, {
        headers: { "Service-Worker": "script" },
    })
        .then((response) => {
            // Garanta que o service worker exista e que realmente estejamos obtendo um arquivo JS.
            const contentType = response.headers.get("content-type");
            if (
                response.status === 404 ||
                (contentType != null &&
                    contentType.indexOf("javascript") === -1)
            ) {
                // Nenhum service worker encontrado. Provavelmente um aplicativo diferente. Recarregue a página.
                navigator.serviceWorker.ready.then((registration) => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                // Service worker encontrado. Prossiga normalmente.
                registerValidSW(swUrl, config);
            }
        })
        .catch(() => {
            console.log(
                "Nenhuma conexão com a internet encontrada. O aplicativo está sendo executado no modo offline."
            );
        });
}

export function unregister() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
            .then((registration) => {
                registration.unregister();
            })
            .catch((error) => {
                console.error(error.message);
            });
    }
}
