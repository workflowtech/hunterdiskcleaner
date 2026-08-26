// Carrega o script externo da Digistore24 dinamicamente
(function() {
    var dsScript = document.createElement('script');
    dsScript.src = "https://www.digistore24-scripts.com/service/digistore.js";
    dsScript.type = "text/javascript";
    dsScript.async = true;

    // Assim que o script da Digistore24 carregar, executa a inicialização dos produtos
    dsScript.onload = function() {
        if (typeof digistorePromocode === "function") {
            // Licença Pro 1 Ano (HDC)
            digistorePromocode({ "product_id": 726349, "adjust_domain": true });
            
            // No futuro, se criar um novo produto, basta adicionar outra linha aqui:
            // digistorePromocode({ "product_id": OUTRO_ID, "adjust_domain": true });
        }
    };

    document.head.appendChild(dsScript);
})();
