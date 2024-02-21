document.getElementById('generate').addEventListener('click', function() {
    const link = document.getElementById('linkInput').value;
    if (link) {
        const qrCodeContainer = document.getElementById('qrcode');
        // Limpa o QR Code anterior
        qrCodeContainer.innerHTML = "";
        // Gera novo QR Code
        new QRCode(qrCodeContainer, {
            text: link,
            onRenderingEnd: function() {
                // Verifica se a biblioteca QRCode que você está usando tem um callback ao final da renderização
                // Se não tiver, você pode tentar definir um setTimeout aqui para aplicar a animação após um breve atraso
            }
        });
        // Reinicia a animação removendo e adicionando a classe
        qrCodeContainer.style.opacity = "0";
        qrCodeContainer.style.transform = "scale(1.0)";

        // Aguarda um breve momento antes de adicionar a animação para garantir que o DOM foi atualizado
        setTimeout(() => {
            qrCodeContainer.style.opacity = "1";
            qrCodeContainer.style.transform = "scale(1)";
        }, 10); // ajuste este tempo conforme necessário
    }
});

document.getElementById('save').addEventListener('click', function() {
    const qrCodeElement = document.getElementById('qrcode').querySelector('img');
    if (qrCodeElement) {
        // Verifica se a imagem já está completamente carregada
        if (qrCodeElement.complete) {
            // Prepara o link para download
            downloadImage(qrCodeElement.src, 'qrcode.png');
        } else {
            // Se a imagem não estiver carregada, adiciona um evento de load
            qrCodeElement.onload = function() {
                downloadImage(qrCodeElement.src, 'qrcode.png');
            };
        }
    }
});

function downloadImage(data, filename) {
    if (!data) return;

    // Cria um elemento <a> para o download
    const link = document.createElement('a');
    link.href = data;
    // Trata o caso para navegadores que não suportam o atributo download
    link.setAttribute('download', filename);
    // Simula um clique no link para disparar o download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
